// import { useLoaderData, Form, useActionData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useCallback, useEffect, useMemo, useRef } from "react";
// import {
//     Page,
//     Layout,
//     Card,
//     FormLayout,
//     TextField,
//     Button,
//     Badge,
//     Text,
//     BlockStack,
//     InlineStack,
//     Banner,
//     IndexTable, 
//     Icon,
//     Divider,
//     Box,
//     ProgressBar,
//     Toast, 
//     useBreakpoints, 
//     Frame,
//     Popover,
//     Scrollable,
// } from "@shopify/polaris";
// import {
//     CheckIcon, 
//     PhoneIcon, 
//     SortAscendingIcon,
//     SortDescendingIcon,
//     ChevronDownIcon,
//     SearchIcon,
// } from "@shopify/polaris-icons";
// import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';
// import * as flags from 'country-flag-icons/react/3x2';


// // Get country name in English using Intl API
// const getCountryName = (countryCode) => {
//     try {
//         const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//         return regionNames.of(countryCode) || countryCode;
//     } catch (error) {
//         return countryCode;
//     }
// };

// // Get flag component for country
// const getFlagComponent = (countryCode) => {
//     const FlagComponent = flags[countryCode];
//     return FlagComponent || null;
// };

// // Generate country options dynamically from libphonenumber-js
// const generateCountryOptions = () => {
//     const countries = getCountries();

//     return countries
//         .map(countryCode => {
//             try {
//                 const callingCode = getCountryCallingCode(countryCode);
//                 const name = getCountryName(countryCode);
//                 const FlagComponent = getFlagComponent(countryCode);

//                 return {
//                     label: name,
//                     value: countryCode,
//                     code: countryCode,
//                     callingCode: `+${callingCode}`,
//                     name,
//                     FlagComponent
//                 };
//             } catch (error) {
//                 console.error(`Error processing country ${countryCode}:`, error);
//                 return null;
//             }
//         })
//         .filter(Boolean)
//         .sort((a, b) => a.name.localeCompare(b.name));
// };

// export const loader = async ({ request }) => {
//     const { admin } = await authenticate.admin(request);

//     const shopResponse = await admin.graphql(
//         `#graphql
//     query {
//       shop {
//         id
//         name
//       }
//     }`
//     );

//     const shopJson = await shopResponse.json();
//     const shop = shopJson.data.shop;
//     const merchantId = shop.id.split("/").pop();

//     const getMerchant = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//     const merchantJson = await getMerchant.json();

//     return {
//         merchant: merchantJson.data,
//         merchantId,
//         mongoId: merchantJson.data?._id,
//     };
// };

// export const action = async ({ request }) => {
//     const body = await request.formData();
//     const whatsappNumber = body.get("whatsappNumber");
//     const countryCode = body.get("countryCode");
//     const mongoId = body.get("mongoId");
//     const actionType = body.get("actionType");

//     if (actionType === "refresh") {
//         return {
//             success: true,
//             message: "Table refreshed successfully!",
//             type: "refresh",
//         };
//     }

//     try {
//         const update = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 whatsappNumber,
//                 currencyCode: countryCode,
//             }),
//         });

//         const result = await update.json();

//         return {
//             success: true,
//             message: "WhatsApp number updated successfully!",
//             type: "update",
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: "Update failed. Try again.",
//             type: "update",
//         };
//     }
// };

// export default function Index() {
//     const loaderData = useLoaderData();

//     if (!loaderData) {
//         return null;
//     }

//     const { merchant, merchantId, mongoId } = loaderData;
//     const actionData = useActionData();
//     const nav = useNavigation();
//     const { mdDown } = useBreakpoints();

//     // Generate country options
//     const COUNTRY_OPTIONS = useMemo(() => generateCountryOptions(), []);

//     // WhatsApp Configuration State
//     const [selectedCountry, setSelectedCountry] = useState(() => {
//         const savedCountry = merchant?.currencyCode;
//         return COUNTRY_OPTIONS.find(c => c.callingCode === savedCountry) || COUNTRY_OPTIONS.find(c => c.code === "IN");
//     });

//     const [whatsappNumber, setWhatsappNumber] = useState(merchant?.whatsappNumber || "");
//     const [validationError, setValidationError] = useState("");
//     const [showBanner, setShowBanner] = useState(false);
//     const [showToast, setShowToast] = useState(false);

//     // Track last saved values to detect changes
//     const [lastSavedValues, setLastSavedValues] = useState({
//         number: merchant?.whatsappNumber || "",
//         countryCode: merchant?.currencyCode || ""
//     });

//     // Check if there are unsaved changes
//     const hasUnsavedChanges = useMemo(() => {
//         return whatsappNumber !== lastSavedValues.number ||
//             selectedCountry.callingCode !== lastSavedValues.countryCode;
//     }, [whatsappNumber, selectedCountry, lastSavedValues]);

//     // Country Code Dropdown State
//     const [countryPopoverActive, setCountryPopoverActive] = useState(false);
//     const [countrySearchValue, setCountrySearchValue] = useState("");

//     // Table State
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [eventFilter, setEventFilter] = useState([]);
//     const [sortColumn, setSortColumn] = useState("createdAt");
//     const [sortDirection, setSortDirection] = useState("descending"); 

//     const loading = nav.state === "submitting";

//     // Show banner animation and update last saved values
//     useEffect(() => {
//         if (actionData) {
//             setShowBanner(true);
//             setShowToast(true);

//             if (actionData.type === "update" && actionData.success) {
//                 setLastSavedValues({
//                     number: whatsappNumber,
//                     countryCode: selectedCountry.callingCode
//                 });
//             }

//             const timer = setTimeout(() => {
//                 setShowBanner(false);
//             }, 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [actionData, whatsappNumber, selectedCountry]);

//     // Toggle country dropdown
//     const toggleCountryPopover = useCallback(() => {
//         setCountryPopoverActive((active) => !active);
//         if (!countryPopoverActive) {
//             setCountrySearchValue("");
//         }
//     }, [countryPopoverActive]);

//     // Select country
//     const selectCountry = useCallback((country) => {
//         setSelectedCountry(country);
//         setCountryPopoverActive(false);
//         setCountrySearchValue("");
//         setValidationError("");
//         setWhatsappNumber("");
//     }, []);

//     // Filter countries based on search
//     const filteredCountries = useMemo(() => {
//         if (!countrySearchValue) return COUNTRY_OPTIONS;

//         const searchLower = countrySearchValue.toLowerCase();
//         return COUNTRY_OPTIONS.filter(
//             country =>
//                 country.name.toLowerCase().includes(searchLower) ||
//                 country.callingCode.includes(searchLower) ||
//                 country.code.toLowerCase().includes(searchLower)
//         );
//     }, [COUNTRY_OPTIONS, countrySearchValue]);

//     // Phone number validation using libphonenumber-js
//     const validateWhatsApp = useCallback(
//         (number) => {
//             if (!number || number.trim() === "") {
//                 return "Please enter a phone number.";
//             }

//             try {
//                 const fullNumber = `${selectedCountry.callingCode}${number}`;
//                 const phoneNumber = parsePhoneNumber(fullNumber, selectedCountry.code);

//                 if (!phoneNumber) {
//                     return `Invalid phone number for ${selectedCountry.name}.`;
//                 }

//                 if (!phoneNumber.isValid()) {
//                     return `Invalid phone number format for ${selectedCountry.name}.`;
//                 }

//                 const type = phoneNumber.getType();
//                 if (type && !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(type)) {
//                     return "Please enter a mobile phone number for WhatsApp.";
//                 }

//                 return "";
//             } catch (error) {
//                 return `Invalid phone number for ${selectedCountry.name}.`;
//             }
//         },
//         [selectedCountry]
//     );

//     // Handle form submission
//     const handleSubmit = useCallback(
//         (e) => {
//             const error = validateWhatsApp(whatsappNumber);

//             if (error) {
//                 e.preventDefault();
//                 setValidationError(error);
//                 return false;
//             }

//             setValidationError("");
//         },
//         [whatsappNumber, validateWhatsApp]
//     );

//     // Handle input change
//     const handleInputChange = useCallback(
//         (value) => {
//             const cleanValue = value.replace(/\D/g, "");
//             setWhatsappNumber(cleanValue);

//             if (validationError) {
//                 setValidationError("");
//             }
//         },
//         [validationError]
//     );

//     // CSV Download Function
//     const downloadLogsCSV = useCallback(() => {
//         if (!merchant?.logs || merchant.logs.length === 0) {
//             return;
//         }

//         const headers = ["Event", "Details", "IP Address", "Created At"];
//         const csvRows = [headers.join(",")];

//         merchant.logs.forEach((log) => {
//             const row = [
//                 `"${log.event || ""}"`,
//                 `"${(log.details || "").replace(/"/g, '""')}"`,
//                 `"${log.ipAddress || "N/A"}"`,
//                 `"${new Date(log.createdAt).toLocaleString()}"`,
//             ];
//             csvRows.push(row.join(","));
//         });

//         const csvContent = csvRows.join("\n");
//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const link = document.createElement("a");
//         const url = URL.createObjectURL(blob);

//         link.setAttribute("href", url);
//         link.setAttribute("download", `logs_${merchantId}_${Date.now()}.csv`);
//         link.style.visibility = "hidden";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         setShowToast(true);
//     }, [merchant, merchantId]);

//     // Table Data Processing
//     const reversedLogs = useMemo(
//         () => (merchant?.logs ? [...merchant.logs].reverse() : []),
//         [merchant?.logs]
//     );

//     const eventTypes = useMemo(
//         () => [...new Set(reversedLogs.map((log) => log.event))],
//         [reversedLogs]
//     );

//     const filteredLogs = useMemo(() => {
//         let filtered = [...reversedLogs];

//         if (searchQuery) {
//             const searchLower = searchQuery.toLowerCase();
//             filtered = filtered.filter(
//                 (log) =>
//                     log.event?.toLowerCase().includes(searchLower) ||
//                     log.details?.toLowerCase().includes(searchLower) ||
//                     log.ipAddress?.toLowerCase().includes(searchLower)
//             );
//         }

//         if (eventFilter.length > 0) {
//             filtered = filtered.filter((log) => eventFilter.includes(log.event));
//         }

//         return filtered;
//     }, [reversedLogs, searchQuery, eventFilter]);

//     const sortedLogs = useMemo(() => {
//         const sorted = [...filteredLogs];

//         sorted.sort((a, b) => {
//             let aValue, bValue;

//             switch (sortColumn) {
//                 case "event":
//                     aValue = a.event || "";
//                     bValue = b.event || "";
//                     break;
//                 case "details":
//                     aValue = a.details || "";
//                     bValue = b.details || "";
//                     break;
//                 case "ipAddress":
//                     aValue = a.ipAddress || "";
//                     bValue = b.ipAddress || "";
//                     break;
//                 case "createdAt":
//                     aValue = new Date(a.createdAt).getTime();
//                     bValue = new Date(b.createdAt).getTime();
//                     break;
//                 default:
//                     return 0;
//             }

//             if (typeof aValue === "string") {
//                 aValue = aValue.toLowerCase();
//                 bValue = bValue.toLowerCase();
//             }

//             if (sortDirection === "ascending") {
//                 return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
//             } else {
//                 return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
//             }
//         });

//         return sorted;
//     }, [filteredLogs, sortColumn, sortDirection]);

//     const totalLogs = sortedLogs.length;
//     const totalPages = Math.ceil(totalLogs / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const currentLogs = sortedLogs.slice(startIndex, endIndex);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchQuery, eventFilter, sortColumn, sortDirection]);

//     const handleNextPage = useCallback(() => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     }, [currentPage, totalPages]);

//     const handlePreviousPage = useCallback(() => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     }, [currentPage]);

//     const handleSearchChange = useCallback((value) => {
//         setSearchQuery(value);
//     }, []);

//     const handleEventFilterChange = useCallback((value) => {
//         setEventFilter(value);
//     }, []);

//     const handleEventFilterRemove = useCallback(() => {
//         setEventFilter([]);
//     }, []);

//     const handleClearFilters = useCallback(() => {
//         setSearchQuery("");
//         setEventFilter([]);
//         setSortColumn("createdAt");
//         setSortDirection("descending");
//     }, []);

//     const handleSort = useCallback(
//         (column) => {
//             if (sortColumn === column) {
//                 setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
//             } else {
//                 setSortColumn(column);
//                 setSortDirection("ascending");
//             }
//         },
//         [sortColumn, sortDirection]
//     );

//     const handleRefresh = useCallback(async () => {
//         setIsRefreshing(true);

//         try {
//             const getMerchant = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//             const merchantJson = await getMerchant.json();

//             if (merchantJson.data) {
//                 setShowToast(true);
//             }
//         } catch (error) {
//             console.error("Refresh failed:", error);
//         } finally {
//             setIsRefreshing(false);
//         }
//     }, [merchantId]);

//     const hasFilters =
//         searchQuery || eventFilter.length > 0 || sortColumn !== "createdAt" || sortDirection !== "descending";

//     const appliedFilters = [];
//     if (eventFilter.length > 0) {
//         appliedFilters.push({
//             key: "eventType",
//             label: `Event: ${eventFilter.join(", ")}`,
//             onRemove: handleEventFilterRemove,
//         });
//     }

//     const resourceName = {
//         singular: "log",
//         plural: "logs",
//     };

//     const columnHeadings = [
//         { title: "Event", id: "event", sortable: true },
//         { title: "Details", id: "details", sortable: true },
//         { title: "IP Address", id: "ipAddress", sortable: true },
//         { title: "Created At", id: "createdAt", sortable: true },
//     ];

//     const getSortIcon = (columnId) => {
//         if (sortColumn !== columnId) return null;
//         return sortDirection === "ascending" ? SortAscendingIcon : SortDescendingIcon;
//     };

//     const rowMarkup = currentLogs.map((log, index) => (
//         <IndexTable.Row id={log._id || index.toString()} key={log._id || index} position={index}>
//             <IndexTable.Cell>
//                 <Badge tone="info">{log.event}</Badge>
//             </IndexTable.Cell>
//             <IndexTable.Cell>
//                 <Text as="span" variant="bodyMd">
//                     {log.details}
//                 </Text>
//             </IndexTable.Cell>
//             <IndexTable.Cell>
//                 <Text as="span" variant="bodyMd" tone="subdued">
//                     {log.ipAddress || "N/A"}
//                 </Text>
//             </IndexTable.Cell>
//             <IndexTable.Cell>
//                 <Text as="span" variant="bodyMd">
//                     {log.createdAt.split("T")[0]}
//                 </Text>
//             </IndexTable.Cell>
//         </IndexTable.Row>
//     ));

//     const toastMarkup = showToast ? (
//         <Toast
//             content={actionData?.message || "Action completed successfully"}
//             onDismiss={() => setShowToast(false)}
//             duration={4500}
//         />
//     ) : null;

//     // Custom Country Selector Activator with SVG Flag
//     const countryActivator = (
//         <button
//             type="button"
//             onClick={toggleCountryPopover}
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "10px 12px",
//                 border: "1px solid #C9CCCF",
//                 borderRadius: "8px",
//                 background: "white",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 minWidth: "140px",
//                 height: "36px",
//             }}
//         >
//             {selectedCountry.FlagComponent && (
//                 <selectedCountry.FlagComponent
//                     style={{ width: "24px", height: "16px", borderRadius: "2px" }}
//                 />
//             )}
//             <span style={{ fontWeight: "500", color: "#202223" }}>{selectedCountry.callingCode}</span>
//             <Icon source={ChevronDownIcon} />
//         </button>
//     );

//     // Country Dropdown Content with SVG Flags
//     const countryDropdownContent = (
//         <div style={{
//             width: "320px",
//             maxHeight: "450px",
//             background: "#2C2C2C",
//             borderRadius: "8px",
//             overflow: "hidden"
//         }}>
//             <div style={{
//                 padding: "12px",
//                 borderBottom: "1px solid #3F3F3F",
//                 background: "#2C2C2C"
//             }}>
//                 <div style={{
//                     position: "relative",
//                     display: "flex",
//                     alignItems: "center"
//                 }}>
//                     <div style={{
//                         position: "absolute",
//                         left: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         color: "#8B8B8B"
//                     }}>
//                         <Icon source={SearchIcon} />
//                     </div>
//                     <input
//                         type="text"
//                         value={countrySearchValue}
//                         onChange={(e) => setCountrySearchValue(e.target.value)}
//                         placeholder="Search"
//                         style={{
//                             width: "100%",
//                             padding: "8px 8px 8px 36px",
//                             border: "1px solid rgb(64 255 13)",
//                             borderRadius: "6px",
//                             background: "#1A1A1A",
//                             color: "#E3E3E3",
//                             fontSize: "14px",
//                             outline: "none"
//                         }}
//                     />
//                 </div>
//             </div>
//             <Scrollable style={{ maxHeight: "380px", background: "#2C2C2C" }}>
//                 <div>
//                     {filteredCountries.length > 0 ? (
//                         filteredCountries.map((country) => {
//                             const isSelected = selectedCountry.code === country.code;
//                             const FlagComponent = country.FlagComponent;

//                             return (
//                                 <button
//                                     key={country.code}
//                                     type="button"
//                                     onClick={() => selectCountry(country)}
//                                     style={{
//                                         width: "100%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "12px",
//                                         padding: "10px 16px",
//                                         border: "none",
//                                         background: isSelected ? "#3F3F3F" : "#2C2C2C",
//                                         cursor: "pointer",
//                                         fontSize: "14px",
//                                         textAlign: "left",
//                                         transition: "background 0.2s",
//                                         position: "relative",
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         if (!isSelected) {
//                                             e.currentTarget.style.background = "#3A3A3A";
//                                         }
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         if (!isSelected) {
//                                             e.currentTarget.style.background = "#2C2C2C";
//                                         }
//                                     }}
//                                 >
//                                     {FlagComponent ? (
//                                         <FlagComponent
//                                             style={{
//                                                 width: "28px",
//                                                 height: "20px",
//                                                 borderRadius: "3px",
//                                                 flexShrink: 0
//                                             }}
//                                         />
//                                     ) : (
//                                         <div style={{
//                                             width: "28px",
//                                             height: "20px",
//                                             background: "#3F3F3F",
//                                             borderRadius: "3px",
//                                             flexShrink: 0
//                                         }} />
//                                     )}
//                                     <div style={{ flex: 1 }}>
//                                         <div style={{
//                                             fontWeight: "400",
//                                             color: "#E3E3E3",
//                                             fontSize: "14px"
//                                         }}>
//                                             {country.name}
//                                         </div>
//                                     </div>
//                                     <span style={{
//                                         color: "#8B8B8B",
//                                         fontSize: "13px",
//                                         fontWeight: "400",
//                                         marginRight: isSelected ? "8px" : "0"
//                                     }}>
//                                         {country.callingCode}
//                                     </span>
//                                     {isSelected && (
//                                         <span style={{ color: "#22C55E", fontSize: "18px" }}>✓</span>
//                                     )}
//                                 </button>
//                             );
//                         })
//                     ) : (
//                         <div style={{
//                             padding: "32px 20px",
//                             textAlign: "center",
//                             color: "#8B8B8B",
//                             fontSize: "14px"
//                         }}>
//                             No countries found
//                         </div>
//                     )}
//                 </div>
//             </Scrollable>
//         </div>
//     );

//     return (
//         <Frame>
//             <Page title="Merchant Settings" subtitle="Manage your account configuration and activity">
//                 <BlockStack gap="500">
//                     {showBanner && actionData?.success === true && (
//                         <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}>
//                             <Text as="p">{actionData.message}</Text>
//                         </Banner>
//                     )}

//                     {showBanner && actionData?.success === false && (
//                         <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}>
//                             <Text as="p">{actionData.message}</Text>
//                         </Banner>
//                     )}

//                     <Layout>
//                         <Layout.Section>
//                             <Card>
//                                 <BlockStack gap="500">
//                                     <BlockStack gap="200">
//                                         <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                                             <BlockStack gap="200">
//                                                 <InlineStack gap="200" blockAlign="center">
//                                                     <Icon source={PhoneIcon} tone="base" />
//                                                     <Text variant="headingLg" as="h2">
//                                                         WhatsApp Configuration
//                                                     </Text>
//                                                 </InlineStack>
//                                                 <Text variant="bodyMd" tone="subdued">
//                                                     Configure your WhatsApp number for notifications
//                                                 </Text>
//                                             </BlockStack>
//                                             {merchant?.whatsappNumber && (
//                                                 <Badge tone="success" progress="complete">
//                                                     Configured
//                                                 </Badge>
//                                             )}
//                                         </InlineStack>
//                                     </BlockStack>

//                                     <Divider />

//                                     {loading && (
//                                         <Box paddingBlockEnd="400">
//                                             <ProgressBar progress={75} size="small" tone="primary" />
//                                         </Box>
//                                     )}

//                                     <Form method="post" onSubmit={handleSubmit}>
//                                         <input type="hidden" name="mongoId" value={mongoId} />
//                                         <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />
//                                         <input type="hidden" name="actionType" value="update" />

//                                         <FormLayout>
//                                             <div>
//                                                 <Text as="p" variant="bodyMd" fontWeight="medium">
//                                                     Phone Number
//                                                 </Text>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <InlineStack gap="200" blockAlign="start">
//                                                         <Popover
//                                                             active={countryPopoverActive}
//                                                             activator={countryActivator}
//                                                             onClose={toggleCountryPopover}
//                                                             preferredAlignment="left"
//                                                         >
//                                                             {countryDropdownContent}
//                                                         </Popover>

//                                                         <div style={{ flex: 1 }}>
//                                                             <TextField
//                                                                 type="tel"
//                                                                 name="whatsappNumber"
//                                                                 value={whatsappNumber}
//                                                                 onChange={handleInputChange}
//                                                                 placeholder="Phone Number"
//                                                                 error={validationError}
//                                                                 autoComplete="tel"
//                                                                 labelHidden
//                                                                 label="Phone Number"
//                                                             />
//                                                         </div>
//                                                     </InlineStack>
//                                                 </div>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <Text as="p" variant="bodySm" tone="subdued">
//                                                         Enter mobile number without country code
//                                                     </Text>
//                                                 </div>
//                                             </div>

//                                             <InlineStack align="space-between" blockAlign="center">
//                                                 <Text variant="bodySm" tone="subdued">
//                                                     {!hasUnsavedChanges && whatsappNumber
//                                                         ? "No changes to save"
//                                                         : "Make sure to save your changes"}
//                                                 </Text>
//                                                 <Button
//                                                     submit
//                                                     variant="primary"
//                                                     loading={loading}
//                                                     icon={CheckIcon}
//                                                     size="large"
//                                                     disabled={!whatsappNumber || !hasUnsavedChanges}
//                                                 >
//                                                     {loading ? "Saving..." : "Save Number"}
//                                                 </Button>
//                                             </InlineStack>
//                                         </FormLayout>
//                                     </Form>
//                                 </BlockStack>
//                             </Card>
//                         </Layout.Section>


//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//             </Page>
//         </Frame>
//     );
// }


















// import { useLoaderData, Form, useActionData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useCallback, useEffect, useMemo } from "react";
// import {
//     Page,
//     Layout,
//     Card,
//     FormLayout,
//     TextField,
//     Button,
//     Badge,
//     Text,
//     BlockStack,
//     InlineStack,
//     Banner,
//     Icon,
//     Divider,
//     Box,
//     ProgressBar,
//     Toast,
//     Frame,
//     Popover,
//     Scrollable,
// } from "@shopify/polaris";
// import {
//     CheckIcon,
//     PhoneIcon,
//     ChevronDownIcon,
//     SearchIcon,
// } from "@shopify/polaris-icons";
// import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';
// import * as flags from 'country-flag-icons/react/3x2';

// // Get country name in English using Intl API
// const getCountryName = (countryCode) => {
//     try {
//         const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//         return regionNames.of(countryCode) || countryCode;
//     } catch (error) {
//         return countryCode;
//     }
// };

// // Get flag component for country
// const getFlagComponent = (countryCode) => {
//     const FlagComponent = flags[countryCode];
//     return FlagComponent || null;
// };

// // Generate country options dynamically from libphonenumber-js
// const generateCountryOptions = () => {
//     const countries = getCountries();

//     return countries
//         .map(countryCode => {
//             try {
//                 const callingCode = getCountryCallingCode(countryCode);
//                 const name = getCountryName(countryCode);
//                 const FlagComponent = getFlagComponent(countryCode);

//                 return {
//                     label: name,
//                     value: countryCode,
//                     code: countryCode,
//                     callingCode: `+${callingCode}`,
//                     name,
//                     FlagComponent
//                 };
//             } catch (error) {
//                 console.error(`Error processing country ${countryCode}:`, error);
//                 return null;
//             }
//         })
//         .filter(Boolean)
//         .sort((a, b) => a.name.localeCompare(b.name));
// };

// export const loader = async ({ request }) => {
//     const { admin } = await authenticate.admin(request);

//     const shopResponse = await admin.graphql(
//         `#graphql
//     query {
//       shop {
//         id
//         name
//       }
//     }`
//     );

//     const shopJson = await shopResponse.json();
//     const shop = shopJson.data.shop;
//     const merchantId = shop.id.split("/").pop();

//     const getMerchant = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//     const merchantJson = await getMerchant.json();

//     return {
//         merchant: merchantJson.data,
//         merchantId,
//         mongoId: merchantJson.data?._id,
//     };
// };

// export const action = async ({ request }) => {
//     const body = await request.formData();
//     const whatsappNumber = body.get("whatsappNumber");
//     const countryCode = body.get("countryCode");
//     const mongoId = body.get("mongoId");

//     try {
//         const update = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 whatsappNumber,
//                 currencyCode: countryCode,
//             }),
//         });

//         const result = await update.json();

//         return {
//             success: true,
//             message: "WhatsApp number updated successfully!",
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: "Update failed. Try again.",
//         };
//     }
// };

// export default function Index() {
//     const loaderData = useLoaderData();

//     if (!loaderData) {
//         return null;
//     }

//     const { merchant, mongoId } = loaderData;
//     const actionData = useActionData();
//     const nav = useNavigation();

//     // Generate country options
//     const COUNTRY_OPTIONS = useMemo(() => generateCountryOptions(), []);

//     // WhatsApp Configuration State
//     const [selectedCountry, setSelectedCountry] = useState(() => {
//         const savedCountry = merchant?.currencyCode;
//         return COUNTRY_OPTIONS.find(c => c.callingCode === savedCountry) || COUNTRY_OPTIONS.find(c => c.code === "IN");
//     });

//     const [whatsappNumber, setWhatsappNumber] = useState(merchant?.whatsappNumber || "");
//     const [validationError, setValidationError] = useState("");
//     const [showBanner, setShowBanner] = useState(false);
//     const [showToast, setShowToast] = useState(false);

//     // Track last saved values to detect changes
//     const [lastSavedValues, setLastSavedValues] = useState({
//         number: merchant?.whatsappNumber || "",
//         countryCode: merchant?.currencyCode || ""
//     });

//     // Check if there are unsaved changes
//     const hasUnsavedChanges = useMemo(() => {
//         return whatsappNumber !== lastSavedValues.number ||
//             selectedCountry.callingCode !== lastSavedValues.countryCode;
//     }, [whatsappNumber, selectedCountry, lastSavedValues]);

//     // Country Code Dropdown State
//     const [countryPopoverActive, setCountryPopoverActive] = useState(false);
//     const [countrySearchValue, setCountrySearchValue] = useState("");

//     const loading = nav.state === "submitting";

//     // Show banner animation and update last saved values
//     useEffect(() => {
//         if (actionData) {
//             setShowBanner(true);
//             setShowToast(true);

//             if (actionData.success) {
//                 setLastSavedValues({
//                     number: whatsappNumber,
//                     countryCode: selectedCountry.callingCode
//                 });
//             }

//             const timer = setTimeout(() => {
//                 setShowBanner(false);
//             }, 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [actionData, whatsappNumber, selectedCountry]);

//     // Toggle country dropdown
//     const toggleCountryPopover = useCallback(() => {
//         setCountryPopoverActive((active) => !active);
//         if (!countryPopoverActive) {
//             setCountrySearchValue("");
//         }
//     }, [countryPopoverActive]);

//     // Select country
//     const selectCountry = useCallback((country) => {
//         setSelectedCountry(country);
//         setCountryPopoverActive(false);
//         setCountrySearchValue("");
//         setValidationError("");
//         setWhatsappNumber("");
//     }, []);

//     // Filter countries based on search
//     const filteredCountries = useMemo(() => {
//         if (!countrySearchValue) return COUNTRY_OPTIONS;

//         const searchLower = countrySearchValue.toLowerCase();
//         return COUNTRY_OPTIONS.filter(
//             country =>
//                 country.name.toLowerCase().includes(searchLower) ||
//                 country.callingCode.includes(searchLower) ||
//                 country.code.toLowerCase().includes(searchLower)
//         );
//     }, [COUNTRY_OPTIONS, countrySearchValue]);

//     // Phone number validation using libphonenumber-js
//     const validateWhatsApp = useCallback(
//         (number) => {
//             if (!number || number.trim() === "") {
//                 return "Please enter a phone number.";
//             }

//             try {
//                 const fullNumber = `${selectedCountry.callingCode}${number}`;
//                 const phoneNumber = parsePhoneNumber(fullNumber, selectedCountry.code);

//                 if (!phoneNumber) {
//                     return `Invalid phone number for ${selectedCountry.name}.`;
//                 }

//                 if (!phoneNumber.isValid()) {
//                     return `Invalid phone number format for ${selectedCountry.name}.`;
//                 }

//                 const type = phoneNumber.getType();
//                 if (type && !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(type)) {
//                     return "Please enter a mobile phone number for WhatsApp.";
//                 }

//                 return "";
//             } catch (error) {
//                 return `Invalid phone number for ${selectedCountry.name}.`;
//             }
//         },
//         [selectedCountry]
//     );

//     // Handle form submission
//     const handleSubmit = useCallback(
//         (e) => {
//             const error = validateWhatsApp(whatsappNumber);

//             if (error) {
//                 e.preventDefault();
//                 setValidationError(error);
//                 return false;
//             }

//             setValidationError("");
//         },
//         [whatsappNumber, validateWhatsApp]
//     );

//     // Handle input change
//     const handleInputChange = useCallback(
//         (value) => {
//             const cleanValue = value.replace(/\D/g, "");
//             setWhatsappNumber(cleanValue);

//             if (validationError) {
//                 setValidationError("");
//             }
//         },
//         [validationError]
//     );

//     const toastMarkup = showToast ? (
//         <Toast
//             content={actionData?.message || "Action completed successfully"}
//             onDismiss={() => setShowToast(false)}
//             duration={4500}
//         />
//     ) : null;

//     // Custom Country Selector Activator with SVG Flag
//     const countryActivator = (
//         <button
//             type="button"
//             onClick={toggleCountryPopover}
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "10px 12px",
//                 border: "1px solid #C9CCCF",
//                 borderRadius: "8px",
//                 background: "white",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 minWidth: "140px",
//                 height: "36px",
//             }}
//         >
//             {selectedCountry.FlagComponent && (
//                 <selectedCountry.FlagComponent
//                     style={{ width: "24px", height: "16px", borderRadius: "2px" }}
//                 />
//             )}
//             <span style={{ fontWeight: "500", color: "#202223" }}>{selectedCountry.callingCode}</span>
//             <Icon source={ChevronDownIcon} />
//         </button>
//     );

//     // Country Dropdown Content with SVG Flags
//     const countryDropdownContent = (
//         <div style={{
//             width: "320px",
//             maxHeight: "450px",
//             background: "#2C2C2C",
//             borderRadius: "8px",
//             overflow: "hidden"
//         }}>
//             <div style={{
//                 padding: "12px",
//                 borderBottom: "1px solid #3F3F3F",
//                 background: "#2C2C2C"
//             }}>
//                 <div style={{
//                     position: "relative",
//                     display: "flex",
//                     alignItems: "center"
//                 }}>
//                     <div style={{
//                         position: "absolute",
//                         left: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         color: "#8B8B8B"
//                     }}>
//                         <Icon source={SearchIcon} />
//                     </div>
//                     <input
//                         type="text"
//                         value={countrySearchValue}
//                         onChange={(e) => setCountrySearchValue(e.target.value)}
//                         placeholder="Search"
//                         style={{
//                             width: "100%",
//                             padding: "8px 8px 8px 36px",
//                             border: "1px solid rgb(64 255 13)",
//                             borderRadius: "6px",
//                             background: "#1A1A1A",
//                             color: "#E3E3E3",
//                             fontSize: "14px",
//                             outline: "none"
//                         }}
//                     />
//                 </div>
//             </div>
//             <Scrollable style={{ maxHeight: "380px", background: "#2C2C2C" }}>
//                 <div>
//                     {filteredCountries.length > 0 ? (
//                         filteredCountries.map((country) => {
//                             const isSelected = selectedCountry.code === country.code;
//                             const FlagComponent = country.FlagComponent;

//                             return (
//                                 <button
//                                     key={country.code}
//                                     type="button"
//                                     onClick={() => selectCountry(country)}
//                                     style={{
//                                         width: "100%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "12px",
//                                         padding: "10px 16px",
//                                         border: "none",
//                                         background: isSelected ? "#3F3F3F" : "#2C2C2C",
//                                         cursor: "pointer",
//                                         fontSize: "14px",
//                                         textAlign: "left",
//                                         transition: "background 0.2s",
//                                         position: "relative",
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         if (!isSelected) {
//                                             e.currentTarget.style.background = "#3A3A3A";
//                                         }
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         if (!isSelected) {
//                                             e.currentTarget.style.background = "#2C2C2C";
//                                         }
//                                     }}
//                                 >
//                                     {FlagComponent ? (
//                                         <FlagComponent
//                                             style={{
//                                                 width: "28px",
//                                                 height: "20px",
//                                                 borderRadius: "3px",
//                                                 flexShrink: 0
//                                             }}
//                                         />
//                                     ) : (
//                                         <div style={{
//                                             width: "28px",
//                                             height: "20px",
//                                             background: "#3F3F3F",
//                                             borderRadius: "3px",
//                                             flexShrink: 0
//                                         }} />
//                                     )}
//                                     <div style={{ flex: 1 }}>
//                                         <div style={{
//                                             fontWeight: "400",
//                                             color: "#E3E3E3",
//                                             fontSize: "14px"
//                                         }}>
//                                             {country.name}
//                                         </div>
//                                     </div>
//                                     <span style={{
//                                         color: "#8B8B8B",
//                                         fontSize: "13px",
//                                         fontWeight: "400",
//                                         marginRight: isSelected ? "8px" : "0"
//                                     }}>
//                                         {country.callingCode}
//                                     </span>
//                                     {isSelected && (
//                                         <span style={{ color: "#22C55E", fontSize: "18px" }}>✓</span>
//                                     )}
//                                 </button>
//                             );
//                         })
//                     ) : (
//                         <div style={{
//                             padding: "32px 20px",
//                             textAlign: "center",
//                             color: "#8B8B8B",
//                             fontSize: "14px"
//                         }}>
//                             No countries found
//                         </div>
//                     )}
//                 </div>
//             </Scrollable>
//         </div>
//     );

//     return (
//         <Frame>
//             <Page title="Merchant Settings" subtitle="Manage your account configuration and activity">
//                 <BlockStack gap="500">
//                     {showBanner && actionData?.success === true && (
//                         <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}>
//                             <Text as="p">{actionData.message}</Text>
//                         </Banner>
//                     )}

//                     {showBanner && actionData?.success === false && (
//                         <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}>
//                             <Text as="p">{actionData.message}</Text>
//                         </Banner>
//                     )}

//                     <Layout>
//                         <Layout.Section>
//                             <Card>
//                                 <BlockStack gap="500">
//                                     <BlockStack gap="200">
//                                         <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                                             <BlockStack gap="200">
//                                                 <InlineStack gap="200" blockAlign="center">
//                                                     <Icon source={PhoneIcon} tone="base" />
//                                                     <Text variant="headingLg" as="h2">
//                                                         WhatsApp Configuration
//                                                     </Text>
//                                                 </InlineStack>
//                                                 <Text variant="bodyMd" tone="subdued">
//                                                     Configure your WhatsApp number for notifications
//                                                 </Text>
//                                             </BlockStack>
//                                             {merchant?.whatsappNumber && (
//                                                 <Badge tone="success" progress="complete">
//                                                     Configured
//                                                 </Badge>
//                                             )}
//                                         </InlineStack>
//                                     </BlockStack>

//                                     <Divider />

//                                     {loading && (
//                                         <Box paddingBlockEnd="400">
//                                             <ProgressBar progress={75} size="small" tone="primary" />
//                                         </Box>
//                                     )}

//                                     <Form method="post" onSubmit={handleSubmit}>
//                                         <input type="hidden" name="mongoId" value={mongoId} />
//                                         <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />

//                                         <FormLayout>
//                                             <div>
//                                                 <Text as="p" variant="bodyMd" fontWeight="medium">
//                                                     Phone Number
//                                                 </Text>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <InlineStack gap="200" blockAlign="start">
//                                                         <Popover
//                                                             active={countryPopoverActive}
//                                                             activator={countryActivator}
//                                                             onClose={toggleCountryPopover}
//                                                             preferredAlignment="left"
//                                                         >
//                                                             {countryDropdownContent}
//                                                         </Popover>

//                                                         <div style={{ flex: 1 }}>
//                                                             <TextField
//                                                                 type="tel"
//                                                                 name="whatsappNumber"
//                                                                 value={whatsappNumber}
//                                                                 onChange={handleInputChange}
//                                                                 placeholder="Phone Number"
//                                                                 error={validationError}
//                                                                 autoComplete="tel"
//                                                                 labelHidden
//                                                                 label="Phone Number"
//                                                             />
//                                                         </div>
//                                                     </InlineStack>
//                                                 </div>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <Text as="p" variant="bodySm" tone="subdued">
//                                                         Enter mobile number without country code
//                                                     </Text>
//                                                 </div>
//                                             </div>

//                                             <InlineStack align="space-between" blockAlign="center">
//                                                 <Text variant="bodySm" tone="subdued">
//                                                     {!hasUnsavedChanges && whatsappNumber
//                                                         ? "No changes to save"
//                                                         : "Make sure to save your changes"}
//                                                 </Text>
//                                                 <Button
//                                                     submit
//                                                     variant="primary"
//                                                     loading={loading}
//                                                     icon={CheckIcon}
//                                                     size="large"
//                                                     disabled={!whatsappNumber || !hasUnsavedChanges}
//                                                 >
//                                                     {loading ? "Saving..." : "Save Number"}
//                                                 </Button>
//                                             </InlineStack>
//                                         </FormLayout>
//                                     </Form>
//                                 </BlockStack>
//                             </Card>
//                         </Layout.Section>
//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//             </Page>
//         </Frame>
//     );
// }







// import { useLoaderData, Form, useActionData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { useState, useCallback, useEffect, useMemo } from "react";
// import {
//     Page,
//     Layout,
//     Card,
//     FormLayout,
//     TextField,
//     Button,
//     Badge,
//     Text,
//     BlockStack,
//     InlineStack,
//     Banner,
//     Icon,
//     Divider,
//     Box,
//     ProgressBar,
//     Toast,
//     Frame,
//     Popover,
//     Scrollable,
//     Checkbox,
// } from "@shopify/polaris";
// import { CheckIcon, PhoneIcon, ChevronDownIcon, SearchIcon } from "@shopify/polaris-icons";
// import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';
// import * as flags from 'country-flag-icons/react/3x2';

// // Get country name in English using Intl API
// const getCountryName = (countryCode) => {
//     try {
//         const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//         return regionNames.of(countryCode) || countryCode;
//     } catch (error) {
//         return countryCode;
//     }
// };

// // Get flag component for country
// const getFlagComponent = (countryCode) => {
//     const FlagComponent = flags[countryCode];
//     return FlagComponent || null;
// };

// // Generate country options dynamically from libphonenumber-js
// const generateCountryOptions = () => {
//     const countries = getCountries();
//     return countries
//         .map(countryCode => {
//             try {
//                 const callingCode = getCountryCallingCode(countryCode);
//                 const name = getCountryName(countryCode);
//                 const FlagComponent = getFlagComponent(countryCode);
//                 return {
//                     label: name,
//                     value: countryCode,
//                     code: countryCode,
//                     callingCode: `+${callingCode}`,
//                     name,
//                     FlagComponent
//                 };
//             } catch (error) {
//                 console.error(`Error processing country ${countryCode}:`, error);
//                 return null;
//             }
//         })
//         .filter(Boolean)
//         .sort((a, b) => a.name.localeCompare(b.name));
// };

// export const loader = async ({ request }) => {
//     const { admin } = await authenticate.admin(request);
//     const shopResponse = await admin.graphql(
//         `query { shop { id name } }`
//     );
//     const shopJson = await shopResponse.json();
//     const shop = shopJson.data.shop;
//     const merchantId = shop.id.split("/").pop();

//     const getMerchant = await fetch(`http://localhost:5000/api/users/${merchantId}`);
//     const merchantJson = await getMerchant.json();

//     return {
//         merchant: merchantJson.data,
//         merchantId,
//         mongoId: merchantJson.data?._id,
//         mailsent: merchantJson.data?.mailsent || false,
//     };
// };

// export const action = async ({ request }) => {
//     const body = await request.formData();
//     const whatsappNumber = body.get("whatsappNumber");
//     const countryCode = body.get("countryCode");
//     const mongoId = body.get("mongoId");

//     try {
//         const update = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 whatsappNumber,
//                 currencyCode: countryCode,
//             }),
//         });
//         const result = await update.json();
//         return {
//             success: true,
//             message: "WhatsApp number updated successfully!",
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: "Update failed. Try again.",
//         };
//     }
// };

// export default function Index() {
//     const loaderData = useLoaderData();
//     if (!loaderData) return null;

//     const { merchant, mongoId, mailsent: initialmailsent } = loaderData;
//     const actionData = useActionData();
//     const nav = useNavigation();

//     const COUNTRY_OPTIONS = useMemo(() => generateCountryOptions(), []);

//     const [selectedCountry, setSelectedCountry] = useState(() => {
//         const savedCountry = merchant?.currencyCode;
//         return COUNTRY_OPTIONS.find(c => c.callingCode === savedCountry) || COUNTRY_OPTIONS.find(c => c.code === "IN");
//     });

//     const [whatsappNumber, setWhatsappNumber] = useState(merchant?.whatsappNumber || "");
//     const [validationError, setValidationError] = useState("");
//     const [showBanner, setShowBanner] = useState(false);
//     const [showToast, setShowToast] = useState(false);
//     const [lastSavedValues, setLastSavedValues] = useState({
//         number: merchant?.whatsappNumber || "",
//         countryCode: merchant?.currencyCode || ""
//     });

//     const [mailsent, setmailsent] = useState(initialmailsent);
//     const [mailLoading, setMailLoading] = useState(false);

//     const hasUnsavedChanges = useMemo(() => {
//         return whatsappNumber !== lastSavedValues.number ||
//             selectedCountry.callingCode !== lastSavedValues.countryCode;
//     }, [whatsappNumber, selectedCountry, lastSavedValues]);

//     const [countryPopoverActive, setCountryPopoverActive] = useState(false);
//     const [countrySearchValue, setCountrySearchValue] = useState("");

//     const loading = nav.state === "submitting";

//     useEffect(() => {
//         if (actionData) {
//             setShowBanner(true);
//             setShowToast(true);
//             if (actionData.success) {
//                 setLastSavedValues({
//                     number: whatsappNumber,
//                     countryCode: selectedCountry.callingCode
//                 });
//             }
//             const timer = setTimeout(() => setShowBanner(false), 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [actionData, whatsappNumber, selectedCountry]);

//     const toggleCountryPopover = useCallback(() => {
//         setCountryPopoverActive(active => !active);
//         if (!countryPopoverActive) setCountrySearchValue("");
//     }, [countryPopoverActive]);

//     const selectCountry = useCallback((country) => {
//         setSelectedCountry(country);
//         setCountryPopoverActive(false);
//         setCountrySearchValue("");
//         setValidationError("");
//         setWhatsappNumber("");
//     }, []);

//     const filteredCountries = useMemo(() => {
//         if (!countrySearchValue) return COUNTRY_OPTIONS;
//         const searchLower = countrySearchValue.toLowerCase();
//         return COUNTRY_OPTIONS.filter(
//             country => country.name.toLowerCase().includes(searchLower) ||
//                        country.callingCode.includes(searchLower) ||
//                        country.code.toLowerCase().includes(searchLower)
//         );
//     }, [COUNTRY_OPTIONS, countrySearchValue]);

//     const validateWhatsApp = useCallback((number) => {
//         if (!number || number.trim() === "") return "Please enter a phone number.";
//         try {
//             const fullNumber = `${selectedCountry.callingCode}${number}`;
//             const phoneNumber = parsePhoneNumber(fullNumber, selectedCountry.code);
//             if (!phoneNumber || !phoneNumber.isValid()) {
//                 return `Invalid phone number for ${selectedCountry.name}.`;
//             }
//             const type = phoneNumber.getType();
//             if (type && !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(type)) {
//                 return "Please enter a mobile phone number for WhatsApp.";
//             }
//             return "";
//         } catch (error) {
//             return `Invalid phone number for ${selectedCountry.name}.`;
//         }
//     }, [selectedCountry]);

//     const handleSubmit = useCallback((e) => {
//         const error = validateWhatsApp(whatsappNumber);
//         if (error) {
//             e.preventDefault();
//             setValidationError(error);
//             return false;
//         }
//         setValidationError("");
//     }, [whatsappNumber, validateWhatsApp]);

//     const handleInputChange = useCallback((value) => {
//         setWhatsappNumber(value.replace(/\D/g, ""));
//         if (validationError) setValidationError("");
//     }, [validationError]);

//     const handleMailToggle = useCallback(async () => {
//         setMailLoading(true);
//         try {
//             const res = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mailsent: !mailsent }),
//             });
//             const result = await res.json();
//             if (result.success) setmailsent(prev => !prev);
//         } catch (error) {
//             console.error("Mail update error:", error);
//         } finally {
//             setMailLoading(false);
//         }
//     }, [mailsent, mongoId]);

//     const toastMarkup = showToast ? (
//         <Toast
//             content={actionData?.message || "Action completed successfully"}
//             onDismiss={() => setShowToast(false)}
//             duration={4500}
//         />
//     ) : null;

//     const countryActivator = (
//         <button
//             type="button"
//             onClick={toggleCountryPopover}
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "10px 12px",
//                 border: "1px solid #C9CCCF",
//                 borderRadius: "8px",
//                 background: "white",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 minWidth: "140px",
//                 height: "36px",
//             }}
//         >
//             {selectedCountry.FlagComponent && (
//                 <selectedCountry.FlagComponent
//                     style={{ width: "24px", height: "16px", borderRadius: "2px" }}
//                 />
//             )}
//             <span style={{ fontWeight: "500", color: "#202223" }}>{selectedCountry.callingCode}</span>
//             <Icon source={ChevronDownIcon} />
//         </button>
//     );

//     const countryDropdownContent = (
//         <div style={{ width: "320px", maxHeight: "450px", background: "#2C2C2C", borderRadius: "8px", overflow: "hidden" }}>
//             <div style={{ padding: "12px", borderBottom: "1px solid #3F3F3F", background: "#2C2C2C" }}>
//                 <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
//                     <div style={{ position: "absolute", left: "8px", display: "flex", alignItems: "center", color: "#8B8B8B" }}>
//                         <Icon source={SearchIcon} />
//                     </div>
//                     <input
//                         type="text"
//                         value={countrySearchValue}
//                         onChange={(e) => setCountrySearchValue(e.target.value)}
//                         placeholder="Search"
//                         style={{
//                             width: "100%",
//                             padding: "8px 8px 8px 36px",
//                             border: "1px solid rgb(64 255 13)",
//                             borderRadius: "6px",
//                             background: "#1A1A1A",
//                             color: "#E3E3E3",
//                             fontSize: "14px",
//                             outline: "none"
//                         }}
//                     />
//                 </div>
//             </div>
//             <Scrollable style={{ maxHeight: "380px", background: "#2C2C2C" }}>
//                 {filteredCountries.length > 0 ? filteredCountries.map((country) => {
//                     const isSelected = selectedCountry.code === country.code;
//                     const FlagComponent = country.FlagComponent;
//                     return (
//                         <button
//                             key={country.code}
//                             type="button"
//                             onClick={() => selectCountry(country)}
//                             style={{
//                                 width: "100%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "12px",
//                                 padding: "10px 16px",
//                                 border: "none",
//                                 background: isSelected ? "#3F3F3F" : "#2C2C2C",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                                 textAlign: "left",
//                                 transition: "background 0.2s",
//                                 position: "relative",
//                             }}
//                             onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#3A3A3A"; }}
//                             onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "#2C2C2C"; }}
//                         >
//                             {FlagComponent ? <FlagComponent style={{ width: "28px", height: "20px", borderRadius: "3px", flexShrink: 0 }} /> : <div style={{ width: "28px", height: "20px", background: "#3F3F3F", borderRadius: "3px", flexShrink: 0 }} />}
//                             <div style={{ flex: 1 }}>
//                                 <div style={{ fontWeight: "400", color: "#E3E3E3", fontSize: "14px" }}>{country.name}</div>
//                             </div>
//                             <span style={{ color: "#8B8B8B", fontSize: "13px", fontWeight: "400", marginRight: isSelected ? "8px" : "0" }}>{country.callingCode}</span>
//                             {isSelected && <span style={{ color: "#22C55E", fontSize: "18px" }}>✓</span>}
//                         </button>
//                     );
//                 }) : (
//                     <div style={{ padding: "32px 20px", textAlign: "center", color: "#8B8B8B", fontSize: "14px" }}>No countries found</div>
//                 )}
//             </Scrollable>
//         </div>
//     );

//     return (
//         <Frame>
//             <Page title="Merchant Settings" subtitle="Manage your account configuration and activity">
//                 <BlockStack gap="500">
//                     {showBanner && actionData?.success === true && <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}><Text as="p">{actionData.message}</Text></Banner>}
//                     {showBanner && actionData?.success === false && <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}><Text as="p">{actionData.message}</Text></Banner>}

//                     <Layout>
//                         <Layout.Section>
//                             <Card>
//                                 <BlockStack gap="500">
//                                     <BlockStack gap="200">
//                                         <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                                             <BlockStack gap="200">
//                                                 <InlineStack gap="200" blockAlign="center">
//                                                     <Icon source={PhoneIcon} tone="base" />
//                                                     <Text variant="headingLg" as="h2">WhatsApp Configuration</Text>
//                                                 </InlineStack>
//                                                 <Text variant="bodyMd" tone="subdued">Configure your WhatsApp number for notifications</Text>
//                                             </BlockStack>
//                                             {merchant?.whatsappNumber && <Badge tone="success" progress="complete">Configured</Badge>}
//                                         </InlineStack>
//                                     </BlockStack>

//                                     <Divider />
//                                     {loading && <Box paddingBlockEnd="400"><ProgressBar progress={75} size="small" tone="primary" /></Box>}

//                                     <Form method="post" onSubmit={handleSubmit}>
//                                         <input type="hidden" name="mongoId" value={mongoId} />
//                                         <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />

//                                         <FormLayout>
//                                             <div>
//                                                 <Text as="p" variant="bodyMd" fontWeight="medium">Phone Number</Text>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <InlineStack gap="200" blockAlign="start">
//                                                         <Popover active={countryPopoverActive} activator={countryActivator} onClose={toggleCountryPopover} preferredAlignment="left">
//                                                             {countryDropdownContent}
//                                                         </Popover>

//                                                         <div style={{ flex: 1 }}>
//                                                             <TextField
//                                                                 type="tel"
//                                                                 name="whatsappNumber"
//                                                                 value={whatsappNumber}
//                                                                 onChange={handleInputChange}
//                                                                 placeholder="Phone Number"
//                                                                 error={validationError}
//                                                                 autoComplete="tel"
//                                                                 labelHidden
//                                                                 label="Phone Number"
//                                                             />
//                                                         </div>
//                                                     </InlineStack>
//                                                 </div>
//                                                 <div style={{ marginTop: "8px" }}>
//                                                     <Text as="p" variant="bodySm" tone="subdued">Enter mobile number without country code</Text>
//                                                 </div>
//                                             </div>

//                                             {/* Email Sent Checkbox */}
//                                             <div style={{ marginTop: "16px" }}>
//                                                 <InlineStack align="center" gap="200">
//                                                     <Checkbox label="Email Sent" checked={mailsent} onChange={handleMailToggle} disabled={mailLoading} />
//                                                     {mailLoading && <Text variant="bodySm" tone="subdued">Updating...</Text>}
//                                                 </InlineStack>


//                                             </div>

//                                             <InlineStack align="space-between" blockAlign="center">
//                                                 <Text variant="bodySm" tone="subdued">
//                                                     {!hasUnsavedChanges && whatsappNumber ? "No changes to save" : "Make sure to save your changes"}
//                                                 </Text>
//                                                 <Button submit variant="primary" loading={loading} icon={CheckIcon} size="large" disabled={!whatsappNumber || !hasUnsavedChanges}>
//                                                     {loading ? "Saving..." : "Save Number"}
//                                                 </Button>
//                                             </InlineStack>
//                                         </FormLayout>
//                                     </Form>
//                                 </BlockStack>
//                             </Card>
//                         </Layout.Section>
//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//             </Page>
//         </Frame>
//     );
// }






import { useLoaderData, Form, useActionData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
    Page,
    Layout,
    Card,
    FormLayout,
    TextField,
    Button,
    Badge,
    Text,
    BlockStack,
    InlineStack,
    Banner,
    Icon,
    Divider,
    Box,
    ProgressBar,
    Toast,
    Frame,
    Popover,
    Scrollable,
    Checkbox,
} from "@shopify/polaris";
import { CheckIcon, PhoneIcon, ChevronDownIcon, SearchIcon } from "@shopify/polaris-icons";
import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import * as flags from 'country-flag-icons/react/3x2';

// Get country name in English using Intl API
const getCountryName = (countryCode) => {
    try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(countryCode) || countryCode;
    } catch (error) {
        return countryCode;
    }
};

// Get flag component for country
const getFlagComponent = (countryCode) => {
    const FlagComponent = flags[countryCode];
    return FlagComponent || null;
};

// Generate country options dynamically from libphonenumber-js
const generateCountryOptions = () => {
    const countries = getCountries();
    return countries
        .map(countryCode => {
            try {
                const callingCode = getCountryCallingCode(countryCode);
                const name = getCountryName(countryCode);
                const FlagComponent = getFlagComponent(countryCode);
                return {
                    label: name,
                    value: countryCode,
                    code: countryCode,
                    callingCode: `+${callingCode}`,
                    name,
                    FlagComponent
                };
            } catch (error) {
                console.error(`Error processing country ${countryCode}:`, error);
                return null;
            }
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));
};

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const shopResponse = await admin.graphql(
        `query { shop { id name } }`
    );
    const shopJson = await shopResponse.json();
    const shop = shopJson.data.shop;
    const merchantId = shop.id.split("/").pop();

    const getMerchant = await fetch(`http://localhost:5000/api/users/${merchantId}`);
    const merchantJson = await getMerchant.json();

    return {
        merchant: merchantJson.data,
        merchantId,
        mongoId: merchantJson.data?._id,
        mailsent: merchantJson.data?.mailsent || false,
    };
};

export const action = async ({ request }) => {
    const body = await request.formData();
    const whatsappNumber = body.get("whatsappNumber");
    const countryCode = body.get("countryCode");
    const mongoId = body.get("mongoId");

    try {
        const update = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                whatsappNumber,
                currencyCode: countryCode,
            }),
        });
        const result = await update.json();
        return {
            success: true,
            message: "WhatsApp number updated successfully!",
        };
    } catch (err) {
        return {
            success: false,
            message: "Update failed. Try again.",
        };
    }
};

export default function Index() {
    const loaderData = useLoaderData();
    if (!loaderData) return null;

    const { merchant, mongoId, mailsent: initialmailsent } = loaderData;
    const actionData = useActionData();
    const nav = useNavigation();

    const COUNTRY_OPTIONS = useMemo(() => generateCountryOptions(), []);

    const [selectedCountry, setSelectedCountry] = useState(() => {
        const savedCountry = merchant?.currencyCode;
        return COUNTRY_OPTIONS.find(c => c.callingCode === savedCountry) || COUNTRY_OPTIONS.find(c => c.code === "IN");
    });

    const [whatsappNumber, setWhatsappNumber] = useState(merchant?.whatsappNumber || "");
    const [validationError, setValidationError] = useState("");
    const [showBanner, setShowBanner] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [lastSavedValues, setLastSavedValues] = useState({
        number: merchant?.whatsappNumber || "",
        countryCode: merchant?.currencyCode || ""
    });

    const [mailsent, setmailsent] = useState(initialmailsent);
    const [mailLoading, setMailLoading] = useState(false);
    const [mailToastMessage, setMailToastMessage] = useState("");
    const [showMailToast, setShowMailToast] = useState(false);

    const hasUnsavedChanges = useMemo(() => {
        return whatsappNumber !== lastSavedValues.number ||
            selectedCountry.callingCode !== lastSavedValues.countryCode;
    }, [whatsappNumber, selectedCountry, lastSavedValues]);

    const [countryPopoverActive, setCountryPopoverActive] = useState(false);
    const [countrySearchValue, setCountrySearchValue] = useState("");

    const loading = nav.state === "submitting";

    useEffect(() => {
        if (actionData) {
            setShowBanner(true);
            setShowToast(true);
            if (actionData.success) {
                setLastSavedValues({
                    number: whatsappNumber,
                    countryCode: selectedCountry.callingCode
                });
            }
            const timer = setTimeout(() => setShowBanner(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [actionData, whatsappNumber, selectedCountry]);

    const toggleCountryPopover = useCallback(() => {
        setCountryPopoverActive(active => !active);
        if (!countryPopoverActive) setCountrySearchValue("");
    }, [countryPopoverActive]);

    const selectCountry = useCallback((country) => {
        setSelectedCountry(country);
        setCountryPopoverActive(false);
        setCountrySearchValue("");
        setValidationError("");
        setWhatsappNumber("");
    }, []);

    const filteredCountries = useMemo(() => {
        if (!countrySearchValue) return COUNTRY_OPTIONS;
        const searchLower = countrySearchValue.toLowerCase();
        return COUNTRY_OPTIONS.filter(
            country => country.name.toLowerCase().includes(searchLower) ||
                country.callingCode.includes(searchLower) ||
                country.code.toLowerCase().includes(searchLower)
        );
    }, [COUNTRY_OPTIONS, countrySearchValue]);

    const validateWhatsApp = useCallback((number) => {
        if (!number || number.trim() === "") return "Please enter a phone number.";
        try {
            const fullNumber = `${selectedCountry.callingCode}${number}`;
            const phoneNumber = parsePhoneNumber(fullNumber, selectedCountry.code);
            if (!phoneNumber || !phoneNumber.isValid()) {
                return `Invalid phone number for ${selectedCountry.name}.`;
            }
            const type = phoneNumber.getType();
            if (type && !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(type)) {
                return "Please enter a mobile phone number for WhatsApp.";
            }
            return "";
        } catch (error) {
            return `Invalid phone number for ${selectedCountry.name}.`;
        }
    }, [selectedCountry]);

    const handleSubmit = useCallback((e) => {
        const error = validateWhatsApp(whatsappNumber);
        if (error) {
            e.preventDefault();
            setValidationError(error);
            return false;
        }
        setValidationError("");
    }, [whatsappNumber, validateWhatsApp]);

    const handleInputChange = useCallback((value) => {
        setWhatsappNumber(value.replace(/\D/g, ""));
        if (validationError) setValidationError("");
    }, [validationError]);

    const handleMailToggle = useCallback(async () => {
        setMailLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/updateMerchant/${mongoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mailsent: !mailsent }),
            });
            const result = await res.json();
            if (result.success) {
                const newValue = !mailsent;
                setmailsent(newValue);
                setMailToastMessage(newValue ? "Email sent updated successfully!" : "Email not sent updated successfully!");
                setShowMailToast(true);
            }
        } catch (error) {
            console.error("Mail update error:", error);
        } finally {
            setMailLoading(false);
        }
    }, [mailsent, mongoId]);

    const toastMarkup = showToast ? (
        <Toast
            content={actionData?.message || "Action completed successfully"}
            onDismiss={() => setShowToast(false)}
            duration={4500}
        />
    ) : null;

    const mailToastMarkup = showMailToast ? (
        <Toast
            content={mailToastMessage}
            onDismiss={() => setShowMailToast(false)}
            duration={4500}
        />
    ) : null;

    const countryActivator = (
        <button
            type="button"
            onClick={toggleCountryPopover}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 12px",
                border: "1px solid #C9CCCF",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
                fontSize: "14px",
                minWidth: "140px",
                height: "36px",
            }}
        >
            {selectedCountry.FlagComponent && (
                <selectedCountry.FlagComponent
                    style={{ width: "24px", height: "16px", borderRadius: "2px" }}
                />
            )}
            <span style={{ fontWeight: "500", color: "#202223" }}>{selectedCountry.callingCode}</span>
            <Icon source={ChevronDownIcon} />
        </button>
    );

    const countryDropdownContent = (
        <div style={{ width: "320px", maxHeight: "450px", background: "#2C2C2C", borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ padding: "12px", borderBottom: "1px solid #3F3F3F", background: "#2C2C2C" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <div style={{ position: "absolute", left: "8px", display: "flex", alignItems: "center", color: "#8B8B8B" }}>
                        <Icon source={SearchIcon} />
                    </div>
                    <input
                        type="text"
                        value={countrySearchValue}
                        onChange={(e) => setCountrySearchValue(e.target.value)}
                        placeholder="Search"
                        style={{
                            width: "100%",
                            padding: "8px 8px 8px 36px",
                            border: "1px solid rgb(64 255 13)",
                            borderRadius: "6px",
                            background: "#1A1A1A",
                            color: "#E3E3E3",
                            fontSize: "14px",
                            outline: "none"
                        }}
                    />
                </div>
            </div>
            <Scrollable style={{ maxHeight: "380px", background: "#2C2C2C" }}>
                {filteredCountries.length > 0 ? filteredCountries.map((country) => {
                    const isSelected = selectedCountry.code === country.code;
                    const FlagComponent = country.FlagComponent;
                    return (
                        <button
                            key={country.code}
                            type="button"
                            onClick={() => selectCountry(country)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 16px",
                                border: "none",
                                background: isSelected ? "#3F3F3F" : "#2C2C2C",
                                cursor: "pointer",
                                fontSize: "14px",
                                textAlign: "left",
                                transition: "background 0.2s",
                                position: "relative",
                            }}
                            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#3A3A3A"; }}
                            onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "#2C2C2C"; }}
                        >
                            {FlagComponent ? <FlagComponent style={{ width: "28px", height: "20px", borderRadius: "3px", flexShrink: 0 }} /> : <div style={{ width: "28px", height: "20px", background: "#3F3F3F", borderRadius: "3px", flexShrink: 0 }} />}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: "400", color: "#E3E3E3", fontSize: "14px" }}>{country.name}</div>
                            </div>
                            <span style={{ color: "#8B8B8B", fontSize: "13px", fontWeight: "400", marginRight: isSelected ? "8px" : "0" }}>{country.callingCode}</span>
                            {isSelected && <span style={{ color: "#22C55E", fontSize: "18px" }}>✓</span>}
                        </button>
                    );
                }) : (
                    <div style={{ padding: "32px 20px", textAlign: "center", color: "#8B8B8B", fontSize: "14px" }}>No countries found</div>
                )}
            </Scrollable>
        </div>
    );

    return (
        <Frame>
            <Page title="Merchant Settings" subtitle="Manage your account configuration and activity">
                <BlockStack gap="500">
                    {showBanner && actionData?.success === true && <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}><Text as="p">{actionData.message}</Text></Banner>}
                    {showBanner && actionData?.success === false && <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}><Text as="p">{actionData.message}</Text></Banner>}

                    <Layout>
                        <Layout.Section>
                            <Card>
                                <BlockStack gap="500">
                                    <BlockStack gap="200">
                                        <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                            <BlockStack gap="200">
                                                <InlineStack gap="200" blockAlign="center">
                                                    <Icon source={PhoneIcon} tone="base" />
                                                    <Text variant="headingLg" as="h2">WhatsApp Configuration</Text>
                                                </InlineStack>
                                                <Text variant="bodyMd" tone="subdued">Configure your WhatsApp number for notifications</Text>
                                            </BlockStack>
                                            {merchant?.whatsappNumber && <Badge tone="success" progress="complete">Configured</Badge>}
                                        </InlineStack>
                                    </BlockStack>

                                    <Divider />
                                    {loading && <Box paddingBlockEnd="400"><ProgressBar progress={75} size="small" tone="primary" /></Box>}

                                    <Form method="post" onSubmit={handleSubmit}>
                                        <input type="hidden" name="mongoId" value={mongoId} />
                                        <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />

                                        <FormLayout>
                                            <div>
                                                <Text as="p" variant="bodyMd" fontWeight="medium">Phone Number</Text>
                                                <div style={{ marginTop: "8px" }}>
                                                    <InlineStack gap="200" blockAlign="start">
                                                        <Popover active={countryPopoverActive} activator={countryActivator} onClose={toggleCountryPopover} preferredAlignment="left">
                                                            {countryDropdownContent}
                                                        </Popover>

                                                        <div style={{ flex: 1 }}>
                                                            <TextField
                                                                type="tel"
                                                                name="whatsappNumber"
                                                                value={whatsappNumber}
                                                                onChange={handleInputChange}
                                                                placeholder="Phone Number"
                                                                error={validationError}
                                                                autoComplete="tel"
                                                                labelHidden
                                                                label="Phone Number"
                                                            />
                                                        </div>
                                                    </InlineStack>
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <Text as="p" variant="bodySm" tone="subdued">Enter mobile number without country code</Text>
                                                </div>
                                            </div>

                                            {/* Email Sent Checkbox */}
                                            {/* <div style={{ marginTop: "16px" }}>
                                                <InlineStack align="center" gap="200">
                                                    <Checkbox label="Email Sent" checked={mailsent} onChange={handleMailToggle} disabled={mailLoading} />
                                                    {mailLoading && <Text variant="bodySm" tone="subdued">Updating...</Text>}
                                                </InlineStack>
                                            </div> */}

                                            <InlineStack align="space-between" blockAlign="center">
                                                <Text variant="bodySm" tone="subdued">
                                                    {!hasUnsavedChanges && whatsappNumber ? "No changes to save" : "Make sure to save your changes"}
                                                </Text>
                                                <Button submit variant="primary" loading={loading} icon={CheckIcon} size="large" disabled={!whatsappNumber || !hasUnsavedChanges}>
                                                    {loading ? "Saving..." : "Save Number"}
                                                </Button>
                                            </InlineStack>
                                        </FormLayout>
                                    </Form>
                                </BlockStack>


                            </Card>


                            <div style={{ marginTop: "16px" }}>
                                <Card style={{ marginTop: "16px" }}>
                                    <BlockStack gap="500">
                                        {/* Email Sent Checkbox */}
                                        <div  >
                                            <InlineStack gap="200">
                                                <Checkbox label="Mark Email as sent to Merchant" checked={mailsent} onChange={handleMailToggle} disabled={mailLoading} />
                                                {mailLoading && <Text variant="bodySm" tone="subdued">Updating...</Text>}
                                            </InlineStack>
                                        </div>
                                    </BlockStack>

                                </Card>
                            </div>
                        </Layout.Section>


                    </Layout>
                </BlockStack>
                {toastMarkup}
                {mailToastMarkup}
            </Page>
        </Frame>
    );
}
