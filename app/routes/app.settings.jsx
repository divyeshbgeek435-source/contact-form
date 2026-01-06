
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

//     const getMerchant = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
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
//         const update = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
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
//     const [mailToastMessage, setMailToastMessage] = useState("");
//     const [showMailToast, setShowMailToast] = useState(false);

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
//                 country.callingCode.includes(searchLower) ||
//                 country.code.toLowerCase().includes(searchLower)
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
//             const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mailsent: !mailsent }),
//             });
//             const result = await res.json();
//             if (result.success) {
//                 const newValue = !mailsent;
//                 setmailsent(newValue);
//                 setMailToastMessage(newValue ? "Email sent updated successfully!" : "Email not sent updated successfully!");
//                 setShowMailToast(true);
//             }
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

//     const mailToastMarkup = showMailToast ? (
//         <Toast
//             content={mailToastMessage}
//             onDismiss={() => setShowMailToast(false)}
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
//                                             {/* <div style={{ marginTop: "16px" }}>
//                                                 <InlineStack align="center" gap="200">
//                                                     <Checkbox label="Email Sent" checked={mailsent} onChange={handleMailToggle} disabled={mailLoading} />
//                                                     {mailLoading && <Text variant="bodySm" tone="subdued">Updating...</Text>}
//                                                 </InlineStack>
//                                             </div> */}

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


//                             <div style={{ marginTop: "16px" }}>
//                                 <Card style={{ marginTop: "16px" }}>
//                                     <BlockStack gap="500">
//                                         {/* Email Sent Checkbox */}
//                                         <div  >
//                                             <InlineStack gap="200">
//                                                 <Checkbox label="Mark Email as sent to Merchant" checked={mailsent} onChange={handleMailToggle} disabled={mailLoading} />
//                                                 {mailLoading && <Text variant="bodySm" tone="subdued">Updating...</Text>}
//                                             </InlineStack>
//                                         </div>
//                                     </BlockStack>

//                                 </Card>
//                             </div>
//                         </Layout.Section>


//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//                 {mailToastMarkup}
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
//     Spinner,
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

//     const getMerchant = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
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
//         const update = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
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
//     const [mailToastMessage, setMailToastMessage] = useState("");
//     const [showMailToast, setShowMailToast] = useState(false);

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
//                 country.callingCode.includes(searchLower) ||
//                 country.code.toLowerCase().includes(searchLower)
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
//             const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mailsent: !mailsent }),
//             });
//             const result = await res.json();
//             if (result.success) {
//                 const newValue = !mailsent;
//                 setmailsent(newValue);
//                 setMailToastMessage(newValue ? "Email sent updated successfully!" : "Email not sent updated successfully!");
//                 setShowMailToast(true);
//             }
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

//     const mailToastMarkup = showMailToast ? (
//         <Toast
//             content={mailToastMessage}
//             onDismiss={() => setShowMailToast(false)}
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

//                             <div style={{ marginTop: "16px" }}>
//                                 <Card style={{ marginTop: "16px" }}>
//                                     <BlockStack gap="500">
//                                         <div>
//                                             <InlineStack gap="200" blockAlign="center">
//                                                 <Checkbox 
//                                                     label="Mark Email as sent to Merchant" 
//                                                     checked={mailsent} 
//                                                     onChange={handleMailToggle} 
//                                                     disabled={mailLoading} 
//                                                 />
//                                                 {mailLoading && <Spinner accessibilityLabel="Updating" size="small" />}
//                                             </InlineStack>
//                                         </div>
//                                     </BlockStack>
//                                 </Card>
//                             </div>
//                         </Layout.Section>
//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//                 {mailToastMarkup}
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
//     Spinner,
// } from "@shopify/polaris";
// import { CheckIcon, PhoneIcon, ChevronDownIcon, SearchIcon, ChatIcon } from "@shopify/polaris-icons";
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

//     const getMerchant = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
//     const merchantJson = await getMerchant.json();

//     return {
//         merchant: merchantJson.data,
//         merchantId,
//         mongoId: merchantJson.data?._id,
//         mailsent: merchantJson.data?.mailsent || false,
//         shopDomain: merchantJson.data.myshopifyDomain,
//     };
// };

// export const action = async ({ request }) => {
//     const body = await request.formData();
//     const whatsappNumber = body.get("whatsappNumber");
//     const countryCode = body.get("countryCode");
//     const mongoId = body.get("mongoId");

//     try {
//         const update = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
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

//     const { merchant, mongoId, mailsent: initialmailsent, shopDomain } = loaderData;
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
//     const [mailToastMessage, setMailToastMessage] = useState("");
//     const [showMailToast, setShowMailToast] = useState(false);

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
//                 country.callingCode.includes(searchLower) ||
//                 country.code.toLowerCase().includes(searchLower)
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
//             const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mailsent: !mailsent }),
//             });
//             const result = await res.json();
//             if (result.success) {
//                 const newValue = !mailsent;
//                 setmailsent(newValue);
//                 setMailToastMessage(newValue ? "Email sent updated successfully!" : "Email not sent updated successfully!");
//                 setShowMailToast(true);
//             }
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

//     const mailToastMarkup = showMailToast ? (
//         <Toast
//             content={mailToastMessage}
//             onDismiss={() => setShowMailToast(false)}
//             duration={4500}
//         />
//     ) : null;

//     // Fixed country activator button
//     const countryActivator = (
//         <button
//             type="button"
//             onClick={toggleCountryPopover}
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "0 12px",
//                 border: "1px solid #C9CCCF",
//                 borderRadius: "8px",
//                 background: "white",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 minWidth: "110px",
//                 height: "36px",
//                 fontFamily: "inherit",
//             }}
//         >
//             {selectedCountry.FlagComponent && (
//                 <selectedCountry.FlagComponent
//                     style={{ width: "20px", height: "14px", borderRadius: "2px" }}
//                 />
//             )}
//             <span style={{ fontWeight: "500", color: "#202223" }}>{selectedCountry.callingCode}</span>
//             <div style={{ marginLeft: "auto" }}>
//                 <Icon source={ChevronDownIcon} />
//             </div>
//         </button>
//     );

//     // Clean white dropdown (not dark theme)
//     const countryDropdownContent = (
//         <div style={{ 
//             width: "320px", 
//             maxHeight: "400px", 
//             background: "white", 
//             borderRadius: "8px", 
//             overflow: "hidden",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
//         }}>
//             <div style={{ padding: "12px", borderBottom: "1px solid #e1e3e5" }}>
//                 <div style={{ position: "relative" }}>
//                     <div style={{ 
//                         position: "absolute", 
//                         left: "10px", 
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         color: "#6d7175",
//                         display: "flex",
//                         alignItems: "center"
//                     }}>
//                         <Icon source={SearchIcon} />
//                     </div>
//                     <input
//                         type="text"
//                         value={countrySearchValue}
//                         onChange={(e) => setCountrySearchValue(e.target.value)}
//                         placeholder="Search countries..."
//                         autoFocus
//                         style={{
//                             width: "100%",
//                             padding: "8px 8px 8px 32px",
//                             border: "1px solid #c9cccf",
//                             borderRadius: "6px",
//                             fontSize: "14px",
//                             outline: "none",
//                         }}
//                         onFocus={(e) => e.currentTarget.style.borderColor = "#005bd3"}
//                         onBlur={(e) => e.currentTarget.style.borderColor = "#c9cccf"}
//                     />
//                 </div>
//             </div>
//             <Scrollable style={{ maxHeight: "320px" }}>
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
//                                 background: isSelected ? "#f1f2f4" : "transparent",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                                 textAlign: "left",
//                                 transition: "background 0.1s",
//                             }}
//                             onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#f6f6f7"; }}
//                             onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
//                         >
//                             {FlagComponent ? (
//                                 <FlagComponent style={{ width: "24px", height: "16px", borderRadius: "2px" }} />
//                             ) : (
//                                 <div style={{ width: "24px", height: "16px", background: "#e1e3e5", borderRadius: "2px" }} />
//                             )}
//                             <div style={{ flex: 1, color: "#202223" }}>{country.name}</div>
//                             <span style={{ color: "#6d7175", fontSize: "13px", fontFamily: "monospace" }}>
//                                 {country.callingCode}
//                             </span>
//                             {isSelected && <span style={{ color: "#008060", fontSize: "16px" }}>✓</span>}
//                         </button>
//                     );
//                 }) : (
//                     <div style={{ padding: "32px 20px", textAlign: "center", color: "#6d7175", fontSize: "14px" }}>
//                         No countries found
//                     </div>
//                 )}
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
//                                                     <Text variant="headingLg" as="h2">WhatsApp Configuration</Text>
//                                                 </InlineStack>
//                                                 <Text variant="bodyMd" tone="subdued">
//                                                     Configure your WhatsApp number for notifications
//                                                 </Text>
//                                             </BlockStack>
//                                             {merchant?.whatsappNumber && (
//                                                 <Badge tone="success" progress="complete">Configured</Badge>
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
//                                                 <Text as="p" variant="bodyMd" fontWeight="medium">Phone Number</Text>
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
//                                                     {!hasUnsavedChanges && whatsappNumber ? "No changes to save" : "Make sure to save your changes"}
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

//                             <div style={{ marginTop: "16px" }}>
//                                 <Card>
//                                     <BlockStack gap="500">
//                                         <div>
//                                             <InlineStack gap="200" blockAlign="center">
//                                                 <Checkbox
//                                                     label="Mark Email as sent to Merchant"
//                                                     checked={mailsent}
//                                                     onChange={handleMailToggle}
//                                                     disabled={mailLoading}
//                                                 />
//                                                 {mailLoading && <Spinner accessibilityLabel="Updating" size="small" />}
//                                             </InlineStack>
//                                         </div>
//                                     </BlockStack>
//                                 </Card>
//                             </div>

//                             <div style={{ marginTop: "16px" }}>
//                                 <Card>
//                                     <BlockStack gap="500">
//                                         <BlockStack gap="200">
//                                             <InlineStack align="space-between" blockAlign="center" wrap={false}>
//                                                 <BlockStack gap="200">
//                                                     <InlineStack gap="200" blockAlign="center">
//                                                         <Icon source={ChatIcon} tone="base" />
//                                                         <Text variant="headingLg" as="h2">WhatsApp Chat Icon</Text>
//                                                     </InlineStack>
//                                                     <Text variant="bodyMd" tone="subdued">
//                                                         Enable WhatsApp chat icon in your theme for customers to connect with you
//                                                     </Text>
//                                                 </BlockStack>
//                                             </InlineStack>
//                                         </BlockStack>

//                                         <Divider />

//                                         <BlockStack gap="300">
//                                             <Text variant="bodyMd" as="p">
//                                                 Add a floating WhatsApp chat icon to your store that allows customers to quickly contact you via WhatsApp. You can customize the position (left, right, top, bottom) and configure your WhatsApp number directly in the theme editor.
//                                             </Text>
//                                             <InlineStack gap="200" blockAlign="center">
//                                                 <Button
//                                                     variant="primary"
//                                                     onClick={() => {
//                                                         if (shopDomain) {
//                                                             window.open(`https://${shopDomain}/admin/themes/current/editor?context=apps&template=index`, '_blank');
//                                                         }
//                                                     }}
//                                                     disabled={!shopDomain}
//                                                 >
//                                                     Enable in Theme
//                                                 </Button>
//                                                 {merchant?.whatsappNumber && (
//                                                     <Text variant="bodySm" tone="subdued">
//                                                         Your configured WhatsApp number will be available in the theme settings
//                                                     </Text>
//                                                 )}
//                                             </InlineStack>
//                                         </BlockStack>
//                                     </BlockStack>
//                                 </Card>
//                             </div>
//                         </Layout.Section>
//                     </Layout>
//                 </BlockStack>
//                 {toastMarkup}
//                 {mailToastMarkup}
//             </Page>
//         </Frame>
//     );
// }











import { useLoaderData, Form, useActionData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
    Checkbox,
    Spinner,
} from "@shopify/polaris";
import { CheckIcon, PhoneIcon, ChevronDownIcon, SearchIcon, ChatIcon, EmailIcon, InfoIcon, DataPresentationIcon } from "@shopify/polaris-icons";
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

    const getMerchant = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${merchantId}`);
    const merchantJson = await getMerchant.json();

    return {
        merchant: merchantJson.data,
        merchantId,
        mongoId: merchantJson.data?._id,
        mailsent: merchantJson.data?.mailsent || false,
        shopDomain: merchantJson.data.myshopifyDomain,
    };
};

export const action = async ({ request }) => {
    const body = await request.formData();
    const whatsappNumber = body.get("whatsappNumber");
    const countryCode = body.get("countryCode");
    const mongoId = body.get("mongoId");

    try {
        const update = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
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

    const { merchant, mongoId, mailsent: initialmailsent, shopDomain } = loaderData;
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
    const [isSupportHovered, setIsSupportHovered] = useState(false);

    const hasUnsavedChanges = useMemo(() => {
        return whatsappNumber !== lastSavedValues.number ||
            selectedCountry.callingCode !== lastSavedValues.countryCode;
    }, [whatsappNumber, selectedCountry, lastSavedValues]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [countrySearchValue, setCountrySearchValue] = useState("");
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const loading = nav.state === "submitting";

    // Calculate dropdown position
    useEffect(() => {
        if (isDropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 4,
                left: rect.left,
            });
        }
    }, [isDropdownOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setCountrySearchValue("");
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
        if (!isDropdownOpen) setCountrySearchValue("");
    }, [isDropdownOpen]);

    const selectCountry = useCallback((country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
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
            const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/update/${mongoId}`, {
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

    return (
        // <Frame>
        //     <Page title="Merchant Settings" subtitle="Manage your account configuration and activity">
        //         <BlockStack gap="500">
        //             {showBanner && actionData?.success === true && (
        //                 <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}>
        //                     <Text as="p">{actionData.message}</Text>
        //                 </Banner>
        //             )}
        //             {showBanner && actionData?.success === false && (
        //                 <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}>
        //                     <Text as="p">{actionData.message}</Text>
        //                 </Banner>
        //             )}

        //             <Layout>
        //                 <Layout.Section>
        //                     <Card>
        //                         <BlockStack gap="500">
        //                             <BlockStack gap="200">
        //                                 <InlineStack align="space-between" blockAlign="center" wrap={false}>
        //                                     <BlockStack gap="200">
        //                                         <InlineStack gap="200" blockAlign="center">
        //                                             <Icon source={PhoneIcon} tone="base" />
        //                                             <Text variant="headingLg" as="h2">WhatsApp Configuration</Text>
        //                                         </InlineStack>
        //                                         <Text variant="bodyMd" tone="subdued">
        //                                             Configure your WhatsApp number for notifications
        //                                         </Text>
        //                                     </BlockStack>
        //                                     {merchant?.whatsappNumber && (
        //                                         <Badge tone="success" progress="complete">Configured</Badge>
        //                                     )}
        //                                 </InlineStack>
        //                             </BlockStack>

        //                             <Divider />

        //                             {loading && (
        //                                 <Box paddingBlockEnd="400">
        //                                     <ProgressBar progress={75} size="small" tone="primary" />
        //                                 </Box>
        //                             )}

        //                             <Form method="post" onSubmit={handleSubmit}>
        //                                 <input type="hidden" name="mongoId" value={mongoId} />
        //                                 <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />

        //                                 <FormLayout>
        //                                     <div>
        //                                         <Text as="p" variant="bodyMd" fontWeight="medium">Phone Number</Text>
        //                                         <div style={{ marginTop: "8px" }}>
        //                                             <InlineStack gap="200" blockAlign="start">
        //                                                 {/* Custom Dropdown with Fixed Positioning */}
        //                                                 <div style={{ position: "relative" }}>
        //                                                     <button
        //                                                         ref={buttonRef}
        //                                                         type="button"
        //                                                         onClick={toggleDropdown}
        //                                                         style={{
        //                                                             display: "flex",
        //                                                             alignItems: "center",
        //                                                             gap: "8px",
        //                                                             padding: "0 12px",
        //                                                             border: "1px solid #C9CCCF",
        //                                                             borderRadius: "8px",
        //                                                             background: "white",
        //                                                             cursor: "pointer",
        //                                                             fontSize: "14px",
        //                                                             minWidth: "110px",
        //                                                             height: "36px",
        //                                                             fontFamily: "inherit",
        //                                                         }}
        //                                                     >
        //                                                         {selectedCountry.FlagComponent && (
        //                                                             <selectedCountry.FlagComponent
        //                                                                 style={{ width: "20px", height: "14px", borderRadius: "2px" }}
        //                                                             />
        //                                                         )}
        //                                                         <span style={{ fontWeight: "500", color: "#202223" }}>
        //                                                             {selectedCountry.callingCode}
        //                                                         </span>
        //                                                         <div style={{ marginLeft: "auto" }}>
        //                                                             <Icon source={ChevronDownIcon} />
        //                                                         </div>
        //                                                     </button>
        //                                                 </div>

        //                                                 <div style={{ flex: 1 }}>
        //                                                     <TextField
        //                                                         type="tel"
        //                                                         name="whatsappNumber"
        //                                                         value={whatsappNumber}
        //                                                         onChange={handleInputChange}
        //                                                         placeholder="Phone Number"
        //                                                         error={validationError}
        //                                                         autoComplete="tel"
        //                                                         labelHidden
        //                                                         label="Phone Number"
        //                                                     />
        //                                                 </div>
        //                                             </InlineStack>
        //                                         </div>
        //                                         <div style={{ marginTop: "8px" }}>
        //                                             <Text as="p" variant="bodySm" tone="subdued">
        //                                                 Enter mobile number without country code
        //                                             </Text>
        //                                         </div>
        //                                     </div>

        //                                     <InlineStack align="space-between" blockAlign="center">
        //                                         <Text variant="bodySm" tone="subdued">
        //                                             {!hasUnsavedChanges && whatsappNumber ? "No changes to save" : "Make sure to save your changes"}
        //                                         </Text>
        //                                         <Button
        //                                             submit
        //                                             variant="primary"
        //                                             loading={loading}
        //                                             icon={CheckIcon}
        //                                             size="large"
        //                                             disabled={!whatsappNumber || !hasUnsavedChanges}
        //                                         >
        //                                             {loading ? "Saving..." : "Save Number"}
        //                                         </Button>
        //                                     </InlineStack>
        //                                 </FormLayout>
        //                             </Form>
        //                         </BlockStack>
        //                     </Card>

        //                     <div style={{ marginTop: "16px" }}>
        //                         <Card>
        //                             <BlockStack gap="500">
        //                                 <div>
        //                                     <InlineStack gap="200" blockAlign="center">
        //                                         <Checkbox
        //                                             label="Mark Email as sent to Merchant"
        //                                             checked={mailsent}
        //                                             onChange={handleMailToggle}
        //                                             disabled={mailLoading}
        //                                         />
        //                                         {mailLoading && <Spinner accessibilityLabel="Updating" size="small" />}
        //                                     </InlineStack>
        //                                 </div>
        //                             </BlockStack>
        //                         </Card>
        //                     </div>

        //                     <div style={{ marginTop: "16px" }}>
        //                         <Card>
        //                             <BlockStack gap="500">
        //                                 <BlockStack gap="200">
        //                                     <InlineStack align="space-between" blockAlign="center" wrap={false}>
        //                                         <BlockStack gap="200">
        //                                             <InlineStack gap="200" blockAlign="center">
        //                                                 <Icon source={ChatIcon} tone="base" />
        //                                                 <Text variant="headingLg" as="h2">WhatsApp Chat Icon</Text>
        //                                             </InlineStack>
        //                                             <Text variant="bodyMd" tone="subdued">
        //                                                 Enable WhatsApp chat icon in your theme for customers to connect with you
        //                                             </Text>
        //                                         </BlockStack>
        //                                     </InlineStack>
        //                                 </BlockStack>

        //                                 <Divider />

        //                                 <BlockStack gap="300">
        //                                     <Text variant="bodyMd" as="p">
        //                                         Add a floating WhatsApp chat icon to your store that allows customers to quickly contact you via WhatsApp. You can customize the position (left, right, top, bottom) and configure your WhatsApp number directly in the theme editor.
        //                                     </Text>
        //                                     <InlineStack gap="200" blockAlign="center">
        //                                         <Button
        //                                             variant="primary"
        //                                             onClick={() => {
        //                                                 if (shopDomain) {
        //                                                     window.open(`https://${shopDomain}/admin/themes/current/editor?context=apps&template=index`, '_blank');
        //                                                 }
        //                                             }}
        //                                             disabled={!shopDomain}
        //                                         >
        //                                             Enable in Theme
        //                                         </Button>
        //                                         {merchant?.whatsappNumber && (
        //                                             <Text variant="bodySm" tone="subdued">
        //                                                 Your configured WhatsApp number will be available in the theme settings
        //                                             </Text>
        //                                         )}
        //                                     </InlineStack>
        //                                 </BlockStack>
        //                             </BlockStack>
        //                         </Card>
        //                     </div>
        //                 </Layout.Section>
        //             </Layout>
        //         </BlockStack>
        //         {toastMarkup}
        //         {mailToastMarkup}

        //         {/* Portal for Dropdown - FIXED POSITION */}
        //         {isDropdownOpen && (
        //             <div
        //                 ref={dropdownRef}
        //                 style={{
        //                     position: "fixed",
        //                     top: `${dropdownPosition.top}px`,
        //                     left: `${dropdownPosition.left}px`,
        //                     width: "320px",
        //                     background: "white",
        //                     borderRadius: "8px",
        //                     boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        //                     border: "1px solid #e1e3e5",
        //                     zIndex: 10000,
        //                     overflow: "hidden",
        //                 }}
        //             >
        //                 <div style={{ padding: "12px", borderBottom: "1px solid #e1e3e5" }}>
        //                     <div style={{ position: "relative" }}>
        //                         <div style={{
        //                             position: "absolute",
        //                             left: "10px",
        //                             top: "50%",
        //                             transform: "translateY(-50%)",
        //                             color: "#6d7175",
        //                             display: "flex",
        //                             alignItems: "center",
        //                             pointerEvents: "none"
        //                         }}>
        //                             <Icon source={SearchIcon} />
        //                         </div>
        //                         <input
        //                             type="text"
        //                             value={countrySearchValue}
        //                             onChange={(e) => setCountrySearchValue(e.target.value)}
        //                             placeholder="Search countries..."
        //                             autoFocus
        //                             style={{
        //                                 width: "100%",
        //                                 padding: "8px 8px 8px 32px",
        //                                 border: "1px solid #c9cccf",
        //                                 borderRadius: "6px",
        //                                 fontSize: "14px",
        //                                 outline: "none",
        //                             }}
        //                             onFocus={(e) => e.currentTarget.style.borderColor = "#005bd3"}
        //                             onBlur={(e) => e.currentTarget.style.borderColor = "#c9cccf"}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ 
        //                     maxHeight: "300px", 
        //                     overflowY: "auto",
        //                     overflowX: "hidden"
        //                 }}>
        //                     {filteredCountries.length > 0 ? filteredCountries.map((country) => {
        //                         const isSelected = selectedCountry.code === country.code;
        //                         const FlagComponent = country.FlagComponent;
        //                         return (
        //                             <button
        //                                 key={country.code}
        //                                 type="button"
        //                                 onClick={() => selectCountry(country)}
        //                                 style={{
        //                                     width: "100%",
        //                                     display: "flex",
        //                                     alignItems: "center",
        //                                     gap: "12px",
        //                                     padding: "10px 16px",
        //                                     border: "none",
        //                                     background: isSelected ? "#f1f2f4" : "transparent",
        //                                     cursor: "pointer",
        //                                     fontSize: "14px",
        //                                     textAlign: "left",
        //                                     transition: "background 0.1s",
        //                                 }}
        //                                 onMouseEnter={(e) => {
        //                                     if (!isSelected) e.currentTarget.style.background = "#f6f6f7";
        //                                 }}
        //                                 onMouseLeave={(e) => {
        //                                     if (!isSelected) e.currentTarget.style.background = "transparent";
        //                                 }}
        //                             >
        //                                 {FlagComponent ? (
        //                                     <FlagComponent style={{ width: "24px", height: "16px", borderRadius: "2px", flexShrink: 0 }} />
        //                                 ) : (
        //                                     <div style={{ width: "24px", height: "16px", background: "#e1e3e5", borderRadius: "2px", flexShrink: 0 }} />
        //                                 )}
        //                                 <div style={{ flex: 1, color: "#202223", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        //                                     {country.name}
        //                                 </div>
        //                                 <span style={{ color: "#6d7175", fontSize: "13px", fontFamily: "monospace", flexShrink: 0 }}>
        //                                     {country.callingCode}
        //                                 </span>
        //                                 {isSelected && <span style={{ color: "#008060", fontSize: "16px", flexShrink: 0 }}>✓</span>}
        //                             </button>
        //                         );
        //                     }) : (
        //                         <div style={{ padding: "32px 20px", textAlign: "center", color: "#6d7175", fontSize: "14px" }}>
        //                             No countries found
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
        //         )}
        //     </Page>
        // </Frame>

        <Frame>
            <Page  >
                <BlockStack gap="500">
                    {showBanner && actionData?.success === true && (
                        <Banner title="Success!" tone="success" onDismiss={() => setShowBanner(false)}>
                            <Text as="p">{actionData.message}</Text>
                        </Banner>
                    )}
                    {showBanner && actionData?.success === false && (
                        <Banner title="Update Failed" tone="critical" onDismiss={() => setShowBanner(false)}>
                            <Text as="p">{actionData.message}</Text>
                        </Banner>
                    )}

                    <Layout>
                        <Layout.Section>
                            {/* WhatsApp Configuration Card */}
                            <Card>
                                <BlockStack gap="500">
                                    {/* Header with Icon */}
                                    <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                        <InlineStack gap="300" blockAlign="center">
                                            <div style={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "12px",
                                                background: "#007B60",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",

                                            }}>
                                                <div style={{ color: "white", fontSize: "24px" }}>
                                                    <Icon source={PhoneIcon} />
                                                </div>
                                            </div>
                                            <BlockStack gap="100">
                                                <Text variant="headingLg" as="h2" fontWeight="semibold">
                                                    WhatsApp Configuration
                                                </Text>
                                                <Text variant="bodyMd" tone="subdued">
                                                    Configure your WhatsApp number for notifications
                                                </Text>
                                            </BlockStack>
                                        </InlineStack>
                                        {merchant?.whatsappNumber && (
                                            <Badge tone="success" size="large">
                                                <InlineStack gap="100" blockAlign="center">
                                                    <span style={{ fontSize: "12px" }}>✓</span>
                                                    <span>Configured</span>
                                                </InlineStack>

                                            </Badge>

                                        )}
                                    </InlineStack>

                                    <Divider />

                                    {loading && (
                                        <Box paddingBlockEnd="400">
                                            <ProgressBar progress={75} size="small" tone="primary" />
                                        </Box>
                                    )}

                                    <Form method="post" onSubmit={handleSubmit}>
                                        <input type="hidden" name="mongoId" value={mongoId} />
                                        <input type="hidden" name="countryCode" value={selectedCountry.callingCode} />

                                        <FormLayout>
                                            <BlockStack gap="400">
                                                {/* Phone Number Input Section */}
                                                <div style={{
                                                    padding: "16px",
                                                    background: "#F9FAFB",
                                                    borderRadius: "12px",
                                                    border: "1px solid #E1E3E5",
                                                }}>
                                                    <BlockStack gap="300">
                                                        <Text as="p" variant="headingMd" fontWeight="semibold">
                                                            Phone Number
                                                        </Text>
                                                        <InlineStack gap="200" blockAlign="start">
                                                            {/* Country Selector */}
                                                            <div style={{ position: "relative" }}>
                                                                <button
                                                                    ref={buttonRef}
                                                                    type="button"
                                                                    onClick={toggleDropdown}
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "10px",
                                                                        padding: "0 14px",
                                                                        border: "2px solid #C9CCCF",
                                                                        borderRadius: "10px",
                                                                        background: "white",
                                                                        cursor: "pointer",
                                                                        fontSize: "14px",
                                                                        minWidth: "120px",
                                                                        height: "32px",
                                                                        fontFamily: "inherit",
                                                                        transition: "all 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.borderColor = "#005BD3";
                                                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 91, 211, 0.1)";
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.borderColor = "#C9CCCF";
                                                                        e.currentTarget.style.boxShadow = "none";
                                                                    }}
                                                                >
                                                                    {selectedCountry.FlagComponent && (
                                                                        <selectedCountry.FlagComponent
                                                                            style={{ width: "24px", height: "16px", borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                                                                        />
                                                                    )}
                                                                    <span style={{ fontWeight: "600", color: "#202223" }}>
                                                                        {selectedCountry.callingCode}
                                                                    </span>
                                                                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                                                        <Icon source={ChevronDownIcon} />
                                                                    </div>
                                                                </button>
                                                            </div>

                                                            {/* Phone Number Input */}
                                                            <div style={{ flex: 1 }}>
                                                                <TextField
                                                                    type="tel"
                                                                    name="whatsappNumber"
                                                                    value={whatsappNumber}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter your phone number"
                                                                    error={validationError}
                                                                    autoComplete="tel"
                                                                    labelHidden
                                                                    label="Phone Number"
                                                                />
                                                            </div>
                                                        </InlineStack>
                                                        <Text as="p" variant="bodySm" tone="subdued">
                                                            💡 Enter your mobile number without the country code
                                                        </Text>
                                                    </BlockStack>
                                                </div>

                                                {/* Action Section */}
                                                <div style={{
                                                    padding: "10px",
                                                    background: "rgb(107 115 113 / 12%)",
                                                    borderRadius: "12px",
                                                    // border: hasUnsavedChanges ? "1px solid #FFD79D" : "1px solid #B3D7C7",
                                                }}>
                                                    <InlineStack align="space-between" blockAlign="center">
                                                        <InlineStack gap="200" blockAlign="center">
                                                            <div style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                borderRadius: "50%",
                                                                background: hasUnsavedChanges ? "#472B99" : "#008060",
                                                            }} />
                                                            <Text variant="bodyMd" fontWeight="medium">
                                                                {!hasUnsavedChanges && whatsappNumber ? "WhatsApp Number changes saved" : "You have unsaved changes"}
                                                            </Text>
                                                        </InlineStack>
                                                        <Button
                                                            submit
                                                            variant="primary"
                                                            loading={loading}
                                                            size="large"
                                                            disabled={!whatsappNumber || !hasUnsavedChanges}
                                                            icon={CheckIcon}
                                                        >
                                                            {loading ? "Saving..." : "Save Number"}
                                                        </Button>
                                                    </InlineStack>
                                                </div>
                                            </BlockStack>
                                        </FormLayout>
                                    </Form>
                                </BlockStack>
                            </Card>

                            {/* Email Status Card */}
                            <div style={{ marginTop: "20px" }}>
                                <Card>
                                    <BlockStack gap="400">

                                        <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                            <InlineStack gap="300" blockAlign="center">
                                                <div style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "12px",
                                                    background: "#007B60",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",

                                                }}>
                                                    <div style={{ color: "white", fontSize: "24px" }}>
                                                        <Icon source={EmailIcon} />
                                                    </div>
                                                </div>
                                                <BlockStack gap="100">
                                                    <Text variant="headingLg" as="h2" fontWeight="semibold">
                                                        Email Notification Status
                                                    </Text>
                                                    <Text variant="bodyMd" tone="subdued">
                                                        Track merchant email delivery status
                                                    </Text>
                                                </BlockStack>
                                            </InlineStack>
                                            {mailsent && (
                                                <Badge tone="success" size="large">
                                                    <InlineStack gap="100" blockAlign="center">
                                                        <span style={{ fontSize: "12px" }}>✓</span>
                                                        <span>Sent</span>
                                                    </InlineStack>
                                                </Badge>
                                            )}
                                        </InlineStack>


                                        {/* <InlineStack align="space-between" blockAlign="center">
                                            <BlockStack gap="100">
                                                <Text variant="headingMd" as="h3" fontWeight="semibold">
                                                    Email Notification Status
                                                </Text>
                                                <Text variant="bodySm" tone="subdued">
                                               Email Notification Status
                                                </Text>
                                                
                                            </BlockStack>
                                            {mailsent && (
                                                <Badge tone="success">Sent</Badge>
                                            )}
                                        </InlineStack> */}

                                        <Divider />

                                        <div style={{
                                            padding: "14px",
                                            background: "#F9FAFB",
                                            borderRadius: "10px",
                                            border: "1px solid #E1E3E5",
                                        }}>
                                            <InlineStack gap="300" blockAlign="center">
                                                <Checkbox
                                                    label="Mark email as sent to merchant"
                                                    checked={mailsent}
                                                    onChange={handleMailToggle}
                                                    disabled={mailLoading}
                                                />
                                                {mailLoading && <Spinner accessibilityLabel="Updating" size="small" />}
                                            </InlineStack>
                                        </div>
                                    </BlockStack>
                                </Card>
                            </div>

                            {/* WhatsApp Chat Icon Card */}
                            <div style={{ marginTop: "20px" }}>
                                <Card>
                                    <BlockStack gap="500">
                                        {/* Header with Icon */}
                                        <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                            <InlineStack gap="300" blockAlign="center">
                                                <div style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "12px",
                                                    background: "#007B60",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",

                                                }}>
                                                    <div style={{ color: "white", fontSize: "24px" }}>
                                                        <Icon source={ChatIcon} />
                                                    </div>
                                                </div>
                                                <BlockStack gap="100">
                                                    <InlineStack gap="200" blockAlign="center">
                                                        <Text variant="headingLg" as="h2" fontWeight="semibold">
                                                            WhatsApp Chat Icon
                                                        </Text>
                                                        {/* <Badge tone="info">Theme Extension</Badge> */}
                                                    </InlineStack>
                                                    <Text variant="bodyMd" tone="subdued">
                                                        Enable WhatsApp chat icon in your theme for customers to connect with you
                                                    </Text>
                                                </BlockStack>
                                            </InlineStack>
                                        </InlineStack>



                                        <Divider />


                                        {/* Action Section */}
                                        <div style={{
                                            padding: "20px",
                                            borderRadius: "12px",
                                            // border: "1px solid #008060",
                                            background: "rgb(107 115 113 / 12%)",
                                        }}>
                                            <BlockStack gap="300">
                                                <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                                    <BlockStack gap="100">
                                                        <Text variant="headingMd" as="h3" fontWeight="bold">
                                                            <span  >Ready to Enable?</span>
                                                        </Text>
                                                        <Text variant="bodySm" as="p">
                                                            <span  >
                                                                Open the theme editor to activate your WhatsApp chat icon
                                                            </span>
                                                        </Text>
                                                    </BlockStack>
                                                    {/* {merchant?.whatsappNumber && (
                                                        <div style={{
                                                            padding: "6px 12px",
                                                            background: "rgba(255, 255, 255, 0.2)",
                                                            borderRadius: "20px",
                                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                                        }}>
                                                            <Text variant="bodySm" fontWeight="semibold">
                            <span  >✓ Configured</span>
                        </Text>
                                                        </div>
                                                    )} */}
                                                </InlineStack>

                                                <InlineStack gap="200" wrap>
                                                    <Button
                                                        variant="primary"
                                                        size="large"
                                                        onClick={() => {
                                                            if (shopDomain) {
                                                                window.open(`https://${shopDomain}/admin/themes/current/editor?context=apps&template=index`, '_blank');
                                                            }
                                                        }}
                                                        disabled={!shopDomain || !merchant?.whatsappNumber}
                                                    >
                                                        <InlineStack gap="150" blockAlign="center">
                                                            <span>Open Theme Editor</span>
                                                        </InlineStack>
                                                    </Button>

                                                </InlineStack>
                                            </BlockStack>
                                        </div>



                                    </BlockStack>
                                </Card>
                            </div>
                        </Layout.Section>
                    </Layout>
                </BlockStack>
                {toastMarkup}
                {mailToastMarkup}

                {/* Country Dropdown Portal */}
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        style={{
                            position: "fixed",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            width: "340px",
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
                            border: "1px solid #E1E3E5",
                            zIndex: 10000,
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ padding: "16px", borderBottom: "1px solid #E1E3E5", background: "#F9FAFB" }}>
                            <div style={{ position: "relative" }}>
                                <div style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6D7175",
                                    display: "flex",
                                    alignItems: "center",
                                    pointerEvents: "none"
                                }}>
                                    <Icon source={SearchIcon} />
                                </div>
                                <input
                                    type="text"
                                    value={countrySearchValue}
                                    onChange={(e) => setCountrySearchValue(e.target.value)}
                                    placeholder="Search countries..."
                                    autoFocus
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px 10px 38px",
                                        border: "2px solid #C9CCCF",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                        background: "white",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#005BD3";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 91, 211, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#C9CCCF";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            maxHeight: "320px",
                            overflowY: "auto",
                            overflowX: "hidden"
                        }}>
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
                                            padding: "12px 16px",
                                            border: "none",
                                            background: isSelected ? "#F1F2F4" : "transparent",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            textAlign: "left",
                                            transition: "background 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = "#F6F6F7";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        {FlagComponent ? (
                                            <FlagComponent style={{
                                                width: "28px",
                                                height: "20px",
                                                borderRadius: "4px",
                                                flexShrink: 0,
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                            }} />
                                        ) : (
                                            <div style={{
                                                width: "28px",
                                                height: "20px",
                                                background: "#E1E3E5",
                                                borderRadius: "4px",
                                                flexShrink: 0
                                            }} />
                                        )}
                                        <div style={{
                                            flex: 1,
                                            color: "#202223",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontWeight: isSelected ? "600" : "400"
                                        }}>
                                            {country.name}
                                        </div>
                                        <span style={{
                                            color: "#6D7175",
                                            fontSize: "13px",
                                            fontFamily: "monospace",
                                            flexShrink: 0,
                                            fontWeight: "500"
                                        }}>
                                            {country.callingCode}
                                        </span>
                                        {isSelected && (
                                            <span style={{
                                                color: "#008060",
                                                fontSize: "18px",
                                                flexShrink: 0,
                                                fontWeight: "bold"
                                            }}>✓</span>
                                        )}
                                    </button>
                                );
                            }) : (
                                <div style={{
                                    padding: "40px 20px",
                                    textAlign: "center",
                                    color: "#6D7175",
                                    fontSize: "14px"
                                }}>
                                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                                    No countries found
                                </div>
                            )}
                        </div>
                    </div>
                )}

                 

                <div style={{ display: "flex", gap: "14px", alignItems: "center", fontSize: "14px", justifyContent: "center",
                    marginTop: "10px" }}>
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="/privacy-policy"
                        style={{ 
                            textDecoration: "none", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px",
                            color: "#2563eb"
                        }}
                    >
                        <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            backgroundColor: "#007B60",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "white"
                        }}>
                            <Icon source={InfoIcon}  />
                        </div>
                        <span>Privacy</span>
                    </a>

                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="mailto:help@value-fly.com"
                        style={{ 
                            textDecoration: "none", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px",
                            color: "#2563eb"
                        }}
                    >
                        <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            backgroundColor: "#007B60",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "white"
                        }}>
                            <Icon source={EmailIcon}   />
                        </div>
                        <span>help@value-fly.com</span>
                    </a>

                    
                </div>



                {/* Floating Support Button */}
                {/* Floating Support Button */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "24px",
                        right: "24px",
                        zIndex: 9999,
                    }}
                >
                    <a
                        href="mailto:divyesh@gmail.com?subject=Get Support"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            onMouseEnter={() => setIsSupportHovered(true)}
                            onMouseLeave={() => setIsSupportHovered(false)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "14px 20px",
                                background: "#007B60",
                                borderRadius: "12px",
                                color: "white",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",

                                transition: "all 0.3s ease",
                            }}
                        >
                            <Icon source={EmailIcon} />
                            <span>Get Support</span>
                        </div>
                    </a>
                </div>


                {/* Add CSS animation */}
                <style>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateX(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}</style>
            </Page>
        </Frame>
    );
}