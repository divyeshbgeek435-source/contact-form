import prisma from "./db.server";

/**
 * Save or update merchant/store information in database
 * @param {Object} shopData - Shop data from Shopify
 * @param {string} shopData.id - Shop ID (merchant ID)
 * @param {string} shopData.name - Store name
 * @param {string} shopData.domain - Shop domain
 * @param {string} shopData.email - Shop email
 * @param {string} shopData.planDisplayName - Shopify plan name
 */
export async function saveMerchantData(shopData) {
  try {
    // Extract merchant ID from Shopify GID format (gid://shopify/Shop/123456)
    let merchantId = shopData.id.toString();
    if (merchantId.includes("/")) {
      merchantId = merchantId.split("/").pop();
    }
    
    const merchant = await prisma.merchant.upsert({
      where: {
        merchantId: merchantId,
      },
      update: {
        storeName: shopData.name,
        shop: shopData.myshopifyDomain || shopData.domain,
        email: shopData.email || null,
        domain: shopData.domain || null,
        plan: shopData.planDisplayName || null,
        updatedAt: new Date(),
      },
      create: {
        merchantId: merchantId,
        shop: shopData.myshopifyDomain || shopData.domain,
        storeName: shopData.name,
        email: shopData.email || null,
        domain: shopData.domain || null,
        plan: shopData.planDisplayName || null,
      },
    });

    console.log("Merchant data saved successfully:", {
      merchantId: merchant.merchantId,
      storeName: merchant.storeName,
      shop: merchant.shop,
    });
    return merchant;
  } catch (error) {
    console.error("Error saving merchant data:", error);
    throw error;
  }
}

/**
 * Get merchant data by shop domain
 * @param {string} shop - Shop domain
 */
export async function getMerchantData(shop) {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: {
        shop: shop,
      },
    });
    return merchant;
  } catch (error) {
    console.error("Error getting merchant data:", error);
    return null;
  }
}

/**
 * Get merchant data by merchant ID
 * @param {string} merchantId - Merchant ID
 */
export async function getMerchantById(merchantId) {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: {
        merchantId: merchantId,
      },
    });
    return merchant;
  } catch (error) {
    console.error("Error getting merchant data:", error);
    return null;
  }
}

