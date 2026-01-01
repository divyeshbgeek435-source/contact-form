import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
export const loader = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);

    if (!session || !session.accessToken) {
      console.error("❌ No valid session found");
      return { apiKey: process.env.SHOPIFY_API_KEY || "" };
    }

    // ====== FULL GRAPHQL SHOP QUERY ======
    const shopResponse = await admin.graphql(`
        #graphql
        query {
          shop {
            id
            name
            email
            myshopifyDomain
            primaryDomain {
              url
              host
            }
            plan {
              displayName
            }
            contactEmail
            timezoneOffset
            billingAddress {
              address1
              country
              city
              zip
              province
              company
              phone
            }
          }
        }
      `);

    const shopJson = await shopResponse.json();
    const shop = shopJson.data?.shop;

    // console.log("🛍 FULL STORE DATA:", shop);

    // ====== SEND FULL DATA TO BACKEND API ======
    const backendResponse = await fetch(
      "https://nodejs-qvgm.onrender.com/api/merchant/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantId: shop.id,
          storeName: shop.primaryDomain.host,
          storeUrl: shop.primaryDomain.url,
          name: shop.name,
          contactEmail: shop.contactEmail || shop.email,
          myshopifyDomain: shop.myshopifyDomain,
          timezoneOffset: shop.timezoneOffset,
          plan: shop.plan?.displayName,
          billingAddress: shop.billingAddress,
          ipAddress:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("CF-Connecting-IP") ||
            "Unknown",
          userAgent: request.headers.get("user-agent"),
        }),
      }
    );

    // ----- RAW RESPONSE CHECK -----
    const rawCreateResponse = await backendResponse.text();
    console.log("📩 RAW CREATE RESPONSE:", rawCreateResponse);

    let backendJson = null;
    try {
      backendJson = JSON.parse(rawCreateResponse);
    } catch (err) {
      console.error("❌ JSON parse failed for create API, backend returned HTML/invalid response");
      return { apiKey: process.env.SHOPIFY_API_KEY || "" };
    }

    // Backend result
    if (backendJson.merchantExists) {
      console.log("⚠ Merchant already exists");
    } else {
      console.log("🎉 Merchant saved successfully");
    }

    // ====== SEPARATE SHOP.ID CHECK - UPDATE CALL ======
    if (shop && shop.id) {
      const shopIdOnly = shop.id.split("/").pop();
      console.log("🆔 SHOP ID ONLY:", shopIdOnly);

      try {
        const egetid = await fetch(
          `https://nodejs-qvgm.onrender.com/api/merchant/users/${shopIdOnly}`
        );

        const jsonResponse = await egetid.json(); // ⬅️ DIRECTLY JSON
        // console.log("📦 FULL JSON RESPONSE:", jsonResponse);

        if (jsonResponse.data) {
          console.log("🔑 RESPONSE DATA:", jsonResponse.data._id);

          const updateId = jsonResponse.data._id;  // extract ID
          console.log("🆔 UPDATE ID:++", updateId);

          // ==== CALL UPDATE API ====
          const updateResponse = await fetch(
            `https://nodejs-qvgm.onrender.com/api/merchant/update/${updateId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                merchantId: shop.id,
                storeName: shop.primaryDomain.host,
                storeUrl: shop.primaryDomain.url,
                name: shop.name,
                contactEmail: shop.contactEmail || shop.email,
                myshopifyDomain: shop.myshopifyDomain,
                timezoneOffset: shop.timezoneOffset,
                plan: shop.plan?.displayName,
                billingAddress: shop.billingAddress,
                ipAddress:
                  request.headers.get("x-forwarded-for") ||
                  request.headers.get("CF-Connecting-IP") ||
                  "Unknown",
                userAgent: request.headers.get("user-agent"),
              }),
            }
          );

          const updateRaw = await updateResponse.text();
        } else {
          console.log("⚠️ No .data found in JSON response");
        }


        return { apiKey: process.env.SHOPIFY_API_KEY || "" };

      } catch (error) {
        console.error("🔥 JSON PARSE ERROR OR FETCH FAILED:", error);
      }

    } else {
      console.log("❌ shop.id NOT FOUND");
    }


  } catch (error) {
    console.error("Loader error:", error);
  }

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};


export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        {/* <s-link href="/app">Home</s-link> */}
        {/* <s-link href="/app/products">products page</s-link> */}
        <s-link href="/app/submissionForm">Submission Form</s-link>
        <s-link href="/app/formdata">Form</s-link>
        <s-link href="/app/settings">Settings</s-link>
        {/* <s-link href="/app/whatsapp">whatsapp</s-link> */}
      </s-app-nav>

      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
