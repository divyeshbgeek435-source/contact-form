


// import { useState, useEffect, useRef } from "react";
// import { authenticate } from "../shopify.server";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "react-router";
// import {
//     AppProvider,
//     Page,
//     Card,
//     Text,
//     TextField,
//     Select,
//     Button,
//     Checkbox,
//     BlockStack,
//     InlineStack,
//     InlineGrid,
//     Grid,
//     Box,
//     Banner,
//     Modal,
//     FormLayout,
//     Icon,
//     Spinner,
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import {
//     EditIcon, DeleteIcon, ChevronUpIcon, ChevronDownIcon, DragHandleIcon
// } from '@shopify/polaris-icons';

// export const loader = async ({ request }) => {
//     const { admin } = await authenticate.admin(request);

//     const response = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//         myshopifyDomain
//       }
//     }
//   `);

//     const data = await response.json();
//     return json({
//         shop: data.data?.shop || { id: "", myshopifyDomain: "" },
//     });
// };

// export default function CustomizeForm() {
//     const [formName, setFormName] = useState("");
//     const [formDescription, setFormDescription] = useState("");
//     const [submitButtonText, setSubmitButtonText] = useState("Submit");
//     const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState("add");
//     const [selectedFieldId, setSelectedFieldId] = useState(null);
//     const [saveMessage, setSaveMessage] = useState(null);
//     const [formSubmissionTitle, setFormSubmissionTitle] = useState("");
//     const [successDescription, setSuccessDescription] = useState("");
//     const { shop } = useLoaderData();
//     const [fields, setFields] = useState([]);
    
//     // Debounce timer reference
//     const reorderTimeoutRef = useRef(null);
    
//     // ✅ NEW: Drag and drop state
//     const [draggedIndex, setDraggedIndex] = useState(null);
//     const [dragOverIndex, setDragOverIndex] = useState(null);
    
//     const [validationPopup, setValidationPopup] = useState({
//         isOpen: false,
//         message: ""
//     });

//     const [confirmationPopup, setConfirmationPopup] = useState({
//         isOpen: false,
//         title: "",
//         message: "",
//         onConfirm: null
//     });

//     const [currentField, setCurrentField] = useState({
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: false,
//         options: [],
//     });

//     const [optionInputPopup, setOptionInputPopup] = useState({
//         isOpen: false,
//         mode: "add",
//         editIndex: null,
//         label: "",
//         value: ""
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formData, setFormData] = useState({});

//     // Fetch existing fields
//     const fetchFields = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${shopIdOnly}`);

          

//             if (response.ok) {
//                 const result = await response.json();

//                 console.log(result)
//                 console.log(result.data.formTemplates[0].name)
//                 setFormName(result.data.formTemplates[0].name)
//                 setFormDescription(result.data.formTemplates[0].description);
//                 setSuccessDescription(result.data.formTemplates[0].successdescription);
//                 setFields(result.data.formTemplates[0].fields || []);
//             }
//         } catch (error) {
//             console.error("Error fetching fields:", error);
//         }
//     };

//     useEffect(() => {
//         fetchFields();
//     }, [shop.id]);

//     // Cleanup timeout on unmount
//     useEffect(() => {
//         return () => {
//             if (reorderTimeoutRef.current) {
//                 clearTimeout(reorderTimeoutRef.current);
//             }
//         };
//     }, []);

//     const showValidationPopup = (message) => {
//         setValidationPopup({
//             isOpen: true,
//             message: message
//         });
//     };

//     const closeValidationPopup = () => {
//         setValidationPopup({
//             isOpen: false,
//             message: ""
//         });
//     };

//     const showConfirmationPopup = (title, message, onConfirm) => {
//         setConfirmationPopup({
//             isOpen: true,
//             title: title,
//             message: message,
//             onConfirm: onConfirm
//         });
//     };

//     const closeConfirmationPopup = () => {
//         setConfirmationPopup({
//             isOpen: false,
//             title: "",
//             message: "",
//             onConfirm: null
//         });
//     };

//     const handleConfirmAction = () => {
//         if (confirmationPopup.onConfirm) {
//             confirmationPopup.onConfirm();
//         }
//         closeConfirmationPopup();
//     };

//     const openAddModal = () => {
//         setModalMode("add");
//         setCurrentField({
//             label: "",
//             type: "text",
//             placeholder: "",
//             required: false,
//             options: [],
//         });
//         setSelectedFieldId(null);
//         setIsModalOpen(true);
//     };

//     const openEditModal = async (fieldId) => {
//         const fieldToEdit = fields.find((f) => f._id === fieldId);

//         if (!fieldToEdit) {
//             setSaveMessage({ type: "error", text: "❌ Field not found" });
//             setTimeout(() => setSaveMessage(null), 5000);
//             return;
//         }

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${fieldId}`
//             );

//             if (response.ok) {
//                 const result = await response.json();
//                 setModalMode("edit");
//                 setSelectedFieldId(fieldId);
//                 setCurrentField({
//                     label: result.data.label || "",
//                     type: result.data.type || "text",
//                     placeholder: result.data.placeholder || "",
//                     required: result.data.required || false,
//                     options: result.data.options || [],
//                 });
//                 setIsModalOpen(true);
//             } else {
//                 console.warn("API call failed, using existing field data");
//                 setModalMode("edit");
//                 setSelectedFieldId(fieldId);
//                 setCurrentField({
//                     label: fieldToEdit.label || "",
//                     type: fieldToEdit.type || "text",
//                     placeholder: fieldToEdit.placeholder || "",
//                     required: fieldToEdit.required || false,
//                     options: fieldToEdit.options || [],
//                 });
//                 setIsModalOpen(true);
//             }
//         } catch (error) {
//             console.error("Error fetching field data:", error);
//             setModalMode("edit");
//             setSelectedFieldId(fieldId);
//             setCurrentField({
//                 label: fieldToEdit.label || "",
//                 type: fieldToEdit.type || "text",
//                 placeholder: fieldToEdit.placeholder || "",
//                 required: fieldToEdit.required || false,
//                 options: fieldToEdit.options || [],
//             });
//             setIsModalOpen(true);
//         }
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedFieldId(null);
//         setCurrentField({
//             label: "",
//             type: "text",
//             placeholder: "",
//             required: false,
//             options: [],
//         });
//     };

//     const addFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field added successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields();
//                 closeModal();
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ type: "error", text: `❌ Error adding field: ${errText}` });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (err) {
//             console.error("Network error while adding field:", err);
//             setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//             setTimeout(() => setSaveMessage(null), 5000);
//         }
//     };

//     const updateFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${selectedFieldId}`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field updated successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields();
//                 closeModal();
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ type: "error", text: `❌ Error updating field: ${errText}` });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (err) {
//             console.error("Network error while updating field:", err);
//             setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//             setTimeout(() => setSaveMessage(null), 5000);
//         }
//     };

//     const deleteFieldAPI = async (fieldId) => {
//         showConfirmationPopup(
//             "Delete Field",
//             "Are you sure you want to delete this field? This action cannot be undone.",
//             async () => {
//                 try {
//                     const shopIdOnly = shop.id.split("/").pop();
//                     const response = await fetch(
//                         `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${fieldId}`,
//                         { method: "DELETE" }
//                     );

//                     if (response.ok) {
//                         setSaveMessage({ type: "success", text: "✅ Field deleted successfully!" });
//                         setTimeout(() => setSaveMessage(null), 5000);
//                         await fetchFields();
//                     } else {
//                         const errText = await response.text();
//                         setSaveMessage({ type: "error", text: `❌ Error deleting field: ${errText}` });
//                         setTimeout(() => setSaveMessage(null), 5000);
//                     }
//                 } catch (err) {
//                     console.error("Network error while deleting field:", err);
//                     setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//                     setTimeout(() => setSaveMessage(null), 5000);
//                 }
//             }
//         );
//     };

//     const validateFieldData = () => {
//         if (!currentField.label.trim()) {
//             showValidationPopup("Please enter a field label");
//             return false;
//         }

//         if (currentField.type === "email" && !currentField.required) {
//             showValidationPopup("Email field must be marked as required");
//             return false;
//         }

//         if (["dropdown", "radio", "checkbox"].includes(currentField.type)) {
//             if (currentField.options.length === 0) {
//                 showValidationPopup(`Please add at least one option for ${currentField.type} field`);
//                 return false;
//             }
//         }

//         return true;
//     };

//     const handleModalSave = () => {
//         if (!validateFieldData()) {
//             return;
//         }

//         if (modalMode === "add") {
//             addFieldAPI();
//         } else {
//             updateFieldAPI();
//         }
//     };

//     const updateCurrentField = (key, value) => {
//         if (key === "type" && value === "email") {
//             setCurrentField({ ...currentField, [key]: value, required: true });
//         } else {
//             setCurrentField({ ...currentField, [key]: value });
//         }
//     };

//     const openAddOptionPopup = () => {
//         setOptionInputPopup({
//             isOpen: true,
//             mode: "add",
//             editIndex: null,
//             label: "",
//             value: ""
//         });
//     };

//     const openEditOptionPopup = (index) => {
//         const currentOption = currentField.options[index];
//         if (!currentOption) return;

//         setOptionInputPopup({
//             isOpen: true,
//             mode: "edit",
//             editIndex: index,
//             label: currentOption.label,
//             value: currentOption.value
//         });
//     };

//     const closeOptionInputPopup = () => {
//         setOptionInputPopup({
//             isOpen: false,
//             mode: "add",
//             editIndex: null,
//             label: "",
//             value: ""
//         });
//     };

//     const handleSaveOption = () => {
//         if (!optionInputPopup.label.trim()) {
//             showValidationPopup("Please enter an option label");
//             return;
//         }
//         if (!optionInputPopup.value.trim()) {
//             showValidationPopup("Please enter an option value");
//             return;
//         }

//         if (optionInputPopup.mode === "add") {
//             setCurrentField({
//                 ...currentField,
//                 options: [...currentField.options, { 
//                     label: optionInputPopup.label, 
//                     value: optionInputPopup.value 
//                 }],
//             });
//         } else {
//             const updatedOptions = currentField.options.map((opt, i) =>
//                 i === optionInputPopup.editIndex 
//                     ? { label: optionInputPopup.label, value: optionInputPopup.value } 
//                     : opt
//             );
//             setCurrentField({ ...currentField, options: updatedOptions });
//         }
//         closeOptionInputPopup();
//     };

//     const addOption = () => {
//         openAddOptionPopup();
//     };

//     const editOption = (index) => {
//         openEditOptionPopup(index);
//     };

//     const deleteOption = (index) => {
//         showConfirmationPopup(
//             "Delete Option",
//             "Are you sure you want to delete this option?",
//             () => {
//                 const updatedOptions = currentField.options.filter((_, i) => i !== index);
//                 setCurrentField({ ...currentField, options: updatedOptions });
//             }
//         );
//     };

//     const validateForm = () => {
//         const hasEmailField = fields.some(field => field.type === "email");
        
//         if (!hasEmailField) {
//             showValidationPopup("Form must contain at least one Email field before saving.");
//             return false;
//         }

//         return true;
//     };

//     async function saveFormConfig() {
//         if (!validateForm()) {
//             return;
//         }

//         setIsSaving(true);
//         const payload = {
//             storeName: shop.myshopifyDomain,
//             formData: {
//                 name: formName,
//                 description: formDescription,
//                 formSubmissionTitle,
//                 successdescription :successDescription,
//                 meta: { createdBy: "AdminUser", published: false },
//             },
//         };

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             if (response.ok) {
//                 setSaveMessage({ type: "success", title: formSubmissionTitle, text: successDescription });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ type: "error", text: `❌ Error saving form: ${errText}` });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (error) {
//             setSaveMessage({ type: "error", text: `❌ Network error: ${error.message}` });
//             setTimeout(() => setSaveMessage(null), 5000);
//         } finally {
//             setIsSaving(false);
//         }
//     }

//     // Debounced field order update
//     const updateFieldOrderDebounced = (orderedFields) => {
//         // Clear previous timeout
//         if (reorderTimeoutRef.current) {
//             clearTimeout(reorderTimeoutRef.current);
//         }

//         // Set new timeout - API call થશે 1 second પછી
//         reorderTimeoutRef.current = setTimeout(async () => {
//             try {
//                 const shopIdOnly = shop.id.split("/").pop();
//                 const fieldIds = orderedFields.map(f => f._id.toString());
                
//                 const response = await fetch(
//                     `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/fields/reorder`,
//                     {
//                         method: "PUT",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ fieldIds }),
//                     }
//                 );

//                 if (response.ok) {
//                     setSaveMessage({ type: "success", text: "✅ Field order updated!" });
//                     setTimeout(() => setSaveMessage(null), 3000);
//                 } else {
//                     const errText = await response.text();
//                     console.error("Reorder error:", errText);
//                     setSaveMessage({ type: "error", text: "❌ Failed to update order" });
//                     setTimeout(() => setSaveMessage(null), 3000);
//                 }
//             } catch (err) {
//                 console.error("Error updating field order:", err);
//                 setSaveMessage({ type: "error", text: "❌ Network error" });
//                 setTimeout(() => setSaveMessage(null), 3000);
//             }
//         }, 1000); // 1 second wait
//     };

//     // Move field up
//     const moveFieldUp = (index) => {
//         if (index === 0) return;
        
//         const newFields = [...fields];
//         [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
//         setFields(newFields);
        
//         // Call debounced update
//         updateFieldOrderDebounced(newFields);
//     };

//     // Move field down
//     const moveFieldDown = (index) => {
//         if (index === fields.length - 1) return;
        
//         const newFields = [...fields];
//         [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
//         setFields(newFields);
        
//         // Call debounced update
//         updateFieldOrderDebounced(newFields);
//     };

//     // ✅ NEW: Drag and Drop handlers
//     const handleDragStart = (e, index) => {
//         setDraggedIndex(index);
//         e.dataTransfer.effectAllowed = "move";
//         // Add a slight delay to show drag preview
//         e.currentTarget.style.opacity = "0.5";
//     };

//     const handleDragEnd = (e) => {
//         e.currentTarget.style.opacity = "1";
//         setDraggedIndex(null);
//         setDragOverIndex(null);
//     };

//     const handleDragOver = (e, index) => {
//         e.preventDefault();
//         e.dataTransfer.dropEffect = "move";
        
//         if (draggedIndex === null || draggedIndex === index) return;
        
//         setDragOverIndex(index);
//     };

//     const handleDragLeave = () => {
//         setDragOverIndex(null);
//     };

//     const handleDrop = (e, dropIndex) => {
//         e.preventDefault();
        
//         if (draggedIndex === null || draggedIndex === dropIndex) {
//             setDraggedIndex(null);
//             setDragOverIndex(null);
//             return;
//         }

//         const newFields = [...fields];
//         const draggedField = newFields[draggedIndex];
        
//         // Remove from old position
//         newFields.splice(draggedIndex, 1);
        
//         // Insert at new position
//         newFields.splice(dropIndex, 0, draggedField);
        
//         // Update state
//         setFields(newFields);
        
//         // Call debounced API update
//         updateFieldOrderDebounced(newFields);
        
//         // Reset drag state
//         setDraggedIndex(null);
//         setDragOverIndex(null);
//     };

//     const handleFieldChange = (fieldId, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [fieldId]: value
//         }));
//     };

//     const handleCheckboxChange = (fieldId, optionValue, checked) => {
//         setFormData(prev => {
//             const currentValues = prev[fieldId] || [];
//             if (checked) {
//                 return {
//                     ...prev,
//                     [fieldId]: [...currentValues, optionValue]
//                 };
//             } else {
//                 return {
//                     ...prev,
//                     [fieldId]: currentValues.filter(v => v !== optionValue)
//                 };
//             }
//         });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault(); 

        
//     };

//     function getFieldIcon(type) {
//         const icons = {
//             text: "A",
//             email: "@",
//             number: "#",
//             textarea: "≡",
//             dropdown: "▼",
//             radio: "○",
//             checkbox: "☑"
//         };
//         return icons[type] || "A";
//     }

//     return (
//         <AppProvider i18n={enTranslations}>
//             <Page 
//                 title="Form Builder"
//                 subtitle="Create and customize your contact form"
//             >
//                 <BlockStack gap="500">
//                     <Grid>
//                         {/* Left Column - Form Builder */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
//                             <BlockStack gap="500">
//                                 {/* Form Settings Card */}
//                                 <Card>
//                                     <BlockStack gap="500">
//                                         <Text variant="headingLg" as="h2">Form Settings</Text>
//                                         <BlockStack gap="400">
//                                             <TextField 
//                                                 label="Form Title" 
//                                                 value={formName} 
//                                                 onChange={setFormName} 
//                                                 autoComplete="off" 
//                                                 maxLength={120} 
//                                                 showCharacterCount 
//                                                 helpText="The main heading displayed on your form"
//                                             />
//                                             <TextField 
//                                                 label="Form Description" 
//                                                 value={formDescription} 
//                                                 onChange={setFormDescription} 
//                                                 multiline={3} 
//                                                 autoComplete="off" 
//                                                 maxLength={250} 
//                                                 showCharacterCount 
//                                                 helpText="Brief description or instructions for form users"
//                                             />
//                                             {/* <InlineGrid columns={2} gap="400">
//                                                 <TextField 
//                                                     label="Success Message Title" 
//                                                     value={formSubmissionTitle} 
//                                                     onChange={setFormSubmissionTitle} 
//                                                     autoComplete="off" 
//                                                     helpText="Title shown after successful submission"
//                                                 />
                                               
//                                             </InlineGrid> */}
//                                             <TextField 
//                                                 label="Success Message Description" 
//                                                 value={successDescription} 
//                                                 onChange={setSuccessDescription} 
//                                                 multiline={2} 
//                                                 autoComplete="off" 
//                                                 helpText="Message shown to users after form submission"
//                                             />
//                                         </BlockStack>
//                                         <Box paddingBlockStart="200">
//                                             <Button 
//                                                 variant="primary" 
//                                                 size="large"
//                                                 onClick={saveFormConfig} 
//                                                 disabled={isSaving} 
//                                                 loading={isSaving}
//                                             >
//                                                 Save Form Configuration
//                                             </Button>
//                                         </Box>
//                                     </BlockStack>
//                                 </Card>

//                                 {/* Fields Management Card */}
//                                 <Card>
//                                     <BlockStack gap="500">
//                                         <InlineStack align="space-between" blockAlign="center">
//                                             <BlockStack gap="100">
//                                                 <Text variant="headingLg" as="h2">Form Fields</Text>
//                                                 <Text variant="bodySm" tone="subdued">
//                                                     Drag fields to reorder or use arrow buttons.
//                                                 </Text>
//                                             </BlockStack>
//                                             <Button 
//                                                 variant="primary" 
//                                                 onClick={openAddModal}
//                                             >
//                                                 Add Field
//                                             </Button>
//                                         </InlineStack>

//                                         <BlockStack gap="300">
//                                             {fields.length === 0 ? (
//                                                 <Box padding="600">
//                                                     <Banner tone="info">
//                                                         <BlockStack gap="200">
//                                                             <Text variant="bodyMd" fontWeight="semibold">No fields yet</Text>
//                                                             <Text variant="bodyMd">Click "Add Field" to start building your form. Remember to add at least one email field!</Text>
//                                                         </BlockStack>
//                                                     </Banner>
//                                                 </Box>
//                                             ) : (
//                                                 <BlockStack gap="300">
//                                                     {fields.map((field, index) => (
//                                                         <Box 
//                                                             key={field._id} 
//                                                             padding="400" 
//                                                             background="bg-surface-secondary" 
//                                                             borderRadius="300" 
//                                                             borderWidth="025" 
//                                                             borderColor={dragOverIndex === index ? "border-brand" : "border-secondary"}
//                                                             style={{
//                                                                 cursor: 'move',
//                                                                 transition: 'all 0.2s ease',
//                                                                 opacity: draggedIndex === index ? 0.5 : 1,
//                                                                 transform: dragOverIndex === index ? 'scale(1.02)' : 'scale(1)',
//                                                                 boxShadow: dragOverIndex === index ? '0 4px 8px rgba(0,0,0,0.1)' : 'none'
//                                                             }}
//                                                             draggable
//                                                             onDragStart={(e) => handleDragStart(e, index)}
//                                                             onDragEnd={handleDragEnd}
//                                                             onDragOver={(e) => handleDragOver(e, index)}
//                                                             onDragLeave={handleDragLeave}
//                                                             onDrop={(e) => handleDrop(e, index)}
//                                                         >
//                                                             <InlineStack gap="400" align="space-between" blockAlign="center" wrap={false}>
//                                                                 <InlineStack gap="400" blockAlign="center" wrap={false}>
//                                                                     <Box style={{ cursor: 'grab' }}>
//                                                                         <Icon source={DragHandleIcon} tone="subdued" />
//                                                                     </Box>
//                                                                     <Box 
//                                                                         background="bg-fill-info" 
//                                                                         padding="300" 
//                                                                         borderRadius="200"
//                                                                         minWidth="40px"
//                                                                     >
//                                                                         <Text 
//                                                                             variant="headingMd" 
//                                                                             tone="text-inverse" 
//                                                                             fontWeight="bold" 
//                                                                             alignment="center"
//                                                                         >
//                                                                             {getFieldIcon(field.type)}
//                                                                         </Text>
//                                                                     </Box>
//                                                                     <BlockStack gap="100">
//                                                                         <InlineStack gap="200" blockAlign="center" wrap={false}>
//                                                                             <Text variant="headingSm" fontWeight="semibold">
//                                                                                 {field.label || "Untitled Field"}
//                                                                             </Text>
//                                                                             {field.required && (
//                                                                                 <Box 
//                                                                                     background="bg-fill-critical" 
//                                                                                     padding="025" 
//                                                                                     paddingInlineStart="200"
//                                                                                     paddingInlineEnd="200"
//                                                                                     borderRadius="100"
//                                                                                 >
//                                                                                     <Text 
//                                                                                         as="span" 
//                                                                                         variant="bodySm" 
//                                                                                         fontWeight="semibold" 
//                                                                                         tone="text-inverse"
//                                                                                     >
//                                                                                         Required
//                                                                                     </Text>
//                                                                                 </Box>
//                                                                             )}
//                                                                             {field.type === "email" && (
//                                                                                 <Box 
//                                                                                     background="bg-fill-success" 
//                                                                                     padding="025" 
//                                                                                     paddingInlineStart="200"
//                                                                                     paddingInlineEnd="200"
//                                                                                     borderRadius="100"
//                                                                                 >
//                                                                                     <Text 
//                                                                                         as="span" 
//                                                                                         variant="bodySm" 
//                                                                                         fontWeight="semibold" 
//                                                                                         tone="text-inverse"
//                                                                                     >
//                                                                                         Email
//                                                                                     </Text>
//                                                                                 </Box>
//                                                                             )}
//                                                                         </InlineStack>
//                                                                         <Text variant="bodySm" tone="subdued">
//                                                                             {field.type.charAt(0).toUpperCase() + field.type.slice(1)} field
//                                                                             {field.placeholder && ` • ${field.placeholder}`}
//                                                                         </Text>
//                                                                     </BlockStack>
//                                                                 </InlineStack>

//                                                                 <InlineStack gap="100" wrap={false}>
//                                                                     <Button 
//                                                                         plain 
//                                                                         onClick={() => moveFieldUp(index)}
//                                                                         disabled={index === 0}
//                                                                         accessibilityLabel="Move field up"
//                                                                     >
//                                                                         <Icon source={ChevronUpIcon} tone="base" />
//                                                                     </Button>
//                                                                     <Button 
//                                                                         plain 
//                                                                         onClick={() => moveFieldDown(index)}
//                                                                         disabled={index === fields.length - 1}
//                                                                         accessibilityLabel="Move field down"
//                                                                     >
//                                                                         <Icon source={ChevronDownIcon} tone="base" />
//                                                                     </Button>
//                                                                     <Box 
//                                                                         borderInlineStartWidth="025" 
//                                                                         borderColor="border" 
//                                                                         paddingInlineStart="200"
//                                                                         marginInlineStart="100"
//                                                                     >
//                                                                         <InlineStack gap="100">
//                                                                             <Button 
//                                                                                 plain 
//                                                                                 onClick={() => openEditModal(field._id)}
//                                                                                 accessibilityLabel="Edit field"
//                                                                             >
//                                                                                 <Icon source={EditIcon} tone="base" />
//                                                                             </Button>
//                                                                             <Button 
//                                                                                 plain 
//                                                                                 tone="critical" 
//                                                                                 onClick={() => deleteFieldAPI(field._id)}
//                                                                                 accessibilityLabel="Delete field"
//                                                                             >
//                                                                                 <Icon source={DeleteIcon} tone="base" />
//                                                                             </Button>
//                                                                         </InlineStack>
//                                                                     </Box>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                         </Box>
//                                                     ))}
//                                                 </BlockStack>
//                                             )}
//                                         </BlockStack>

//                                         {fields.length > 0 && (
//                                             <Banner tone="info">
//                                                 <Text variant="bodySm">
//                                                     💡 Tip: Drag fields to reorder them or use arrow buttons. Changes are saved automatically after 1 second.
//                                                 </Text>
//                                             </Banner>
//                                         )}
//                                     </BlockStack>
//                                 </Card>

//                                 {saveMessage && (
//                                     <Banner 
//                                         title={saveMessage.title} 
//                                         tone={saveMessage.type === "success" ? "success" : "critical"}
//                                         onDismiss={() => setSaveMessage(null)}
//                                     >
//                                         {saveMessage.text}
//                                     </Banner>
//                                 )}
//                             </BlockStack>
//                         </Grid.Cell>

//                         {/* Right Column - Live Preview */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
//                             <Box position="sticky" insetBlockStart="400">
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <Box 
//                                             background="bg-fill-tertiary" 
//                                             padding="100" 
//                                             borderRadius="100"
//                                         >
//                                             <Text variant="bodySm" tone="subdued" alignment="center">
//                                                 Live Preview
//                                             </Text>
//                                         </Box>
//                                         <Box 
//                                             padding="600" 
//                                             background="bg-surface" 
//                                             borderRadius="400"
//                                             borderWidth="025"
//                                             borderColor="border"
//                                         >
//                                             <form onSubmit={handleFormSubmit}>
//                                                 <BlockStack gap="500">
//                                                     <BlockStack gap="200">
//                                                         <Text variant="heading2xl" as="h1">
//                                                             {formName || "Form Title"}
//                                                         </Text>
//                                                         {formDescription && (
//                                                             <Text as="p" variant="bodyLg" tone="subdued">
//                                                                 {formDescription}
//                                                             </Text>
//                                                         )}
//                                                     </BlockStack>

//                                                     {fields.length === 0 ? (
//                                                         <Box padding="800">
//                                                             <BlockStack gap="300">
//                                                                 <Text 
//                                                                     variant="bodyLg" 
//                                                                     tone="subdued" 
//                                                                     alignment="center"
//                                                                     fontWeight="semibold"
//                                                                 >
//                                                                     No fields added yet
//                                                                 </Text>
//                                                                 <Text 
//                                                                     variant="bodySm" 
//                                                                     tone="subdued" 
//                                                                     alignment="center"
//                                                                 >
//                                                                     Add fields from the left panel to see them here
//                                                                 </Text>
//                                                             </BlockStack>
//                                                         </Box>
//                                                     ) : (
//                                                         <BlockStack gap="400">
//                                                             {fields.map((f) => (
//                                                                 <BlockStack key={f._id} gap="200">
//                                                                     <Text 
//                                                                         as="label" 
//                                                                         variant="bodyMd" 
//                                                                         fontWeight="semibold"
//                                                                     >
//                                                                         {f.label || "Untitled Field"} 
//                                                                         {f.required && (
//                                                                             <Text as="span" tone="critical"> *</Text>
//                                                                         )}
//                                                                     </Text>

//                                                                     {["text", "email", "number"].includes(f.type) && (
//                                                                         <TextField 
//                                                                             type={f.type} 
//                                                                             placeholder={f.placeholder}
//                                                                             value={formData[f._id] || ""}
//                                                                             onChange={(value) => handleFieldChange(f._id, value)}
//                                                                             autoComplete="off"
//                                                                         />
//                                                                     )}

//                                                                     {f.type === "textarea" && (
//                                                                         <TextField 
//                                                                             multiline={4} 
//                                                                             placeholder={f.placeholder}
//                                                                             value={formData[f._id] || ""}
//                                                                             onChange={(value) => handleFieldChange(f._id, value)}
//                                                                             autoComplete="off"
//                                                                         />
//                                                                     )}

//                                                                     {f.type === "dropdown" && (
//                                                                         <Select 
//                                                                             options={[
//                                                                                 { label: "Select an option", value: "" }, 
//                                                                                 ...f.options.map(opt => ({ 
//                                                                                     label: opt.label, 
//                                                                                     value: opt.value 
//                                                                                 }))
//                                                                             ]}
//                                                                             value={formData[f._id] || ""}
//                                                                             onChange={(value) => handleFieldChange(f._id, value)}
//                                                                         />
//                                                                     )}

//                                                                     {f.type === "radio" && (
//                                                                         <BlockStack gap="200">
//                                                                             {f.options.map((opt, i) => (
//                                                                                 <InlineStack key={i} gap="200" blockAlign="start">
//                                                                                     <input 
//                                                                                         type="radio" 
//                                                                                         name={`field-${f._id}`} 
//                                                                                         value={opt.value}
//                                                                                         checked={formData[f._id] === opt.value}
//                                                                                         onChange={(e) => handleFieldChange(f._id, e.target.value)}
//                                                                                         id={`field-${f._id}-${i}`}
//                                                                                         style={{ marginTop: '2px' }}
//                                                                                     />
//                                                                                     <Text 
//                                                                                         as="label" 
//                                                                                         htmlFor={`field-${f._id}-${i}`} 
//                                                                                         variant="bodyMd"
//                                                                                     >
//                                                                                         {opt.label}
//                                                                                     </Text>
//                                                                                 </InlineStack>
//                                                                             ))}
//                                                                         </BlockStack>
//                                                                     )}

//                                                                     {f.type === "checkbox" && (
//                                                                         <BlockStack gap="200">
//                                                                             {f.options.map((opt, i) => (
//                                                                                 <Checkbox 
//                                                                                     key={i} 
//                                                                                     label={opt.label}
//                                                                                     checked={(formData[f._id] || []).includes(opt.value)}
//                                                                                     onChange={(checked) => handleCheckboxChange(f._id, opt.value, checked)}
//                                                                                 />
//                                                                             ))}
//                                                                         </BlockStack>
//                                                                     )}
//                                                                 </BlockStack>
//                                                             ))}

//                                                             <Box disabled={true} paddingBlockStart="300">
//                                                                 <Button 
//                                                                     variant="primary" 
//                                                                     submit
//                                                                     size="large"
//                                                                     fullWidth 
//                                                                      disabled={isSubmitting}
//                                                                 >
//                                                                     {submitButtonIcon} {submitButtonText}
//                                                                 </Button>
//                                                             </Box>
//                                                         </BlockStack>
//                                                     )}
//                                                 </BlockStack>
//                                             </form>
//                                         </Box>
//                                     </BlockStack>
//                                 </Card>
//                             </Box>
//                         </Grid.Cell>
//                     </Grid>
//                 </BlockStack>

//                 {/* All Modals */}
//                 <Modal
//                     open={isModalOpen}
//                     onClose={closeModal}
//                     title={modalMode === "add" ? "Add New Field" : "Edit Field"}
//                     primaryAction={{ content: "Save Field", onAction: handleModalSave }}
//                     secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
//                 >
//                     <Modal.Section>
//                         <FormLayout>
//                             <TextField
//                                 label="Field Label"
//                                 placeholder="e.g., Full Name, Phone Number"
//                                 value={currentField.label}
//                                 onChange={(value) => updateCurrentField("label", value)}
//                                 autoComplete="off"
//                                 helpText="The label that appears above this field"
//                             />

//                             <Select
//                                 label="Field Type"
//                                 options={[
//                                     { label: "Text Input", value: "text" },
//                                     { label: "Email Input", value: "email" },
//                                     { label: "Number Input", value: "number" },
//                                     { label: "Textarea", value: "textarea" },
//                                     { label: "Dropdown Select", value: "dropdown" },
//                                     { label: "Radio Group", value: "radio" },
//                                     { label: "Checkbox Group", value: "checkbox" },
//                                 ]}
//                                 value={currentField.type}
//                                 onChange={(value) => updateCurrentField("type", value)}
//                                 helpText="Select the type of input for this field"
//                             />

//                             {["text", "email", "number", "textarea"].includes(currentField.type) && (
//                                 <TextField
//                                     label="Placeholder Text"
//                                     placeholder="e.g., Enter your email address"
//                                     value={currentField.placeholder}
//                                     onChange={(value) => updateCurrentField("placeholder", value)}
//                                     autoComplete="off"
//                                     helpText="Hint text shown inside the field"
//                                 />
//                             )}

//                             <Checkbox
//                                 label="Required Field"
//                                 checked={currentField.required}
//                                 onChange={(checked) => updateCurrentField("required", checked)}
//                                 helpText={
//                                     currentField.type === "email" 
//                                         ? "Email fields are always required" 
//                                         : "Users must fill this field before submitting"
//                                 }
//                                 disabled={currentField.type === "email"}
//                             />

//                             {["dropdown", "radio", "checkbox"].includes(currentField.type) && (
//                                 <Box 
//                                     padding="400" 
//                                     background="bg-surface-secondary" 
//                                     borderRadius="300"
//                                 >
//                                     <BlockStack gap="400">
//                                         <InlineStack align="space-between" blockAlign="center">
//                                             <Text variant="bodyMd" fontWeight="semibold">
//                                                 Options
//                                             </Text>
//                                             <Button size="slim" onClick={addOption}>
//                                                 Add Option
//                                             </Button>
//                                         </InlineStack>

//                                         {currentField.options.length === 0 ? (
//                                             <Text variant="bodySm" tone="subdued">
//                                                 No options added yet. Click "Add Option" to create choices for this field.
//                                             </Text>
//                                         ) : (
//                                             <BlockStack gap="200">
//                                                 {currentField.options.map((opt, i) => (
//                                                     <Box 
//                                                         key={i} 
//                                                         padding="300" 
//                                                         background="bg-surface" 
//                                                         borderRadius="200"
//                                                     >
//                                                         <BlockStack gap="200">
//                                                             <InlineStack align="space-between">
//                                                                 <Text variant="bodyMd" fontWeight="semibold">
//                                                                     Option {i + 1}
//                                                                 </Text>
//                                                                 <InlineStack gap="100">
//                                                                     <Button 
//                                                                         size="slim" 
//                                                                         onClick={() => editOption(i)}
//                                                                     >
//                                                                         <Icon source={EditIcon} tone="base" />
//                                                                     </Button>
//                                                                     <Button 
//                                                                         size="slim" 
//                                                                         tone="critical" 
//                                                                         onClick={() => deleteOption(i)}
//                                                                     >
//                                                                         <Icon source={DeleteIcon} tone="base" />
//                                                                     </Button>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                             <InlineGrid columns={2} gap="200">
//                                                                 <Box>
//                                                                     <BlockStack gap="100">
//                                                                         <Text variant="bodySm" tone="subdued">
//                                                                             Display Label
//                                                                         </Text>
//                                                                         <Text variant="bodyMd" fontWeight="medium">
//                                                                             {opt.label}
//                                                                         </Text>
//                                                                     </BlockStack>
//                                                                 </Box>
//                                                                 <Box>
//                                                                     <BlockStack gap="100">
//                                                                         <Text variant="bodySm" tone="subdued">
//                                                                             Saved Value
//                                                                         </Text>
//                                                                         <Text variant="bodyMd" fontWeight="medium">
//                                                                             {opt.value}
//                                                                         </Text>
//                                                                     </BlockStack>
//                                                                 </Box>
//                                                             </InlineGrid>
//                                                         </BlockStack>
//                                                     </Box>
//                                                 ))}
//                                             </BlockStack>
//                                         )}
//                                     </BlockStack>
//                                 </Box>
//                             )}
//                         </FormLayout>
//                     </Modal.Section>
//                 </Modal>

//                 <Modal
//                     open={validationPopup.isOpen}
//                     onClose={closeValidationPopup}
//                     title="Validation Error"
//                     primaryAction={{
//                         content: "OK",
//                         onAction: closeValidationPopup
//                     }}
//                 >
//                     <Modal.Section>
//                         <Text variant="bodyMd">{validationPopup.message}</Text>
//                     </Modal.Section>
//                 </Modal>

//                 <Modal
//                     open={confirmationPopup.isOpen}
//                     onClose={closeConfirmationPopup}
//                     title={confirmationPopup.title}
//                     primaryAction={{
//                         content: "Confirm",
//                         onAction: handleConfirmAction,
//                         destructive: true
//                     }}
//                     secondaryActions={[{
//                         content: "Cancel",
//                         onAction: closeConfirmationPopup
//                     }]}
//                 >
//                     <Modal.Section>
//                         <Text variant="bodyMd">{confirmationPopup.message}</Text>
//                     </Modal.Section>
//                 </Modal>

//                 <Modal
//                     open={optionInputPopup.isOpen}
//                     onClose={closeOptionInputPopup}
//                     title={optionInputPopup.mode === "add" ? "Add Option" : "Edit Option"}
//                     primaryAction={{
//                         content: "Save Option",
//                         onAction: handleSaveOption
//                     }}
//                     secondaryActions={[{
//                         content: "Cancel",
//                         onAction: closeOptionInputPopup
//                     }]}
//                 >
//                     <Modal.Section>
//                         <FormLayout>
//                             <TextField
//                                 label="Option Label (Display Text)"
//                                 placeholder="e.g., Small, Medium, Large"
//                                 value={optionInputPopup.label}
//                                 onChange={(value) => setOptionInputPopup({
//                                     ...optionInputPopup, 
//                                     label: value,
//                                     value: optionInputPopup.mode === "add" && !optionInputPopup.value 
//                                         ? value.toLowerCase().replace(/\s+/g, "_")
//                                         : optionInputPopup.value
//                                 })}
//                                 autoComplete="off"
//                                 helpText="This is what users will see in the form"
//                             />
//                             <TextField
//                                 label="Option Value (Saved Value)"
//                                 placeholder="e.g., small, medium, large"
//                                 value={optionInputPopup.value}
//                                 onChange={(value) => setOptionInputPopup({...optionInputPopup, value: value})}
//                                 autoComplete="off"
//                                 helpText="This value will be saved in the database"
//                             />
//                         </FormLayout>
//                     </Modal.Section>
//                 </Modal>
//             </Page>
//         </AppProvider>
//     );
// }










import { useState, useEffect, useRef } from "react";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import {
    AppProvider,
    Page,
    Card,
    Text,
    TextField,
    Select,
    Button,
    Checkbox,
    BlockStack,
    InlineStack,
    InlineGrid,
    Grid,
    Box,
    Banner,
    Modal,
    FormLayout,
    Icon,
    Spinner,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
    EditIcon, DeleteIcon, ChevronUpIcon, ChevronDownIcon, DragHandleIcon
} from '@shopify/polaris-icons';

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(`
    query {
      shop {
        id
        name
        myshopifyDomain
      }
    }
  `);

    const data = await response.json();
    return json({
        shop: data.data?.shop || { id: "", myshopifyDomain: "" },
    });
};

export default function CustomizeForm() {
    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [submitButtonText, setSubmitButtonText] = useState("Submit");
    const [submitButtonIcon, setSubmitButtonIcon] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [saveMessage, setSaveMessage] = useState(null);
    const [formSubmissionTitle, setFormSubmissionTitle] = useState("");
    const [successDescription, setSuccessDescription] = useState("");
    const { shop } = useLoaderData();
    const [fields, setFields] = useState([]);
    const [isLoadingFields, setIsLoadingFields] = useState(false);
    const [isAddingField, setIsAddingField] = useState(false);
    const [isUpdatingField, setIsUpdatingField] = useState(false);
    const [isDeletingField, setIsDeletingField] = useState(false);
    
    // Debounce timer reference
    const reorderTimeoutRef = useRef(null);
    
    // ✅ NEW: Drag and drop state
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    
    const [validationPopup, setValidationPopup] = useState({
        isOpen: false,
        message: ""
    });

    const [confirmationPopup, setConfirmationPopup] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null
    });

    const [currentField, setCurrentField] = useState({
        label: "",
        type: "text",
        placeholder: "",
        required: false,
        options: [],
    });

    const [optionInputPopup, setOptionInputPopup] = useState({
        isOpen: false,
        mode: "add",
        editIndex: null,
        label: "",
        value: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch existing fields
    const fetchFields = async () => {
        setIsLoadingFields(true);
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${shopIdOnly}`);

            if (response.ok) {
                const result = await response.json();

                console.log(result)
                console.log(result.data.formTemplates[0].name)
                setFormName(result.data.formTemplates[0].name)
                setFormDescription(result.data.formTemplates[0].description);
                setSuccessDescription(result.data.formTemplates[0].successdescription);
                setFields(result.data.formTemplates[0].fields || []);
            }
        } catch (error) {
            console.error("Error fetching fields:", error);
        } finally {
            setIsLoadingFields(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, [shop.id]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (reorderTimeoutRef.current) {
                clearTimeout(reorderTimeoutRef.current);
            }
        };
    }, []);

    const showValidationPopup = (message) => {
        setValidationPopup({
            isOpen: true,
            message: message
        });
    };

    const closeValidationPopup = () => {
        setValidationPopup({
            isOpen: false,
            message: ""
        });
    };

    const showConfirmationPopup = (title, message, onConfirm) => {
        setConfirmationPopup({
            isOpen: true,
            title: title,
            message: message,
            onConfirm: onConfirm
        });
    };

    const closeConfirmationPopup = () => {
        setConfirmationPopup({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: null
        });
    };

    const handleConfirmAction = () => {
        if (confirmationPopup.onConfirm) {
            confirmationPopup.onConfirm();
        }
        closeConfirmationPopup();
    };

    const openAddModal = () => {
        setModalMode("add");
        setCurrentField({
            label: "",
            type: "text",
            placeholder: "",
            required: false,
            options: [],
        });
        setSelectedFieldId(null);
        setIsModalOpen(true);
    };

    const openEditModal = async (fieldId) => {
        const fieldToEdit = fields.find((f) => f._id === fieldId);

        if (!fieldToEdit) {
            setSaveMessage({ type: "error", text: "❌ Field not found" });
            setTimeout(() => setSaveMessage(null), 5000);
            return;
        }

        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${fieldId}`
            );

            if (response.ok) {
                const result = await response.json();
                const fieldType = result.data.type || "text";
                setModalMode("edit");
                setSelectedFieldId(fieldId);
                setCurrentField({
                    label: fieldType === "email" ? "email" : (result.data.label || ""),
                    type: fieldType,
                    placeholder: result.data.placeholder || "",
                    required: fieldType === "email" ? true : (result.data.required || false),
                    options: result.data.options || [],
                });
                setIsModalOpen(true);
            } else {
                console.warn("API call failed, using existing field data");
                const fieldType = fieldToEdit.type || "text";
                setModalMode("edit");
                setSelectedFieldId(fieldId);
                setCurrentField({
                    label: fieldType === "email" ? "email" : (fieldToEdit.label || ""),
                    type: fieldType,
                    placeholder: fieldToEdit.placeholder || "",
                    required: fieldType === "email" ? true : (fieldToEdit.required || false),
                    options: fieldToEdit.options || [],
                });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching field data:", error);
            const fieldType = fieldToEdit.type || "text";
            setModalMode("edit");
            setSelectedFieldId(fieldId);
            setCurrentField({
                label: fieldType === "email" ? "email" : (fieldToEdit.label || ""),
                type: fieldType,
                placeholder: fieldToEdit.placeholder || "",
                required: fieldType === "email" ? true : (fieldToEdit.required || false),
                options: fieldToEdit.options || [],
            });
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFieldId(null);
        setCurrentField({
            label: "",
            type: "text",
            placeholder: "",
            required: false,
            options: [],
        });
    };

    const addFieldAPI = async () => {
        setIsAddingField(true);
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fieldData: currentField }),
                }
            );

            if (response.ok) {
                setSaveMessage({ type: "success", text: "✅ Field added successfully!" });
                setTimeout(() => setSaveMessage(null), 5000);
                await fetchFields();
                closeModal();
            } else {
                const errText = await response.text();
                setSaveMessage({ type: "error", text: `❌ Error adding field: ${errText}` });
                setTimeout(() => setSaveMessage(null), 5000);
            }
        } catch (err) {
            console.error("Network error while adding field:", err);
            setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
            setTimeout(() => setSaveMessage(null), 5000);
        } finally {
            setIsAddingField(false);
        }
    };

    const updateFieldAPI = async () => {
        setIsUpdatingField(true);
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${selectedFieldId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fieldData: currentField }),
                }
            );

            if (response.ok) {
                setSaveMessage({ type: "success", text: "✅ Field updated successfully!" });
                setTimeout(() => setSaveMessage(null), 5000);
                await fetchFields();
                closeModal();
            } else {
                const errText = await response.text();
                setSaveMessage({ type: "error", text: `❌ Error updating field: ${errText}` });
                setTimeout(() => setSaveMessage(null), 5000);
            }
        } catch (err) {
            console.error("Network error while updating field:", err);
            setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
            setTimeout(() => setSaveMessage(null), 5000);
        } finally {
            setIsUpdatingField(false);
        }
    };

    const deleteFieldAPI = async (fieldId) => {
        showConfirmationPopup(
            "Delete Field",
            "Are you sure you want to delete this field? This action cannot be undone.",
            async () => {
                setIsDeletingField(true);
                try {
                    const shopIdOnly = shop.id.split("/").pop();
                    const response = await fetch(
                        `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/field/${fieldId}`,
                        { method: "DELETE" }
                    );

                    if (response.ok) {
                        setSaveMessage({ type: "success", text: "✅ Field deleted successfully!" });
                        setTimeout(() => setSaveMessage(null), 5000);
                        await fetchFields();
                    } else {
                        const errText = await response.text();
                        setSaveMessage({ type: "error", text: `❌ Error deleting field: ${errText}` });
                        setTimeout(() => setSaveMessage(null), 5000);
                    }
                } catch (err) {
                    console.error("Network error while deleting field:", err);
                    setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
                    setTimeout(() => setSaveMessage(null), 5000);
                } finally {
                    setIsDeletingField(false);
                }
            }
        );
    };

    const validateFieldData = () => {
        if (currentField.type !== "email" && !currentField.label.trim()) {
            showValidationPopup("Please enter a field label");
            return false;
        }

        if (currentField.type === "email") {
            // Email fields always have " email" as label
            if (!currentField.label || currentField.label.trim() === "") {
                setCurrentField({ ...currentField, label: "email" });
            }
            // Email fields are always required
            if (!currentField.required) {
                setCurrentField({ ...currentField, required: true });
            }
        }

        if (["dropdown", "radio", "checkbox"].includes(currentField.type)) {
            if (currentField.options.length === 0) {
                showValidationPopup(`Please add at least one option for ${currentField.type} field`);
                return false;
            }
        }

        return true;
    };

    const handleModalSave = () => {
        // Ensure email fields always have correct label and required status
        if (currentField.type === "email") {
            setCurrentField({
                ...currentField,
                label: "email",
                required: true
            });
        }

        if (!validateFieldData()) {
            return;
        }

        if (modalMode === "add") {
            addFieldAPI();
        } else {
            updateFieldAPI();
        }
    };

    const updateCurrentField = (key, value) => {
        if (key === "type" && value === "email") {
            setCurrentField({ 
                ...currentField, 
                [key]: value, 
                required: true,
                label: "email"
            });
        } else if (key === "label" && currentField.type === "email") {
            // Prevent label changes for email fields
            return;
        } else {
            setCurrentField({ ...currentField, [key]: value });
        }
    };

    const openAddOptionPopup = () => {
        setOptionInputPopup({
            isOpen: true,
            mode: "add",
            editIndex: null,
            label: "",
            value: ""
        });
    };

    const openEditOptionPopup = (index) => {
        const currentOption = currentField.options[index];
        if (!currentOption) return;

        setOptionInputPopup({
            isOpen: true,
            mode: "edit",
            editIndex: index,
            label: currentOption.label,
            value: currentOption.value
        });
    };

    const closeOptionInputPopup = () => {
        setOptionInputPopup({
            isOpen: false,
            mode: "add",
            editIndex: null,
            label: "",
            value: ""
        });
    };

    const handleSaveOption = () => {
        if (!optionInputPopup.label.trim()) {
            showValidationPopup("Please enter an option label");
            return;
        }
        if (!optionInputPopup.value.trim()) {
            showValidationPopup("Please enter an option value");
            return;
        }

        if (optionInputPopup.mode === "add") {
            setCurrentField({
                ...currentField,
                options: [...currentField.options, { 
                    label: optionInputPopup.label, 
                    value: optionInputPopup.value 
                }],
            });
        } else {
            const updatedOptions = currentField.options.map((opt, i) =>
                i === optionInputPopup.editIndex 
                    ? { label: optionInputPopup.label, value: optionInputPopup.value } 
                    : opt
            );
            setCurrentField({ ...currentField, options: updatedOptions });
        }
        closeOptionInputPopup();
    };

    const addOption = () => {
        openAddOptionPopup();
    };

    const editOption = (index) => {
        openEditOptionPopup(index);
    };

    const deleteOption = (index) => {
        showConfirmationPopup(
            "Delete Option",
            "Are you sure you want to delete this option?",
            () => {
                const updatedOptions = currentField.options.filter((_, i) => i !== index);
                setCurrentField({ ...currentField, options: updatedOptions });
            }
        );
    };

    const validateForm = () => {
        const hasEmailField = fields.some(field => field.type === "email");
        
        if (!hasEmailField) {
            showValidationPopup("Form must contain at least one Email field before saving.");
            return false;
        }

        return true;
    };

    async function saveFormConfig() {
        if (!validateForm()) {
            return;
        }

        setIsSaving(true);
        const payload = {
            storeName: shop.myshopifyDomain,
            formData: {
                name: formName,
                description: formDescription,
                formSubmissionTitle,
                successdescription :successDescription,
                meta: { createdBy: "AdminUser", published: false },
            },
        };

        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(`https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSaveMessage({ type: "success", title: formSubmissionTitle, text: successDescription });
                setTimeout(() => setSaveMessage(null), 5000);
            } else {
                const errText = await response.text();
                setSaveMessage({ type: "error", text: `❌ Error saving form: ${errText}` });
                setTimeout(() => setSaveMessage(null), 5000);
            }
        } catch (error) {
            setSaveMessage({ type: "error", text: `❌ Network error: ${error.message}` });
            setTimeout(() => setSaveMessage(null), 5000);
        } finally {
            setIsSaving(false);
        }
    }

    // Debounced field order update
    const updateFieldOrderDebounced = (orderedFields) => {
        // Clear previous timeout
        if (reorderTimeoutRef.current) {
            clearTimeout(reorderTimeoutRef.current);
        }

        // Set new timeout - API call થશે 1 second પછી
        reorderTimeoutRef.current = setTimeout(async () => {
            try {
                const shopIdOnly = shop.id.split("/").pop();
                const fieldIds = orderedFields.map(f => f._id.toString());
                
                const response = await fetch(
                    `https://nodejs-qvgm.onrender.com/api/form/${shopIdOnly}/fields/reorder`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ fieldIds }),
                    }
                );

                if (response.ok) {
                    setSaveMessage({ type: "success", text: "✅ Field order updated!" });
                    setTimeout(() => setSaveMessage(null), 3000);
                } else {
                    const errText = await response.text();
                    console.error("Reorder error:", errText);
                    setSaveMessage({ type: "error", text: "❌ Failed to update order" });
                    setTimeout(() => setSaveMessage(null), 3000);
                }
            } catch (err) {
                console.error("Error updating field order:", err);
                setSaveMessage({ type: "error", text: "❌ Network error" });
                setTimeout(() => setSaveMessage(null), 3000);
            }
        }, 1000); // 1 second wait
    };

    // Move field up
    const moveFieldUp = (index) => {
        if (index === 0) return;
        
        const newFields = [...fields];
        [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
        setFields(newFields);
        
        // Call debounced update
        updateFieldOrderDebounced(newFields);
    };

    // Move field down
    const moveFieldDown = (index) => {
        if (index === fields.length - 1) return;
        
        const newFields = [...fields];
        [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
        setFields(newFields);
        
        // Call debounced update
        updateFieldOrderDebounced(newFields);
    };

    // ✅ NEW: Drag and Drop handlers
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Add a slight delay to show drag preview
        e.currentTarget.style.opacity = "0.5";
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = "1";
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        
        if (draggedIndex === null || draggedIndex === index) return;
        
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newFields = [...fields];
        const draggedField = newFields[draggedIndex];
        
        // Remove from old position
        newFields.splice(draggedIndex, 1);
        
        // Insert at new position
        newFields.splice(dropIndex, 0, draggedField);
        
        // Update state
        setFields(newFields);
        
        // Call debounced API update
        updateFieldOrderDebounced(newFields);
        
        // Reset drag state
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleFieldChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleCheckboxChange = (fieldId, optionValue, checked) => {
        setFormData(prev => {
            const currentValues = prev[fieldId] || [];
            if (checked) {
                return {
                    ...prev,
                    [fieldId]: [...currentValues, optionValue]
                };
            } else {
                return {
                    ...prev,
                    [fieldId]: currentValues.filter(v => v !== optionValue)
                };
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 

        
    };

    function getFieldIcon(type) {
        const icons = {
            text: "A",
            email: "@",
            number: "#",
            textarea: "≡",
            dropdown: "▼",
            radio: "○",
            checkbox: "☑"
        };
        return icons[type] || "A";
    }

    return (
        <AppProvider i18n={enTranslations}>
            <Page 
                title="Form Builder"
                subtitle="Create and customize your contact form"
            >
                <BlockStack gap="500">
                    <Grid>
                        {/* Left Column - Form Builder */}
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
                            <BlockStack gap="500">
                                {/* Form Settings Card */}
                                <Card>
                                    <BlockStack gap="500">
                                        <Text variant="headingLg" as="h2">Form Settings</Text>
                                        <BlockStack gap="400">
                                            <TextField 
                                                label="Form Title" 
                                                value={formName} 
                                                onChange={setFormName} 
                                                autoComplete="off" 
                                                maxLength={120} 
                                                showCharacterCount 
                                                helpText="The main heading displayed on your form"
                                            />
                                            <TextField 
                                                label="Form Description" 
                                                value={formDescription} 
                                                onChange={setFormDescription} 
                                                multiline={3} 
                                                autoComplete="off" 
                                                maxLength={250} 
                                                showCharacterCount 
                                                helpText="Brief description or instructions for form users"
                                            />
                                            <TextField 
                                                label="Success Message Description" 
                                                value={successDescription} 
                                                onChange={setSuccessDescription} 
                                                multiline={2} 
                                                autoComplete="off" 
                                                helpText="Message shown to users after form submission"
                                            />
                                        </BlockStack>
                                        <Box paddingBlockStart="200">
                                            <Button 
                                                variant="primary" 
                                                size="large"
                                                onClick={saveFormConfig} 
                                                disabled={isSaving} 
                                                loading={isSaving}
                                            >
                                                Save Form Configuration
                                            </Button>
                                        </Box>
                                    </BlockStack>
                                </Card>

                                {/* Fields Management Card */}
                                <Card>
                                    <BlockStack gap="500">
                                        <InlineStack align="space-between" blockAlign="center">
                                            <BlockStack gap="100">
                                                <Text variant="headingLg" as="h2">Form Fields</Text>
                                                <Text variant="bodySm" tone="subdued">
                                                    Drag fields to reorder or use arrow buttons.
                                                </Text>
                                            </BlockStack>
                                            <Button 
                                                variant="primary" 
                                                onClick={openAddModal}
                                            >
                                                Add Field
                                            </Button>
                                        </InlineStack>

                                        {isLoadingFields ? (
                                            <Box padding="600">
                                                <InlineStack align="center" blockAlign="center">
                                                    <Spinner size="large" />
                                                    <Text variant="bodyMd" tone="subdued">Loading fields...</Text>
                                                </InlineStack>
                                            </Box>
                                        ) : (
                                            <BlockStack gap="300">
                                                {fields.length === 0 ? (
                                                    <Box padding="600">
                                                        <Banner tone="info">
                                                            <BlockStack gap="200">
                                                                <Text variant="bodyMd" fontWeight="semibold">No fields yet</Text>
                                                                <Text variant="bodyMd">Click "Add Field" to start building your form. Remember to add at least one email field!</Text>
                                                            </BlockStack>
                                                        </Banner>
                                                    </Box>
                                                ) : (
                                                    <BlockStack gap="300">
                                                        {fields.map((field, index) => (
                                                            <Box 
                                                                key={field._id} 
                                                                padding="400" 
                                                                background="bg-surface-secondary" 
                                                                borderRadius="300" 
                                                                borderWidth="025" 
                                                                borderColor={dragOverIndex === index ? "border-brand" : "border-secondary"}
                                                                style={{
                                                                    cursor: 'move',
                                                                    transition: 'all 0.2s ease',
                                                                    opacity: draggedIndex === index ? 0.5 : 1,
                                                                    transform: dragOverIndex === index ? 'scale(1.02)' : 'scale(1)',
                                                                    boxShadow: dragOverIndex === index ? '0 4px 8px rgba(0,0,0,0.1)' : 'none'
                                                                }}
                                                                draggable
                                                                onDragStart={(e) => handleDragStart(e, index)}
                                                                onDragEnd={handleDragEnd}
                                                                onDragOver={(e) => handleDragOver(e, index)}
                                                                onDragLeave={handleDragLeave}
                                                                onDrop={(e) => handleDrop(e, index)}
                                                            >
                                                                <InlineStack gap="400" align="space-between" blockAlign="center" wrap={false}>
                                                                    <InlineStack gap="400" blockAlign="center" wrap={false}>
                                                                        <Box style={{ cursor: 'grab' }}>
                                                                            <Icon source={DragHandleIcon} tone="subdued" />
                                                                        </Box>
                                                                        <Box 
                                                                        style={{ backgroundColor: "#007B60" ,padding:"10px",borderRadius:"5px"}}
                                                                            padding="300" 
                                                                            borderRadius="200"
                                                                            minWidth="40px"
                                                                        >
                                                                            <Text 
                                                                                variant="headingMd" 
                                                                                tone="text-inverse" 
                                                                                fontWeight="bold" 
                                                                                alignment="center"
                                                                            >
                                                                                {getFieldIcon(field.type)}
                                                                            </Text>
                                                                        </Box>
                                                                        <BlockStack gap="100">
                                                                            <InlineStack gap="200" blockAlign="center" wrap={false}>
                                                                                <Text variant="headingSm" fontWeight="semibold">
                                                                                    {field.label || "Untitled Field"}
                                                                                </Text>
                                                                                {field.required && (
                                                                                    <Box 
                                                                                        background="bg-fill-critical" 
                                                                                        padding="025" 
                                                                                        paddingInlineStart="200"
                                                                                        paddingInlineEnd="200"
                                                                                        borderRadius="100"
                                                                                    >
                                                                                        <Text 
                                                                                            as="span" 
                                                                                            variant="bodySm" 
                                                                                            fontWeight="semibold" 
                                                                                            tone="text-inverse"
                                                                                        >
                                                                                            Required
                                                                                        </Text>
                                                                                    </Box>
                                                                                )}
                                                                                {field.type === "email" && (
                                                                                    <Box 
                                                                                        background="bg-fill-success" 
                                                                                        padding="025" 
                                                                                        paddingInlineStart="200"
                                                                                        paddingInlineEnd="200"
                                                                                        borderRadius="100"
                                                                                    >
                                                                                        <Text 
                                                                                            as="span" 
                                                                                            variant="bodySm" 
                                                                                            fontWeight="semibold" 
                                                                                            tone="text-inverse"
                                                                                        >
                                                                                            Email
                                                                                        </Text>
                                                                                    </Box>
                                                                                )}
                                                                            </InlineStack>
                                                                            <Text variant="bodySm" tone="subdued">
                                                                                {field.type.charAt(0).toUpperCase() + field.type.slice(1)} field
                                                                                {field.placeholder && ` • ${field.placeholder}`}
                                                                            </Text>
                                                                        </BlockStack>
                                                                    </InlineStack>

                                                                    <InlineStack gap="100" wrap={false}>
                                                                        <Button 
                                                                            plain 
                                                                            onClick={() => moveFieldUp(index)}
                                                                            disabled={index === 0}
                                                                            accessibilityLabel="Move field up"
                                                                        >
                                                                            <Icon source={ChevronUpIcon} tone="base" />
                                                                        </Button>
                                                                        <Button 
                                                                            plain 
                                                                            onClick={() => moveFieldDown(index)}
                                                                            disabled={index === fields.length - 1}
                                                                            accessibilityLabel="Move field down"
                                                                        >
                                                                            <Icon source={ChevronDownIcon} tone="base" />
                                                                        </Button>
                                                                        <Box 
                                                                            borderInlineStartWidth="025" 
                                                                            borderColor="border" 
                                                                            paddingInlineStart="200"
                                                                            marginInlineStart="100"
                                                                        >
                                                                            <InlineStack gap="100">
                                                                                <Button 
                                                                                    plain 
                                                                                    onClick={() => openEditModal(field._id)}
                                                                                    accessibilityLabel="Edit field"
                                                                                >
                                                                                    <Icon source={EditIcon} tone="base" />
                                                                                </Button>
                                                                                <Button 
                                                                                    plain 
                                                                                    tone="critical" 
                                                                                    onClick={() => deleteFieldAPI(field._id)}
                                                                                    accessibilityLabel="Delete field"
                                                                                    loading={isDeletingField}
                                                                                >
                                                                                    <Icon source={DeleteIcon} tone="base" />
                                                                                </Button>
                                                                            </InlineStack>
                                                                        </Box>
                                                                    </InlineStack>
                                                                </InlineStack>
                                                            </Box>
                                                        ))}
                                                    </BlockStack>
                                                )}
                                            </BlockStack>
                                        )}

                                        {fields.length > 0 && (
                                            <Banner tone="info">
                                                <Text variant="bodySm">
                                                    💡 Tip: Drag fields to reorder them or use arrow buttons. Changes are saved automatically after 1 second.
                                                </Text>
                                            </Banner>
                                        )}
                                    </BlockStack>
                                </Card>

                                {saveMessage && (
                                    <Banner 
                                        title={saveMessage.title} 
                                        tone={saveMessage.type === "success" ? "success" : "critical"}
                                        onDismiss={() => setSaveMessage(null)}
                                    >
                                        {saveMessage.text}
                                    </Banner>
                                )}
                            </BlockStack>
                        </Grid.Cell>

                        {/* Right Column - Live Preview */}
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
                            <Box position="sticky" insetBlockStart="400">
                                <Card>
                                    <BlockStack gap="400">
                                        <Box 
                                            background="bg-fill-tertiary" 
                                            padding="100" 
                                            borderRadius="100"
                                        >
                                            <Text variant="bodySm" tone="subdued" alignment="center">
                                                Live Preview
                                            </Text>
                                        </Box>
                                        <Box 
                                            padding="600" 
                                            background="bg-surface" 
                                            borderRadius="400"
                                            borderWidth="025"
                                            borderColor="border"
                                        >
                                            <form onSubmit={handleFormSubmit}>
                                                <BlockStack gap="500">
                                                    <BlockStack gap="200">
                                                        <Text variant="heading2xl" as="h1">
                                                            {formName || "Form Title"}
                                                        </Text>
                                                        {formDescription && (
                                                            <Text as="p" variant="bodyLg" tone="subdued">
                                                                {formDescription}
                                                            </Text>
                                                        )}
                                                    </BlockStack>

                                                    {fields.length === 0 ? (
                                                        <Box padding="800">
                                                            <BlockStack gap="300">
                                                                <Text 
                                                                    variant="bodyLg" 
                                                                    tone="subdued" 
                                                                    alignment="center"
                                                                    fontWeight="semibold"
                                                                >
                                                                    No fields added yet
                                                                </Text>
                                                                <Text 
                                                                    variant="bodySm" 
                                                                    tone="subdued" 
                                                                    alignment="center"
                                                                >
                                                                    Add fields from the left panel to see them here
                                                                </Text>
                                                            </BlockStack>
                                                        </Box>
                                                    ) : (
                                                        <BlockStack gap="400">
                                                            {fields.map((f) => (
                                                                <BlockStack key={f._id} gap="200">
                                                                    <Text 
                                                                        as="label" 
                                                                        variant="bodyMd" 
                                                                        fontWeight="semibold"
                                                                    >
                                                                        {f.label || "Untitled Field"} 
                                                                        {f.required && (
                                                                            <Text as="span" tone="critical"> *</Text>
                                                                        )}
                                                                    </Text>

                                                                    {["text", "email", "number"].includes(f.type) && (
                                                                        <TextField 
                                                                            type={f.type} 
                                                                            placeholder={f.placeholder}
                                                                            value={formData[f._id] || ""}
                                                                            onChange={(value) => handleFieldChange(f._id, value)}
                                                                            autoComplete="off"
                                                                        />
                                                                    )}

                                                                    {f.type === "textarea" && (
                                                                        <TextField 
                                                                            multiline={4} 
                                                                            placeholder={f.placeholder}
                                                                            value={formData[f._id] || ""}
                                                                            onChange={(value) => handleFieldChange(f._id, value)}
                                                                            autoComplete="off"
                                                                        />
                                                                    )}

                                                                    {f.type === "dropdown" && (
                                                                        <Select 
                                                                            options={[
                                                                                { label: "Select an option", value: "" }, 
                                                                                ...f.options.map(opt => ({ 
                                                                                    label: opt.label, 
                                                                                    value: opt.value 
                                                                                }))
                                                                            ]}
                                                                            value={formData[f._id] || ""}
                                                                            onChange={(value) => handleFieldChange(f._id, value)}
                                                                        />
                                                                    )}

                                                                    {f.type === "radio" && (
                                                                        <BlockStack gap="200">
                                                                            {f.options.map((opt, i) => (
                                                                                <InlineStack key={i} gap="200" blockAlign="start">
                                                                                    <input 
                                                                                        type="radio" 
                                                                                        name={`field-${f._id}`} 
                                                                                        value={opt.value}
                                                                                        checked={formData[f._id] === opt.value}
                                                                                        onChange={(e) => handleFieldChange(f._id, e.target.value)}
                                                                                        id={`field-${f._id}-${i}`}
                                                                                        style={{ marginTop: '2px' }}
                                                                                    />
                                                                                    <Text 
                                                                                        as="label" 
                                                                                        htmlFor={`field-${f._id}-${i}`} 
                                                                                        variant="bodyMd"
                                                                                    >
                                                                                        {opt.label}
                                                                                    </Text>
                                                                                </InlineStack>
                                                                            ))}
                                                                        </BlockStack>
                                                                    )}

                                                                    {f.type === "checkbox" && (
                                                                        <BlockStack gap="200">
                                                                            {f.options.map((opt, i) => (
                                                                                <Checkbox 
                                                                                    key={i} 
                                                                                    label={opt.label}
                                                                                    checked={(formData[f._id] || []).includes(opt.value)}
                                                                                    onChange={(checked) => handleCheckboxChange(f._id, opt.value, checked)}
                                                                                />
                                                                            ))}
                                                                        </BlockStack>
                                                                    )}
                                                                </BlockStack>
                                                            ))}

                                                            <Box disabled={true} paddingBlockStart="300">
                                                                <Button 
                                                                    variant="primary" 
                                                                    submit
                                                                    size="large"
                                                                    fullWidth 
                                                                    disabled={isSubmitting}
                                                                >
                                                                    {submitButtonIcon} {submitButtonText}
                                                                </Button>
                                                            </Box>
                                                        </BlockStack>
                                                    )}
                                                </BlockStack>
                                            </form>
                                        </Box>
                                    </BlockStack>
                                </Card>
                            </Box>
                        </Grid.Cell>
                    </Grid>
                </BlockStack>

                {/* All Modals */}
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    title={modalMode === "add" ? "Add New Field" : "Edit Field"}
                    primaryAction={{ 
                        content: "Save Field", 
                        onAction: handleModalSave,
                        loading: isAddingField || isUpdatingField
                    }}
                    secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
                >
                    <Modal.Section>
                        <FormLayout>
                            <TextField
                                label="Field Label"
                                placeholder="e.g., Full Name, Phone Number"
                                value={currentField.label}
                                onChange={(value) => updateCurrentField("label", value)}
                                autoComplete="off"
                                helpText="The label that appears above this field"
                                disabled={currentField.type === "email"}
                            />

                            <Select
                                label="Field Type"
                                options={[
                                    { label: "Text Input", value: "text" },
                                    { label: "Email Input", value: "email" },
                                    { label: "Number Input", value: "number" },
                                    { label: "Textarea", value: "textarea" },
                                    { label: "Dropdown Select", value: "dropdown" },
                                    { label: "Radio Group", value: "radio" },
                                    // { label: "Checkbox Group", value: "checkbox" },
                                ]}
                                value={currentField.type}
                                onChange={(value) => updateCurrentField("type", value)}
                                helpText="Select the type of input for this field"
                            />

                            {["text", "email", "number", "textarea"].includes(currentField.type) && (
                                <TextField
                                    label="Placeholder Text"
                                    placeholder="e.g., Enter your email address"
                                    value={currentField.placeholder}
                                    onChange={(value) => updateCurrentField("placeholder", value)}
                                    autoComplete="off"
                                    helpText="Hint text shown inside the field"
                                />
                            )}

                            <Checkbox
                                label="Required Field"
                                checked={currentField.required}
                                onChange={(checked) => updateCurrentField("required", checked)}
                                helpText={
                                    currentField.type === "email" 
                                        ? "Email fields are always required" 
                                        : "Users must fill this field before submitting"
                                }
                                disabled={currentField.type === "email"}
                            />

                            {["dropdown", "radio", "checkbox"].includes(currentField.type) && (
                                <Box 
                                    padding="400" 
                                    background="bg-surface-secondary" 
                                    borderRadius="300"
                                >
                                    <BlockStack gap="400">
                                        <InlineStack align="space-between" blockAlign="center">
                                            <Text variant="bodyMd" fontWeight="semibold">
                                                Options
                                            </Text>
                                            <Button size="slim" onClick={addOption}>
                                                Add Option
                                            </Button>
                                        </InlineStack>

                                        {currentField.options.length === 0 ? (
                                            <Text variant="bodySm" tone="subdued">
                                                No options added yet. Click "Add Option" to create choices for this field.
                                            </Text>
                                        ) : (
                                            <BlockStack gap="200">
                                                {currentField.options.map((opt, i) => (
                                                    <Box 
                                                        key={i} 
                                                        padding="300" 
                                                        background="bg-surface" 
                                                        borderRadius="200"
                                                    >
                                                        <BlockStack gap="200">
                                                            <InlineStack align="space-between">
                                                                <Text variant="bodyMd" fontWeight="semibold">
                                                                    Option {i + 1}
                                                                </Text>
                                                                <InlineStack gap="100">
                                                                    <Button 
                                                                        size="slim" 
                                                                        onClick={() => editOption(i)}
                                                                    >
                                                                        <Icon source={EditIcon} tone="base" />
                                                                    </Button>
                                                                    <Button 
                                                                        size="slim" 
                                                                        tone="critical" 
                                                                        onClick={() => deleteOption(i)}
                                                                    >
                                                                        <Icon source={DeleteIcon} tone="base" />
                                                                    </Button>
                                                                </InlineStack>
                                                            </InlineStack>
                                                            <InlineGrid columns={2} gap="200">
                                                                <Box>
                                                                    <BlockStack gap="100">
                                                                        <Text variant="bodySm" tone="subdued">
                                                                            Display Label
                                                                        </Text>
                                                                        <Text variant="bodyMd" fontWeight="medium">
                                                                            {opt.label}
                                                                        </Text>
                                                                    </BlockStack>
                                                                </Box>
                                                                <Box>
                                                                    <BlockStack gap="100">
                                                                        <Text variant="bodySm" tone="subdued">
                                                                            Saved Value
                                                                        </Text>
                                                                        <Text variant="bodyMd" fontWeight="medium">
                                                                            {opt.value}
                                                                        </Text>
                                                                    </BlockStack>
                                                                </Box>
                                                            </InlineGrid>
                                                        </BlockStack>
                                                    </Box>
                                                ))}
                                            </BlockStack>
                                        )}
                                    </BlockStack>
                                </Box>
                            )}
                        </FormLayout>
                    </Modal.Section>
                </Modal>

                <Modal
                    open={validationPopup.isOpen}
                    onClose={closeValidationPopup}
                    title="Validation Error"
                    primaryAction={{
                        content: "OK",
                        onAction: closeValidationPopup
                    }}
                >
                    <Modal.Section>
                        <Text variant="bodyMd">{validationPopup.message}</Text>
                    </Modal.Section>
                </Modal>

                <Modal
                    open={confirmationPopup.isOpen}
                    onClose={closeConfirmationPopup}
                    title={confirmationPopup.title}
                    primaryAction={{
                        content: "Confirm",
                        onAction: handleConfirmAction,
                        destructive: true
                    }}
                    secondaryActions={[{
                        content: "Cancel",
                        onAction: closeConfirmationPopup
                    }]}
                >
                    <Modal.Section>
                        <Text variant="bodyMd">{confirmationPopup.message}</Text>
                    </Modal.Section>
                </Modal>

                <Modal
                    open={optionInputPopup.isOpen}
                    onClose={closeOptionInputPopup}
                    title={optionInputPopup.mode === "add" ? "Add Option" : "Edit Option"}
                    primaryAction={{
                        content: "Save Option",
                        onAction: handleSaveOption
                    }}
                    secondaryActions={[{
                        content: "Cancel",
                        onAction: closeOptionInputPopup
                    }]}
                >
                    <Modal.Section>
                        <FormLayout>
                            <TextField
                                label="Option Label (Display Text)"
                                placeholder="e.g., Small, Medium, Large"
                                value={optionInputPopup.label}
                                onChange={(value) => setOptionInputPopup({
                                    ...optionInputPopup, 
                                    label: value,
                                    value: optionInputPopup.mode === "add" && !optionInputPopup.value 
                                        ? value.toLowerCase().replace(/\s+/g, "_")
                                        : optionInputPopup.value
                                })}
                                autoComplete="off"
                                helpText="This is what users will see in the form"
                            />
                            <TextField
                                label="Option Value (Saved Value)"
                                placeholder="e.g., small, medium, large"
                                value={optionInputPopup.value}
                                onChange={(value) => setOptionInputPopup({...optionInputPopup, value: value})}
                                autoComplete="off"
                                helpText="This value will be saved in the database"
                            />
                        </FormLayout>
                    </Modal.Section>
                </Modal>
            </Page>
        </AppProvider>
    );
}