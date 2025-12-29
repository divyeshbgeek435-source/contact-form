
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


import { useLoaderData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Page,
  LegacyCard,
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
} from "@shopify/polaris";
import {
  SearchIcon,
  ExportIcon,
  CalendarIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  RefreshIcon,
} from "@shopify/polaris-icons";

/* ===================== LOADER ===================== */
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const shopRes = await admin.graphql(`
    query {
      shop {
        id
        name
      }
    }
  `);

  const shopJson = await shopRes.json();
  const merchantId = shopJson.data.shop.id.split("/").pop();

  const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
  const json = await res.json();

  return {
    merchant: json.data,
    merchantId,
  };
};

/* ===================== COMPONENT ===================== */
export default function Index() {
  const { merchant, merchantId } = useLoaderData();
  const nav = useNavigation();
  const loading = nav.state === "submitting";

  const [refreshedData, setRefreshedData] = useState(null);

  const contacts = refreshedData?.contacts || merchant?.contacts || [];
  const fields =
    refreshedData?.formTemplates?.[0]?.fields ||
    merchant?.formTemplates?.[0]?.fields ||
    [];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const limit = 15;

  /* ===================== HELPERS ===================== */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const isToday = (date) => {
    const t = new Date();
    const d = new Date(date);
    return (
      t.getDate() === d.getDate() &&
      t.getMonth() === d.getMonth() &&
      t.getFullYear() === d.getFullYear()
    );
  };

  /* ===================== HELPER: Get value from contact based on field type ===================== */
  const getContactValueByFieldType = (contact, fieldType, fieldLabel) => {
    // Map field types to contact data keys
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
    
    // Check if contact has this type of data
    if (!contact[dataKey]) {
      return null;
    }

    // Get all values in this type
    const dataObject = contact[dataKey];
    
    // Try to find by exact label match first
    if (dataObject[fieldLabel] !== undefined) {
      return dataObject[fieldLabel];
    }

    // If exact match not found, return first value of this type
    const values = Object.values(dataObject);
    return values.length > 0 ? values[0] : null;
  };

  /* ===================== FILTER + SORT ===================== */
  const filteredContacts = useMemo(() => {
    let data = [...contacts];

    if (dateFilter === "today") {
      data = data.filter((c) => isToday(c.createdAt));
    }

    if (search) {
      const q = search.toLowerCase();
      data = data.filter((c) =>
        fields.some((field) => {
          const value = getContactValueByFieldType(c, field.type, field.label);

          if (Array.isArray(value)) {
            return value.some((v) =>
              v.toString().toLowerCase().includes(q)
            );
          }

          return value?.toString().toLowerCase().includes(q);
        })
      );
    }

    data.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sort === "date-asc" ? da - db : db - da;
    });

    return data;
  }, [contacts, search, sort, dateFilter, fields]);

  /* ===================== PAGINATION ===================== */
  const totalPages = Math.ceil(filteredContacts.length / limit);
  const paginated = filteredContacts.slice(
    (page - 1) * limit,
    page * limit
  );

  const startIndex =
    filteredContacts.length === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, filteredContacts.length);

  /* ===================== HEADINGS ===================== */
  const headings = useMemo(() => {
    if (!fields || fields.length === 0) {
      return [];
    }

    return [
      ...fields.map((f) => ({
        title: f.label.replace("/", "").trim(),
      })),
      { title: "Date" },
    ];
  }, [fields]);

  /* ===================== CSV EXPORT ===================== */
  const exportCSV = useCallback(() => {
    if (!filteredContacts.length || !fields.length) return;

    setIsExporting(true);

    setTimeout(() => {
      const headers = [...fields.map((f) => f.label), "Date"];

      const rows = filteredContacts.map((c) => [
        ...fields.map((f) => {
          const value = getContactValueByFieldType(c, f.type, f.label);
          return Array.isArray(value) ? value.join("; ") : value || "";
        }),
        formatDate(c.createdAt),
      ]);

      const csv = [headers, ...rows]
        .map((r) => r.map((v) => `"${v}"`).join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `contacts_${merchantId}.csv`;
      link.click();

      setIsExporting(false);
    }, 300);
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

  /* ===================== STATS ===================== */
  const todayContactsCount = contacts.filter((c) =>
    isToday(c.createdAt)
  ).length;

  /* ===================== ROWS ===================== */
  const rowMarkup = paginated.map((contact, index) => (
    <IndexTable.Row
      id={contact._id}
      key={contact._id}
      position={index}
    >
      {fields.map((field) => {
        const value = getContactValueByFieldType(contact, field.type, field.label);

        return (
          <IndexTable.Cell key={field._id}>
            <Box maxWidth="300px">
              <Text variant="bodyMd">
                {Array.isArray(value)
                  ? value.join(", ")
                  : value || "N/A"}
              </Text>
            </Box>
          </IndexTable.Cell>
        );
      })}

      {fields.length > 0 && (
        <IndexTable.Cell>
          <Text variant="bodyMd">
            {formatDate(contact.createdAt)}
          </Text>
        </IndexTable.Cell>
      )}
    </IndexTable.Row>
  ));

  /* ===================== UI ===================== */
  return (
    <Page
      title="Contact Submissions"
      subtitle="View and manage all form submissions"
    >
      <BlockStack gap="500">
        {/* ===== ACTION BUTTONS ===== */}
        <InlineStack align="end" gap="200">
          <Button
            icon={RefreshIcon}
            onClick={handleRefresh}
            loading={isRefreshing}
          >
            Refresh
          </Button>
          <Button
            icon={ExportIcon}
            tone="success"
            onClick={exportCSV}
            loading={isExporting}
            disabled={!fields.length || !filteredContacts.length}
          >
            Export CSV
          </Button>
        </InlineStack>

        {/* ===== STATS BOXES ===== */}
        <InlineStack gap="400" wrap>
          <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Today's Submissions</Text>
              <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? todayContactsCount : 0}</Text>
            </BlockStack>
          </Box>

          <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Total Entries</Text>
              <Text variant="heading2xl" fontWeight="bold">{fields.length > 0 ? contacts.length : 0}</Text>
            </BlockStack>
          </Box>

          <Box padding="400" background="bg-surface" borderRadius="300" borderWidth="025" borderColor="border">
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Showing Results</Text>
              <Text variant="heading2xl" fontWeight="bold">
                {fields.length > 0 && filteredContacts.length > 0 
                  ? `${startIndex}-${endIndex}` 
                  : "0"} of {fields.length > 0 ? filteredContacts.length : 0}
              </Text>
            </BlockStack>
          </Box>
        </InlineStack>

        {/* ===== WARNING BANNER ===== */}
        {(!fields || fields.length === 0) && (
          <Banner tone="warning" title="No Form Fields Configured">
            <BlockStack gap="200">
              <Text variant="bodyMd">
                You haven't added any form fields yet. Please configure your form fields first to start collecting submissions.
              </Text>
            </BlockStack>
          </Banner>
        )}

        {/* ===== DATA TABLE ===== */}
        <LegacyCard>
          <IndexTable
            resourceName={{ singular: "contact", plural: "contacts" }}
            itemCount={paginated.length}
            headings={headings}
            selectable={false}
            loading={loading}
            emptyState={
              fields.length === 0 ? (
                <EmptySearchResult
                  title="No form fields configured"
                  description="Please add form fields to start collecting submissions"
                  withIllustration
                />
              ) : (
                <EmptySearchResult
                  title="No contacts found"
                  description="No submissions yet"
                  withIllustration
                />
              )
            }
          >
            {rowMarkup}
          </IndexTable>

          {/* ===== PAGINATION ===== */}
          {filteredContacts.length > 0 && fields.length > 0 && (
            <Box padding="400" borderBlockStartWidth="025" borderColor="border">
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="bodySm" tone="subdued">
                  Showing {startIndex}-{endIndex} of{" "}
                  {filteredContacts.length} {filteredContacts.length === 1 ? "entry" : "entries"}
                </Text>
                <ButtonGroup>
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <Text variant="bodySm" tone="subdued">
                    Page {page} of {totalPages}
                  </Text>
                  <Button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </InlineStack>
            </Box>
          )}
        </LegacyCard>
      </BlockStack>
    </Page>
  );
}