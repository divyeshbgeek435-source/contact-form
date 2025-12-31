
// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useMemo, useEffect, useCallback } from "react";
// import {
//   Page,
//   LegacyCard,
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
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
//   RefreshIcon,
// } from "@shopify/polaris-icons";

// /* ===================== LOADER ===================== */
// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopRes = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//       }
//     }
//   `);

//   const shopJson = await shopRes.json();
//   const merchantId = shopJson.data.shop.id.split("/").pop();

//   const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
//   const json = await res.json();

//   return {
//     merchant: json.data,
//     merchantId,
//   };
// };

// /* ===================== FIELD → CONTACT KEY MAP ===================== */
// const FIELD_TYPE_MAP = {
//   text: "text",
//   email: "email",
//   number: "number",
//   textarea: "textarea",
//   checkbox: "checkbox",
//   select: "dropdown",
//   radio: "radio",
// };

// /* ===================== COMPONENT ===================== */
// export default function Index() {
//   const { merchant, merchantId } = useLoaderData();
//   const nav = useNavigation();
//   const loading = nav.state === "submitting";

//   const [refreshedData, setRefreshedData] = useState(null);

//   const contacts = refreshedData?.contacts || merchant?.contacts || [];
//   const fields =
//     refreshedData?.formTemplates?.fields ||
//     merchant?.formTemplates?.fields ||
//     [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const limit = 15;

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const t = new Date();
//     const d = new Date(date);
//     return (
//       t.getDate() === d.getDate() &&
//       t.getMonth() === d.getMonth() &&
//       t.getFullYear() === d.getFullYear()
//     );
//   };

//   /* ===================== FILTER + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     if (dateFilter === "today") {
//       data = data.filter((c) => isToday(c.createdAt));
//     }

//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) =>
//         fields.some((field) => {
//           const key = FIELD_TYPE_MAP[field.type];
//           const value = c?.[key]?.[field.label];

//           if (Array.isArray(value)) {
//             return value.some((v) =>
//               v.toString().toLowerCase().includes(q)
//             );
//           }

//           return value?.toString().toLowerCase().includes(q);
//         })
//       );
//     }

//     data.sort((a, b) => {
//       const da = new Date(a.createdAt);
//       const db = new Date(b.createdAt);
//       return sort === "date-asc" ? da - db : db - da;
//     });

//     return data;
//   }, [contacts, search, sort, dateFilter, fields]);

//   /* ===================== PAGINATION ===================== */
//   const totalPages = Math.ceil(filteredContacts.length / limit);
//   const paginated = filteredContacts.slice(
//     (page - 1) * limit,
//     page * limit
//   );

//   const startIndex =
//     filteredContacts.length === 0 ? 0 : (page - 1) * limit + 1;
//   const endIndex = Math.min(page * limit, filteredContacts.length);

//   /* ===================== HEADINGS ===================== */
//   const headings = useMemo(() => {
//     // ✅ Only show headings if fields exist
//     if (!fields || fields.length === 0) {
//       return [];
//     }

//     return [
//       ...fields.map((f) => ({
//         title: f.label.replace("/", "").trim(),
//       })),
//       { title: "Date" }, // Only added when fields exist
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     // ✅ Don't export if no fields or contacts
//     if (!filteredContacts.length || !fields.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [...fields.map((f) => f.label), "Date"];

//       const rows = filteredContacts.map((c) => [
//         ...fields.map((f) => {
//           const key = FIELD_TYPE_MAP[f.type];
//           const value = c?.[key]?.[f.label];
//           return Array.isArray(value) ? value.join("; ") : value || "";
//         }),
//         formatDate(c.createdAt),
//       ]);

//       const csv = [headers, ...rows]
//         .map((r) => r.map((v) => `"${v}"`).join(","))
//         .join("\n");

//       const blob = new Blob([csv], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contacts_${merchantId}.csv`;
//       link.click();

//       setIsExporting(false);
//     }, 300);
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

//   /* ===================== STATS ===================== */
//   const todayContactsCount = contacts.filter((c) =>
//     isToday(c.createdAt)
//   ).length;

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//     >
//       {fields.map((field) => {
//         const key = FIELD_TYPE_MAP[field.type];
//         const value = contact?.[key]?.[field.label];

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Box maxWidth="300px">
//               <Text variant="bodyMd">
//                 {Array.isArray(value)
//                   ? value.join(", ")
//                   : value || "N/A"}
//               </Text>
//             </Box>
//           </IndexTable.Cell>
//         );
//       })}

//       {/* ✅ Only show date cell if fields exist */}
//       {fields.length > 0 && (
//         <IndexTable.Cell>
//           <Text variant="bodyMd">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </IndexTable.Cell>
//       )}
//     </IndexTable.Row>
//   ));

//   /* ===================== UI ===================== */
//   return (
//     <Page
//       title="Contact Submissions"
//       subtitle="View and manage all form submissions"
//     >
//       <BlockStack gap="500">
//         {/* ===== ACTION BUTTONS ===== */}
//         <InlineStack align="end" gap="200">
//           <Button
//             icon={RefreshIcon}
//             onClick={handleRefresh}
//             loading={isRefreshing}
//           >
//             Refresh
//           </Button>
//           <Button
//             icon={ExportIcon}
//             tone="success"
//             onClick={exportCSV}
//             loading={isExporting}
//             disabled={!fields.length || !filteredContacts.length}
//           >
//             Export CSV
//           </Button>
//         </InlineStack>

//         {/* ===== STATS BOXES ===== */}
//         <InlineStack gap="400" wrap>
//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Today's Submissions</Text>
//               <Text variant="heading2xl" fontWeight="bold">  {fields.length > 0 ? todayContactsCount : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Total Entries</Text>
//               <Text variant="heading2xl" fontWeight="bold">  {fields.length > 0 ? contacts.length : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Showing Results</Text>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {/* {filteredContacts.length > 0 ? `${startIndex}-${endIndex}` : "0"} of {filteredContacts.length} */}
//                 {fields.length > 0 && filteredContacts.length > 0 
//     ? `${startIndex}-${endIndex}` 
//     : "0"} of {fields.length > 0 ? filteredContacts.length : 0}
//               </Text>
//             </BlockStack>
//           </Box>
//         </InlineStack>

//         {/* ✅ WARNING BANNER - Show when no fields exist */}
//         {(!fields || fields.length === 0) && (
//           <Banner tone="warning" title="No Form Fields Configured">
//             <BlockStack gap="200">
//               <Text variant="bodyMd">
//                 You haven't added any form fields yet. Please configure your form fields first to start collecting submissions.
//               </Text>
//               {/* <InlineStack gap="200">
//                 <Button url="/app/fromdata">Go to Form Builder</Button>
//               </InlineStack> */}
//             </BlockStack>
//           </Banner>
//         )}

//         {/* ===== DATA TABLE ===== */}
//         <LegacyCard>
//           <IndexTable
//             resourceName={{ singular: "contact", plural: "contacts" }}
//             itemCount={paginated.length}
//             headings={headings}
//             selectable={false}
//             loading={loading}
//             emptyState={
//               fields.length === 0 ? (
//                 <EmptySearchResult
//                   title="No form fields configured"
//                   description="Please add form fields to start collecting submissions"
//                   withIllustration
//                 />
//               ) : (
//                 <EmptySearchResult
//                   title="No contacts found"
//                   description="No submissions yet"
//                   withIllustration
//                 />
//               )
//             }
//           >
//             {rowMarkup}
//           </IndexTable>

//           {/* ✅ PAGINATION - Only show when fields and contacts exist */}
//           {filteredContacts.length > 0 && fields.length > 0 && (
//             <Box padding="400" borderBlockStartWidth="025" borderColor="border">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodySm" tone="subdued">
//                   Showing {startIndex}-{endIndex} of{" "}
//                   {filteredContacts.length} {filteredContacts.length === 1 ? "entry" : "entries"}
//                 </Text>
//                 <ButtonGroup>
//                   <Button
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <Text variant="bodySm" tone="subdued">
//                     Page {page} of {totalPages}
//                   </Text>
//                   <Button
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </Button>
//                 </ButtonGroup>
//               </InlineStack>
//             </Box>
//           )}
//         </LegacyCard>
//       </BlockStack>
//     </Page>
//   );
// }


// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useMemo, useEffect, useCallback } from "react";
// import {
//   Page,
//   LegacyCard,
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
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
//   RefreshIcon,
// } from "@shopify/polaris-icons";

// /* ===================== LOADER ===================== */
// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopRes = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//       }
//     }
//   `);

//   const shopJson = await shopRes.json();
//   const merchantId = shopJson.data.shop.id.split("/").pop();

//   const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
//   const json = await res.json();

//   return {
//     merchant: json.data,
//     merchantId,
//   };
// };

// /* ===================== COMPONENT ===================== */
// export default function Index() {
//   const { merchant, merchantId } = useLoaderData();
//   const nav = useNavigation();
//   const loading = nav.state === "submitting";

//   const [refreshedData, setRefreshedData] = useState(null);

//   const contacts = refreshedData?.contacts || merchant?.contacts || [];
//   const fields =
//     refreshedData?.formTemplates?.[0]?.fields ||
//     merchant?.formTemplates?.[0]?.fields ||
//     [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const limit = 15;

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const t = new Date();
//     const d = new Date(date);
//     return (
//       t.getDate() === d.getDate() &&
//       t.getMonth() === d.getMonth() &&
//       t.getFullYear() === d.getFullYear()
//     );
//   };

//   /* ===================== HELPER: Get value from contact based on field type ===================== */
//   const getContactValueByFieldType = (contact, fieldType, fieldLabel) => {
//     // Map field types to contact data keys
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

//     // Check if contact has this type of data
//     if (!contact[dataKey]) {
//       return null;
//     }

//     // Get all values in this type
//     const dataObject = contact[dataKey];

//     // Try to find by exact label match first
//     if (dataObject[fieldLabel] !== undefined) {
//       return dataObject[fieldLabel];
//     }

//     // If exact match not found, return first value of this type
//     const values = Object.values(dataObject);
//     return values.length > 0 ? values[0] : null;
//   };

//   /* ===================== FILTER + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     if (dateFilter === "today") {
//       data = data.filter((c) => isToday(c.createdAt));
//     }

//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) =>
//         fields.some((field) => {
//           const value = getContactValueByFieldType(c, field.type, field.label);

//           if (Array.isArray(value)) {
//             return value.some((v) =>
//               v.toString().toLowerCase().includes(q)
//             );
//           }

//           return value?.toString().toLowerCase().includes(q);
//         })
//       );
//     }

//     data.sort((a, b) => {
//       const da = new Date(a.createdAt);
//       const db = new Date(b.createdAt);
//       return sort === "date-asc" ? da - db : db - da;
//     });

//     return data;
//   }, [contacts, search, sort, dateFilter, fields]);

//   /* ===================== PAGINATION ===================== */
//   const totalPages = Math.ceil(filteredContacts.length / limit);
//   const paginated = filteredContacts.slice(
//     (page - 1) * limit,
//     page * limit
//   );

//   const startIndex =
//     filteredContacts.length === 0 ? 0 : (page - 1) * limit + 1;
//   const endIndex = Math.min(page * limit, filteredContacts.length);

//   /* ===================== HEADINGS ===================== */
//   const headings = useMemo(() => {
//     if (!fields || fields.length === 0) {
//       return [];
//     }

//     return [
//       ...fields.map((f) => ({
//         title: f.label.replace("/", "").trim(),
//       })),
//       { title: "Date" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length || !fields.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [...fields.map((f) => f.label), "Date"];

//       const rows = filteredContacts.map((c) => [
//         ...fields.map((f) => {
//           const value = getContactValueByFieldType(c, f.type, f.label);
//           return Array.isArray(value) ? value.join("; ") : value || "";
//         }),
//         formatDate(c.createdAt),
//       ]);

//       const csv = [headers, ...rows]
//         .map((r) => r.map((v) => `"${v}"`).join(","))
//         .join("\n");

//       const blob = new Blob([csv], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contacts_${merchantId}.csv`;
//       link.click();

//       setIsExporting(false);
//     }, 300);
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

//   /* ===================== STATS ===================== */
//   const todayContactsCount = contacts.filter((c) =>
//     isToday(c.createdAt)
//   ).length;

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//     >
//       {fields.map((field) => {
//         const value = getContactValueByFieldType(contact, field.type, field.label);

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Box maxWidth="300px">
//               <Text variant="bodyMd">
//                 {Array.isArray(value)
//                   ? value.join(", ")
//                   : value || "N/A"}
//               </Text>
//             </Box>
//           </IndexTable.Cell>
//         );
//       })}

//       {fields.length > 0 && (
//         <IndexTable.Cell>
//           <Text variant="bodyMd">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </IndexTable.Cell>
//       )}
//     </IndexTable.Row>
//   ));

//   /* ===================== UI ===================== */
//   return (
//     <Page
//       title="Contact Submissions"
//       subtitle="View and manage all form submissions"
//     >
//       <BlockStack gap="500">
//         {/* ===== ACTION BUTTONS ===== */}
//         <InlineStack align="end" gap="200">
//           <Button
//             icon={RefreshIcon}
//             onClick={handleRefresh}
//             loading={isRefreshing}
//           >
//             Refresh
//           </Button>
//           <Button
//             icon={ExportIcon}
//             tone="success"
//             onClick={exportCSV}
//             loading={isExporting}
//             disabled={!fields.length || !filteredContacts.length}
//           >
//             Export CSV
//           </Button>
//         </InlineStack>

//         {/* ===== STATS BOXES ===== */}
//         <InlineStack gap="400" wrap>
//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Today's Submissions</Text>
//               <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? todayContactsCount : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Total Entries</Text>
//               <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? contacts.length : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Showing Results</Text>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 && filteredContacts.length > 0 
//                   ? `${startIndex}-${endIndex}` 
//                   : "0"} of {fields.length > 0 ? filteredContacts.length : 0}
//               </Text>
//             </BlockStack>
//           </Box>
//         </InlineStack>

//         {/* ===== WARNING BANNER ===== */}
//         {(!fields || fields.length === 0) && (
//           <Banner tone="warning" title="No Form Fields Configured">
//             <BlockStack gap="200">
//               <Text variant="bodyMd">
//                 You haven't added any form fields yet. Please configure your form fields first to start collecting submissions.
//               </Text>
//             </BlockStack>
//           </Banner>
//         )}

//         {/* ===== DATA TABLE ===== */}
//         <LegacyCard>
//           <IndexTable
//             resourceName={{ singular: "contact", plural: "contacts" }}
//             itemCount={paginated.length}
//             headings={headings}
//             selectable={false}
//             loading={loading}
//             emptyState={
//               fields.length === 0 ? (
//                 <EmptySearchResult
//                   title="No form fields configured"
//                   description="Please add form fields to start collecting submissions"
//                   withIllustration
//                 />
//               ) : (
//                 <EmptySearchResult
//                   title="No contacts found"
//                   description="No submissions yet"
//                   withIllustration
//                 />
//               )
//             }
//           >
//             {rowMarkup}
//           </IndexTable>

//           {/* ===== PAGINATION ===== */}
//           {filteredContacts.length > 0 && fields.length > 0 && (
//             <Box padding="400" borderBlockStartWidth="025" borderColor="border">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodySm" tone="subdued">
//                   Showing {startIndex}-{endIndex} of{" "}
//                   {filteredContacts.length} {filteredContacts.length === 1 ? "entry" : "entries"}
//                 </Text>
//                 <ButtonGroup>
//                   <Button
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <Text variant="bodySm" tone="subdued">
//                     Page {page} of {totalPages}
//                   </Text>
//                   <Button
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </Button>
//                 </ButtonGroup>
//               </InlineStack>
//             </Box>
//           )}
//         </LegacyCard>
//       </BlockStack>
//     </Page>
//   );
// }



















// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useMemo, useEffect, useCallback } from "react";
// import {
//   Page,
//   LegacyCard,
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
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
//   RefreshIcon,
// } from "@shopify/polaris-icons";

// /* ===================== LOADER ===================== */
// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopRes = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//       }
//     }
//   `);

//   const shopJson = await shopRes.json();
//   const merchantId = shopJson.data.shop.id.split("/").pop();

//   const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
//   const json = await res.json();

//   return {
//     merchant: json.data,
//     merchantId,
//   };
// };

// /* ===================== COMPONENT ===================== */
// export default function Index() {
//   const { merchant, merchantId } = useLoaderData();
//   const nav = useNavigation();
//   const loading = nav.state === "submitting";

//   const [refreshedData, setRefreshedData] = useState(null);
//   const [isLoadingInitial, setIsLoadingInitial] = useState(true);

//   const contacts = refreshedData?.contacts || merchant?.contacts || [];
//   const fields =
//     refreshedData?.formTemplates?.[0]?.fields ||
//     merchant?.formTemplates?.[0]?.fields ||
//     [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const limit = 15;

//   useEffect(() => {
//     setIsLoadingInitial(false);
//   }, []);

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const t = new Date();
//     const d = new Date(date);
//     return (
//       t.getDate() === d.getDate() &&
//       t.getMonth() === d.getMonth() &&
//       t.getFullYear() === d.getFullYear()
//     );
//   };

//   /* ===================== HELPER: Get value from contact based on field type ===================== */
//   const getContactValueByFieldType = (contact, fieldType, fieldLabel) => {
//     // Map field types to contact data keys
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

//     // Check if contact has this type of data
//     if (!contact[dataKey]) {
//       return null;
//     }

//     // Get all values in this type
//     const dataObject = contact[dataKey];

//     // Try to find by exact label match first
//     if (dataObject[fieldLabel] !== undefined) {
//       return dataObject[fieldLabel];
//     }

//     // If exact match not found, return first value of this type
//     const values = Object.values(dataObject);
//     return values.length > 0 ? values[0] : null;
//   };

//   /* ===================== FILTER + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     if (dateFilter === "today") {
//       data = data.filter((c) => isToday(c.createdAt));
//     }

//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) =>
//         fields.some((field) => {
//           const value = getContactValueByFieldType(c, field.type, field.label);

//           if (Array.isArray(value)) {
//             return value.some((v) =>
//               v.toString().toLowerCase().includes(q)
//             );
//           }

//           return value?.toString().toLowerCase().includes(q);
//         })
//       );
//     }

//     data.sort((a, b) => {
//       const da = new Date(a.createdAt);
//       const db = new Date(b.createdAt);
//       return sort === "date-asc" ? da - db : db - da;
//     });

//     return data;
//   }, [contacts, search, sort, dateFilter, fields]);

//   /* ===================== PAGINATION ===================== */
//   const totalPages = Math.ceil(filteredContacts.length / limit);
//   const paginated = filteredContacts.slice(
//     (page - 1) * limit,
//     page * limit
//   );

//   const startIndex =
//     filteredContacts.length === 0 ? 0 : (page - 1) * limit + 1;
//   const endIndex = Math.min(page * limit, filteredContacts.length);

//   /* ===================== HEADINGS ===================== */
//   const headings = useMemo(() => {
//     if (!fields || fields.length === 0) {
//       return [];
//     }

//     return [
//       ...fields.map((f) => ({
//         title: f.label.replace("/", "").trim(),
//       })),
//       { title: "Date" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length || !fields.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [...fields.map((f) => f.label), "Date"];

//       const rows = filteredContacts.map((c) => [
//         ...fields.map((f) => {
//           const value = getContactValueByFieldType(c, f.type, f.label);
//           return Array.isArray(value) ? value.join("; ") : value || "";
//         }),
//         formatDate(c.createdAt),
//       ]);

//       const csv = [headers, ...rows]
//         .map((r) => r.map((v) => `"${v}"`).join(","))
//         .join("\n");

//       const blob = new Blob([csv], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contacts_${merchantId}.csv`;
//       link.click();

//       setIsExporting(false);
//     }, 300);
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

//   /* ===================== STATS ===================== */
//   const todayContactsCount = contacts.filter((c) =>
//     isToday(c.createdAt)
//   ).length;

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//     >
//       {fields.map((field) => {
//         const value = getContactValueByFieldType(contact, field.type, field.label);

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Box maxWidth="300px">
//               <Text variant="bodyMd">
//                 {Array.isArray(value)
//                   ? value.join(", ")
//                   : value || "N/A"}
//               </Text>
//             </Box>
//           </IndexTable.Cell>
//         );
//       })}

//       {fields.length > 0 && (
//         <IndexTable.Cell>
//           <Text variant="bodyMd">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </IndexTable.Cell>
//       )}
//     </IndexTable.Row>
//   ));

//   /* ===================== LOADING STATE ===================== */
//   if (isLoadingInitial) {
//     return (
//       <Page title="Contact Submissions">
//         <Box paddingBlockStart="2000">
//           <InlineStack align="center" blockAlign="center">
//             <BlockStack gap="400" inlineAlign="center">
//               <Spinner size="large" />
//               <Text variant="bodyLg" tone="subdued">Loading submissions...</Text>
//             </BlockStack>
//           </InlineStack>
//         </Box>
//       </Page>
//     );
//   }

//   /* ===================== UI ===================== */
//   return (
//     <Page
//       title="Contact Submissions"
//       subtitle="View and manage all form submissions"
//     >
//       <BlockStack gap="500">
//         {/* ===== ACTION BUTTONS ===== */}
//         <InlineStack align="end" gap="200">
//           <Button
//             icon={RefreshIcon}
//             onClick={handleRefresh}
//             loading={isRefreshing}
//           >
//             Refresh
//           </Button>
//           <Button
//             icon={ExportIcon}
//             tone="success"
//             onClick={exportCSV}
//             loading={isExporting}
//             disabled={!fields.length || !filteredContacts.length}
//           >
//             Export CSV
//           </Button>
//         </InlineStack>

//         {/* ===== STATS BOXES ===== */}
//         <InlineStack gap="400" wrap>
//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Today's Submissions</Text>
//               <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? todayContactsCount : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Total Entries</Text>
//               <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? contacts.length : 0}</Text>
//             </BlockStack>
//           </Box>

//           <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
//             <BlockStack gap="200">
//               <Text tone="subdued" variant="bodyMd">Showing Results</Text>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 && filteredContacts.length > 0 
//                   ? `${startIndex}-${endIndex}` 
//                   : "0"} of {fields.length > 0 ? filteredContacts.length : 0}
//               </Text>
//             </BlockStack>
//           </Box>
//         </InlineStack>

//         {/* ===== WARNING BANNER ===== */}
//         {(!fields || fields.length === 0) && (
//           <Banner tone="warning" title="No Form Fields Configured">
//             <BlockStack gap="200">
//               <Text variant="bodyMd">
//                 You haven't added any form fields yet. Please configure your form fields first to start collecting submissions.
//               </Text>
//             </BlockStack>
//           </Banner>
//         )}

//         {/* ===== DATA TABLE ===== */}
//         <LegacyCard>
//           <IndexTable
//             resourceName={{ singular: "contact", plural: "contacts" }}
//             itemCount={paginated.length}
//             headings={headings}
//             selectable={false}
//             loading={loading || isRefreshing}
//             emptyState={
//               fields.length === 0 ? (
//                 <EmptySearchResult
//                   title="No form fields configured"
//                   description="Please add form fields to start collecting submissions"
//                   withIllustration
//                 />
//               ) : (
//                 <EmptySearchResult
//                   title="No contacts found"
//                   description="No submissions yet"
//                   withIllustration
//                 />
//               )
//             }
//           >
//             {rowMarkup}
//           </IndexTable>

//           {/* ===== PAGINATION ===== */}
//           {filteredContacts.length > 0 && fields.length > 0 && (
//             <Box padding="400" borderBlockStartWidth="025" borderColor="border">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodySm" tone="subdued">
//                   Showing {startIndex}-{endIndex} of{" "}
//                   {filteredContacts.length} {filteredContacts.length === 1 ? "entry" : "entries"}
//                 </Text>
//                 <ButtonGroup>
//                   <Button
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <Text variant="bodySm" tone="subdued">
//                     Page {page} of {totalPages}
//                   </Text>
//                   <Button
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </Button>
//                 </ButtonGroup>
//               </InlineStack>
//             </Box>
//           )}
//         </LegacyCard>
//       </BlockStack>
//     </Page>
//   );
// }





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

//   const limit = 20;

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



//       const csv = [headers ]
//         .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
//         .join("\n");

//       const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contact-submissions-${merchantId}-${
//         new Date().toISOString().split("T")[0]
//       }.csv`;
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
//                         <Text tone="subdued" fontStyle="italic">
//                           N/A
//                         </Text>
//                       )}
//                 </Text>
//               </Box>
//             </IndexTable.Cell>
//           );
//         })}

//         {fields.length > 0 && (
//           <>
//             <IndexTable.Cell>
//               <BlockStack gap="100">
//                 <Text variant="bodySm" fontWeight="semibold">
//                   {formatDateShort(contact.createdAt)}
//                 </Text>

//               </BlockStack>
//             </IndexTable.Cell>


//           </>
//         )}
//       </IndexTable.Row>
//     );
//   });

//   /* ===================== LOADING STATE ===================== */
//   if (isLoadingInitial) {
//     return (
//       <Page title="Contact Submissions">
//         <Box paddingBlockStart="2000" paddingBlockEnd="2000">
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
//     <Page
//       title="Contact Submissions"
//       subtitle={`Manage all form submissions for ${shopName}`}
//       primaryAction={{
//         content: "Export Data",
//         icon: ExportIcon,
//         tone: "success",
//         onAction: exportCSV,
//         loading: isExporting,
//         disabled: !fields.length || !filteredContacts.length,
//       }}
//       secondaryActions={[
//         {
//           content: "Refresh",
//           icon: RefreshIcon,
//           onAction: handleRefresh,
//           loading: isRefreshing,
//         },
//       ]}
//     >
//       <BlockStack gap="500">
//         {/* ===== STATS CARDS ===== */}
//         <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
//           <Card>
//             <BlockStack gap="200">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodyMd" tone="subdued">
//                   Total Submissions
//                 </Text>
//                 <Box
//                   padding="200"
//                   background="bg-surface-secondary"
//                   borderRadius="100"
//                 >
//                   <Icon source={EmailIcon} tone="base" />
//                 </Box>
//               </InlineStack>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 ? contacts.length : 0}
//               </Text>
//               <Text variant="bodySm" tone="subdued">
//                 All time
//               </Text>
//             </BlockStack>
//           </Card>

//           <Card>
//             <BlockStack gap="200">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodyMd" tone="subdued">
//                   Today
//                 </Text>
//                 <Box
//                   padding="200"
//                   background="bg-surface-success"
//                   borderRadius="100"
//                 >
//                   <Icon source={CalendarIcon} tone="success" />
//                 </Box>
//               </InlineStack>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 ? todayCount : 0}
//               </Text>
//               <Text variant="bodySm" tone="subdued">
//                 {todayCount === 1 ? "submission" : "submissions"} today
//               </Text>
//             </BlockStack>
//           </Card>

//           <Card>
//             <BlockStack gap="200">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodyMd" tone="subdued">
//                   This Week
//                 </Text>
//                 <Box
//                   padding="200"
//                   background="bg-surface-info"
//                   borderRadius="100"
//                 >
//                   <Icon source={CalendarIcon} tone="info" />
//                 </Box>
//               </InlineStack>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 ? weekCount : 0}
//               </Text>
//               <Text variant="bodySm" tone="subdued">
//                 Last 7 days
//               </Text>
//             </BlockStack>
//           </Card>

//           <Card>
//             <BlockStack gap="200">
//               <InlineStack align="space-between" blockAlign="center">
//                 <Text variant="bodyMd" tone="subdued">
//                   This Month
//                 </Text>
//                 <Box
//                   padding="200"
//                   background="bg-surface-warning"
//                   borderRadius="100"
//                 >
//                   <Icon source={CalendarIcon} tone="warning" />
//                 </Box>
//               </InlineStack>
//               <Text variant="heading2xl" fontWeight="bold">
//                 {fields.length > 0 ? monthCount : 0}
//               </Text>
//               <Text variant="bodySm" tone="subdued">
//                 Current month
//               </Text>
//             </BlockStack>
//           </Card>
//         </InlineGrid>

//         {/* ===== WARNING BANNER ===== */}
//         {(!fields || fields.length === 0) && (
//           <Banner tone="warning" title="No Form Fields Configured">
//             <BlockStack gap="200">
//               <Text variant="bodyMd">
//                 You haven't added any form fields yet. Please configure your
//                 form fields first to start collecting submissions.
//               </Text>
//               <InlineStack gap="200">
//                 <Button>Configure Fields</Button>
//               </InlineStack>
//             </BlockStack>
//           </Banner>
//         )}

//         {/* ===== DATA TABLE WITH FILTERS ===== */}
//         <Card padding="0">
//           <BlockStack gap="0">
//             {/* Filters and Search */}
//             <Box padding="400">
//               <Filters
//                 queryValue={queryValue}
//                 filters={filters}
//                 appliedFilters={appliedFilters}
//                 onQueryChange={handleQueryValueChange}
//                 onQueryClear={handleQueryValueRemove}
//                 onClearAll={handleFiltersClearAll}
//                 queryPlaceholder="Search submissions..."
//               >
//                 <Box paddingBlockEnd="200">
//                   <Select
//                     label="Sort by"
//                     labelInline={!smDown}
//                     options={[
//                       { label: "Newest First", value: "date-desc" },
//                       { label: "Oldest First", value: "date-asc" },
//                     ]}
//                     value={sortValue}
//                     onChange={setSortValue}
//                   />
//                 </Box>
//               </Filters>
//             </Box>


//             {/* Table */}
//             <IndexTable
//               resourceName={{ singular: "submission", plural: "submissions" }}
//               itemCount={paginatedContacts.length}
//               headings={headings}
//               selectable={false}
//               loading={loading || isRefreshing}
//               emptyState={
//                 fields.length === 0 ? (
//                   <EmptySearchResult
//                     title="No form fields configured"
//                     description="Configure your form fields to start collecting submissions"
//                     withIllustration
//                   />
//                 ) : queryValue || appliedFilters.length > 0 ? (
//                   <EmptySearchResult
//                     title="No results found"
//                     description="Try adjusting your search or filters"
//                     withIllustration
//                   />
//                 ) : (
//                   <EmptySearchResult
//                     title="No submissions yet"
//                     description="Submissions will appear here once customers fill out your form"
//                     withIllustration
//                   />
//                 )
//               }
//             >
//               {rowMarkup}
//             </IndexTable>

//             {/* Pagination */}
//             {filteredContacts.length > 0 && fields.length > 0 && (
//               <>
//                 <Divider />
//                 <Box padding="400">
//                   <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                     <Box minWidth={smDown ? "100%" : "auto"}>
//                       <Text variant="bodySm" tone="subdued">
//                         Showing {startIndex}-{endIndex} of{" "}
//                         {filteredContacts.length}{" "}
//                         {filteredContacts.length === 1
//                           ? "submission"
//                           : "submissions"}
//                       </Text>
//                     </Box>
//                     <ButtonGroup>
//                       <Button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                       >
//                         Previous
//                       </Button>
//                       <Button
//                         disabled={currentPage === totalPages}
//                         onClick={() =>
//                           setCurrentPage((p) => Math.min(totalPages, p + 1))
//                         }
//                       >
//                         Next
//                       </Button>
//                     </ButtonGroup>
//                   </InlineStack>
//                 </Box>
//               </>
//             )}
//           </BlockStack>
//         </Card>


//       </BlockStack>
//     </Page>
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

    if (!contact[dataKey]) {
      return null;
    }

    const dataObject = contact[dataKey];

    if (dataObject[fieldLabel] !== undefined) {
      return dataObject[fieldLabel];
    }

    const values = Object.values(dataObject);
    return values.length > 0 ? values[0] : null;
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
      { title: "#" },
      ...fields.map((f) => ({
        title: f.label.replace("/", "").trim(),
      })),
      { title: "Submitted" },
    ];
  }, [fields]);

  /* ===================== CSV EXPORT ===================== */
  const exportCSV = useCallback(() => {
    if (!filteredContacts.length || !fields.length) return;

    setIsExporting(true);

    setTimeout(() => {
      const headers = [
        "ID",
        ...fields.map((f) => f.label),
        "Submission Date",
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
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="semibold" tone="subdued">
            #{globalIndex}
          </Text>
        </IndexTable.Cell>

        {fields.map((field) => {
          const value = getContactValueByFieldType(
            contact,
            field.type,
            field.label
          );

          return (
            <IndexTable.Cell key={field._id}>
              <Box maxWidth={smDown ? "150px" : "300px"}>
                <Text variant="bodyMd" truncate>
                  {Array.isArray(value)
                    ? value.join(", ")
                    : value || (
                      <Text tone="subdued" fontStyle="italic">
                        N/A
                      </Text>
                    )}
                </Text>
              </Box>
            </IndexTable.Cell>
          );
        })}

        {fields.length > 0 && (
          <IndexTable.Cell>
            <BlockStack gap="100">
              <Text variant="bodySm" fontWeight="semibold">
                {formatDateShort(contact.createdAt)}
              </Text>

            </BlockStack>
          </IndexTable.Cell>
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
                      background: "#7647FF",
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
                    background: "#7647FF",
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
                    background: "#7647FF",
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
                    background: "#7647FF",
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
    </div>
  );
}








