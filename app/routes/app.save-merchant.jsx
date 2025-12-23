import { useState, useEffect } from "react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useRouteError } from "react-router";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  // Get shop information from Shopify
  const shopResponse = await admin.graphql(`
    #graphql
    query {
      shop {
        id
        name
        email
        myshopifyDomain
        plan {
          displayName
        }
      }
    }
  `);

  const shopData = await shopResponse.json();
  const shop = shopData.data?.shop;

  return {
    shop: shop || null,
    session: {
      shop: session.shop,
      id: session.id,
    },
  };
};

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  try {
    // Get shop information from Shopify GraphQL
    const shopResponse = await admin.graphql(`
      #graphql
      query {
        shop {
          id
          name
          email
          myshopifyDomain
          plan {
            displayName
          }
        }
      }
    `);

    const shopData = await shopResponse.json();
    const shop = shopData.data?.shop;

    if (!shop) {
      return new Response(
        JSON.stringify({ success: false, error: "Shop information not found" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Extract merchant ID from shop ID (format: gid://shopify/Shop/123456)
    const merchantId = shop.id.split("/").pop() || shop.id;
    const storeName = shop.name;
    const shopDomain = shop.myshopifyDomain || session.shop;
    const email = shop.email || null;
    const plan = shop.plan?.displayName || null;

    // Save or update merchant in database
    const merchant = await prisma.merchant.upsert({
      where: {
        merchantId: merchantId,
      },
      update: {
        storeName: storeName,
        shop: shopDomain,
        email: email,
        plan: plan,
        updatedAt: new Date(),
      },
      create: {
        merchantId: merchantId,
        shop: shopDomain,
        storeName: storeName,
        email: email,
        plan: plan,
      },
    });

    console.log("Merchant saved:", merchant);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Merchant data saved successfully",
        merchant: {
          id: merchant.id,
          merchantId: merchant.merchantId,
          storeName: merchant.storeName,
          shop: merchant.shop,
          email: merchant.email,
          plan: merchant.plan,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving merchant:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to save merchant data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export default function SaveMerchant() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [merchant, setMerchant] = useState(null);
  const [error, setError] = useState("");

  const saveMerchant = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    setMerchant(null);

    try {
      const response = await fetch("/app/save-merchant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        setMerchant(data.merchant);
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Failed to save merchant data");
        setMerchant(null);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setMerchant(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 30 }}>Save Merchant & Store Data</h1>

      <div style={{ marginBottom: 30 }}>
        <button
          onClick={saveMerchant}
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {loading ? "Saving..." : "Save Merchant Data to Database"}
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: 15,
            background: "#d4edda",
            color: "#155724",
            borderRadius: 6,
            marginBottom: 20,
            border: "1px solid #c3e6cb",
          }}
        >
          ✓ {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: 15,
            background: "#f8d7da",
            color: "#721c24",
            borderRadius: 6,
            marginBottom: 20,
            border: "1px solid #f5c6cb",
          }}
        >
          ✗ {error}
        </div>
      )}

      {merchant && (
        <div
          style={{
            padding: 20,
            background: "#f8f9fa",
            borderRadius: 6,
            border: "1px solid #dee2e6",
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 15 }}>Saved Merchant Data:</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <strong>Merchant ID:</strong> {merchant.merchantId}
            </div>
            <div>
              <strong>Store Name:</strong> {merchant.storeName}
            </div>
            <div>
              <strong>Shop Domain:</strong> {merchant.shop}
            </div>
            {merchant.email && (
              <div>
                <strong>Email:</strong> {merchant.email}
              </div>
            )}
            {merchant.plan && (
              <div>
                <strong>Plan:</strong> {merchant.plan}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 30,
          padding: 15,
          background: "#e7f3ff",
          borderRadius: 6,
          fontSize: 14,
          color: "#004085",
        }}
      >
        <strong>Note:</strong> This will save your merchant ID and store name to the
        database. The data is automatically fetched from your Shopify store.
      </div>
    </div>
  );
}










