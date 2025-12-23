import { useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
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
  const shop = shopJson.data.shop;

  console.log("🛍 STORE DATA:", shop);


  await fetch("http://localhost:5000/api/createMerchant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchantId: shop.id,
      storeName: shop.primaryDomain.host,
      name: shop.name,
      contactEmail: shop.contactEmail || shop.email,
      myshopifyDomain: shop.myshopifyDomain,
      timezoneOffset: shop.timezoneOffset,
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("CF-Connecting-IP") || "Unknown",
      userAgent: request.headers.get("user-agent"),
    }),
  }).catch((err) => console.error("❌ API ERROR:", err));


  const response = await admin.graphql(
    `#graphql
      query {
        products(first: 50) {
          edges {
            node {
              id
              title
              status
              createdAt
              variants(first: 1) {
                edges {
                  node {
                    id
                    price
                    barcode
                    inventoryQuantity
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const responseJson = await response.json();


  return {
    products: responseJson.data.products.edges.map((p) => p.node),
  };
};

export default function Index() {
  const { products } = useLoaderData();

  return (
    <s-page heading="Products List">
      <s-section heading="Products Table (Fetched)">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Price</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Barcode</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Inventory</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const variant = p.variants?.edges[0]?.node;
              return (
                <tr key={p.id}>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {p.title}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {p.status}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {variant?.price ?? "N/A"}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {variant?.barcode ?? "N/A"}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {variant?.inventoryQuantity ?? "N/A"}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {p.createdAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
