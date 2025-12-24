// document.addEventListener("DOMContentLoaded", async function () {



//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR HELPER ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     // const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;

//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;

//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     console.warn("No fields found");
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {

//     const name = `contact[${f.label}]`;

//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     /* ---- INPUT ---- */
//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     }

//     /* ---- TEXTAREA ---- */
//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     }

//     /* ---- SELECT / DROPDOWN ---- */
//     else if (["dropdown", "select"].includes(f.type)) {
//       const options = (f.options || []).map(opt => {
//         const value = typeof opt === "string" ? opt : (opt.value || opt.label);
//         const label = typeof opt === "string" ? opt : (opt.label || opt.value);
//         return `<option value="${value}">${label}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select id="${f.id}" name="${name}" ${required}>
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     }

//     /* ---- RADIO ---- */
//     else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     }

//     /* ---- CHECKBOX ---- */
//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   /* ===================== 5️⃣ SUBMIT HANDLER ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value).join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else {
//         const el = document.getElementById(f.id);
//         value = el ? el.value : "";
//       }

//       if (value) {
//         dynamicData[f.id] = value;
//         whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//       }
//     });

//     /* ===================== 6️⃣ API BODY MAP ===================== */
//     const map = {};
//     formTemplate.fields.forEach(f => {
//       const l = f.label.toLowerCase();
//       if (l.includes("name")) map[f.id] = "name";
//       else if (l.includes("email")) map[f.id] = "email";
//       else if (l.includes("phone")) map[f.id] = "phone";
//       else if (l.includes("message")) map[f.id] = "message";
//       else if (l.includes("country")) map[f.id] = "country";
//       else if (l.includes("subject")) map[f.id] = "subject";
//       else if (l.includes("select")) map[f.id] = "dropdown";

//       else map[f.id] = f.type;
//     });

//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     Object.keys(dynamicData).forEach(id => {
//       apiData[map[id]] = dynamicData[id];
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       // await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
//       await fetch("http://localhost:5000/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });








































// document.addEventListener("DOMContentLoaded", async function () {

//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR HELPER ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;

//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;

//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     console.warn("No fields found");
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {

//     const name = `contact[${f.label}]`;
//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     /* ---- INPUT ---- */
//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     }

//     /* ---- TEXTAREA ---- */
//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     }

//     /* ---- DROPDOWN / SELECT ---- */
//     else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options || []).map(opt => {
//         const value = typeof opt === "string" ? opt : (opt.value || opt.label);
//         const label = typeof opt === "string" ? opt : (opt.label || opt.value);
//         return `<option value="${value}">${label}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select 
//             id="${f.id}" 
//             name="${name}" 
//             data-backend-key="dropdown"
//             ${required}
//           >
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     }

//     /* ---- RADIO ---- */
//     else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     }

//     /* ---- CHECKBOX ---- */
//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   /* ===================== 5️⃣ SUBMIT HANDLER ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value).join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else if (el) {
//         value = el.value;
//       }

//       if (!value) return;

//       /* ✅ DROPDOWN ALWAYS FIXED */
//       if (el?.dataset.backendKey === "dropdown") {
//         dynamicData["dropdown"] = value;
//         whatsappMsg += `dropdown: ${encodeURIComponent(value)}%0A`;
//       } else {
//         dynamicData[f.id] = value;
//         whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//       }
//     });

//     /* ===================== 6️⃣ API BODY MAP ===================== */
//     const map = {};
//     formTemplate.fields.forEach(f => {
//       const l = f.label.toLowerCase();
//       if (l.includes("name")) map[f.id] = "name";
//       else if (l.includes("email")) map[f.id] = "email";
//       else if (l.includes("phone")) map[f.id] = "phone";
//       else if (l.includes("message")) map[f.id] = "message";
//       else if (l.includes("country")) map[f.id] = "country";
//       else if (l.includes("subject")) map[f.id] = "subject";
//       else map[f.id] = f.type;
//     });

//     // ✅ HARD SAFETY
//     map["dropdown"] = "dropdown";
//     map["select"] = "dropdown";

//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     Object.keys(dynamicData).forEach(key => {
//       apiData[map[key] || key] = dynamicData[key];
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });















// document.addEventListener("DOMContentLoaded", async function () {

//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR HELPER ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;

//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;

//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     console.warn("No fields found");
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {

//     const name = `contact[${f.label}]`;
//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     /* ---- INPUT ---- */
//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     }

//     /* ---- TEXTAREA ---- */
//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     }

//     /* ---- DROPDOWN / SELECT ---- */
//     else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options || []).map(opt => {
//         const value = typeof opt === "string" ? opt : (opt.value || opt.label);
//         const label = typeof opt === "string" ? opt : (opt.label || opt.value);
//         return `<option value="${value}">${label}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select 
//             id="${f.id}" 
//             name="${name}" 
//             ${required}
//           >
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     }

//     /* ---- RADIO ---- */
//     else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     }

//     /* ---- CHECKBOX ---- */
//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   /* ===================== 5️⃣ SUBMIT HANDLER ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value).join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else if (el) {
//         value = el.value;
//       }

//       if (!value) return;

//       // Store with field metadata for later mapping
//       dynamicData[f.id] = {
//         value: value,
//         label: f.label,
//         type: f.type
//       };

//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     /* ===================== 6️⃣ API BODY MAP ===================== */
//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     // Map each field based on its label or type
//     Object.keys(dynamicData).forEach(fieldId => {
//       const field = dynamicData[fieldId];
//       const label = field.label.toLowerCase();
//       const value = field.value;

//       // Check label for semantic meaning
//       if (label.includes("name")) {
//         apiData.name = value;
//       } else if (label.includes("email")) {
//         apiData.email = value;
//       } else if (label.includes("phone") || label.includes("number") || label.includes("mobile")) {
//         apiData.phone = value;
//       } else if (label.includes("message")) {
//         apiData.message = value;
//       } else if (label.includes("country")) {
//         apiData.country = value;
//       } else if (label.includes("subject")) {
//         apiData.subject = value;
//       } 
//       // Fall back to field type
//       else if (field.type === "select" || field.type === "dropdown") {
//         apiData.dropdown = value;
//       } else if (field.type === "textarea") {
//         apiData.textarea = value;
//       } else if (field.type === "radio") {
//         apiData.radio = value;
//       } else if (field.type === "checkbox") {
//         apiData.checkbox = value;
//       } else if (field.type === "text") {
//         apiData.text = value;
//       } else {
//         // Last resort - use field type as key
//         apiData[field.type] = value;
//       }
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });




// document.addEventListener("DOMContentLoaded", async function () {

//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;

//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;

//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     console.warn("No fields found");
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {

//     const name = `contact[${f.label}]`;
//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     /* ---- INPUT ---- */
//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     }

//     /* ---- TEXTAREA ---- */
//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     }

//     /* ---- SELECT / DROPDOWN ---- */
//     else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `<option value="${val}">${val}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select id="${f.id}" name="${name}" ${required}>
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     }

//     /* ---- RADIO ---- */
//     else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     }

//     /* ---- CHECKBOX ---- */
//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   /* ===================== 5️⃣ SUBMIT ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value)
//           .join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else if (el) {
//         value = el.value;
//       }

//       if (!value) return;

//       dynamicData[f.id] = {
//         type: f.type,
//         value: value
//       };

//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     /* ===================== 6️⃣ API BODY (TYPE → VALUE) ===================== */
//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     Object.keys(dynamicData).forEach(id => {
//       const field = dynamicData[id];

//       let key = field.type;

//       if (field.type === "select") {
//         key = "dropdown";   // <-- select ne dropdown banavi didhu
//       }


//       apiData[field.type] = field.value;
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });



//parfcat working

// document.addEventListener("DOMContentLoaded", async function () {

//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   let  mailSent = false;

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;

//   mailSent = json?.data?.mailsent; 
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";

//     whatsappNumber = code && number ? `+${code}${number}` : number;

//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     console.warn("No fields found");
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {


//     // conditional name
// // global variable from backend fetch
// const name = mailSent ? `contact[${f.label}]` : `${f.label}`;

//     // const name = `contact[${f.label}]`;
//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     /* ---- INPUT ---- */
//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     }

//     /* ---- TEXTAREA ---- */
//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     }

//     /* ---- SELECT / DROPDOWN ---- */
//     else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `<option value="${val}">${val}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select id="${f.id}" name="${name}" ${required}>
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     }

//     /* ---- RADIO ---- */
//     else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     }

//     /* ---- CHECKBOX ---- */
//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   /* ===================== 5️⃣ SUBMIT ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value)
//           .join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else if (el) {
//         value = el.value;
//       }

//       if (!value) return;

//       dynamicData[f.id] = {
//         type: f.type,
//         value
//       };

//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     /* ===================== 6️⃣ API BODY (SELECT → DROPDOWN FIX) ===================== */
//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     Object.keys(dynamicData).forEach(id => {
//       const field = dynamicData[id];
//       let key = field.type;

//       // 🔥 IMPORTANT FIX
//       if (key === "select") key = "dropdown";

//       apiData[key] = field.value;
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });





// frontend emty 

//DONE
// document.addEventListener("DOMContentLoaded", async function () {

//   /* ===================== SAFETY CHECK ===================== */
//   if (!window.APP_CONFIG) {
//     console.warn("APP_CONFIG missing");
//     return;
//   }

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");

//   let mailSent = false;

//   if (!form || !fieldsDiv) {
//     console.warn("Form or fields container not found");
//     return;
//   }

//   // ====== ADD LOADER ======
//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
// loader.style.display = "flex";
// loader.style.alignItems = "center";
// loader.style.justifyContent = "center";
// loader.style.marginBottom = "10px";
// loader.style.gap = "8px";
// loader.style.height = "30px"; // ensure it has height
// loader.innerHTML = `
//   <div class="spinner" style="
//     width: 18px;
//     height: 18px;
//     border: 3px solid #f3f3f3;
//     border-top: 3px solid #555;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   "></div>
//   <span>Loading form...</span>
// `;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none"; // hide fields until loaded
//   form.querySelector(".submit-btn").style.display = "none"; // hide buttonz

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   /* ===================== REQUIRED STAR ===================== */
//   const requiredStar = (f) =>
//     f.required ? `<span style="color:red;margin-left:4px">*</span>` : "";

//   /* ===================== 1️⃣ GET IP ===================== */
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const json = await res.json();
//     ipAddress = json?.ip || "";
//   } catch (err) {
//     console.warn("IP fetch failed", err);
//   }

//   /* ===================== 2️⃣ LOAD BACKEND ===================== */
//   try {
//     const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
//     const json = await res.json();

//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent; 
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) {
//     console.error("Backend error", err);
//   }

//   if (!formTemplate?.fields || !Array.isArray(formTemplate.fields)) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   /* ===================== 3️⃣ ENSURE FIELD IDS ===================== */
//   formTemplate.fields.forEach((f, i) => {
//     if (!f.id) f.id = `field_${i}`;
//   });

//   /* ===================== 4️⃣ BUILD FIELDS ===================== */
//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : `${f.type}`;
//     const required = f.required ? "required" : "";
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text", "email", "tel", "url", "number", "date"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <input id="${f.id}" type="${f.type}" name="${name}" ${required} placeholder="${placeholder}">
//         </div>`;
//     } else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <textarea id="${f.id}" name="${name}" ${required} placeholder="${placeholder}"></textarea>
//         </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `<option value="${val}">${val}</option>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <select id="${f.id}" name="${name}" ${required}>
//             <option value="">-- Select ${f.label} --</option>
//             ${options}
//           </select>
//         </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options || []).map((opt, i) => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="radio" name="${name}" value="${val}" ${required && i === 0 ? "required" : ""}>
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${radios}</div>
//         </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(opt => {
//         const val = typeof opt === "string" ? opt : (opt.value || opt.label);
//         return `
//           <label>
//             <input type="checkbox" data-id="${f.id}" value="${val}">
//             ${val}
//           </label>`;
//       }).join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label} ${requiredStar(f)}</label>
//           <div>${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   // ===== SHOW FIELDS & BUTTON AFTER BUILD =====
//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   /* ===================== 5️⃣ SUBMIT ===================== */
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//           .map(c => c.value)
//           .join(", ");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${f.label}]"]:checked`);
//         value = r ? r.value : "";
//       }
//       else if (el) {
//         value = el.value;
//       }

//       if (!value) return;

//       dynamicData[f.id] = {
//         type: f.type,
//         value
//       };

//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     /* ===================== 6️⃣ API BODY (SELECT → DROPDOWN FIX) ===================== */
//     const apiData = {
//       merchantId: `gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress
//     };

//     Object.keys(dynamicData).forEach(id => {
//       const field = dynamicData[id];
//       let key = field.type;
//       if (key === "select") key = "dropdown";
//       apiData[key] = field.value;
//     });

//     console.log("📤 API BODY", apiData);

//     /* ===================== 7️⃣ WHATSAPP ===================== */
//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank", "_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     /* ===================== 8️⃣ SEND BACKEND ===================== */
//     try {
//       await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(apiData)
//       });
//     } catch (err) {
//       console.error("API error", err);
//     }

//     /* ===================== 9️⃣ SHOPIFY SUBMIT ===================== */
//     setTimeout(() => form.submit(), 300);
//   });

// });



// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess"); // container for success message

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   // Loader
//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   // Show form title & description
//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   // Ensure IDs
//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   // Build fields
//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";
//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","tel","url","number","date"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options||[]).map((o,i) => `<label><input type="radio" name="${name}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> ${typeof o==="string"?o:o.value||o.label}</label>`).join("");
//       html = `<div class="form-group"><label>${f.label} ${requiredStar(f)}</label><div>${radios}</div></div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> ${typeof o==="string"?o:o.value||o.label}</label>`).join("");
//       html = `<div class="form-group"><label>${f.label} ${requiredStar(f)}</label><div>${checks}</div></div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit
//   form.addEventListener("submit", async function(e){
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);
//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value).join(", ");
//       } else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="${f.type}"]:checked`);
//         value = r ? r.value : "";
//       } else if (el) value = el.value;

//       if (!value) return;
//       dynamicData[f.id] = { type: f.type, value };
//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };
//     Object.keys(dynamicData).forEach(id => {
//       let key = dynamicData[id].type === "select" ? "dropdown" : dynamicData[id].type;
//       apiData[key] = dynamicData[id].value;
//     });

//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank","_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     try {
//       await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(apiData)
//       });
//     } catch(err){ console.error("API error", err); }

//     // Hide form & show success message
//     form.style.display = "none";
//     if(successDiv){
//       successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                               <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//       successDiv.style.display = "block";
//     }
//   });
// });


// -------------------done 12-23-25
// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess");
//   const formContainer = document.querySelector(".dynamic-form");

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   // Get layout settings from data attributes
//   const fieldLayout = formContainer?.dataset.fieldLayout || "full";
//   const radioPosition = formContainer?.dataset.radioPosition || "left";
//   const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

//   // Loader
//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   // Show form title & description
//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   // Ensure IDs
//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   // Apply field layout class
//   if (fieldLayout === "half") {
//     fieldsDiv.classList.add("field-layout-half");
//   }

//   // Build fields
//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";
  
//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","tel","url","number","date"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options||[]).map((o,i) => `<label class="radio-label"><input type="radio" name="${name}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group radio-group" data-position="${radioPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="radio-options">${radios}</div>
//       </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label class="checkbox-label"><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group checkbox-group" data-position="${checkboxPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="checkbox-options">${checks}</div>
//       </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit
//   form.addEventListener("submit", async function(e){
//     e.preventDefault();

//     const dynamicData = {};
//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);
//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value).join(", ");
//       } else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"]:checked`);
//         value = r ? r.value : "";
//       } else if (el) value = el.value;

//       if (!value) return;
//       dynamicData[f.id] = { type: f.type, value };
//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };
//     Object.keys(dynamicData).forEach(id => {
//       let key = dynamicData[id].type === "select" ? "dropdown" : dynamicData[id].type;
//       apiData[key] = dynamicData[id].value;
//     });

//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank","_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     try {
//       await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(apiData)
//       });
//     } catch(err){ console.error("API error", err); }

//     // Hide form & show success message
//     form.style.display = "none";
//     if(successDiv){
//       successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                               <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//       successDiv.style.display = "block";
//     }
//   });
// });






// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess");
//   const formContainer = document.querySelector(".dynamic-form");

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   const fieldLayout = formContainer?.dataset.fieldLayout || "full";
//   const radioPosition = formContainer?.dataset.radioPosition || "left";
//   const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   if (fieldLayout === "half") {
//     fieldsDiv.classList.add("field-layout-half");
//   }

//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";

//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","tel","url","number","date"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options||[]).map((o,i) => `<label class="radio-label"><input type="radio" name="${name}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group radio-group" data-position="${radioPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="radio-options">${radios}</div>
//       </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label class="checkbox-label"><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group checkbox-group" data-position="${checkboxPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="checkbox-options">${checks}</div>
//       </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit
//   form.addEventListener("submit", async function(e){
//     e.preventDefault();

//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;
//     const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if (f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value);
//         if (value.length) value = value.join(", ");
//       } else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"]:checked`);
//         value = r ? r.value : "";
//       } else if (el) value = el.value;

//       if (!value) return;

//       if (!apiData[f.type]) apiData[f.type] = {};
//       apiData[f.type][f.label] = value;

//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     });

//     if (whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank","_blank");
//       if (tab) tab.location.href = waLink;
//     }

//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(apiData)
//       });
//     } catch(err){ console.error("API error", err); }

//     form.style.display = "none";
//     if(successDiv){
//       successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                               <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//       successDiv.style.display = "block";
//     }
//   });
// });





// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess");
//   const formContainer = document.querySelector(".dynamic-form");

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   const fieldLayout = formContainer?.dataset.fieldLayout || "full";
//   const radioPosition = formContainer?.dataset.radioPosition || "left";
//   const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   if (fieldLayout === "half") {
//     fieldsDiv.classList.add("field-layout-half");
//   }

//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";

//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","tel","url","number","date"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options||[]).map((o,i) => `<label class="radio-label"><input type="radio" name="${name}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group radio-group" data-position="${radioPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="radio-options">${radios}</div>
//       </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label class="checkbox-label"><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group checkbox-group" data-position="${checkboxPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="checkbox-options">${checks}</div>
//       </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit
//   // form.addEventListener("submit", async function(e){
//   //   e.preventDefault();

//   //   let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;
//   //   const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

//   //   // Initialize type objects
//   //   ["text", "email", "tel", "url", "number", "date", "textarea", "checkbox", "radio", "select"].forEach(type => {
//   //     apiData[type] = {};
//   //   });

//   //   console.log(apiData,"fgewnorjbrwehj")

//   //   formTemplate.fields.forEach(f => {
//   //     let value = "";
//   //     const el = document.getElementById(f.id);

//   //     if(f.type === "checkbox") {
//   //       value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value).join(", ");
//   //     } else if(f.type === "radio") {
//   //       const r = document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"]:checked`);
//   //       value = r ? r.value : "";
//   //     } else if(el) {
//   //       value = el.value;
//   //     }

//   //     if(value) {
//   //       apiData[f.type][f.label] = value;
//   //       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//   //     }
//   //   });

//   //   // WhatsApp link
//   //   if(whatsappNumber) {
//   //     const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//   //     const tab = window.open("about:blank","_blank");
//   //     if(tab) tab.location.href = waLink;
//   //   }

//   //   // Send to backend
//   //   try {
//   //     await fetch("http://localhost:5000/api/add-user", {
//   //       method:"POST",
//   //       headers:{"Content-Type":"application/json"},
//   //       body: JSON.stringify(apiData)
//   //     });
//   //   } catch(err){ console.error("API error", err); }

//   //   // Show success
//   //   form.style.display = "none";
//   //   if(successDiv){
//   //     successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//   //                             <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//   //     successDiv.style.display = "block";
//   //   }
//   // });


//   form.addEventListener("submit", async function(e){
//   e.preventDefault();

//   let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;
//   const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

//   // Initialize type objects
//   ["text", "email", "tel", "url", "number", "date", "textarea", "checkbox", "radio", "select"].forEach(type => {
//     apiData[type] = {};
//   });

//   formTemplate.fields.forEach(f => {
//     let value = "";
//     const el = document.getElementById(f.id);

//     if(f.type === "checkbox") {
//       // Collect all checked values for this checkbox group
//       value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)]
//                 .map(c => c.value)
//                 .join(", ");
//     } else if(f.type === "radio") {
//       // Collect value from the selected radio in this group
//       const r = document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"][value="${f.value || ''}"]:checked`) 
//                 || document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"]:checked`);
//       value = r ? r.value : "";
//     } else if(el) {
//       value = el.value;
//     }

//     if(value) {
//       // For single-value fields (text, textarea, dropdown, radio), overwrite is fine
//       if(["text","email","tel","url","number","date","textarea","radio","select"].includes(f.type)) {
//         apiData[f.type][f.label] = value;
//       } 
//       // For checkboxes, append multiple selections
//       else if(f.type === "checkbox") {
//         if(!apiData[f.type][f.label]) apiData[f.type][f.label] = value;
//         else apiData[f.type][f.label] += ", " + value;
//       }

//       // Add to WhatsApp message
//       whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//     }
//   });


//   console.log(apiData,"gengrb")

//   // Open WhatsApp link if number exists
//   if(whatsappNumber) {
//     const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//     const tab = window.open("about:blank","_blank");
//     if(tab) tab.location.href = waLink;
//   }

//   // Send data to backend
//   try {
//     await fetch("http://localhost:5000/api/add-user", {
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body: JSON.stringify(apiData)
//     });
//   } catch(err){ console.error("API error", err); }

//   // Show success message
//   form.style.display = "none";
//   if(successDiv){
//     successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                             <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//     successDiv.style.display = "block";
//   }
// });


// });



// redio not working 
// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess");
//   const formContainer = document.querySelector(".dynamic-form");

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   const fieldLayout = formContainer?.dataset.fieldLayout || "full";
//   const radioPosition = formContainer?.dataset.radioPosition || "left";
//   const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   if (fieldLayout === "half") {
//     fieldsDiv.classList.add("field-layout-half");
//   }

//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";

//   // Render fields
//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","tel","url","number","date"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       const radios = (f.options||[]).map((o,i) => `<label class="radio-label"><input type="radio" name="${name}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group radio-group" data-position="${radioPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="radio-options">${radios}</div>
//       </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label class="checkbox-label"><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group checkbox-group" data-position="${checkboxPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="checkbox-options">${checks}</div>
//       </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit logic
//   form.addEventListener("submit", async function(e){
//     e.preventDefault();

//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;
//     const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

//     // Initialize type objects
//     ["text", "email", "tel", "url", "number", "date", "textarea", "checkbox", "radio", "dropdown"].forEach(type => {
//       apiData[type] = {};
//     });

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if(f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value).join(", ");
//       } else if(f.type === "radio") {
//         const r = document.querySelector(`input[name="${mailSent ? `contact[${f.type}]` : f.type}"]:checked`);
//         value = r ? r.value : "";
//       } else if(el) {
//         value = el.value;
//       }

//       if(value) {
//         const typeKey = (f.type === "select") ? "dropdown" : f.type;

//         if(!apiData[typeKey][f.label]) {
//           apiData[typeKey][f.label] = value;
//         } else {
//           if(!Array.isArray(apiData[typeKey][f.label])) {
//             apiData[typeKey][f.label] = [apiData[typeKey][f.label]];
//           }
//           apiData[typeKey][f.label].push(value);
//         }

//         whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//       }
//     });
//     console.log(apiData)

//     // WhatsApp link
//     if(whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank","_blank");
//       if(tab) tab.location.href = waLink;
//     }

//     // Send to backend
//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(apiData)
//       });
//     } catch(err){ console.error("API error", err); }

//     // Show success
//     form.style.display = "none";
//     if(successDiv){
//       successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                               <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//       successDiv.style.display = "block";
//     }
//   });

// });


// 12-24-25
// document.addEventListener("DOMContentLoaded", async function () {

//   if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

//   const shopId = window.APP_CONFIG.shopId;
//   const storeName = window.APP_CONFIG.storeName;

//   const form = document.getElementById("simpleContactForm");
//   const fieldsDiv = document.getElementById("shopifyFields");
//   const formTitleDiv = document.getElementById("formTitle");
//   const formDescDiv = document.getElementById("formDescription");
//   const successDiv = document.getElementById("formSuccess");
//   const formContainer = document.querySelector(".dynamic-form");

//   let mailSent = false;
//   if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

//   const fieldLayout = formContainer?.dataset.fieldLayout || "full";
//   const radioPosition = formContainer?.dataset.radioPosition || "left";
//   const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

//   const loader = document.createElement("div");
//   loader.id = "shopifyLoader";
//   loader.style.display = "flex";
//   loader.style.alignItems = "center";
//   loader.style.justifyContent = "center";
//   loader.style.marginBottom = "10px";
//   loader.innerHTML = `<span>Loading form...</span>`;
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch (err) { console.warn("IP fetch failed", err); }

//   try {
//     const res = await fetch(`http://localhost:5000/api/users/${shopId}`);
//     const json = await res.json();
//     formTemplate = json?.data?.formTemplates;
//     mailSent = json?.data?.mailsent;
//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch (err) { console.error("Backend error", err); }

//   if (!formTemplate?.fields?.length) {
//     loader.innerText = "No fields found.";
//     return;
//   }

//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "Contact Form";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";

//   formTemplate.fields.forEach((f, i) => { if (!f.id) f.id = `field_${i}`; });

//   if (fieldLayout === "half") {
//     fieldsDiv.classList.add("field-layout-half");
//   }

//   const requiredStar = f => f.required ? "<span style='color:red'>*</span>" : "";

//   // DEBUG: Track radio field counter
//   let radioCounter = 0;

//   // Render fields
//   formTemplate.fields.forEach(f => {
//     const name = mailSent ? `contact[${f.type}]` : f.type;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","number"].includes(f.type)) {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <input id="${f.id}" type="${f.type}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}">
//       </div>`;
//     } else if (f.type === "textarea") {
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <textarea id="${f.id}" name="${name}" ${f.required?"required":""} placeholder="${placeholder}"></textarea>
//       </div>`;
//     } else if (f.type === "select" || f.type === "dropdown") {
//       const options = (f.options||[]).map(o => `<option value="${typeof o==="string"?o:o.value||o.label}">${typeof o==="string"?o:o.value||o.label}</option>`).join("");
//       html = `<div class="form-group">
//         <label>${f.label} ${requiredStar(f)}</label>
//         <select id="${f.id}" name="${name}" ${f.required?"required":""}>
//           <option value="">-- Select ${f.label} --</option>
//           ${options}
//         </select>
//       </div>`;
//     } else if (f.type === "radio") {
//       // IMPROVED FIX: Use both field ID and counter for completely unique names
//       const uniqueName = mailSent ? `contact[radio_${radioCounter}]` : `radio_${radioCounter}`;
//       radioCounter++;
      
//       // DEBUG: Log the unique name being used
//       console.log(`Radio Group "${f.label}" using name: ${uniqueName}`);
      
//       const radios = (f.options||[]).map((o,i) => `<label class="radio-label"><input type="radio" name="${uniqueName}" value="${typeof o==="string"?o:o.value||o.label}" ${f.required && i===0?"required":""}> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group radio-group" data-position="${radioPosition}" data-field-id="${f.id}" data-radio-name="${uniqueName}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="radio-options">${radios}</div>
//       </div>`;
//     } else if (f.type === "checkbox") {
//       const checks = (f.options||[]).map(o => `<label class="checkbox-label"><input type="checkbox" data-id="${f.id}" value="${typeof o==="string"?o:o.value||o.label}"> <span>${typeof o==="string"?o:o.value||o.label}</span></label>`).join("");
//       html = `<div class="form-group checkbox-group" data-position="${checkboxPosition}">
//         <label class="group-label">${f.label} ${requiredStar(f)}</label>
//         <div class="checkbox-options">${checks}</div>
//       </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   // DEBUG: Log all radio buttons and their names
//   console.log("=== ALL RADIO BUTTONS ===");
//   document.querySelectorAll('input[type="radio"]').forEach(radio => {
//     console.log(`Name: ${radio.name}, Value: ${radio.value}`);
//   });

//   loader.style.display = "none";
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   // Submit logic
//   form.addEventListener("submit", async function(e){
//     e.preventDefault();

//     let whatsappMsg = `Store: ${encodeURIComponent(storeName)}%0A`;
//     const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

//     // Initialize type objects
//     ["text", "email",   "number",   "textarea", "checkbox", "radio", "dropdown"].forEach(type => {
//       apiData[type] = {};
//     });

//     formTemplate.fields.forEach(f => {
//       let value = "";
//       const el = document.getElementById(f.id);

//       if(f.type === "checkbox") {
//         value = [...document.querySelectorAll(`input[data-id="${f.id}"]:checked`)].map(c=>c.value).join(", ");
//       } else if(f.type === "radio") {
//         // FIX: Find the radio group by data attribute
//         const radioGroup = document.querySelector(`.radio-group[data-field-id="${f.id}"]`);
//         if(radioGroup) {
//           const radioName = radioGroup.dataset.radioName;
//           const r = document.querySelector(`input[name="${radioName}"]:checked`);
//           value = r ? r.value : "";
//           console.log(`Radio field "${f.label}" (name: ${radioName}): ${value}`);
//         }
//       } else if(el) {
//         value = el.value;
//       }

//       if(value) {
//         const typeKey = (f.type === "select") ? "dropdown" : f.type;

//         if(!apiData[typeKey][f.label]) {
//           apiData[typeKey][f.label] = value;
//         } else {
//           if(!Array.isArray(apiData[typeKey][f.label])) {
//             apiData[typeKey][f.label] = [apiData[typeKey][f.label]];
//           }
//           apiData[typeKey][f.label].push(value);
//         }

//         whatsappMsg += `${encodeURIComponent(f.label)}: ${encodeURIComponent(value)}%0A`;
//       }
//     });
//     console.log("=== FINAL API DATA ===", apiData);

//     // WhatsApp link
//     if(whatsappNumber) {
//       const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
//       const tab = window.open("about:blank","_blank");
//       if(tab) tab.location.href = waLink;
//     }

//     // Send to backend
//     try {
//       await fetch("http://localhost:5000/api/add-user", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(apiData)
//       });
//     } catch(err){ console.error("API error", err); }

//     // Show success
//     form.style.display = "none";
//     if(successDiv){
//       successDiv.innerHTML = `<h2>${formTemplate.formSubmissionTitle || "Form submitted!"}</h2>
//                               <p>${formTemplate.successdescription || "Thank you for contacting us."}</p>`;
//       successDiv.style.display = "block";
//     }
//   });

// });





document.addEventListener("DOMContentLoaded", async function () {

  if (!window.APP_CONFIG) return console.warn("APP_CONFIG missing");

  const shopId = window.APP_CONFIG.shopId;
  const storeName = window.APP_CONFIG.storeName;

  const form = document.getElementById("simpleContactForm");
  const fieldsDiv = document.getElementById("shopifyFields");
  const formTitleDiv = document.getElementById("formTitle");
  const formDescDiv = document.getElementById("formDescription");
  const successDiv = document.getElementById("formSuccess");
  const formContainer = document.querySelector(".dynamic-form");

  let mailSent = false;
  if (!form || !fieldsDiv) return console.warn("Form or fields container not found");

  /* ---------------- SAFE KEY (IMPORTANT) ---------------- */
  const makeSafeKey = (label) =>
    label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_");

  const fieldLayout = formContainer?.dataset.fieldLayout || "full";
  const radioPosition = formContainer?.dataset.radioPosition || "left";
  const checkboxPosition = formContainer?.dataset.checkboxPosition || "right";

  const loader = document.createElement("div");
  loader.innerHTML = "Loading form...";
  fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
  fieldsDiv.style.display = "none";
  form.querySelector(".submit-btn").style.display = "none";

  let ipAddress = "";
  let formTemplate = null;
  let whatsappNumber = null;

  try {
    const res = await fetch("https://api.ipify.org?format=json");
    ipAddress = (await res.json())?.ip || "";
  } catch {}

  try {
    const res = await fetch(`https://nodejs-qvgm.onrender.com/api/users/${shopId}`);
    const json = await res.json();
    formTemplate = json?.data?.formTemplates;
    mailSent = json?.data?.mailsent;
    const code = (json?.data?.currencyCode || "").replace("+", "");
    const number = json?.data?.whatsappNumber || "";
    whatsappNumber = code && number ? `+${code}${number}` : number;
  } catch {}

  if (!formTemplate?.fields?.length) return;

  if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "";
  if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";
  if (successDiv) successDiv.innerText = formTemplate.successdescription || "";




  formTemplate.fields.forEach((f, i) => f.id ||= `field_${i}`);

  /* ---------------- RENDER FIELDS ---------------- */
  formTemplate.fields.forEach(f => {

    const safeKey = makeSafeKey(f.label);
    const name = mailSent ? `contact[${safeKey}]` : safeKey;
    let html = "";

    if (["text","email","number"].includes(f.type)) {
      html = `
        <div class="form-group">
          <label>${f.label}</label>
          <input id="${f.id}" type="${f.type}" name="${name}">
        </div>`;
    }

    else if (f.type === "textarea") {
      html = `
        <div class="form-group">
          <label>${f.label}</label>
          <textarea id="${f.id}" name="${name}"></textarea>
        </div>`;
    }

    else if (f.type === "dropdown") {
      const opts = (f.options||[])
        .map(o => `<option value="${o.value||o}">${o.label||o}</option>`).join("");
      html = `
        <div class="form-group">
          <label>${f.label}</label>
          <select id="${f.id}" name="${name}">
            <option value="">Select</option>${opts}
          </select>
        </div>`;
    }

else if (f.type === "radio") {
  const radios = (f.options || [])
    .map(o => `
      <label class="option-label">
        <input type="radio" name="${name}" value="${o.value || o}">
        ${o.label || o}
      </label>
    `).join("");

  html = `
    <div class="form-group">
      <label class="group-label">${f.label}</label>
      <div class="options">${radios}</div>
    </div>`;
}


else if (f.type === "checkbox") {

  const checks = (f.options || [])
    .map((o, i) => `
      <label class="option-label">
        <input 
          type="checkbox"
          name="${name}[]"
          value="${o.value || o}"
          ${f.required && i === 0 ? "required" : ""}
        >
        ${o.label || o}
      </label>
    `).join("");

  html = `
    <div class="form-group checkbox-group">
      <label class="group-label">${f.label}</label>
      <div class="options">
        ${checks}
      </div>
    </div>`;
}


    fieldsDiv.insertAdjacentHTML("beforeend", html);
  });

  loader.remove();
  fieldsDiv.style.display = "block";
  form.querySelector(".submit-btn").style.display = "inline-block";

  /* ---------------- SUBMIT (API + WHATSAPP SAME) ---------------- */
  form.addEventListener("submit", async e => {
    e.preventDefault();

    let whatsappMsg = `Store: ${storeName}%0A`;
    const apiData = { merchantId:`gid://shopify/Shop/${shopId}`, storeName, ipAddress };

    ["text","email","number","textarea","checkbox","radio","dropdown"].forEach(t => apiData[t] = {});

    formTemplate.fields.forEach(f => {
      const safeKey = makeSafeKey(f.label);
      let value = "";

      if (f.type === "checkbox") {
        value = [...document.querySelectorAll(`input[name="contact[${safeKey}][]"]:checked`)]
          .map(c => c.value).join(", ");
      } else if (f.type === "radio") {
        const r = document.querySelector(`input[name="contact[${safeKey}]"]:checked`);
        value = r?.value || "";
      } else {
        value = document.getElementById(f.id)?.value || "";
      }

      if (value) {
        const key = f.type === "select" ? "dropdown" : f.type;
        apiData[key][f.label] = value;
        whatsappMsg += `${f.label}: ${value}%0A`;
      }
    });

    if (whatsappNumber)
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank");

    await fetch("https://nodejs-qvgm.onrender.com/api/add-user", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(apiData)
    });

    form.style.display = "none";
    successDiv.innerHTML = `<h2>Form submitted!</h2>`;
    successDiv.style.display = "block";
  });

});


