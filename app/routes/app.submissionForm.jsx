// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useCallback, useMemo } from "react";
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
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
//   RefreshIcon,
// } from "@shopify/polaris-icons";

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopResponse = await admin.graphql(`
//     #graphql
//     query {
//       shop {
//         id
//         name
//       }
//     }
//   `);

//   const shopJson = await shopResponse.json();
//   const shop = shopJson.data.shop;
//   const merchantId = shop.id.split("/").pop();

//   const getMerchant = await fetch(
//     `http://localhost:5000/api/users/${merchantId}`
//   );

//   const merchantJson = await getMerchant.json();

//   return {
//     merchant: merchantJson.data,
//     merchantId,
//     mongoId: merchantJson.data?._id,
//   };
// };

// export default function Index() {



//   const { merchant, merchantId } = useLoaderData();
//   const nav = useNavigation();
//   const loading = nav.state === "submitting";

//   // State management
//   const [searchValue, setSearchValue] = useState("");
//   const [sortValue, setSortValue] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all"); // all, today, custom
//   const [isExporting, setIsExporting] = useState(false);
//   const itemsPerPage = 15;

//   // Get contacts data
//   const contacts = merchant?.contacts || [];

//   // Helper function to check if date is today
//   const isToday = (date) => {
//     const today = new Date();
//     const checkDate = new Date(date);
//     return (
//       checkDate.getDate() === today.getDate() &&
//       checkDate.getMonth() === today.getMonth() &&
//       checkDate.getFullYear() === today.getFullYear()
//     );
//   };

//   // Format date and time consistently
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // Get current timestamp for "Last updated"
//   const getCurrentTimestamp = () => {
//     return new Date().toLocaleString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//   };

//   // Filter, search, and sort logic
//   const filteredAndSortedContacts = useMemo(() => {
//     let filtered = [...contacts];

//     // Apply date filter
//     if (dateFilter === "today") {
//       filtered = filtered.filter((contact) => isToday(contact.createdAt));
//     }

//     // Apply search filter
//     if (searchValue) {
//       const searchLower = searchValue.toLowerCase();
//       filtered = filtered.filter(
//         (contact) =>
//           contact.name?.toLowerCase().includes(searchLower) ||
//           contact.email?.toLowerCase().includes(searchLower) ||
//           contact.phone?.toLowerCase().includes(searchLower) 
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);

//       switch (sortValue) {
//         case "date-desc":
//           return dateB - dateA;
//         case "date-asc":
//           return dateA - dateB;
//         case "name-asc":
//           return (a.name || "").localeCompare(b.name || "");
//         case "name-desc":
//           return (b.name || "").localeCompare(a.name || "");
//         case "email-asc":
//           return (a.email || "").localeCompare(b.email || "");
//         case "email-desc":
//           return (b.email || "").localeCompare(a.email || "");
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [contacts, searchValue, sortValue, dateFilter]);

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredAndSortedContacts.length / itemsPerPage);
//   const paginatedContacts = filteredAndSortedContacts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const startIndex = filteredAndSortedContacts.length === 0
//     ? 0
//     : (currentPage - 1) * itemsPerPage + 1;
//   const endIndex = Math.min(
//     currentPage * itemsPerPage,
//     filteredAndSortedContacts.length
//   );

//   // Event handlers
//   const handleSearchChange = useCallback((value) => {
//     setSearchValue(value);
//     setCurrentPage(1);
//   }, []);

//   const handleSearchClear = useCallback(() => {
//     setSearchValue("");
//     setCurrentPage(1);
//   }, []);

//   const handleSortChange = useCallback((value) => {
//     setSortValue(value);
//     setCurrentPage(1);
//   }, []);

//   const handleDateFilterChange = useCallback((value) => {
//     setDateFilter(value);
//     setCurrentPage(1);
//   }, []);

//   const handleNextPage = useCallback(() => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [currentPage, totalPages]);

//   const handlePreviousPage = useCallback(() => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   }, [currentPage]);

//   const handleResetFilters = useCallback(() => {
//     setSearchValue("");
//     setSortValue("date-desc");
//     setDateFilter("all");
//     setCurrentPage(1);
//   }, []);

//   // CSV Export
//   const downloadContactsCSV = useCallback(() => {
//     if (filteredAndSortedContacts.length === 0) {
//       return;
//     }

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = ["Name", "Email", "Phone", "dropdown", "checkbox", "radio", "textarea", "Date", "Time"];
//       const csvRows = [headers.join(",")];

//       filteredAndSortedContacts.forEach((contact) => {
//         const row = [
//           `"${contact.name || ""}"`,
//           `"${contact.email || ""}"`,
//           `"${contact.phone || ""}"`,
//           `"${contact.dropdown || ""}"`,
//           `"${contact.checkbox || ""}"`,
//           `"${contact.radio || ""}"`,
//           `"${contact.textarea || ""}"`,
//           `"${formatDate(contact.createdAt)}"`,
//           `"${formatTime(contact.createdAt)}"`,
//         ];
//         csvRows.push(row.join(","));
//       });

//       const csvContent = csvRows.join("\n");
//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);

//       link.setAttribute("href", url);
//       link.setAttribute(
//         "download",
//         `contacts_${merchantId}_${Date.now()}.csv`
//       );
//       link.style.visibility = "hidden";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setIsExporting(false);
//     }, 500);
//   }, [filteredAndSortedContacts, merchantId]);

//   // Sort options
//   const sortOptions = [
//     { label: "Date: Newest → Oldest", value: "date-desc" },
//     { label: "Date: Oldest → Newest", value: "date-asc" },
//     { label: "Name (A-Z)", value: "name-asc" },
//     { label: "Name (Z-A)", value: "name-desc" },
//     { label: "Email (A-Z)", value: "email-asc" },
//     { label: "Email (Z-A)", value: "email-desc" },
//   ];

//   // Date filter options
//   const dateFilterOptions = [
//     { label: "All Dates", value: "all" },
//     { label: "Today Only", value: "today" },
//   ];

//   // Resource name for table
//   const resourceName = {
//     singular: "contact",
//     plural: "contacts",
//   };

//   // Get today's contacts count
//   const todayContactsCount = contacts.filter((c) => isToday(c.createdAt)).length;

//   // Table row markup
//   const rowMarkup = paginatedContacts.map((contact, index) => (
//     <IndexTable.Row id={contact._id} key={contact._id} position={index}>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span">
//             {contact.name || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" tone="subdued">
//             {contact.email || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Text variant="bodyMd" as="span">
//           {contact.phone || "N/A"}
//         </Text>
//       </IndexTable.Cell>
      
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.dropdown || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.checkbox || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.radio || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.textarea || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <BlockStack gap="100">
//           <Text variant="bodyMd" as="span" fontWeight="medium">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </BlockStack>
//       </IndexTable.Cell>
//     </IndexTable.Row>
//   ));

//   // Empty state
//   const emptyStateMarkup = (
//     <EmptySearchResult
//       title={
//         dateFilter === "today"
//           ? "No contacts found for today"
//           : "No contacts found"
//       }
//       description={
//         searchValue || dateFilter !== "all"
//           ? "Try adjusting your search or filters"
//           : "No contact submissions yet"
//       }
//       withIllustration
//     />
//   );

//   return (

//     <>

//       <Page>
//         <InlineStack align="end">
//           <Button
//             icon={ExportIcon}
//             onClick={downloadContactsCSV}
//             disabled={
//               filteredAndSortedContacts.length === 0 || isExporting
//             }
//             loading={isExporting}
//             tone="success"
//           >
//             Export CSV
//           </Button>
//         </InlineStack>


//         {/* <div style={{ marginTop: "16px", marginBottom: "16px" }}>
//           <InlineStack gap="400" wrap={true}>
//             <Box
//               padding="300"
//               background="bg-surface"
//               borderRadius="200"
//             >
//               <InlineStack gap="200" blockAlign="center">
//                 <Icon source={CalendarIcon} tone="base" />
//                 <BlockStack gap="050">
//                   <Text variant="bodySm" as="span" tone="subdued">
//                     Today's Submissions
//                   </Text>
//                   <Text variant="headingMd" as="span" fontWeight="bold">
//                     {todayContactsCount}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>

//             <Box
//               padding="300"
//               background="bg-surface"
//               borderRadius="200"
//             >
//               <InlineStack gap="200" blockAlign="center">
//                 <Icon source={CalendarIcon} tone="base" />
//                 <BlockStack gap="050">
//                   <Text variant="bodySm" as="span" tone="subdued">
//                     Total Entries
//                   </Text>
//                   <Text variant="headingMd" as="span" fontWeight="bold">
//                     {contacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>

//             <Box
//               padding="300"
//               background="bg-surface"
//               borderRadius="200"
//             >
//               <InlineStack gap="200" blockAlign="center">
//                 <Icon source={CalendarIcon} tone="base" />
//                 <BlockStack gap="050">
//                   <Text variant="bodySm" as="span" tone="subdued">
//                     Showing
//                   </Text>
//                   <Text variant="headingMd" as="span" fontWeight="bold">
//                     {startIndex}-{endIndex} of{" "}
//                     {filteredAndSortedContacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>


//           </InlineStack>

//         </div> */}

//         <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//           <InlineStack gap="400" wrap={true} blockAlign="stretch">
//             {/* Today's Submissions Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={CalendarIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Today's Submissions
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold">
//                       {todayContactsCount}
//                     </Text>
//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>

//             {/* Total Entries Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={CalendarIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Total Entries
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold">
//                       {contacts.length}
//                     </Text>
//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>

//             {/* Showing Results Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={SearchIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Showing Results
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold">
//                       {startIndex}-{endIndex}   of {filteredAndSortedContacts.length}
//                     </Text>

//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>
//           </InlineStack>
//         </div>

//         <BlockStack gap="400">
//           <LegacyCard>
//             <div style={{ padding: "16px 20px" }}>
//               {/* Header Section */}





//               {/* Filters and Controls Section */}
//               <div style={{ marginTop: "20px" }}>
//                 <InlineStack gap="300" align="space-between" blockAlign="center">
//                   {/* Left side: Search */}
//                   <div style={{ flex: 1, maxWidth: "400px" }}>
//                     <TextField
//                       value={searchValue}
//                       onChange={handleSearchChange}
//                       placeholder="Search contacts..."
//                       prefix={<Icon source={SearchIcon} tone="base" />}
//                       clearButton
//                       onClearButtonClick={handleSearchClear}
//                       autoComplete="off"
//                     />
//                   </div>

//                   {/* Right side: Date Filter, Sort, Reset */}
//                   <InlineStack gap="200" blockAlign="center" wrap={false}>
//                     {/* Date Filter */}
//                     <InlineStack gap="100" blockAlign="center">
//                       <Icon source={CalendarIcon} tone="base" />
//                       <div style={{ minWidth: "140px" }}>
//                         <Select
//                           label="Date filter"
//                           labelHidden
//                           options={dateFilterOptions}
//                           value={dateFilter}
//                           onChange={handleDateFilterChange}
//                         />
//                       </div>
//                     </InlineStack>

//                     {/* Sort */}
//                     <InlineStack gap="100" blockAlign="center">
//                       <Icon
//                         source={
//                           sortValue.includes("asc")
//                             ? SortAscendingIcon
//                             : SortDescendingIcon
//                         }
//                         tone="base"
//                       />
//                       <div style={{ minWidth: "200px" }}>
//                         <Select
//                           label="Sort order"
//                           labelHidden
//                           options={sortOptions}
//                           value={sortValue}
//                           onChange={handleSortChange}
//                         />
//                       </div>
//                     </InlineStack>

//                     {/* Reset Button */}
//                     {(searchValue || dateFilter !== "all" || sortValue !== "date-desc") && (
//                       <Button
//                         icon={RefreshIcon}
//                         onClick={handleResetFilters}
//                         accessibilityLabel="Reset all filters"
//                       >
//                         Reset
//                       </Button>
//                     )}
//                   </InlineStack>
//                 </InlineStack>
//               </div>
//             </div>

//             {/* Table Section */}
//             <IndexTable
//               resourceName={resourceName}
//               itemCount={paginatedContacts.length}
//               selectable={false}
//               headings={[
//                 { title: "Name" },
//                 { title: "Email" },
//                 { title: "Phone" }, 
//                 { title: "Dropdown" },
//                 { title: "Checkbox" },
//                 { title: "Radio" },
//                 { title: "Textarea" },
//                 { title: "Date" },

//               ]}
//               emptyState={emptyStateMarkup}
//               loading={loading}
//             >
//               {rowMarkup}
//             </IndexTable>

//             {/* Custom Pagination Section */}
//             {filteredAndSortedContacts.length > 0 && (
//               <div
//                 style={{
//                   padding: "16px 20px",
//                   borderTop: "1px solid #E1E3E5",
//                 }}
//               >
//                 <InlineStack align="space-between" blockAlign="center">
//                   {/* Left: Pagination Info */}
//                   <InlineStack gap="200" blockAlign="center">
//                     <Text variant="bodyMd" as="span" tone="subdued">
//                       Showing {startIndex}-{endIndex} of{" "}
//                       {filteredAndSortedContacts.length} results
//                     </Text>
//                     <Badge tone="info">
//                       Page {currentPage} of {totalPages}
//                     </Badge>
//                   </InlineStack>

//                   {/* Right: Pagination Controls */}
//                   <ButtonGroup>
//                     <Button
//                       onClick={handlePreviousPage}
//                       disabled={currentPage === 1}
//                       accessibilityLabel="Previous page"
//                     >
//                       ← Previous
//                     </Button>
//                     <Button
//                       onClick={handleNextPage}
//                       disabled={currentPage >= totalPages}
//                       accessibilityLabel="Next page"
//                     >
//                       Next →
//                     </Button>
//                   </ButtonGroup>
//                 </InlineStack>
//               </div>
//             )}
//           </LegacyCard>
//         </BlockStack>

//         {/* Custom Styles */}
//         <style>{`
//         /* Smooth fade-in for table rows with stagger effect */

//         /* Enhanced Stats Box Effects */
// .Polaris-Box {
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: default;
// }

// .Polaris-Box:hover {
//   transform: translateY(-4px);
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
// }

// /* Icon container animation */
// @keyframes iconPulse {
//   0%, 100% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
// }

// .Polaris-Box:hover [style*="gradient"] {
//   animation: iconPulse 2s ease-in-out infinite;
// }

// /* Number count animation */
// @keyframes countUp {
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .Polaris-Text--heading2xl {
//   animation: countUp 0.6s ease-out;
// }

// /* Responsive card layout */
// @media (max-width: 768px) {
//   .Polaris-InlineStack > div {
//     flex: 1 1 100% !important;
//     min-width: 100% !important;
//   }
// }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .Polaris-IndexTable__TableRow {
//           animation: fadeInUp 0.3s ease-out backwards;
//         }

//         .Polaris-IndexTable__TableRow:nth-child(1) { animation-delay: 0.03s; }
//         .Polaris-IndexTable__TableRow:nth-child(2) { animation-delay: 0.06s; }
//         .Polaris-IndexTable__TableRow:nth-child(3) { animation-delay: 0.09s; }
//         .Polaris-IndexTable__TableRow:nth-child(4) { animation-delay: 0.12s; }
//         .Polaris-IndexTable__TableRow:nth-child(5) { animation-delay: 0.15s; }
//         .Polaris-IndexTable__TableRow:nth-child(6) { animation-delay: 0.18s; }
//         .Polaris-IndexTable__TableRow:nth-child(7) { animation-delay: 0.21s; }
//         .Polaris-IndexTable__TableRow:nth-child(8) { animation-delay: 0.24s; }
//         .Polaris-IndexTable__TableRow:nth-child(9) { animation-delay: 0.27s; }
//         .Polaris-IndexTable__TableRow:nth-child(10) { animation-delay: 0.30s; }

//         /* Smooth hover effect on rows */
//         .Polaris-IndexTable__TableRow {
//           transition: background-color 0.2s ease, transform 0.2s ease;
//         }

//         .Polaris-IndexTable__TableRow:hover {
//           background-color: rgba(0, 0, 0, 0.03);
//         }

//         /* Button hover effects */
//         .Polaris-Button {
//           transition: all 0.2s ease;
//         }

//         .Polaris-Button:hover:not(:disabled) {
//           transform: translateY(-1px);
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }

//         .Polaris-Button:active:not(:disabled) {
//           transform: translateY(0);
//         }

//         /* Badge pulse effect */
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }

//         .Polaris-Badge {
//           transition: all 0.2s ease;
//         }

//         /* Search field focus effect */
//         .Polaris-TextField__Input:focus {
//           box-shadow: 0 0 0 2px var(--p-color-border-focus);
//           transition: box-shadow 0.2s ease;
//         }

//         /* Select dropdown smooth transition */
//         .Polaris-Select__Input {
//           transition: border-color 0.2s ease, box-shadow 0.2s ease;
//         }

//         /* Loading spinner animation */
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         /* Card transitions */
//         .Polaris-LegacyCard {
//           transition: box-shadow 0.3s ease;
//         }

//         /* Empty state fade in */
//         .Polaris-EmptySearchResult {
//           animation: fadeInUp 0.4s ease-out;
//         }

//         /* Stats box hover effect */
//         .Polaris-Box:hover {
//           transform: translateY(-2px);
//           transition: transform 0.2s ease;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//         }

//         /* Smooth divider appearance */
//         .Polaris-Divider {
//           margin: 16px 0;
//           opacity: 0.6;
//           transition: opacity 0.3s ease;
//         }

//         /* Icon rotation on sort change */
//         @keyframes iconRotate {
//           from {
//             transform: rotate(-180deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         .Polaris-Icon {
//           transition: transform 0.3s ease;
//         }
//       `}</style>
//       </Page>
//     </>
//   );
// }



// import { useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useCallback, useMemo, useEffect } from "react";
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
// } from "@shopify/polaris";
// import {
//   SearchIcon,
//   ExportIcon,
//   CalendarIcon,
//   SortAscendingIcon,
//   SortDescendingIcon,
//   RefreshIcon,
// } from "@shopify/polaris-icons";

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const shopResponse = await admin.graphql(`
//     #graphql
//     query {
//       shop {
//         id
//         name
//       }
//     }
//   `);

//   const shopJson = await shopResponse.json();
//   const shop = shopJson.data.shop;
//   const merchantId = shop.id.split("/").pop();

//   const getMerchant = await fetch(
//     `http://localhost:5000/api/users/${merchantId}`
//   );

//   const merchantJson = await getMerchant.json();

//   return {
//     merchant: merchantJson.data,
//     merchantId,
//     mongoId: merchantJson.data?._id,
//   };
// };

// export default function Index() {
//   const { merchant, merchantId } = useLoaderData();
//   const nav = useNavigation();
//   const loading = nav.state === "submitting";

//   // State management
//   const [searchValue, setSearchValue] = useState("");
//   const [sortValue, setSortValue] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const itemsPerPage = 15;

//   useEffect(() => {
//     setIsClient(true);
//     const style = document.createElement('style');
//     style.innerHTML = `
//       @keyframes fadeInUp {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       @keyframes iconPulse {
//         0%, 100% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//       }
//       @keyframes countUp {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       .animate-row {
//         animation: fadeInUp 0.3s ease-out backwards;
//       }
//       .animate-count {
//         animation: countUp 0.6s ease-out;
//       }
//       .Polaris-Box:hover [style*="gradient"] {
//         animation: iconPulse 2s ease-in-out infinite;
//       }
//       .Polaris-IndexTable__TableRow {
//         transition: background-color 0.2s ease, transform 0.2s ease;
//       }
//       .Polaris-IndexTable__TableRow:hover {
//         background-color: rgba(0, 0, 0, 0.03);
//       }
//       .Polaris-Box {
//         transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         cursor: default;
//       }
//       .Polaris-Box:hover {
//         transform: translateY(-4px);
//         box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
//       }
//       @media (max-width: 768px) {
//         .Polaris-InlineStack > div {
//           flex: 1 1 100% !important;
//           min-width: 100% !important;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Get contacts data
//   const contacts = merchant?.contacts || [];

//   // Helper function to check if date is today
//   const isToday = (date) => {
//     const today = new Date();
//     const checkDate = new Date(date);
//     return (
//       checkDate.getDate() === today.getDate() &&
//       checkDate.getMonth() === today.getMonth() &&
//       checkDate.getFullYear() === today.getFullYear()
//     );
//   };

//   // Format date and time consistently
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // Get current timestamp for "Last updated"
//   const getCurrentTimestamp = () => {
//     return new Date().toLocaleString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//   };

//   // Filter, search, and sort logic
//   const filteredAndSortedContacts = useMemo(() => {
//     let filtered = [...contacts];

//     // Apply date filter
//     if (dateFilter === "today") {
//       filtered = filtered.filter((contact) => isToday(contact.createdAt));
//     }

//     // Apply search filter
//     if (searchValue) {
//       const searchLower = searchValue.toLowerCase();
//       filtered = filtered.filter(
//         (contact) =>
//           contact.name?.toLowerCase().includes(searchLower) ||
//           contact.email?.toLowerCase().includes(searchLower) ||
//           contact.phone?.toLowerCase().includes(searchLower)
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);

//       switch (sortValue) {
//         case "date-desc":
//           return dateB - dateA;
//         case "date-asc":
//           return dateA - dateB;
//         case "name-asc":
//           return (a.name || "").localeCompare(b.name || "");
//         case "name-desc":
//           return (b.name || "").localeCompare(a.name || "");
//         case "email-asc":
//           return (a.email || "").localeCompare(b.email || "");
//         case "email-desc":
//           return (b.email || "").localeCompare(a.email || "");
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [contacts, searchValue, sortValue, dateFilter]);

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredAndSortedContacts.length / itemsPerPage);
//   const paginatedContacts = filteredAndSortedContacts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const startIndex = filteredAndSortedContacts.length === 0
//     ? 0
//     : (currentPage - 1) * itemsPerPage + 1;
//   const endIndex = Math.min(
//     currentPage * itemsPerPage,
//     filteredAndSortedContacts.length
//   );

//   // Event handlers
//   const handleSearchChange = useCallback((value) => {
//     setSearchValue(value);
//     setCurrentPage(1);
//   }, []);

//   const handleSearchClear = useCallback(() => {
//     setSearchValue("");
//     setCurrentPage(1);
//   }, []);

//   const handleSortChange = useCallback((value) => {
//     setSortValue(value);
//     setCurrentPage(1);
//   }, []);

//   const handleDateFilterChange = useCallback((value) => {
//     setDateFilter(value);
//     setCurrentPage(1);
//   }, []);

//   const handleNextPage = useCallback(() => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [currentPage, totalPages]);

//   const handlePreviousPage = useCallback(() => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   }, [currentPage]);

//   const handleResetFilters = useCallback(() => {
//     setSearchValue("");
//     setSortValue("date-desc");
//     setDateFilter("all");
//     setCurrentPage(1);
//   }, []);

//   // CSV Export
//   const downloadContactsCSV = useCallback(() => {
//     if (filteredAndSortedContacts.length === 0) {
//       return;
//     }

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = ["Name", "Email", "Phone", "dropdown", "checkbox", "radio", "textarea", "Date", "Time"];
//       const csvRows = [headers.join(",")];

//       filteredAndSortedContacts.forEach((contact) => {
//         const row = [
//           `"${contact.name || ""}"`,
//           `"${contact.email || ""}"`,
//           `"${contact.phone || ""}"`,
//           `"${contact.dropdown || ""}"`,
//           `"${contact.checkbox || ""}"`,
//           `"${contact.radio || ""}"`,
//           `"${contact.textarea || ""}"`,
//           `"${formatDate(contact.createdAt)}"`,
//           `"${formatTime(contact.createdAt)}"`,
//         ];
//         csvRows.push(row.join(","));
//       });

//       const csvContent = csvRows.join("\n");
//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);

//       link.setAttribute("href", url);
//       link.setAttribute(
//         "download",
//         `contacts_${merchantId}_${Date.now()}.csv`
//       );
//       link.style.visibility = "hidden";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setIsExporting(false);
//     }, 500);
//   }, [filteredAndSortedContacts, merchantId]);

//   // Sort options
//   const sortOptions = [
//     { label: "Date: Newest → Oldest", value: "date-desc" },
//     { label: "Date: Oldest → Newest", value: "date-asc" },
//     { label: "Name (A-Z)", value: "name-asc" },
//     { label: "Name (Z-A)", value: "name-desc" },
//     { label: "Email (A-Z)", value: "email-asc" },
//     { label: "Email (Z-A)", value: "email-desc" },
//   ];

//   // Date filter options
//   const dateFilterOptions = [
//     { label: "All Dates", value: "all" },
//     { label: "Today Only", value: "today" },
//   ];

//   // Resource name for table
//   const resourceName = {
//     singular: "contact",
//     plural: "contacts",
//   };

//   // Get today's contacts count
//   const todayContactsCount = contacts.filter((c) => isToday(c.createdAt)).length;

//   // Table row markup
//   const rowMarkup = paginatedContacts.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//       className={isClient ? 'animate-row' : ''}
//       style={{
//         animationDelay: isClient ? `${index * 0.03}s` : '0s',
//       }}
//     >
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span">
//             {contact.name || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" tone="subdued">
//             {contact.email || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Text variant="bodyMd" as="span">
//           {contact.phone || "N/A"}
//         </Text>
//       </IndexTable.Cell>

//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.dropdown || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.checkbox || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.radio || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <Box maxWidth="300px">
//           <Text variant="bodyMd" as="span" >
//             {contact.textarea || "N/A"}
//           </Text>
//         </Box>
//       </IndexTable.Cell>
//       <IndexTable.Cell>
//         <BlockStack gap="100">
//           <Text variant="bodyMd" as="span" fontWeight="medium">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </BlockStack>
//       </IndexTable.Cell>
//     </IndexTable.Row>
//   ));

//   // Empty state
//   const emptyStateMarkup = (
//     <EmptySearchResult
//       title={
//         dateFilter === "today"
//           ? "No contacts found for today"
//           : "No contacts found"
//       }
//       description={
//         searchValue || dateFilter !== "all"
//           ? "Try adjusting your search or filters"
//           : "No contact submissions yet"
//       }
//       withIllustration
//     />
//   );

//   return (
//     <>
//       <Page>
//         <InlineStack align="end">
//           <Button
//             icon={ExportIcon}
//             onClick={downloadContactsCSV}
//             disabled={
//               filteredAndSortedContacts.length === 0 || isExporting
//             }
//             loading={isExporting}
//             tone="success"
//           >
//             Export CSV
//           </Button>
//         </InlineStack>

//         <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//           <InlineStack gap="400" wrap={true} blockAlign="stretch">
//             {/* Today's Submissions Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={CalendarIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Today's Submissions
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                       {todayContactsCount}
//                     </Text>
//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>

//             {/* Total Entries Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={CalendarIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Total Entries
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                       {contacts.length}
//                     </Text>
//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>

//             {/* Showing Results Card */}
//             <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//               <Box
//                 padding="400"
//                 background="bg-surface"
//                 borderRadius="300"
//                 borderColor="border"
//                 borderWidth="025"
//                 shadow="100"
//               >
//                 <InlineStack gap="300" blockAlign="center" wrap={false}>
//                   <div
//                     style={{
//                       padding: "12px",
//                       background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       minWidth: "48px",
//                       height: "48px",
//                     }}
//                   >
//                     <div style={{ color: "white" }}>
//                       <Icon source={SearchIcon} />
//                     </div>
//                   </div>
//                   <BlockStack gap="100">
//                     <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                       Showing Results
//                     </Text>
//                     <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                       {startIndex}-{endIndex} of {filteredAndSortedContacts.length}
//                     </Text>
//                   </BlockStack>
//                 </InlineStack>
//               </Box>
//             </div>
//           </InlineStack>
//         </div>

//         <BlockStack gap="400">
//           <LegacyCard>
//             <div style={{ padding: "16px 20px" }}>
//               {/* Filters and Controls Section */}
//               <div style={{ marginTop: "20px" }}>
//                 <InlineStack gap="300" align="space-between" blockAlign="center">
//                   {/* Left side: Search */}
//                   <div style={{ flex: 1, maxWidth: "400px" }}>
//                     <TextField
//                       value={searchValue}
//                       onChange={handleSearchChange}
//                       placeholder="Search contacts..."
//                       prefix={<Icon source={SearchIcon} tone="base" />}
//                       clearButton
//                       onClearButtonClick={handleSearchClear}
//                       autoComplete="off"
//                     />
//                   </div>

//                   {/* Right side: Date Filter, Sort, Reset */}
//                   <InlineStack gap="200" blockAlign="center" wrap={false}>
//                     {/* Date Filter */}
//                     <InlineStack gap="100" blockAlign="center">
//                       <Icon source={CalendarIcon} tone="base" />
//                       <div style={{ minWidth: "140px" }}>
//                         <Select
//                           label="Date filter"
//                           labelHidden
//                           options={dateFilterOptions}
//                           value={dateFilter}
//                           onChange={handleDateFilterChange}
//                         />
//                       </div>
//                     </InlineStack>

//                     {/* Sort */}
//                     <InlineStack gap="100" blockAlign="center">
//                       <Icon
//                         source={
//                           sortValue.includes("asc")
//                             ? SortAscendingIcon
//                             : SortDescendingIcon
//                         }
//                         tone="base"
//                       />
//                       <div style={{ minWidth: "200px" }}>
//                         <Select
//                           label="Sort order"
//                           labelHidden
//                           options={sortOptions}
//                           value={sortValue}
//                           onChange={handleSortChange}
//                         />
//                       </div>
//                     </InlineStack>

//                     {/* Reset Button */}
//                     {(searchValue || dateFilter !== "all" || sortValue !== "date-desc") && (
//                       <Button
//                         icon={RefreshIcon}
//                         onClick={handleResetFilters}
//                         accessibilityLabel="Reset all filters"
//                       >
//                         Reset
//                       </Button>
//                     )}
//                   </InlineStack>
//                 </InlineStack>
//               </div>
//             </div>

//             {/* Table Section */}
//             <IndexTable
//               resourceName={resourceName}
//               itemCount={paginatedContacts.length}
//               selectable={false}
//               headings={[
//                 { title: "Name" },
//                 { title: "Email" },
//                 { title: "Phone" },
//                 { title: "Dropdown" },
//                 { title: "Checkbox" },
//                 { title: "Radio" },
//                 { title: "Textarea" },
//                 { title: "Date" },
//               ]}
//               emptyState={emptyStateMarkup}
//               loading={loading}
//             >
//               {rowMarkup}
//             </IndexTable>

//             {/* Custom Pagination Section */}
//             {filteredAndSortedContacts.length > 0 && (
//               <div
//                 style={{
//                   padding: "16px 20px",
//                   borderTop: "1px solid #E1E3E5",
//                 }}
//               >
//                 <InlineStack align="space-between" blockAlign="center">
//                   {/* Left: Pagination Info */}
//                   <InlineStack gap="200" blockAlign="center">
//                     <Text variant="bodyMd" as="span" tone="subdued">
//                       Showing {startIndex}-{endIndex} of{" "}
//                       {filteredAndSortedContacts.length} results
//                     </Text>
//                     <Badge tone="info">
//                       Page {currentPage} of {totalPages}
//                     </Badge>
//                   </InlineStack>

//                   {/* Right: Pagination Controls */}
//                   <ButtonGroup>
//                     <Button
//                       onClick={handlePreviousPage}
//                       disabled={currentPage === 1}
//                       accessibilityLabel="Previous page"
//                     >
//                       ← Previous
//                     </Button>
//                     <Button
//                       onClick={handleNextPage}
//                       disabled={currentPage >= totalPages}
//                       accessibilityLabel="Next page"
//                     >
//                       Next →
//                     </Button>
//                   </ButtonGroup>
//                 </InlineStack>
//               </div>
//             )}
//           </LegacyCard>
//         </BlockStack>
//       </Page>
//     </>
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

//   const res = await fetch(`http://localhost:5000/api/users/${merchantId}`);
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

//   const contacts = merchant?.contacts || [];
//   const fields = merchant?.formTemplates?.fields || [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const limit = 15;

//   // Add animations and styles
//   useEffect(() => {
//     setIsClient(true);
//     const style = document.createElement('style');
//     style.innerHTML = `
//       @keyframes fadeInUp {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       @keyframes iconPulse {
//         0%, 100% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//       }
//       @keyframes countUp {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       .animate-row {
//         animation: fadeInUp 0.3s ease-out backwards;
//       }
//       .animate-count {
//         animation: countUp 0.6s ease-out;
//       }
//       .Polaris-Box:hover [style*="gradient"] {
//         animation: iconPulse 2s ease-in-out infinite;
//       }
//       .Polaris-IndexTable__TableRow {
//         transition: background-color 0.2s ease, transform 0.2s ease;
//       }
//       .Polaris-IndexTable__TableRow:hover {
//         background-color: rgba(0, 0, 0, 0.03);
//       }
//       .Polaris-Box {
//         transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         cursor: default;
//       }
//       .Polaris-Box:hover {
//         transform: translateY(-4px);
//         box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
//       }
//       @media (max-width: 768px) {
//         .Polaris-InlineStack > div {
//           flex: 1 1 100% !important;
//           min-width: 100% !important;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const today = new Date();
//     const checkDate = new Date(date);
//     return (
//       checkDate.getDate() === today.getDate() &&
//       checkDate.getMonth() === today.getMonth() &&
//       checkDate.getFullYear() === today.getFullYear()
//     );
//   };

//   /* ===================== FILTER + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     // Apply date filter
//     if (dateFilter === "today") {
//       data = data.filter((contact) => isToday(contact.createdAt));
//     }

//     // Apply search filter
//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) => {
//         // Search in dynamic fields
//         const fieldMatch = fields.some((field) => {
//           const key = FIELD_TYPE_MAP[field.type];
//           const value = c[key];
//           if (Array.isArray(value)) {
//             return value.some(v => v.toLowerCase().includes(q));
//           }
//           return value?.toString().toLowerCase().includes(q);
//         });
        
//         return fieldMatch;
//       });
//     }

//     // Apply sorting
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

//   const startIndex = filteredContacts.length === 0
//     ? 0
//     : (page - 1) * limit + 1;
//   const endIndex = Math.min(page * limit, filteredContacts.length);

//   /* ===================== DYNAMIC HEADINGS ===================== */
//   const headings = useMemo(() => {
//     return [
//       ...fields.map((field) => ({
//         title: field.label.replace("/", "").trim(),
//       })),
//       { title: "Date" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [
//         ...fields.map((f) => f.label),
//         "Date",
//       ];

//       const rows = filteredContacts.map((c) => [
//         ...fields.map((f) => {
//           const key = FIELD_TYPE_MAP[f.type];
//           const value = c[key];
//           return Array.isArray(value) ? value.join("; ") : (value || "");
//         }),
//         formatDate(c.createdAt),
//       ]);

//       const csv = [headers, ...rows].map((r) => 
//         r.map(cell => `"${cell}"`).join(",")
//       ).join("\n");
      
//       const blob = new Blob([csv], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contacts_${merchantId}_${Date.now()}.csv`;
//       link.click();

//       setIsExporting(false);
//     }, 500);
//   }, [filteredContacts, fields, merchantId]);

//   /* ===================== EVENT HANDLERS ===================== */
//   const handleSearchChange = useCallback((value) => {
//     setSearch(value);
//     setPage(1);
//   }, []);

//   const handleSearchClear = useCallback(() => {
//     setSearch("");
//     setPage(1);
//   }, []);

//   const handleSortChange = useCallback((value) => {
//     setSort(value);
//     setPage(1);
//   }, []);

//   const handleDateFilterChange = useCallback((value) => {
//     setDateFilter(value);
//     setPage(1);
//   }, []);

//   const handleResetFilters = useCallback(() => {
//     setSearch("");
//     setSort("date-desc");
//     setDateFilter("all");
//     setPage(1);
//   }, []);

//   /* ===================== STATISTICS ===================== */
//   const todayContactsCount = contacts.filter((c) => isToday(c.createdAt)).length;

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//       className={isClient ? 'animate-row' : ''}
//       style={{
//         animationDelay: isClient ? `${index * 0.03}s` : '0s',
//       }}
//     >
//       {fields.map((field) => {
//         const key = FIELD_TYPE_MAP[field.type];
//         const value = contact[key];

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Box maxWidth="300px">
//               <Text variant="bodyMd" as="span">
//                 {Array.isArray(value) ? value.join(", ") : value || "N/A"}
//               </Text>
//             </Box>
//           </IndexTable.Cell>
//         );
//       })}

//       <IndexTable.Cell>
//         <BlockStack gap="100">
//           <Text variant="bodyMd" as="span" fontWeight="medium">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </BlockStack>
//       </IndexTable.Cell>
//     </IndexTable.Row>
//   ));

//   /* ===================== EMPTY STATE ===================== */
//   const emptyStateMarkup = (
//     <EmptySearchResult
//       title={
//         dateFilter === "today"
//           ? "No contacts found for today"
//           : "No contacts found"
//       }
//       description={
//         search || dateFilter !== "all"
//           ? "Try adjusting your search or filters"
//           : "No submissions yet"
//       }
//       withIllustration
//     />
//   );

//   /* ===================== SORT OPTIONS ===================== */
//   const sortOptions = [
//     { label: "Newest First", value: "date-desc" },
//     { label: "Oldest First", value: "date-asc" },
//   ];

//   const dateFilterOptions = [
//     { label: "All Dates", value: "all" },
//     { label: "Today Only", value: "today" },
//   ];

//   /* ===================== UI ===================== */
//   return (
//     <Page>
//       <InlineStack align="end">
//         <Button
//           icon={ExportIcon}
//           tone="success"
//           onClick={exportCSV}
//           disabled={filteredContacts.length === 0 || isExporting}
//           loading={isExporting}
//         >
//           Export CSV
//         </Button>
//       </InlineStack>

//       {/* Statistics Cards */}
//       <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//         <InlineStack gap="400" wrap={true} blockAlign="stretch">
//           {/* Today's Submissions Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={CalendarIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Today's Submissions
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {todayContactsCount}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>

//           {/* Total Entries Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={CalendarIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Total Entries
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {contacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>

//           {/* Showing Results Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={SearchIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Showing Results
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {startIndex}-{endIndex} of {filteredContacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>
//         </InlineStack>
//       </div>

//       <LegacyCard>
//         <div style={{ padding: "16px 20px" }}>
//           {/* Filters Section */}
//           <div style={{ marginTop: "20px" }}>
//             <InlineStack gap="300" align="space-between" blockAlign="center">
//               {/* Search */}
//               <div style={{ flex: 1, maxWidth: "400px" }}>
//                 <TextField
//                   value={search}
//                   onChange={handleSearchChange}
//                   placeholder="Search contacts..."
//                   prefix={<Icon source={SearchIcon} tone="base" />}
//                   clearButton
//                   onClearButtonClick={handleSearchClear}
//                   autoComplete="off"
//                 />
//               </div>

//               {/* Filters & Controls */}
//               <InlineStack gap="200" blockAlign="center" wrap={false}>
//                 {/* Date Filter */}
//                 <InlineStack gap="100" blockAlign="center">
//                   <Icon source={CalendarIcon} tone="base" />
//                   <div style={{ minWidth: "140px" }}>
//                     <Select
//                       label="Date filter"
//                       labelHidden
//                       options={dateFilterOptions}
//                       value={dateFilter}
//                       onChange={handleDateFilterChange}
//                     />
//                   </div>
//                 </InlineStack>

//                 {/* Sort */}
//                 <InlineStack gap="100" blockAlign="center">
//                   <Icon
//                     source={
//                       sort.includes("asc")
//                         ? SortAscendingIcon
//                         : SortDescendingIcon
//                     }
//                     tone="base"
//                   />
//                   <div style={{ minWidth: "160px" }}>
//                     <Select
//                       label="Sort order"
//                       labelHidden
//                       options={sortOptions}
//                       value={sort}
//                       onChange={handleSortChange}
//                     />
//                   </div>
//                 </InlineStack>

//                 {/* Reset Button */}
//                 {(search || dateFilter !== "all" || sort !== "date-desc") && (
//                   <Button
//                     icon={RefreshIcon}
//                     onClick={handleResetFilters}
//                     accessibilityLabel="Reset all filters"
//                   >
//                     Reset
//                   </Button>
//                 )}
//               </InlineStack>
//             </InlineStack>
//           </div>
//         </div>

//         {/* Table */}
//         <IndexTable
//           resourceName={{ singular: "contact", plural: "contacts" }}
//           itemCount={paginated.length}
//           headings={headings}
//           selectable={false}
//           loading={loading}
//           emptyState={emptyStateMarkup}
//         >
//           {rowMarkup}
//         </IndexTable>

//         {/* Pagination */}
//         {filteredContacts.length > 0 && (
//           <div
//             style={{
//               padding: "16px 20px",
//               borderTop: "1px solid #E1E3E5",
//             }}
//           >
//             <InlineStack align="space-between" blockAlign="center">
//               <InlineStack gap="200" blockAlign="center">
//                 <Text variant="bodyMd" as="span" tone="subdued">
//                   Showing {startIndex}-{endIndex} of {filteredContacts.length} results
//                 </Text>
//                 <Badge tone="info">
//                   Page {page} of {totalPages}
//                 </Badge>
//               </InlineStack>

//               <ButtonGroup>
//                 <Button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => p - 1)}
//                   accessibilityLabel="Previous page"
//                 >
//                   ← Previous
//                 </Button>
//                 <Button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => p + 1)}
//                   accessibilityLabel="Next page"
//                 >
//                   Next →
//                 </Button>
//               </ButtonGroup>
//             </InlineStack>
//           </div>
//         )}
//       </LegacyCard>
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

//   const res = await fetch(`http://localhost:5000/api/users/${merchantId}`);
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
//   const fields = refreshedData?.formTemplates?.fields || merchant?.formTemplates?.fields || [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [isExporting, setIsExporting] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const limit = 15;

//   // Add animations and styles
//   useEffect(() => {
//     setIsClient(true);
//     const style = document.createElement('style');
//     style.innerHTML = `
      
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const today = new Date();
//     const checkDate = new Date(date);
//     return (
//       checkDate.getDate() === today.getDate() &&
//       checkDate.getMonth() === today.getMonth() &&
//       checkDate.getFullYear() === today.getFullYear()
//     );
//   };

//   /* ===================== FILTER + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     // Apply date filter
//     if (dateFilter === "today") {
//       data = data.filter((contact) => isToday(contact.createdAt));
//     }

//     // Apply search filter
//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) => {
//         // Search in dynamic fields
//         const fieldMatch = fields.some((field) => {
//           const key = FIELD_TYPE_MAP[field.type];
//           const value = c[key];
//           if (Array.isArray(value)) {
//             return value.some(v => v.toLowerCase().includes(q));
//           }
//           return value?.toString().toLowerCase().includes(q);
//         });
        
//         return fieldMatch;
//       });
//     }

//     // Apply sorting
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

//   const startIndex = filteredContacts.length === 0
//     ? 0
//     : (page - 1) * limit + 1;
//   const endIndex = Math.min(page * limit, filteredContacts.length);

//   /* ===================== DYNAMIC HEADINGS ===================== */
//   const headings = useMemo(() => {
//     return [
//       ...fields.map((field) => ({
//         title: field.label.replace("/", "").trim(),
//       })),
//       { title: "Date" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length) return;

//     setIsExporting(true);

//     setTimeout(() => {
//       const headers = [
//         ...fields.map((f) => f.label),
//         "Date",
//       ];

//       const rows = filteredContacts.map((c) => [
//         ...fields.map((f) => {
//           const key = FIELD_TYPE_MAP[f.type];
//           const value = c[key];
//           return Array.isArray(value) ? value.join("; ") : (value || "");
//         }),
//         formatDate(c.createdAt),
//       ]);

//       const csv = [headers, ...rows].map((r) => 
//         r.map(cell => `"${cell}"`).join(",")
//       ).join("\n");
      
//       const blob = new Blob([csv], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `contacts_${merchantId}_${Date.now()}.csv`;
//       link.click();

//       setIsExporting(false);
//     }, 500);
//   }, [filteredContacts, fields, merchantId]);

//   /* ===================== EVENT HANDLERS ===================== */
//   const handleSearchChange = useCallback((value) => {
//     setSearch(value);
//     setPage(1);
//   }, []);

//   const handleSearchClear = useCallback(() => {
//     setSearch("");
//     setPage(1);
//   }, []);

//   const handleSortChange = useCallback((value) => {
//     setSort(value);
//     setPage(1);
//   }, []);

//   const handleDateFilterChange = useCallback((value) => {
//     setDateFilter(value);
//     setPage(1);
//   }, []);

//   const handleResetFilters = useCallback(() => {
//     setSearch("");
//     setSort("date-desc");
//     setDateFilter("all");
//     setPage(1);
//   }, []);

//   /* ===================== REFRESH HANDLER ===================== */
//   const handleRefresh = useCallback(async () => {
//     setIsRefreshing(true);
    
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//       const json = await response.json();
      
//       if (json.data) {
//         setRefreshedData(json.data);
//       }
//     } catch (error) {
//       console.error("Failed to refresh data:", error);
//     } finally {
//       setIsRefreshing(false);
//     }
//   }, [merchantId]);

//   /* ===================== STATISTICS ===================== */
//   const todayContactsCount = contacts.filter((c) => isToday(c.createdAt)).length;

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//       className={isClient ? 'animate-row' : ''}
//       style={{
//         animationDelay: isClient ? `${index * 0.03}s` : '0s',
//       }}
//     >
//       {fields.map((field) => {
//         const key = FIELD_TYPE_MAP[field.type];
//         const value = contact[key];

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Box maxWidth="300px">
//               <Text variant="bodyMd" as="span">
//                 {Array.isArray(value) ? value.join(", ") : value || "N/A"}
//               </Text>
//             </Box>
//           </IndexTable.Cell>
//         );
//       })}

//       <IndexTable.Cell>
//         <BlockStack gap="100">
//           <Text variant="bodyMd" as="span" fontWeight="medium">
//             {formatDate(contact.createdAt)}
//           </Text>
//         </BlockStack>
//       </IndexTable.Cell>
//     </IndexTable.Row>
//   ));

//   /* ===================== EMPTY STATE ===================== */
//   const emptyStateMarkup = (
//     <EmptySearchResult
//       title={
//         dateFilter === "today"
//           ? "No contacts found for today"
//           : "No contacts found"
//       }
//       description={
//         search || dateFilter !== "all"
//           ? "Try adjusting your search or filters"
//           : "No submissions yet"
//       }
//       withIllustration
//     />
//   );

//   /* ===================== SORT OPTIONS ===================== */
//   const sortOptions = [
//     { label: "Newest First", value: "date-desc" },
//     { label: "Oldest First", value: "date-asc" },
//   ];

//   const dateFilterOptions = [
//     { label: "All Dates", value: "all" },
//     { label: "Today Only", value: "today" },
//   ];

//   /* ===================== UI ===================== */
//   return (
//     <Page>
//       <InlineStack align="end" gap="200">
//         <Button
//           icon={RefreshIcon}
//           onClick={handleRefresh}
//           loading={isRefreshing}
//           disabled={isRefreshing}
//         >
//           Refresh
//         </Button>
//         <Button
//           icon={ExportIcon}
//           tone="success"
//           onClick={exportCSV}
//           disabled={filteredContacts.length === 0 || isExporting}
//           loading={isExporting}
//         >
//           Export CSV
//         </Button>
//       </InlineStack>

//       {/* Statistics Cards */}
//       <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//         <InlineStack gap="400" wrap={true} blockAlign="stretch">
//           {/* Today's Submissions Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={CalendarIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Today's Submissions
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {todayContactsCount}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>

//           {/* Total Entries Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={CalendarIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Total Entries
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {contacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>

//           {/* Showing Results Card */}
//           <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
//             <Box
//               padding="400"
//               background="bg-surface"
//               borderRadius="300"
//               borderColor="border"
//               borderWidth="025"
//               shadow="100"
//             >
//               <InlineStack gap="300" blockAlign="center" wrap={false}>
//                 <div
//                   style={{
//                     padding: "12px",
//                     background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "48px",
//                     height: "48px",
//                   }}
//                 >
//                   <div style={{ color: "white" }}>
//                     <Icon source={SearchIcon} />
//                   </div>
//                 </div>
//                 <BlockStack gap="100">
//                   <Text variant="bodySm" as="p" tone="subdued" fontWeight="medium">
//                     Showing Results
//                   </Text>
//                   <Text variant="heading2xl" as="h3" fontWeight="bold" className={isClient ? 'animate-count' : ''}>
//                     {startIndex}-{endIndex} of {filteredContacts.length}
//                   </Text>
//                 </BlockStack>
//               </InlineStack>
//             </Box>
//           </div>
//         </InlineStack>
//       </div>

//       <LegacyCard>
//         <div style={{ padding: "16px 20px" }}>
//           {/* Filters Section */}
//           <div style={{ marginTop: "20px" }}>
//             <InlineStack gap="300" align="space-between" blockAlign="center">
//               {/* Search */}
//               <div style={{ flex: 1, maxWidth: "400px" }}>
//                 <TextField
//                   value={search}
//                   onChange={handleSearchChange}
//                   placeholder="Search contacts..."
//                   prefix={<Icon source={SearchIcon} tone="base" />}
//                   clearButton
//                   onClearButtonClick={handleSearchClear}
//                   autoComplete="off"
//                 />
//               </div>

//               {/* Filters & Controls */}
//               <InlineStack gap="200" blockAlign="center" wrap={false}>
//                 {/* Date Filter */}
//                 <InlineStack gap="100" blockAlign="center">
//                   <Icon source={CalendarIcon} tone="base" />
//                   <div style={{ minWidth: "140px" }}>
//                     <Select
//                       label="Date filter"
//                       labelHidden
//                       options={dateFilterOptions}
//                       value={dateFilter}
//                       onChange={handleDateFilterChange}
//                     />
//                   </div>
//                 </InlineStack>

//                 {/* Sort */}
//                 <InlineStack gap="100" blockAlign="center">
//                   <Icon
//                     source={
//                       sort.includes("asc")
//                         ? SortAscendingIcon
//                         : SortDescendingIcon
//                     }
//                     tone="base"
//                   />
//                   <div style={{ minWidth: "160px" }}>
//                     <Select
//                       label="Sort order"
//                       labelHidden
//                       options={sortOptions}
//                       value={sort}
//                       onChange={handleSortChange}
//                     />
//                   </div>
//                 </InlineStack>

//                 {/* Reset Button */}
//                 {(search || dateFilter !== "all" || sort !== "date-desc") && (
//                   <Button
//                     icon={RefreshIcon}
//                     onClick={handleResetFilters}
//                     accessibilityLabel="Reset all filters"
//                   >
//                     Reset
//                   </Button>
//                 )}
//               </InlineStack>
//             </InlineStack>
//           </div>
//         </div>

//         {/* Table */}
//         <IndexTable
//           resourceName={{ singular: "contact", plural: "contacts" }}
//           itemCount={paginated.length}
//           headings={headings}
//           selectable={false}
//           loading={loading}
//           emptyState={emptyStateMarkup}
//         >
//           {rowMarkup}
//         </IndexTable>

//         {/* Pagination */}
//         {filteredContacts.length > 0 && (
//           <div
//             style={{
//               padding: "16px 20px",
//               borderTop: "1px solid #E1E3E5",
//             }}
//           >
//             <InlineStack align="space-between" blockAlign="center">
//               <InlineStack gap="200" blockAlign="center">
//                 <Text variant="bodyMd" as="span" tone="subdued">
//                   Showing {startIndex}-{endIndex} of {filteredContacts.length} results
//                 </Text>
//                 <Badge tone="info">
//                   Page {page} of {totalPages}
//                 </Badge>
//               </InlineStack>

//               <ButtonGroup>
//                 <Button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => p - 1)}
//                   accessibilityLabel="Previous page"
//                 >
//                   ← Previous
//                 </Button>
//                 <Button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => p + 1)}
//                   accessibilityLabel="Next page"
//                 >
//                   Next →
//                 </Button>
//               </ButtonGroup>
//             </InlineStack>
//           </div>
//         )}
//       </LegacyCard>
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

//   const res = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//   const json = await res.json();

//   return {
//     merchant: json.data,
//     merchantId,
//   };
// };

// /* ===================== FIELD TYPE MAP ===================== */
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

//   const contacts = merchant?.contacts || [];
//   const fields = merchant?.formTemplates?.fields || [];

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("date-desc");
//   const [page, setPage] = useState(1);
//   const [dateFilter, setDateFilter] = useState("all");
//   const limit = 15;

//   /* ===================== HELPERS ===================== */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   const isToday = (date) => {
//     const d = new Date(date);
//     const t = new Date();
//     return (
//       d.getDate() === t.getDate() &&
//       d.getMonth() === t.getMonth() &&
//       d.getFullYear() === t.getFullYear()
//     );
//   };

//   /* ===================== FILTER + SEARCH + SORT ===================== */
//   const filteredContacts = useMemo(() => {
//     let data = [...contacts];

//     if (dateFilter === "today") {
//       data = data.filter((c) => isToday(c.createdAt));
//     }

//     if (search) {
//       const q = search.toLowerCase();
//       data = data.filter((c) =>
//         fields.some((field) => {
//           const typeKey = FIELD_TYPE_MAP[field.type];
//           const value = c?.[typeKey]?.[field.label];
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

//   /* ===================== TABLE HEADINGS ===================== */
//   const headings = useMemo(() => {
//     return [
//       ...fields.map((f) => ({ title: f.label })),
//       { title: "Date" },
//     ];
//   }, [fields]);

//   /* ===================== CSV EXPORT ===================== */
//   const exportCSV = useCallback(() => {
//     if (!filteredContacts.length) return;

//     const headers = [...fields.map((f) => f.label), "Date"];

//     const rows = filteredContacts.map((c) => [
//       ...fields.map((f) => {
//         const typeKey = FIELD_TYPE_MAP[f.type];
//         return c?.[typeKey]?.[f.label] || "";
//       }),
//       formatDate(c.createdAt),
//     ]);

//     const csv = [headers, ...rows]
//       .map((r) => r.map((cell) => `"${cell}"`).join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `contacts_${merchantId}.csv`;
//     link.click();
//   }, [filteredContacts, fields, merchantId]);

//   /* ===================== ROWS ===================== */
//   const rowMarkup = paginated.map((contact, index) => (
//     <IndexTable.Row
//       id={contact._id}
//       key={contact._id}
//       position={index}
//     >
//       {fields.map((field) => {
//         const typeKey = FIELD_TYPE_MAP[field.type];
//         const value = contact?.[typeKey]?.[field.label];

//         return (
//           <IndexTable.Cell key={field._id}>
//             <Text variant="bodyMd">
//               {value ? value.toString() : "N/A"}
//             </Text>
//           </IndexTable.Cell>
//         );
//       })}

//       <IndexTable.Cell>
//         <Text variant="bodyMd">
//           {formatDate(contact.createdAt)}
//         </Text>
//       </IndexTable.Cell>
//     </IndexTable.Row>
//   ));

//   /* ===================== EMPTY STATE ===================== */
//   const emptyStateMarkup = (
//     <EmptySearchResult
//       title="No contacts found"
//       description="No form submissions yet"
//       withIllustration
//     />
//   );

//   /* ===================== UI ===================== */
//   return (
//     <Page title="Form Submissions">
//       <LegacyCard>
//         <div style={{ padding: 16 }}>
//           <InlineStack gap="300">
//             <TextField
//               value={search}
//               onChange={setSearch}
//               placeholder="Search..."
//               prefix={<Icon source={SearchIcon} />}
//               clearButton
//               onClearButtonClick={() => setSearch("")}
//             />

//             <Select
//               label="Sort"
//               labelHidden
//               options={[
//                 { label: "Newest First", value: "date-desc" },
//                 { label: "Oldest First", value: "date-asc" },
//               ]}
//               value={sort}
//               onChange={setSort}
//             />

//             <Select
//               label="Date"
//               labelHidden
//               options={[
//                 { label: "All", value: "all" },
//                 { label: "Today", value: "today" },
//               ]}
//               value={dateFilter}
//               onChange={setDateFilter}
//             />

//             <Button icon={ExportIcon} onClick={exportCSV}>
//               Export CSV
//             </Button>
//           </InlineStack>
//         </div>

//         <IndexTable
//           resourceName={{ singular: "contact", plural: "contacts" }}
//           itemCount={paginated.length}
//           headings={headings}
//           selectable={false}
//           loading={loading}
//           emptyState={emptyStateMarkup}
//         >
//           {rowMarkup}
//         </IndexTable>

//         {filteredContacts.length > 0 && (
//           <div style={{ padding: 16 }}>
//             <InlineStack align="space-between">
//               <Text tone="subdued">
//                 Showing {startIndex}-{endIndex} of{" "}
//                 {filteredContacts.length}
//               </Text>

//               <ButtonGroup>
//                 <Button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => p - 1)}
//                 >
//                   Prev
//                 </Button>
//                 <Button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => p + 1)}
//                 >
//                   Next
//                 </Button>
//               </ButtonGroup>
//             </InlineStack>
//           </div>
//         )}
//       </LegacyCard>
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

  const res = await fetch(`http://localhost:5000/api/users/${merchantId}`);
  const json = await res.json();

  return {
    merchant: json.data,
    merchantId,
  };
};

/* ===================== FIELD → CONTACT KEY MAP ===================== */
const FIELD_TYPE_MAP = {
  text: "text",
  email: "email",
  number: "number",
  textarea: "textarea",
  checkbox: "checkbox",
  select: "dropdown",
  radio: "radio",
};

/* ===================== COMPONENT ===================== */
export default function Index() {
  const { merchant, merchantId } = useLoaderData();
  const nav = useNavigation();
  const loading = nav.state === "submitting";

  const [refreshedData, setRefreshedData] = useState(null);

  const contacts = refreshedData?.contacts || merchant?.contacts || [];
  const fields =
    refreshedData?.formTemplates?.fields ||
    merchant?.formTemplates?.fields ||
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
          const key = FIELD_TYPE_MAP[field.type];
          const value = c?.[key]?.[field.label];

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
  const headings = useMemo(
    () => [
      ...fields.map((f) => ({
        title: f.label.replace("/", "").trim(),
      })),
      { title: "Date" },
    ],
    [fields]
  );

  /* ===================== CSV EXPORT ===================== */
  const exportCSV = useCallback(() => {
    if (!filteredContacts.length) return;

    setIsExporting(true);

    setTimeout(() => {
      const headers = [...fields.map((f) => f.label), "Date"];

      const rows = filteredContacts.map((c) => [
        ...fields.map((f) => {
          const key = FIELD_TYPE_MAP[f.type];
          const value = c?.[key]?.[f.label];
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
    const res = await fetch(
      `http://localhost:5000/api/users/${merchantId}`
    );
    const json = await res.json();
    setRefreshedData(json.data);
    setIsRefreshing(false);
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
        const key = FIELD_TYPE_MAP[field.type];
        const value = contact?.[key]?.[field.label];

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

      <IndexTable.Cell>
        <Text variant="bodyMd">
          {formatDate(contact.createdAt)}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  /* ===================== UI ===================== */
  return (
    <Page>
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
        >
          Export CSV
        </Button>
      </InlineStack>

      {/* ===== TOP 3 BOXES (UNCHANGED) ===== */}
      <div style={{ margin: "20px 0" }}>
        <InlineStack gap="400" wrap>
          <Box padding="400" background="bg-surface" borderRadius="300">
            <Text tone="subdued">Today's Submissions</Text>
            <Text variant="heading2xl">{todayContactsCount}</Text>
          </Box>

          <Box padding="400" background="bg-surface" borderRadius="300">
            <Text tone="subdued">Total Entries</Text>
            <Text variant="heading2xl">{contacts.length}</Text>
          </Box>

          <Box padding="400" background="bg-surface" borderRadius="300">
            <Text tone="subdued">Showing Results</Text>
            <Text variant="heading2xl">
              {startIndex}-{endIndex} of {filteredContacts.length}
            </Text>
          </Box>
        </InlineStack>
      </div>

      <LegacyCard>
        <IndexTable
          resourceName={{ singular: "contact", plural: "contacts" }}
          itemCount={paginated.length}
          headings={headings}
          selectable={false}
          loading={loading}
          emptyState={
            <EmptySearchResult
              title="No contacts found"
              description="No submissions yet"
              withIllustration
            />
          }
        >
          {rowMarkup}
        </IndexTable>

        {filteredContacts.length > 0 && (
          <div style={{ padding: 16 }}>
            <InlineStack align="space-between">
              <Text tone="subdued">
                Showing {startIndex}-{endIndex} of{" "}
                {filteredContacts.length}
              </Text>
              <ButtonGroup>
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </InlineStack>
          </div>
        )}
      </LegacyCard>
    </Page>
  );
}
