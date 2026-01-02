
// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useMemo, useEffect, useCallback } from "react";
// import {
//   Page,
//   LegacyCard,
//   Card,
//   IndexTable,
//   Text,
//   Badge,
//   Button,
//   TextField,
//   Select,
//   EmptySearchResult,
//   InlineStack,
//   BlockStack,
//   Icon,
//   ButtonGroup,
//   Box,
//   Banner,
//   Spinner,
//   Divider,
//   Filters,
//   ChoiceList,
//   DatePicker,
//   Popover,
//   InlineGrid,
//   useBreakpoints,
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   FilterIcon,
//   RefreshIcon,
//   DeleteIcon,
//   EmailIcon,
//   CheckCircleIcon,
// } from "@shopify/polaris-icons";

// /* ===================== LOADER ===================== */
// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopRes = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//         email
//       }
//     }
//   `);

//   const shopJson = await shopRes.json();
//   const merchantId = shopJson.data.shop.id.split("/").pop();
//   const shopName = shopJson.data.shop.name;

//   const res = await fetch(
//     `https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`
//   );
//   const json = await res.json();

//   return {
//     merchant: json.data,
//     merchantId,
//     shopName,
//   };
// };

// /* ===================== COMPONENT ===================== */
// export default function Index() {
//   const { merchant, merchantId, shopName } = useLoaderData();
//   const nav = useNavigation();
//   const { smDown, mdDown } = useBreakpoints();
//   const loading = nav.state === "submitting";

//   // State Management
//   const [refreshedData, setRefreshedData] = useState(null);
//   const [isLoadingInitial, setIsLoadingInitial] = useState(true);
//   const [searchValue, setSearchValue] = useState("");
//   const [sortValue, setSortValue] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isExporting, setIsExporting] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [selectedDates, setSelectedDates] = useState({
//     start: new Date(),
//     end: new Date(),
//   });
//   const [popoverActive, setPopoverActive] = useState(false);

//   // Filter States
//   const [dateFilter, setDateFilter] = useState([]);
//   const [fieldTypeFilter, setFieldTypeFilter] = useState([]);
//   const [queryValue, setQueryValue] = useState("");

//   const contacts = refreshedData?.contacts || merchant?.contacts || [];
//   const fields =
//     refreshedData?.formTemplates?.[0]?.fields ||
//     merchant?.formTemplates?.[0]?.fields ||
//     [];

//   const limit = 10;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoadingInitial(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatDateShort = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const isToday = (date) => {
//     const today = new Date();
//     const d = new Date(date);
//     return (
//       today.getDate() === d.getDate() &&
//       today.getMonth() === d.getMonth() &&
//       today.getFullYear() === d.getFullYear()
//     );
//   };

//   const isYesterday = (date) => {
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const d = new Date(date);
//     return (
//       yesterday.getDate() === d.getDate() &&
//       yesterday.getMonth() === d.getMonth() &&
//       yesterday.getFullYear() === d.getFullYear()
//     );
//   };

//   const isThisWeek = (date) => {
//     const now = new Date();
//     const d = new Date(date);
//     const weekStart = new Date(now);
//     weekStart.setDate(now.getDate() - now.getDay());
//     weekStart.setHours(0, 0, 0, 0);
//     return d >= weekStart;
//   };

//   const isThisMonth = (date) => {
//     const now = new Date();
//     const d = new Date(date);
//     return (
//       now.getMonth() === d.getMonth() && now.getFullYear() === d.getFullYear()
//     );
//   };

//   /* ===================== GET CONTACT VALUE ===================== */
//   const getContactValueByFieldType = (contact, fieldType, fieldLabel) => {
//     const typeMap = {
//       text: "text",
//       email: "email",
//       number: "number",
//       textarea: "textarea",
//       checkbox: "checkbox",
//       dropdown: "dropdown",
//       radio: "radio",
//     };

//     const dataKey = typeMap[fieldType];

//     if (!contact[dataKey]) {
//       return null;
//     }

//     const dataObject = contact[dataKey];

//     if (dataObject[fieldLabel] !== undefined) {
//       return dataObject[fieldLabel];
//     }

//     const values = Object.values(dataObject);
//     return values.length > 0 ? values[0] : null;
//   };

//   /* ===================== FILTER + SORT + SEARCH ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     // Date filters
//     if (dateFilter.length > 0) {
//       data = data.filter((contact) => {
//         if (dateFilter.includes("today")) {
//           if (isToday(contact.createdAt)) return true;
//         }
//         if (dateFilter.includes("yesterday")) {
//           if (isYesterday(contact.createdAt)) return true;
//         }
//         if (dateFilter.includes("this-week")) {
//           if (isThisWeek(contact.createdAt)) return true;
//         }
//         if (dateFilter.includes("this-month")) {
//           if (isThisMonth(contact.createdAt)) return true;
//         }
//         return false;
//       });
//     }

//     // Field type filters
//     if (fieldTypeFilter.length > 0) {
//       data = data.filter((contact) => {
//         return fields.some((field) => {
//           if (!fieldTypeFilter.includes(field.type)) return false;
//           const value = getContactValueByFieldType(
//             contact,
//             field.type,
//             field.label
//           );
//           return value !== null && value !== undefined && value !== "";
//         });
//       });
//     }

//     // Search/Query filter
//     if (queryValue) {
//       const q = queryValue.toLowerCase();
//       data = data.filter((contact) =>
//         fields.some((field) => {
//           const value = getContactValueByFieldType(
//             contact,
//             field.type,
//             field.label
//           );

//           if (Array.isArray(value)) {
//             return value.some((v) => v.toString().toLowerCase().includes(q));
//           }

//           return value?.toString().toLowerCase().includes(q);
//         })
//       );
//     }

//     // Sorting
//     data.sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);
//       return sortValue === "date-asc" ? dateA - dateB : dateB - dateA;
//     });

//     return data;
//   }, [contacts, dateFilter, fieldTypeFilter, queryValue, fields, sortValue]);

//   /* ===================== PAGINATION ===================== */
//   const totalPages = Math.ceil(filteredContacts.length / limit);
//   const paginatedContacts = filteredContacts.slice(
//     (currentPage - 1) * limit,
//     currentPage * limit
//   );

//   const startIndex =
//     filteredContacts.length === 0 ? 0 : (currentPage - 1) * limit + 1;
//   const endIndex = Math.min(currentPage * limit, filteredContacts.length);

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   /* ===================== HEADINGS ===================== */
//   const headings = useMemo(() => {
//     if (!fields || fields.length === 0) {
//       return [];
//     }

//     return [
//       { title: "#" },
//       ...fields.map((f) => ({
//         title: f.label.replace("/", "").trim(),
//       })),
//       { title: "Submitted" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length || !fields.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [
//         "ID",
//         ...fields.map((f) => f.label),
//         "Submission Date",
//       ];

//       const rows = filteredContacts.map((contact, idx) => [
//         idx + 1,
//         ...fields.map((f) => {
//           const value = getContactValueByFieldType(contact, f.type, f.label);
//           return Array.isArray(value) ? value.join("; ") : value || "";
//         }),
//         formatDate(contact.createdAt),
//       ]);

//       const csv = [headers, ...rows]
//         .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
//         .join("\n");

//       const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contact-submissions-${merchantId}-${new Date().toISOString().split("T")[0]
//         }.csv`;
//       link.click();
//       URL.revokeObjectURL(link.href);

//       setIsExporting(false);
//     }, 500);
//   }, [filteredContacts, fields, merchantId]);

//   /* ===================== REFRESH ===================== */
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       const res = await fetch(
//         `https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`
//       );
//       const json = await res.json();
//       setRefreshedData(json.data);
//     } catch (error) {
//       console.error("Error refreshing data:", error);
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   /* ===================== FILTERS ===================== */
//   const handleDateFilterChange = useCallback((value) => {
//     setDateFilter(value);
//     setCurrentPage(1);
//   }, []);

//   const handleFieldTypeFilterChange = useCallback((value) => {
//     setFieldTypeFilter(value);
//     setCurrentPage(1);
//   }, []);

//   const handleQueryValueChange = useCallback((value) => {
//     setQueryValue(value);
//     setCurrentPage(1);
//   }, []);

//   const handleQueryValueRemove = useCallback(() => {
//     setQueryValue("");
//     setCurrentPage(1);
//   }, []);

//   const handleFiltersClearAll = useCallback(() => {
//     setDateFilter([]);
//     setFieldTypeFilter([]);
//     setQueryValue("");
//     setCurrentPage(1);
//   }, []);

//   const filters = [
//     {
//       key: "dateFilter",
//       label: "Date Range",
//       filter: (
//         <ChoiceList
//           title="Filter by date"
//           titleHidden
//           choices={[
//             { label: "Today", value: "today" },
//             { label: "Yesterday", value: "yesterday" },
//             { label: "This Week", value: "this-week" },
//             { label: "This Month", value: "this-month" },
//           ]}
//           selected={dateFilter}
//           onChange={handleDateFilterChange}
//           allowMultiple
//         />
//       ),
//       shortcut: true,
//     },
//     {
//       key: "fieldTypeFilter",
//       label: "Field Type",
//       filter: (
//         <ChoiceList
//           title="Filter by field type"
//           titleHidden
//           choices={[
//             { label: "Email", value: "email" },
//             { label: "Text", value: "text" },
//             { label: "Number", value: "number" },
//             { label: "Textarea", value: "textarea" },
//             { label: "Checkbox", value: "checkbox" },
//             { label: "Dropdown", value: "dropdown" },
//             { label: "Radio", value: "radio" },
//           ]}
//           selected={fieldTypeFilter}
//           onChange={handleFieldTypeFilterChange}
//           allowMultiple
//         />
//       ),
//       shortcut: true,
//     },
//   ];

//   const appliedFilters = [];
//   if (dateFilter.length > 0) {
//     appliedFilters.push({
//       key: "dateFilter",
//       label: `Date: ${dateFilter.join(", ")}`,
//       onRemove: () => setDateFilter([]),
//     });
//   }
//   if (fieldTypeFilter.length > 0) {
//     appliedFilters.push({
//       key: "fieldTypeFilter",
//       label: `Type: ${fieldTypeFilter.join(", ")}`,
//       onRemove: () => setFieldTypeFilter([]),
//     });
//   }

//   /* ===================== STATS ===================== */
//   const todayCount = contacts.filter((c) => isToday(c.createdAt)).length;
//   const weekCount = contacts.filter((c) => isThisWeek(c.createdAt)).length;
//   const monthCount = contacts.filter((c) => isThisMonth(c.createdAt)).length;

//   /* ===================== TABLE ROWS ===================== */
//   const rowMarkup = paginatedContacts.map((contact, index) => {
//     const globalIndex = (currentPage - 1) * limit + index + 1;

//     return (
//       <IndexTable.Row id={contact._id} key={contact._id} position={index}>
//         <IndexTable.Cell>
//           <Text variant="bodyMd" fontWeight="semibold" tone="subdued">
//             #{globalIndex}
//           </Text>
//         </IndexTable.Cell>

//         {fields.map((field) => {
//           const value = getContactValueByFieldType(
//             contact,
//             field.type,
//             field.label
//           );

//           return (
//             <IndexTable.Cell key={field._id}>
//               <Box maxWidth={smDown ? "150px" : "300px"}>
//                 <Text variant="bodyMd" truncate>
//                   {Array.isArray(value)
//                     ? value.join(", ")
//                     : value || (
//                       <Text tone="subdued" fontStyle="italic">
//                         N/A
//                       </Text>
//                     )}
//                 </Text>
//               </Box>
//             </IndexTable.Cell>
//           );
//         })}

//         {fields.length > 0 && (
//           <IndexTable.Cell>
//             <BlockStack gap="100">
//               <Text variant="bodySm" fontWeight="semibold">
//                 {formatDateShort(contact.createdAt)}
//               </Text>

//             </BlockStack>
//           </IndexTable.Cell>
//         )}
//       </IndexTable.Row>
//     );
//   });

//   /* ===================== LOADING STATE ===================== */
//   if (isLoadingInitial) {
//     return (
//       <Page title="Contact Submissions">
//         <Box paddingBlockStart="1000" paddingBlockEnd="1000">
//           <InlineStack align="center" blockAlign="center">
//             <BlockStack gap="400" inlineAlign="center">
//               <Spinner size="large" />
//               <Text variant="headingLg" tone="subdued">
//                 Loading submissions...
//               </Text>
//               <Text variant="bodySm" tone="subdued">
//                 Please wait while we fetch your data
//               </Text>
//             </BlockStack>
//           </InlineStack>
//         </Box>
//       </Page>
//     );
//   }

//   /* ===================== MAIN UI ===================== */
//   return (
//     <div  >
//       <Page

//         title="Contact Submissions"
//         primaryAction={{
//           content: "Export Data",
//           icon: ExportIcon,
//           // tone: "success",
//           onAction: exportCSV,
//           loading: isExporting,
//           disabled: !fields.length || !filteredContacts.length,
//         }}
//         secondaryActions={[
//           {
//             content: "Refresh",
//             icon: RefreshIcon,
//             onAction: handleRefresh,
//             loading: isRefreshing,
//           },
//         ]}
//       >
//         <BlockStack gap="500">
//           {/* ===== STATS CARDS ===== */}
//           <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
//             <Card>
//               <BlockStack gap="200">
//                 <InlineStack align="center" style={{ width: "100%" }}>
//                   <Text variant="bodyMd" tone="subdued">
//                     Total Submissions
//                   </Text>

//                   <div
//                     style={{
//                       marginLeft: "auto",
//                       background: "#007B60",
//                       color: "white",
//                       borderRadius: "4px",
//                       padding: "6px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Icon
//                       source={EmailIcon}
//                       style={{ width: "24px", height: "24px" }}
//                     />
//                   </div>


//                 </InlineStack>
//                 <Text variant="heading2xl" fontWeight="bold">
//                   {fields.length > 0 ? contacts.length : 0}
//                 </Text>
//                 <Text variant="bodySm" tone="subdued">
//                   All time
//                 </Text>
//               </BlockStack>
//             </Card>

//             <Card>
//               <BlockStack gap="200">
//                 <InlineStack align="center" style={{ width: "100%" }}>
//                   <Text variant="bodyMd" tone="subdued">
//                     Today
//                   </Text>

//                   <div style={{
//                     marginLeft: "auto",
//                     background: "#007B60",
//                     color: "white",
//                     borderRadius: "4px",
//                     padding: "6px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}>
//                     <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
//                   </div>
//                 </InlineStack>
//                 <Text variant="heading2xl" fontWeight="bold">
//                   {fields.length > 0 ? todayCount : 0}
//                 </Text>
//                 <Text variant="bodySm" tone="subdued">
//                   {todayCount === 1 ? "submission" : "submissions"} today
//                 </Text>
//               </BlockStack>
//             </Card>

//             <Card>
//               <BlockStack gap="200">
//                 <InlineStack align="center" style={{ width: "100%" }}>
//                   <Text variant="bodyMd" tone="subdued">
//                     This Week
//                   </Text>

//                   <div style={{
//                     marginLeft: "auto",
//                     background: "#007B60",
//                     color: "white",
//                     borderRadius: "4px",
//                     padding: "6px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}>
//                     <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
//                   </div>
//                 </InlineStack>
//                 <Text variant="heading2xl" fontWeight="bold">
//                   {fields.length > 0 ? weekCount : 0}
//                 </Text>
//                 <Text variant="bodySm" tone="subdued">
//                   Last 7 days
//                 </Text>
//               </BlockStack>
//             </Card>

//             <Card>
//               <BlockStack gap="200">
//                 <InlineStack align="center" style={{ width: "100%" }}>
//                   <Text variant="bodyMd" tone="subdued">
//                     This Month
//                   </Text>
//                   <div style={{
//                     marginLeft: "auto", 
//                     background: "#007B60",
//                     color: "white",
//                     borderRadius: "4px",
//                     padding: "6px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}>
//                     <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
//                   </div>
//                 </InlineStack>

//                 <Text variant="heading2xl" fontWeight="bold">
//                   {fields.length > 0 ? monthCount : 0}
//                 </Text>
//                 <Text variant="bodySm" tone="subdued">
//                   Current month
//                 </Text>
//               </BlockStack>
//             </Card>
//           </InlineGrid>

//           {/* ===== WARNING BANNER ===== */}
//           {(!fields || fields.length === 0) && (
//             <Banner tone="warning" title="No Form Fields Configured">
//               <BlockStack gap="200">
//                 <Text variant="bodyMd">
//                   You haven't added any form fields yet. Please configure your
//                   form fields first to start collecting submissions.
//                 </Text>
//                 <InlineStack gap="200">
//                   <Button>Configure Fields</Button>
//                 </InlineStack>
//               </BlockStack>
//             </Banner>
//           )}

//           {/* ===== DATA TABLE WITH FILTERS ===== */}
//           <Card padding="0">
//             <BlockStack gap="0">
//               {/* Filters and Search */}
//               <Box padding="400">
//                 <Filters
//                   queryValue={queryValue}
//                   filters={[]}
//                   appliedFilters={appliedFilters}
//                   onQueryChange={handleQueryValueChange}
//                   onQueryClear={handleQueryValueRemove}
//                   onClearAll={handleFiltersClearAll}
//                   queryPlaceholder="Search submissions..."
//                 >
//                   <Box paddingBlockEnd="200">
//                     <Select
//                       label="Sort by"
//                       labelInline={!smDown}
//                       options={[
//                         { label: "Newest First", value: "date-desc" },
//                         { label: "Oldest First", value: "date-asc" },
//                       ]}
//                       value={sortValue}
//                       onChange={setSortValue}
//                     />
//                   </Box>
//                 </Filters>
//               </Box>

//               {/* Table */}
//               <IndexTable
//                 resourceName={{ singular: "submission", plural: "submissions" }}
//                 itemCount={paginatedContacts.length}
//                 headings={headings}
//                 selectable={false}
//                 loading={loading || isRefreshing}
//                 emptyState={
//                   fields.length === 0 ? (
//                     <EmptySearchResult
//                       title="No form fields configured"
//                       description="Configure your form fields to start collecting submissions"
//                       withIllustration
//                     />
//                   ) : queryValue || appliedFilters.length > 0 ? (
//                     <EmptySearchResult
//                       title="No results found"
//                       description="Try adjusting your search or filters"
//                       withIllustration
//                     />
//                   ) : (
//                     <EmptySearchResult
//                       title="No submissions yet"
//                       description="Submissions will appear here once customers fill out your form"
//                       withIllustration
//                     />
//                   )
//                 }
//               >
//                 {rowMarkup}
//               </IndexTable>

//               {/* Pagination */}
//               {filteredContacts.length > 0 && fields.length > 0 && (
//                 <>
//                   <Divider />
//                   <Box padding="400">
//                     <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                       <Box minWidth={smDown ? "100%" : "auto"}>
//                         <Text variant="bodySm" tone="subdued">
//                           Showing {startIndex}-{endIndex} of{" "}
//                           {filteredContacts.length}{" "}
//                           {filteredContacts.length === 1
//                             ? "submission"
//                             : "submissions"}
//                         </Text>
//                       </Box>
//                       <ButtonGroup>
//                         <Button
//                           disabled={currentPage === 1}
//                           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                         >
//                           Previous
//                         </Button>
//                         <Button
//                           disabled={currentPage === totalPages}
//                           onClick={() =>
//                             setCurrentPage((p) => Math.min(totalPages, p + 1))
//                           }
//                         >
//                           Next
//                         </Button>
//                       </ButtonGroup>
//                     </InlineStack>
//                   </Box>
//                 </>
//               )}
//             </BlockStack>
//           </Card>
//         </BlockStack>
//       </Page>
//     </div>
//   );
// }

















import { useLoaderData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Page,
  LegacyCard,
  Card,
  IndexTable,
  Text,
  Badge,
  Button,
  TextField,
  Select,
  EmptySearchResult,
  InlineStack,
  BlockStack,
  Icon,
  ButtonGroup,
  Box,
  Banner,
  Spinner,
  Divider,
  Filters,
  ChoiceList,
  DatePicker,
  Popover,
  InlineGrid,
  useBreakpoints,
  Modal,
} from "@shopify/polaris";
import {
  SearchIcon,
  ExportIcon,
  CalendarIcon,
  FilterIcon,
  RefreshIcon,
  DeleteIcon,
  EmailIcon,
  CheckCircleIcon,
  ViewIcon,
  PersonIcon,
} from "@shopify/polaris-icons";

/* ===================== LOADER ===================== */
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const shopRes = await admin.graphql(`
    query {
      shop {
        id
        name
        email
      }
    }
  `);

  const shopJson = await shopRes.json();
  const merchantId = shopJson.data.shop.id.split("/").pop();
  const shopName = shopJson.data.shop.name;

  const res = await fetch(
    `https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`
  );
  const json = await res.json();

  return {
    merchant: json.data,
    merchantId,
    shopName,
  };
};

/* ===================== COMPONENT ===================== */
export default function Index() {
  const { merchant, merchantId, shopName } = useLoaderData();
  const nav = useNavigation();
  const { smDown, mdDown } = useBreakpoints();
  const loading = nav.state === "submitting";

  // State Management
  const [refreshedData, setRefreshedData] = useState(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [popoverActive, setPopoverActive] = useState(false);

  // Filter States
  const [dateFilter, setDateFilter] = useState([]);
  const [fieldTypeFilter, setFieldTypeFilter] = useState([]);
  const [queryValue, setQueryValue] = useState("");

  // Modal State for viewing full data
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = refreshedData?.contacts || merchant?.contacts || [];
  const fields =
    refreshedData?.formTemplates?.[0]?.fields ||
    merchant?.formTemplates?.[0]?.fields ||
    [];

  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingInitial(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  /* ===================== HELPERS ===================== */
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(date);
    return (
      today.getDate() === d.getDate() &&
      today.getMonth() === d.getMonth() &&
      today.getFullYear() === d.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const d = new Date(date);
    return (
      yesterday.getDate() === d.getDate() &&
      yesterday.getMonth() === d.getMonth() &&
      yesterday.getFullYear() === d.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    const now = new Date();
    const d = new Date(date);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    return d >= weekStart;
  };

  const isThisMonth = (date) => {
    const now = new Date();
    const d = new Date(date);
    return (
      now.getMonth() === d.getMonth() && now.getFullYear() === d.getFullYear()
    );
  };

  /* ===================== GET CONTACT VALUE ===================== */
  const getContactValueByFieldType = (contact, fieldType, fieldLabel) => {
    const typeMap = {
      text: "text",
      email: "email",
      number: "number",
      textarea: "textarea",
      checkbox: "checkbox",
      dropdown: "dropdown",
      radio: "radio",
    };

    const dataKey = typeMap[fieldType];

    // Check if data exists and is not empty
    if (!contact[dataKey] || Object.keys(contact[dataKey]).length === 0) {
      return null;
    }

    const dataObject = contact[dataKey];

    // Try exact label match first
    if (dataObject[fieldLabel] !== undefined && dataObject[fieldLabel] !== null && dataObject[fieldLabel] !== "") {
      return dataObject[fieldLabel];
    }

    // Normalize labels: remove emojis, trim, lowercase, but keep alphanumeric and spaces
    const normalizeLabel = (label) => {
      if (!label) return '';
      return String(label)
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
        .replace(/[^\w\s]/g, '') // Remove special characters except spaces and alphanumeric
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
    };

    const normalizedFieldLabel = normalizeLabel(fieldLabel);
    
    // If normalized label is empty, return null
    if (!normalizedFieldLabel) {
      return null;
    }

    // Try normalized exact match
    for (const [key, value] of Object.entries(dataObject)) {
      if (value === null || value === undefined || value === "") continue;
      const normalizedKey = normalizeLabel(key);
      if (normalizedKey === normalizedFieldLabel) {
        return value;
      }
    }

    // Try partial match - check if key contains field label or vice versa
    for (const [key, value] of Object.entries(dataObject)) {
      if (value === null || value === undefined || value === "") continue;
      const normalizedKey = normalizeLabel(key);
      if (normalizedKey && normalizedFieldLabel) {
        // Check if one contains the other (bidirectional)
        if (normalizedKey.includes(normalizedFieldLabel) || normalizedFieldLabel.includes(normalizedKey)) {
          // For telephone/phone, prefer longer match to avoid false positives
          if (normalizedKey.length >= normalizedFieldLabel.length * 0.6) {
            return value;
          }
        }
      }
    }

    // Try word-by-word match for telephone/phone variations
    const fieldWords = normalizedFieldLabel.split(/\s+/).filter(w => w.length > 0);
    if (fieldWords.length > 0) {
      for (const [key, value] of Object.entries(dataObject)) {
        if (value === null || value === undefined || value === "") continue;
        const normalizedKey = normalizeLabel(key);
        if (normalizedKey) {
          const keyWords = normalizedKey.split(/\s+/).filter(w => w.length > 0);
          // Check if all significant words from field label exist in key
          const allWordsMatch = fieldWords.every(word => 
            keyWords.some(kw => kw.includes(word) || word.includes(kw))
          );
          if (allWordsMatch && fieldWords.length > 0) {
            return value;
          }
        }
      }
    }

    // No match found - return null
    return null;
  };

  /* ===================== FILTER + SORT + SEARCH ===================== */
  const filteredContacts = useMemo(() => {
    let data = [...contacts];

    // Date filters
    if (dateFilter.length > 0) {
      data = data.filter((contact) => {
        if (dateFilter.includes("today")) {
          if (isToday(contact.createdAt)) return true;
        }
        if (dateFilter.includes("yesterday")) {
          if (isYesterday(contact.createdAt)) return true;
        }
        if (dateFilter.includes("this-week")) {
          if (isThisWeek(contact.createdAt)) return true;
        }
        if (dateFilter.includes("this-month")) {
          if (isThisMonth(contact.createdAt)) return true;
        }
        return false;
      });
    }

    // Field type filters
    if (fieldTypeFilter.length > 0) {
      data = data.filter((contact) => {
        return fields.some((field) => {
          if (!fieldTypeFilter.includes(field.type)) return false;
          const value = getContactValueByFieldType(
            contact,
            field.type,
            field.label
          );
          return value !== null && value !== undefined && value !== "";
        });
      });
    }

    // Search/Query filter
    if (queryValue) {
      const q = queryValue.toLowerCase();
      data = data.filter((contact) =>
        fields.some((field) => {
          const value = getContactValueByFieldType(
            contact,
            field.type,
            field.label
          );

          if (Array.isArray(value)) {
            return value.some((v) => v.toString().toLowerCase().includes(q));
          }

          return value?.toString().toLowerCase().includes(q);
        })
      );
    }

    // Sorting
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortValue === "date-asc" ? dateA - dateB : dateB - dateA;
    });

    return data;
  }, [contacts, dateFilter, fieldTypeFilter, queryValue, fields, sortValue]);

  /* ===================== PAGINATION ===================== */
  const totalPages = Math.ceil(filteredContacts.length / limit);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const startIndex =
    filteredContacts.length === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, filteredContacts.length);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* ===================== HEADINGS ===================== */
  const headings = useMemo(() => {
    if (!fields || fields.length === 0) {
      return [];
    }

    return [ 
      ...fields.map((f) => ({
        title: f.label.replace("/", "").trim(),
      })),
      { title: "Submitted" },
      { title: "View" },
    ];
  }, [fields]);

  /* ===================== CSV EXPORT ===================== */
  const exportCSV = useCallback(() => {
    if (!filteredContacts.length || !fields.length) return;

    setIsExporting(true);

    setTimeout(() => {
      const headers = [ 
        ...fields.map((f) => f.label),
        "Submission Date",
        "View",
      ];

      const rows = filteredContacts.map((contact, idx) => [
        idx + 1,
        ...fields.map((f) => {
          const value = getContactValueByFieldType(contact, f.type, f.label);
          return Array.isArray(value) ? value.join("; ") : value || "";
        }),
        formatDate(contact.createdAt),
      ]);

      const csv = [headers, ...rows]
        .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `contact-submissions-${merchantId}-${new Date().toISOString().split("T")[0]
        }.csv`;
      link.click();
      URL.revokeObjectURL(link.href);

      setIsExporting(false);
    }, 500);
  }, [filteredContacts, fields, merchantId]);

  /* ===================== REFRESH ===================== */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(
        `https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`
      );
      const json = await res.json();
      setRefreshedData(json.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  /* ===================== FILTERS ===================== */
  const handleDateFilterChange = useCallback((value) => {
    setDateFilter(value);
    setCurrentPage(1);
  }, []);

  const handleFieldTypeFilterChange = useCallback((value) => {
    setFieldTypeFilter(value);
    setCurrentPage(1);
  }, []);

  const handleQueryValueChange = useCallback((value) => {
    setQueryValue(value);
    setCurrentPage(1);
  }, []);

  const handleQueryValueRemove = useCallback(() => {
    setQueryValue("");
    setCurrentPage(1);
  }, []);

  const handleFiltersClearAll = useCallback(() => {
    setDateFilter([]);
    setFieldTypeFilter([]);
    setQueryValue("");
    setCurrentPage(1);
  }, []);

  const filters = [
    {
      key: "dateFilter",
      label: "Date Range",
      filter: (
        <ChoiceList
          title="Filter by date"
          titleHidden
          choices={[
            { label: "Today", value: "today" },
            { label: "Yesterday", value: "yesterday" },
            { label: "This Week", value: "this-week" },
            { label: "This Month", value: "this-month" },
          ]}
          selected={dateFilter}
          onChange={handleDateFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "fieldTypeFilter",
      label: "Field Type",
      filter: (
        <ChoiceList
          title="Filter by field type"
          titleHidden
          choices={[
            { label: "Email", value: "email" },
            { label: "Text", value: "text" },
            { label: "Number", value: "number" },
            { label: "Textarea", value: "textarea" },
            { label: "Checkbox", value: "checkbox" },
            { label: "Dropdown", value: "dropdown" },
            { label: "Radio", value: "radio" },
          ]}
          selected={fieldTypeFilter}
          onChange={handleFieldTypeFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (dateFilter.length > 0) {
    appliedFilters.push({
      key: "dateFilter",
      label: `Date: ${dateFilter.join(", ")}`,
      onRemove: () => setDateFilter([]),
    });
  }
  if (fieldTypeFilter.length > 0) {
    appliedFilters.push({
      key: "fieldTypeFilter",
      label: `Type: ${fieldTypeFilter.join(", ")}`,
      onRemove: () => setFieldTypeFilter([]),
    });
  }

  /* ===================== STATS ===================== */
  const todayCount = contacts.filter((c) => isToday(c.createdAt)).length;
  const weekCount = contacts.filter((c) => isThisWeek(c.createdAt)).length;
  const monthCount = contacts.filter((c) => isThisMonth(c.createdAt)).length;

  /* ===================== TABLE ROWS ===================== */
  const rowMarkup = paginatedContacts.map((contact, index) => {
    const globalIndex = (currentPage - 1) * limit + index + 1;

    return (
      <IndexTable.Row id={contact._id} key={contact._id} position={index}>
       

        {/* Name Column */}
        {/* <IndexTable.Cell>
          <Text variant="bodySm" truncate>
            {(() => {
              // Try to get name from first text field, or email, or first field
              const nameField = fields.find(f => 
                f.type === "text" || f.type === "email"
              ) || fields[0];
              
              if (nameField) {
                const nameValue = getContactValueByFieldType(
                  contact,
                  nameField.type,
                  nameField.label
                );
                const displayName = Array.isArray(nameValue)
                  ? nameValue.join(", ")
                  : nameValue;
                return displayName || "N/A";
              }
              return "N/A";
            })()}
          </Text>
        </IndexTable.Cell> */}

        {fields.map((field) => {
          const value = getContactValueByFieldType(
            contact,
            field.type,
            field.label
          );

          const displayValue = Array.isArray(value)
            ? value.join(", ")
            : value;

          // Truncate to 15 characters
          const maxLength = 15;
          const isTruncated = displayValue && displayValue.length > maxLength;
          const truncatedValue = isTruncated
            ? displayValue.substring(0, maxLength) + "..."
            : displayValue;

          return (
            <IndexTable.Cell key={field._id}>
              <Text 
                variant="bodySm" 
                truncate={false}
                tone={displayValue ? undefined : "subdued"}
              >
                {truncatedValue || (
                  <Text as="span" tone="subdued" fontStyle="italic">
                    N/A
                  </Text>
                )}
              </Text>
            </IndexTable.Cell>
          );
        })}

        {fields.length > 0 && (
          <>
            <IndexTable.Cell>
              <Text variant="bodySm" fontWeight="semibold">
                {formatDateShort(contact.createdAt)}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Button
                plain
                icon={ViewIcon}
                onClick={() => {
                  setSelectedContact(contact);
                  setViewModalOpen(true);
                }}
                accessibilityLabel="View full details"
              />
            </IndexTable.Cell>
          </>
        )}
      </IndexTable.Row>
    );
  });

  /* ===================== LOADING STATE ===================== */
  if (isLoadingInitial) {
    return (
      <Page title="Contact Submissions">
        <Box paddingBlockStart="1000" paddingBlockEnd="1000">
          <InlineStack align="center" blockAlign="center">
            <BlockStack gap="400" inlineAlign="center">
              <Spinner size="large" />
              <Text variant="headingLg" tone="subdued">
                Loading submissions...
              </Text>
              <Text variant="bodySm" tone="subdued">
                Please wait while we fetch your data
              </Text>
            </BlockStack>
          </InlineStack>
        </Box>
      </Page>
    );
  }

  /* ===================== MAIN UI ===================== */
  return (
    <div  >
      <Page

        title="Contact Submissions"
        primaryAction={{
          content: "Export Data",
          icon: ExportIcon,
          // tone: "success",
          onAction: exportCSV,
          loading: isExporting,
          disabled: !fields.length || !filteredContacts.length,
        }}
        secondaryActions={[
          {
            content: "Refresh",
            icon: RefreshIcon,
            onAction: handleRefresh,
            loading: isRefreshing,
          },
        ]}
      >
        <BlockStack gap="500">
          {/* ===== STATS CARDS ===== */}
          <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
            <Card>
              <BlockStack gap="200">
                <InlineStack align="center" style={{ width: "100%" }}>
                  <Text variant="bodyMd" tone="subdued">
                    Total Submissions
                  </Text>

                  <div
                    style={{
                      marginLeft: "auto",
                      background: "#007B60",
                      color: "white",
                      borderRadius: "4px",
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      source={EmailIcon}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </div>


                </InlineStack>
                <Text variant="heading2xl" fontWeight="bold">
                  {fields.length > 0 ? contacts.length : 0}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  All time
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <InlineStack align="center" style={{ width: "100%" }}>
                  <Text variant="bodyMd" tone="subdued">
                    Today
                  </Text>

                  <div style={{
                    marginLeft: "auto",
                    background: "#007B60",
                    color: "white",
                    borderRadius: "4px",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
                  </div>
                </InlineStack>
                <Text variant="heading2xl" fontWeight="bold">
                  {fields.length > 0 ? todayCount : 0}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  {todayCount === 1 ? "submission" : "submissions"} today
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <InlineStack align="center" style={{ width: "100%" }}>
                  <Text variant="bodyMd" tone="subdued">
                    This Week
                  </Text>

                  <div style={{
                    marginLeft: "auto",
                    background: "#007B60",
                    color: "white",
                    borderRadius: "4px",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
                  </div>
                </InlineStack>
                <Text variant="heading2xl" fontWeight="bold">
                  {fields.length > 0 ? weekCount : 0}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Last 7 days
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <InlineStack align="center" style={{ width: "100%" }}>
                  <Text variant="bodyMd" tone="subdued">
                    This Month
                  </Text>
                  <div style={{
                    marginLeft: "auto", 
                    background: "#007B60",
                    color: "white",
                    borderRadius: "4px",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon source={CalendarIcon} style={{ width: "24px", height: "24px" }} />
                  </div>
                </InlineStack>

                <Text variant="heading2xl" fontWeight="bold">
                  {fields.length > 0 ? monthCount : 0}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Current month
                </Text>
              </BlockStack>
            </Card>
          </InlineGrid>

          {/* ===== WARNING BANNER ===== */}
          {(!fields || fields.length === 0) && (
            <Banner tone="warning" title="No Form Fields Configured">
              <BlockStack gap="200">
                <Text variant="bodyMd">
                  You haven't added any form fields yet. Please configure your
                  form fields first to start collecting submissions.
                </Text>
                <InlineStack gap="200">
                  <Button>Configure Fields</Button>
                </InlineStack>
              </BlockStack>
            </Banner>
          )}

          {/* ===== DATA TABLE WITH FILTERS ===== */}
          <Card padding="0">
            <BlockStack gap="0">
              {/* Filters and Search */}
              <Box padding="400">
                <Filters
                  queryValue={queryValue}
                  filters={[]}
                  appliedFilters={appliedFilters}
                  onQueryChange={handleQueryValueChange}
                  onQueryClear={handleQueryValueRemove}
                  onClearAll={handleFiltersClearAll}
                  queryPlaceholder="Search submissions..."
                >
                  <Box paddingBlockEnd="200">
                    <Select
                      label="Sort by"
                      labelInline={!smDown}
                      options={[
                        { label: "Newest First", value: "date-desc" },
                        { label: "Oldest First", value: "date-asc" },
                      ]}
                      value={sortValue}
                      onChange={setSortValue}
                    />
                  </Box>
                </Filters>
              </Box>

              {/* Table */}
              <IndexTable
                resourceName={{ singular: "submission", plural: "submissions" }}
                itemCount={paginatedContacts.length}
                headings={headings}
                selectable={false}
                loading={loading || isRefreshing}
                emptyState={
                  fields.length === 0 ? (
                    <EmptySearchResult
                      title="No form fields configured"
                      description="Configure your form fields to start collecting submissions"
                      withIllustration
                    />
                  ) : queryValue || appliedFilters.length > 0 ? (
                    <EmptySearchResult
                      title="No results found"
                      description="Try adjusting your search or filters"
                      withIllustration
                    />
                  ) : (
                    <EmptySearchResult
                      title="No submissions yet"
                      description="Submissions will appear here once customers fill out your form"
                      withIllustration
                    />
                  )
                }
              >
                {rowMarkup}
              </IndexTable>

              {/* Pagination */}
              {filteredContacts.length > 0 && fields.length > 0 && (
                <>
                  <Divider />
                  <Box padding="400">
                    <InlineStack align="space-between" blockAlign="center" wrap={false}>
                      <Box minWidth={smDown ? "100%" : "auto"}>
                        <Text variant="bodySm" tone="subdued">
                          Showing {startIndex}-{endIndex} of{" "}
                          {filteredContacts.length}{" "}
                          {filteredContacts.length === 1
                            ? "submission"
                            : "submissions"}
                        </Text>
                      </Box>
                      <ButtonGroup>
                        <Button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        <Button
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                        >
                          Next
                        </Button>
                      </ButtonGroup>
                    </InlineStack>
                  </Box>
                </>
              )}
            </BlockStack>
          </Card>
        </BlockStack>
      </Page>

      {/* View Full Data Modal */}
      <Modal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedContact(null);
        }}
        title="Full Submission Details"
        primaryAction={{
          content: "Close",
          onAction: () => {
            setViewModalOpen(false);
            setSelectedContact(null);
          },
        }}
        large
      >
        <Modal.Section>
          {selectedContact && (
            <BlockStack gap="400">
              <BlockStack gap="200">
                <Text variant="headingMd" fontWeight="semibold">
                  Submission Information
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Submitted on {formatDate(selectedContact.createdAt)}
                </Text>
              </BlockStack>

              <Divider />

              <BlockStack gap="300">
                {fields.map((field) => {
                  const value = getContactValueByFieldType(
                    selectedContact,
                    field.type,
                    field.label
                  );

                  const displayValue = Array.isArray(value)
                    ? value.join(", ")
                    : value || "N/A";

                  return (
                    <BlockStack key={field._id} gap="100">
                      <Text variant="bodySm" fontWeight="semibold" tone="subdued">
                        {field.label}
                      </Text>
                      <Box
                        padding="300"
                        background="bg-surface-secondary"
                        borderRadius="200"
                      >
                        <Text variant="bodyMd">
                          {displayValue}
                        </Text>
                      </Box>
                    </BlockStack>
                  );
                })}
              </BlockStack>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>
    </div>
  );
}















