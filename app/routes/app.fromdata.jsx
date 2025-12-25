// // import { useState } from "react";

// // export default function CustomizeForm() {
// //   // STATIC DUMMY DATA (no API)
// //   const [fields, setFields] = useState([
// //     {
// //       id: Date.now(),
// //       label: "Full Name",
// //       type: "text",
// //       required: true,
// //       placeholder: "Enter your full name"
// //     },
// //     {
// //       id: Date.now() + 1,
// //       label: "Email Address",
// //       type: "email",
// //       required: true,
// //       placeholder: "example@gmail.com"
// //     }
// //   ]);

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: Date.now(),
// //         label: "",
// //         type: "text",
// //         required: false,
// //         placeholder: ""
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Remove field
// //   function removeField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // SAVE - only shows JSON (no API call)
// //   function save() {
// //     console.log("FINAL JSON:", fields);
// //     alert("JSON printed in console");
// //   }

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>Contact Form Customization</h2>

// //       <button onClick={addField} style={{ marginBottom: 20 }}>
// //         + Add Field
// //       </button>

// //       {fields.map((field) => (
// //         <div
// //           key={field.id}
// //           style={{
// //             border: "1px solid #ccc",
// //             borderRadius: 8,
// //             padding: 15,
// //             marginBottom: 15
// //           }}
// //         >
// //           {/* Label */}
// //           <input
// //             type="text"
// //             placeholder="Label"
// //             value={field.label}
// //             onChange={(e) => updateField(field.id, "label", e.target.value)}
// //             style={{ width: "100%", marginBottom: 10 }}
// //           />

// //           {/* Type */}
// //           <select
// //             value={field.type}
// //             onChange={(e) => updateField(field.id, "type", e.target.value)}
// //             style={{ width: "100%", marginBottom: 10 }}
// //           >
// //             <option value="text">Text</option>
// //             <option value="email">Email</option>
// //             <option value="number">Number</option>
// //             <option value="textarea">Textarea</option>
// //             <option value="select">Dropdown</option>
// //           </select>

// //           {/* Placeholder */}
// //           <input
// //             type="text"
// //             placeholder="Placeholder"
// //             value={field.placeholder}
// //             onChange={(e) =>
// //               updateField(field.id, "placeholder", e.target.value)
// //             }
// //             style={{ width: "100%", marginBottom: 10 }}
// //           />

// //           {/* Required */}
// //           <label>
// //             <input
// //               type="checkbox"
// //               checked={field.required}
// //               onChange={(e) =>
// //                 updateField(field.id, "required", e.target.checked)
// //               }
// //             />
// //             Required Field
// //           </label>

// //           {/* Delete */}
// //           <button
// //             onClick={() => removeField(field.id)}
// //             style={{
// //               float: "right",
// //               background: "red",
// //               color: "white",
// //               border: "none",
// //               padding: "5px 10px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       ))}

// //       <button
// //         onClick={save}
// //         style={{
// //           marginTop: 20,
// //           background: "green",
// //           color: "white",
// //           padding: "10px 20px",
// //           border: "none"
// //         }}
// //       >
// //         Save (show JSON)
// //       </button>

// //       {/* Output JSON */}
// //       <pre style={{ marginTop: 20, background: "#f5f5f5", padding: 15 }}>
// //         {JSON.stringify(fields, null, 2)}
// //       </pre>
// //     </div>
// //   );
// // }



// // import { useState } from "react";

// // export default function CustomizeForm() {
// //   const [fields, setFields] = useState([]);

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: Date.now(),
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: []
// //       }
// //     ]);
// //   }

// //   // Update field key/value
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Add option to dropdown or radio
// //   function addOption(fieldId) {
// //     const option = prompt("Enter option text:");
// //     if (!option) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId ? { ...f, options: [...f.options, option] } : f
// //     ));
// //   }

// //   // Edit a dropdown/radio option
// //   function editOption(fieldId, index) {
// //     const updated = prompt("Update option value:");
// //     if (!updated) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? {
// //             ...f,
// //             options: f.options.map((o, i) => (i === index ? updated : o))
// //           }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   return (
// //     <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
// //       <h1>Dynamic Form Builder</h1>

// //       {/* Add field */}
// //       <button onClick={addField} style={{ marginBottom: 20 }}>
// //         ➕ Add Field
// //       </button>

// //       {/* FIELD CONFIGURATOR */}
// //       {fields.map(field => (
// //         <div
// //           key={field.id}
// //           style={{
// //             border: "1px solid #ccc",
// //             borderRadius: 8,
// //             padding: 15,
// //             marginBottom: 20,
// //             background: "#fafafa"
// //           }}
// //         >
// //           {/* Label */}
// //           <input
// //             type="text"
// //             placeholder="Field label"
// //             value={field.label}
// //             onChange={e => updateField(field.id, "label", e.target.value)}
// //             style={{ width: "100%", marginBottom: 10 }}
// //           />

// //           {/* Field Type */}
// //           <select
// //             value={field.type}
// //             onChange={e => updateField(field.id, "type", e.target.value)}
// //             style={{ width: "100%", marginBottom: 10 }}
// //           >
// //             <option value="text">Text</option>
// //             <option value="email">Email</option>
// //             <option value="number">Number</option>
// //             <option value="textarea">Textarea</option>
// //             <option value="select">Dropdown</option>
// //             <option value="radio">Radio Group</option>
// //           </select>

// //           {/* Placeholder (not for select/radio) */}
// //           {field.type !== "select" && field.type !== "radio" && (
// //             <input
// //               type="text"
// //               placeholder="Placeholder"
// //               value={field.placeholder}
// //               onChange={e =>
// //                 updateField(field.id, "placeholder", e.target.value)
// //               }
// //               style={{ width: "100%", marginBottom: 10 }}
// //             />
// //           )}

// //           {/* Required Toggle */}
// //           <label>
// //             <input
// //               type="checkbox"
// //               checked={field.required}
// //               onChange={e =>
// //                 updateField(field.id, "required", e.target.checked)
// //               }
// //             />
// //             Required
// //           </label>

// //           {/* OPTIONS (Dropdown or Radio) */}
// //           {(field.type === "select" || field.type === "radio") && (
// //             <div style={{ marginTop: 15 }}>
// //               <b>Options:</b>

// //               {field.options.map((opt, i) => (
// //                 <div key={i} style={{ display: "flex", marginTop: 10 }}>
// //                   <input value={opt} readOnly style={{ flex: 1 }} />

// //                   {/* Edit option */}
// //                   <button
// //                     onClick={() => editOption(field.id, i)}
// //                     style={{
// //                       marginLeft: 5,
// //                       background: "orange",
// //                       color: "white",
// //                       padding: "5px 8px",
// //                       border: "none"
// //                     }}
// //                   >
// //                     Edit
// //                   </button>

// //                   {/* Delete option */}
// //                   <button
// //                     onClick={() => deleteOption(field.id, i)}
// //                     style={{
// //                       marginLeft: 5,
// //                       background: "red",
// //                       color: "white",
// //                       padding: "5px 8px",
// //                       border: "none"
// //                     }}
// //                   >
// //                     X
// //                   </button>
// //                 </div>
// //               ))}

// //               {/* Add Option */}
// //               <button
// //                 onClick={() => addOption(field.id)}
// //                 style={{ marginTop: 10 }}
// //               >
// //                 ➕ Add Option
// //               </button>
// //             </div>
// //           )}

// //           {/* Delete Field */}
// //           <button
// //             onClick={() => deleteField(field.id)}
// //             style={{
// //               marginTop: 15,
// //               background: "red",
// //               color: "white",
// //               padding: "8px 15px",
// //               border: "none"
// //             }}
// //           >
// //             Delete Field
// //           </button>
// //         </div>
// //       ))}

// //       {/* LIVE PREVIEW */}
// //       <h2>🔎 Preview</h2>
// //       <div style={{ border: "1px solid #000", padding: 20 }}>
// //         {fields.map(f => (
// //           <div key={f.id} style={{ marginBottom: 15 }}>
// //             <label>
// //               {f.label} {f.required && "*"}
// //             </label>

// //             {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //               <input
// //                 type={f.type}
// //                 placeholder={f.placeholder}
// //                 style={{ width: "100%", padding: 6 }}
// //               />
// //             ) : f.type === "textarea" ? (
// //               <textarea
// //                 placeholder={f.placeholder}
// //                 style={{ width: "100%", padding: 6 }}
// //               ></textarea>
// //             ) : f.type === "select" ? (
// //               <select style={{ width: "100%", padding: 6 }}>
// //                 {f.options.map((opt, i) => (
// //                   <option key={i}>{opt}</option>
// //                 ))}
// //               </select>
// //             ) : f.type === "radio" ? (
// //               f.options.map((opt, i) => (
// //                 <div key={i}>
// //                   <input type="radio" name={f.id} /> {opt}
// //                 </div>
// //               ))
// //             ) : null}
// //           </div>
// //         ))}
// //       </div>

// //       {/* JSON OUTPUT */}
// //       <h2>📝 JSON Output</h2>
// //       <pre style={{ background: "#eee", padding: 10 }}>
// //         {JSON.stringify(fields, null, 2)}
// //       </pre>
// //     </div>
// //   );
// // }



// // import React, { useState } from "react";

// // export default function CustomFormBuilder() {
// //   const [fields, setFields] = useState([]);
// //   const [selectedFieldType, setSelectedFieldType] = useState("text");

// //   const [theme, setTheme] = useState({
// //     labelColor: "#000000",
// //     inputBg: "#ffffff",
// //     inputText: "#000000",
// //     buttonBg: "#000000",
// //     buttonText: "#ffffff",
// //   });

// //   const addField = () => {
// //     const newField = {
// //       id: Date.now(),
// //       type: selectedFieldType,
// //       label: `${selectedFieldType.toUpperCase()} Field`,
// //       options: selectedFieldType === "dropdown" || selectedFieldType === "radio" ? ["Option 1"] : [],
// //     };
// //     setFields([...fields, newField]);
// //   };

// //   const updateField = (id, key, value) => {
// //     setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
// //   };

// //   const addOption = (id) => {
// //     setFields(
// //       fields.map((f) =>
// //         f.id === id ? { ...f, options: [...f.options, `New Option`] } : f
// //       )
// //     );
// //   };

// //   const updateOption = (fieldId, index, value) => {
// //     setFields(
// //       fields.map((f) =>
// //         f.id === fieldId
// //           ? { ...f, options: f.options.map((o, i) => (i === index ? value : o)) }
// //           : f
// //       )
// //     );
// //   };

// //   const deleteField = (id) => {
// //     setFields(fields.filter((f) => f.id !== id));
// //   };

// //   const saveForm = async () => {
// //     await fetch("/api/saveForm", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ fields, theme }),
// //     });
// //     alert("Saved!");
// //   };

// //   return (
// //     <div className="p-4 grid grid-cols-2 gap-6">
// //       {/* LEFT SIDE - BUILDER */}
// //       <div>
// //         <h2 className="text-xl font-bold mb-3">Form Builder</h2>

// //         <div className="mb-3">
// //           <label>Select Field Type:</label>
// //           <select
// //             className="border p-2 rounded w-full"
// //             value={selectedFieldType}
// //             onChange={(e) => setSelectedFieldType(e.target.value)}
// //           >
// //             <option value="text">Text</option>
// //             <option value="email">Email</option>
// //             <option value="number">Number</option>
// //             <option value="textarea">Textarea</option>
// //             <option value="dropdown">Dropdown</option>
// //             <option value="radio">Radio Group</option>
// //           </select>
// //         </div>

// //         <button
// //           className="bg-blue-600 text-white px-4 py-2 rounded"
// //           onClick={addField}
// //         >
// //           Add Field
// //         </button>

// //         <div className="mt-6 space-y-4">
// //           {fields.map((field) => (
// //             <div key={field.id} className="border p-3 rounded shadow">
// //               <input
// //                 className="border p-2 w-full mb-2"
// //                 value={field.label}
// //                 onChange={(e) => updateField(field.id, "label", e.target.value)}
// //               />

// //               {(field.type === "dropdown" || field.type === "radio") && (
// //                 <div className="mt-2">
// //                   <p className="font-medium">Options:</p>
// //                   {field.options.map((opt, i) => (
// //                     <input
// //                       key={i}
// //                       className="border p-2 w-full my-1"
// //                       value={opt}
// //                       onChange={(e) => updateOption(field.id, i, e.target.value)}
// //                     />
// //                   ))}
// //                   <button
// //                     onClick={() => addOption(field.id)}
// //                     className="bg-gray-700 text-white px-2 py-1 rounded mt-1"
// //                   >
// //                     + Add Option
// //                   </button>
// //                 </div>
// //               )}

// //               <button
// //                 onClick={() => deleteField(field.id)}
// //                 className="bg-red-600 text-white px-3 py-1 rounded mt-2"
// //               >
// //                 Delete Field
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* RIGHT SIDE - PREVIEW */}
// //       <div>
// //         <h2 className="text-xl font-bold mb-3">Live Preview</h2>

// //         <div className="mb-4 grid grid-cols-2 gap-2">
// //           <label>Label Color</label>
// //           <input type="color" value={theme.labelColor} onChange={(e) => setTheme({ ...theme, labelColor: e.target.value })} />

// //           <label>Input BG</label>
// //           <input type="color" value={theme.inputBg} onChange={(e) => setTheme({ ...theme, inputBg: e.target.value })} />

// //           <label>Input Text</label>
// //           <input type="color" value={theme.inputText} onChange={(e) => setTheme({ ...theme, inputText: e.target.value })} />

// //           <label>Button BG</label>
// //           <input type="color" value={theme.buttonBg} onChange={(e) => setTheme({ ...theme, buttonBg: e.target.value })} />

// //           <label>Button Text</label>
// //           <input type="color" value={theme.buttonText} onChange={(e) => setTheme({ ...theme, buttonText: e.target.value })} />
// //         </div>

// //         <form className="space-y-4 p-4 border rounded">
// //           {fields.map((field) => (
// //             <div key={field.id}>
// //               <label style={{ color: theme.labelColor }}>{field.label}</label>

// //               {field.type === "text" || field.type === "email" || field.type === "number" ? (
// //                 <input
// //                   type={field.type}
// //                   className="w-full p-2 border rounded"
// //                   style={{ background: theme.inputBg, color: theme.inputText }}
// //                 />
// //               ) : field.type === "textarea" ? (
// //                 <textarea
// //                   className="w-full p-2 border rounded"
// //                   style={{ background: theme.inputBg, color: theme.inputText }}
// //                 ></textarea>
// //               ) : field.type === "dropdown" ? (
// //                 <select
// //                   className="w-full p-2 border rounded"
// //                   style={{ background: theme.inputBg, color: theme.inputText }}
// //                 >
// //                   {field.options.map((o, i) => (
// //                     <option key={i}>{o}</option>
// //                   ))}
// //                 </select>
// //               ) : field.type === "radio" ? (
// //                 field.options.map((o, i) => (
// //                   <div key={i}>
// //                     <input type="radio" name={field.id} /> {o}
// //                   </div>
// //                 ))
// //               ) : null}
// //             </div>
// //           ))}

// //           <button
// //             type="button"
// //             style={{ background: theme.buttonBg, color: theme.buttonText }}
// //             className="px-4 py-2 rounded w-full"
// //           >
// //             Submit
// //           </button>
// //         </form>

// //         <button
// //           onClick={saveForm}
// //           className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
// //         >
// //           Save Form
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// // frist 

// // import { useState } from "react";

// // export default function CustomizeForm() {
// //   const [fields, setFields] = useState([]);
// //   const [formStyles, setFormStyles] = useState({
// //     backgroundColor: "#ffffff",
// //     textColor: "#000000",
// //     labelColor: "#333333",
// //     inputBgColor: "#f9f9f9",
// //     inputBorderColor: "#cccccc",
// //     inputTextColor: "#000000",
// //     buttonBgColor: "#4CAF50",
// //     buttonTextColor: "#ffffff",
// //     buttonBorderRadius: "8",
// //     inputBorderRadius: "6",
// //     fontSize: "14",
// //     labelFontSize: "16",
// //     buttonFontSize: "16",
// //     padding: "12",
// //     buttonPadding: "12"
// //   });

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: Date.now(),
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: [],
// //         customStyles: {
// //           labelColor: "",
// //           inputBgColor: "",
// //           inputTextColor: "",
// //           inputBorderColor: ""
// //         }
// //       }
// //     ]);
// //   }

// //   // Update field key/value
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Update field custom styles
// //   function updateFieldStyle(id, styleKey, value) {
// //     setFields(fields.map(f => 
// //       f.id === id 
// //         ? { ...f, customStyles: { ...f.customStyles, [styleKey]: value } }
// //         : f
// //     ));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // Handle form submission
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });

// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Add option to dropdown or radio
// //   function addOption(fieldId) {
// //     const option = prompt("Enter option text:");
// //     if (!option) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId ? { ...f, options: [...f.options, option] } : f
// //     ));
// //   }

// //   // Edit a dropdown/radio option
// //   function editOption(fieldId, index) {
// //     const updated = prompt("Update option value:");
// //     if (!updated) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? {
// //             ...f,
// //             options: f.options.map((o, i) => (i === index ? updated : o))
// //           }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   return (
// //     <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
// //       <div style={{ maxWidth: 1200, margin: "auto" }}>
// //         <h1 style={{ textAlign: "center", color: "#333" }}>🎨 Advanced Form Builder</h1>

// //         {/* GLOBAL FORM STYLING PANEL */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0 }}>🎨 Global Form Styles</h2>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.backgroundColor}
// //                 onChange={e => updateFormStyle("backgroundColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Text Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.textColor}
// //                 onChange={e => updateFormStyle("textColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.labelColor}
// //                 onChange={e => updateFormStyle("labelColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBgColor}
// //                 onChange={e => updateFormStyle("inputBgColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Border</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBorderColor}
// //                 onChange={e => updateFormStyle("inputBorderColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputTextColor}
// //                 onChange={e => updateFormStyle("inputTextColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonBgColor}
// //                 onChange={e => updateFormStyle("buttonBgColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonTextColor}
// //                 onChange={e => updateFormStyle("buttonTextColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonBorderRadius}
// //                 onChange={e => updateFormStyle("buttonBorderRadius", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.inputBorderRadius}
// //                 onChange={e => updateFormStyle("inputBorderRadius", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.fontSize}
// //                 onChange={e => updateFormStyle("fontSize", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.labelFontSize}
// //                 onChange={e => updateFormStyle("labelFontSize", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonFontSize}
// //                 onChange={e => updateFormStyle("buttonFontSize", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Padding (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.padding}
// //                 onChange={e => updateFormStyle("padding", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Padding (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonPadding}
// //                 onChange={e => updateFormStyle("buttonPadding", e.target.value)}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Add field button */}
// //         <button 
// //           onClick={addField}
// //           style={{
// //             marginBottom: 20,
// //             background: "#2196F3",
// //             color: "white",
// //             padding: "12px 24px",
// //             border: "none",
// //             borderRadius: 8,
// //             cursor: "pointer",
// //             fontSize: 16,
// //             fontWeight: "bold",
// //             boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
// //           }}
// //         >
// //           ➕ Add Form Field
// //         </button>

// //         {/* FIELD CONFIGURATOR */}
// //         {fields.map(field => (
// //           <div
// //             key={field.id}
// //             style={{
// //               border: "2px solid #ddd",
// //               borderRadius: 12,
// //               padding: 20,
// //               marginBottom: 20,
// //               background: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //             }}
// //           >
// //             <h3 style={{ marginTop: 0, color: "#555" }}>Field Configuration</h3>

// //             {/* Label */}
// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Label</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter field label"
// //                 value={field.label}
// //                 onChange={e => updateField(field.id, "label", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>

// //             {/* Field Type */}
// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Type</label>
// //               <select
// //                 value={field.type}
// //                 onChange={e => updateField(field.id, "type", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               >
// //                 <option value="text">Text Input</option>
// //                 <option value="email">Email Input</option>
// //                 <option value="number">Number Input</option>
// //                 <option value="textarea">Textarea</option>
// //                 <option value="select">Dropdown Select</option>
// //                 <option value="radio">Radio Group</option>
// //               </select>
// //             </div>

// //             {/* Placeholder (not for select/radio) */}
// //             {field.type !== "select" && field.type !== "radio" && (
// //               <div style={{ marginBottom: 15 }}>
// //                 <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Placeholder Text</label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter placeholder"
// //                   value={field.placeholder}
// //                   onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                   style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //                 />
// //               </div>
// //             )}

// //             {/* Required Toggle */}
// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={field.required}
// //                   onChange={e => updateField(field.id, "required", e.target.checked)}
// //                   style={{ marginRight: 8, width: 20, height: 20, cursor: "pointer" }}
// //                 />
// //                 <span style={{ fontWeight: "bold" }}>Required Field</span>
// //               </label>
// //             </div>

// //             {/* CUSTOM FIELD STYLES */}
// //             <details style={{ marginBottom: 15 }}>
// //               <summary style={{ cursor: "pointer", fontWeight: "bold", padding: 10, background: "#f0f0f0", borderRadius: 6 }}>
// //                 🎨 Custom Field Colors (Optional)
// //               </summary>
// //               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 10, padding: 10 }}>
// //                 <div>
// //                   <label style={{ display: "block", marginBottom: 5, fontSize: 12 }}>Label Color</label>
// //                   <input 
// //                     type="color" 
// //                     value={field.customStyles.labelColor || formStyles.labelColor}
// //                     onChange={e => updateFieldStyle(field.id, "labelColor", e.target.value)}
// //                     style={{ width: "100%", height: 35, cursor: "pointer" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label style={{ display: "block", marginBottom: 5, fontSize: 12 }}>Input Background</label>
// //                   <input 
// //                     type="color" 
// //                     value={field.customStyles.inputBgColor || formStyles.inputBgColor}
// //                     onChange={e => updateFieldStyle(field.id, "inputBgColor", e.target.value)}
// //                     style={{ width: "100%", height: 35, cursor: "pointer" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label style={{ display: "block", marginBottom: 5, fontSize: 12 }}>Input Text</label>
// //                   <input 
// //                     type="color" 
// //                     value={field.customStyles.inputTextColor || formStyles.inputTextColor}
// //                     onChange={e => updateFieldStyle(field.id, "inputTextColor", e.target.value)}
// //                     style={{ width: "100%", height: 35, cursor: "pointer" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label style={{ display: "block", marginBottom: 5, fontSize: 12 }}>Input Border</label>
// //                   <input 
// //                     type="color" 
// //                     value={field.customStyles.inputBorderColor || formStyles.inputBorderColor}
// //                     onChange={e => updateFieldStyle(field.id, "inputBorderColor", e.target.value)}
// //                     style={{ width: "100%", height: 35, cursor: "pointer" }}
// //                   />
// //                 </div>
// //               </div>
// //             </details>

// //             {/* OPTIONS (Dropdown or Radio) */}
// //             {(field.type === "select" || field.type === "radio") && (
// //               <div style={{ marginBottom: 15, padding: 15, background: "#f9f9f9", borderRadius: 8 }}>
// //                 <b style={{ display: "block", marginBottom: 10 }}>Options:</b>

// //                 {field.options.map((opt, i) => (
// //                   <div key={i} style={{ display: "flex", marginBottom: 8, gap: 5 }}>
// //                     <input 
// //                       value={opt} 
// //                       readOnly 
// //                       style={{ 
// //                         flex: 1, 
// //                         padding: 8, 
// //                         borderRadius: 4, 
// //                         border: "1px solid #ddd",
// //                         background: "#fff"
// //                       }} 
// //                     />

// //                     {/* Edit option */}
// //                     <button
// //                       onClick={() => editOption(field.id, i)}
// //                       style={{
// //                         background: "#FF9800",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer",
// //                         fontWeight: "bold"
// //                       }}
// //                     >
// //                       ✏️ Edit
// //                     </button>

// //                     {/* Delete option */}
// //                     <button
// //                       onClick={() => deleteOption(field.id, i)}
// //                       style={{
// //                         background: "#f44336",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer",
// //                         fontWeight: "bold"
// //                       }}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 ))}

// //                 {/* Add Option */}
// //                 <button
// //                   onClick={() => addOption(field.id)}
// //                   style={{
// //                     marginTop: 10,
// //                     background: "#4CAF50",
// //                     color: "white",
// //                     padding: "8px 16px",
// //                     border: "none",
// //                     borderRadius: 6,
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   ➕ Add Option
// //                 </button>
// //               </div>
// //             )}

// //             {/* Delete Field */}
// //             <button
// //               onClick={() => deleteField(field.id)}
// //               style={{
// //                 background: "#f44336",
// //                 color: "white",
// //                 padding: "10px 20px",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 fontWeight: "bold",
// //                 fontSize: 14
// //               }}
// //             >
// //               🗑️ Delete Field
// //             </button>
// //           </div>
// //         ))}

// //         {/* LIVE PREVIEW */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0, color: "#333" }}>🔎 Live Preview</h2>

// //           <div 
// //             style={{ 
// //               border: `2px solid ${formStyles.inputBorderColor}`,
// //               padding: 30, 
// //               borderRadius: 12,
// //               background: formStyles.backgroundColor,
// //               color: formStyles.textColor
// //             }}
// //           >
// //             {fields.length === 0 ? (
// //               <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
// //                 No fields added yet. Click "Add Form Field" to start building your form.
// //               </p>
// //             ) : (
// //               <>
// //                 {fields.map(f => {
// //                   const fieldLabelColor = f.customStyles.labelColor || formStyles.labelColor;
// //                   const fieldInputBg = f.customStyles.inputBgColor || formStyles.inputBgColor;
// //                   const fieldInputText = f.customStyles.inputTextColor || formStyles.inputTextColor;
// //                   const fieldInputBorder = f.customStyles.inputBorderColor || formStyles.inputBorderColor;

// //                   const inputStyle = {
// //                     width: "100%",
// //                     padding: `${formStyles.padding}px`,
// //                     fontSize: `${formStyles.fontSize}px`,
// //                     borderRadius: `${formStyles.inputBorderRadius}px`,
// //                     border: `2px solid ${fieldInputBorder}`,
// //                     background: fieldInputBg,
// //                     color: fieldInputText,
// //                     boxSizing: "border-box"
// //                   };

// //                   return (
// //                     <div key={f.id} style={{ marginBottom: 20 }}>
// //                       <label style={{ 
// //                         display: "block", 
// //                         marginBottom: 8,
// //                         fontSize: `${formStyles.labelFontSize}px`,
// //                         fontWeight: "bold",
// //                         color: fieldLabelColor
// //                       }}>
// //                         {f.label || "Untitled Field"} {f.required && <span style={{ color: "red" }}>*</span>}
// //                       </label>

// //                       {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                         <input
// //                           type={f.type}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         />
// //                       ) : f.type === "textarea" ? (
// //                         <textarea
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           rows={4}
// //                           style={inputStyle}
// //                         ></textarea>
// //                       ) : f.type === "select" ? (
// //                         <select 
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         >
// //                           <option value="">-- Select an option --</option>
// //                           {f.options.map((opt, i) => (
// //                             <option key={i} value={opt}>{opt}</option>
// //                           ))}
// //                         </select>
// //                       ) : f.type === "radio" ? (
// //                         <div style={{ 
// //                           padding: `${formStyles.padding}px`,
// //                           background: fieldInputBg,
// //                           borderRadius: `${formStyles.inputBorderRadius}px`,
// //                           border: `2px solid ${fieldInputBorder}`
// //                         }}>
// //                           {f.options.map((opt, i) => (
// //                             <label 
// //                               key={i} 
// //                               style={{ 
// //                                 display: "block", 
// //                                 marginBottom: 8,
// //                                 cursor: "pointer",
// //                                 color: fieldInputText,
// //                                 fontSize: `${formStyles.fontSize}px`
// //                               }}
// //                             >
// //                               <input 
// //                                 type="radio" 
// //                                 name={`field-${f.id}`}
// //                                 value={opt}
// //                                 style={{ marginRight: 8, cursor: "pointer", width: 18, height: 18 }}
// //                               /> 
// //                               {opt}
// //                             </label>
// //                           ))}
// //                         </div>
// //                       ) : null}
// //                     </div>
// //                   );
// //                 })}

// //                 <button 
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: formStyles.buttonBgColor,
// //                     color: formStyles.buttonTextColor,
// //                     padding: `${formStyles.buttonPadding}px 32px`,
// //                     border: "none",
// //                     borderRadius: `${formStyles.buttonBorderRadius}px`,
// //                     cursor: "pointer",
// //                     fontSize: `${formStyles.buttonFontSize}px`,
// //                     fontWeight: "bold",
// //                     marginTop: 10,
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
// //                     transition: "transform 0.2s"
// //                   }}
// //                   onMouseOver={e => e.target.style.transform = "scale(1.05)"}
// //                   onMouseOut={e => e.target.style.transform = "scale(1)"}
// //                 >
// //                   Submit Form
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* JSON OUTPUT */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0, color: "#333" }}>📝 JSON Output</h2>
// //           <pre style={{ 
// //             background: "#2d2d2d", 
// //             color: "#f8f8f2",
// //             padding: 20, 
// //             borderRadius: 8,
// //             overflow: "auto",
// //             fontSize: 13,
// //             lineHeight: 1.5
// //           }}>
// //             {JSON.stringify({ formStyles, fields }, null, 2)}
// //           </pre>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// //  second 


// // import { useState } from "react";

// // export default function EasyFormBuilder() {
// //   const [fields, setFields] = useState([]);
// //   const [activeTab, setActiveTab] = useState("build"); // build, preview, style
// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     textColor: "#1a1a1a",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //   });

// //   function addField(type) {
// //     setFields([...fields, {
// //       id: Date.now(),
// //       label: "",
// //       type,
// //       placeholder: "",
// //       required: false,
// //       options: type === "select" || type === "radio" ? ["Option 1"] : []
// //     }]);
// //   }

// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
// //   }

// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   function addOption(fieldId) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
// //         : f
// //     ));
// //   }

// //   function updateOption(fieldId, index, value) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.map((o, i) => i === index ? value : o) }
// //         : f
// //     ));
// //   }

// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   function handleSubmit() {
// //     const data = {};
// //     fields.forEach(f => {
// //       const el = document.querySelector(`[name="field-${f.id}"]`);
// //       if (f.type === "radio") {
// //         const checked = document.querySelector(`[name="field-${f.id}"]:checked`);
// //         data[f.label || "Untitled"] = checked?.value || "";
// //       } else {
// //         data[f.label || "Untitled"] = el?.value || "";
// //       }
// //     });
// //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
// //   }

// //   const inputStyle = {
// //     width: "100%",
// //     padding: 12,
// //     fontSize: 15,
// //     borderRadius: formStyles.inputRadius,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     background: formStyles.inputBg,
// //     color: formStyles.inputText,
// //     outline: "none",
// //     transition: "all 0.3s"
// //   };

// //   return (
// //     <div style={{ 
// //       minHeight: "100vh", 
// //       padding: "20px"
// //     }}>
// //       <div style={{ maxWidth: 1000, margin: "auto" }}>
// //         {/* Header */}
// //         <div style={{ textAlign: "center", marginBottom: 30 }}>
// //           <h1 style={{ 
// //             color: "white", 
// //             fontSize: 42, 
// //             margin: 0,
// //             textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
// //           }}>
// //             ✨ Form Builder
// //           </h1>
// //           <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, margin: "10px 0" }}>
// //             Create beautiful forms in seconds!
// //           </p>
// //         </div>

// //         {/* Tabs */}
// //         <div style={{ 
// //           display: "flex", 
// //           gap: 10, 
// //           marginBottom: 20,
// //           justifyContent: "center"
// //         }}>
// //           {[
// //             { id: "build", icon: "🔧", label: "Build" },
// //             { id: "style", icon: "🎨", label: "Style" },
// //             { id: "preview", icon: "👁️", label: "Preview" }
// //           ].map(tab => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               style={{
// //                 padding: "12px 30px",
// //                 fontSize: 16,
// //                 fontWeight: "bold",
// //                 border: "none",
// //                 borderRadius: 10,
// //                 cursor: "pointer",
// //                 background: activeTab === tab.id ? "white" : "rgba(255,255,255,0.2)",
// //                 color: activeTab === tab.id ? "#667eea" : "white",
// //                 boxShadow: activeTab === tab.id ? "0 4px 15px rgba(0,0,0,0.2)" : "none",
// //                 transform: activeTab === tab.id ? "translateY(-2px)" : "none",
// //                 transition: "all 0.3s"
// //               }}
// //             >
// //               {tab.icon} {tab.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Content */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 20,
// //           padding: 30,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
// //           minHeight: 500
// //         }}>

// //           {/* BUILD TAB */}
// //           {activeTab === "build" && (
// //             <div>
// //               <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Add Form Fields</h2>

// //               {/* Quick Add Buttons */}
// //               <div style={{ 
// //                 display: "grid", 
// //                 gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
// //                 gap: 15,
// //                 marginBottom: 30
// //               }}>
// //                 {[
// //                   { type: "text", icon: "📝", label: "Text" },
// //                   { type: "email", icon: "📧", label: "Email" },
// //                   { type: "number", icon: "🔢", label: "Number" },
// //                   { type: "textarea", icon: "📄", label: "Textarea" },
// //                   { type: "select", icon: "📋", label: "Dropdown" },
// //                   { type: "radio", icon: "⭕", label: "Radio" }
// //                 ].map(btn => (
// //                   <button
// //                     key={btn.type}
// //                     onClick={() => addField(btn.type)}
// //                     style={{
// //                       padding: 15,
// //                       fontSize: 14,
// //                       fontWeight: "bold",
// //                       border: "2px solid #3498db",
// //                       borderRadius: 10,
// //                       cursor: "pointer",
// //                       background: "white",
// //                       color: "#3498db",
// //                       transition: "all 0.3s"
// //                     }}
// //                     onMouseOver={e => {
// //                       e.target.style.background = "#3498db";
// //                       e.target.style.color = "white";
// //                     }}
// //                     onMouseOut={e => {
// //                       e.target.style.background = "white";
// //                       e.target.style.color = "#3498db";
// //                     }}
// //                   >
// //                     {btn.icon} {btn.label}
// //                   </button>
// //                 ))}
// //               </div>

// //               {/* Field List */}
// //               {fields.length === 0 ? (
// //                 <div style={{ 
// //                   textAlign: "center", 
// //                   padding: 60,
// //                   color: "#95a5a6",
// //                   fontSize: 18
// //                 }}>
// //                   👆 Click a button above to add your first field
// //                 </div>
// //               ) : (
// //                 fields.map((field, idx) => (
// //                   <div key={field.id} style={{
// //                     background: "#f8f9fa",
// //                     padding: 20,
// //                     borderRadius: 12,
// //                     marginBottom: 15,
// //                     border: "2px solid #e9ecef"
// //                   }}>
// //                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
// //                       <span style={{ 
// //                         background: "#3498db",
// //                         color: "white",
// //                         padding: "5px 15px",
// //                         borderRadius: 20,
// //                         fontSize: 14,
// //                         fontWeight: "bold"
// //                       }}>
// //                         Field #{idx + 1} - {field.type.toUpperCase()}
// //                       </span>
// //                       <button
// //                         onClick={() => deleteField(field.id)}
// //                         style={{
// //                           background: "#e74c3c",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "8px 16px",
// //                           borderRadius: 8,
// //                           cursor: "pointer",
// //                           fontWeight: "bold"
// //                         }}
// //                       >
// //                         🗑️ Delete
// //                       </button>
// //                     </div>

// //                     <input
// //                       type="text"
// //                       placeholder="Field Label (e.g., Your Name)"
// //                       value={field.label}
// //                       onChange={e => updateField(field.id, "label", e.target.value)}
// //                       style={{
// //                         width: "100%",
// //                         padding: 12,
// //                         marginBottom: 10,
// //                         border: "2px solid #ddd",
// //                         borderRadius: 8,
// //                         fontSize: 15
// //                       }}
// //                     />

// //                     {field.type !== "select" && field.type !== "radio" && (
// //                       <input
// //                         type="text"
// //                         placeholder="Placeholder text"
// //                         value={field.placeholder}
// //                         onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                         style={{
// //                           width: "100%",
// //                           padding: 12,
// //                           marginBottom: 10,
// //                           border: "2px solid #ddd",
// //                           borderRadius: 8,
// //                           fontSize: 15
// //                         }}
// //                       />
// //                     )}

// //                     <label style={{ 
// //                       display: "flex", 
// //                       alignItems: "center", 
// //                       cursor: "pointer",
// //                       fontSize: 15,
// //                       fontWeight: "bold"
// //                     }}>
// //                       <input
// //                         type="checkbox"
// //                         checked={field.required}
// //                         onChange={e => updateField(field.id, "required", e.target.checked)}
// //                         style={{ width: 20, height: 20, marginRight: 10, cursor: "pointer" }}
// //                       />
// //                       Required field
// //                     </label>

// //                     {(field.type === "select" || field.type === "radio") && (
// //                       <div style={{ marginTop: 15, padding: 15, background: "white", borderRadius: 8 }}>
// //                         <b style={{ display: "block", marginBottom: 10 }}>Options:</b>
// //                         {field.options.map((opt, i) => (
// //                           <div key={i} style={{ display: "flex", gap: 5, marginBottom: 8 }}>
// //                             <input
// //                               value={opt}
// //                               onChange={e => updateOption(field.id, i, e.target.value)}
// //                               style={{
// //                                 flex: 1,
// //                                 padding: 8,
// //                                 border: "2px solid #ddd",
// //                                 borderRadius: 6,
// //                                 fontSize: 14
// //                               }}
// //                             />
// //                             <button
// //                               onClick={() => deleteOption(field.id, i)}
// //                               style={{
// //                                 background: "#e74c3c",
// //                                 color: "white",
// //                                 border: "none",
// //                                 padding: "8px 12px",
// //                                 borderRadius: 6,
// //                                 cursor: "pointer"
// //                               }}
// //                             >
// //                               ✕
// //                             </button>
// //                           </div>
// //                         ))}
// //                         <button
// //                           onClick={() => addOption(field.id)}
// //                           style={{
// //                             background: "#27ae60",
// //                             color: "white",
// //                             border: "none",
// //                             padding: "8px 16px",
// //                             borderRadius: 6,
// //                             cursor: "pointer",
// //                             fontWeight: "bold",
// //                             marginTop: 5
// //                           }}
// //                         >
// //                           ➕ Add Option
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           )}

// //           {/* STYLE TAB */}
// //           {activeTab === "style" && (
// //             <div>
// //               <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Customize Colors & Style</h2>

// //               <div style={{ 
// //                 display: "grid", 
// //                 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //                 gap: 20
// //               }}>
// //                 {[
// //                   { key: "bgColor", label: "Form Background", icon: "🎨" },
// //                   { key: "textColor", label: "Text Color", icon: "✏️" },
// //                   { key: "labelColor", label: "Label Color", icon: "🏷️" },
// //                   { key: "inputBg", label: "Input Background", icon: "📦" },
// //                   { key: "inputBorder", label: "Input Border", icon: "🔲" },
// //                   { key: "inputText", label: "Input Text", icon: "✍️" },
// //                   { key: "buttonBg", label: "Button Background", icon: "🔘" },
// //                   { key: "buttonText", label: "Button Text", icon: "🔤" }
// //                 ].map(item => (
// //                   <div key={item.key} style={{
// //                     background: "#f8f9fa",
// //                     padding: 20,
// //                     borderRadius: 12,
// //                     textAlign: "center"
// //                   }}>
// //                     <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
// //                     <label style={{ 
// //                       display: "block", 
// //                       marginBottom: 10,
// //                       fontWeight: "bold",
// //                       color: "#2c3e50"
// //                     }}>
// //                       {item.label}
// //                     </label>
// //                     <input
// //                       type="color"
// //                       value={formStyles[item.key]}
// //                       onChange={e => setFormStyles({...formStyles, [item.key]: e.target.value})}
// //                       style={{
// //                         width: "100%",
// //                         height: 50,
// //                         border: "none",
// //                         borderRadius: 8,
// //                         cursor: "pointer"
// //                       }}
// //                     />
// //                   </div>
// //                 ))}

// //                 <div style={{
// //                   background: "#f8f9fa",
// //                   padding: 20,
// //                   borderRadius: 12,
// //                   textAlign: "center"
// //                 }}>
// //                   <div style={{ fontSize: 32, marginBottom: 10 }}>🔄</div>
// //                   <label style={{ 
// //                     display: "block", 
// //                     marginBottom: 10,
// //                     fontWeight: "bold",
// //                     color: "#2c3e50"
// //                   }}>
// //                     Input Radius
// //                   </label>
// //                   <input
// //                     type="range"
// //                     min="0"
// //                     max="30"
// //                     value={formStyles.inputRadius}
// //                     onChange={e => setFormStyles({...formStyles, inputRadius: e.target.value})}
// //                     style={{ width: "100%" }}
// //                   />
// //                   <div style={{ marginTop: 10, fontWeight: "bold" }}>{formStyles.inputRadius}px</div>
// //                 </div>

// //                 <div style={{
// //                   background: "#f8f9fa",
// //                   padding: 20,
// //                   borderRadius: 12,
// //                   textAlign: "center"
// //                 }}>
// //                   <div style={{ fontSize: 32, marginBottom: 10 }}>🔘</div>
// //                   <label style={{ 
// //                     display: "block", 
// //                     marginBottom: 10,
// //                     fontWeight: "bold",
// //                     color: "#2c3e50"
// //                   }}>
// //                     Button Radius
// //                   </label>
// //                   <input
// //                     type="range"
// //                     min="0"
// //                     max="30"
// //                     value={formStyles.buttonRadius}
// //                     onChange={e => setFormStyles({...formStyles, buttonRadius: e.target.value})}
// //                     style={{ width: "100%" }}
// //                   />
// //                   <div style={{ marginTop: 10, fontWeight: "bold" }}>{formStyles.buttonRadius}px</div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* PREVIEW TAB */}
// //           {activeTab === "preview" && (
// //             <div>
// //               <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Live Preview</h2>

// //               <div style={{
// //                 background: formStyles.bgColor,
// //                 padding: 30,
// //                 borderRadius: 15,
// //                 border: "2px solid #e9ecef",
// //                 color: formStyles.textColor
// //               }}>
// //                 {fields.length === 0 ? (
// //                   <div style={{ 
// //                     textAlign: "center", 
// //                     padding: 40,
// //                     color: "#95a5a6",
// //                     fontSize: 18
// //                   }}>
// //                     No fields added yet. Go to Build tab to add fields.
// //                   </div>
// //                 ) : (
// //                   <>
// //                     {fields.map(f => (
// //                       <div key={f.id} style={{ marginBottom: 20 }}>
// //                         <label style={{
// //                           display: "block",
// //                           marginBottom: 8,
// //                           fontWeight: "bold",
// //                           fontSize: 16,
// //                           color: formStyles.labelColor
// //                         }}>
// //                           {f.label || "Untitled Field"} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
// //                         </label>

// //                         {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                           <input
// //                             type={f.type}
// //                             placeholder={f.placeholder}
// //                             name={`field-${f.id}`}
// //                             style={inputStyle}
// //                           />
// //                         ) : f.type === "textarea" ? (
// //                           <textarea
// //                             placeholder={f.placeholder}
// //                             name={`field-${f.id}`}
// //                             rows={4}
// //                             style={inputStyle}
// //                           />
// //                         ) : f.type === "select" ? (
// //                           <select name={`field-${f.id}`} style={inputStyle}>
// //                             <option value="">-- Select --</option>
// //                             {f.options.map((opt, i) => (
// //                               <option key={i} value={opt}>{opt}</option>
// //                             ))}
// //                           </select>
// //                         ) : f.type === "radio" ? (
// //                           <div style={{
// //                             padding: 15,
// //                             background: formStyles.inputBg,
// //                             borderRadius: formStyles.inputRadius,
// //                             border: `2px solid ${formStyles.inputBorder}`
// //                           }}>
// //                             {f.options.map((opt, i) => (
// //                               <label key={i} style={{
// //                                 display: "block",
// //                                 marginBottom: 10,
// //                                 cursor: "pointer",
// //                                 fontSize: 15
// //                               }}>
// //                                 <input
// //                                   type="radio"
// //                                   name={`field-${f.id}`}
// //                                   value={opt}
// //                                   style={{ marginRight: 10, cursor: "pointer" }}
// //                                 />
// //                                 {opt}
// //                               </label>
// //                             ))}
// //                           </div>
// //                         ) : null}
// //                       </div>
// //                     ))}

// //                     <button
// //                       onClick={handleSubmit}
// //                       style={{
// //                         background: formStyles.buttonBg,
// //                         color: formStyles.buttonText,
// //                         padding: "15px 40px",
// //                         fontSize: 18,
// //                         fontWeight: "bold",
// //                         border: "none",
// //                         borderRadius: formStyles.buttonRadius,
// //                         cursor: "pointer",
// //                         marginTop: 10,
// //                         boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
// //                         transition: "all 0.3s"
// //                       }}
// //                       onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
// //                       onMouseOut={e => e.target.style.transform = "translateY(0)"}
// //                     >
// //                       Submit Form
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// //  third 


// // import { useState } from "react";

// // export default function SplitFormBuilder() {
// //   const [fields, setFields] = useState([]);
// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //   });
// //   const [showStylePanel, setShowStylePanel] = useState(false);

// //   function addField(type) {
// //     const newField = {
// //       id: Date.now(),
// //       label: type === "text" ? "Your Name" : 
// //              type === "email" ? "Your Email" :
// //              type === "number" ? "Your Age" :
// //              type === "textarea" ? "Your Message" :
// //              type === "select" ? "Choose Option" :
// //              "Select One",
// //       type,
// //       placeholder: type === "text" ? "Enter your name" :
// //                    type === "email" ? "example@email.com" :
// //                    type === "number" ? "Enter number" :
// //                    type === "textarea" ? "Type your message here..." : "",
// //       required: false,
// //       options: type === "select" || type === "radio" ? ["Option 1", "Option 2", "Option 3"] : []
// //     };
// //     setFields([...fields, newField]);
// //   }

// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
// //   }

// //   function deleteField(id) {
// //     if (confirm("Delete this field?")) {
// //       setFields(fields.filter(f => f.id !== id));
// //     }
// //   }

// //   function moveField(id, direction) {
// //     const index = fields.findIndex(f => f.id === id);
// //     if (direction === "up" && index > 0) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
// //       setFields(newFields);
// //     } else if (direction === "down" && index < fields.length - 1) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
// //       setFields(newFields);
// //     }
// //   }

// //   function addOption(fieldId) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
// //         : f
// //     ));
// //   }

// //   function updateOption(fieldId, index, value) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.map((o, i) => i === index ? value : o) }
// //         : f
// //     ));
// //   }

// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   function handleSubmit() {
// //     const data = {};
// //     fields.forEach(f => {
// //       const el = document.querySelector(`[name="field-${f.id}"]`);
// //       if (f.type === "radio") {
// //         const checked = document.querySelector(`[name="field-${f.id}"]:checked`);
// //         data[f.label] = checked?.value || "";
// //       } else {
// //         data[f.label] = el?.value || "";
// //       }
// //     });
// //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
// //   }

// //   const inputStyle = {
// //     width: "100%",
// //     padding: 12,
// //     fontSize: 15,
// //     borderRadius: formStyles.inputRadius,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     background: formStyles.inputBg,
// //     color: formStyles.inputText,
// //     outline: "none",
// //     transition: "border 0.3s"
// //   };

// //   return (
// //     <div style={{ 
// //       minHeight: "100vh", 
// //       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //       padding: "20px 0"
// //     }}>
// //       {/* Header */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <h1 style={{ 
// //           color: "white", 
// //           fontSize: 36, 
// //           margin: "0 0 10px 0",
// //           textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
// //         }}>
// //           ✨ Form Builder Pro
// //         </h1>
// //         <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, margin: 0 }}>
// //           Build left 👈 | Preview right 👉
// //         </p>
// //       </div>

// //       {/* Main Container - Split Screen */}
// //       <div style={{ 
// //         display: "grid", 
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: 20,
// //         maxWidth: 1400,
// //         margin: "0 auto",
// //         padding: "0 20px"
// //       }}>

// //         {/* LEFT SIDE - BUILD PANEL */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto"
// //         }}>
// //           <div style={{ position: "sticky", top: 0, background: "white", paddingBottom: 15, zIndex: 10 }}>
// //             <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 24 }}>
// //               🔧 Build Your Form
// //             </h2>

// //             {/* Quick Add Buttons */}
// //             <div style={{ 
// //               display: "grid", 
// //               gridTemplateColumns: "repeat(3, 1fr)",
// //               gap: 10,
// //               marginBottom: 15
// //             }}>
// //               {[
// //                 { type: "text", icon: "📝", label: "Text" },
// //                 { type: "email", icon: "📧", label: "Email" },
// //                 { type: "number", icon: "🔢", label: "Number" },
// //                 { type: "textarea", icon: "📄", label: "Message" },
// //                 { type: "select", icon: "📋", label: "Dropdown" },
// //                 { type: "radio", icon: "⭕", label: "Radio" }
// //               ].map(btn => (
// //                 <button
// //                   key={btn.type}
// //                   onClick={() => addField(btn.type)}
// //                   style={{
// //                     padding: "12px 8px",
// //                     fontSize: 13,
// //                     fontWeight: "bold",
// //                     border: "2px solid #3498db",
// //                     borderRadius: 8,
// //                     cursor: "pointer",
// //                     background: "white",
// //                     color: "#3498db",
// //                     transition: "all 0.2s"
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.background = "#3498db";
// //                     e.target.style.color = "white";
// //                     e.target.style.transform = "scale(1.05)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.background = "white";
// //                     e.target.style.color = "#3498db";
// //                     e.target.style.transform = "scale(1)";
// //                   }}
// //                 >
// //                   <div style={{ fontSize: 20, marginBottom: 4 }}>{btn.icon}</div>
// //                   {btn.label}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Style Button */}
// //             <button
// //               onClick={() => setShowStylePanel(!showStylePanel)}
// //               style={{
// //                 width: "100%",
// //                 padding: 12,
// //                 fontSize: 15,
// //                 fontWeight: "bold",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 background: showStylePanel ? "#9b59b6" : "#8e44ad",
// //                 color: "white",
// //                 transition: "all 0.3s"
// //               }}
// //             >
// //               🎨 {showStylePanel ? "Hide" : "Show"} Color Settings
// //             </button>
// //           </div>

// //           {/* Style Panel */}
// //           {showStylePanel && (
// //             <div style={{
// //               background: "#f8f9fa",
// //               padding: 15,
// //               borderRadius: 10,
// //               marginTop: 15,
// //               marginBottom: 15
// //             }}>
// //               <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 18 }}>🎨 Customize Colors</h3>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                 {[
// //                   { key: "bgColor", label: "Background", icon: "🎨" },
// //                   { key: "labelColor", label: "Labels", icon: "🏷️" },
// //                   { key: "inputBg", label: "Input BG", icon: "📦" },
// //                   { key: "inputBorder", label: "Borders", icon: "🔲" },
// //                   { key: "inputText", label: "Input Text", icon: "✍️" },
// //                   { key: "buttonBg", label: "Button", icon: "🔘" }
// //                 ].map(item => (
// //                   <div key={item.key} style={{ textAlign: "center" }}>
// //                     <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                       {item.icon} {item.label}
// //                     </label>
// //                     <input
// //                       type="color"
// //                       value={formStyles[item.key]}
// //                       onChange={e => setFormStyles({...formStyles, [item.key]: e.target.value})}
// //                       style={{ width: "100%", height: 35, border: "none", borderRadius: 6, cursor: "pointer" }}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Fields List */}
// //           {fields.length === 0 ? (
// //             <div style={{ 
// //               textAlign: "center", 
// //               padding: "40px 20px",
// //               color: "#95a5a6",
// //               background: "#f8f9fa",
// //               borderRadius: 10,
// //               marginTop: 15
// //             }}>
// //               <div style={{ fontSize: 48, marginBottom: 15 }}>👆</div>
// //               <p style={{ fontSize: 16, margin: 0 }}>Click a button above to add your first field</p>
// //             </div>
// //           ) : (
// //             <div style={{ marginTop: 15 }}>
// //               {fields.map((field, idx) => (
// //                 <div key={field.id} style={{
// //                   background: "#f8f9fa",
// //                   padding: 15,
// //                   borderRadius: 10,
// //                   marginBottom: 12,
// //                   border: "2px solid #e9ecef"
// //                 }}>
// //                   {/* Field Header */}
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                     <span style={{ 
// //                       background: "#3498db",
// //                       color: "white",
// //                       padding: "4px 12px",
// //                       borderRadius: 15,
// //                       fontSize: 12,
// //                       fontWeight: "bold"
// //                     }}>
// //                       #{idx + 1} {field.type.toUpperCase()}
// //                     </span>
// //                     <div style={{ display: "flex", gap: 5 }}>
// //                       <button
// //                         onClick={() => moveField(field.id, "up")}
// //                         disabled={idx === 0}
// //                         style={{
// //                           background: idx === 0 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === 0 ? "not-allowed" : "pointer",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         ⬆️
// //                       </button>
// //                       <button
// //                         onClick={() => moveField(field.id, "down")}
// //                         disabled={idx === fields.length - 1}
// //                         style={{
// //                           background: idx === fields.length - 1 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === fields.length - 1 ? "not-allowed" : "pointer",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         ⬇️
// //                       </button>
// //                       <button
// //                         onClick={() => deleteField(field.id)}
// //                         style={{
// //                           background: "#e74c3c",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Label Input */}
// //                   <input
// //                     type="text"
// //                     placeholder="Field Label"
// //                     value={field.label}
// //                     onChange={e => updateField(field.id, "label", e.target.value)}
// //                     style={{
// //                       width: "100%",
// //                       padding: 10,
// //                       marginBottom: 8,
// //                       border: "2px solid #ddd",
// //                       borderRadius: 6,
// //                       fontSize: 14,
// //                       fontWeight: "bold"
// //                     }}
// //                   />

// //                   {/* Placeholder Input */}
// //                   {field.type !== "select" && field.type !== "radio" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Placeholder text"
// //                       value={field.placeholder}
// //                       onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                       style={{
// //                         width: "100%",
// //                         padding: 10,
// //                         marginBottom: 8,
// //                         border: "2px solid #ddd",
// //                         borderRadius: 6,
// //                         fontSize: 14
// //                       }}
// //                     />
// //                   )}

// //                   {/* Required Toggle */}
// //                   <label style={{ 
// //                     display: "flex", 
// //                     alignItems: "center", 
// //                     cursor: "pointer",
// //                     fontSize: 14,
// //                     fontWeight: "bold"
// //                   }}>
// //                     <input
// //                       type="checkbox"
// //                       checked={field.required}
// //                       onChange={e => updateField(field.id, "required", e.target.checked)}
// //                       style={{ width: 18, height: 18, marginRight: 8, cursor: "pointer" }}
// //                     />
// //                     Required field
// //                   </label>

// //                   {/* Options for Select/Radio */}
// //                   {(field.type === "select" || field.type === "radio") && (
// //                     <div style={{ marginTop: 10, padding: 10, background: "white", borderRadius: 6 }}>
// //                       <b style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Options:</b>
// //                       {field.options.map((opt, i) => (
// //                         <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
// //                           <input
// //                             value={opt}
// //                             onChange={e => updateOption(field.id, i, e.target.value)}
// //                             style={{
// //                               flex: 1,
// //                               padding: 8,
// //                               border: "2px solid #ddd",
// //                               borderRadius: 5,
// //                               fontSize: 13
// //                             }}
// //                           />
// //                           <button
// //                             onClick={() => deleteOption(field.id, i)}
// //                             style={{
// //                               background: "#e74c3c",
// //                               color: "white",
// //                               border: "none",
// //                               padding: "6px 10px",
// //                               borderRadius: 5,
// //                               cursor: "pointer"
// //                             }}
// //                           >
// //                             ✕
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => addOption(field.id)}
// //                         style={{
// //                           background: "#27ae60",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontSize: 13,
// //                           fontWeight: "bold",
// //                           marginTop: 5
// //                         }}
// //                       >
// //                         ➕ Add Option
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE - LIVE PREVIEW */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           position: "sticky",
// //           top: "20px"
// //         }}>
// //           <h2 style={{ margin: "0 0 20px 0", color: "#2c3e50", fontSize: 24 }}>
// //             👁️ Live Preview
// //           </h2>

// //           <div style={{
// //             background: formStyles.bgColor,
// //             padding: 30,
// //             borderRadius: 12,
// //             border: "2px solid #e9ecef",
// //             minHeight: 400
// //           }}>
// //             {fields.length === 0 ? (
// //               <div style={{ textAlign: "center", padding: "60px 20px" }}>
// //                 <div style={{ fontSize: 64, marginBottom: 20 }}>📝</div>
// //                 <p style={{ color: "#95a5a6", fontSize: 18, margin: 0 }}>
// //                   Your form will appear here...
// //                 </p>
// //                 <p style={{ color: "#bdc3c7", fontSize: 14, marginTop: 10 }}>
// //                   Add fields from the left panel
// //                 </p>
// //               </div>
// //             ) : (
// //               <>
// //                 {fields.map(f => (
// //                   <div key={f.id} style={{ marginBottom: 20 }}>
// //                     <label style={{
// //                       display: "block",
// //                       marginBottom: 8,
// //                       fontWeight: "bold",
// //                       fontSize: 16,
// //                       color: formStyles.labelColor
// //                     }}>
// //                       {f.label} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
// //                     </label>

// //                     {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                       <input
// //                         type={f.type}
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "textarea" ? (
// //                       <textarea
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         rows={4}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "select" ? (
// //                       <select 
// //                         name={`field-${f.id}`} 
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {f.options.map((opt, i) => (
// //                           <option key={i} value={opt}>{opt}</option>
// //                         ))}
// //                       </select>
// //                     ) : f.type === "radio" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: 15,
// //                             color: formStyles.inputText
// //                           }}>
// //                             <input
// //                               type="radio"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : null}
// //                   </div>
// //                 ))}

// //                 <button
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: formStyles.buttonBg,
// //                     color: formStyles.buttonText,
// //                     padding: "15px 40px",
// //                     fontSize: 18,
// //                     fontWeight: "bold",
// //                     border: "none",
// //                     borderRadius: formStyles.buttonRadius,
// //                     cursor: "pointer",
// //                     marginTop: 10,
// //                     boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
// //                     transition: "all 0.3s"
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.transform = "translateY(-2px)";
// //                     e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.transform = "translateY(0)";
// //                     e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
// //                   }}
// //                 >
// //                   Submit Form ✅
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // fourth 


// // import { useState } from "react";

// // export default function SplitFormBuilder() {
// //   const [fields, setFields] = useState([]);
// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //   });
// //   const [submitButton, setSubmitButton] = useState({
// //     text: "Submit Form",
// //     icon: "✅"
// //   });
// //   const [showStylePanel, setShowStylePanel] = useState(false);

// //   function addField(type) {
// //     const newField = {
// //       id: Date.now(),
// //       label: type === "text" ? "Your Name" : 
// //              type === "email" ? "Your Email" :
// //              type === "number" ? "Your Age" :
// //              type === "textarea" ? "Your Message" :
// //              type === "select" ? "Choose Option" :
// //              "Select One",
// //       type,
// //       placeholder: type === "text" ? "Enter your name" :
// //                    type === "email" ? "example@email.com" :
// //                    type === "number" ? "Enter number" :
// //                    type === "textarea" ? "Type your message here..." : "",
// //       required: false,
// //       options: type === "select" || type === "radio" ? ["Option 1", "Option 2", "Option 3"] : []
// //     };
// //     setFields([...fields, newField]);
// //   }

// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
// //   }

// //   function deleteField(id) {
// //     if (confirm("Delete this field?")) {
// //       setFields(fields.filter(f => f.id !== id));
// //     }
// //   }

// //   function moveField(id, direction) {
// //     const index = fields.findIndex(f => f.id === id);
// //     if (direction === "up" && index > 0) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
// //       setFields(newFields);
// //     } else if (direction === "down" && index < fields.length - 1) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
// //       setFields(newFields);
// //     }
// //   }

// //   function addOption(fieldId) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
// //         : f
// //     ));
// //   }

// //   function updateOption(fieldId, index, value) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.map((o, i) => i === index ? value : o) }
// //         : f
// //     ));
// //   }

// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f => 
// //       f.id === fieldId 
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   function handleSubmit() {
// //     const data = {};
// //     fields.forEach(f => {
// //       const el = document.querySelector(`[name="field-${f.id}"]`);
// //       if (f.type === "radio") {
// //         const checked = document.querySelector(`[name="field-${f.id}"]:checked`);
// //         data[f.label] = checked?.value || "";
// //       } else {
// //         data[f.label] = el?.value || "";
// //       }
// //     });
// //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
// //   }

// //   // Helper function for darker gradient color
// //   const getDarkerColor = (color) => {
// //     try {
// //       const num = parseInt(color.replace("#", ""), 16);
// //       const r = Math.max(0, (num >> 16) - 30);
// //       const g = Math.max(0, ((num >> 8) & 0x00FF) - 30);
// //       const b = Math.max(0, (num & 0x0000FF) - 30);
// //       return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
// //     } catch {
// //       return color;
// //     }
// //   };

// //   const inputStyle = {
// //     width: "100%",
// //     padding: 12,
// //     fontSize: 15,
// //     borderRadius: formStyles.inputRadius,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     background: formStyles.inputBg,
// //     color: formStyles.inputText,
// //     outline: "none",
// //     transition: "border 0.3s"
// //   };

// //   return (
// //     <div style={{ 
// //       minHeight: "100vh", 
// //       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //       padding: "20px 0"
// //     }}>
// //       {/* Header */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <h1 style={{ 
// //           color: "white", 
// //           fontSize: 36, 
// //           margin: "0 0 10px 0",
// //           textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
// //         }}>
// //           ✨ Form Builder Pro
// //         </h1>
// //         <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, margin: 0 }}>
// //           Build left 👈 | Preview right 👉
// //         </p>
// //       </div>

// //       {/* Main Container - Split Screen */}
// //       <div style={{ 
// //         display: "grid", 
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: 20,
// //         maxWidth: 1400,
// //         margin: "0 auto",
// //         padding: "0 20px"
// //       }}>

// //         {/* LEFT SIDE - BUILD PANEL */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto"
// //         }}>
// //           <div style={{ position: "sticky", top: 0, background: "white", paddingBottom: 15, zIndex: 10 }}>
// //             <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 24 }}>
// //               🔧 Build Your Form
// //             </h2>

// //             {/* Quick Add Buttons */}
// //             <div style={{ 
// //               display: "grid", 
// //               gridTemplateColumns: "repeat(3, 1fr)",
// //               gap: 10,
// //               marginBottom: 15
// //             }}>
// //               {[
// //                 { type: "text", icon: "📝", label: "Text" },
// //                 { type: "email", icon: "📧", label: "Email" },
// //                 { type: "number", icon: "🔢", label: "Number" },
// //                 { type: "textarea", icon: "📄", label: "Message" },
// //                 { type: "select", icon: "📋", label: "Dropdown" },
// //                 { type: "radio", icon: "⭕", label: "Radio" }
// //               ].map(btn => (
// //                 <button
// //                   key={btn.type}
// //                   onClick={() => addField(btn.type)}
// //                   style={{
// //                     padding: "12px 8px",
// //                     fontSize: 13,
// //                     fontWeight: "bold",
// //                     border: "2px solid #3498db",
// //                     borderRadius: 8,
// //                     cursor: "pointer",
// //                     background: "white",
// //                     color: "#3498db",
// //                     transition: "all 0.2s"
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.background = "#3498db";
// //                     e.target.style.color = "white";
// //                     e.target.style.transform = "scale(1.05)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.background = "white";
// //                     e.target.style.color = "#3498db";
// //                     e.target.style.transform = "scale(1)";
// //                   }}
// //                 >
// //                   <div style={{ fontSize: 20, marginBottom: 4 }}>{btn.icon}</div>
// //                   {btn.label}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Style Button */}
// //             <button
// //               onClick={() => setShowStylePanel(!showStylePanel)}
// //               style={{
// //                 width: "100%",
// //                 padding: 12,
// //                 fontSize: 15,
// //                 fontWeight: "bold",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 background: showStylePanel ? "#9b59b6" : "#8e44ad",
// //                 color: "white",
// //                 transition: "all 0.3s",
// //                 marginBottom: 10
// //               }}
// //             >
// //               🎨 {showStylePanel ? "Hide" : "Show"} Color Settings
// //             </button>

// //             {/* Submit Button Settings */}
// //             <div style={{
// //               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //               padding: 15,
// //               borderRadius: 10,
// //               color: "white"
// //             }}>
// //               <h3 style={{ margin: "0 0 10px 0", fontSize: 16 }}>🔘 Submit Button</h3>
// //               <input
// //                 type="text"
// //                 placeholder="Button Text"
// //                 value={submitButton.text}
// //                 onChange={e => setSubmitButton({...submitButton, text: e.target.value})}
// //                 style={{
// //                   width: "100%",
// //                   padding: 10,
// //                   marginBottom: 8,
// //                   border: "none",
// //                   borderRadius: 6,
// //                   fontSize: 14,
// //                   fontWeight: "bold"
// //                 }}
// //               />
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ display: "block", fontSize: 13, marginBottom: 8, fontWeight: "bold" }}>
// //                   Choose Icon:
// //                 </label>
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5 }}>
// //                   {["✅", "🚀", "📤", "💾", "👍", "✔️", "📨", "🎯", "⚡", "🔥", "💪", "🎉"].map(emoji => (
// //                     <button
// //                       key={emoji}
// //                       onClick={() => setSubmitButton({...submitButton, icon: emoji})}
// //                       style={{
// //                         padding: 8,
// //                         fontSize: 20,
// //                         border: submitButton.icon === emoji ? "3px solid #ffd700" : "2px solid white",
// //                         borderRadius: 6,
// //                         cursor: "pointer",
// //                         background: submitButton.icon === emoji ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
// //                         transition: "all 0.2s"
// //                       }}
// //                     >
// //                       {emoji}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Style Panel */}
// //           {showStylePanel && (
// //             <div style={{
// //               background: "#f8f9fa",
// //               padding: 15,
// //               borderRadius: 10,
// //               marginTop: 15,
// //               marginBottom: 15
// //             }}>
// //               <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 18 }}>🎨 Customize Colors</h3>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                 {[
// //                   { key: "bgColor", label: "Background", icon: "🎨" },
// //                   { key: "labelColor", label: "Labels", icon: "🏷️" },
// //                   { key: "inputBg", label: "Input BG", icon: "📦" },
// //                   { key: "inputBorder", label: "Borders", icon: "🔲" },
// //                   { key: "inputText", label: "Input Text", icon: "✍️" },
// //                   { key: "buttonBg", label: "Button", icon: "🔘" }
// //                 ].map(item => (
// //                   <div key={item.key} style={{ textAlign: "center" }}>
// //                     <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                       {item.icon} {item.label}
// //                     </label>
// //                     <input
// //                       type="color"
// //                       value={formStyles[item.key]}
// //                       onChange={e => setFormStyles({...formStyles, [item.key]: e.target.value})}
// //                       style={{ width: "100%", height: 35, border: "none", borderRadius: 6, cursor: "pointer" }}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Fields List */}
// //           {fields.length === 0 ? (
// //             <div style={{ 
// //               textAlign: "center", 
// //               padding: "40px 20px",
// //               color: "#95a5a6",
// //               background: "#f8f9fa",
// //               borderRadius: 10,
// //               marginTop: 15
// //             }}>
// //               <div style={{ fontSize: 48, marginBottom: 15 }}>👆</div>
// //               <p style={{ fontSize: 16, margin: 0 }}>Click a button above to add your first field</p>
// //             </div>
// //           ) : (
// //             <div style={{ marginTop: 15 }}>
// //               {fields.map((field, idx) => (
// //                 <div key={field.id} style={{
// //                   background: "#f8f9fa",
// //                   padding: 15,
// //                   borderRadius: 10,
// //                   marginBottom: 12,
// //                   border: "2px solid #e9ecef"
// //                 }}>
// //                   {/* Field Header */}
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                     <span style={{ 
// //                       background: "#3498db",
// //                       color: "white",
// //                       padding: "4px 12px",
// //                       borderRadius: 15,
// //                       fontSize: 12,
// //                       fontWeight: "bold"
// //                     }}>
// //                       #{idx + 1} {field.type.toUpperCase()}
// //                     </span>
// //                     <div style={{ display: "flex", gap: 5 }}>
// //                       <button
// //                         onClick={() => moveField(field.id, "up")}
// //                         disabled={idx === 0}
// //                         style={{
// //                           background: idx === 0 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === 0 ? "not-allowed" : "pointer",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         ⬆️
// //                       </button>
// //                       <button
// //                         onClick={() => moveField(field.id, "down")}
// //                         disabled={idx === fields.length - 1}
// //                         style={{
// //                           background: idx === fields.length - 1 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === fields.length - 1 ? "not-allowed" : "pointer",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         ⬇️
// //                       </button>
// //                       <button
// //                         onClick={() => deleteField(field.id)}
// //                         style={{
// //                           background: "#e74c3c",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                           fontSize: 14
// //                         }}
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Label Input */}
// //                   <input
// //                     type="text"
// //                     placeholder="Field Label"
// //                     value={field.label}
// //                     onChange={e => updateField(field.id, "label", e.target.value)}
// //                     style={{
// //                       width: "100%",
// //                       padding: 10,
// //                       marginBottom: 8,
// //                       border: "2px solid #ddd",
// //                       borderRadius: 6,
// //                       fontSize: 14,
// //                       fontWeight: "bold"
// //                     }}
// //                   />

// //                   {/* Placeholder Input */}
// //                   {field.type !== "select" && field.type !== "radio" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Placeholder text"
// //                       value={field.placeholder}
// //                       onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                       style={{
// //                         width: "100%",
// //                         padding: 10,
// //                         marginBottom: 8,
// //                         border: "2px solid #ddd",
// //                         borderRadius: 6,
// //                         fontSize: 14
// //                       }}
// //                     />
// //                   )}

// //                   {/* Required Toggle */}
// //                   <label style={{ 
// //                     display: "flex", 
// //                     alignItems: "center", 
// //                     cursor: "pointer",
// //                     fontSize: 14,
// //                     fontWeight: "bold"
// //                   }}>
// //                     <input
// //                       type="checkbox"
// //                       checked={field.required}
// //                       onChange={e => updateField(field.id, "required", e.target.checked)}
// //                       style={{ width: 18, height: 18, marginRight: 8, cursor: "pointer" }}
// //                     />
// //                     Required field
// //                   </label>

// //                   {/* Options for Select/Radio */}
// //                   {(field.type === "select" || field.type === "radio") && (
// //                     <div style={{ marginTop: 10, padding: 10, background: "white", borderRadius: 6 }}>
// //                       <b style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Options:</b>
// //                       {field.options.map((opt, i) => (
// //                         <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
// //                           <input
// //                             value={opt}
// //                             onChange={e => updateOption(field.id, i, e.target.value)}
// //                             style={{
// //                               flex: 1,
// //                               padding: 8,
// //                               border: "2px solid #ddd",
// //                               borderRadius: 5,
// //                               fontSize: 13
// //                             }}
// //                           />
// //                           <button
// //                             onClick={() => deleteOption(field.id, i)}
// //                             style={{
// //                               background: "#e74c3c",
// //                               color: "white",
// //                               border: "none",
// //                               padding: "6px 10px",
// //                               borderRadius: 5,
// //                               cursor: "pointer"
// //                             }}
// //                           >
// //                             ✕
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => addOption(field.id)}
// //                         style={{
// //                           background: "#27ae60",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontSize: 13,
// //                           fontWeight: "bold",
// //                           marginTop: 5
// //                         }}
// //                       >
// //                         ➕ Add Option
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE - LIVE PREVIEW */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           position: "sticky",
// //           top: "20px"
// //         }}>
// //           <h2 style={{ margin: "0 0 20px 0", color: "#2c3e50", fontSize: 24 }}>
// //             👁️ Live Preview
// //           </h2>

// //           <div style={{
// //             background: formStyles.bgColor,
// //             padding: 30,
// //             borderRadius: 12,
// //             border: "2px solid #e9ecef",
// //             minHeight: 400
// //           }}>
// //             {fields.length === 0 ? (
// //               <div style={{ textAlign: "center", padding: "60px 20px" }}>
// //                 <div style={{ fontSize: 64, marginBottom: 20 }}>📝</div>
// //                 <p style={{ color: "#95a5a6", fontSize: 18, margin: 0 }}>
// //                   Your form will appear here...
// //                 </p>
// //                 <p style={{ color: "#bdc3c7", fontSize: 14, marginTop: 10 }}>
// //                   Add fields from the left panel
// //                 </p>
// //               </div>
// //             ) : (
// //               <>
// //                 {fields.map(f => (
// //                   <div key={f.id} style={{ marginBottom: 20 }}>
// //                     <label style={{
// //                       display: "block",
// //                       marginBottom: 8,
// //                       fontWeight: "bold",
// //                       fontSize: 16,
// //                       color: formStyles.labelColor
// //                     }}>
// //                       {f.label} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
// //                     </label>

// //                     {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                       <input
// //                         type={f.type}
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "textarea" ? (
// //                       <textarea
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         rows={4}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "select" ? (
// //                       <select 
// //                         name={`field-${f.id}`} 
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {f.options.map((opt, i) => (
// //                           <option key={i} value={opt}>{opt}</option>
// //                         ))}
// //                       </select>
// //                     ) : f.type === "radio" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: 15,
// //                             color: formStyles.inputText
// //                           }}>
// //                             <input
// //                               type="radio"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : null}
// //                   </div>
// //                 ))}

// //                 <button
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: `linear-gradient(135deg, ${formStyles.buttonBg} 0%, ${getDarkerColor(formStyles.buttonBg)} 100%)`,
// //                     color: formStyles.buttonText,
// //                     padding: "16px 50px",
// //                     fontSize: 18,
// //                     fontWeight: "bold",
// //                     border: "none",
// //                     borderRadius: formStyles.buttonRadius,
// //                     cursor: "pointer",
// //                     marginTop: 10,
// //                     boxShadow: "0 4px 15px rgba(0,0,0,0.2), inset 0 -2px 10px rgba(0,0,0,0.1)",
// //                     transition: "all 0.3s",
// //                     position: "relative",
// //                     overflow: "hidden"
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.transform = "translateY(-3px) scale(1.02)";
// //                     e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3), inset 0 -2px 10px rgba(0,0,0,0.1)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.transform = "translateY(0) scale(1)";
// //                     e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2), inset 0 -2px 10px rgba(0,0,0,0.1)";
// //                   }}
// //                   onMouseDown={e => {
// //                     e.target.style.transform = "translateY(0) scale(0.98)";
// //                   }}
// //                   onMouseUp={e => {
// //                     e.target.style.transform = "translateY(-3px) scale(1.02)";
// //                   }}
// //                 >
// //                   <span style={{ marginRight: 8, fontSize: 22 }}>{submitButton.icon}</span>
// //                   {submitButton.text}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // five

// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function SplitFormBuilder() {
// //   // State
// //   const [fields, setFields] = useState([]);
// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
// //     transition: "all 0.3s ease",
// //   });
// //   const [submitButton, setSubmitButton] = useState({
// //     text: "Submit Form",
// //     icon: "✅",
// //   });
// //   const [showStylePanel, setShowStylePanel] = useState(false);
// //   const [previewMode, setPreviewMode] = useState("desktop");

// //   // Field Types
// //   const fieldTypes = [
// //     { type: "text", icon: "📝", label: "Text" },
// //     { type: "email", icon: "📧", label: "Email" },
// //     { type: "number", icon: "🔢", label: "Number" },
// //     { type: "textarea", icon: "📄", label: "Message" },
// //     { type: "select", icon: "📋", label: "Dropdown" },
// //     { type: "radio", icon: "⭕", label: "Radio" },
// //     { type: "checkbox", icon: "✅", label: "Checkbox" },
// //     { type: "date", icon: "📅", label: "Date" },
// //     { type: "file", icon: "📎", label: "File Upload" },
// //   ];

// //   // Helper: Darken color for gradients
// //   const getDarkerColor = (color) => {
// //     try {
// //       const num = parseInt(color.replace("#", ""), 16);
// //       const r = Math.max(0, (num >> 16) - 30);
// //       const g = Math.max(0, ((num >> 8) & 0x00FF) - 30);
// //       const b = Math.max(0, (num & 0x0000FF) - 30);
// //       return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
// //     } catch {
// //       return color;
// //     }
// //   };

// //   // Field Management
// //   const addField = (type) => {
// //     const newField = {
// //       id: Date.now(),
// //       label: getDefaultLabel(type),
// //       type,
// //       placeholder: getDefaultPlaceholder(type),
// //       required: false,
// //       options: getDefaultOptions(type),
// //     };
// //     setFields([...fields, newField]);
// //   };

// //   const getDefaultLabel = (type) => {
// //     const labels = {
// //       text: "Your Name",
// //       email: "Your Email",
// //       number: "Your Age",
// //       textarea: "Your Message",
// //       select: "Choose Option",
// //       radio: "Select One",
// //       checkbox: "Check Option",
// //       date: "Select Date",
// //       file: "Upload File",
// //     };
// //     return labels[type] || "New Field";
// //   };

// //   const getDefaultPlaceholder = (type) => {
// //     const placeholders = {
// //       text: "Enter your name",
// //       email: "example@email.com",
// //       number: "Enter number",
// //       textarea: "Type your message here...",
// //       date: "",
// //       file: "",
// //     };
// //     return placeholders[type] || "";
// //   };

// //   const getDefaultOptions = (type) => {
// //     if (type === "select" || type === "radio" || type === "checkbox") {
// //       return ["Option 1", "Option 2", "Option 3"];
// //     }
// //     return [];
// //   };

// //   const updateField = (id, key, value) => {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   };

// //   const deleteField = (id) => {
// //     if (confirm("Delete this field?")) {
// //       setFields(fields.filter(f => f.id !== id));
// //     }
// //   };

// //   const moveField = (id, direction) => {
// //     const index = fields.findIndex(f => f.id === id);
// //     if (direction === "up" && index > 0) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
// //       setFields(newFields);
// //     } else if (direction === "down" && index < fields.length - 1) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
// //       setFields(newFields);
// //     }
// //   };

// //   const addOption = (fieldId) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
// //         : f
// //     ));
// //   };

// //   const updateOption = (fieldId, index, value) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? value : o)) }
// //         : f
// //     ));
// //   };

// //   const deleteOption = (fieldId, index) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   };

// //   // Form Submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const data = {};
// //     fields.forEach(f => {
// //       const el = document.querySelector(`[name="field-${f.id}"]`);
// //       if (f.type === "radio" || f.type === "checkbox") {
// //         const checked = document.querySelectorAll(`[name="field-${f.id}"]:checked`);
// //         data[f.label] = f.type === "checkbox"
// //           ? Array.from(checked).map(c => c.value)
// //           : (checked[0]?.value || "");
// //       } else {
// //         data[f.label] = el?.value || "";
// //       }
// //     });
// //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
// //   };

// //   // Input Style
// //   const inputStyle = {
// //     width: "100%",
// //     padding: 12,
// //     fontSize: formStyles.fontSize,
// //     borderRadius: formStyles.inputRadius,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     background: formStyles.inputBg,
// //     color: formStyles.inputText,
// //     outline: "none",
// //     transition: formStyles.transition,
// //     fontFamily: formStyles.fontFamily,
// //   };

// //   // Preview Container Style
// //   const previewContainerStyle = {
// //     background: formStyles.bgColor,
// //     padding: previewMode === "mobile" ? 15 : 30,
// //     borderRadius: 12,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     minHeight: 400,
// //     boxShadow: formStyles.shadow,
// //     maxWidth: previewMode === "mobile" ? 375 : "100%",
// //     margin: previewMode === "mobile" ? "0 auto" : 0,
// //   };

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //         padding: "20px 0",
// //         fontFamily: formStyles.fontFamily,
// //       }}
// //     >
// //       {/* Header */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <h1 style={{
// //           color: "white",
// //           fontSize: 36,
// //           margin: "0 0 10px 0",
// //           textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           ✨ Form Builder Pro
// //         </h1>
// //         <p style={{
// //           color: "rgba(255,255,255,0.9)",
// //           fontSize: 16,
// //           margin: 0,
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           Build left 👈 | Preview right 👉
// //         </p>
// //       </div>

// //       {/* Preview Mode Toggle */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <button
// //           onClick={() => setPreviewMode(p => p === "desktop" ? "mobile" : "desktop")}
// //           style={{
// //             background: previewMode === "desktop" ? "#3498db" : "#2ecc71",
// //             color: "white",
// //             border: "none",
// //             padding: "8px 16px",
// //             borderRadius: 20,
// //             cursor: "pointer",
// //             fontWeight: "bold",
// //           }}
// //         >
// //           {previewMode === "desktop" ? "📱 Mobile Preview" : "🖥️ Desktop Preview"}
// //         </button>
// //       </div>

// //       {/* Main Container - Split Screen */}
// //       <div style={{
// //         display: "grid",
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: 20,
// //         maxWidth: 1400,
// //         margin: "0 auto",
// //         padding: "0 20px",
// //       }}>
// //         {/* LEFT SIDE - BUILD PANEL */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           {/* Build Panel Header */}
// //           <div style={{ position: "sticky", top: 0, background: "white", paddingBottom: 15, zIndex: 10 }}>
// //             <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 24 }}>
// //               🔧 Build Your Form
// //             </h2>
// //             {/* Quick Add Buttons */}
// //             <div style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(3, 1fr)",
// //               gap: 10,
// //               marginBottom: 15,
// //             }}>
// //               {fieldTypes.map(btn => (
// //                 <button
// //                   key={btn.type}
// //                   onClick={() => addField(btn.type)}
// //                   style={{
// //                     padding: "12px 8px",
// //                     fontSize: 13,
// //                     fontWeight: "bold",
// //                     border: "2px solid #3498db",
// //                     borderRadius: 8,
// //                     cursor: "pointer",
// //                     background: "white",
// //                     color: "#3498db",
// //                     transition: "all 0.2s",
// //                     fontFamily: formStyles.fontFamily,
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.background = "#3498db";
// //                     e.target.style.color = "white";
// //                     e.target.style.transform = "scale(1.05)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.background = "white";
// //                     e.target.style.color = "#3498db";
// //                     e.target.style.transform = "scale(1)";
// //                   }}
// //                 >
// //                   <div style={{ fontSize: 20, marginBottom: 4 }}>{btn.icon}</div>
// //                   {btn.label}
// //                 </button>
// //               ))}
// //             </div>
// //             {/* Style Button */}
// //             <button
// //               onClick={() => setShowStylePanel(!showStylePanel)}
// //               style={{
// //                 width: "100%",
// //                 padding: 12,
// //                 fontSize: 15,
// //                 fontWeight: "bold",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 background: showStylePanel ? "#9b59b6" : "#8e44ad",
// //                 color: "white",
// //                 transition: "all 0.3s",
// //                 marginBottom: 10,
// //                 fontFamily: formStyles.fontFamily,
// //               }}
// //             >
// //               🎨 {showStylePanel ? "Hide" : "Show"} Color Settings
// //             </button>
// //             {/* Submit Button Settings */}
// //             <div style={{
// //               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //               padding: 15,
// //               borderRadius: 10,
// //               color: "white",
// //             }}>
// //               <h3 style={{ margin: "0 0 10px 0", fontSize: 16 }}>🔘 Submit Button</h3>
// //               <input
// //                 type="text"
// //                 placeholder="Button Text"
// //                 value={submitButton.text}
// //                 onChange={e => setSubmitButton({...submitButton, text: e.target.value})}
// //                 style={{
// //                   width: "100%",
// //                   padding: 10,
// //                   marginBottom: 8,
// //                   border: "none",
// //                   borderRadius: 6,
// //                   fontSize: 14,
// //                   fontWeight: "bold",
// //                   fontFamily: formStyles.fontFamily,
// //                 }}
// //               />
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ display: "block", fontSize: 13, marginBottom: 8, fontWeight: "bold" }}>
// //                   Choose Icon:
// //                 </label>
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5 }}>
// //                   {["✅", "🚀", "📤", "💾", "👍", "✔️", "📨", "🎯", "⚡", "🔥", "💪", "🎉"].map(emoji => (
// //                     <button
// //                       key={emoji}
// //                       onClick={() => setSubmitButton({...submitButton, icon: emoji})}
// //                       style={{
// //                         padding: 8,
// //                         fontSize: 20,
// //                         border: submitButton.icon === emoji ? "3px solid #ffd700" : "2px solid white",
// //                         borderRadius: 6,
// //                         cursor: "pointer",
// //                         background: submitButton.icon === emoji ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
// //                         transition: "all 0.2s",
// //                       }}
// //                     >
// //                       {emoji}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Style Panel */}
// //           {showStylePanel && (
// //             <div style={{
// //               background: "#f8f9fa",
// //               padding: 15,
// //               borderRadius: 10,
// //               marginTop: 15,
// //               marginBottom: 15,
// //             }}>
// //               <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: 18 }}>🎨 Customize Colors</h3>
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                 {[
// //                   { key: "bgColor", label: "Background", icon: "🎨" },
// //                   { key: "labelColor", label: "Labels", icon: "🏷️" },
// //                   { key: "inputBg", label: "Input BG", icon: "📦" },
// //                   { key: "inputBorder", label: "Borders", icon: "🔲" },
// //                   { key: "inputText", label: "Input Text", icon: "✍️" },
// //                   { key: "buttonBg", label: "Button", icon: "🔘" },
// //                 ].map(item => (
// //                   <div key={item.key} style={{ textAlign: "center" }}>
// //                     <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                       {item.icon} {item.label}
// //                     </label>
// //                     <input
// //                       type="color"
// //                       value={formStyles[item.key]}
// //                       onChange={e => setFormStyles({...formStyles, [item.key]: e.target.value})}
// //                       style={{ width: "100%", height: 35, border: "none", borderRadius: 6, cursor: "pointer" }}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //               <div style={{ marginTop: 15 }}>
// //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                   🔤 Font Family
// //                 </label>
// //                 <select
// //                   value={formStyles.fontFamily}
// //                   onChange={e => setFormStyles({...formStyles, fontFamily: e.target.value})}
// //                   style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
// //                 >
// //                   <option value="'Inter', sans-serif">Inter</option>
// //                   <option value="'Roboto', sans-serif">Roboto</option>
// //                   <option value="'Poppins', sans-serif">Poppins</option>
// //                   <option value="'Open Sans', sans-serif">Open Sans</option>
// //                 </select>
// //               </div>
// //             </div>
// //           )}

// //           {/* Fields List */}
// //           {fields.length === 0 ? (
// //             <div style={{
// //               textAlign: "center",
// //               padding: "40px 20px",
// //               color: "#95a5a6",
// //               background: "#f8f9fa",
// //               borderRadius: 10,
// //               marginTop: 15,
// //             }}>
// //               <div style={{ fontSize: 48, marginBottom: 15 }}>👆</div>
// //               <p style={{ fontSize: 16, margin: 0 }}>Click a button above to add your first field</p>
// //             </div>
// //           ) : (
// //             <div style={{ marginTop: 15 }}>
// //               {fields.map((field, idx) => (
// //                 <motion.div
// //                   key={field.id}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   style={{
// //                     background: "#f8f9fa",
// //                     padding: 15,
// //                     borderRadius: 10,
// //                     marginBottom: 12,
// //                     border: "2px solid #e9ecef",
// //                   }}
// //                 >
// //                   {/* Field Header */}
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                     <span style={{
// //                       background: "#3498db",
// //                       color: "white",
// //                       padding: "4px 12px",
// //                       borderRadius: 15,
// //                       fontSize: 12,
// //                       fontWeight: "bold",
// //                     }}>
// //                       #{idx + 1} {field.type.toUpperCase()}
// //                     </span>
// //                     <div style={{ display: "flex", gap: 5 }}>
// //                       <button
// //                         onClick={() => moveField(field.id, "up")}
// //                         disabled={idx === 0}
// //                         style={{
// //                           background: idx === 0 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === 0 ? "not-allowed" : "pointer",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         ⬆️
// //                       </button>
// //                       <button
// //                         onClick={() => moveField(field.id, "down")}
// //                         disabled={idx === fields.length - 1}
// //                         style={{
// //                           background: idx === fields.length - 1 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === fields.length - 1 ? "not-allowed" : "pointer",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         ⬇️
// //                       </button>
// //                       <button
// //                         onClick={() => deleteField(field.id)}
// //                         style={{
// //                           background: "#e74c3c",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   </div>
// //                   {/* Label Input */}
// //                   <input
// //                     type="text"
// //                     placeholder="Field Label"
// //                     value={field.label}
// //                     onChange={e => updateField(field.id, "label", e.target.value)}
// //                     style={{
// //                       width: "100%",
// //                       padding: 10,
// //                       marginBottom: 8,
// //                       border: "2px solid #ddd",
// //                       borderRadius: 6,
// //                       fontSize: 14,
// //                       fontWeight: "bold",
// //                       fontFamily: formStyles.fontFamily,
// //                     }}
// //                   />
// //                   {/* Placeholder Input */}
// //                   {field.type !== "select" && field.type !== "radio" && field.type !== "checkbox" && field.type !== "date" && field.type !== "file" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Placeholder text"
// //                       value={field.placeholder}
// //                       onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                       style={{
// //                         width: "100%",
// //                         padding: 10,
// //                         marginBottom: 8,
// //                         border: "2px solid #ddd",
// //                         borderRadius: 6,
// //                         fontSize: 14,
// //                         fontFamily: formStyles.fontFamily,
// //                       }}
// //                     />
// //                   )}
// //                   {/* Required Toggle */}
// //                   <label style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     cursor: "pointer",
// //                     fontSize: 14,
// //                     fontWeight: "bold",
// //                     marginBottom: 10,
// //                   }}>
// //                     <input
// //                       type="checkbox"
// //                       checked={field.required}
// //                       onChange={e => updateField(field.id, "required", e.target.checked)}
// //                       style={{ width: 18, height: 18, marginRight: 8, cursor: "pointer" }}
// //                     />
// //                     Required field
// //                   </label>
// //                   {/* Options for Select/Radio/Checkbox */}
// //                   {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
// //                     <div style={{ marginTop: 10, padding: 10, background: "white", borderRadius: 6 }}>
// //                       <b style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Options:</b>
// //                       {field.options.map((opt, i) => (
// //                         <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
// //                           <input
// //                             value={opt}
// //                             onChange={e => updateOption(field.id, i, e.target.value)}
// //                             style={{
// //                               flex: 1,
// //                               padding: 8,
// //                               border: "2px solid #ddd",
// //                               borderRadius: 5,
// //                               fontSize: 13,
// //                               fontFamily: formStyles.fontFamily,
// //                             }}
// //                           />
// //                           <button
// //                             onClick={() => deleteOption(field.id, i)}
// //                             style={{
// //                               background: "#e74c3c",
// //                               color: "white",
// //                               border: "none",
// //                               padding: "6px 10px",
// //                               borderRadius: 5,
// //                               cursor: "pointer",
// //                             }}
// //                           >
// //                             ✕
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => addOption(field.id)}
// //                         style={{
// //                           background: "#27ae60",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontSize: 13,
// //                           fontWeight: "bold",
// //                           marginTop: 5,
// //                         }}
// //                       >
// //                         ➕ Add Option
// //                       </button>
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE - LIVE PREVIEW */}
// //         <div style={{
// //           background: "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           position: "sticky",
// //           top: "20px",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           <h2 style={{ margin: "0 0 20px 0", color: "#2c3e50", fontSize: 24 }}>
// //             👁️ Live Preview ({previewMode})
// //           </h2>
// //           <div style={previewContainerStyle}>
// //             {fields.length === 0 ? (
// //               <div style={{ textAlign: "center", padding: "60px 20px" }}>
// //                 <div style={{ fontSize: 64, marginBottom: 20 }}>📝</div>
// //                 <p style={{ color: "#95a5a6", fontSize: 18, margin: 0 }}>
// //                   Your form will appear here...
// //                 </p>
// //                 <p style={{ color: "#bdc3c7", fontSize: 14, marginTop: 10 }}>
// //                   Add fields from the left panel
// //                 </p>
// //               </div>
// //             ) : (
// //               <form onSubmit={handleSubmit}>
// //                 {fields.map(f => (
// //                   <div key={f.id} style={{ marginBottom: 20 }}>
// //                     <label style={{
// //                       display: "block",
// //                       marginBottom: 8,
// //                       fontWeight: "bold",
// //                       fontSize: 16,
// //                       color: formStyles.labelColor,
// //                       fontFamily: formStyles.fontFamily,
// //                     }}>
// //                       {f.label} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
// //                     </label>
// //                     {f.type === "text" || f.type === "email" || f.type === "number" || f.type === "date" ? (
// //                       <input
// //                         type={f.type}
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "textarea" ? (
// //                       <textarea
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         rows={4}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "select" ? (
// //                       <select
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {f.options.map((opt, i) => (
// //                           <option key={i} value={opt}>{opt}</option>
// //                         ))}
// //                       </select>
// //                     ) : f.type === "radio" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`,
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: 15,
// //                             color: formStyles.inputText,
// //                             fontFamily: formStyles.fontFamily,
// //                           }}>
// //                             <input
// //                               type="radio"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : f.type === "checkbox" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`,
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: 15,
// //                             color: formStyles.inputText,
// //                             fontFamily: formStyles.fontFamily,
// //                           }}>
// //                             <input
// //                               type="checkbox"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : f.type === "file" ? (
// //                       <input
// //                         type="file"
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : null}
// //                   </div>
// //                 ))}
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   type="submit"
// //                   style={{
// //                     background: `linear-gradient(135deg, ${formStyles.buttonBg} 0%, ${getDarkerColor(formStyles.buttonBg)} 100%)`,
// //                     color: formStyles.buttonText,
// //                     padding: "16px 50px",
// //                     fontSize: 18,
// //                     fontWeight: "bold",
// //                     border: "none",
// //                     borderRadius: formStyles.buttonRadius,
// //                     cursor: "pointer",
// //                     marginTop: 10,
// //                     boxShadow: formStyles.shadow,
// //                     transition: formStyles.transition,
// //                     position: "relative",
// //                     overflow: "hidden",
// //                     fontFamily: formStyles.fontFamily,
// //                   }}
// //                 >
// //                   <span style={{ marginRight: 8, fontSize: 22 }}>{submitButton.icon}</span>
// //                   {submitButton.text}
// //                 </motion.button>
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // six

// // import { useState, useRef, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // // Custom hook for responsive text sizing
// // const useResponsiveText = () => {
// //   const [fontSize, setFontSize] = useState(15);
// //   const updateFontSize = (size) => setFontSize(size);
// //   return { fontSize, updateFontSize };
// // };

// // // Custom hook for dynamic input sizing
// // const useDynamicInputSize = () => {
// //   const [inputSize, setInputSize] = useState("medium");
// //   const sizes = { small: 12, medium: 15, large: 18 };
// //   const updateInputSize = (size) => setInputSize(size);
// //   return { inputSize: sizes[inputSize], updateInputSize };
// // };

// // export default function ResponsiveFormBuilder() {
// //   const [fields, setFields] = useState([]);
// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
// //     transition: "all 0.3s ease",
// //   });
// //   const [submitButton, setSubmitButton] = useState({
// //     text: "Submit Form",
// //     icon: "✅",
// //   });
// //   const [showStylePanel, setShowStylePanel] = useState(false);
// //   const [previewMode, setPreviewMode] = useState("desktop");
// //   const [isDarkMode, setIsDarkMode] = useState(false);
// //   const { fontSize, updateFontSize } = useResponsiveText();
// //   const { inputSize, updateInputSize } = useDynamicInputSize();
// //   const colorPanelRef = useRef(null);

// //   // Field Types
// //   const fieldTypes = [
// //     { type: "text", icon: "📝", label: "Text" },
// //     { type: "email", icon: "📧", label: "Email" },
// //     { type: "number", icon: "🔢", label: "Number" },
// //     { type: "textarea", icon: "📄", label: "Message" },
// //     { type: "select", icon: "📋", label: "Dropdown" },
// //     { type: "radio", icon: "⭕", label: "Radio" },
// //     { type: "checkbox", icon: "✅", label: "Checkbox" },
// //     { type: "date", icon: "📅", label: "Date" },
// //     { type: "file", icon: "📎", label: "File Upload" },
// //   ];

// //   // Helper: Darken color for gradients
// //   const getDarkerColor = (color) => {
// //     try {
// //       const num = parseInt(color.replace("#", ""), 16);
// //       const r = Math.max(0, (num >> 16) - 30);
// //       const g = Math.max(0, ((num >> 8) & 0x00FF) - 30);
// //       const b = Math.max(0, (num & 0x0000FF) - 30);
// //       return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
// //     } catch {
// //       return color;
// //     }
// //   };

// //   // Field Management
// //   const addField = (type) => {
// //     const newField = {
// //       id: Date.now(),
// //       label: getDefaultLabel(type),
// //       type,
// //       placeholder: getDefaultPlaceholder(type),
// //       required: false,
// //       options: getDefaultOptions(type),
// //     };
// //     setFields([...fields, newField]);
// //   };

// //   const getDefaultLabel = (type) => {
// //     const labels = {
// //       text: "Your Name",
// //       email: "Your Email",
// //       number: "Your Age",
// //       textarea: "Your Message",
// //       select: "Choose Option",
// //       radio: "Select One",
// //       checkbox: "Check Option",
// //       date: "Select Date",
// //       file: "Upload File",
// //     };
// //     return labels[type] || "New Field";
// //   };

// //   const getDefaultPlaceholder = (type) => {
// //     const placeholders = {
// //       text: "Enter your name",
// //       email: "example@email.com",
// //       number: "Enter number",
// //       textarea: "Type your message here...",
// //       date: "",
// //       file: "",
// //     };
// //     return placeholders[type] || "";
// //   };

// //   const getDefaultOptions = (type) => {
// //     if (type === "select" || type === "radio" || type === "checkbox") {
// //       return ["Option 1", "Option 2", "Option 3"];
// //     }
// //     return [];
// //   };

// //   const updateField = (id, key, value) => {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   };

// //   const deleteField = (id) => {
// //     if (confirm("Delete this field?")) {
// //       setFields(fields.filter(f => f.id !== id));
// //     }
// //   };

// //   const moveField = (id, direction) => {
// //     const index = fields.findIndex(f => f.id === id);
// //     if (direction === "up" && index > 0) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
// //       setFields(newFields);
// //     } else if (direction === "down" && index < fields.length - 1) {
// //       const newFields = [...fields];
// //       [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
// //       setFields(newFields);
// //     }
// //   };

// //   const addOption = (fieldId) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
// //         : f
// //     ));
// //   };

// //   const updateOption = (fieldId, index, value) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? value : o)) }
// //         : f
// //     ));
// //   };

// //   const deleteOption = (fieldId, index) => {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   };

// //   // Form Submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const data = {};
// //     fields.forEach(f => {
// //       const el = document.querySelector(`[name="field-${f.id}"]`);
// //       if (f.type === "radio" || f.type === "checkbox") {
// //         const checked = document.querySelectorAll(`[name="field-${f.id}"]:checked`);
// //         data[f.label] = f.type === "checkbox"
// //           ? Array.from(checked).map(c => c.value)
// //           : (checked[0]?.value || "");
// //       } else {
// //         data[f.label] = el?.value || "";
// //       }
// //     });
// //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
// //   };

// //   // Input Style
// //   const inputStyle = {
// //     width: "100%",
// //     padding: 12,
// //     fontSize: inputSize,
// //     borderRadius: formStyles.inputRadius,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     background: formStyles.inputBg,
// //     color: formStyles.inputText,
// //     outline: "none",
// //     transition: formStyles.transition,
// //     fontFamily: formStyles.fontFamily,
// //   };

// //   // Preview Container Style
// //   const previewContainerStyle = {
// //     background: formStyles.bgColor,
// //     padding: previewMode === "mobile" ? 15 : 30,
// //     borderRadius: 12,
// //     border: `2px solid ${formStyles.inputBorder}`,
// //     minHeight: 400,
// //     boxShadow: formStyles.shadow,
// //     maxWidth: previewMode === "mobile" ? 375 : "100%",
// //     margin: previewMode === "mobile" ? "0 auto" : 0,
// //   };

// //   // Color Scheme Selector
// //   const colorSchemes = [
// //     { name: "Ocean", colors: { bgColor: "#ffffff", labelColor: "#2c3e50", inputBg: "#f8f9fa", inputBorder: "#3498db", inputText: "#2c3e50", buttonBg: "#3498db", buttonText: "#ffffff" } },
// //     { name: "Forest", colors: { bgColor: "#ffffff", labelColor: "#27ae60", inputBg: "#f0f9f0", inputBorder: "#27ae60", inputText: "#27ae60", buttonBg: "#27ae60", buttonText: "#ffffff" } },
// //     { name: "Sunset", colors: { bgColor: "#ffffff", labelColor: "#e74c3c", inputBg: "#fdf2f1", inputBorder: "#e74c3c", inputText: "#e74c3c", buttonBg: "#e74c3c", buttonText: "#ffffff" } },
// //     { name: "Midnight", colors: { bgColor: "#2c3e50", labelColor: "#ecf0f1", inputBg: "#34495e", inputBorder: "#3498db", inputText: "#ecf0f1", buttonBg: "#3498db", buttonText: "#ffffff" } },
// //   ];

// //   const applyColorScheme = (scheme) => {
// //     setFormStyles({ ...formStyles, ...scheme.colors });
// //   };

// //   // Toggle Dark Mode
// //   const toggleDarkMode = () => {
// //     setIsDarkMode(!isDarkMode);
// //     if (!isDarkMode) {
// //       setFormStyles({
// //         ...formStyles,
// //         bgColor: "#2c3e50",
// //         labelColor: "#ecf0f1",
// //         inputBg: "#34495e",
// //         inputBorder: "#3498db",
// //         inputText: "#ecf0f1",
// //         buttonBg: "#3498db",
// //         buttonText: "#ffffff",
// //       });
// //     } else {
// //       setFormStyles({
// //         ...formStyles,
// //         bgColor: "#ffffff",
// //         labelColor: "#2c3e50",
// //         inputBg: "#f8f9fa",
// //         inputBorder: "#3498db",
// //         inputText: "#2c3e50",
// //         buttonBg: "#3498db",
// //         buttonText: "#ffffff",
// //       });
// //     }
// //   };

// //   // Smooth scroll for color panel
// //   useEffect(() => {
// //     if (colorPanelRef.current) {
// //       colorPanelRef.current.scrollTo({ left: 0, behavior: "smooth" });
// //     }
// //   }, [showStylePanel]);

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: isDarkMode ? "#1a1a2e" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //         padding: "20px 0",
// //         fontFamily: formStyles.fontFamily,
// //         color: isDarkMode ? "#ecf0f1" : "#2c3e50",
// //       }}
// //     >
// //       {/* Header */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <h1 style={{
// //           color: isDarkMode ? "#ecf0f1" : "white",
// //           fontSize: 36,
// //           margin: "0 0 10px 0",
// //           textShadow: isDarkMode ? "none" : "2px 2px 4px rgba(0,0,0,0.3)",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           ✨ Responsive Form Builder
// //         </h1>
// //         <p style={{
// //           color: isDarkMode ? "rgba(236, 240, 241, 0.9)" : "rgba(255,255,255,0.9)",
// //           fontSize: 16,
// //           margin: 0,
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           Build left 👈 | Preview right 👉
// //         </p>
// //       </div>

// //       {/* Preview Mode Toggle */}
// //       <div style={{ textAlign: "center", marginBottom: 20 }}>
// //         <button
// //           onClick={() => setPreviewMode(p => p === "desktop" ? "mobile" : "desktop")}
// //           style={{
// //             background: previewMode === "desktop" ? "#3498db" : "#2ecc71",
// //             color: "white",
// //             border: "none",
// //             padding: "8px 16px",
// //             borderRadius: 20,
// //             cursor: "pointer",
// //             fontWeight: "bold",
// //             fontFamily: formStyles.fontFamily,
// //           }}
// //         >
// //           {previewMode === "desktop" ? "📱 Mobile Preview" : "🖥️ Desktop Preview"}
// //         </button>
// //         <button
// //           onClick={toggleDarkMode}
// //           style={{
// //             background: isDarkMode ? "#f1c40f" : "#34495e",
// //             color: "white",
// //             border: "none",
// //             padding: "8px 16px",
// //             borderRadius: 20,
// //             cursor: "pointer",
// //             fontWeight: "bold",
// //             marginLeft: 10,
// //             fontFamily: formStyles.fontFamily,
// //           }}
// //         >
// //           {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
// //         </button>
// //       </div>

// //       {/* Main Container - Split Screen */}
// //       <div style={{
// //         display: "grid",
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: 20,
// //         maxWidth: 1400,
// //         margin: "0 auto",
// //         padding: "0 20px",
// //         "@media (max-width: 768px)": {
// //           gridTemplateColumns: "1fr",
// //         },
// //       }}>
// //         {/* LEFT SIDE - BUILD PANEL */}
// //         <div style={{
// //           background: isDarkMode ? "#2c3e50" : "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           {/* Build Panel Header */}
// //           <div style={{ position: "sticky", top: 0, background: isDarkMode ? "#2c3e50" : "white", paddingBottom: 15, zIndex: 10 }}>
// //             <h2 style={{ margin: "0 0 15px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 24 }}>
// //               🔧 Build Your Form
// //             </h2>
// //             {/* Quick Add Buttons */}
// //             <div style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(3, 1fr)",
// //               gap: 10,
// //               marginBottom: 15,
// //             }}>
// //               {fieldTypes.map(btn => (
// //                 <button
// //                   key={btn.type}
// //                   onClick={() => addField(btn.type)}
// //                   style={{
// //                     padding: "12px 8px",
// //                     fontSize: 13,
// //                     fontWeight: "bold",
// //                     border: "2px solid #3498db",
// //                     borderRadius: 8,
// //                     cursor: "pointer",
// //                     background: isDarkMode ? "#34495e" : "white",
// //                     color: isDarkMode ? "#ecf0f1" : "#3498db",
// //                     transition: "all 0.2s",
// //                     fontFamily: formStyles.fontFamily,
// //                   }}
// //                   onMouseOver={e => {
// //                     e.target.style.background = "#3498db";
// //                     e.target.style.color = "white";
// //                     e.target.style.transform = "scale(1.05)";
// //                   }}
// //                   onMouseOut={e => {
// //                     e.target.style.background = isDarkMode ? "#34495e" : "white";
// //                     e.target.style.color = isDarkMode ? "#ecf0f1" : "#3498db";
// //                     e.target.style.transform = "scale(1)";
// //                   }}
// //                 >
// //                   <div style={{ fontSize: 20, marginBottom: 4 }}>{btn.icon}</div>
// //                   {btn.label}
// //                 </button>
// //               ))}
// //             </div>
// //             {/* Style Button */}
// //             <button
// //               onClick={() => setShowStylePanel(!showStylePanel)}
// //               style={{
// //                 width: "100%",
// //                 padding: 12,
// //                 fontSize: 15,
// //                 fontWeight: "bold",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 background: showStylePanel ? "#9b59b6" : "#8e44ad",
// //                 color: "white",
// //                 transition: "all 0.3s",
// //                 marginBottom: 10,
// //                 fontFamily: formStyles.fontFamily,
// //               }}
// //             >
// //               🎨 {showStylePanel ? "Hide" : "Show"} Color Settings
// //             </button>
// //             {/* Submit Button Settings */}
// //             <div style={{
// //               background: isDarkMode ? "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //               padding: 15,
// //               borderRadius: 10,
// //               color: "white",
// //             }}>
// //               <h3 style={{ margin: "0 0 10px 0", fontSize: 16 }}>🔘 Submit Button</h3>
// //               <input
// //                 type="text"
// //                 placeholder="Button Text"
// //                 value={submitButton.text}
// //                 onChange={e => setSubmitButton({...submitButton, text: e.target.value})}
// //                 style={{
// //                   width: "100%",
// //                   padding: 10,
// //                   marginBottom: 8,
// //                   border: "none",
// //                   borderRadius: 6,
// //                   fontSize: 14,
// //                   fontWeight: "bold",
// //                   fontFamily: formStyles.fontFamily,
// //                   background: isDarkMode ? "#34495e" : "rgba(255,255,255,0.2)",
// //                   color: "white",
// //                 }}
// //               />
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ display: "block", fontSize: 13, marginBottom: 8, fontWeight: "bold" }}>
// //                   Choose Icon:
// //                 </label>
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5 }}>
// //                   {["✅", "🚀", "📤", "💾", "👍", "✔️", "📨", "🎯", "⚡", "🔥", "💪", "🎉"].map(emoji => (
// //                     <button
// //                       key={emoji}
// //                       onClick={() => setSubmitButton({...submitButton, icon: emoji})}
// //                       style={{
// //                         padding: 8,
// //                         fontSize: 20,
// //                         border: submitButton.icon === emoji ? "3px solid #ffd700" : "2px solid white",
// //                         borderRadius: 6,
// //                         cursor: "pointer",
// //                         background: submitButton.icon === emoji ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
// //                         transition: "all 0.2s",
// //                       }}
// //                     >
// //                       {emoji}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Style Panel */}
// //           {showStylePanel && (
// //             <div style={{
// //               background: isDarkMode ? "#34495e" : "#f8f9fa",
// //               padding: 15,
// //               borderRadius: 10,
// //               marginTop: 15,
// //               marginBottom: 15,
// //             }}>
// //               <h3 style={{ margin: "0 0 15px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 18 }}>🎨 Customize Colors</h3>
// //               {/* Color Scheme Selector */}
// //               <div style={{ marginBottom: 15 }}>
// //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                   🌈 Color Schemes
// //                 </label>
// //                 <div
// //                   ref={colorPanelRef}
// //                   style={{
// //                     display: "flex",
// //                     gap: 10,
// //                     overflowX: "auto",
// //                     paddingBottom: 10,
// //                     scrollbarWidth: "none",
// //                     msOverflowStyle: "none",
// //                   }}
// //                 >
// //                   {colorSchemes.map((scheme, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() => applyColorScheme(scheme)}
// //                       style={{
// //                         padding: "8px 12px",
// //                         borderRadius: 6,
// //                         border: "none",
// //                         cursor: "pointer",
// //                         background: scheme.colors.buttonBg,
// //                         color: scheme.colors.buttonText,
// //                         fontWeight: "bold",
// //                         whiteSpace: "nowrap",
// //                       }}
// //                     >
// //                       {scheme.name}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //               {/* Individual Color Pickers */}
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                 {[
// //                   { key: "bgColor", label: "Background", icon: "🎨" },
// //                   { key: "labelColor", label: "Labels", icon: "🏷️" },
// //                   { key: "inputBg", label: "Input BG", icon: "📦" },
// //                   { key: "inputBorder", label: "Borders", icon: "🔲" },
// //                   { key: "inputText", label: "Input Text", icon: "✍️" },
// //                   { key: "buttonBg", label: "Button", icon: "🔘" },
// //                 ].map(item => (
// //                   <div key={item.key} style={{ textAlign: "center" }}>
// //                     <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                       {item.icon} {item.label}
// //                     </label>
// //                     <input
// //                       type="color"
// //                       value={formStyles[item.key]}
// //                       onChange={e => setFormStyles({...formStyles, [item.key]: e.target.value})}
// //                       style={{ width: "100%", height: 35, border: "none", borderRadius: 6, cursor: "pointer" }}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //               {/* Typography & Sizing */}
// //               <div style={{ marginTop: 15 }}>
// //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                   🔤 Font Family
// //                 </label>
// //                 <select
// //                   value={formStyles.fontFamily}
// //                   onChange={e => setFormStyles({...formStyles, fontFamily: e.target.value})}
// //                   style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
// //                 >
// //                   <option value="'Inter', sans-serif">Inter</option>
// //                   <option value="'Roboto', sans-serif">Roboto</option>
// //                   <option value="'Poppins', sans-serif">Poppins</option>
// //                   <option value="'Open Sans', sans-serif">Open Sans</option>
// //                 </select>
// //               </div>
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                   📏 Text Size
// //                 </label>
// //                 <div style={{ display: "flex", gap: 10 }}>
// //                   {[12, 15, 18].map(size => (
// //                     <button
// //                       key={size}
// //                       onClick={() => updateFontSize(size)}
// //                       style={{
// //                         padding: "6px 12px",
// //                         border: fontSize === size ? "2px solid #3498db" : "1px solid #ddd",
// //                         borderRadius: 6,
// //                         background: fontSize === size ? "#3498db" : "white",
// //                         color: fontSize === size ? "white" : "#333",
// //                         cursor: "pointer",
// //                       }}
// //                     >
// //                       {size}px
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div style={{ marginTop: 10 }}>
// //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
// //                   📏 Input Size
// //                 </label>
// //                 <div style={{ display: "flex", gap: 10 }}>
// //                   {["small", "medium", "large"].map(size => (
// //                     <button
// //                       key={size}
// //                       onClick={() => updateInputSize(size)}
// //                       style={{
// //                         padding: "6px 12px",
// //                         border: inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18) ? "2px solid #3498db" : "1px solid #ddd",
// //                         borderRadius: 6,
// //                         background: inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18) ? "#3498db" : "white",
// //                         color: inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18) ? "white" : "#333",
// //                         cursor: "pointer",
// //                       }}
// //                     >
// //                       {size}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Fields List */}
// //           {fields.length === 0 ? (
// //             <div style={{
// //               textAlign: "center",
// //               padding: "40px 20px",
// //               color: isDarkMode ? "#95a5a6" : "#95a5a6",
// //               background: isDarkMode ? "#34495e" : "#f8f9fa",
// //               borderRadius: 10,
// //               marginTop: 15,
// //             }}>
// //               <div style={{ fontSize: 48, marginBottom: 15 }}>👆</div>
// //               <p style={{ fontSize: 16, margin: 0 }}>Click a button above to add your first field</p>
// //             </div>
// //           ) : (
// //             <div style={{ marginTop: 15 }}>
// //               {fields.map((field, idx) => (
// //                 <motion.div
// //                   key={field.id}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   style={{
// //                     background: isDarkMode ? "#34495e" : "#f8f9fa",
// //                     padding: 15,
// //                     borderRadius: 10,
// //                     marginBottom: 12,
// //                     border: "2px solid #e9ecef",
// //                   }}
// //                 >
// //                   {/* Field Header */}
// //                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //                     <span style={{
// //                       background: "#3498db",
// //                       color: "white",
// //                       padding: "4px 12px",
// //                       borderRadius: 15,
// //                       fontSize: 12,
// //                       fontWeight: "bold",
// //                     }}>
// //                       #{idx + 1} {field.type.toUpperCase()}
// //                     </span>
// //                     <div style={{ display: "flex", gap: 5 }}>
// //                       <button
// //                         onClick={() => moveField(field.id, "up")}
// //                         disabled={idx === 0}
// //                         style={{
// //                           background: idx === 0 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === 0 ? "not-allowed" : "pointer",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         ⬆️
// //                       </button>
// //                       <button
// //                         onClick={() => moveField(field.id, "down")}
// //                         disabled={idx === fields.length - 1}
// //                         style={{
// //                           background: idx === fields.length - 1 ? "#ddd" : "#95a5a6",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 10px",
// //                           borderRadius: 5,
// //                           cursor: idx === fields.length - 1 ? "not-allowed" : "pointer",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         ⬇️
// //                       </button>
// //                       <button
// //                         onClick={() => deleteField(field.id)}
// //                         style={{
// //                           background: "#e74c3c",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                           fontSize: 14,
// //                         }}
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   </div>
// //                   {/* Label Input */}
// //                   <input
// //                     type="text"
// //                     placeholder="Field Label"
// //                     value={field.label}
// //                     onChange={e => updateField(field.id, "label", e.target.value)}
// //                     style={{
// //                       width: "100%",
// //                       padding: 10,
// //                       marginBottom: 8,
// //                       border: "2px solid #ddd",
// //                       borderRadius: 6,
// //                       fontSize: 14,
// //                       fontWeight: "bold",
// //                       fontFamily: formStyles.fontFamily,
// //                       background: isDarkMode ? "#2c3e50" : "white",
// //                       color: isDarkMode ? "#ecf0f1" : "#2c3e50",
// //                     }}
// //                   />
// //                   {/* Placeholder Input */}
// //                   {field.type !== "select" && field.type !== "radio" && field.type !== "checkbox" && field.type !== "date" && field.type !== "file" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Placeholder text"
// //                       value={field.placeholder}
// //                       onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                       style={{
// //                         width: "100%",
// //                         padding: 10,
// //                         marginBottom: 8,
// //                         border: "2px solid #ddd",
// //                         borderRadius: 6,
// //                         fontSize: 14,
// //                         fontFamily: formStyles.fontFamily,
// //                         background: isDarkMode ? "#2c3e50" : "white",
// //                         color: isDarkMode ? "#ecf0f1" : "#2c3e50",
// //                       }}
// //                     />
// //                   )}
// //                   {/* Required Toggle */}
// //                   <label style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     cursor: "pointer",
// //                     fontSize: 14,
// //                     fontWeight: "bold",
// //                     marginBottom: 10,
// //                   }}>
// //                     <input
// //                       type="checkbox"
// //                       checked={field.required}
// //                       onChange={e => updateField(field.id, "required", e.target.checked)}
// //                       style={{ width: 18, height: 18, marginRight: 8, cursor: "pointer" }}
// //                     />
// //                     Required field
// //                   </label>
// //                   {/* Options for Select/Radio/Checkbox */}
// //                   {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
// //                     <div style={{ marginTop: 10, padding: 10, background: isDarkMode ? "#2c3e50" : "white", borderRadius: 6 }}>
// //                       <b style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Options:</b>
// //                       {field.options.map((opt, i) => (
// //                         <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
// //                           <input
// //                             value={opt}
// //                             onChange={e => updateOption(field.id, i, e.target.value)}
// //                             style={{
// //                               flex: 1,
// //                               padding: 8,
// //                               border: "2px solid #ddd",
// //                               borderRadius: 5,
// //                               fontSize: 13,
// //                               fontFamily: formStyles.fontFamily,
// //                               background: isDarkMode ? "#34495e" : "white",
// //                               color: isDarkMode ? "#ecf0f1" : "#2c3e50",
// //                             }}
// //                           />
// //                           <button
// //                             onClick={() => deleteOption(field.id, i)}
// //                             style={{
// //                               background: "#e74c3c",
// //                               color: "white",
// //                               border: "none",
// //                               padding: "6px 10px",
// //                               borderRadius: 5,
// //                               cursor: "pointer",
// //                             }}
// //                           >
// //                             ✕
// //                           </button>
// //                         </div>
// //                       ))}
// //                       <button
// //                         onClick={() => addOption(field.id)}
// //                         style={{
// //                           background: "#27ae60",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "6px 12px",
// //                           borderRadius: 5,
// //                           cursor: "pointer",
// //                           fontSize: 13,
// //                           fontWeight: "bold",
// //                           marginTop: 5,
// //                         }}
// //                       >
// //                         ➕ Add Option
// //                       </button>
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE - LIVE PREVIEW */}
// //         <div style={{
// //           background: isDarkMode ? "#2c3e50" : "white",
// //           borderRadius: 15,
// //           padding: 25,
// //           boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
// //           maxHeight: "85vh",
// //           overflow: "auto",
// //           position: "sticky",
// //           top: "20px",
// //           fontFamily: formStyles.fontFamily,
// //         }}>
// //           <h2 style={{ margin: "0 0 20px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 24 }}>
// //             👁️ Live Preview ({previewMode})
// //           </h2>
// //           <div style={previewContainerStyle}>
// //             {fields.length === 0 ? (
// //               <div style={{ textAlign: "center", padding: "60px 20px" }}>
// //                 <div style={{ fontSize: 64, marginBottom: 20 }}>📝</div>
// //                 <p style={{ color: isDarkMode ? "#95a5a6" : "#95a5a6", fontSize: 18, margin: 0 }}>
// //                   Your form will appear here...
// //                 </p>
// //                 <p style={{ color: isDarkMode ? "#bdc3c7" : "#bdc3c7", fontSize: 14, marginTop: 10 }}>
// //                   Add fields from the left panel
// //                 </p>
// //               </div>
// //             ) : (
// //               <form onSubmit={handleSubmit}>
// //                 {fields.map(f => (
// //                   <div key={f.id} style={{ marginBottom: 20 }}>
// //                     <label style={{
// //                       display: "block",
// //                       marginBottom: 8,
// //                       fontWeight: "bold",
// //                       fontSize: fontSize,
// //                       color: formStyles.labelColor,
// //                       fontFamily: formStyles.fontFamily,
// //                     }}>
// //                       {f.label} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
// //                     </label>
// //                     {f.type === "text" || f.type === "email" || f.type === "number" || f.type === "date" ? (
// //                       <input
// //                         type={f.type}
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "textarea" ? (
// //                       <textarea
// //                         placeholder={f.placeholder}
// //                         name={`field-${f.id}`}
// //                         rows={4}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : f.type === "select" ? (
// //                       <select
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {f.options.map((opt, i) => (
// //                           <option key={i} value={opt}>{opt}</option>
// //                         ))}
// //                       </select>
// //                     ) : f.type === "radio" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`,
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: fontSize,
// //                             color: formStyles.inputText,
// //                             fontFamily: formStyles.fontFamily,
// //                           }}>
// //                             <input
// //                               type="radio"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : f.type === "checkbox" ? (
// //                       <div style={{
// //                         padding: 15,
// //                         background: formStyles.inputBg,
// //                         borderRadius: formStyles.inputRadius,
// //                         border: `2px solid ${formStyles.inputBorder}`,
// //                       }}>
// //                         {f.options.map((opt, i) => (
// //                           <label key={i} style={{
// //                             display: "block",
// //                             marginBottom: 10,
// //                             cursor: "pointer",
// //                             fontSize: fontSize,
// //                             color: formStyles.inputText,
// //                             fontFamily: formStyles.fontFamily,
// //                           }}>
// //                             <input
// //                               type="checkbox"
// //                               name={`field-${f.id}`}
// //                               value={opt}
// //                               style={{ marginRight: 10, cursor: "pointer" }}
// //                             />
// //                             {opt}
// //                           </label>
// //                         ))}
// //                       </div>
// //                     ) : f.type === "file" ? (
// //                       <input
// //                         type="file"
// //                         name={`field-${f.id}`}
// //                         style={inputStyle}
// //                         onFocus={e => e.target.style.borderColor = formStyles.buttonBg}
// //                         onBlur={e => e.target.style.borderColor = formStyles.inputBorder}
// //                       />
// //                     ) : null}
// //                   </div>
// //                 ))}
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   type="submit"
// //                   style={{
// //                     background: `linear-gradient(135deg, ${formStyles.buttonBg} 0%, ${getDarkerColor(formStyles.buttonBg)} 100%)`,
// //                     color: formStyles.buttonText,
// //                     padding: "16px 50px",
// //                     fontSize: fontSize,
// //                     fontWeight: "bold",
// //                     border: "none",
// //                     borderRadius: formStyles.buttonRadius,
// //                     cursor: "pointer",
// //                     marginTop: 10,
// //                     boxShadow: formStyles.shadow,
// //                     transition: formStyles.transition,
// //                     position: "relative",
// //                     overflow: "hidden",
// //                     fontFamily: formStyles.fontFamily,
// //                   }}
// //                 >
// //                   <span style={{ marginRight: 8, fontSize: 22 }}>{submitButton.icon}</span>
// //                   {submitButton.text}
// //                 </motion.button>
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






//   // import { useState, useRef, useEffect } from "react";
//   // import { motion, AnimatePresence } from "framer-motion";

//   // // Custom hook for responsive text sizing
//   // const useResponsiveText = () => {
//   //   const [fontSize, setFontSize] = useState(15);
//   //   const updateFontSize = (size) => setFontSize(size);
//   //   return { fontSize, updateFontSize };
//   // };

//   // // Custom hook for dynamic input sizing
//   // const useDynamicInputSize = () => {
//   //   const [inputSize, setInputSize] = useState("medium");
//   //   const sizes = { small: 12, medium: 15, large: 18 };
//   //   const updateInputSize = (size) => setInputSize(size);
//   //   return { inputSize: sizes[inputSize], updateInputSize };
//   // };

//   // // Sample formData object
//   // const formData = {
//   //   name: "Contact Form",
//   //   description: "This is a sample form",
//   //   formStyles: {
//   //     bgColor: "#ffffff",
//   //     labelColor: "#2c3e50",
//   //     inputBg: "#f8f9fa",
//   //     inputBorder: "#3498db",
//   //     inputText: "#2c3e50",
//   //     buttonBg: "#3498db",
//   //     buttonText: "#ffffff",
//   //     buttonRadius: 8,
//   //     inputRadius: 6,
//   //     fontFamily: "'Inter', sans-serif",
//   //     fontSize: 15,
//   //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
//   //     transition: "all 0.3s ease",
//   //   },
//   //   submitButton: {
//   //     text: "Submit Form",
//   //     icon: "✅",
//   //   },
//   //   fields: [
//   //     {
//   //       id: "field_1",
//   //       label: "Your Name",
//   //       type: "text",
//   //       placeholder: "Enter your name",
//   //       required: false,
//   //       options: [],
//   //     },
//   //     {
//   //       id: "field_2",
//   //       label: "Your Email",
//   //       type: "email",
//   //       placeholder: "example@email.com",
//   //       required: true,
//   //       options: [],
//   //     },
//   //   ],
//   //   meta: {
//   //     createdBy: "AdminUser",
//   //     published: false,
//   //   },
//   // };

//   // export default function ResponsiveFormBuilder() {
//   //   // Initialize state with formData
//   //   const [fields, setFields] = useState(formData.fields || []);
//   //   const [formStyles, setFormStyles] = useState(formData.formStyles || {
//   //     bgColor: "#ffffff",
//   //     labelColor: "#2c3e50",
//   //     inputBg: "#f8f9fa",
//   //     inputBorder: "#3498db",
//   //     inputText: "#2c3e50",
//   //     buttonBg: "#3498db",
//   //     buttonText: "#ffffff",
//   //     buttonRadius: 8,
//   //     inputRadius: 6,
//   //     fontFamily: "'Inter', sans-serif",
//   //     fontSize: 15,
//   //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
//   //     transition: "all 0.3s ease",
//   //   });
//   //   const [submitButton, setSubmitButton] = useState(formData.submitButton || {
//   //     text: "Submit Form",
//   //     icon: "✅",
//   //   });
//   //   const [showStylePanel, setShowStylePanel] = useState(false);
//   //   const [previewMode, setPreviewMode] = useState("desktop");
//   //   const [isDarkMode, setIsDarkMode] = useState(false);
//   //   const { fontSize, updateFontSize } = useResponsiveText();
//   //   const { inputSize, updateInputSize } = useDynamicInputSize();
//   //   const colorPanelRef = useRef(null);

//   //   // Update state if formData changes
//   //   useEffect(() => {
//   //     if (formData) {
//   //       setFields(formData.fields || []);
//   //       setFormStyles(formData.formStyles || {
//   //         bgColor: "#ffffff",
//   //         labelColor: "#2c3e50",
//   //         inputBg: "#f8f9fa",
//   //         inputBorder: "#3498db",
//   //         inputText: "#2c3e50",
//   //         buttonBg: "#3498db",
//   //         buttonText: "#ffffff",
//   //         buttonRadius: 8,
//   //         inputRadius: 6,
//   //         fontFamily: "'Inter', sans-serif",
//   //         fontSize: 15,
//   //         shadow: "0 4px 15px rgba(0,0,0,0.1)",
//   //         transition: "all 0.3s ease",
//   //       });
//   //       setSubmitButton(formData.submitButton || {
//   //         text: "Submit Form",
//   //         icon: "✅",
//   //       });
//   //     }
//   //   }, []);

//   //   // Field Types
//   //   const fieldTypes = [
//   //     { type: "text", icon: "📝", label: "Text" },
//   //     { type: "email", icon: "📧", label: "Email" },
//   //     { type: "number", icon: "🔢", label: "Number" },
//   //     { type: "textarea", icon: "📄", label: "Message" },
//   //     { type: "select", icon: "📋", label: "Dropdown" },
//   //     { type: "radio", icon: "⭕", label: "Radio" },
//   //     { type: "checkbox", icon: "✅", label: "Checkbox" },
//   //     { type: "date", icon: "📅", label: "Date" },
//   //     { type: "file", icon: "📎", label: "File Upload" },
//   //   ];

//   //   // Helper: Darken color for gradients
//   //   const getDarkerColor = (color) => {
//   //     try {
//   //       const num = parseInt(color.replace("#", ""), 16);
//   //       const r = Math.max(0, (num >> 16) - 30);
//   //       const g = Math.max(0, ((num >> 8) & 0x00FF) - 30);
//   //       const b = Math.max(0, (num & 0x0000FF) - 30);
//   //       return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
//   //     } catch {
//   //       return color;
//   //     }
//   //   };

//   //   // Field Management
//   //   const addField = (type) => {
//   //     const newField = {
//   //       id: Date.now(),
//   //       label: getDefaultLabel(type),
//   //       type,
//   //       placeholder: getDefaultPlaceholder(type),
//   //       required: false,
//   //       options: getDefaultOptions(type),
//   //     };
//   //     setFields([...fields, newField]);
//   //   };

//   //   const getDefaultLabel = (type) => {
//   //     const labels = {
//   //       text: "Your Name",
//   //       email: "Your Email",
//   //       number: "Your Age",
//   //       textarea: "Your Message",
//   //       select: "Choose Option",
//   //       radio: "Select One",
//   //       checkbox: "Check Option",
//   //       date: "Select Date",
//   //       file: "Upload File",
//   //     };
//   //     return labels[type] || "New Field";
//   //   };

//   //   const getDefaultPlaceholder = (type) => {
//   //     const placeholders = {
//   //       text: "Enter your name",
//   //       email: "example@email.com",
//   //       number: "Enter number",
//   //       textarea: "Type your message here...",
//   //       date: "",
//   //       file: "",
//   //     };
//   //     return placeholders[type] || "";
//   //   };

//   //   const getDefaultOptions = (type) => {
//   //     if (type === "select" || type === "radio" || type === "checkbox") {
//   //       return ["Option 1", "Option 2", "Option 3"];
//   //     }
//   //     return [];
//   //   };

//   //   const updateField = (id, key, value) => {
//   //     setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
//   //   };

//   //   const deleteField = (id) => {
//   //     if (confirm("Delete this field?")) {
//   //       setFields(fields.filter((f) => f.id !== id));
//   //     }
//   //   };

//   //   const moveField = (id, direction) => {
//   //     const index = fields.findIndex((f) => f.id === id);
//   //     if (direction === "up" && index > 0) {
//   //       const newFields = [...fields];
//   //       [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
//   //       setFields(newFields);
//   //     } else if (direction === "down" && index < fields.length - 1) {
//   //       const newFields = [...fields];
//   //       [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
//   //       setFields(newFields);
//   //     }
//   //   };

//   //   const addOption = (fieldId) => {
//   //     setFields(
//   //       fields.map((f) =>
//   //         f.id === fieldId
//   //           ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
//   //           : f
//   //       )
//   //     );
//   //   };

//   //   const updateOption = (fieldId, index, value) => {
//   //     setFields(
//   //       fields.map((f) =>
//   //         f.id === fieldId
//   //           ? { ...f, options: f.options.map((o, i) => (i === index ? value : o)) }
//   //           : f
//   //       )
//   //     );
//   //   };

//   //   const deleteOption = (fieldId, index) => {
//   //     setFields(
//   //       fields.map((f) =>
//   //         f.id === fieldId
//   //           ? { ...f, options: f.options.filter((_, i) => i !== index) }
//   //           : f
//   //       )
//   //     );
//   //   };

//   //   // Form Submission
//   //   const handleSubmit = (e) => {




//   //     e.preventDefault();
//   //     const data = {};
//   //     fields.forEach((f) => {
//   //       const el = document.querySelector(`[name="field-${f.id}"]`);
//   //       if (f.type === "radio" || f.type === "checkbox") {
//   //         const checked = document.querySelectorAll(`[name="field-${f.id}"]:checked`);
//   //         data[f.label] = f.type === "checkbox"
//   //           ? Array.from(checked).map((c) => c.value)
//   //           : (checked[0]?.value || "");
//   //       } else {
//   //         data[f.label] = el?.value || "";
//   //       }
//   //     });

//   //     // Update formData with current state
//   //     const updatedFormData = {
//   //       ...formData,
//   //       fields,
//   //       formStyles,
//   //       submitButton,
//   //     };

//   //     alert("✅ Form Submitted!\n\n" + JSON.stringify(data, null, 2));
//   //     console.log("Updated Form Data:", updatedFormData);
//   //   };

//   //   // Input Style
//   //   const inputStyle = {
//   //     width: "100%",
//   //     padding: 12,
//   //     fontSize: inputSize,
//   //     borderRadius: formStyles.inputRadius,
//   //     border: `2px solid ${formStyles.inputBorder}`,
//   //     background: formStyles.inputBg,
//   //     color: formStyles.inputText,
//   //     outline: "none",
//   //     transition: formStyles.transition,
//   //     fontFamily: formStyles.fontFamily,
//   //   };

//   //   // Preview Container Style
//   //   const previewContainerStyle = {
//   //     background: formStyles.bgColor,
//   //     padding: previewMode === "mobile" ? 15 : 30,
//   //     borderRadius: 12,
//   //     border: `2px solid ${formStyles.inputBorder}`,
//   //     minHeight: 400,
//   //     boxShadow: formStyles.shadow,
//   //     maxWidth: previewMode === "mobile" ? 375 : "100%",
//   //     margin: previewMode === "mobile" ? "0 auto" : 0,
//   //   };

//   //   // Color Schemes
//   //   const colorSchemes = [
//   //     {
//   //       name: "Ocean",
//   //       colors: {
//   //         bgColor: "#ffffff",
//   //         labelColor: "#2c3e50",
//   //         inputBg: "#f8f9fa",
//   //         inputBorder: "#3498db",
//   //         inputText: "#2c3e50",
//   //         buttonBg: "#3498db",
//   //         buttonText: "#ffffff",
//   //       },
//   //     },
//   //     {
//   //       name: "Forest",
//   //       colors: {
//   //         bgColor: "#ffffff",
//   //         labelColor: "#27ae60",
//   //         inputBg: "#f0f9f0",
//   //         inputBorder: "#27ae60",
//   //         inputText: "#27ae60",
//   //         buttonBg: "#27ae60",
//   //         buttonText: "#ffffff",
//   //       },
//   //     },
//   //     {
//   //       name: "Sunset",
//   //       colors: {
//   //         bgColor: "#ffffff",
//   //         labelColor: "#e74c3c",
//   //         inputBg: "#fdf2f1",
//   //         inputBorder: "#e74c3c",
//   //         inputText: "#e74c3c",
//   //         buttonBg: "#e74c3c",
//   //         buttonText: "#ffffff",
//   //       },
//   //     },
//   //     {
//   //       name: "Midnight",
//   //       colors: {
//   //         bgColor: "#2c3e50",
//   //         labelColor: "#ecf0f1",
//   //         inputBg: "#34495e",
//   //         inputBorder: "#3498db",
//   //         inputText: "#ecf0f1",
//   //         buttonBg: "#3498db",
//   //         buttonText: "#ffffff",
//   //       },
//   //     },
//   //   ];

//   //   const applyColorScheme = (scheme) => {
//   //     setFormStyles({ ...formStyles, ...scheme.colors });
//   //   };

//   //   // Toggle Dark Mode
//   //   const toggleDarkMode = () => {
//   //     setIsDarkMode(!isDarkMode);
//   //     if (!isDarkMode) {
//   //       setFormStyles({
//   //         ...formStyles,
//   //         bgColor: "#2c3e50",
//   //         labelColor: "#ecf0f1",
//   //         inputBg: "#34495e",
//   //         inputBorder: "#3498db",
//   //         inputText: "#ecf0f1",
//   //         buttonBg: "#3498db",
//   //         buttonText: "#ffffff",
//   //       });
//   //     } else {
//   //       setFormStyles({
//   //         ...formStyles,
//   //         bgColor: "#ffffff",
//   //         labelColor: "#2c3e50",
//   //         inputBg: "#f8f9fa",
//   //         inputBorder: "#3498db",
//   //         inputText: "#2c3e50",
//   //         buttonBg: "#3498db",
//   //         buttonText: "#ffffff",
//   //       });
//   //     }
//   //   };

//   //   // Smooth scroll for color panel
//   //   useEffect(() => {
//   //     if (colorPanelRef.current) {
//   //       colorPanelRef.current.scrollTo({ left: 0, behavior: "smooth" });
//   //     }
//   //   }, [showStylePanel]);

//   //   return (
//   //     <div
//   //       style={{
//   //         minHeight: "100vh",
//   //         background: isDarkMode ? "#1a1a2e" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   //         padding: "20px 0",
//   //         fontFamily: formStyles.fontFamily,
//   //         color: isDarkMode ? "#ecf0f1" : "#2c3e50",
//   //       }}
//   //     >
//   //       {/* Header */}
//   //       <div style={{ textAlign: "center", marginBottom: 20 }}>
//   //         <h1
//   //           style={{
//   //             color: isDarkMode ? "#ecf0f1" : "white",
//   //             fontSize: 36,
//   //             margin: "0 0 10px 0",
//   //             textShadow: isDarkMode ? "none" : "2px 2px 4px rgba(0,0,0,0.3)",
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           ✨ Responsive Form Builder
//   //         </h1>
//   //         <p
//   //           style={{
//   //             color: isDarkMode ? "rgba(236, 240, 241, 0.9)" : "rgba(255,255,255,0.9)",
//   //             fontSize: 16,
//   //             margin: 0,
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           Build left 👈 | Preview right 👉
//   //         </p>
//   //       </div>

//   //       {/* Preview Mode Toggle */}
//   //       <div style={{ textAlign: "center", marginBottom: 20 }}>
//   //         <button
//   //           onClick={() => setPreviewMode((p) => (p === "desktop" ? "mobile" : "desktop"))}
//   //           style={{
//   //             background: previewMode === "desktop" ? "#3498db" : "#2ecc71",
//   //             color: "white",
//   //             border: "none",
//   //             padding: "8px 16px",
//   //             borderRadius: 20,
//   //             cursor: "pointer",
//   //             fontWeight: "bold",
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           {previewMode === "desktop" ? "📱 Mobile Preview" : "🖥️ Desktop Preview"}
//   //         </button>
//   //         <button
//   //           onClick={toggleDarkMode}
//   //           style={{
//   //             background: isDarkMode ? "#f1c40f" : "#34495e",
//   //             color: "white",
//   //             border: "none",
//   //             padding: "8px 16px",
//   //             borderRadius: 20,
//   //             cursor: "pointer",
//   //             fontWeight: "bold",
//   //             marginLeft: 10,
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//   //         </button>
//   //       </div>

//   //       {/* Main Container - Split Screen */}
//   //       <div
//   //         style={{
//   //           display: "grid",
//   //           gridTemplateColumns: "1fr 1fr",
//   //           gap: 20,
//   //           maxWidth: 1400,
//   //           margin: "0 auto",
//   //           padding: "0 20px",
//   //           "@media (max-width: 768px)": {
//   //             gridTemplateColumns: "1fr",
//   //           },
//   //         }}
//   //       >
//   //         {/* LEFT SIDE - BUILD PANEL */}
//   //         <div
//   //           style={{
//   //             background: isDarkMode ? "#2c3e50" : "white",
//   //             borderRadius: 15,
//   //             padding: 25,
//   //             boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
//   //             maxHeight: "85vh",
//   //             overflow: "auto",
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           {/* Build Panel Header */}
//   //           <div style={{ position: "sticky", top: 0, background: isDarkMode ? "#2c3e50" : "white", paddingBottom: 15, zIndex: 10 }}>
//   //             <h2 style={{ margin: "0 0 15px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 24 }}>
//   //               🔧 Build Your Form
//   //             </h2>
//   //             {/* Quick Add Buttons */}
//   //             <div
//   //               style={{
//   //                 display: "grid",
//   //                 gridTemplateColumns: "repeat(3, 1fr)",
//   //                 gap: 10,
//   //                 marginBottom: 15,
//   //               }}
//   //             >
//   //               {fieldTypes.map((btn) => (
//   //                 <button
//   //                   key={btn.type}
//   //                   onClick={() => addField(btn.type)}
//   //                   style={{
//   //                     padding: "12px 8px",
//   //                     fontSize: 13,
//   //                     fontWeight: "bold",
//   //                     border: "2px solid #3498db",
//   //                     borderRadius: 8,
//   //                     cursor: "pointer",
//   //                     background: isDarkMode ? "#34495e" : "white",
//   //                     color: isDarkMode ? "#ecf0f1" : "#3498db",
//   //                     transition: "all 0.2s",
//   //                     fontFamily: formStyles.fontFamily,
//   //                   }}
//   //                   onMouseOver={(e) => {
//   //                     e.target.style.background = "#3498db";
//   //                     e.target.style.color = "white";
//   //                     e.target.style.transform = "scale(1.05)";
//   //                   }}
//   //                   onMouseOut={(e) => {
//   //                     e.target.style.background = isDarkMode ? "#34495e" : "white";
//   //                     e.target.style.color = isDarkMode ? "#ecf0f1" : "#3498db";
//   //                     e.target.style.transform = "scale(1)";
//   //                   }}
//   //                 >
//   //                   <div style={{ fontSize: 20, marginBottom: 4 }}>{btn.icon}</div>
//   //                   {btn.label}
//   //                 </button>
//   //               ))}
//   //             </div>
//   //             {/* Style Button */}
//   //             <button
//   //               onClick={() => setShowStylePanel(!showStylePanel)}
//   //               style={{
//   //                 width: "100%",
//   //                 padding: 12,
//   //                 fontSize: 15,
//   //                 fontWeight: "bold",
//   //                 border: "none",
//   //                 borderRadius: 8,
//   //                 cursor: "pointer",
//   //                 background: showStylePanel ? "#9b59b6" : "#8e44ad",
//   //                 color: "white",
//   //                 transition: "all 0.3s",
//   //                 marginBottom: 10,
//   //                 fontFamily: formStyles.fontFamily,
//   //               }}
//   //             >
//   //               🎨 {showStylePanel ? "Hide" : "Show"} Color Settings
//   //             </button>
//   //             {/* Submit Button Settings */}
//   //             <div
//   //               style={{
//   //                 background: isDarkMode
//   //                   ? "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)"
//   //                   : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   //                 padding: 15,
//   //                 borderRadius: 10,
//   //                 color: "white",
//   //               }}
//   //             >
//   //               <h3 style={{ margin: "0 0 10px 0", fontSize: 16 }}>🔘 Submit Button</h3>
//   //               <input
//   //                 type="text"
//   //                 placeholder="Button Text"
//   //                 value={submitButton.text}
//   //                 onChange={(e) => setSubmitButton({ ...submitButton, text: e.target.value })}
//   //                 style={{
//   //                   width: "100%",
//   //                   padding: 10,
//   //                   marginBottom: 8,
//   //                   border: "none",
//   //                   borderRadius: 6,
//   //                   fontSize: 14,
//   //                   fontWeight: "bold",
//   //                   fontFamily: formStyles.fontFamily,
//   //                   background: isDarkMode ? "#34495e" : "rgba(255,255,255,0.2)",
//   //                   color: "white",
//   //                 }}
//   //               />
//   //               <div style={{ marginTop: 10 }}>
//   //                 <label style={{ display: "block", fontSize: 13, marginBottom: 8, fontWeight: "bold" }}>
//   //                   Choose Icon:
//   //                 </label>
//   //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5 }}>
//   //                   {["✅", "🚀", "📤", "💾", "👍", "✔️", "📨", "🎯", "⚡", "🔥", "💪", "🎉"].map((emoji) => (
//   //                     <button
//   //                       key={emoji}
//   //                       onClick={() => setSubmitButton({ ...submitButton, icon: emoji })}
//   //                       style={{
//   //                         padding: 8,
//   //                         fontSize: 20,
//   //                         border: submitButton.icon === emoji ? "3px solid #ffd700" : "2px solid white",
//   //                         borderRadius: 6,
//   //                         cursor: "pointer",
//   //                         background:
//   //                           submitButton.icon === emoji ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
//   //                         transition: "all 0.2s",
//   //                       }}
//   //                     >
//   //                       {emoji}
//   //                     </button>
//   //                   ))}
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>

//   //           {/* Style Panel */}
//   //           {showStylePanel && (
//   //             <div
//   //               style={{
//   //                 background: isDarkMode ? "#34495e" : "#f8f9fa",
//   //                 padding: 15,
//   //                 borderRadius: 10,
//   //                 marginTop: 15,
//   //                 marginBottom: 15,
//   //               }}
//   //             >
//   //               <h3 style={{ margin: "0 0 15px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 18 }}>
//   //                 🎨 Customize Colors
//   //               </h3>
//   //               {/* Color Scheme Selector */}
//   //               <div style={{ marginBottom: 15 }}>
//   //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
//   //                   🌈 Color Schemes
//   //                 </label>
//   //                 <div
//   //                   ref={colorPanelRef}
//   //                   style={{
//   //                     display: "flex",
//   //                     gap: 10,
//   //                     overflowX: "auto",
//   //                     paddingBottom: 10,
//   //                     scrollbarWidth: "none",
//   //                     msOverflowStyle: "none",
//   //                   }}
//   //                 >
//   //                   {colorSchemes.map((scheme, i) => (
//   //                     <button
//   //                       key={i}
//   //                       onClick={() => applyColorScheme(scheme)}
//   //                       style={{
//   //                         padding: "8px 12px",
//   //                         borderRadius: 6,
//   //                         border: "none",
//   //                         cursor: "pointer",
//   //                         background: scheme.colors.buttonBg,
//   //                         color: scheme.colors.buttonText,
//   //                         fontWeight: "bold",
//   //                         whiteSpace: "nowrap",
//   //                       }}
//   //                     >
//   //                       {scheme.name}
//   //                     </button>
//   //                   ))}
//   //                 </div>
//   //               </div>
//   //               {/* Individual Color Pickers */}
//   //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//   //                 {[
//   //                   { key: "bgColor", label: "Background", icon: "🎨" },
//   //                   { key: "labelColor", label: "Labels", icon: "🏷️" },
//   //                   { key: "inputBg", label: "Input BG", icon: "📦" },
//   //                   { key: "inputBorder", label: "Borders", icon: "🔲" },
//   //                   { key: "inputText", label: "Input Text", icon: "✍️" },
//   //                   { key: "buttonBg", label: "Button", icon: "🔘" },
//   //                 ].map((item) => (
//   //                   <div key={item.key} style={{ textAlign: "center" }}>
//   //                     <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
//   //                       {item.icon} {item.label}
//   //                     </label>
//   //                     <input
//   //                       type="color"
//   //                       value={formStyles[item.key]}
//   //                       onChange={(e) => setFormStyles({ ...formStyles, [item.key]: e.target.value })}
//   //                       style={{ width: "100%", height: 35, border: "none", borderRadius: 6, cursor: "pointer" }}
//   //                     />
//   //                   </div>
//   //                 ))}
//   //               </div>
//   //               {/* Typography & Sizing */}
//   //               <div style={{ marginTop: 15 }}>
//   //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
//   //                   🔤 Font Family
//   //                 </label>
//   //                 <select
//   //                   value={formStyles.fontFamily}
//   //                   onChange={(e) => setFormStyles({ ...formStyles, fontFamily: e.target.value })}
//   //                   style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//   //                 >
//   //                   <option value="'Inter', sans-serif">Inter</option>
//   //                   <option value="'Roboto', sans-serif">Roboto</option>
//   //                   <option value="'Poppins', sans-serif">Poppins</option>
//   //                   <option value="'Open Sans', sans-serif">Open Sans</option>
//   //                 </select>
//   //               </div>
//   //               <div style={{ marginTop: 10 }}>
//   //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
//   //                   📏 Text Size
//   //                 </label>
//   //                 <div style={{ display: "flex", gap: 10 }}>
//   //                   {[12, 15, 18].map((size) => (
//   //                     <button
//   //                       key={size}
//   //                       onClick={() => updateFontSize(size)}
//   //                       style={{
//   //                         padding: "6px 12px",
//   //                         border: fontSize === size ? "2px solid #3498db" : "1px solid #ddd",
//   //                         borderRadius: 6,
//   //                         background: fontSize === size ? "#3498db" : "white",
//   //                         color: fontSize === size ? "white" : "#333",
//   //                         cursor: "pointer",
//   //                       }}
//   //                     >
//   //                       {size}px
//   //                     </button>
//   //                   ))}
//   //                 </div>
//   //               </div>
//   //               <div style={{ marginTop: 10 }}>
//   //                 <label style={{ display: "block", fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
//   //                   📏 Input Size
//   //                 </label>
//   //                 <div style={{ display: "flex", gap: 10 }}>
//   //                   {["small", "medium", "large"].map((size) => (
//   //                     <button
//   //                       key={size}
//   //                       onClick={() => updateInputSize(size)}
//   //                       style={{
//   //                         padding: "6px 12px",
//   //                         border:
//   //                           inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18)
//   //                             ? "2px solid #3498db"
//   //                             : "1px solid #ddd",
//   //                         borderRadius: 6,
//   //                         background:
//   //                           inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18)
//   //                             ? "#3498db"
//   //                             : "white",
//   //                         color:
//   //                           inputSize === (size === "small" ? 12 : size === "medium" ? 15 : 18)
//   //                             ? "white"
//   //                             : "#333",
//   //                         cursor: "pointer",
//   //                       }}
//   //                     >
//   //                       {size}
//   //                     </button>
//   //                   ))}
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           )}

//   //           {/* Fields List */}
//   //           {fields.length === 0 ? (
//   //             <div
//   //               style={{
//   //                 textAlign: "center",
//   //                 padding: "40px 20px",
//   //                 color: isDarkMode ? "#95a5a6" : "#95a5a6",
//   //                 background: isDarkMode ? "#34495e" : "#f8f9fa",
//   //                 borderRadius: 10,
//   //                 marginTop: 15,
//   //               }}
//   //             >
//   //               <div style={{ fontSize: 48, marginBottom: 15 }}>👆</div>
//   //               <p style={{ fontSize: 16, margin: 0 }}>Click a button above to add your first field</p>
//   //             </div>
//   //           ) : (
//   //             <div style={{ marginTop: 15 }}>
//   //               {fields.map((field, idx) => (
//   //                 <motion.div
//   //                   key={field.id}
//   //                   initial={{ opacity: 0, y: 10 }}
//   //                   animate={{ opacity: 1, y: 0 }}
//   //                   exit={{ opacity: 0, y: -10 }}
//   //                   style={{
//   //                     background: isDarkMode ? "#34495e" : "#f8f9fa",
//   //                     padding: 15,
//   //                     borderRadius: 10,
//   //                     marginBottom: 12,
//   //                     border: "2px solid #e9ecef",
//   //                   }}
//   //                 >
//   //                   {/* Field Header */}
//   //                   <div
//   //                     style={{
//   //                       display: "flex",
//   //                       justifyContent: "space-between",
//   //                       alignItems: "center",
//   //                       marginBottom: 12,
//   //                     }}
//   //                   >
//   //                     <span
//   //                       style={{
//   //                         background: "#3498db",
//   //                         color: "white",
//   //                         padding: "4px 12px",
//   //                         borderRadius: 15,
//   //                         fontSize: 12,
//   //                         fontWeight: "bold",
//   //                       }}
//   //                     >
//   //                       #{idx + 1} {field.type.toUpperCase()}
//   //                     </span>
//   //                     <div style={{ display: "flex", gap: 5 }}>
//   //                       <button
//   //                         onClick={() => moveField(field.id, "up")}
//   //                         disabled={idx === 0}
//   //                         style={{
//   //                           background: idx === 0 ? "#ddd" : "#95a5a6",
//   //                           color: "white",
//   //                           border: "none",
//   //                           padding: "6px 10px",
//   //                           borderRadius: 5,
//   //                           cursor: idx === 0 ? "not-allowed" : "pointer",
//   //                           fontSize: 14,
//   //                         }}
//   //                       >
//   //                         ⬆️
//   //                       </button>
//   //                       <button
//   //                         onClick={() => moveField(field.id, "down")}
//   //                         disabled={idx === fields.length - 1}
//   //                         style={{
//   //                           background: idx === fields.length - 1 ? "#ddd" : "#95a5a6",
//   //                           color: "white",
//   //                           border: "none",
//   //                           padding: "6px 10px",
//   //                           borderRadius: 5,
//   //                           cursor: idx === fields.length - 1 ? "not-allowed" : "pointer",
//   //                           fontSize: 14,
//   //                         }}
//   //                       >
//   //                         ⬇️
//   //                       </button>
//   //                       <button
//   //                         onClick={() => deleteField(field.id)}
//   //                         style={{
//   //                           background: "#e74c3c",
//   //                           color: "white",
//   //                           border: "none",
//   //                           padding: "6px 12px",
//   //                           borderRadius: 5,
//   //                           cursor: "pointer",
//   //                           fontWeight: "bold",
//   //                           fontSize: 14,
//   //                         }}
//   //                       >
//   //                         🗑️
//   //                       </button>
//   //                     </div>
//   //                   </div>
//   //                   {/* Label Input */}
//   //                   <input
//   //                     type="text"
//   //                     placeholder="Field Label"
//   //                     value={field.label}
//   //                     onChange={(e) => updateField(field.id, "label", e.target.value)}
//   //                     style={{
//   //                       width: "100%",
//   //                       padding: 10,
//   //                       marginBottom: 8,
//   //                       border: "2px solid #ddd",
//   //                       borderRadius: 6,
//   //                       fontSize: 14,
//   //                       fontWeight: "bold",
//   //                       fontFamily: formStyles.fontFamily,
//   //                       background: isDarkMode ? "#2c3e50" : "white",
//   //                       color: isDarkMode ? "#ecf0f1" : "#2c3e50",
//   //                     }}
//   //                   />
//   //                   {/* Placeholder Input */}
//   //                   {field.type !== "select" &&
//   //                     field.type !== "radio" &&
//   //                     field.type !== "checkbox" &&
//   //                     field.type !== "date" &&
//   //                     field.type !== "file" && (
//   //                       <input
//   //                         type="text"
//   //                         placeholder="Placeholder text"
//   //                         value={field.placeholder}
//   //                         onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
//   //                         style={{
//   //                           width: "100%",
//   //                           padding: 10,
//   //                           marginBottom: 8,
//   //                           border: "2px solid #ddd",
//   //                           borderRadius: 6,
//   //                           fontSize: 14,
//   //                           fontFamily: formStyles.fontFamily,
//   //                           background: isDarkMode ? "#2c3e50" : "white",
//   //                           color: isDarkMode ? "#ecf0f1" : "#2c3e50",
//   //                         }}
//   //                       />
//   //                     )}
//   //                   {/* Required Toggle */}
//   //                   <label
//   //                     style={{
//   //                       display: "flex",
//   //                       alignItems: "center",
//   //                       cursor: "pointer",
//   //                       fontSize: 14,
//   //                       fontWeight: "bold",
//   //                       marginBottom: 10,
//   //                     }}
//   //                   >
//   //                     <input
//   //                       type="checkbox"
//   //                       checked={field.required}
//   //                       onChange={(e) => updateField(field.id, "required", e.target.checked)}
//   //                       style={{ width: 18, height: 18, marginRight: 8, cursor: "pointer" }}
//   //                     />
//   //                     Required field
//   //                   </label>
//   //                   {/* Options for Select/Radio/Checkbox */}
//   //                   {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
//   //                     <div
//   //                       style={{
//   //                         marginTop: 10,
//   //                         padding: 10,
//   //                         background: isDarkMode ? "#2c3e50" : "white",
//   //                         borderRadius: 6,
//   //                       }}
//   //                     >
//   //                       <b style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Options:</b>
//   //                       {field.options.map((opt, i) => (
//   //                         <div key={i} style={{ display: "flex", gap: 5, marginBottom: 6 }}>
//   //                           <input
//   //                             value={opt}
//   //                             onChange={(e) => updateOption(field.id, i, e.target.value)}
//   //                             style={{
//   //                               flex: 1,
//   //                               padding: 8,
//   //                               border: "2px solid #ddd",
//   //                               borderRadius: 5,
//   //                               fontSize: 13,
//   //                               fontFamily: formStyles.fontFamily,
//   //                               background: isDarkMode ? "#34495e" : "white",
//   //                               color: isDarkMode ? "#ecf0f1" : "#2c3e50",
//   //                             }}
//   //                           />
//   //                           <button
//   //                             onClick={() => deleteOption(field.id, i)}
//   //                             style={{
//   //                               background: "#e74c3c",
//   //                               color: "white",
//   //                               border: "none",
//   //                               padding: "6px 10px",
//   //                               borderRadius: 5,
//   //                               cursor: "pointer",
//   //                             }}
//   //                           >
//   //                             ✕
//   //                           </button>
//   //                         </div>
//   //                       ))}
//   //                       <button
//   //                         onClick={() => addOption(field.id)}
//   //                         style={{
//   //                           background: "#27ae60",
//   //                           color: "white",
//   //                           border: "none",
//   //                           padding: "6px 12px",
//   //                           borderRadius: 5,
//   //                           cursor: "pointer",
//   //                           fontSize: 13,
//   //                           fontWeight: "bold",
//   //                           marginTop: 5,
//   //                         }}
//   //                       >
//   //                         ➕ Add Option
//   //                       </button>
//   //                     </div>
//   //                   )}
//   //                 </motion.div>
//   //               ))}
//   //             </div>
//   //           )}
//   //         </div>

//   //         {/* RIGHT SIDE - LIVE PREVIEW */}
//   //         <div
//   //           style={{
//   //             background: isDarkMode ? "#2c3e50" : "white",
//   //             borderRadius: 15,
//   //             padding: 25,
//   //             boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
//   //             maxHeight: "85vh",
//   //             overflow: "auto",
//   //             position: "sticky",
//   //             top: "20px",
//   //             fontFamily: formStyles.fontFamily,
//   //           }}
//   //         >
//   //           <h2 style={{ margin: "0 0 20px 0", color: isDarkMode ? "#ecf0f1" : "#2c3e50", fontSize: 24 }}>
//   //             👁️ Live Preview ({previewMode})
//   //           </h2>
//   //           <div style={previewContainerStyle}>
//   //             {fields.length === 0 ? (
//   //               <div style={{ textAlign: "center", padding: "60px 20px" }}>
//   //                 <div style={{ fontSize: 64, marginBottom: 20 }}>📝</div>
//   //                 <p style={{ color: isDarkMode ? "#95a5a6" : "#95a5a6", fontSize: 18, margin: 0 }}>
//   //                   Your form will appear here...
//   //                 </p>
//   //                 <p style={{ color: isDarkMode ? "#bdc3c7" : "#bdc3c7", fontSize: 14, marginTop: 10 }}>
//   //                   Add fields from the left panel
//   //                 </p>
//   //               </div>
//   //             ) : (
//   //               <form onSubmit={handleSubmit}>
//   //                 {fields.map((f) => (
//   //                   <div key={f.id} style={{ marginBottom: 20 }}>
//   //                     <label
//   //                       style={{
//   //                         display: "block",
//   //                         marginBottom: 8,
//   //                         fontWeight: "bold",
//   //                         fontSize: fontSize,
//   //                         color: formStyles.labelColor,
//   //                         fontFamily: formStyles.fontFamily,
//   //                       }}
//   //                     >
//   //                       {f.label} {f.required && <span style={{ color: "#e74c3c" }}>*</span>}
//   //                     </label>
//   //                     {f.type === "text" || f.type === "email" || f.type === "number" || f.type === "date" ? (
//   //                       <input
//   //                         type={f.type}
//   //                         placeholder={f.placeholder}
//   //                         name={`field-${f.id}`}
//   //                         style={inputStyle}
//   //                         onFocus={(e) => (e.target.style.borderColor = formStyles.buttonBg)}
//   //                         onBlur={(e) => (e.target.style.borderColor = formStyles.inputBorder)}
//   //                       />
//   //                     ) : f.type === "textarea" ? (
//   //                       <textarea
//   //                         placeholder={f.placeholder}
//   //                         name={`field-${f.id}`}
//   //                         rows={4}
//   //                         style={inputStyle}
//   //                         onFocus={(e) => (e.target.style.borderColor = formStyles.buttonBg)}
//   //                         onBlur={(e) => (e.target.style.borderColor = formStyles.inputBorder)}
//   //                       />
//   //                     ) : f.type === "select" ? (
//   //                       <select
//   //                         name={`field-${f.id}`}
//   //                         style={inputStyle}
//   //                         onFocus={(e) => (e.target.style.borderColor = formStyles.buttonBg)}
//   //                         onBlur={(e) => (e.target.style.borderColor = formStyles.inputBorder)}
//   //                       >
//   //                         <option value="">-- Select --</option>
//   //                         {f.options.map((opt, i) => (
//   //                           <option key={i} value={opt}>
//   //                             {opt}
//   //                           </option>
//   //                         ))}
//   //                       </select>
//   //                     ) : f.type === "radio" ? (
//   //                       <div
//   //                         style={{
//   //                           padding: 15,
//   //                           background: formStyles.inputBg,
//   //                           borderRadius: formStyles.inputRadius,
//   //                           border: `2px solid ${formStyles.inputBorder}`,
//   //                         }}
//   //                       >
//   //                         {f.options.map((opt, i) => (
//   //                           <label
//   //                             key={i}
//   //                             style={{
//   //                               display: "block",
//   //                               marginBottom: 10,
//   //                               cursor: "pointer",
//   //                               fontSize: fontSize,
//   //                               color: formStyles.inputText,
//   //                               fontFamily: formStyles.fontFamily,
//   //                             }}
//   //                           >
//   //                             <input
//   //                               type="radio"
//   //                               name={`field-${f.id}`}
//   //                               value={opt}
//   //                               style={{ marginRight: 10, cursor: "pointer" }}
//   //                             />
//   //                             {opt}
//   //                           </label>
//   //                         ))}
//   //                       </div>
//   //                     ) : f.type === "checkbox" ? (
//   //                       <div
//   //                         style={{
//   //                           padding: 15,
//   //                           background: formStyles.inputBg,
//   //                           borderRadius: formStyles.inputRadius,
//   //                           border: `2px solid ${formStyles.inputBorder}`,
//   //                         }}
//   //                       >
//   //                         {f.options.map((opt, i) => (
//   //                           <label
//   //                             key={i}
//   //                             style={{
//   //                               display: "block",
//   //                               marginBottom: 10,
//   //                               cursor: "pointer",
//   //                               fontSize: fontSize,
//   //                               color: formStyles.inputText,
//   //                               fontFamily: formStyles.fontFamily,
//   //                             }}
//   //                           >
//   //                             <input
//   //                               type="checkbox"
//   //                               name={`field-${f.id}`}
//   //                               value={opt}
//   //                               style={{ marginRight: 10, cursor: "pointer" }}
//   //                             />
//   //                             {opt}
//   //                           </label>
//   //                         ))}
//   //                       </div>
//   //                     ) : f.type === "file" ? (
//   //                       <input
//   //                         type="file"
//   //                         name={`field-${f.id}`}
//   //                         style={inputStyle}
//   //                         onFocus={(e) => (e.target.style.borderColor = formStyles.buttonBg)}
//   //                         onBlur={(e) => (e.target.style.borderColor = formStyles.inputBorder)}
//   //                       />
//   //                     ) : null}
//   //                   </div>
//   //                 ))}
//   //                 <motion.button
//   //                   whileHover={{ scale: 1.02 }}
//   //                   whileTap={{ scale: 0.98 }}
//   //                   type="submit"
//   //                   style={{
//   //                     background: `linear-gradient(135deg, ${formStyles.buttonBg} 0%, ${getDarkerColor(
//   //                       formStyles.buttonBg
//   //                     )} 100%)`,
//   //                     color: formStyles.buttonText,
//   //                     padding: "16px 50px",
//   //                     fontSize: fontSize,
//   //                     fontWeight: "bold",
//   //                     border: "none",
//   //                     borderRadius: formStyles.buttonRadius,
//   //                     cursor: "pointer",
//   //                     marginTop: 10,
//   //                     boxShadow: formStyles.shadow,
//   //                     transition: formStyles.transition,
//   //                     position: "relative",
//   //                     overflow: "hidden",
//   //                     fontFamily: formStyles.fontFamily,
//   //                   }}
//   //                 >
//   //                   <span style={{ marginRight: 8, fontSize: 22 }}>{submitButton.icon}</span>
//   //                   {submitButton.text}
//   //                 </motion.button>
//   //               </form>
//   //             )}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }





















// //   import { useState } from "react";

// // export default function CustomizeForm() {
// //   const [formName, setFormName] = useState("Contact Form");
// //   const [formDescription, setFormDescription] = useState("This is sample form");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit Form");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("✅");

// //   const [fields, setFields] = useState([  ]);

// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     labelFontSize: 16,
// //     buttonFontSize: 16,
// //     padding: 12,
// //     buttonPadding: 12,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)"
// //   });

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: [],
// //         customStyles: {
// //           labelColor: "",
// //           inputBgColor: "",
// //           inputTextColor: "",
// //           inputBorderColor: ""
// //         }
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Update field custom styles
// //   function updateFieldStyle(id, styleKey, value) {
// //     setFields(fields.map(f => 
// //       f.id === id 
// //         ? { ...f, customStyles: { ...f.customStyles, [styleKey]: value } }
// //         : f
// //     ));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // Add option to dropdown or radio
// //   function addOption(fieldId) {
// //     const option = prompt("Enter option text:");
// //     if (!option) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId ? { ...f, options: [...f.options, option] } : f
// //     ));
// //   }

// //   // Edit option
// //   function editOption(fieldId, index) {
// //     const updated = prompt("Update option value:");
// //     if (!updated) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? updated : o)) }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   // Handle form submission
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });

// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save form configuration
// //   function saveFormConfig() {
// //     const formConfig = {
// //       name: formName,
// //       description: formDescription,
// //       formStyles: formStyles,
// //       submitButton: {
// //         text: submitButtonText,
// //         icon: submitButtonIcon
// //       },
// //       fields: fields.map(f => ({
// //         id: f.id,
// //         label: f.label,
// //         type: f.type,
// //         placeholder: f.placeholder,
// //         required: f.required,
// //         options: f.options,
// //         customStyles: f.customStyles
// //       })),
// //       meta: {
// //         createdBy: "AdminUser",
// //         published: false,
// //         savedAt: new Date().toISOString()
// //       }
// //     };

// //     console.log("=== FORM CONFIGURATION SAVED ===");
// //     console.log(JSON.stringify(formConfig, null, 2));
// //     console.log("================================");

// //     alert("✅ Form configuration saved to console!\n\nCheck browser console (F12) to see the JSON data.");
// //   }

// //   return (
// //     <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
// //       <div style={{ maxWidth: 1200, margin: "auto" }}>
// //         <h1 style={{ textAlign: "center", color: "#333", marginBottom: 10 }}>🎨 Advanced Form Builder</h1>

// //         {/* Form Name & Description */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h3 style={{ marginTop: 0 }}>📋 Form Information</h3>
// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Name</label>
// //             <input
// //               type="text"
// //               value={formName}
// //               onChange={e => setFormName(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Description</label>
// //             <input
// //               type="text"
// //               value={formDescription}
// //               onChange={e => setFormDescription(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Text</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonText}
// //                 onChange={e => setSubmitButtonText(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Icon</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonIcon}
// //                 onChange={e => setSubmitButtonIcon(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* GLOBAL FORM STYLING */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0 }}>🎨 Global Form Styles</h2>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Background Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.bgColor}
// //                 onChange={e => updateFormStyle("bgColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.labelColor}
// //                 onChange={e => updateFormStyle("labelColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBg}
// //                 onChange={e => updateFormStyle("inputBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Border</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBorder}
// //                 onChange={e => updateFormStyle("inputBorder", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputText}
// //                 onChange={e => updateFormStyle("inputText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonBg}
// //                 onChange={e => updateFormStyle("buttonBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonText}
// //                 onChange={e => updateFormStyle("buttonText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonRadius}
// //                 onChange={e => updateFormStyle("buttonRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.inputRadius}
// //                 onChange={e => updateFormStyle("inputRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.fontSize}
// //                 onChange={e => updateFormStyle("fontSize", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.labelFontSize}
// //                 onChange={e => updateFormStyle("labelFontSize", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonFontSize}
// //                 onChange={e => updateFormStyle("buttonFontSize", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div style={{ display: "flex", gap: 15, marginBottom: 20 }}>
// //           <button 
// //             onClick={addField}
// //             style={{
// //               background: "#2196F3",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
// //             }}
// //           >
// //             ➕ Add Form Field
// //           </button>

// //           <button 
// //             onClick={saveFormConfig}
// //             style={{
// //               background: "#4CAF50",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
// //             }}
// //           >
// //             💾 Save Configuration
// //           </button>
// //         </div>

// //         {/* FIELD CONFIGURATOR */}
// //         {fields.map(field => (
// //           <div
// //             key={field.id}
// //             style={{
// //               border: "2px solid #ddd",
// //               borderRadius: 12,
// //               padding: 20,
// //               marginBottom: 20,
// //               background: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //             }}
// //           >
// //             <h3 style={{ marginTop: 0, color: "#555" }}>⚙️ Field Configuration</h3>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Label</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter field label"
// //                 value={field.label}
// //                 onChange={e => updateField(field.id, "label", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Type</label>
// //               <select
// //                 value={field.type}
// //                 onChange={e => updateField(field.id, "type", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               >
// //                 <option value="text">Text Input</option>
// //                 <option value="email">Email Input</option>
// //                 <option value="number">Number Input</option>
// //                 <option value="textarea">Textarea</option>
// //                 <option value="select">Dropdown Select</option>
// //                 <option value="radio">Radio Group</option>
// //               </select>
// //             </div>

// //             {field.type !== "select" && field.type !== "radio" && (
// //               <div style={{ marginBottom: 15 }}>
// //                 <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Placeholder Text</label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter placeholder"
// //                   value={field.placeholder}
// //                   onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                   style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //                 />
// //               </div>
// //             )}

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={field.required}
// //                   onChange={e => updateField(field.id, "required", e.target.checked)}
// //                   style={{ marginRight: 8, width: 20, height: 20, cursor: "pointer" }}
// //                 />
// //                 <span style={{ fontWeight: "bold" }}>Required Field</span>
// //               </label>
// //             </div>

// //             {(field.type === "select" || field.type === "radio") && (
// //               <div style={{ marginBottom: 15, padding: 15, background: "#f9f9f9", borderRadius: 8 }}>
// //                 <b style={{ display: "block", marginBottom: 10 }}>Options:</b>

// //                 {field.options.map((opt, i) => (
// //                   <div key={i} style={{ display: "flex", marginBottom: 8, gap: 5 }}>
// //                     <input 
// //                       value={opt} 
// //                       readOnly 
// //                       style={{ 
// //                         flex: 1, 
// //                         padding: 8, 
// //                         borderRadius: 4, 
// //                         border: "1px solid #ddd",
// //                         background: "#fff"
// //                       }} 
// //                     />
// //                     <button
// //                       onClick={() => editOption(field.id, i)}
// //                       style={{
// //                         background: "#FF9800",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       ✏️
// //                     </button>
// //                     <button
// //                       onClick={() => deleteOption(field.id, i)}
// //                       style={{
// //                         background: "#f44336",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 ))}

// //                 <button
// //                   onClick={() => addOption(field.id)}
// //                   style={{
// //                     marginTop: 10,
// //                     background: "#4CAF50",
// //                     color: "white",
// //                     padding: "8px 16px",
// //                     border: "none",
// //                     borderRadius: 6,
// //                     cursor: "pointer"
// //                   }}
// //                 >
// //                   ➕ Add Option
// //                 </button>
// //               </div>
// //             )}

// //             <button
// //               onClick={() => deleteField(field.id)}
// //               style={{
// //                 background: "#f44336",
// //                 color: "white",
// //                 padding: "10px 20px",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 fontWeight: "bold"
// //               }}
// //             >
// //               🗑️ Delete Field
// //             </button>
// //           </div>
// //         ))}

// //         {/* LIVE PREVIEW */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0, color: "#333" }}>🔎 Live Preview</h2>

// //           <div 
// //             style={{ 
// //               border: `2px solid ${formStyles.inputBorder}`,
// //               padding: 30, 
// //               borderRadius: 12,
// //               background: formStyles.bgColor,
// //               boxShadow: formStyles.shadow
// //             }}
// //           >
// //             <h2 style={{ marginTop: 0, color: formStyles.labelColor }}>{formName}</h2>
// //             <p style={{ color: formStyles.inputText, marginBottom: 20 }}>{formDescription}</p>

// //             {fields.length === 0 ? (
// //               <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
// //                 No fields added yet. Click "Add Form Field" to start building your form.
// //               </p>
// //             ) : (
// //               <>
// //                 {fields.map(f => {
// //                   const inputStyle = {
// //                     width: "100%",
// //                     padding: `${formStyles.padding}px`,
// //                     fontSize: `${formStyles.fontSize}px`,
// //                     borderRadius: `${formStyles.inputRadius}px`,
// //                     border: `2px solid ${formStyles.inputBorder}`,
// //                     background: formStyles.inputBg,
// //                     color: formStyles.inputText,
// //                     boxSizing: "border-box"
// //                   };

// //                   return (
// //                     <div key={f.id} style={{ marginBottom: 20 }}>
// //                       <label style={{ 
// //                         display: "block", 
// //                         marginBottom: 8,
// //                         fontSize: `${formStyles.labelFontSize}px`,
// //                         fontWeight: "bold",
// //                         color: formStyles.labelColor
// //                       }}>
// //                         {f.label || "Untitled Field"} {f.required && <span style={{ color: "red" }}>*</span>}
// //                       </label>

// //                       {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                         <input
// //                           type={f.type}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         />
// //                       ) : f.type === "textarea" ? (
// //                         <textarea
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           rows={4}
// //                           style={inputStyle}
// //                         ></textarea>
// //                       ) : f.type === "select" ? (
// //                         <select 
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         >
// //                           <option value="">-- Select an option --</option>
// //                           {f.options.map((opt, i) => (
// //                             <option key={i} value={opt}>{opt}</option>
// //                           ))}
// //                         </select>
// //                       ) : f.type === "radio" ? (
// //                         <div style={{ 
// //                           padding: `${formStyles.padding}px`,
// //                           background: formStyles.inputBg,
// //                           borderRadius: `${formStyles.inputRadius}px`,
// //                           border: `2px solid ${formStyles.inputBorder}`
// //                         }}>
// //                           {f.options.map((opt, i) => (
// //                             <label 
// //                               key={i} 
// //                               style={{ 
// //                                 display: "block", 
// //                                 marginBottom: 8,
// //                                 cursor: "pointer",
// //                                 color: formStyles.inputText,
// //                                 fontSize: `${formStyles.fontSize}px`
// //                               }}
// //                             >
// //                               <input 
// //                                 type="radio" 
// //                                 name={`field-${f.id}`}
// //                                 value={opt}
// //                                 style={{ marginRight: 8, cursor: "pointer" }}
// //                               /> 
// //                               {opt}
// //                             </label>
// //                           ))}
// //                         </div>
// //                       ) : null}
// //                     </div>
// //                   );
// //                 })}

// //                 <button 
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: formStyles.buttonBg,
// //                     color: formStyles.buttonText,
// //                     padding: `${formStyles.buttonPadding}px 32px`,
// //                     border: "none",
// //                     borderRadius: `${formStyles.buttonRadius}px`,
// //                     cursor: "pointer",
// //                     fontSize: `${formStyles.buttonFontSize}px`,
// //                     fontWeight: "bold",
// //                     marginTop: 10,
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
// //                   }}
// //                 >
// //                   {submitButtonIcon} {submitButtonText}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// // import { useState } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";

// // export const loader = async ({ request }) => {
// //   // Authenticate Admin API
// //   const { admin } = await authenticate.admin(request);

// //   // Make GraphQL request
// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   // Convert response to JSON
// //   const data = await response.json();

// //   console.log("data++++", data);

// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };


// // export default function CustomizeForm() { 
// //   const [formName, setFormName] = useState("Contact Form");
// //   const [formDescription, setFormDescription] = useState("This is sample form");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit Form");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("✅");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const { shop } = useLoaderData();

// //   console.log("shop++++", shop); 


// //   const [fields, setFields] = useState([
// //   ]);

// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     labelFontSize: 16,
// //     buttonFontSize: 16,
// //     padding: 12,
// //     buttonPadding: 12,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
// //     transition: "all 0.3s ease"
// //   });

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: []
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // Add option to dropdown or radio
// //   function addOption(fieldId) {
// //     const option = prompt("Enter option text:");
// //     if (!option) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId ? { ...f, options: [...f.options, option] } : f
// //     ));
// //   }

// //   // Edit option
// //   function editOption(fieldId, index) {
// //     const updated = prompt("Update option value:");
// //     if (!updated) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? updated : o)) }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }





// //   // Handle form submission (preview form)
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });

// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save form configuration to API
// //   async function saveFormConfig() {
// //     setIsSaving(true);

// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formStyles: {
// //           bgColor: formStyles.bgColor,
// //           labelColor: formStyles.labelColor,
// //           inputBg: formStyles.inputBg,
// //           inputBorder: formStyles.inputBorder,
// //           inputText: formStyles.inputText,
// //           buttonBg: formStyles.buttonBg,
// //           buttonText: formStyles.buttonText,
// //           buttonRadius: formStyles.buttonRadius,
// //           inputRadius: formStyles.inputRadius,
// //           fontFamily: formStyles.fontFamily,
// //           fontSize: formStyles.fontSize,
// //           shadow: formStyles.shadow,
// //           transition: formStyles.transition
// //         },
// //         submitButton: {
// //           text: submitButtonText,
// //           icon: submitButtonIcon
// //         },
// //         fields: fields.map(f => ({
// //           id: f.id,
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options
// //         })),
// //         meta: {
// //           createdBy: "AdminUser",
// //           published: false
// //         }
// //       }
// //     };

// //     console.log("=== SENDING TO API ===");
// //     console.log(JSON.stringify(payload, null, 2));
// //     console.log("=====================");

// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       console.log("🆔 SHOP ID ONLY:", shopIdOnly);
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(payload)
// //         }
// //       );

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("=== API RESPONSE ===");
// //         console.log(result);
// //         console.log("===================");
// //         alert("✅ Form saved successfully!\n\nCheck console for response.");
// //       } else {
// //         const errorText = await response.text();
// //         console.error("API Error:", errorText);
// //         alert(`❌ Error saving form: ${response.status}\n\n${errorText}`);
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       alert(`❌ Network error: ${error.message}\n\nCheck console for details.`);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   return (
// //     <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
// //       <div style={{ maxWidth: 1200, margin: "auto" }}>
// //         <h1 style={{ textAlign: "center", color: "#333", marginBottom: 10 }}>🎨 Advanced Form Builder</h1>

// //         {/* Store Name & Form Info */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h3 style={{ marginTop: 0 }}>📋 Form Information</h3>

// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Name</label>
// //             <input
// //               type="text"
// //               value={formName}
// //               onChange={e => setFormName(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Description</label>
// //             <input
// //               type="text"
// //               value={formDescription}
// //               onChange={e => setFormDescription(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Text</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonText}
// //                 onChange={e => setSubmitButtonText(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Icon</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonIcon}
// //                 onChange={e => setSubmitButtonIcon(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* GLOBAL FORM STYLING */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0 }}>🎨 Global Form Styles</h2>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Background Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.bgColor}
// //                 onChange={e => updateFormStyle("bgColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.labelColor}
// //                 onChange={e => updateFormStyle("labelColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBg}
// //                 onChange={e => updateFormStyle("inputBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Border</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBorder}
// //                 onChange={e => updateFormStyle("inputBorder", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputText}
// //                 onChange={e => updateFormStyle("inputText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonBg}
// //                 onChange={e => updateFormStyle("buttonBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonText}
// //                 onChange={e => updateFormStyle("buttonText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonRadius}
// //                 onChange={e => updateFormStyle("buttonRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.inputRadius}
// //                 onChange={e => updateFormStyle("inputRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.fontSize}
// //                 onChange={e => updateFormStyle("fontSize", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div style={{ display: "flex", gap: 15, marginBottom: 20, flexWrap: "wrap" }}>
// //           <button 
// //             onClick={addField}
// //             style={{
// //               background: "#2196F3",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
// //             }}
// //           >
// //             ➕ Add Form Field
// //           </button>

// //           <button 
// //             onClick={saveFormConfig}
// //             disabled={isSaving}
// //             style={{
// //               background: isSaving ? "#cccccc" : "#4CAF50",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: isSaving ? "not-allowed" : "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
// //               opacity: isSaving ? 0.6 : 1
// //             }}
// //           >
// //             {isSaving ? "⏳ Saving..." : "💾 Save to API"}
// //           </button>
// //         </div>

// //         {/* FIELD CONFIGURATOR */}
// //         {fields.map(field => (
// //           <div
// //             key={field.id}
// //             style={{
// //               border: "2px solid #ddd",
// //               borderRadius: 12,
// //               padding: 20,
// //               marginBottom: 20,
// //               background: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //             }}
// //           >
// //             <h3 style={{ marginTop: 0, color: "#555" }}>⚙️ Field Configuration</h3>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Label</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter field label"
// //                 value={field.label}
// //                 onChange={e => updateField(field.id, "label", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Type</label>
// //               <select
// //                 value={field.type}
// //                 onChange={e => updateField(field.id, "type", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               >
// //                 <option value="text">Text Input</option>
// //                 <option value="email">Email Input</option>
// //                 <option value="number">Number Input</option>
// //                 <option value="textarea">Textarea</option>
// //                 <option value="select">Dropdown Select</option>
// //                 <option value="radio">Radio Group</option>
// //               </select>
// //             </div>

// //             {field.type !== "select" && field.type !== "radio" && (
// //               <div style={{ marginBottom: 15 }}>
// //                 <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Placeholder Text</label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter placeholder"
// //                   value={field.placeholder}
// //                   onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                   style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //                 />
// //               </div>
// //             )}

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={field.required}
// //                   onChange={e => updateField(field.id, "required", e.target.checked)}
// //                   style={{ marginRight: 8, width: 20, height: 20, cursor: "pointer" }}
// //                 />
// //                 <span style={{ fontWeight: "bold" }}>Required Field</span>
// //               </label>
// //             </div>

// //             {(field.type === "select" || field.type === "radio") && (
// //               <div style={{ marginBottom: 15, padding: 15, background: "#f9f9f9", borderRadius: 8 }}>
// //                 <b style={{ display: "block", marginBottom: 10 }}>Options:</b>

// //                 {field.options.map((opt, i) => (
// //                   <div key={i} style={{ display: "flex", marginBottom: 8, gap: 5 }}>
// //                     <input 
// //                       value={opt} 
// //                       readOnly 
// //                       style={{ 
// //                         flex: 1, 
// //                         padding: 8, 
// //                         borderRadius: 4, 
// //                         border: "1px solid #ddd",
// //                         background: "#fff"
// //                       }} 
// //                     />
// //                     <button
// //                       onClick={() => editOption(field.id, i)}
// //                       style={{
// //                         background: "#FF9800",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       ✏️
// //                     </button>
// //                     <button
// //                       onClick={() => deleteOption(field.id, i)}
// //                       style={{
// //                         background: "#f44336",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 ))}

// //                 <button
// //                   onClick={() => addOption(field.id)}
// //                   style={{
// //                     marginTop: 10,
// //                     background: "#4CAF50",
// //                     color: "white",
// //                     padding: "8px 16px",
// //                     border: "none",
// //                     borderRadius: 6,
// //                     cursor: "pointer"
// //                   }}
// //                 >
// //                   ➕ Add Option
// //                 </button>
// //               </div>
// //             )}

// //             <button
// //               onClick={() => deleteField(field.id)}
// //               style={{
// //                 background: "#f44336",
// //                 color: "white",
// //                 padding: "10px 20px",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 fontWeight: "bold"
// //               }}
// //             >
// //               🗑️ Delete Field
// //             </button>
// //           </div>
// //         ))}

// //         {/* LIVE PREVIEW */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0, color: "#333" }}>🔎 Live Preview</h2>

// //           <div 
// //             style={{ 
// //               border: `2px solid ${formStyles.inputBorder}`,
// //               padding: 30, 
// //               borderRadius: 12,
// //               background: formStyles.bgColor,
// //               boxShadow: formStyles.shadow
// //             }}
// //           >
// //             <h2 style={{ marginTop: 0, color: formStyles.labelColor }}>{formName}</h2>
// //             <p style={{ color: formStyles.inputText, marginBottom: 20 }}>{formDescription}</p>

// //             {fields.length === 0 ? (
// //               <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
// //                 No fields added yet. Click "Add Form Field" to start building your form.
// //               </p>
// //             ) : (
// //               <>
// //                 {fields.map(f => {
// //                   const inputStyle = {
// //                     width: "100%",
// //                     padding: `${formStyles.padding}px`,
// //                     fontSize: `${formStyles.fontSize}px`,
// //                     borderRadius: `${formStyles.inputRadius}px`,
// //                     border: `2px solid ${formStyles.inputBorder}`,
// //                     background: formStyles.inputBg,
// //                     color: formStyles.inputText,
// //                     boxSizing: "border-box"
// //                   };

// //                   return (
// //                     <div key={f.id} style={{ marginBottom: 20 }}>
// //                       <label style={{ 
// //                         display: "block", 
// //                         marginBottom: 8,
// //                         fontSize: `${formStyles.labelFontSize}px`,
// //                         fontWeight: "bold",
// //                         color: formStyles.labelColor
// //                       }}>
// //                         {f.label || "Untitled Field"} {f.required && <span style={{ color: "red" }}>*</span>}
// //                       </label>

// //                       {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                         <input
// //                           type={f.type}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         />
// //                       ) : f.type === "textarea" ? (
// //                         <textarea
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           rows={4}
// //                           style={inputStyle}
// //                         ></textarea>
// //                       ) : f.type === "select" ? (
// //                         <select 
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         >
// //                           <option value="">-- Select an option --</option>
// //                           {f.options.map((opt, i) => (
// //                             <option key={i} value={opt}>{opt}</option>
// //                           ))}
// //                         </select>
// //                       ) : f.type === "radio" ? (
// //                         <div style={{ 
// //                           padding: `${formStyles.padding}px`,
// //                           background: formStyles.inputBg,
// //                           borderRadius: `${formStyles.inputRadius}px`,
// //                           border: `2px solid ${formStyles.inputBorder}`
// //                         }}>
// //                           {f.options.map((opt, i) => (
// //                             <label 
// //                               key={i} 
// //                               style={{ 
// //                                 display: "block", 
// //                                 marginBottom: 8,
// //                                 cursor: "pointer",
// //                                 color: formStyles.inputText,
// //                                 fontSize: `${formStyles.fontSize}px`
// //                               }}
// //                             >
// //                               <input 
// //                                 type="radio" 
// //                                 name={`field-${f.id}`}
// //                                 value={opt}
// //                                 style={{ marginRight: 8, cursor: "pointer" }}
// //                               /> 
// //                               {opt}
// //                             </label>
// //                           ))}
// //                         </div>
// //                       ) : null}
// //                     </div>
// //                   );
// //                 })}

// //                 <button 
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: formStyles.buttonBg,
// //                     color: formStyles.buttonText,
// //                     padding: `${formStyles.buttonPadding}px 32px`,
// //                     border: "none",
// //                     borderRadius: `${formStyles.buttonRadius}px`,
// //                     cursor: "pointer",
// //                     fontSize: `${formStyles.buttonFontSize}px`,
// //                     fontWeight: "bold",
// //                     marginTop: 10,
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
// //                   }}
// //                 >
// //                   {submitButtonIcon} {submitButtonText}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// // import { useState } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);

// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   const data = await response.json();
// //   console.log("data++++", data);

// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };

// // export default function CustomizeForm() { 
// //   const [formName, setFormName] = useState("Contact Form");
// //   const [formDescription, setFormDescription] = useState("This is sample form");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit Form");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("✅");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const { shop } = useLoaderData();

// //   console.log("shop++++", shop); 

// //   const [fields, setFields] = useState([]);

// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     labelFontSize: 16,
// //     buttonFontSize: 16,
// //     padding: 12,
// //     buttonPadding: 12,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
// //     transition: "all 0.3s ease"
// //   });

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: []
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // ✅ Add option with label and value
// //   function addOption(fieldId) {
// //     const label = prompt("Enter option label (display text):");
// //     if (!label) return;

// //     const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, '_'));
// //     if (!value) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId 
// //         ? { ...f, options: [...f.options, { label, value }] } 
// //         : f
// //     ));
// //   }

// //   // ✅ Edit option
// //   function editOption(fieldId, index) {
// //     const currentOption = fields.find(f => f.id === fieldId)?.options[index];
// //     if (!currentOption) return;

// //     const newLabel = prompt("Update option label:", currentOption.label);
// //     if (!newLabel) return;

// //     const newValue = prompt("Update option value:", currentOption.value);
// //     if (!newValue) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { 
// //             ...f, 
// //             options: f.options.map((o, i) => 
// //               i === index ? { label: newLabel, value: newValue } : o
// //             ) 
// //           }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   // Handle form submission (preview form)
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });

// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save form configuration to API
// //   async function saveFormConfig() {
// //     setIsSaving(true);

// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formStyles: {
// //           bgColor: formStyles.bgColor,
// //           labelColor: formStyles.labelColor,
// //           inputBg: formStyles.inputBg,
// //           inputBorder: formStyles.inputBorder,
// //           inputText: formStyles.inputText,
// //           buttonBg: formStyles.buttonBg,
// //           buttonText: formStyles.buttonText,
// //           buttonRadius: formStyles.buttonRadius,
// //           inputRadius: formStyles.inputRadius,
// //           fontFamily: formStyles.fontFamily,
// //           fontSize: formStyles.fontSize,
// //           shadow: formStyles.shadow,
// //           transition: formStyles.transition
// //         },
// //         submitButton: {
// //           text: submitButtonText,
// //           icon: submitButtonIcon
// //         },
// //         fields: fields.map(f => ({
// //           id: f.id,
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options  // ✅ Now sends { label, value } objects
// //         })),
// //         meta: {
// //           createdBy: "AdminUser",
// //           published: false
// //         }
// //       }
// //     };

// //     console.log("=== SENDING TO API ===");
// //     console.log(JSON.stringify(payload, null, 2));
// //     console.log("=====================");

// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       console.log("🆔 SHOP ID ONLY:", shopIdOnly);
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(payload)
// //         }
// //       );

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("=== API RESPONSE ===");
// //         console.log(result);
// //         console.log("===================");
// //         alert("✅ Form saved successfully!\n\nCheck console for response.");
// //       } else {
// //         const errorText = await response.text();
// //         console.error("API Error:", errorText);
// //         alert(`❌ Error saving form: ${response.status}\n\n${errorText}`);
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       alert(`❌ Network error: ${error.message}\n\nCheck console for details.`);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   return (
// //     <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
// //       <div style={{ maxWidth: 1200, margin: "auto" }}>
// //         <h1 style={{ textAlign: "center", color: "#333", marginBottom: 10 }}>🎨 Advanced Form Builder</h1>

// //         {/* Store Name & Form Info */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h3 style={{ marginTop: 0 }}>📋 Form Information</h3>

// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Name</label>
// //             <input
// //               type="text"
// //               value={formName}
// //               onChange={e => setFormName(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ marginBottom: 15 }}>
// //             <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Form Description</label>
// //             <input
// //               type="text"
// //               value={formDescription}
// //               onChange={e => setFormDescription(e.target.value)}
// //               style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //             />
// //           </div>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Text</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonText}
// //                 onChange={e => setSubmitButtonText(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Submit Button Icon</label>
// //               <input
// //                 type="text"
// //                 value={submitButtonIcon}
// //                 onChange={e => setSubmitButtonIcon(e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* GLOBAL FORM STYLING */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0 }}>🎨 Global Form Styles</h2>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 15 }}>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Background Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.bgColor}
// //                 onChange={e => updateFormStyle("bgColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Label Color</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.labelColor}
// //                 onChange={e => updateFormStyle("labelColor", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBg}
// //                 onChange={e => updateFormStyle("inputBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Border</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputBorder}
// //                 onChange={e => updateFormStyle("inputBorder", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.inputText}
// //                 onChange={e => updateFormStyle("inputText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Background</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonBg}
// //                 onChange={e => updateFormStyle("buttonBg", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Text</label>
// //               <input 
// //                 type="color" 
// //                 value={formStyles.buttonText}
// //                 onChange={e => updateFormStyle("buttonText", e.target.value)}
// //                 style={{ width: "100%", height: 40, cursor: "pointer" }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Button Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.buttonRadius}
// //                 onChange={e => updateFormStyle("buttonRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Input Radius (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.inputRadius}
// //                 onChange={e => updateFormStyle("inputRadius", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //             <div>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Font Size (px)</label>
// //               <input 
// //                 type="number" 
// //                 value={formStyles.fontSize}
// //                 onChange={e => updateFormStyle("fontSize", parseInt(e.target.value))}
// //                 style={{ width: "100%", padding: 8 }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div style={{ display: "flex", gap: 15, marginBottom: 20, flexWrap: "wrap" }}>
// //           <button 
// //             onClick={addField}
// //             style={{
// //               background: "#2196F3",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
// //             }}
// //           >
// //             ➕ Add Form Field
// //           </button>

// //           <button 
// //             onClick={saveFormConfig}
// //             disabled={isSaving}
// //             style={{
// //               background: isSaving ? "#cccccc" : "#4CAF50",
// //               color: "white",
// //               padding: "12px 24px",
// //               border: "none",
// //               borderRadius: 8,
// //               cursor: isSaving ? "not-allowed" : "pointer",
// //               fontSize: 16,
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
// //               opacity: isSaving ? 0.6 : 1
// //             }}
// //           >
// //             {isSaving ? "⏳ Saving..." : "💾 Save to API"}
// //           </button>
// //         </div>

// //         {/* FIELD CONFIGURATOR */}
// //         {fields.map(field => (
// //           <div
// //             key={field.id}
// //             style={{
// //               border: "2px solid #ddd",
// //               borderRadius: 12,
// //               padding: 20,
// //               marginBottom: 20,
// //               background: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //             }}
// //           >
// //             <h3 style={{ marginTop: 0, color: "#555" }}>⚙️ Field Configuration</h3>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Label</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter field label"
// //                 value={field.label}
// //                 onChange={e => updateField(field.id, "label", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               />
// //             </div>

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Field Type</label>
// //               <select
// //                 value={field.type}
// //                 onChange={e => updateField(field.id, "type", e.target.value)}
// //                 style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //               >
// //                 <option value="text">Text Input</option>
// //                 <option value="email">Email Input</option>
// //                 <option value="number">Number Input</option>
// //                 <option value="textarea">Textarea</option>
// //                 <option value="select">Dropdown Select</option>
// //                 <option value="radio">Radio Group</option>
// //               </select>
// //             </div>

// //             {field.type !== "select" && field.type !== "radio" && (
// //               <div style={{ marginBottom: 15 }}>
// //                 <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Placeholder Text</label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter placeholder"
// //                   value={field.placeholder}
// //                   onChange={e => updateField(field.id, "placeholder", e.target.value)}
// //                   style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
// //                 />
// //               </div>
// //             )}

// //             <div style={{ marginBottom: 15 }}>
// //               <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={field.required}
// //                   onChange={e => updateField(field.id, "required", e.target.checked)}
// //                   style={{ marginRight: 8, width: 20, height: 20, cursor: "pointer" }}
// //                 />
// //                 <span style={{ fontWeight: "bold" }}>Required Field</span>
// //               </label>
// //             </div>

// //             {/* ✅ UPDATED OPTIONS RENDERING */}
// //             {(field.type === "select" || field.type === "radio") && (
// //               <div style={{ marginBottom: 15, padding: 15, background: "#f9f9f9", borderRadius: 8 }}>
// //                 <b style={{ display: "block", marginBottom: 10 }}>Options:</b>

// //                 {field.options.map((opt, i) => (
// //                   <div key={i} style={{ 
// //                     display: "grid", 
// //                     gridTemplateColumns: "1fr 1fr auto auto",
// //                     marginBottom: 8, 
// //                     gap: 5 
// //                   }}>
// //                     <input 
// //                       value={opt.label} 
// //                       readOnly 
// //                       placeholder="Label"
// //                       style={{ 
// //                         padding: 8, 
// //                         borderRadius: 4, 
// //                         border: "1px solid #ddd",
// //                         background: "#fff"
// //                       }} 
// //                     />
// //                     <input 
// //                       value={opt.value} 
// //                       readOnly 
// //                       placeholder="Value"
// //                       style={{ 
// //                         padding: 8, 
// //                         borderRadius: 4, 
// //                         border: "1px solid #ddd",
// //                         background: "#fff"
// //                       }} 
// //                     />
// //                     <button
// //                       onClick={() => editOption(field.id, i)}
// //                       style={{
// //                         background: "#FF9800",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       ✏️
// //                     </button>
// //                     <button
// //                       onClick={() => deleteOption(field.id, i)}
// //                       style={{
// //                         background: "#f44336",
// //                         color: "white",
// //                         padding: "8px 12px",
// //                         border: "none",
// //                         borderRadius: 4,
// //                         cursor: "pointer"
// //                       }}
// //                     >
// //                       🗑️
// //                     </button>
// //                   </div>
// //                 ))}

// //                 <button
// //                   onClick={() => addOption(field.id)}
// //                   style={{
// //                     marginTop: 10,
// //                     background: "#4CAF50",
// //                     color: "white",
// //                     padding: "8px 16px",
// //                     border: "none",
// //                     borderRadius: 6,
// //                     cursor: "pointer"
// //                   }}
// //                 >
// //                   ➕ Add Option
// //                 </button>
// //               </div>
// //             )}

// //             <button
// //               onClick={() => deleteField(field.id)}
// //               style={{
// //                 background: "#f44336",
// //                 color: "white",
// //                 padding: "10px 20px",
// //                 border: "none",
// //                 borderRadius: 8,
// //                 cursor: "pointer",
// //                 fontWeight: "bold"
// //               }}
// //             >
// //               🗑️ Delete Field
// //             </button>
// //           </div>
// //         ))}

// //         {/* ✅ UPDATED LIVE PREVIEW */}
// //         <div style={{
// //           background: "#fff",
// //           padding: 20,
// //           borderRadius: 12,
// //           marginBottom: 20,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// //         }}>
// //           <h2 style={{ marginTop: 0, color: "#333" }}>🔎 Live Preview</h2>

// //           <div 
// //             style={{ 
// //               border: `2px solid ${formStyles.inputBorder}`,
// //               padding: 30, 
// //               borderRadius: 12,
// //               background: formStyles.bgColor,
// //               boxShadow: formStyles.shadow
// //             }}
// //           >
// //             <h2 style={{ marginTop: 0, color: formStyles.labelColor }}>{formName}</h2>
// //             <p style={{ color: formStyles.inputText, marginBottom: 20 }}>{formDescription}</p>

// //             {fields.length === 0 ? (
// //               <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
// //                 No fields added yet. Click "Add Form Field" to start building your form.
// //               </p>
// //             ) : (
// //               <>
// //                 {fields.map(f => {
// //                   const inputStyle = {
// //                     width: "100%",
// //                     padding: `${formStyles.padding}px`,
// //                     fontSize: `${formStyles.fontSize}px`,
// //                     borderRadius: `${formStyles.inputRadius}px`,
// //                     border: `2px solid ${formStyles.inputBorder}`,
// //                     background: formStyles.inputBg,
// //                     color: formStyles.inputText,
// //                     boxSizing: "border-box"
// //                   };

// //                   return (
// //                     <div key={f.id} style={{ marginBottom: 20 }}>
// //                       <label style={{ 
// //                         display: "block", 
// //                         marginBottom: 8,
// //                         fontSize: `${formStyles.labelFontSize}px`,
// //                         fontWeight: "bold",
// //                         color: formStyles.labelColor
// //                       }}>
// //                         {f.label || "Untitled Field"} {f.required && <span style={{ color: "red" }}>*</span>}
// //                       </label>

// //                       {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                         <input
// //                           type={f.type}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         />
// //                       ) : f.type === "textarea" ? (
// //                         <textarea
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                           rows={4}
// //                           style={inputStyle}
// //                         ></textarea>
// //                       ) : f.type === "select" ? (
// //                         <select 
// //                           name={`field-${f.id}`}
// //                           style={inputStyle}
// //                         >
// //                           <option value="">-- Select an option --</option>
// //                           {f.options.map((opt, i) => (
// //                             <option key={i} value={opt.value}>{opt.label}</option>
// //                           ))}
// //                         </select>
// //                       ) : f.type === "radio" ? (
// //                         <div style={{ 
// //                           padding: `${formStyles.padding}px`,
// //                           background: formStyles.inputBg,
// //                           borderRadius: `${formStyles.inputRadius}px`,
// //                           border: `2px solid ${formStyles.inputBorder}`
// //                         }}>
// //                           {f.options.map((opt, i) => (
// //                             <label 
// //                               key={i} 
// //                               style={{ 
// //                                 display: "block", 
// //                                 marginBottom: 8,
// //                                 cursor: "pointer",
// //                                 color: formStyles.inputText,
// //                                 fontSize: `${formStyles.fontSize}px`
// //                               }}
// //                             >
// //                               <input 
// //                                 type="radio" 
// //                                 name={`field-${f.id}`}
// //                                 value={opt.value}
// //                                 style={{ marginRight: 8, cursor: "pointer" }}
// //                               /> 
// //                               {opt.label}
// //                             </label>
// //                           ))}
// //                         </div>
// //                       ) : null}
// //                     </div>
// //                   );
// //                 })}

// //                 <button 
// //                   onClick={handleSubmit}
// //                   style={{
// //                     background: formStyles.buttonBg,
// //                     color: formStyles.buttonText,
// //                     padding: `${formStyles.buttonPadding}px 32px`,
// //                     border: "none",
// //                     borderRadius: `${formStyles.buttonRadius}px`,
// //                     cursor: "pointer",
// //                     fontSize: `${formStyles.buttonFontSize}px`,
// //                     fontWeight: "bold",
// //                     marginTop: 10,
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
// //                   }}
// //                 >
// //                   {submitButtonIcon} {submitButtonText}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useState } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";
// // import {
// //   AppProvider,
// //   Page,
// //   Card,
// //   Text,
// //   TextField,
// //   Select,
// //   Button,
// //   ButtonGroup,
// //   Checkbox,
// //   BlockStack,
// //   InlineStack,
// //   InlineGrid,
// //   Grid,
// //   Box,
// //   Banner,
// //   Divider,
// //   Modal,
// //   FormLayout,
// // } from "@shopify/polaris";
// // import enTranslations from "@shopify/polaris/locales/en.json";

// // export const loader = async ({ request }) => {
// //   // Authenticate Admin API
// //   const { admin } = await authenticate.admin(request);

// //   // Make GraphQL request
// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   // Convert response to JSON
// //   const data = await response.json();

// //   console.log("data++++", data);

// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };


// // export default function CustomizeForm() { 
// //   const [formName, setFormName] = useState("Contact");
// //   const [formDescription, setFormDescription] = useState("");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [selectedFieldId, setSelectedFieldId] = useState(null);
// //   const [saveMessage, setSaveMessage] = useState(null);
// //   const { shop } = useLoaderData();

// //   console.log("shop++++", shop); 


// //   const [fields, setFields] = useState([
// //   ]);

// //   const [formStyles, setFormStyles] = useState({
// //     bgColor: "#ffffff",
// //     labelColor: "#2c3e50",
// //     inputBg: "#f8f9fa",
// //     inputBorder: "#3498db",
// //     inputText: "#2c3e50",
// //     buttonBg: "#3498db",
// //     buttonText: "#ffffff",
// //     buttonRadius: 8,
// //     inputRadius: 6,
// //     fontFamily: "'Inter', sans-serif",
// //     fontSize: 15,
// //     labelFontSize: 16,
// //     buttonFontSize: 16,
// //     padding: 12,
// //     buttonPadding: 12,
// //     shadow: "0 4px 15px rgba(0,0,0,0.1)",
// //     transition: "all 0.3s ease"
// //   });

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: []
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // Add option to dropdown or radio
// //   function addOption(fieldId) {
// //     const option = prompt("Enter option text:");
// //     if (!option) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId ? { ...f, options: [...f.options, option] } : f
// //     ));
// //   }

// //   // Edit option
// //   function editOption(fieldId, index) {
// //     const updated = prompt("Update option value:");
// //     if (!updated) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? updated : o)) }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }





// //   // Handle form submission (preview form)
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });
// //   }

// //   // Save form configuration to API
// //   async function saveFormConfig() {
// //     setIsSaving(true);

// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formStyles: {
// //           bgColor: formStyles.bgColor,
// //           labelColor: formStyles.labelColor,
// //           inputBg: formStyles.inputBg,
// //           inputBorder: formStyles.inputBorder,
// //           inputText: formStyles.inputText,
// //           buttonBg: formStyles.buttonBg,
// //           buttonText: formStyles.buttonText,
// //           buttonRadius: formStyles.buttonRadius,
// //           inputRadius: formStyles.inputRadius,
// //           fontFamily: formStyles.fontFamily,
// //           fontSize: formStyles.fontSize,
// //           shadow: formStyles.shadow,
// //           transition: formStyles.transition
// //         },
// //         submitButton: {
// //           text: submitButtonText
// //         },
// //         fields: fields.map(f => ({
// //           id: f.id,
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options
// //         })),
// //         meta: {
// //           createdBy: "AdminUser",
// //           published: false
// //         }
// //       }
// //     };

// //     console.log("=== SENDING TO API ===");
// //     console.log(JSON.stringify(payload, null, 2));
// //     console.log("=====================");

// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       console.log("🆔 SHOP ID ONLY:", shopIdOnly);
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(payload)
// //         }
// //       );

// //       if (response.ok) {
// //         const result = await response.json();
// //         setSaveMessage({ type: "success", text: "Form saved successfully!" });
// //         setTimeout(() => setSaveMessage(null), 3000);
// //       } else {
// //         const errorText = await response.text();
// //         console.error("API Error:", errorText);
// //         setSaveMessage({ type: "error", text: `Error saving form: ${response.status}` });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       setSaveMessage({ type: "error", text: `Network error: ${error.message}` });
// //       setTimeout(() => setSaveMessage(null), 5000);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   // Get field icon based on type
// //   function getFieldIcon(type) {
// //     const icons = {
// //       text: "A",
// //       email: "@",
// //       number: "#",
// //       phone: "☎",
// //       textarea: "≡",
// //       select: "▼",
// //       radio: "○",
// //     };
// //     return icons[type] || "A";
// //   }

// //   return (
// //     <AppProvider i18n={enTranslations}>
// //       <Page
// //         title="Form Builder"
// //       >
// //       <BlockStack gap="500">
// //         {/* Two Column Layout */}
// //         <Grid>
// //           {/* Left Column - Settings (60%) */}
// //           <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
// //             <BlockStack gap="400">
// //               {/* Form Section */}
// //               <Card>
// //                 <BlockStack gap="400">
// //                   <Text variant="headingMd" as="h2">
// //                     Form
// //                   </Text>

// //                   <TextField
// //                     label="Title"
// //               value={formName}
// //                     onChange={(value) => setFormName(value)}
// //                     autoComplete="off"
// //                     maxLength={120}
// //                     showCharacterCount
// //                   />

// //                   <TextField
// //                     label="Content"
// //               value={formDescription}
// //                     onChange={(value) => setFormDescription(value)}
// //                     multiline={3}
// //                     autoComplete="off"
// //                     maxLength={120}
// //                     showCharacterCount
// //               />
// //                 </BlockStack>
// //               </Card>

// //               {/* Fields Section */}
// //               <Card>
// //                 <BlockStack gap="400">
// //                   <InlineStack align="space-between" blockAlign="center">
// //                     <Text variant="headingMd" as="h2">
// //                       Fields
// //                     </Text>
// //                     <Button 
// //                       variant="primary"
// //                       size="slim"
// //                       onClick={addField}
// //                     >
// //                       Add Form Field
// //                     </Button>
// //                   </InlineStack>

// //                   {/* Fields List */}
// //                   <BlockStack gap="200">
// //                     {fields.length === 0 ? (
// //                       <Banner tone="info">
// //                         No fields added yet. Click "Add Form Field" to start building your form.
// //                       </Banner>
// //                     ) : (
// //                       <BlockStack gap="200">
// //                         {fields.map((field, index) => (
// //                           <Box
// //                             key={field.id}
// //                             padding="300"
// //                             background="bg-surface"
// //                             borderRadius="200"
// //                           >
// //                             <InlineStack gap="300" align="space-between" blockAlign="center">
// //                               <InlineStack gap="300" blockAlign="center">
// //                                 <Text variant="bodyMd" tone="subdued" fontWeight="medium">
// //                                   {getFieldIcon(field.type)}
// //                                 </Text>
// //                                 <Text variant="bodyMd" fontWeight="medium">
// //                                   {field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}
// //                                 </Text>
// //                               </InlineStack>
// //                               <InlineStack gap="200">
// //                                 <Button
// //                                   plain
// //                                   onClick={() => setSelectedFieldId(field.id)}
// //                                 >
// //                                   Edit
// //                                 </Button>
// //                                 <Button
// //                                   plain
// //                                   tone="critical"
// //                                   onClick={() => {
// //                                     deleteField(field.id);
// //                                     if (selectedFieldId === field.id) {
// //                                       setSelectedFieldId(null);
// //                                     }
// //                                   }}
// //                                 >
// //                                   Remove
// //                                 </Button>
// //                               </InlineStack>
// //                             </InlineStack>
// //                           </Box>
// //                         ))}
// //                       </BlockStack>
// //                     )}
// //                   </BlockStack>
// //                 </BlockStack>
// //               </Card>


// //               {/* Save Message */}
// //               {saveMessage && (
// //                 <Banner tone={saveMessage.type === "success" ? "success" : "critical"}>
// //                   {saveMessage.text}
// //                 </Banner>
// //             )}

// //               {/* Save Button */}
// //               <Button 
// //                 variant="primary"
// //                 tone={isSaving ? "subdued" : "success"}
// //                 onClick={saveFormConfig}
// //                 disabled={isSaving}
// //                 loading={isSaving}
// //                 fullWidth
// //               >
// //                 Save Form
// //               </Button>
// //             </BlockStack>
// //           </Grid.Cell>

// //           {/* Right Column - Preview (40%) */}
// //           <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
// //             <Box position="sticky" top="16px">
// //               <Card>
// //                 <BlockStack gap="400">
// //                   {/* Form Preview */}
// //                   <Box 
// //                     padding="500"
// //                     background="bg-surface"
// //                     borderRadius="300"
// //           >
// //                     <BlockStack gap="400">
// //                       <Text variant="headingLg" as="h1">
// //                         {formName || "Form Title"}
// //                       </Text>

// //                       {formDescription && (
// //                         <Text as="p" tone="subdued">
// //                           {formDescription}
// //                         </Text>
// //                       )}

// //             {fields.length === 0 ? (
// //                         <Box padding="800">
// //                           <Text variant="bodyMd" tone="subdued" alignment="center">
// //                 No fields added yet. Click "Add Form Field" to start building your form.
// //                           </Text>
// //                         </Box>
// //             ) : (
// //                         <BlockStack gap="400">
// //                           {fields.map(f => (
// //                             <BlockStack key={f.id} gap="200">
// //                               <Text as="label" variant="bodyMd" fontWeight="semibold">
// //                                 {f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}
// //                               </Text>

// //                       {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                                 <TextField
// //                           type={f.type}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                                   autoComplete="off"
// //                                   disabled
// //                                 />
// //                               ) : f.type === "phone" ? (
// //                                 <InlineStack gap="200">
// //                                   <Select
// //                                     options={[
// //                                       { label: "+91", value: "+91" },
// //                                       { label: "+1", value: "+1" },
// //                                     ]}
// //                                     value="+91"
// //                                     disabled
// //                                   />
// //                                   <Box width="100%">
// //                                     <TextField
// //                                       type="tel"
// //                                       placeholder={f.placeholder || "Phone"}
// //                                       name={`field-${f.id}`}
// //                                       autoComplete="off"
// //                                       disabled
// //                                     />
// //                                   </Box>
// //                                 </InlineStack>
// //                       ) : f.type === "textarea" ? (
// //                                 <TextField
// //                                   multiline={4}
// //                           placeholder={f.placeholder}
// //                           name={`field-${f.id}`}
// //                                   autoComplete="off"
// //                                   disabled
// //                                 />
// //                       ) : f.type === "select" ? (
// //                                 <Select
// //                           name={`field-${f.id}`}
// //                                   options={[
// //                                     { label: "Select an option", value: "" },
// //                                     ...f.options.map(opt => ({ label: opt, value: opt }))
// //                                   ]}
// //                                   disabled
// //                                 />
// //                       ) : f.type === "radio" ? (
// //                                 <BlockStack gap="200">
// //                           {f.options.map((opt, i) => (
// //                                     <InlineStack key={i} gap="200" align="start">
// //                               <input 
// //                                 type="radio" 
// //                                 name={`field-${f.id}`}
// //                                 value={opt}
// //                                         id={`field-${f.id}-${i}`}
// //                                         disabled
// //                               /> 
// //                                       <Text as="label" htmlFor={`field-${f.id}-${i}`} variant="bodyMd">
// //                               {opt}
// //                                       </Text>
// //                                     </InlineStack>
// //                           ))}
// //                                 </BlockStack>
// //                       ) : null}
// //                             </BlockStack>
// //                           ))}

// //                           <Button 
// //                             variant="primary"
// //                             disabled
// //                             fullWidth
// //                           >
// //                             {submitButtonText}
// //                           </Button>
// //                         </BlockStack>
// //             )}
// //                     </BlockStack>
// //                   </Box>
// //                 </BlockStack>
// //               </Card>
// //             </Box>
// //           </Grid.Cell>
// //         </Grid>
// //       </BlockStack>

// //       {/* Edit Field Modal */}
// //       {selectedFieldId && fields.find(f => f.id === selectedFieldId) && (() => {
// //         const field = fields.find(f => f.id === selectedFieldId);
// //         return (
// //           <Modal
// //             open={!!selectedFieldId}
// //             onClose={() => setSelectedFieldId(null)}
// //             title="Edit Field"
// //             primaryAction={{
// //               content: "Save",
// //               onAction: () => setSelectedFieldId(null),
// //             }}
// //             secondaryActions={[
// //               {
// //                 content: "Cancel",
// //                 onAction: () => setSelectedFieldId(null),
// //               },
// //             ]}
// //           >
// //             <Modal.Section>
// //               <FormLayout>
// //                 <TextField
// //                   label="Field Label"
// //                   placeholder="Enter field label"
// //                   value={field.label}
// //                   onChange={(value) => updateField(field.id, "label", value)}
// //                   autoComplete="off"
// //                   helpText="The label that appears above this field"
// //                 />

// //                 <Select
// //                   label="Field Type"
// //                   options={[
// //                     { label: "Text Input", value: "text" },
// //                     { label: "Email Input", value: "email" },
// //                     { label: "Number Input", value: "number" },
// //                     { label: "Phone", value: "phone" },
// //                     { label: "Textarea", value: "textarea" },
// //                     { label: "Dropdown Select", value: "select" },
// //                     { label: "Radio Group", value: "radio" },
// //                   ]}
// //                   value={field.type}
// //                   onChange={(value) => updateField(field.id, "type", value)}
// //                   helpText="Select the type of input for this field"
// //                 />

// //                 {field.type !== "select" && field.type !== "radio" && (
// //                   <TextField
// //                     label="Placeholder Text"
// //                     placeholder="Enter placeholder"
// //                     value={field.placeholder}
// //                     onChange={(value) => updateField(field.id, "placeholder", value)}
// //                     autoComplete="off"
// //                     helpText="Hint text shown inside the field"
// //                   />
// //                 )}

// //                 <Checkbox
// //                   label="Required Field"
// //                   checked={field.required}
// //                   onChange={(checked) => updateField(field.id, "required", checked)}
// //                   helpText="Users must fill this field before submitting"
// //                 />

// //                 {(field.type === "select" || field.type === "radio") && (
// //                   <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                     <BlockStack gap="300">
// //                       <Text variant="bodyMd" fontWeight="semibold">
// //                         Options
// //                       </Text>

// //                       {field.options.length === 0 ? (
// //                         <Text variant="bodySm" tone="subdued">
// //                           No options added yet. Click "Add Option" below to add choices.
// //                         </Text>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {field.options.map((opt, i) => (
// //                             <InlineStack key={i} align="center" gap="200">
// //                               <Box width="100%">
// //                                 <TextField 
// //                                   value={opt} 
// //                                   readOnly
// //                                   autoComplete="off"
// //                                   label={`Option ${i + 1}`}
// //                                 />
// //                               </Box>
// //                               <Button
// //                                 size="slim"
// //                                 onClick={() => editOption(field.id, i)}
// //                               >
// //                                 Edit
// //                               </Button>
// //                               <Button
// //                                 size="slim"
// //                                 tone="critical"
// //                                 onClick={() => deleteOption(field.id, i)}
// //                               >
// //                                 Remove
// //                               </Button>
// //                             </InlineStack>
// //                           ))}
// //                         </BlockStack>
// //                       )}

// //                       <Button
// //                         size="slim"
// //                         onClick={() => addOption(field.id)}
// //                       >
// //                         Add Option
// //                       </Button>
// //                     </BlockStack>
// //                   </Box>
// //                 )}
// //               </FormLayout>
// //             </Modal.Section>
// //           </Modal>
// //         );
// //       })()}
// //     </Page>
// //     </AppProvider>
// //   );
// // }




// // import { useState } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";
// // import {
// //   AppProvider,
// //   Page,
// //   Card,
// //   Text,
// //   TextField,
// //   Select,
// //   Button,
// //   ButtonGroup,
// //   Checkbox,
// //   BlockStack,
// //   InlineStack,
// //   InlineGrid,
// //   Grid,
// //   Box,
// //   Banner,
// //   Divider,
// //   Modal,
// //   FormLayout,
// // } from "@shopify/polaris";
// // import enTranslations from "@shopify/polaris/locales/en.json";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);

// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   const data = await response.json();
// //   console.log("data++++", data);

// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };

// // export default function CustomizeForm() { 
// //   const [formName, setFormName] = useState("Contact");
// //   const [formDescription, setFormDescription] = useState("");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("✅");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [selectedFieldId, setSelectedFieldId] = useState(null);
// //   const [saveMessage, setSaveMessage] = useState(null);
// //   const { shop } = useLoaderData();

// //   console.log("shop++++", shop); 

// //   const [fields, setFields] = useState([]);



// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: []
// //       }
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter(f => f.id !== id));
// //   }

// //   // Update form global styles
// //   function updateFormStyle(key, value) {
// //     setFormStyles({ ...formStyles, [key]: value });
// //   }

// //   // ✅ Add option with label and value (FROM FIRST CODE)
// //   function addOption(fieldId) {
// //     const label = prompt("Enter option label (display text):");
// //     if (!label) return;

// //     const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, '_'));
// //     if (!value) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId 
// //         ? { ...f, options: [...f.options, { label, value }] } 
// //         : f
// //     ));
// //   }

// //   // ✅ Edit option (FROM FIRST CODE)
// //   function editOption(fieldId, index) {
// //     const currentOption = fields.find(f => f.id === fieldId)?.options[index];
// //     if (!currentOption) return;

// //     const newLabel = prompt("Update option label:", currentOption.label);
// //     if (!newLabel) return;

// //     const newValue = prompt("Update option value:", currentOption.value);
// //     if (!newValue) return;

// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { 
// //             ...f, 
// //             options: f.options.map((o, i) => 
// //               i === index ? { label: newLabel, value: newValue } : o
// //             ) 
// //           }
// //         : f
// //     ));
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(fields.map(f =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.filter((_, i) => i !== index) }
// //         : f
// //     ));
// //   }

// //   // Handle form submission (preview form)
// //   function handleSubmit() {
// //     const formData = {};

// //     fields.forEach(field => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });

// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save form configuration to API
// //   async function saveFormConfig() {
// //     setIsSaving(true);

// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formSubmissionTitle: "djs",
// //         successdescription:"hbsdfd",
// //         fields: fields.map(f => ({
// //           id: f.id,
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options  // ✅ Now sends { label, value } objects
// //         })),
// //         meta: {
// //           createdBy: "AdminUser",
// //           published: false
// //         }
// //       }
// //     };

// //     console.log("=== SENDING TO API ===");
// //     console.log(JSON.stringify(payload, null, 2));
// //     console.log("=====================");

// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       console.log("🆔 SHOP ID ONLY:", shopIdOnly);
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(payload)
// //         }
// //       );

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("=== API RESPONSE ===");
// //         console.log(result);
// //         console.log("===================");
// //         setSaveMessage({ type: "success", text: "✅ Form saved successfully!" });
// //         setTimeout(() => setSaveMessage(null), 3000);
// //       } else {
// //         const errorText = await response.text();
// //         console.error("API Error:", errorText);
// //         setSaveMessage({ type: "error", text: `❌ Error saving form: ${response.status}` });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       setSaveMessage({ type: "error", text: `❌ Network error: ${error.message}` });
// //       setTimeout(() => setSaveMessage(null), 5000);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   // Get field icon based on type
// //   function getFieldIcon(type) {
// //     const icons = {
// //       text: "A",
// //       email: "@",
// //       number: "#",
// //       phone: "☎",
// //       textarea: "≡",
// //       select: "▼",
// //       radio: "○",
// //     };
// //     return icons[type] || "A";
// //   }

// //   return (
// //     <AppProvider i18n={enTranslations}>
// //       <Page title="Form Builder">
// //         <BlockStack gap="500">
// //           {/* Two Column Layout */}
// //           <Grid>
// //             {/* Left Column - Settings (60%) */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
// //               <BlockStack gap="400">
// //                 {/* Form Section */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <Text variant="headingMd" as="h2">
// //                       Form
// //                     </Text>

// //                     <TextField
// //                       label="Title"
// //                       value={formName}
// //                       onChange={(value) => setFormName(value)}
// //                       autoComplete="off"
// //                       maxLength={120}
// //                       showCharacterCount
// //                     />

// //                     <TextField
// //                       label="Content"
// //                       value={formDescription}
// //                       onChange={(value) => setFormDescription(value)}
// //                       multiline={3}
// //                       autoComplete="off"
// //                       maxLength={120}
// //                       showCharacterCount
// //                     />

// //                     <TextField
// //                       label="Submit Button Text"
// //                       value={submitButtonText}
// //                       onChange={(value) => setSubmitButtonText(value)}
// //                       autoComplete="off"
// //                     />

// //                     <TextField
// //                       label="Submit Button Icon"
// //                       value={submitButtonIcon}
// //                       onChange={(value) => setSubmitButtonIcon(value)}
// //                       autoComplete="off"
// //                       helpText="Enter an emoji or icon character"
// //                     />
// //                   </BlockStack>
// //                 </Card>

// //                 {/* Fields Section */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <InlineStack align="space-between" blockAlign="center">
// //                       <Text variant="headingMd" as="h2">
// //                         Fields
// //                       </Text>
// //                       <Button 
// //                         variant="primary"
// //                         size="slim"
// //                         onClick={addField}
// //                       >
// //                         Add Form Field
// //                       </Button>
// //                     </InlineStack>

// //                     {/* Fields List */}
// //                     <BlockStack gap="200">
// //                       {fields.length === 0 ? (
// //                         <Banner tone="info">
// //                           No fields added yet. Click "Add Form Field" to start building your form.
// //                         </Banner>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {fields.map((field, index) => (
// //                             <Box
// //                               key={field.id}
// //                               padding="300"
// //                               background="bg-surface"
// //                               borderRadius="200"
// //                             >
// //                               <InlineStack gap="300" align="space-between" blockAlign="center">
// //                                 <InlineStack gap="300" blockAlign="center">
// //                                   <Text variant="bodyMd" tone="subdued" fontWeight="medium">
// //                                     {getFieldIcon(field.type)}
// //                                   </Text>
// //                                   <Text variant="bodyMd" fontWeight="medium">
// //                                     {field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}
// //                                   </Text>
// //                                 </InlineStack>
// //                                 <InlineStack gap="200">
// //                                   <Button
// //                                     plain
// //                                     onClick={() => setSelectedFieldId(field.id)}
// //                                   >
// //                                     Edit
// //                                   </Button>
// //                                   <Button
// //                                     plain
// //                                     tone="critical"
// //                                     onClick={() => {
// //                                       deleteField(field.id);
// //                                       if (selectedFieldId === field.id) {
// //                                         setSelectedFieldId(null);
// //                                       }
// //                                     }}
// //                                   >
// //                                     Remove
// //                                   </Button>
// //                                 </InlineStack>
// //                               </InlineStack>
// //                             </Box>
// //                           ))}
// //                         </BlockStack>
// //                       )}
// //                     </BlockStack>
// //                   </BlockStack>
// //                 </Card>

// //                 {/* Save Message */}
// //                 {saveMessage && (
// //                   <Banner tone={saveMessage.type === "success" ? "success" : "critical"}>
// //                     {saveMessage.text}
// //                   </Banner>
// //                 )}

// //                 {/* Save Button */}
// //                 <Button 
// //                   variant="primary"
// //                   tone={isSaving ? "subdued" : "success"}
// //                   onClick={saveFormConfig}
// //                   disabled={isSaving}
// //                   loading={isSaving}
// //                   fullWidth
// //                 >
// //                   Save Form
// //                 </Button>
// //               </BlockStack>
// //             </Grid.Cell>

// //             {/* Right Column - Preview (40%) */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
// //               <Box position="sticky" top="16px">
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     {/* Form Preview */}
// //                     <Box 
// //                       padding="500"
// //                       background="bg-surface"
// //                       borderRadius="300"
// //                     >
// //                       <BlockStack gap="400">
// //                         <Text variant="headingLg" as="h1">
// //                           {formName || "Form Title"}
// //                         </Text>

// //                         {formDescription && (
// //                           <Text as="p" tone="subdued">
// //                             {formDescription}
// //                           </Text>
// //                         )}

// //                         {fields.length === 0 ? (
// //                           <Box padding="800">
// //                             <Text variant="bodyMd" tone="subdued" alignment="center">
// //                               No fields added yet. Click "Add Form Field" to start building your form.
// //                             </Text>
// //                           </Box>
// //                         ) : (
// //                           <BlockStack gap="400">
// //                             {fields.map(f => (
// //                               <BlockStack key={f.id} gap="200">
// //                                 <Text as="label" variant="bodyMd" fontWeight="semibold">
// //                                   {f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}
// //                                 </Text>

// //                                 {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                                   <TextField
// //                                     type={f.type}
// //                                     placeholder={f.placeholder}
// //                                     name={`field-${f.id}`}
// //                                     autoComplete="off"
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "phone" ? (
// //                                   <InlineStack gap="200">
// //                                     <Select
// //                                       options={[
// //                                         { label: "+91", value: "+91" },
// //                                         { label: "+1", value: "+1" },
// //                                       ]}
// //                                       value="+91"
// //                                       disabled
// //                                     />
// //                                     <Box width="100%">
// //                                       <TextField
// //                                         type="tel"
// //                                         placeholder={f.placeholder || "Phone"}
// //                                         name={`field-${f.id}`}
// //                                         autoComplete="off"
// //                                         disabled
// //                                       />
// //                                     </Box>
// //                                   </InlineStack>
// //                                 ) : f.type === "textarea" ? (
// //                                   <TextField
// //                                     multiline={4}
// //                                     placeholder={f.placeholder}
// //                                     name={`field-${f.id}`}
// //                                     autoComplete="off"
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "select" ? (
// //                                   <Select
// //                                     name={`field-${f.id}`}
// //                                     options={[
// //                                       { label: "Select an option", value: "" },
// //                                       ...f.options.map(opt => ({ label: opt.label, value: opt.value }))
// //                                     ]}
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "radio" ? (
// //                                   <BlockStack gap="200">
// //                                     {f.options.map((opt, i) => (
// //                                       <InlineStack key={i} gap="200" align="start">
// //                                         <input 
// //                                           type="radio" 
// //                                           name={`field-${f.id}`}
// //                                           value={opt.value}
// //                                           id={`field-${f.id}-${i}`}
// //                                           disabled
// //                                         /> 
// //                                         <Text as="label" htmlFor={`field-${f.id}-${i}`} variant="bodyMd">
// //                                           {opt.label}
// //                                         </Text>
// //                                       </InlineStack>
// //                                     ))}
// //                                   </BlockStack>
// //                                 ) : null}
// //                               </BlockStack>
// //                             ))}

// //                             <Button 
// //                               variant="primary"
// //                               disabled
// //                               fullWidth
// //                             >
// //                               {submitButtonIcon} {submitButtonText}
// //                             </Button>
// //                           </BlockStack>
// //                         )}
// //                       </BlockStack>
// //                     </Box>
// //                   </BlockStack>
// //                 </Card>
// //               </Box>
// //             </Grid.Cell>
// //           </Grid>
// //         </BlockStack>

// //         {/* Edit Field Modal */}
// //         {selectedFieldId && fields.find(f => f.id === selectedFieldId) && (() => {
// //           const field = fields.find(f => f.id === selectedFieldId);
// //           return (
// //             <Modal
// //               open={!!selectedFieldId}
// //               onClose={() => setSelectedFieldId(null)}
// //               title="Edit Field"
// //               primaryAction={{
// //                 content: "Save",
// //                 onAction: () => setSelectedFieldId(null),
// //               }}
// //               secondaryActions={[
// //                 {
// //                   content: "Cancel",
// //                   onAction: () => setSelectedFieldId(null),
// //                 },
// //               ]}
// //             >
// //               <Modal.Section>
// //                 <FormLayout>
// //                   <TextField
// //                     label="Field Label"
// //                     placeholder="Enter field label"
// //                     value={field.label}
// //                     onChange={(value) => updateField(field.id, "label", value)}
// //                     autoComplete="off"
// //                     helpText="The label that appears above this field"
// //                   />

// //                   <Select
// //                     label="Field Type"
// //                     options={[
// //                       { label: "Text Input", value: "text" },
// //                       { label: "Email Input", value: "email" },
// //                       { label: "Number Input", value: "number" },
// //                       { label: "Phone", value: "phone" },
// //                       { label: "Textarea", value: "textarea" },
// //                       { label: "Dropdown Select", value: "select" },
// //                       { label: "Radio Group", value: "radio" },
// //                     ]}
// //                     value={field.type}
// //                     onChange={(value) => updateField(field.id, "type", value)}
// //                     helpText="Select the type of input for this field"
// //                   />

// //                   {field.type !== "select" && field.type !== "radio" && (
// //                     <TextField
// //                       label="Placeholder Text"
// //                       placeholder="Enter placeholder"
// //                       value={field.placeholder}
// //                       onChange={(value) => updateField(field.id, "placeholder", value)}
// //                       autoComplete="off"
// //                       helpText="Hint text shown inside the field"
// //                     />
// //                   )}

// //                   <Checkbox
// //                     label="Required Field"
// //                     checked={field.required}
// //                     onChange={(checked) => updateField(field.id, "required", checked)}
// //                     helpText="Users must fill this field before submitting"
// //                   />

// //                   {/* ✅ UPDATED OPTIONS RENDERING WITH LABEL & VALUE */}
// //                   {(field.type === "select" || field.type === "radio") && (
// //                     <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                       <BlockStack gap="300">
// //                         <Text variant="bodyMd" fontWeight="semibold">
// //                           Options
// //                         </Text>

// //                         {field.options.length === 0 ? (
// //                           <Text variant="bodySm" tone="subdued">
// //                             No options added yet. Click "Add Option" below to add choices.
// //                           </Text>
// //                         ) : (
// //                           <BlockStack gap="200">
// //                             {field.options.map((opt, i) => (
// //                               <Box key={i} padding="200" background="bg-surface" borderRadius="100">
// //                                 <BlockStack gap="200">
// //                                   <InlineStack align="space-between">
// //                                     <Text variant="bodyMd" fontWeight="semibold">
// //                                       Option {i + 1}
// //                                     </Text>
// //                                     <InlineStack gap="100">
// //                                       <Button
// //                                         size="slim"
// //                                         onClick={() => editOption(field.id, i)}
// //                                       >
// //                                         Edit
// //                                       </Button>
// //                                       <Button
// //                                         size="slim"
// //                                         tone="critical"
// //                                         onClick={() => deleteOption(field.id, i)}
// //                                       >
// //                                         Remove
// //                                       </Button>
// //                                     </InlineStack>
// //                                   </InlineStack>
// //                                   <InlineGrid columns={2} gap="200">
// //                                     <TextField 
// //                                       value={opt.label} 
// //                                       readOnly
// //                                       autoComplete="off"
// //                                       label="Label (Display)"
// //                                     />
// //                                     <TextField 
// //                                       value={opt.value} 
// //                                       readOnly
// //                                       autoComplete="off"
// //                                       label="Value (Saved)"
// //                                     />
// //                                   </InlineGrid>
// //                                 </BlockStack>
// //                               </Box>
// //                             ))}
// //                           </BlockStack>
// //                         )}

// //                         <Button
// //                           size="slim"
// //                           onClick={() => addOption(field.id)}
// //                         >
// //                           Add Option
// //                         </Button>
// //                       </BlockStack>
// //                     </Box>
// //                   )}
// //                 </FormLayout>
// //               </Modal.Section>
// //             </Modal>
// //           );
// //         })()}
// //       </Page>
// //     </AppProvider>
// //   );
// // }










// // import { useState, useEffect } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";
// // import {
// //   AppProvider,
// //   Page,
// //   Card,
// //   Text,
// //   TextField,
// //   Select,
// //   Button,
// //   ButtonGroup,
// //   Checkbox,
// //   BlockStack,
// //   InlineStack,
// //   InlineGrid,
// //   Grid,
// //   Box,
// //   Banner,
// //   Divider,
// //   Modal,
// //   FormLayout,
// // } from "@shopify/polaris";
// // import enTranslations from "@shopify/polaris/locales/en.json";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);

// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   const data = await response.json();
// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };

// // export default function CustomizeForm() {
// //   const [formName, setFormName] = useState("Contact");
// //   const [formDescription, setFormDescription] = useState("");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [selectedFieldId, setSelectedFieldId] = useState(null);
// //   const [saveMessage, setSaveMessage] = useState(null);
// //   const [formSubmissionTitle, setFormSubmissionTitle] = useState("Form Submitted");
// //   const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully!");
// //   const { shop } = useLoaderData();
// //   const [fields, setFields] = useState([]);

// //   // Fetch existing fields on component mount
// //   useEffect(() => {
// //     async function fetchFields() {
// //       try {
// //           const shopIdOnly = shop.id.split("/").pop();
// //       console.log("🆔 SHOP ID ONLY:", shopIdOnly);
// //         const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
// //         console.log("hello api")
// //         if (response.ok) {
// //           console.log("enter")
// //           const result = await response.json();
// //           console.log(result.data.formTemplates.fields,"rfbherbghrgh" )

// //           setFields(result.data.formTemplates.fields || []);

// //         }
// //       } catch (error) {
// //         console.error("Error fetching fields:", error);
// //       }
// //     }
// //     fetchFields();
// //   }, [shop.id]);

// //   // Add new field
// //   function addField() {
// //     setFields([
// //       ...fields,
// //       {
// //         id: `field_${Date.now()}`,
// //         label: "",
// //         type: "text",
// //         placeholder: "",
// //         required: false,
// //         options: [],
// //       },
// //     ]);
// //   }

// //   // Update field
// //   function updateField(id, key, value) {
// //     setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
// //   }

// //   // Delete field
// //   function deleteField(id) {
// //     setFields(fields.filter((f) => f.id !== id));
// //   }

// //   // Add option with label and value
// //   function addOption(fieldId) {
// //     const label = prompt("Enter option label (display text):");
// //     if (!label) return;

// //     const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, "_"));
// //     if (!value) return;

// //     setFields(
// //       fields.map((f) =>
// //         f.id === fieldId ? { ...f, options: [...f.options, { label, value }] } : f
// //       )
// //     );
// //   }

// //   // Edit option
// //   function editOption(fieldId, index) {
// //     console.log(fieldId)
// //     const currentOption = fields.find((f) => f.id === fieldId)?.options[index];
// //     if (!currentOption) return;

// //     const newLabel = prompt("Update option label:", currentOption.label);
// //     if (!newLabel) return;

// //     const newValue = prompt("Update option value:", currentOption.value);
// //     if (!newValue) return;

// //     setFields(
// //       fields.map((f) =>
// //         f.id === fieldId
// //           ? {
// //               ...f,
// //               options: f.options.map((o, i) => (i === index ? { label: newLabel, value: newValue } : o)),
// //             }
// //           : f
// //       )
// //     );
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     setFields(
// //       fields.map((f) =>
// //         f.id === fieldId ? { ...f, options: f.options.filter((_, i) => i !== index) } : f
// //       )
// //     );
// //   }

// //   // Handle form submission (preview form)
// //   function handleSubmit() {
// //     const formData = {};
// //     fields.forEach((field) => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });
// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save form configuration to API
// //   async function saveFormConfig() {
// //     setIsSaving(true);

// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formSubmissionTitle: formSubmissionTitle,
// //         successDescription: successDescription,
// //         fields: fields.map((f) => ({
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options,
// //         })),
// //         meta: {
// //           createdBy: "AdminUser",
// //           published: false,
// //         },
// //       },
// //     };

// //     console.log("=== SENDING TO API ===");
// //     console.log(JSON.stringify(payload, null, 2));
// //     console.log("=====================");

// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("=== API RESPONSE ===");
// //         console.log(result);
// //         console.log("===================");

// //         // Display success message using formSubmissionTitle and successDescription
// //         setSaveMessage({
// //           type: "success",
// //           title: formSubmissionTitle,
// //           text: successDescription,
// //         });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       } else {
// //         const errorText = await response.text();
// //         console.error("API Error:", errorText);
// //         setSaveMessage({
// //           type: "error",
// //           text: `❌ Error saving form: ${response.status}`,
// //         });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       }
// //     } catch (error) {
// //       console.error("Network Error:", error);
// //       setSaveMessage({
// //         type: "error",
// //         text: `❌ Network error: ${error.message}`,
// //       });
// //       setTimeout(() => setSaveMessage(null), 5000);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   // Get field icon based on type
// //   function getFieldIcon(type) {
// //     const icons = {
// //       text: "A",
// //       email: "@",
// //       number: "#",
// //       phone: "☎",
// //       textarea: "≡",
// //       select: "▼",
// //       radio: "○",
// //     };
// //     return icons[type] || "A";
// //   }

// //   return (
// //     <AppProvider i18n={enTranslations}>
// //       <Page title="Form Builder">
// //         <BlockStack gap="500">
// //           <Grid>
// //             {/* Left Column - Settings */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
// //               <BlockStack gap="400">
// //                 {/* Form Section */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <Text variant="headingMd" as="h2">
// //                       Form
// //                     </Text>

// //                     <TextField
// //                       label="Title"
// //                       value={formName}
// //                       onChange={(value) => setFormName(value)}
// //                       autoComplete="off"
// //                       maxLength={120}
// //                       showCharacterCount
// //                     />

// //                     <TextField
// //                       label="Content"
// //                       value={formDescription}
// //                       onChange={(value) => setFormDescription(value)}
// //                       multiline={3}
// //                       autoComplete="off"
// //                       maxLength={120}
// //                       showCharacterCount
// //                     />

// //                     <TextField
// //                       label="Form Submission Title"
// //                       value={formSubmissionTitle}
// //                       onChange={(value) => setFormSubmissionTitle(value)}
// //                       autoComplete="off"
// //                     />

// //                     <TextField
// //                       label="Success Description"
// //                       value={successDescription}
// //                       onChange={(value) => setSuccessDescription(value)}
// //                       multiline={3}
// //                       autoComplete="off"
// //                     />


// //                   </BlockStack>
// //                 </Card>

// //                 {/* Fields Section */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <InlineStack align="space-between" blockAlign="center">
// //                       <Text variant="headingMd" as="h2">
// //                         Fields
// //                       </Text>
// //                       <Button variant="primary" size="slim" onClick={addField}>
// //                         Add Form Field
// //                       </Button>
// //                     </InlineStack>

// //                     {/* Fields List */}
// //                     <BlockStack gap="200">
// //                       {fields.length === 0 ? (
// //                         <Banner tone="info">
// //                           No fields added yet. Click "Add Form Field" to start building your form.
// //                         </Banner>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {fields.map((field) => (
// //                             <Box
// //                               key={field.id}
// //                               padding="300"
// //                               background="bg-surface"
// //                               borderRadius="200"
// //                             >
// //                               <InlineStack gap="300" align="space-between" blockAlign="center">
// //                                 <InlineStack gap="300" blockAlign="center">
// //                                   <Text variant="bodyMd" tone="subdued" fontWeight="medium">
// //                                     {getFieldIcon(field.type)}
// //                                   </Text>
// //                                   <Text variant="bodyMd" fontWeight="medium">
// //                                     {field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}
// //                                   </Text>
// //                                 </InlineStack>
// //                                 <InlineStack gap="200">
// //                                   <Button plain onClick={() => setSelectedFieldId(field.id)}>
// //                                     Edit
// //                                   </Button>
// //                                   <Button
// //                                     plain
// //                                     tone="critical"
// //                                     onClick={() => {
// //                                       deleteField(field.id);
// //                                       if (selectedFieldId === field.id) {
// //                                         setSelectedFieldId(null);
// //                                       }
// //                                     }}
// //                                   >
// //                                     Remove
// //                                   </Button>
// //                                 </InlineStack>
// //                               </InlineStack>
// //                             </Box>
// //                           ))}
// //                         </BlockStack>
// //                       )}
// //                     </BlockStack>
// //                   </BlockStack>
// //                 </Card>

// //                 {/* Save Message */}
// //                 {saveMessage && (
// //                   <Banner title={saveMessage.title} tone={saveMessage.type === "success" ? "success" : "critical"}>
// //                     {saveMessage.text}
// //                   </Banner>
// //                 )}

// //                 {/* Save Button */}
// //                 <Button
// //                   variant="primary"
// //                   tone={isSaving ? "subdued" : "success"}
// //                   onClick={saveFormConfig}
// //                   disabled={isSaving}
// //                   loading={isSaving}
// //                   fullWidth
// //                 >
// //                   Save Form
// //                 </Button>
// //               </BlockStack>
// //             </Grid.Cell>

// //             {/* Right Column - Preview */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
// //               <Box position="sticky" top="16px">
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <Box padding="500" background="bg-surface" borderRadius="300">
// //                       <BlockStack gap="400">
// //                         <Text variant="headingLg" as="h1">
// //                           {formName || "Form Title"}
// //                         </Text>

// //                         {formDescription && (
// //                           <Text as="p" tone="subdued">
// //                             {formDescription}
// //                           </Text>
// //                         )}

// //                         {fields.length === 0 ? (
// //                           <Box padding="800">
// //                             <Text variant="bodyMd" tone="subdued" alignment="center">
// //                               No fields added yet. Click "Add Form Field" to start building your form.
// //                             </Text>
// //                           </Box>
// //                         ) : (
// //                           <BlockStack gap="400">
// //                             {fields.map((f) => (
// //                               <BlockStack key={f.id} gap="200">
// //                                 <Text as="label" variant="bodyMd" fontWeight="semibold">
// //                                   {f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}
// //                                 </Text>

// //                                 {f.type === "text" || f.type === "email" || f.type === "number" ? (
// //                                   <TextField
// //                                     type={f.type}
// //                                     placeholder={f.placeholder}
// //                                     name={`field-${f.id}`}
// //                                     autoComplete="off"
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "phone" ? (
// //                                   <InlineStack gap="200">
// //                                     <Select
// //                                       options={[
// //                                         { label: "+91", value: "+91" },
// //                                         { label: "+1", value: "+1" },
// //                                       ]}
// //                                       value="+91"
// //                                       disabled
// //                                     />
// //                                     <Box width="100%">
// //                                       <TextField
// //                                         type="tel"
// //                                         placeholder={f.placeholder || "Phone"}
// //                                         name={`field-${f.id}`}
// //                                         autoComplete="off"
// //                                         disabled
// //                                       />
// //                                     </Box>
// //                                   </InlineStack>
// //                                 ) : f.type === "textarea" ? (
// //                                   <TextField
// //                                     multiline={4}
// //                                     placeholder={f.placeholder}
// //                                     name={`field-${f.id}`}
// //                                     autoComplete="off"
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "select" ? (
// //                                   <Select
// //                                     name={`field-${f.id}`}
// //                                     options={[
// //                                       { label: "Select an option", value: "" },
// //                                       ...f.options.map((opt) => ({ label: opt.label, value: opt.value })),
// //                                     ]}
// //                                     disabled
// //                                   />
// //                                 ) : f.type === "radio" ? (
// //                                   <BlockStack gap="200">
// //                                     {f.options.map((opt, i) => (
// //                                       <InlineStack key={i} gap="200" align="start">
// //                                         <input
// //                                           type="radio"
// //                                           name={`field-${f.id}`}
// //                                           value={opt.value}
// //                                           id={`field-${f.id}-${i}`}
// //                                           disabled
// //                                         />
// //                                         <Text as="label" htmlFor={`field-${f.id}-${i}`} variant="bodyMd">
// //                                           {opt.label}
// //                                         </Text>
// //                                       </InlineStack>
// //                                     ))}
// //                                   </BlockStack>
// //                                 ) : null}
// //                               </BlockStack>
// //                             ))}

// //                             <Button variant="primary" disabled fullWidth>
// //                               {submitButtonIcon} {submitButtonText}
// //                             </Button>
// //                           </BlockStack>
// //                         )}
// //                       </BlockStack>
// //                     </Box>
// //                   </BlockStack>
// //                 </Card>
// //               </Box>
// //             </Grid.Cell>
// //           </Grid>
// //         </BlockStack>

// //         {/* Edit Field Modal */}
// //         {selectedFieldId && fields.find((f) => f.id === selectedFieldId) && (
// //           <Modal
// //             open={!!selectedFieldId}
// //             onClose={() => setSelectedFieldId(null)}
// //             title="Edit Field"
// //             primaryAction={{
// //               content: "Save",
// //               onAction: () => setSelectedFieldId(null),
// //             }}
// //             secondaryActions={[
// //               {
// //                 content: "Cancel",
// //                 onAction: () => setSelectedFieldId(null),
// //               },
// //             ]}
// //           >
// //             <Modal.Section>
// //               <FormLayout>
// //                 <TextField
// //                   label="Field Label"
// //                   placeholder="Enter field label"
// //                   value={fields.find((f) => f.id === selectedFieldId)?.label}
// //                   onChange={(value) => updateField(selectedFieldId, "label", value)}
// //                   autoComplete="off"
// //                   helpText="The label that appears above this field"
// //                 />

// //                 <Select
// //                   label="Field Type"
// //                   options={[
// //                     { label: "Text Input", value: "text" },
// //                     { label: "Email Input", value: "email" },
// //                     { label: "Number Input", value: "number" },
// //                     { label: "Phone", value: "phone" },
// //                     { label: "Textarea", value: "textarea" },
// //                     { label: "Dropdown Select", value: "select" },
// //                     { label: "Radio Group", value: "radio" },
// //                   ]}
// //                   value={fields.find((f) => f.id === selectedFieldId)?.type}
// //                   onChange={(value) => updateField(selectedFieldId, "type", value)}
// //                   helpText="Select the type of input for this field"
// //                 />

// //                 {fields.find((f) => f.id === selectedFieldId)?.type !== "select" &&
// //                   fields.find((f) => f.id === selectedFieldId)?.type !== "radio" && (
// //                     <TextField
// //                       label="Placeholder Text"
// //                       placeholder="Enter placeholder"
// //                       value={fields.find((f) => f.id === selectedFieldId)?.placeholder}
// //                       onChange={(value) => updateField(selectedFieldId, "placeholder", value)}
// //                       autoComplete="off"
// //                       helpText="Hint text shown inside the field"
// //                     />
// //                   )}

// //                 <Checkbox
// //                   label="Required Field"
// //                   checked={fields.find((f) => f.id === selectedFieldId)?.required}
// //                   onChange={(checked) => updateField(selectedFieldId, "required", checked)}
// //                   helpText="Users must fill this field before submitting"
// //                 />

// //                 {(fields.find((f) => f.id === selectedFieldId)?.type === "select" ||
// //                   fields.find((f) => f.id === selectedFieldId)?.type === "radio") && (
// //                   <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                     <BlockStack gap="300">
// //                       <Text variant="bodyMd" fontWeight="semibold">
// //                         Options
// //                       </Text>

// //                       {fields.find((f) => f.id === selectedFieldId)?.options.length === 0 ? (
// //                         <Text variant="bodySm" tone="subdued">
// //                           No options added yet. Click "Add Option" below to add choices.
// //                         </Text>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {fields
// //                             .find((f) => f.id === selectedFieldId)
// //                             ?.options.map((opt, i) => (
// //                               <Box key={i} padding="200" background="bg-surface" borderRadius="100">
// //                                 <BlockStack gap="200">
// //                                   <InlineStack align="space-between">
// //                                     <Text variant="bodyMd" fontWeight="semibold">
// //                                       Option {i + 1}
// //                                     </Text>
// //                                     <InlineStack gap="100">
// //                                       <Button size="slim" onClick={() => editOption(selectedFieldId, i)}>
// //                                         Edit
// //                                       </Button>
// //                                       <Button
// //                                         size="slim"
// //                                         tone="critical"
// //                                         onClick={() => deleteOption(selectedFieldId, i)}
// //                                       >
// //                                         Remove
// //                                       </Button>
// //                                     </InlineStack>
// //                                   </InlineStack>
// //                                   <InlineGrid columns={2} gap="200">
// //                                     <TextField value={opt.label} readOnly autoComplete="off" label="Label (Display)" />
// //                                     <TextField value={opt.value} readOnly autoComplete="off" label="Value (Saved)" />
// //                                   </InlineGrid>
// //                                 </BlockStack>
// //                               </Box>
// //                             ))}
// //                         </BlockStack>
// //                       )}

// //                       <Button size="slim" onClick={() => addOption(selectedFieldId)}>
// //                         Add Option
// //                       </Button>
// //                     </BlockStack>
// //                   </Box>
// //                 )}
// //               </FormLayout>
// //             </Modal.Section>
// //           </Modal>
// //         )}
// //       </Page>
// //     </AppProvider>
// //   );
// // }





// // import { useState, useEffect } from "react";
// // import { authenticate } from "../shopify.server";
// // import { json } from "@remix-run/node";
// // import { useLoaderData } from "react-router";
// // import {
// //   AppProvider,
// //   Page,
// //   Card,
// //   Text,
// //   TextField,
// //   Select,
// //   Button,
// //   Checkbox,
// //   BlockStack,
// //   InlineStack,
// //   InlineGrid,
// //   Grid,
// //   Box,
// //   Banner,
// //   Modal,
// //   FormLayout,
// // } from "@shopify/polaris";
// // import enTranslations from "@shopify/polaris/locales/en.json";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);

// //   const response = await admin.graphql(`
// //     query {
// //       shop {
// //         id
// //         name
// //         myshopifyDomain
// //       }
// //     }
// //   `);

// //   const data = await response.json();
// //   return json({
// //     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
// //   });
// // };

// // export default function CustomizeForm() {
// //   const [formName, setFormName] = useState("Contact");
// //   const [formDescription, setFormDescription] = useState("");
// //   const [submitButtonText, setSubmitButtonText] = useState("Submit");
// //   const [submitButtonIcon, setSubmitButtonIcon] = useState("");
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [selectedFieldId, setSelectedFieldId] = useState(null);
// //   const [saveMessage, setSaveMessage] = useState(null);
// //   const [formSubmissionTitle, setFormSubmissionTitle] = useState("Form Submitted");
// //   const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully!");
// //   const { shop } = useLoaderData();
// //   const [fields, setFields] = useState([]);
// //   console.log(fields,"Vfbh")

// //   // Fetch existing fields on component mount
// //   useEffect(() => {
// //     async function fetchFields() {
// //       try {
// //         const shopIdOnly = shop.id.split("/").pop();
// //         const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
// //         if (response.ok) {
// //           const result = await response.json();
// //           setFields(result.data.formTemplates.fields || []);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching fields:", error);
// //       }
// //     }
// //     fetchFields();
// //   }, [shop.id]);

// //   // API: Update field
// //   async function updateFieldAPI(fieldId, fieldData) {
// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
// //         {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ fieldData }),
// //         }
// //       );
// //       if (!response.ok) {
// //         const errText = await response.text();
// //         console.error("Error updating field:", errText);
// //       } else {
// //         console.log("Field updated successfully:", await response.json());
// //       }
// //     } catch (err) {
// //       console.error("Network error while updating field:", err);
// //     }
// //   }

// //   // API: Delete field
// //   async function deleteFieldAPI(fieldId) {
// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       const response = await fetch(
// //         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
// //         { method: "DELETE" }
// //       );
// //       if (!response.ok) {
// //         const errText = await response.text();
// //         console.error("Error deleting field:", errText);
// //       } else {
// //         console.log("Field deleted successfully");
// //       }
// //     } catch (err) {
// //       console.error("Network error while deleting field:", err);
// //     }
// //   }

// //   // Add new field
// //   function addField() {
// //     const newField = {
// //       id: `field_${Date.now()}`,
// //       label: "",
// //       type: "text",
// //       placeholder: "",
// //       required: false,
// //       options: [],
// //     };
// //     setFields([...fields, newField]);
// //   }

// //   // Update field locally + API
// //   function updateField(id, key, value) {
// //     setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
// //     const updatedField = fields.find((f) => f.id === id);
// //     if (updatedField) {
// //       const newFieldData = { ...updatedField, [key]: value };
// //       updateFieldAPI(id, newFieldData);
// //     }
// //   }

// //   // Delete field locally + API
// //   function deleteField(id) {
// //     setFields(fields.filter((f) => f.id !== id));
// //     if (selectedFieldId === id) setSelectedFieldId(null);
// //     deleteFieldAPI(id);
// //   }

// //   // Add option
// //   function addOption(fieldId) {
// //     const label = prompt("Enter option label (display text):");
// //     if (!label) return;
// //     const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, "_"));
// //     if (!value) return;
// //     const updatedFields = fields.map((f) =>
// //       f.id === fieldId ? { ...f, options: [...f.options, { label, value }] } : f
// //     );
// //     setFields(updatedFields);

// //     const updatedField = updatedFields.find((f) => f.id === fieldId);
// //     updateFieldAPI(fieldId, updatedField);
// //   }

// //   // Edit option
// //   function editOption(fieldId, index) {
// //     const currentOption = fields.find((f) => f.id === fieldId)?.options[index];
// //     if (!currentOption) return;
// //     const newLabel = prompt("Update option label:", currentOption.label);
// //     if (!newLabel) return;
// //     const newValue = prompt("Update option value:", currentOption.value);
// //     if (!newValue) return;

// //     const updatedFields = fields.map((f) =>
// //       f.id === fieldId
// //         ? { ...f, options: f.options.map((o, i) => (i === index ? { label: newLabel, value: newValue } : o)) }
// //         : f
// //     );
// //     setFields(updatedFields);

// //     const updatedField = updatedFields.find((f) => f.id === fieldId);
// //     updateFieldAPI(fieldId, updatedField);
// //   }

// //   // Delete option
// //   function deleteOption(fieldId, index) {
// //     const updatedFields = fields.map((f) =>
// //       f.id === fieldId ? { ...f, options: f.options.filter((_, i) => i !== index) } : f
// //     );
// //     setFields(updatedFields);

// //     const updatedField = updatedFields.find((f) => f.id === fieldId);
// //     updateFieldAPI(fieldId, updatedField);
// //   }

// //   // Handle form submission (preview)
// //   function handleSubmit() {
// //     const formData = {};
// //     fields.forEach((field) => {
// //       const inputEl = document.querySelector(`[name="field-${field.id}"]`);
// //       if (field.type === "radio") {
// //         const checkedRadio = document.querySelector(`[name="field-${field.id}"]:checked`);
// //         formData[field.label || `field-${field.id}`] = checkedRadio?.value || "";
// //       } else {
// //         formData[field.label || `field-${field.id}`] = inputEl?.value || "";
// //       }
// //     });
// //     alert("Form Submitted!\n\n" + JSON.stringify(formData, null, 2));
// //   }

// //   // Save entire form config
// //   async function saveFormConfig() {
// //     setIsSaving(true);
// //     const payload = {
// //       storeName: shop.myshopifyDomain,
// //       formData: {
// //         name: formName,
// //         description: formDescription,
// //         formSubmissionTitle,
// //         successDescription,
// //         fields: fields.map((f) => ({
// //           label: f.label,
// //           type: f.type,
// //           placeholder: f.placeholder,
// //           required: f.required,
// //           options: f.options,
// //         })),
// //         meta: { createdBy: "AdminUser", published: false },
// //       },
// //     };
// //     try {
// //       const shopIdOnly = shop.id.split("/").pop();
// //       const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       if (response.ok) {
// //         const result = await response.json();
// //         setSaveMessage({ type: "success", title: formSubmissionTitle, text: successDescription });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       } else {
// //         const errText = await response.text();
// //         setSaveMessage({ type: "error", text: `❌ Error saving form: ${errText}` });
// //         setTimeout(() => setSaveMessage(null), 5000);
// //       }
// //     } catch (error) {
// //       setSaveMessage({ type: "error", text: `❌ Network error: ${error.message}` });
// //       setTimeout(() => setSaveMessage(null), 5000);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   }

// //   // Get field icon
// //   function getFieldIcon(type) {
// //     const icons = { text: "A", email: "@", number: "#", phone: "☎", textarea: "≡", select: "▼", radio: "○" };
// //     return icons[type] || "A";
// //   }

// //   return (
// //     <AppProvider i18n={enTranslations}>
// //       <Page title="Form Builder">
// //         <BlockStack gap="500">
// //           <Grid>
// //             {/* Left Column */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
// //               <BlockStack gap="400">
// //                 {/* Form Settings */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <Text variant="headingMd" as="h2">Form</Text>
// //                     <TextField label="Title" value={formName} onChange={setFormName} autoComplete="off" maxLength={120} showCharacterCount />
// //                     <TextField label="Content" value={formDescription} onChange={setFormDescription} multiline={3} autoComplete="off" maxLength={120} showCharacterCount />
// //                     <TextField label="Form Submission Title" value={formSubmissionTitle} onChange={setFormSubmissionTitle} autoComplete="off" />
// //                     <TextField label="Success Description" value={successDescription} onChange={setSuccessDescription} multiline={3} autoComplete="off" />
// //                   </BlockStack>
// //                 </Card>

// //                 {/* Fields Section */}
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <InlineStack align="space-between" blockAlign="center">
// //                       <Text variant="headingMd" as="h2">Fields</Text>
// //                       <Button variant="primary" size="slim" onClick={addField}>Add Form Field</Button>
// //                     </InlineStack>

// //                     <BlockStack gap="200">
// //                       {fields.length === 0 ? (
// //                         <Banner tone="info">No fields added yet. Click "Add Form Field" to start building your form.</Banner>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {fields.map((field) => (
// //                             <Box key={field.id} padding="300" background="bg-surface" borderRadius="200">
// //                               <InlineStack gap="300" align="space-between" blockAlign="center">
// //                                 <InlineStack gap="300" blockAlign="center">
// //                                   <Text variant="bodyMd" tone="subdued" fontWeight="medium">{getFieldIcon(field.type)}</Text>
// //                                   <Text variant="bodyMd" fontWeight="medium">{field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}</Text>
// //                                 </InlineStack>
// //                                 <InlineStack gap="200">
// //                                   <Button plain onClick={() => setSelectedFieldId(field.id)}>Edit</Button>
// //                                   <Button plain tone="critical" onClick={() => deleteField(field._id)}>Remove</Button>
// //                                 </InlineStack>
// //                               </InlineStack>
// //                             </Box>
// //                           ))}
// //                         </BlockStack>
// //                       )}
// //                     </BlockStack>
// //                   </BlockStack>
// //                 </Card>

// //                 {/* Save Message */}
// //                 {saveMessage && <Banner title={saveMessage.title} tone={saveMessage.type === "success" ? "success" : "critical"}>{saveMessage.text}</Banner>}

// //                 {/* Save Button */}
// //                 <Button variant="primary" tone={isSaving ? "subdued" : "success"} onClick={saveFormConfig} disabled={isSaving} loading={isSaving} fullWidth>Save Form</Button>
// //               </BlockStack>
// //             </Grid.Cell>

// //             {/* Right Column - Preview */}
// //             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
// //               <Box position="sticky" top="16px">
// //                 <Card>
// //                   <BlockStack gap="400">
// //                     <Box padding="500" background="bg-surface" borderRadius="300">
// //                       <BlockStack gap="400">
// //                         <Text variant="headingLg" as="h1">{formName || "Form Title"}</Text>
// //                         {formDescription && <Text as="p" tone="subdued">{formDescription}</Text>}

// //                         {fields.length === 0 ? (
// //                           <Box padding="800"><Text variant="bodyMd" tone="subdued" alignment="center">No fields added yet. Click "Add Form Field" to start building your form.</Text></Box>
// //                         ) : (
// //                           <BlockStack gap="400">
// //                             {fields.map((f) => (
// //                               <BlockStack key={f.id} gap="200">
// //                                 <Text as="label" variant="bodyMd" fontWeight="semibold">{f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}</Text>
// //                                 {["text","email","number"].includes(f.type) && <TextField type={f.type} placeholder={f.placeholder} name={`field-${f.id}`} autoComplete="off" disabled />}
// //                                 {f.type === "phone" && <InlineStack gap="200"><Select options={[{label:"+91",value:"+91"},{label:"+1",value:"+1"}]} value="+91" disabled /><Box width="100%"><TextField type="tel" placeholder={f.placeholder||"Phone"} name={`field-${f.id}`} autoComplete="off" disabled /></Box></InlineStack>}
// //                                 {f.type === "textarea" && <TextField multiline={4} placeholder={f.placeholder} name={`field-${f.id}`} autoComplete="off" disabled />}
// //                                 {f.type === "select" && <Select name={`field-${f.id}`} options={[{label:"Select an option",value:""}, ...f.options.map(opt=>({label:opt.label,value:opt.value}))]} disabled />}
// //                                 {f.type === "radio" && <BlockStack gap="200">{f.options.map((opt,i)=>(<InlineStack key={i} gap="200" align="start"><input type="radio" name={`field-${f.id}`} value={opt.value} id={`field-${f.id}-${i}`} disabled /><Text as="label" htmlFor={`field-${f.id}-${i}`} variant="bodyMd">{opt.label}</Text></InlineStack>))}</BlockStack>}
// //                               </BlockStack>
// //                             ))}
// //                             <Button variant="primary" disabled fullWidth>{submitButtonIcon} {submitButtonText}</Button>
// //                           </BlockStack>
// //                         )}
// //                       </BlockStack>
// //                     </Box>
// //                   </BlockStack>
// //                 </Card>
// //               </Box>
// //             </Grid.Cell>
// //           </Grid>
// //         </BlockStack>

// //         {/* Edit Field Modal */}
// //         {selectedFieldId && fields.find((f) => f.id === selectedFieldId) && (
// //           <Modal
// //             open={!!selectedFieldId}
// //             onClose={() => setSelectedFieldId(null)}
// //             title="Edit Field"
// //             primaryAction={{ content: "Save", onAction: () => setSelectedFieldId(null) }}
// //             secondaryActions={[{ content: "Cancel", onAction: () => setSelectedFieldId(null) }]}
// //           >
// //             <Modal.Section>
// //               <FormLayout>
// //                 <TextField
// //                   label="Field Label"
// //                   placeholder="Enter field label"
// //                   value={fields.find((f) => f.id === selectedFieldId)?.label}
// //                   onChange={(value) => updateField(selectedFieldId, "label", value)}
// //                   autoComplete="off"
// //                   helpText="The label that appears above this field"
// //                 />

// //                 <Select
// //                   label="Field Type"
// //                   options={[
// //                     { label: "Text Input", value: "text" },
// //                     { label: "Email Input", value: "email" },
// //                     { label: "Number Input", value: "number" },
// //                     { label: "Phone", value: "phone" },
// //                     { label: "Textarea", value: "textarea" },
// //                     { label: "Dropdown Select", value: "select" },
// //                     { label: "Radio Group", value: "radio" },
// //                   ]}
// //                   value={fields.find((f) => f.id === selectedFieldId)?.type}
// //                   onChange={(value) => updateField(selectedFieldId, "type", value)}
// //                   helpText="Select the type of input for this field"
// //                 />

// //                 {["text","email","number","phone","textarea"].includes(fields.find((f)=>f.id===selectedFieldId)?.type) && (
// //                   <TextField
// //                     label="Placeholder Text"
// //                     placeholder="Enter placeholder"
// //                     value={fields.find((f) => f.id === selectedFieldId)?.placeholder}
// //                     onChange={(value) => updateField(selectedFieldId, "placeholder", value)}
// //                     autoComplete="off"
// //                     helpText="Hint text shown inside the field"
// //                   />
// //                 )}

// //                 <Checkbox
// //                   label="Required Field"
// //                   checked={fields.find((f) => f.id === selectedFieldId)?.required}
// //                   onChange={(checked) => updateField(selectedFieldId, "required", checked)}
// //                   helpText="Users must fill this field before submitting"
// //                 />

// //                 {["select","radio"].includes(fields.find((f)=>f.id===selectedFieldId)?.type) && (
// //                   <Box padding="400" background="bg-surface-secondary" borderRadius="200">
// //                     <BlockStack gap="300">
// //                       <Text variant="bodyMd" fontWeight="semibold">Options</Text>
// //                       {fields.find((f)=>f.id===selectedFieldId)?.options.length===0 ? (
// //                         <Text variant="bodySm" tone="subdued">No options added yet. Click "Add Option" below to add choices.</Text>
// //                       ) : (
// //                         <BlockStack gap="200">
// //                           {fields.find((f)=>f.id===selectedFieldId)?.options.map((opt,i)=>(
// //                             <Box key={i} padding="200" background="bg-surface" borderRadius="100">
// //                               <BlockStack gap="200">
// //                                 <InlineStack align="space-between">
// //                                   <Text variant="bodyMd" fontWeight="semibold">Option {i+1}</Text>
// //                                   <InlineStack gap="100">
// //                                     <Button size="slim" onClick={()=>editOption(selectedFieldId,i)}>Edit</Button>
// //                                     <Button size="slim" tone="critical" onClick={()=>deleteOption(selectedFieldId,i)}>Remove</Button>
// //                                   </InlineStack>
// //                                 </InlineStack>
// //                                 <InlineGrid columns={2} gap="200">
// //                                   <TextField value={opt.label} readOnly autoComplete="off" label="Label (Display)" />
// //                                   <TextField value={opt.value} readOnly autoComplete="off" label="Value (Saved)" />
// //                                 </InlineGrid>
// //                               </BlockStack>
// //                             </Box>
// //                           ))}
// //                         </BlockStack>
// //                       )}
// //                       <Button size="slim" onClick={()=>addOption(selectedFieldId)}>Add Option</Button>
// //                     </BlockStack>
// //                   </Box>
// //                 )}
// //               </FormLayout>
// //             </Modal.Section>
// //           </Modal>
// //         )}
// //       </Page>
// //     </AppProvider>
// //   );
// // }






// import { useState, useEffect } from "react";
// import { authenticate } from "../shopify.server";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "react-router";
// import {
//   AppProvider,
//   Page,
//   Card,
//   Text,
//   TextField,
//   Select,
//   Button,
//   Checkbox,
//   BlockStack,
//   InlineStack,
//   InlineGrid,
//   Grid,
//   Box,
//   Banner,
//   Modal,
//   FormLayout,
//   Icon,
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import {
//   EditIcon,DeleteIcon
// } from '@shopify/polaris-icons';

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   const response = await admin.graphql(`
//     query {
//       shop {
//         id
//         name
//         myshopifyDomain
//       }
//     }
//   `);

//   const data = await response.json();
//   return json({
//     shop: data.data?.shop || { id: "", myshopifyDomain: "" },
//   });
// };

// export default function CustomizeForm() {
//   const [formName, setFormName] = useState("Contact");
//   const [formDescription, setFormDescription] = useState("");
//   const [submitButtonText, setSubmitButtonText] = useState("Submit");
//   const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
//   const [selectedFieldId, setSelectedFieldId] = useState(null);
//   const [saveMessage, setSaveMessage] = useState(null);
//   const [formSubmissionTitle, setFormSubmissionTitle] = useState("Form Submitted");
//   const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully!");
//   const { shop } = useLoaderData();
//   const [fields, setFields] = useState([]);

//   // Current field being edited/added
//   const [currentField, setCurrentField] = useState({
//     label: "",
//     type: "text",
//     placeholder: "",
//     required: false,
//     options: [],
//   });

//   // Fetch existing fields
//   const fetchFields = async () => {
//     try {
//       const shopIdOnly = shop.id.split("/").pop();
//       const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
//       if (response.ok) {
//         const result = await response.json();
//         setFields(result.data.formTemplates.fields || []);
//       }
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFields();
//   }, [shop.id]);

//   // Open Add Field Modal
//   const openAddModal = () => {
//     setModalMode("add");
//     setCurrentField({
//       label: "",
//       type: "text",
//       placeholder: "",
//       required: false,
//       options: [],
//     });
//     setSelectedFieldId(null);
//     setIsModalOpen(true);
//   };

//   // Open Edit Field Modal
//   // const openEditModal = async (fieldId) => {
//   //   try {
//   //     const shopIdOnly = shop.id.split("/").pop();
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
//   //     );

//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       setModalMode("edit");
//   //       setSelectedFieldId(fieldId);
//   //       setCurrentField({
//   //         label: result.data.label || "",
//   //         type: result.data.type || "text",
//   //         placeholder: result.data.placeholder || "",
//   //         required: result.data.required || false,
//   //         options: result.data.options || [],
//   //       });
//   //       setIsModalOpen(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching field data:", error);
//   //     setSaveMessage({ type: "error", text: `❌ Error loading field: ${error.message}` });
//   //     setTimeout(() => setSaveMessage(null), 5000);
//   //   }
//   // };
// // Open Edit Field Modal - With proper error handling
// const openEditModal = async (fieldId) => {
//   const fieldToEdit = fields.find((f) => f._id === fieldId);

//   if (!fieldToEdit) {
//     setSaveMessage({ type: "error", text: "❌ Field not found" });
//     setTimeout(() => setSaveMessage(null), 5000);
//     return;
//   }

//   try {
//     const shopIdOnly = shop.id.split("/").pop();
//     const response = await fetch(
//       `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
//     );

//     if (response.ok) {
//       const result = await response.json();
//       setModalMode("edit");
//       setSelectedFieldId(fieldId);
//       setCurrentField({
//         label: result.data.label || "",
//         type: result.data.type || "text",
//         placeholder: result.data.placeholder || "",
//         required: result.data.required || false,
//         options: result.data.options || [],
//       });
//       setIsModalOpen(true);
//     } else {
//       // API failed, use existing data from fields array
//       console.warn("API call failed, using existing field data");
//       setModalMode("edit");
//       setSelectedFieldId(fieldId);
//       setCurrentField({
//         label: fieldToEdit.label || "",
//         type: fieldToEdit.type || "text",
//         placeholder: fieldToEdit.placeholder || "",
//         required: fieldToEdit.required || false,
//         options: fieldToEdit.options || [],
//       });
//       setIsModalOpen(true);
//     }
//   } catch (error) {
//     // Network error, use existing data from fields array
//     console.error("Error fetching field data:", error);
//     setModalMode("edit");
//     setSelectedFieldId(fieldId);
//     setCurrentField({
//       label: fieldToEdit.label || "",
//       type: fieldToEdit.type || "text",
//       placeholder: fieldToEdit.placeholder || "",
//       required: fieldToEdit.required || false,
//       options: fieldToEdit.options || [],
//     });
//     setIsModalOpen(true);
//   }
// };


//   // Close Modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedFieldId(null);
//     setCurrentField({
//       label: "",
//       type: "text",
//       placeholder: "",
//       required: false,
//       options: [],
//     });
//   };

//   // API: Add new field
//   const addFieldAPI = async () => {
//     try {
//       const shopIdOnly = shop.id.split("/").pop();
//       const response = await fetch(
//         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fieldData: currentField }),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setSaveMessage({ type: "success", text: "✅ Field added successfully!" });
//         setTimeout(() => setSaveMessage(null), 5000);
//         await fetchFields(); // Refresh fields
//         closeModal();
//       } else {
//         const errText = await response.text();
//         setSaveMessage({ type: "error", text: `❌ Error adding field: ${errText}` });
//         setTimeout(() => setSaveMessage(null), 5000);
//       }
//     } catch (err) {
//       console.error("Network error while adding field:", err);
//       setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//       setTimeout(() => setSaveMessage(null), 5000);
//     }
//   };

//   // API: Update field
//   const updateFieldAPI = async () => {
//     try {
//       const shopIdOnly = shop.id.split("/").pop();
//       const response = await fetch(
//         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fieldData: currentField }),
//         }
//       );

//       if (response.ok) {
//         setSaveMessage({ type: "success", text: "✅ Field updated successfully!" });
//         setTimeout(() => setSaveMessage(null), 5000);
//         await fetchFields(); // Refresh fields
//         closeModal();
//       } else {
//         const errText = await response.text();
//         setSaveMessage({ type: "error", text: `❌ Error updating field: ${errText}` });
//         setTimeout(() => setSaveMessage(null), 5000);
//       }
//     } catch (err) {
//       console.error("Network error while updating field:", err);
//       setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//       setTimeout(() => setSaveMessage(null), 5000);
//     }
//   };

//   // API: Delete field
//   const deleteFieldAPI = async (fieldId) => {
//     if (!confirm("Are you sure you want to delete this field?")) return;

//     try {
//       const shopIdOnly = shop.id.split("/").pop();
//       const response = await fetch(
//         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
//         { method: "DELETE" }
//       );

//       if (response.ok) {
//         setSaveMessage({ type: "success", text: "✅ Field deleted successfully!" });
//         setTimeout(() => setSaveMessage(null), 5000);
//         await fetchFields(); // Refresh fields without reload
//       } else {
//         const errText = await response.text();
//         setSaveMessage({ type: "error", text: `❌ Error deleting field: ${errText}` });
//         setTimeout(() => setSaveMessage(null), 5000);
//       }
//     } catch (err) {
//       console.error("Network error while deleting field:", err);
//       setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//       setTimeout(() => setSaveMessage(null), 5000);
//     }
//   };

//   // Handle Save in Modal
//   const handleModalSave = () => {
//     if (!currentField.label.trim()) {
//       alert("Please enter a field label");
//       return;
//     }

//     if (modalMode === "add") {
//       addFieldAPI();
//     } else {
//       updateFieldAPI();
//     }
//   };

//   // Update current field state
//   const updateCurrentField = (key, value) => {
//     setCurrentField({ ...currentField, [key]: value });
//   };

//   // Add option to current field
//   const addOption = () => {
//     const label = prompt("Enter option label (display text):");
//     if (!label) return;
//     const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, "_"));
//     if (!value) return;

//     setCurrentField({
//       ...currentField,
//       options: [...currentField.options, { label, value }],
//     });
//   };

//   // Edit option
//   const editOption = (index) => {
//     const currentOption = currentField.options[index];
//     if (!currentOption) return;

//     const newLabel = prompt("Update option label:", currentOption.label);
//     if (!newLabel) return;
//     const newValue = prompt("Update option value:", currentOption.value);
//     if (!newValue) return;

//     const updatedOptions = currentField.options.map((opt, i) =>
//       i === index ? { label: newLabel, value: newValue } : opt
//     );
//     setCurrentField({ ...currentField, options: updatedOptions });
//   };

//   // Delete option
//   const deleteOption = (index) => {
//     const updatedOptions = currentField.options.filter((_, i) => i !== index);
//     setCurrentField({ ...currentField, options: updatedOptions });
//   };

//   // Save entire form config
//   async function saveFormConfig() {
//     setIsSaving(true);
//     const payload = {
//       storeName: shop.myshopifyDomain,
//       formData: {
//         name: formName,
//         description: formDescription,
//         formSubmissionTitle,
//         successDescription,
//         // fields: fields.map((f) => ({
//         //   label: f.label,
//         //   type: f.type,
//         //   placeholder: f.placeholder,
//         //   required: f.required,
//         //   options: f.options,
//         // })),
//         meta: { createdBy: "AdminUser", published: false },
//       },
//     };

//     try {
//       const shopIdOnly = shop.id.split("/").pop();
//       const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setSaveMessage({ type: "success", title: formSubmissionTitle, text: successDescription });
//         setTimeout(() => setSaveMessage(null), 5000);
//       } else {
//         const errText = await response.text();
//         setSaveMessage({ type: "error", text: `❌ Error saving form: ${errText}` });
//         setTimeout(() => setSaveMessage(null), 5000);
//       }
//     } catch (error) {
//       setSaveMessage({ type: "error", text: `❌ Network error: ${error.message}` });
//       setTimeout(() => setSaveMessage(null), 5000);
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   // Get field icon
//   function getFieldIcon(type) {
//     const icons = { text: "A", email: "@", number: "#", phone: "☎", textarea: "≡", select: "▼", radio: "○" };
//     return icons[type] || "A";
//   }

//   return (
//     <AppProvider i18n={enTranslations}>
//       <Page title="Form Builder">
//         <BlockStack gap="500">
//           <Grid>
//             {/* Left Column */}
//             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
//               <BlockStack gap="400">
//                 {/* Form Settings */}
//                 <Card>
//                   <BlockStack gap="400">
//                     <Text variant="headingMd" as="h2">Form</Text>
//                     <TextField label="Title" value={formName} onChange={setFormName} autoComplete="off" maxLength={120} showCharacterCount />
//                     <TextField label="Content" value={formDescription} onChange={setFormDescription} multiline={3} autoComplete="off" maxLength={120} showCharacterCount />
//                     <TextField label="Form Submission Title" value={formSubmissionTitle} onChange={setFormSubmissionTitle} autoComplete="off" />
//                     <TextField label="Success Description" value={successDescription} onChange={setSuccessDescription} multiline={3} autoComplete="off" />
//                   </BlockStack>
//                 <Button   style={{ paddingtop: "10px" }}  variant="primary" tone={isSaving ? "subdued" : "success"} onClick={saveFormConfig} disabled={isSaving} loading={isSaving} >Save Form</Button>

//                 </Card>

//                 {/* Fields Section */}
//                 <Card>
//                   <BlockStack gap="400">
//                     <InlineStack align="space-between" blockAlign="center">
//                       <Text variant="headingMd" as="h2">Fields</Text>
//                       <Button variant="primary" size="slim" onClick={openAddModal}>Add Form Field</Button>
//                     </InlineStack>

//                     <BlockStack gap="200">
//                       {fields.length === 0 ? (
//                         <Banner tone="info">No fields added yet. Click "Add Form Field" to start building your form.</Banner>
//                       ) : (
//                         <BlockStack gap="200">
//                           {fields.map((field) => (
//                             <Box key={field._id} padding="300" background="bg-surface" borderRadius="200">
//                               <InlineStack gap="300" align="space-between" blockAlign="center">
//                                 <InlineStack gap="300" blockAlign="center">
//                                   <Text variant="bodyMd" tone="subdued" fontWeight="medium">{getFieldIcon(field.type)}</Text>
//                                   <Text variant="bodyMd" fontWeight="medium">{field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                 </InlineStack>
//                                 <InlineStack gap="200">
//                                   <Button plain onClick={() => openEditModal(field._id)}>Edit <Icon
//   source={EditIcon}
//   tone="base"
// /></Button>
//                                   <Button plain tone="critical" onClick={() => deleteFieldAPI(field._id)}>Remove <Icon
//   source={DeleteIcon}
//   tone="base"
// /></Button>
//                                 </InlineStack>
//                               </InlineStack>
//                             </Box>
//                           ))}
//                         </BlockStack>
//                       )}
//                     </BlockStack>
//                   </BlockStack>
//                 </Card>

//                 {/* Save Message */}
//                 {saveMessage && <Banner title={saveMessage.title} tone={saveMessage.type === "success" ? "success" : "critical"}>{saveMessage.text}</Banner>}

//                 {/* Save Button */}
//               </BlockStack>
//             </Grid.Cell>

//             {/* Right Column - Preview */}
//             <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
//               <Box position="sticky" top="16px">
//                 <Card>
//                   <BlockStack gap="400">
//                     <Box padding="500" background="bg-surface" borderRadius="300">
//                       <BlockStack gap="400">
//                         <Text variant="headingLg" as="h1">{formName || "Form Title"}</Text>
//                         {formDescription && <Text as="p" tone="subdued">{formDescription}</Text>}

//                         {fields.length === 0 ? (
//                           <Box padding="800"><Text variant="bodyMd" tone="subdued" alignment="center">No fields added yet. Click "Add Form Field" to start building your form.</Text></Box>
//                         ) : (
//                           <BlockStack gap="400">
//                             {fields.map((f) => (
//                               <BlockStack key={f._id} gap="200">
//                                 <Text as="label" variant="bodyMd" fontWeight="semibold">{f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                 {["text","email","number"].includes(f.type) && <TextField type={f.type} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                 {f.type === "phone" && <InlineStack gap="200"><Select options={[{label:"+91",value:"+91"},{label:"+1",value:"+1"}]} value="+91" disabled /><Box width="100%"><TextField type="tel" placeholder={f.placeholder||"Phone"} name={`field-${f._id}`} autoComplete="off" disabled /></Box></InlineStack>}
//                                 {f.type === "textarea" && <TextField multiline={4} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                 {f.type === "select" && <Select name={`field-${f._id}`} options={[{label:"Select an option",value:""}, ...f.options.map(opt=>({label:opt.label,value:opt.value}))]} disabled />}
//                                 {f.type === "radio" && <BlockStack gap="200">{f.options.map((opt,i)=>(<InlineStack key={i} gap="200" align="start"><input type="radio" name={`field-${f._id}`} value={opt.value} id={`field-${f._id}-${i}`} disabled /><Text as="label" htmlFor={`field-${f._id}-${i}`} variant="bodyMd">{opt.label}</Text></InlineStack>))}</BlockStack>}
//                               </BlockStack>
//                             ))}
//                             <Button variant="primary" disabled fullWidth>{submitButtonIcon} {submitButtonText}</Button>
//                           </BlockStack>
//                         )}
//                       </BlockStack>
//                     </Box>
//                   </BlockStack>
//                 </Card>
//               </Box>
//             </Grid.Cell>
//           </Grid>
//         </BlockStack>

//         {/* Add/Edit Field Modal */}
//         <Modal
//           open={isModalOpen}
//           onClose={closeModal}
//           title={modalMode === "add" ? "Add New Field" : "Edit Field"}
//           primaryAction={{ content: "Save", onAction: handleModalSave }}
//           secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
//         >
//           <Modal.Section>
//             <FormLayout>
//               <TextField
//                 label="Field Label"
//                 placeholder="Enter field label"
//                 value={currentField.label}
//                 onChange={(value) => updateCurrentField("label", value)}
//                 autoComplete="off"
//                 helpText="The label that appears above this field"
//               />

//               <Select
//                 label="Field Type"
//                 options={[
//                   { label: "Text Input", value: "text" },
//                   { label: "Email Input", value: "email" },
//                   { label: "Number Input", value: "number" },
//                   { label: "Phone", value: "phone" },
//                   { label: "Textarea", value: "textarea" },
//                   { label: "Dropdown Select", value: "select" },
//                   { label: "Radio Group", value: "radio" },
//                 ]}
//                 value={currentField.type}
//                 onChange={(value) => updateCurrentField("type", value)}
//                 helpText="Select the type of input for this field"
//               />

//               {["text","email","number","phone","textarea"].includes(currentField.type) && (
//                 <TextField
//                   label="Placeholder Text"
//                   placeholder="Enter placeholder"
//                   value={currentField.placeholder}
//                   onChange={(value) => updateCurrentField("placeholder", value)}
//                   autoComplete="off"
//                   helpText="Hint text shown inside the field"
//                 />
//               )}

//               <Checkbox
//                 label="Required Field"
//                 checked={currentField.required}
//                 onChange={(checked) => updateCurrentField("required", checked)}
//                 helpText="Users must fill this field before submitting"
//               />

//               {["select","radio"].includes(currentField.type) && (
//                 <Box padding="400" background="bg-surface-secondary" borderRadius="200">
//                   <BlockStack gap="300">
//                     <Text variant="bodyMd" fontWeight="semibold">Options</Text>
//                     {currentField.options.length === 0 ? (
//                       <Text variant="bodySm" tone="subdued">No options added yet. Click "Add Option" below to add choices.</Text>
//                     ) : (
//                       <BlockStack gap="200">
//                         {currentField.options.map((opt, i) => (
//                           <Box key={i} padding="200" background="bg-surface" borderRadius="100">
//                             <BlockStack gap="200">
//                               <InlineStack align="space-between">
//                                 <Text variant="bodyMd" fontWeight="semibold">Option {i + 1}</Text>
//                                 <InlineStack gap="100">
//                                   <Button size="slim" onClick={() => editOption(i)}> <Icon
//   source={EditIcon}
//   tone="base"
// /></Button>
//                                   <Button size="slim" tone="critical" onClick={() => deleteOption(i)}><Icon
//   source={DeleteIcon}
//   tone="base"
// /></Button>
//                                 </InlineStack>
//                               </InlineStack>
//                               <InlineGrid columns={2} gap="200">
//                                 <TextField value={opt.label} readOnly autoComplete="off" label="Label (Display)" />
//                                 <TextField value={opt.value} readOnly autoComplete="off" label="Value (Saved)" />
//                               </InlineGrid>
//                             </BlockStack>
//                           </Box>
//                         ))}
//                       </BlockStack>
//                     )}
//                     <Button size="slim" onClick={addOption}>Add Option</Button>
//                   </BlockStack>
//                 </Box>
//               )}
//             </FormLayout>
//           </Modal.Section>
//         </Modal>
//       </Page>
//     </AppProvider>
//   );
// }





// import { useState, useEffect } from "react";
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
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import {
//     EditIcon, DeleteIcon
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
//     const [formName, setFormName] = useState("Contact");
//     const [formDescription, setFormDescription] = useState("");
//     const [submitButtonText, setSubmitButtonText] = useState("Submit");
//     const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
//     const [selectedFieldId, setSelectedFieldId] = useState(null);
//     const [saveMessage, setSaveMessage] = useState(null);
//     const [formSubmissionTitle, setFormSubmissionTitle] = useState("Form Submitted");
//     const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully!");
//     const { shop } = useLoaderData();
//     const [fields, setFields] = useState([]);

//     // Current field being edited/added
//     const [currentField, setCurrentField] = useState({
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: false,
//         options: [],
//     });

//     // Fetch existing fields
//     const fetchFields = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
//             if (response.ok) {
//                 const result = await response.json();
//                 setFields(result.data.formTemplates.fields || []);
//             }
//         } catch (error) {
//             console.error("Error fetching fields:", error);
//         }
//     };

//     useEffect(() => {
//         fetchFields();
//     }, [shop.id]);

//     // Open Add Field Modal
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

//     // Open Edit Field Modal - With proper error handling
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
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
//                 // API failed, use existing data from fields array
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
//             // Network error, use existing data from fields array
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

//     // Close Modal
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

//     // API: Add new field
//     const addFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 const result = await response.json();
//                 setSaveMessage({ type: "success", text: "✅ Field added successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields(); // Refresh fields
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

//     // API: Update field
//     const updateFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field updated successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields(); // Refresh fields
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

//     // API: Delete field
//     const deleteFieldAPI = async (fieldId) => {
//         if (!confirm("Are you sure you want to delete this field?")) return;

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
//                 { method: "DELETE" }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field deleted successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields(); // Refresh fields without reload
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ type: "error", text: `❌ Error deleting field: ${errText}` });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (err) {
//             console.error("Network error while deleting field:", err);
//             setSaveMessage({ type: "error", text: `❌ Network error: ${err.message}` });
//             setTimeout(() => setSaveMessage(null), 5000);
//         }
//     };

//     // Handle Save in Modal
//     const handleModalSave = () => {
//         if (!currentField.label.trim()) {
//             alert("Please enter a field label");
//             return;
//         }

//         if (modalMode === "add") {
//             addFieldAPI();
//         } else {
//             updateFieldAPI();
//         }
//     };

//     // Update current field state
//     const updateCurrentField = (key, value) => {
//         setCurrentField({ ...currentField, [key]: value });
//     };

//     // Add option to current field
//     const addOption = () => {
//         const label = prompt("Enter option label (display text):");
//         if (!label) return;
//         const value = prompt("Enter option value (saved value):", label.toLowerCase().replace(/\s+/g, "_"));
//         if (!value) return;

//         setCurrentField({
//             ...currentField,
//             options: [...currentField.options, { label, value }],
//         });
//     };

//     // Edit option
//     const editOption = (index) => {
//         const currentOption = currentField.options[index];
//         if (!currentOption) return;

//         const newLabel = prompt("Update option label:", currentOption.label);
//         if (!newLabel) return;
//         const newValue = prompt("Update option value:", currentOption.value);
//         if (!newValue) return;

//         const updatedOptions = currentField.options.map((opt, i) =>
//             i === index ? { label: newLabel, value: newValue } : opt
//         );
//         setCurrentField({ ...currentField, options: updatedOptions });
//     };

//     // Delete option
//     const deleteOption = (index) => {
//         const updatedOptions = currentField.options.filter((_, i) => i !== index);
//         setCurrentField({ ...currentField, options: updatedOptions });
//     };

//     // Save entire form config
//     async function saveFormConfig() {
//         setIsSaving(true);
//         const payload = {
//             storeName: shop.myshopifyDomain,
//             formData: {
//                 name: formName,
//                 description: formDescription,
//                 formSubmissionTitle,
//                 successDescription,
//                 meta: { createdBy: "AdminUser", published: false },
//             },
//         };

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
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

//     // Get field icon
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
//             <Page title="Form Builder">
//                 <BlockStack gap="500">
//                     <Grid>
//                         {/* Left Column */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
//                             <BlockStack gap="400">
//                                 {/* Form Settings */}
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <Text variant="headingMd" as="h2">Form</Text>
//                                         <TextField label="Title" value={formName} onChange={setFormName} autoComplete="off" maxLength={120} showCharacterCount />
//                                         <TextField label="Content" value={formDescription} onChange={setFormDescription} multiline={3} autoComplete="off" maxLength={120} showCharacterCount />
//                                         <TextField label="Form Submission Title" value={formSubmissionTitle} onChange={setFormSubmissionTitle} autoComplete="off" />
//                                         <TextField label="Success Description" value={successDescription} onChange={setSuccessDescription} multiline={3} autoComplete="off" />
//                                     </BlockStack>
//                                     <div style={{ marginTop: "10px" }}>
//                                         <Button variant="primary" tone={isSaving ? "subdued" : "success"} onClick={saveFormConfig} disabled={isSaving} loading={isSaving}>Save Form</Button>
//                                     </div>
//                                 </Card>


//                                 {/* Fields Section */}
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <InlineStack align="space-between" blockAlign="center">
//                                             <Text variant="headingMd" as="h2">Fields</Text>
//                                             <Button variant="primary" size="slim" onClick={openAddModal}>Add Form Field</Button>
//                                         </InlineStack>

//                                         <BlockStack gap="200">
//                                             {fields.length === 0 ? (
//                                                 <Banner tone="info">No fields added yet. Click "Add Form Field" to start building your form.</Banner>
//                                             ) : (
//                                                 <BlockStack gap="200">
//                                                     {fields.map((field) => (
//                                                         <Box key={field._id} padding="300" background="bg-surface" borderRadius="200">
//                                                             <InlineStack gap="300" align="space-between" blockAlign="center">
//                                                                 <InlineStack gap="300" blockAlign="center">
//                                                                     <Text variant="bodyMd" tone="subdued" fontWeight="medium">{getFieldIcon(field.type)}</Text>
//                                                                     <Text variant="bodyMd" fontWeight="medium">{field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                                                 </InlineStack>
//                                                                 <InlineStack gap="200">
//                                                                     <Button plain onClick={() => openEditModal(field._id)}> <Icon
//                                                                         source={EditIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                     <Button plain tone="critical" onClick={() => deleteFieldAPI(field._id)}> <Icon
//                                                                         source={DeleteIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                         </Box>
//                                                     ))}
//                                                 </BlockStack>
//                                             )}
//                                         </BlockStack>
//                                     </BlockStack>
//                                 </Card>

//                                 {/* Save Message */}
//                                 {saveMessage && <Banner title={saveMessage.title} tone={saveMessage.type === "success" ? "success" : "critical"}>{saveMessage.text}</Banner>}

//                                 {/* Save Button */}
//                             </BlockStack>
//                         </Grid.Cell>

//                         {/* Right Column - Preview */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
//                             <Box position="sticky" top="16px">
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <Box padding="500" background="bg-surface" borderRadius="300">
//                                             <BlockStack gap="400">
//                                                 <Text variant="headingLg" as="h1">{formName || "Form Title"}</Text>
//                                                 {formDescription && <Text as="p" tone="subdued">{formDescription}</Text>}

//                                                 {fields.length === 0 ? (
//                                                     <Box padding="800"><Text variant="bodyMd" tone="subdued" alignment="center">No fields added yet. Click "Add Form Field" to start building your form.</Text></Box>
//                                                 ) : (
//                                                     <BlockStack gap="400">
//                                                         {fields.map((f) => (
//                                                             <BlockStack key={f._id} gap="200">
//                                                                 <Text as="label" variant="bodyMd" fontWeight="semibold">{f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                                                 {["text", "email", "number"].includes(f.type) && <TextField type={f.type} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                                                 {f.type === "textarea" && <TextField multiline={4} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                                                 {f.type === "dropdown" && <Select name={`field-${f._id}`} options={[{ label: "Select an option", value: "" }, ...f.options.map(opt => ({ label: opt.label, value: opt.value }))]} disabled />}
//                                                                 {f.type === "radio" && <BlockStack gap="200">{f.options.map((opt, i) => (<InlineStack key={i} gap="200" align="start"><input type="radio" name={`field-${f._id}`} value={opt.value} id={`field-${f._id}-${i}`} disabled /><Text as="label" htmlFor={`field-${f._id}-${i}`} variant="bodyMd">{opt.label}</Text></InlineStack>))}</BlockStack>}
//                                                                 {f.type === "checkbox" && <BlockStack gap="200">{f.options.map((opt, i) => (<Checkbox key={i} label={opt.label} checked={false} disabled />))}</BlockStack>}
//                                                             </BlockStack>
//                                                         ))}
//                                                         <Button variant="primary" disabled fullWidth>{submitButtonIcon} {submitButtonText}</Button>
//                                                     </BlockStack>
//                                                 )}
//                                             </BlockStack>
//                                         </Box>
//                                     </BlockStack>
//                                 </Card>
//                             </Box>
//                         </Grid.Cell>
//                     </Grid>
//                 </BlockStack>

//                 {/* Add/Edit Field Modal */}
//                 <Modal
//                     open={isModalOpen}
//                     onClose={closeModal}
//                     title={modalMode === "add" ? "Add New Field" : "Edit Field"}
//                     primaryAction={{ content: "Save", onAction: handleModalSave }}
//                     secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
//                 >
//                     <Modal.Section>
//                         <FormLayout>
//                             <TextField
//                                 label="Field Label"
//                                 placeholder="Enter field label"
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
//                                     //   { label: "Phone", value: "phone" },
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
//                                     placeholder="Enter placeholder"
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
//                                 helpText="Users must fill this field before submitting"
//                             />

//                             {["dropdown", "radio", "checkbox"].includes(currentField.type) && (
//                                 <Box padding="400" background="bg-surface-secondary" borderRadius="200">
//                                     <BlockStack gap="300">
//                                         <Text variant="bodyMd" fontWeight="semibold">Options</Text>
//                                         {currentField.options.length === 0 ? (
//                                             <Text variant="bodySm" tone="subdued">No options added yet. Click "Add Option" below to add choices.</Text>
//                                         ) : (
//                                             <BlockStack gap="200">
//                                                 {currentField.options.map((opt, i) => (
//                                                     <Box key={i} padding="200" background="bg-surface" borderRadius="100">
//                                                         <BlockStack gap="200">
//                                                             <InlineStack align="space-between">
//                                                                 <Text variant="bodyMd" fontWeight="semibold">Option {i + 1}</Text>
//                                                                 <InlineStack gap="100">
//                                                                     <Button size="slim" onClick={() => editOption(i)}> <Icon
//                                                                         source={EditIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                     <Button size="slim" tone="critical" onClick={() => deleteOption(i)}><Icon
//                                                                         source={DeleteIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                             <InlineGrid columns={2} gap="200">
//                                                                 <TextField value={opt.label} readOnly autoComplete="off" label="Label (Display)" />
//                                                                 <TextField value={opt.value} readOnly autoComplete="off" label="Value (Saved)" />
//                                                             </InlineGrid>
//                                                         </BlockStack>
//                                                     </Box>
//                                                 ))}
//                                             </BlockStack>
//                                         )}
//                                         <Button size="slim" onClick={addOption}>Add Option</Button>
//                                     </BlockStack>
//                                 </Box>
//                             )}
//                         </FormLayout>
//                     </Modal.Section>
//                 </Modal>
//             </Page>
//         </AppProvider>
//     );
// } 





// import { useState, useEffect } from "react";
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
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import {
//     EditIcon, DeleteIcon
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
//     const [formName, setFormName] = useState("Contact");
//     const [formDescription, setFormDescription] = useState("");
//     const [submitButtonText, setSubmitButtonText] = useState("Submit");
//     const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
//     const [selectedFieldId, setSelectedFieldId] = useState(null);
//     const [saveMessage, setSaveMessage] = useState(null);
//     const [formSubmissionTitle, setFormSubmissionTitle] = useState("");
//     const [successDescription, setSuccessDescription] = useState("");
//     const { shop } = useLoaderData();
//     const [fields, setFields] = useState([]);
    
//     // Validation popup state
//     const [validationPopup, setValidationPopup] = useState({
//         isOpen: false,
//         message: ""
//     });

//     // Confirmation popup state
//     const [confirmationPopup, setConfirmationPopup] = useState({
//         isOpen: false,
//         title: "",
//         message: "",
//         onConfirm: null
//     });

//     // Current field being edited/added
//     const [currentField, setCurrentField] = useState({
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: false,
//         options: [],
//     });

//     // Fetch existing fields
//     const fetchFields = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
//             if (response.ok) {
//                 const result = await response.json();
//                 setFields(result.data.formTemplates.fields || []);
//             }
//         } catch (error) {
//             console.error("Error fetching fields:", error);
//         }
//     };

//     useEffect(() => {
//         fetchFields();
//     }, [shop.id]);

//     // Show validation popup
//     const showValidationPopup = (message) => {
//         setValidationPopup({
//             isOpen: true,
//             message: message
//         });
//     };

//     // Close validation popup
//     const closeValidationPopup = () => {
//         setValidationPopup({
//             isOpen: false,
//             message: ""
//         });
//     };

//     // Show confirmation popup
//     const showConfirmationPopup = (title, message, onConfirm) => {
//         setConfirmationPopup({
//             isOpen: true,
//             title: title,
//             message: message,
//             onConfirm: onConfirm
//         });
//     };

//     // Close confirmation popup
//     const closeConfirmationPopup = () => {
//         setConfirmationPopup({
//             isOpen: false,
//             title: "",
//             message: "",
//             onConfirm: null
//         });
//     };

//     // Handle confirmation action
//     const handleConfirmAction = () => {
//         if (confirmationPopup.onConfirm) {
//             confirmationPopup.onConfirm();
//         }
//         closeConfirmationPopup();
//     };

//     // Open Add Field Modal
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

//     // Open Edit Field Modal - With proper error handling
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
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
//                 // API failed, use existing data from fields array
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
//             // Network error, use existing data from fields array
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

//     // Close Modal
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

//     // API: Add new field
//     const addFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 const result = await response.json();
//                 setSaveMessage({ type: "success", text: "✅ Field added successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields(); // Refresh fields
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

//     // API: Update field
//     const updateFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldData: currentField }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field updated successfully!" });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 await fetchFields(); // Refresh fields
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

//     // API: Delete field
//     const deleteFieldAPI = async (fieldId) => {
//         showConfirmationPopup(
//             "Delete Field",
//             "Are you sure you want to delete this field? This action cannot be undone.",
//             async () => {
//                 try {
//                     const shopIdOnly = shop.id.split("/").pop();
//                     const response = await fetch(
//                         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
//                         { method: "DELETE" }
//                     );

//                     if (response.ok) {
//                         setSaveMessage({ type: "success", text: "✅ Field deleted successfully!" });
//                         setTimeout(() => setSaveMessage(null), 5000);
//                         await fetchFields(); // Refresh fields without reload
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

//     // Validate field data before saving
//     const validateFieldData = () => {
//         if (!currentField.label.trim()) {
//             showValidationPopup("Please enter a field label");
//             return false;
//         }

//         // Check if email field is required
//         if (currentField.type === "email" && !currentField.required) {
//             showValidationPopup("Email field must be marked as required");
//             return false;
//         }

//         // Validate dropdown, radio, and checkbox options
//         if (["dropdown", "radio", "checkbox"].includes(currentField.type)) {
//             if (currentField.options.length === 0) {
//                 showValidationPopup(`Please add at least one option for ${currentField.type} field`);
//                 return false;
//             }
//         }

//         return true;
//     };

//     // Handle Save in Modal
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

//     // Update current field state
//     const updateCurrentField = (key, value) => {
//         // If type is changed to email, automatically set required to true
//         if (key === "type" && value === "email") {
//             setCurrentField({ ...currentField, [key]: value, required: true });
//         } else {
//             setCurrentField({ ...currentField, [key]: value });
//         }
//     };

//     // Add option to current field
//     const [optionInputPopup, setOptionInputPopup] = useState({
//         isOpen: false,
//         mode: "add", // "add" or "edit"
//         editIndex: null,
//         label: "",
//         value: ""
//     });

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

//     // Edit option
//     const editOption = (index) => {
//         openEditOptionPopup(index);
//     };

//     // Delete option
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

//     // Save entire form config
//     async function saveFormConfig() {
//         setIsSaving(true);
//         const payload = {
//             storeName: shop.myshopifyDomain,
//             formData: {
//                 name: formName,
//                 description: formDescription,
//                 formSubmissionTitle,
//                 successDescription,
//                 meta: { createdBy: "AdminUser", published: false },
//             },
//         };

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
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

//     // Get field icon
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
//             <Page title="Form Builder">
//                 <BlockStack gap="500">
//                     <Grid>
//                         {/* Left Column */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 7, lg: 7, xl: 7 }}>
//                             <BlockStack gap="400">
//                                 {/* Form Settings */}
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <Text variant="headingMd" as="h2">Form</Text>
//                                         <TextField label="Title" value={formName} onChange={setFormName} autoComplete="off" maxLength={120} showCharacterCount />
//                                         <TextField label="Content" value={formDescription} onChange={setFormDescription} multiline={3} autoComplete="off" maxLength={120} showCharacterCount />
//                                         <TextField label="Form Submission Title" value={formSubmissionTitle} onChange={setFormSubmissionTitle} autoComplete="off" />
//                                         <TextField label="Success Description" value={successDescription} onChange={setSuccessDescription} multiline={3} autoComplete="off" />
//                                     </BlockStack>
//                                     <div style={{ marginTop: "10px" }}>
//                                         <Button variant="primary" tone={isSaving ? "subdued" : "success"} onClick={saveFormConfig} disabled={isSaving} loading={isSaving}>Save Form</Button>
//                                     </div>
//                                 </Card>


//                                 {/* Fields Section */}
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <InlineStack align="space-between" blockAlign="center">
//                                             <Text variant="headingMd" as="h2">Fields</Text>
//                                             <Button variant="primary" size="slim" onClick={openAddModal}>Add Form Field</Button>
//                                         </InlineStack>

//                                         <BlockStack gap="200">
//                                             {fields.length === 0 ? (
//                                                 <Banner tone="info">No fields added yet. Click "Add Form Field" to start building your form.</Banner>
//                                             ) : (
//                                                 <BlockStack gap="200">
//                                                     {fields.map((field) => (
//                                                         <Box key={field._id} padding="300" background="bg-surface" borderRadius="200">
//                                                             <InlineStack gap="300" align="space-between" blockAlign="center">
//                                                                 <InlineStack gap="300" blockAlign="center">
//                                                                     <Text variant="bodyMd" tone="subdued" fontWeight="medium">{getFieldIcon(field.type)}</Text>
//                                                                     <Text variant="bodyMd" fontWeight="medium">{field.label || "Untitled Field"} {field.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                                                 </InlineStack>
//                                                                 <InlineStack gap="200">
//                                                                     <Button plain onClick={() => openEditModal(field._id)}> <Icon
//                                                                         source={EditIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                     <Button plain tone="critical" onClick={() => deleteFieldAPI(field._id)}> <Icon
//                                                                         source={DeleteIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                         </Box>
//                                                     ))}
//                                                 </BlockStack>
//                                             )}
//                                         </BlockStack>
//                                     </BlockStack>
//                                 </Card>

//                                 {/* Save Message */}
//                                 {saveMessage && <Banner title={saveMessage.title} tone={saveMessage.type === "success" ? "success" : "critical"}>{saveMessage.text}</Banner>}

//                                 {/* Save Button */}
//                             </BlockStack>
//                         </Grid.Cell>

//                         {/* Right Column - Preview */}
//                         <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 5, lg: 5, xl: 5 }}>
//                             <Box position="sticky" top="16px">
//                                 <Card>
//                                     <BlockStack gap="400">
//                                         <Box padding="500" background="bg-surface" borderRadius="300">
//                                             <BlockStack gap="400">
//                                                 <Text variant="headingLg" as="h1">{formName || "Form Title"}</Text>
//                                                 {formDescription && <Text as="p" tone="subdued">{formDescription}</Text>}

//                                                 {fields.length === 0 ? (
//                                                     <Box padding="800"><Text variant="bodyMd" tone="subdued" alignment="center">No fields added yet. Click "Add Form Field" to start building your form.</Text></Box>
//                                                 ) : (
//                                                     <BlockStack gap="400">
//                                                         {fields.map((f) => (
//                                                             <BlockStack key={f._id} gap="200">
//                                                                 <Text as="label" variant="bodyMd" fontWeight="semibold">{f.label || "Untitled Field"} {f.required && <Text as="span" tone="critical">*</Text>}</Text>
//                                                                 {["text", "email", "number"].includes(f.type) && <TextField type={f.type} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                                                 {f.type === "textarea" && <TextField multiline={4} placeholder={f.placeholder} name={`field-${f._id}`} autoComplete="off" disabled />}
//                                                                 {f.type === "dropdown" && <Select name={`field-${f._id}`} options={[{ label: "Select an option", value: "" }, ...f.options.map(opt => ({ label: opt.label, value: opt.value }))]} disabled />}
//                                                                 {f.type === "radio" && <BlockStack gap="200">{f.options.map((opt, i) => (<InlineStack key={i} gap="200" align="start"><input type="radio" name={`field-${f._id}`} value={opt.value} id={`field-${f._id}-${i}`} disabled /><Text as="label" htmlFor={`field-${f._id}-${i}`} variant="bodyMd">{opt.label}</Text></InlineStack>))}</BlockStack>}
//                                                                 {f.type === "checkbox" && <BlockStack gap="200">{f.options.map((opt, i) => (<Checkbox key={i} label={opt.label} checked={false} disabled />))}</BlockStack>}
//                                                             </BlockStack>
//                                                         ))}
//                                                         <Button variant="primary" disabled fullWidth>{submitButtonIcon} {submitButtonText}</Button>
//                                                     </BlockStack>
//                                                 )}
//                                             </BlockStack>
//                                         </Box>
//                                     </BlockStack>
//                                 </Card>
//                             </Box>
//                         </Grid.Cell>
//                     </Grid>
//                 </BlockStack>

//                 {/* Add/Edit Field Modal */}
//                 <Modal
//                     open={isModalOpen}
//                     onClose={closeModal}
//                     title={modalMode === "add" ? "Add New Field" : "Edit Field"}
//                     primaryAction={{ content: "Save", onAction: handleModalSave }}
//                     secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
//                 >
//                     <Modal.Section>
//                         <FormLayout>
//                             <TextField
//                                 label="Field Label"
//                                 placeholder="Enter field label"
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
//                                     placeholder="Enter placeholder"
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
//                                 helpText={currentField.type === "email" ? "Email fields are always required" : "Users must fill this field before submitting"}
//                                 disabled={currentField.type === "email"}
//                             />

//                             {["dropdown", "radio", "checkbox"].includes(currentField.type) && (
//                                 <Box padding="400" background="bg-surface-secondary" borderRadius="200">
//                                     <BlockStack gap="300">
//                                         <Text variant="bodyMd" fontWeight="semibold">Options</Text>
//                                         {currentField.options.length === 0 ? (
//                                             <Text variant="bodySm" tone="subdued">No options added yet. Click "Add Option" below to add choices.</Text>
//                                         ) : (
//                                             <BlockStack gap="200">
//                                                 {currentField.options.map((opt, i) => (
//                                                     <Box key={i} padding="200" background="bg-surface" borderRadius="100">
//                                                         <BlockStack gap="200">
//                                                             <InlineStack align="space-between">
//                                                                 <Text variant="bodyMd" fontWeight="semibold">Option {i + 1}</Text>
//                                                                 <InlineStack gap="100">
//                                                                     <Button size="slim" onClick={() => editOption(i)}> <Icon
//                                                                         source={EditIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                     <Button size="slim" tone="critical" onClick={() => deleteOption(i)}><Icon
//                                                                         source={DeleteIcon}
//                                                                         tone="base"
//                                                                     /></Button>
//                                                                 </InlineStack>
//                                                             </InlineStack>
//                                                             <InlineGrid columns={2} gap="200">
//                                                                 <TextField value={opt.label} readOnly autoComplete="off" label="Label (Display)" />
//                                                                 <TextField value={opt.value} readOnly autoComplete="off" label="Value (Saved)" />
//                                                             </InlineGrid>
//                                                         </BlockStack>
//                                                     </Box>
//                                                 ))}
//                                             </BlockStack>
//                                         )}
//                                         <Button size="slim" onClick={addOption}>Add Option</Button>
//                                     </BlockStack>
//                                 </Box>
//                             )}
//                         </FormLayout>
//                     </Modal.Section>
//                 </Modal>

//                 {/* Validation Popup Modal */}
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

//                 {/* Confirmation Popup Modal */}
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

//                 {/* Option Input Popup Modal */}
//                 <Modal
//                     open={optionInputPopup.isOpen}
//                     onClose={closeOptionInputPopup}
//                     title={optionInputPopup.mode === "add" ? "Add Option" : "Edit Option"}
//                     primaryAction={{
//                         content: "Save",
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
//                                 onChange={(value) => setOptionInputPopup({...optionInputPopup, label: value})}
//                                 autoComplete="off"
//                                 helpText="This is what users will see"
//                             />
//                             <TextField
//                                 label="Option Value (Saved Value)"
//                                 placeholder="e.g., small, medium, large"
//                                 value={optionInputPopup.value}
//                                 onChange={(value) => setOptionInputPopup({...optionInputPopup, value: value})}
//                                 autoComplete="off"
//                                 helpText="This is the value that will be saved in the database"
//                             />
//                         </FormLayout>
//                     </Modal.Section>
//                 </Modal>
//             </Page>
//         </AppProvider>
//     );
// }




// import { useState, useEffect } from "react";
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
//     const [formName, setFormName] = useState("Contact Form");
//     const [formDescription, setFormDescription] = useState("Please fill out the form below and we'll get back to you soon.");
//     const [submitButtonText, setSubmitButtonText] = useState("Submit");
//     const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
//     const [selectedFieldId, setSelectedFieldId] = useState(null);
//     const [saveMessage, setSaveMessage] = useState(null);
//     const [formSubmissionTitle, setFormSubmissionTitle] = useState("Thank You!");
//     const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully. We'll be in touch soon!");
//     const { shop } = useLoaderData();
//     const [fields, setFields] = useState([]);
    
//     // Validation popup state
//     const [validationPopup, setValidationPopup] = useState({
//         isOpen: false,
//         message: ""
//     });

//     // Confirmation popup state
//     const [confirmationPopup, setConfirmationPopup] = useState({
//         isOpen: false,
//         title: "",
//         message: "",
//         onConfirm: null
//     });

//     // Current field being edited/added
//     const [currentField, setCurrentField] = useState({
//         label: "",
//         type: "text",
//         placeholder: "",
//         required: false,
//         options: [],
//     });

//     // Option input popup state
//     const [optionInputPopup, setOptionInputPopup] = useState({
//         isOpen: false,
//         mode: "add",
//         editIndex: null,
//         label: "",
//         value: ""
//     });

//     // Form submission state
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formData, setFormData] = useState({});

//     // Fetch existing fields
//     const fetchFields = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
//             if (response.ok) {
//                 const result = await response.json();
//                 setFields(result.data.formTemplates.fields || []);
//             }
//         } catch (error) {
//             console.error("Error fetching fields:", error);
//         }
//     };

//     useEffect(() => {
//         fetchFields();
//     }, [shop.id]);

//     // Show validation popup
//     const showValidationPopup = (message) => {
//         setValidationPopup({
//             isOpen: true,
//             message: message
//         });
//     };

//     // Close validation popup
//     const closeValidationPopup = () => {
//         setValidationPopup({
//             isOpen: false,
//             message: ""
//         });
//     };

//     // Show confirmation popup
//     const showConfirmationPopup = (title, message, onConfirm) => {
//         setConfirmationPopup({
//             isOpen: true,
//             title: title,
//             message: message,
//             onConfirm: onConfirm
//         });
//     };

//     // Close confirmation popup
//     const closeConfirmationPopup = () => {
//         setConfirmationPopup({
//             isOpen: false,
//             title: "",
//             message: "",
//             onConfirm: null
//         });
//     };

//     // Handle confirmation action
//     const handleConfirmAction = () => {
//         if (confirmationPopup.onConfirm) {
//             confirmationPopup.onConfirm();
//         }
//         closeConfirmationPopup();
//     };

//     // Open Add Field Modal
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

//     // Open Edit Field Modal
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
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

//     // Close Modal
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

//     // API: Add new field
//     const addFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
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

//     // API: Update field
//     const updateFieldAPI = async () => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
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

//     // API: Delete field
//     const deleteFieldAPI = async (fieldId) => {
//         showConfirmationPopup(
//             "Delete Field",
//             "Are you sure you want to delete this field? This action cannot be undone.",
//             async () => {
//                 try {
//                     const shopIdOnly = shop.id.split("/").pop();
//                     const response = await fetch(
//                         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
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

//     // Validate field data before saving
//     const validateFieldData = () => {
//         if (!currentField.label.trim()) {
//             showValidationPopup("Please enter a field label");
//             return false;
//         }

//         // Check if email field is required
//         if (currentField.type === "email" && !currentField.required) {
//             showValidationPopup("Email field must be marked as required");
//             return false;
//         }

//         // Validate dropdown, radio, and checkbox options
//         if (["dropdown", "radio", "checkbox"].includes(currentField.type)) {
//             if (currentField.options.length === 0) {
//                 showValidationPopup(`Please add at least one option for ${currentField.type} field`);
//                 return false;
//             }
//         }

//         return true;
//     };

//     // Handle Save in Modal
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

//     // Update current field state
//     const updateCurrentField = (key, value) => {
//         if (key === "type" && value === "email") {
//             setCurrentField({ ...currentField, [key]: value, required: true });
//         } else {
//             setCurrentField({ ...currentField, [key]: value });
//         }
//     };

//     // Option popup handlers
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

//     // Validate form before saving
//     const validateForm = () => {
//         const hasEmailField = fields.some(field => field.type === "email");
        
//         if (!hasEmailField) {
//             showValidationPopup("Form must contain at least one Email field before saving.");
//             return false;
//         }

//         return true;
//     };

//     // Save entire form config
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
//                 successDescription,
//                 meta: { createdBy: "AdminUser", published: false },
//             },
//         };

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
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

//     // Move field up
//     const moveFieldUp = async (index) => {
//         if (index === 0) return;
        
//         const newFields = [...fields];
//         [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
//         setFields(newFields);
        
//         await updateFieldOrder(newFields);
//     };

//     // Move field down
//     const moveFieldDown = async (index) => {
//         if (index === fields.length - 1) return;
        
//         const newFields = [...fields];
//         [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
//         setFields(newFields);
        
//         await updateFieldOrder(newFields);
//     };

//     // Update field order in backend
//     const updateFieldOrder = async (orderedFields) => {
//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const fieldIds = orderedFields.map(f => f._id);
            
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/fields/reorder`,
//                 {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ fieldIds }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ type: "success", text: "✅ Field order updated!" });
//                 setTimeout(() => setSaveMessage(null), 3000);
//             }
//         } catch (err) {
//             console.error("Error updating field order:", err);
//         }
//     };

//     // Handle form field change in preview
//     const handleFieldChange = (fieldId, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [fieldId]: value
//         }));
//     };

//     // Handle checkbox group change
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

//     // Submit form (preview form submission)
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         // Validate only required fields
//         const missingRequiredFields = fields.filter(field => {
//             if (!field.required) return false;
//             const value = formData[field._id];
//             return !value || (Array.isArray(value) && value.length === 0) || value.trim() === "";
//         });

//         if (missingRequiredFields.length > 0) {
//             const fieldNames = missingRequiredFields.map(f => f.label).join(", ");
//             showValidationPopup(`Please fill in the following required fields: ${fieldNames}`);
//             setIsSubmitting(false);
//             return;
//         }

//         // Get email field value
//         const emailField = fields.find(f => f.type === "email");
//         const emailValue = emailField ? formData[emailField._id] : null;

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/submit`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         formData: formData,
//                         email: emailValue,
//                         formName: formName,
//                         shopDomain: shop.myshopifyDomain
//                     }),
//                 }
//             );

//             if (response.ok) {
//                 // Show success message
//                 setSaveMessage({ 
//                     type: "success", 
//                     title: formSubmissionTitle, 
//                     text: successDescription 
//                 });
//                 setTimeout(() => setSaveMessage(null), 5000);
                
//                 // Reset form data
//                 setFormData({});
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ 
//                     type: "error", 
//                     text: `❌ Error submitting form: ${errText}` 
//                 });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (error) {
//             setSaveMessage({ 
//                 type: "error", 
//                 text: `❌ Network error: ${error.message}` 
//             });
//             setTimeout(() => setSaveMessage(null), 5000);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Get field icon
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
//                                             <InlineGrid columns={2} gap="400">
//                                                 <TextField 
//                                                     label="Success Message Title" 
//                                                     value={formSubmissionTitle} 
//                                                     onChange={setFormSubmissionTitle} 
//                                                     autoComplete="off" 
//                                                     helpText="Title shown after successful submission"
//                                                 />
//                                                 <TextField 
//                                                     label="Submit Button Text" 
//                                                     value={submitButtonText} 
//                                                     onChange={setSubmitButtonText} 
//                                                     autoComplete="off"
//                                                     helpText="Text displayed on the submit button"
//                                                 />
//                                             </InlineGrid>
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
//                                                     Add and organize fields for your form. Drag to reorder.
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
//                                                             borderColor="border-secondary"
//                                                         >
//                                                             <InlineStack gap="400" align="space-between" blockAlign="center" wrap={false}>
//                                                                 {/* Field Info */}
//                                                                 <InlineStack gap="400" blockAlign="center" wrap={false}>
//                                                                     <Box>
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

//                                                                 {/* Action Buttons */}
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
//                                                     💡 Tip: Use the arrow buttons to reorder fields. Only fields marked as "Required" must be filled before submission.
//                                                 </Text>
//                                             </Banner>
//                                         )}
//                                     </BlockStack>
//                                 </Card>

//                                 {/* Save Message */}
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

//                                                                     {/* Text, Email, Number fields */}
//                                                                     {["text", "email", "number"].includes(f.type) && (
//                                                                         <TextField 
//                                                                             type={f.type} 
//                                                                             placeholder={f.placeholder}
//                                                                             value={formData[f._id] || ""}
//                                                                             onChange={(value) => handleFieldChange(f._id, value)}
//                                                                             autoComplete="off"
//                                                                         />
//                                                                     )}

//                                                                     {/* Textarea */}
//                                                                     {f.type === "textarea" && (
//                                                                         <TextField 
//                                                                             multiline={4} 
//                                                                             placeholder={f.placeholder}
//                                                                             value={formData[f._id] || ""}
//                                                                             onChange={(value) => handleFieldChange(f._id, value)}
//                                                                             autoComplete="off"
//                                                                         />
//                                                                     )}

//                                                                     {/* Dropdown */}
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

//                                                                     {/* Radio Group */}
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

//                                                                     {/* Checkbox Group */}
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

//                                                             <Box paddingBlockStart="300">
//                                                                 <Button 
//                                                                     variant="primary" 
//                                                                     submit
//                                                                     size="large"
//                                                                     fullWidth
//                                                                     loading={isSubmitting}
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

//                 {/* Add/Edit Field Modal */}
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

//                 {/* Validation Popup Modal */}
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

//                 {/* Confirmation Popup Modal */}
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

//                 {/* Option Input Popup Modal */}
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
//     const [formName, setFormName] = useState("Contact Form");
//     const [formDescription, setFormDescription] = useState("Please fill out the form below and we'll get back to you soon.");
//     const [submitButtonText, setSubmitButtonText] = useState("Submit");
//     const [submitButtonIcon, setSubmitButtonIcon] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState("add");
//     const [selectedFieldId, setSelectedFieldId] = useState(null);
//     const [saveMessage, setSaveMessage] = useState(null);
//     const [formSubmissionTitle, setFormSubmissionTitle] = useState("Thank You!");
//     const [successDescription, setSuccessDescription] = useState("Your form has been submitted successfully. We'll be in touch soon!");
//     const { shop } = useLoaderData();
//     const [fields, setFields] = useState([]);
    
//     // ✅ NEW: Debounce timer reference
//     const reorderTimeoutRef = useRef(null);
    
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
//             const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
//             if (response.ok) {
//                 const result = await response.json();
//                 setFields(result.data.formTemplates.fields || []);
//             }
//         } catch (error) {
//             console.error("Error fetching fields:", error);
//         }
//     };

//     useEffect(() => {
//         fetchFields();
//     }, [shop.id]);

//     // ✅ Cleanup timeout on unmount
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
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
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
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
//                         `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
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
//                 successDescription,
//                 meta: { createdBy: "AdminUser", published: false },
//             },
//         };

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
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

//     // ✅ NEW: Debounced field order update
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
//                     `http://localhost:5000/api/merchant/${shopIdOnly}/form/fields/reorder`,
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

//     // ✅ UPDATED: Move field up
//     const moveFieldUp = (index) => {
//         if (index === 0) return;
        
//         const newFields = [...fields];
//         [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
//         setFields(newFields);
        
//         // Call debounced update
//         updateFieldOrderDebounced(newFields);
//     };

//     // ✅ UPDATED: Move field down
//     const moveFieldDown = (index) => {
//         if (index === fields.length - 1) return;
        
//         const newFields = [...fields];
//         [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
//         setFields(newFields);
        
//         // Call debounced update
//         updateFieldOrderDebounced(newFields);
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
//         setIsSubmitting(true);

//         const missingRequiredFields = fields.filter(field => {
//             if (!field.required) return false;
//             const value = formData[field._id];
//             return !value || (Array.isArray(value) && value.length === 0) || value.trim() === "";
//         });

//         if (missingRequiredFields.length > 0) {
//             const fieldNames = missingRequiredFields.map(f => f.label).join(", ");
//             showValidationPopup(`Please fill in the following required fields: ${fieldNames}`);
//             setIsSubmitting(false);
//             return;
//         }

//         const emailField = fields.find(f => f.type === "email");
//         const emailValue = emailField ? formData[emailField._id] : null;

//         try {
//             const shopIdOnly = shop.id.split("/").pop();
//             const response = await fetch(
//                 `http://localhost:5000/api/merchant/${shopIdOnly}/form/submit`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         formData: formData,
//                         email: emailValue,
//                         formName: formName,
//                         shopDomain: shop.myshopifyDomain
//                     }),
//                 }
//             );

//             if (response.ok) {
//                 setSaveMessage({ 
//                     type: "success", 
//                     title: formSubmissionTitle, 
//                     text: successDescription 
//                 });
//                 setTimeout(() => setSaveMessage(null), 5000);
//                 setFormData({});
//             } else {
//                 const errText = await response.text();
//                 setSaveMessage({ 
//                     type: "error", 
//                     text: `❌ Error submitting form: ${errText}` 
//                 });
//                 setTimeout(() => setSaveMessage(null), 5000);
//             }
//         } catch (error) {
//             setSaveMessage({ 
//                 type: "error", 
//                 text: `❌ Network error: ${error.message}` 
//             });
//             setTimeout(() => setSaveMessage(null), 5000);
//         } finally {
//             setIsSubmitting(false);
//         }
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
//                                             <InlineGrid columns={2} gap="400">
//                                                 <TextField 
//                                                     label="Success Message Title" 
//                                                     value={formSubmissionTitle} 
//                                                     onChange={setFormSubmissionTitle} 
//                                                     autoComplete="off" 
//                                                     helpText="Title shown after successful submission"
//                                                 />
//                                                 <TextField 
//                                                     label="Submit Button Text" 
//                                                     value={submitButtonText} 
//                                                     onChange={setSubmitButtonText} 
//                                                     autoComplete="off"
//                                                     helpText="Text displayed on the submit button"
//                                                 />
//                                             </InlineGrid>
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
//                                                     Add and organize fields for your form. Use arrows to reorder.
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
//                                                             borderColor="border-secondary"
//                                                         >
//                                                             <InlineStack gap="400" align="space-between" blockAlign="center" wrap={false}>
//                                                                 <InlineStack gap="400" blockAlign="center" wrap={false}>
//                                                                     <Box>
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
//                                                     💡 Tip: Use the arrow buttons to reorder fields. Only fields marked as "Required" must be filled before submission.
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

//                                                             <Box paddingBlockStart="300">
//                                                                 <Button 
//                                                                     variant="primary" 
//                                                                     submit
//                                                                     size="large"
//                                                                     fullWidth
//                                                                     loading={isSubmitting}
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

//                 {/* All Modals - કોઈ ફેરફાર નથી */}
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
    const [formName, setFormName] = useState("Contact Form");
    const [formDescription, setFormDescription] = useState("Please fill out the form below and we'll get back to you soon.");
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
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(`http://localhost:5000/api/users/${shopIdOnly}`);
            if (response.ok) {
                const result = await response.json();
                setFields(result.data.formTemplates.fields || []);
            }
        } catch (error) {
            console.error("Error fetching fields:", error);
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
                `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`
            );

            if (response.ok) {
                const result = await response.json();
                setModalMode("edit");
                setSelectedFieldId(fieldId);
                setCurrentField({
                    label: result.data.label || "",
                    type: result.data.type || "text",
                    placeholder: result.data.placeholder || "",
                    required: result.data.required || false,
                    options: result.data.options || [],
                });
                setIsModalOpen(true);
            } else {
                console.warn("API call failed, using existing field data");
                setModalMode("edit");
                setSelectedFieldId(fieldId);
                setCurrentField({
                    label: fieldToEdit.label || "",
                    type: fieldToEdit.type || "text",
                    placeholder: fieldToEdit.placeholder || "",
                    required: fieldToEdit.required || false,
                    options: fieldToEdit.options || [],
                });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching field data:", error);
            setModalMode("edit");
            setSelectedFieldId(fieldId);
            setCurrentField({
                label: fieldToEdit.label || "",
                type: fieldToEdit.type || "text",
                placeholder: fieldToEdit.placeholder || "",
                required: fieldToEdit.required || false,
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
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `http://localhost:5000/api/merchant/${shopIdOnly}/form/field`,
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
        }
    };

    const updateFieldAPI = async () => {
        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${selectedFieldId}`,
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
        }
    };

    const deleteFieldAPI = async (fieldId) => {
        showConfirmationPopup(
            "Delete Field",
            "Are you sure you want to delete this field? This action cannot be undone.",
            async () => {
                try {
                    const shopIdOnly = shop.id.split("/").pop();
                    const response = await fetch(
                        `http://localhost:5000/api/merchant/${shopIdOnly}/form/field/${fieldId}`,
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
                }
            }
        );
    };

    const validateFieldData = () => {
        if (!currentField.label.trim()) {
            showValidationPopup("Please enter a field label");
            return false;
        }

        if (currentField.type === "email" && !currentField.required) {
            showValidationPopup("Email field must be marked as required");
            return false;
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
            setCurrentField({ ...currentField, [key]: value, required: true });
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
            const response = await fetch(`http://localhost:5000/api/merchant/${shopIdOnly}/form`, {
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
                    `http://localhost:5000/api/merchant/${shopIdOnly}/form/fields/reorder`,
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
        setIsSubmitting(true);

        const missingRequiredFields = fields.filter(field => {
            if (!field.required) return false;
            const value = formData[field._id];
            return !value || (Array.isArray(value) && value.length === 0) || value.trim() === "";
        });

        if (missingRequiredFields.length > 0) {
            const fieldNames = missingRequiredFields.map(f => f.label).join(", ");
            showValidationPopup(`Please fill in the following required fields: ${fieldNames}`);
            setIsSubmitting(false);
            return;
        }

        const emailField = fields.find(f => f.type === "email");
        const emailValue = emailField ? formData[emailField._id] : null;

        try {
            const shopIdOnly = shop.id.split("/").pop();
            const response = await fetch(
                `http://localhost:5000/api/merchant/${shopIdOnly}/form/submit`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        formData: formData,
                        email: emailValue,
                        formName: formName,
                        shopDomain: shop.myshopifyDomain
                    }),
                }
            );

            if (response.ok) {
                setSaveMessage({ 
                    type: "success", 
                    title: formSubmissionTitle, 
                    text: successDescription 
                });
                setTimeout(() => setSaveMessage(null), 5000);
                setFormData({});
            } else {
                const errText = await response.text();
                setSaveMessage({ 
                    type: "error", 
                    text: `❌ Error submitting form: ${errText}` 
                });
                setTimeout(() => setSaveMessage(null), 5000);
            }
        } catch (error) {
            setSaveMessage({ 
                type: "error", 
                text: `❌ Network error: ${error.message}` 
            });
            setTimeout(() => setSaveMessage(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
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
                                            <InlineGrid columns={2} gap="400">
                                                <TextField 
                                                    label="Success Message Title" 
                                                    value={formSubmissionTitle} 
                                                    onChange={setFormSubmissionTitle} 
                                                    autoComplete="off" 
                                                    helpText="Title shown after successful submission"
                                                />
                                               
                                            </InlineGrid>
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
                                                                        background="bg-fill-info" 
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

                                                            <Box paddingBlockStart="300">
                                                                <Button 
                                                                    variant="primary" 
                                                                    submit
                                                                    size="large"
                                                                    fullWidth
                                                                    loading={isSubmitting}
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
                    primaryAction={{ content: "Save Field", onAction: handleModalSave }}
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
                                    { label: "Checkbox Group", value: "checkbox" },
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