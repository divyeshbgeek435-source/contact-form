

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

//   /* ---------- HELPERS ---------- */
//   const makeSafeKey = label =>
//     label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_");

//   const requiredStar = f =>
//     f.required ? "<span style='color:red'> *</span>" : "";

//   /* ---------- LOADER ---------- */
//   const loader = document.createElement("div");
//   loader.innerHTML = "Loading form...";
//   fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
//   fieldsDiv.style.display = "none";
//   form.querySelector(".submit-btn").style.display = "none";

//   let ipAddress = "";
//   let formTemplate = null;
//   let whatsappNumber = null;
//     let formSubmissionTitle = null; 

//     let successDescription = null;

//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     ipAddress = (await res.json())?.ip || "";
//   } catch {}

//   try {
//     const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${shopId}`);
//     const json = await res.json();

//  console.log("data",json?.data)
//     formTemplate = json?.data.formTemplates[0];
//     mailSent = json?.data.mailsent;

//     const code = (json?.data?.currencyCode || "").replace("+", "");
//     const number = json?.data?.whatsappNumber || "";
//     whatsappNumber = code && number ? `+${code}${number}` : number;
//   } catch {}

//   if (!formTemplate?.fields?.length) return;

//   if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "";
//   if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";
//   if (successDiv) successDiv.innerText = formTemplate.successdescription || "";



//    const dbSuccessDesc = formTemplate.successdescription || formTemplate.successDescription;
//   successDescription = (dbSuccessDesc && dbSuccessDesc.trim()) ? dbSuccessDesc : "Your form has been submitted successfully!";
  
//   const dbSubmissionTitle = formTemplate.formSubmissionTitle;
//   formSubmissionTitle = (dbSubmissionTitle && dbSubmissionTitle.trim()) ? dbSubmissionTitle : "Form Submitted";
  
//   // Update static success message in liquid template if it exists
//  const staticSuccessMsg = document.getElementById("staticSuccessMsg");
//   if (staticSuccessMsg) {
//     staticSuccessMsg.textContent = successDescription;
//   }


//   formTemplate.fields.forEach((f, i) => f.id ||= `field_${i}`);

//   /* ---------- RENDER FIELDS ---------- */
//   formTemplate.fields.forEach(f => {

//     const safeKey = makeSafeKey(f.label);
//     const name = mailSent ? `contact[${safeKey}]` : safeKey;
//     const placeholder = f.placeholder || "";
//     let html = "";

//     if (["text","email","number"].includes(f.type)) {
//       html = `
//         <div class="form-group">
//           <label>${f.label}${requiredStar(f)}</label>
//           <input 
//             id="${f.id}" 
//             type="${f.type}" 
//             name="${name}"
//             ${f.required ? "required" : ""}
//             placeholder="${placeholder}"
//           >
//         </div>`;
//     }

//     else if (f.type === "textarea") {
//       html = `
//         <div class="form-group">
//           <label>${f.label}${requiredStar(f)}</label>
//           <textarea 
//             id="${f.id}" 
//             name="${name}"
//             ${f.required ? "required" : ""}
//             placeholder="${placeholder}"
//           ></textarea>
//         </div>`;
//     }

//     else if (f.type === "dropdown") {
//       const opts = (f.options || [])
//         .map(o => `<option value="${o.value || o}">${o.label || o}</option>`)
//         .join("");

//       html = `
//         <div class="form-group">
//           <label>${f.label}${requiredStar(f)}</label>
//           <select 
//             id="${f.id}" 
//             name="${name}"
//             ${f.required ? "required" : ""}
//           >
//             <option value="">Select</option>
//             ${opts}
//           </select>
//         </div>`;
//     }

//     else if (f.type === "radio") {
//       const radios = (f.options || []).map(o => `
//         <label class="option-label">
//           <input type="radio" name="${name}" value="${o.value || o}">
//           ${o.label || o}
//         </label>
//       `).join("");

//       html = `
//         <div class="form-group">
//           <label class="group-label">${f.label}${requiredStar(f)}</label>
//           <div class="options">${radios}</div>
//         </div>`;
//     }

//     else if (f.type === "checkbox") {
//       const checks = (f.options || []).map(o => `
//         <label class="option-label">
//           <input type="checkbox" name="${name}[]" value="${o.value || o}">
//           ${o.label || o}
//         </label>
//       `).join("");

//       html = `
//         <div class="form-group checkbox-group">
//           <label class="group-label">${f.label}${requiredStar(f)}</label>
//           <div class="options">${checks}</div>
//         </div>`;
//     }

//     fieldsDiv.insertAdjacentHTML("beforeend", html);
//   });

//   loader.remove();
//   fieldsDiv.style.display = "block";
//   form.querySelector(".submit-btn").style.display = "inline-block";

//   /* ---------- CLEAR ERRORS ---------- */
//   const clearErrors = () => {
//     document.querySelectorAll(".error-text").forEach(e => e.remove());
//     document.querySelectorAll(".error-field").forEach(e => e.classList.remove("error-field"));
//   };

//   /* ---------- SUBMIT ---------- */
//   form.addEventListener("submit", async e => {
    
//     clearErrors();

//     let isValid = true;

//     let whatsappMsg = `Store: ${storeName}%0A`;
//     const apiData = {
//       merchantId:`gid://shopify/Shop/${shopId}`,
//       storeName,
//       ipAddress,
//       text:{}, email:{}, number:{}, textarea:{},
//       checkbox:{}, radio:{}, dropdown:{}
//     };

//     formTemplate.fields.forEach(f => {
//       const safeKey = makeSafeKey(f.label);
//       let value = "";
//       let fieldEl = null;

//       if (f.type === "checkbox") {
//         const checked = document.querySelectorAll(`input[name="contact[${safeKey}][]"]:checked`);
//         value = [...checked].map(c => c.value).join(", ");
//         fieldEl = checked[0]?.closest(".form-group");
//       }
//       else if (f.type === "radio") {
//         const r = document.querySelector(`input[name="contact[${safeKey}]"]:checked`);
//         value = r?.value || "";
//         fieldEl = document.querySelector(`input[name="contact[${safeKey}]"]`)?.closest(".form-group");
//       }
//       else {
//         fieldEl = document.getElementById(f.id);
//         value = fieldEl?.value?.trim() || "";
//       }

//       if (f.required && !value) {
//         isValid = false;
//         fieldEl?.classList.add("error-field");

//         const err = document.createElement("div");
//         err.className = "error-text";
//         err.innerText = `${f.label} is required`;
//         fieldEl?.closest(".form-group")?.appendChild(err);
//       }

//       if (value) {
//         const key = f.type === "select" ? "dropdown" : f.type;
//         apiData[key][f.label] = value;
//         whatsappMsg += `${f.label}: ${value}%0A`;
//       }
//     });

//     if (!isValid) {
//       throw new Error("Validation failed");
//     }

//     if (whatsappNumber) {
//       window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank");
//     }

//     await fetch("https://nodejs-qvgm.onrender.com/api/contact/add-user", {
//       method:"POST",
//       headers:{ "Content-Type":"application/json" },
//       body: JSON.stringify(apiData)
//     });

//     form.style.display = "none";
//     successDiv.innerHTML = `<h2>${formSubmissionTitle}</h2><p>${successDescription}</p>`;
//     successDiv.style.display = "block";
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

  /* ---------- HELPERS ---------- */
  const makeSafeKey = label =>
    label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_");

  const requiredStar = f =>
    f.required ? "<span style='color:red'> *</span>" : "";

  /* ---------- LOADER ---------- */
  const loader = document.createElement("div");
  loader.style.cssText = "text-align: center; padding: 20px;";
  loader.innerHTML = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="animation: rotate 1s linear infinite;">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#3498db" stroke-width="4" stroke-dasharray="80, 200" stroke-linecap="round" style="animation: dash 1.5s ease-in-out infinite;"/>
    </svg>
    <style>
      @keyframes rotate {
        100% { transform: rotate(360deg); }
      }
      @keyframes dash {
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
        100% { stroke-dasharray: 100, 200; stroke-dashoffset: -125; }
      }
    </style>
    <p style="margin-top: 10px; color: #555;">Loading form...</p>
  `;
  fieldsDiv.parentNode.insertBefore(loader, fieldsDiv);
  fieldsDiv.style.display = "none";
  form.querySelector(".submit-btn").style.display = "none";

  let ipAddress = "";
  let formTemplate = null;
  let whatsappNumber = null;
  let formSubmissionTitle = null; 
  let successDescription = null;

  try {
    const res = await fetch("https://api.ipify.org?format=json");
    ipAddress = (await res.json())?.ip || "";
  } catch {}

  try {
    const res = await fetch(`https://nodejs-qvgm.onrender.com/api/merchant/users/${shopId}`);
    const json = await res.json();

    console.log("data",json?.data)
    formTemplate = json?.data.formTemplates[0];
    mailSent = json?.data.mailsent;

    const code = (json?.data?.currencyCode || "").replace("+", "");
    const number = json?.data?.whatsappNumber || "";
    whatsappNumber = code && number ? `+${code}${number}` : number;
  } catch {}

  if (!formTemplate?.fields?.length) return;

  if (formTitleDiv) formTitleDiv.innerText = formTemplate.name || "";
  if (formDescDiv) formDescDiv.innerText = formTemplate.description || "";
  if (successDiv) successDiv.innerText = formTemplate.successdescription || "";

  const dbSuccessDesc = formTemplate.successdescription || formTemplate.successDescription;
  successDescription = (dbSuccessDesc && dbSuccessDesc.trim()) ? dbSuccessDesc : "Your form has been submitted successfully!";
  
  const dbSubmissionTitle = formTemplate.formSubmissionTitle;
  formSubmissionTitle = (dbSubmissionTitle && dbSubmissionTitle.trim()) ? dbSubmissionTitle : "Form Submitted";
  
  // Update static success message in liquid template if it exists
  const staticSuccessMsg = document.getElementById("staticSuccessMsg");
  if (staticSuccessMsg) {
    staticSuccessMsg.textContent = successDescription;
  }

  formTemplate.fields.forEach((f, i) => f.id ||= `field_${i}`);

  /* ---------- RENDER FIELDS ---------- */
  formTemplate.fields.forEach(f => {

    const safeKey = makeSafeKey(f.label);
    const name = mailSent ? `contact[${safeKey}]` : safeKey;
    const placeholder = f.placeholder || "";
    let html = "";

    if (["text","email","number"].includes(f.type)) {
      html = `
        <div class="form-group">
          <label>${f.label}${requiredStar(f)}</label>
          <input 
            id="${f.id}" 
            type="${f.type}" 
            name="${name}"
            ${f.required ? "required" : ""}
            placeholder="${placeholder}"
          >
        </div>`;
    }

    else if (f.type === "textarea") {
      html = `
        <div class="form-group">
          <label>${f.label}${requiredStar(f)}</label>
          <textarea 
            id="${f.id}" 
            name="${name}"
            ${f.required ? "required" : ""}
            placeholder="${placeholder}"
          ></textarea>
        </div>`;
    }

    else if (f.type === "dropdown") {
      const opts = (f.options || [])
        .map(o => `<option value="${o.value || o}">${o.label || o}</option>`)
        .join("");

      html = `
        <div class="form-group">
          <label>${f.label}${requiredStar(f)}</label>
          <select 
            id="${f.id}" 
            name="${name}"
            ${f.required ? "required" : ""}
          >
            <option value="">Select</option>
            ${opts}
          </select>
        </div>`;
    }

    else if (f.type === "radio") {
      const radios = (f.options || []).map(o => `
        <label class="option-label">
          <input type="radio" name="${name}" value="${o.value || o}">
          ${o.label || o}
        </label>
      `).join("");

      html = `
        <div class="form-group">
          <label class="group-label">${f.label}${requiredStar(f)}</label>
          <div class="options">${radios}</div>
        </div>`;
    }

    else if (f.type === "checkbox") {
      const checks = (f.options || []).map(o => `
        <label class="option-label">
          <input type="checkbox" name="${name}[]" value="${o.value || o}">
          ${o.label || o}
        </label>
      `).join("");

      html = `
        <div class="form-group checkbox-group">
          <label class="group-label">${f.label}${requiredStar(f)}</label>
          <div class="options">${checks}</div>
        </div>`;
    }

    fieldsDiv.insertAdjacentHTML("beforeend", html);
  });

  loader.remove();
  fieldsDiv.style.display = "block";
  form.querySelector(".submit-btn").style.display = "inline-block";

  /* ---------- CLEAR ERRORS ---------- */
  const clearErrors = () => {
    document.querySelectorAll(".error-text").forEach(e => e.remove());
    document.querySelectorAll(".error-field").forEach(e => e.classList.remove("error-field"));
  };

  /* ---------- SUBMIT LOADER ---------- */
  const submitLoader = document.createElement("div");
  submitLoader.style.cssText = "text-align: center; padding: 20px; display: none;";
  submitLoader.innerHTML = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="animation: rotate 1s linear infinite;">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#3498db" stroke-width="4" stroke-dasharray="80, 200" stroke-linecap="round" style="animation: dash 1.5s ease-in-out infinite;"/>
    </svg>
    <p style="margin-top: 10px; color: #555;">Submitting...</p>
  `;
  form.appendChild(submitLoader);

  /* ---------- SUBMIT ---------- */
  form.addEventListener("submit", async e => {
    e.preventDefault();
    
    clearErrors();

    let isValid = true;

    let whatsappMsg = `Store: ${storeName}%0A`;
    const apiData = {
      merchantId:`gid://shopify/Shop/${shopId}`,
      storeName,
      ipAddress,
      text:{}, email:{}, number:{}, textarea:{},
      checkbox:{}, radio:{}, dropdown:{}
    };

    formTemplate.fields.forEach(f => {
      const safeKey = makeSafeKey(f.label);
      let value = "";
      let fieldEl = null;

      if (f.type === "checkbox") {
        const checked = document.querySelectorAll(`input[name="contact[${safeKey}][]"]:checked`);
        value = [...checked].map(c => c.value).join(", ");
        fieldEl = checked[0]?.closest(".form-group");
      }
      else if (f.type === "radio") {
        const r = document.querySelector(`input[name="contact[${safeKey}]"]:checked`);
        value = r?.value || "";
        fieldEl = document.querySelector(`input[name="contact[${safeKey}]"]`)?.closest(".form-group");
      }
      else {
        fieldEl = document.getElementById(f.id);
        value = fieldEl?.value?.trim() || "";
      }

      if (f.required && !value) {
        isValid = false;
        fieldEl?.classList.add("error-field");

        const err = document.createElement("div");
        err.className = "error-text";
        err.innerText = `${f.label} is required`;
        fieldEl?.closest(".form-group")?.appendChild(err);
      }

      if (value) {
        const key = f.type === "select" ? "dropdown" : f.type;
        apiData[key][f.label] = value;
        whatsappMsg += `${f.label}: ${value}%0A`;
      }
    });

    if (!isValid) {
      return;
    }

    // Show loader
    fieldsDiv.style.display = "none";
    form.querySelector(".submit-btn").style.display = "none";
    submitLoader.style.display = "block";

    try {
      if (whatsappNumber) {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank");
      }

      await fetch("https://nodejs-qvgm.onrender.com/api/contact/add-user", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(apiData)
      });

      submitLoader.style.display = "none";
      form.style.display = "none";
      successDiv.innerHTML = `<h2>${formSubmissionTitle}</h2><p>${successDescription}</p>`;
      successDiv.style.display = "block";
    } catch (error) {
      submitLoader.style.display = "none";
      fieldsDiv.style.display = "block";
      form.querySelector(".submit-btn").style.display = "inline-block";
      alert("An error occurred. Please try again.");
    }
  });

});