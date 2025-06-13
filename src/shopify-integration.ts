// shopify-integration.ts
import axios, { AxiosInstance } from 'axios';

// Type definitions
interface ShopifyImage {
  src: string;
  alt?: string;
}

interface ShopifyAddress {
  first_name?: string;
  last_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

interface ShopifyProductResult {
  success: boolean;
  product_id?: number | string;
  variant_id?: number | string;
  title?: string;
  description?: string;
  price?: string;
  admin_url?: string;
  product_url?: string;
  error?: string;
  status_code?: number;
}

interface ShopifyCheckoutResult {
  success: boolean;
  checkout_id?: string;
  checkout_token?: string;
  web_url?: string;
  total_price?: string;
  requires_shipping?: boolean;
  currency?: string;
  error?: string;
  status_code?: number;
}

interface ShopifyWebhookResult {
  success: boolean;
  webhooks?: Array<{
    success: boolean;
    webhook_id?: string;
    topic?: string;
    address?: string;
    error?: string;
    status_code?: number;
  }>;
  error?: string;
}

interface ShopifyProductListResult {
  success: boolean;
  count?: number;
  products?: Array<{
    id: string | number;
    title: string;
    handle: string;
    product_type: string;
    created_at: string;
    variants_count: number;
    admin_url: string;
    product_url: string;
  }>;
  error?: string;
  status_code?: number;
}

class ShopifyIntegration {
  private client: AxiosInstance;
  private baseUrl: string;
  private shopName: string;

  /**
   * Initialize the Shopify integration
   * @param shopName Your Shopify store name (e.g., your-store.myshopify.com)
   * @param apiKey Shopify API key
   * @param apiPassword Shopify API password or access token
   * @param apiVersion Shopify API version
   */
  constructor(
    shopName: string,
    apiKey: string,
    apiPassword: string,
    apiVersion: string = "2023-10"
  ) {
    this.shopName = shopName;
    this.baseUrl = `https://${shopName}/admin/api/${apiVersion}`;

    // Create axios client with authentication
    this.client = axios.create({
      baseURL: this.baseUrl,
      auth: {
        username: apiKey,
        password: apiPassword
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  /**
   * Create a new product in Shopify
   * @param title Product title
   * @param description Product description
   * @param price Product price
   * @param productType Type of product
   * @param vendor Product vendor
   * @param images List of image URLs with alt text
   */
  async createProduct(
    title: string,
    description: string,
    price: number,
    productType: string = "Digital",
    vendor: string = "Solana-Stripe Agent",
    images?: ShopifyImage[]
  ): Promise<ShopifyProductResult> {
    try {
      // Prepare the product data
      const productData = {
        product: {
          title,
          body_html: description,
          vendor,
          product_type: productType,
          status: "active",
          published: true,
          images
        }
      };

      // Create the product
      const response = await this.client.post('/products.json', productData);
      
      // Check if the request was successful
      if (response.status >= 200 && response.status < 300) {
        const product = response.data.product;
        
        // Now create a variant with the price
        const variantData = {
          variant: {
            product_id: product.id,
            price: price.toString(),
            inventory_management: "shopify",
            inventory_policy: "continue",
            inventory_quantity: productType === "Physical" ? 100 : 1000,
            requires_shipping: productType === "Physical"
          }
        };
        
        const variantResponse = await this.client.post(
          `/products/${product.id}/variants.json`,
          variantData
        );
        
        if (variantResponse.status >= 200 && variantResponse.status < 300) {
          const variant = variantResponse.data.variant;
          return {
            success: true,
            product_id: product.id,
            variant_id: variant.id,
            title: product.title,
            description: product.body_html || "",
            price: variant.price,
            admin_url: `https://${this.shopName}/admin/products/${product.id}`,
            product_url: `https://${this.shopName}/products/${product.handle}`
          };
        } else {
          return {
            success: false,
            error: `Failed to create product variant: ${JSON.stringify(variantResponse.data)}`,
            status_code: variantResponse.status
          };
        }
      } else {
        return {
          success: false,
          error: `Failed to create product: ${JSON.stringify(response.data)}`,
          status_code: response.status
        };
      }
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : String(e)
      };
    }
  }

  /**
   * Create a checkout for a product variant
   * @param variantId ID of the product variant
   * @param quantity Quantity to purchase
   * @param customerEmail Optional customer email
   * @param shippingAddress Optional shipping address
   */
  async createCheckout(
    variantId: string | number,
    quantity: number = 1,
    customerEmail?: string,
    shippingAddress?: ShopifyAddress
  ): Promise<ShopifyCheckoutResult> {
    try {
      // Prepare checkout data
      const checkoutData: any = {
        checkout: {
          line_items: [
            {
              variant_id: variantId,
              quantity
            }
          ]
        }
      };
      
      // Add email if provided
      if (customerEmail) {
        checkoutData.checkout.email = customerEmail;
      }
      
      // Add shipping address if provided
      if (shippingAddress) {
        checkoutData.checkout.shipping_address = shippingAddress;
      }
      
      // Create the checkout
      const response = await this.client.post('/checkouts.json', checkoutData);
      
      // Check if the request was successful
      if (response.status >= 200 && response.status < 300) {
        const checkout = response.data.checkout;
        return {
          success: true,
          checkout_id: checkout.id,
          checkout_token: checkout.token,
          web_url: checkout.web_url,
          total_price: checkout.total_price,
          requires_shipping: checkout.requires_shipping,
          currency: checkout.currency
        };
      } else {
        return {
          success: false,
          error: `Failed to create checkout: ${JSON.stringify(response.data)}`,
          status_code: response.status
        };
      }
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : String(e)
      };
    }
  }

  /**
   * Create a custom payment gateway for Solana payments
   * Note: This is conceptual and would require additional Shopify app development
   * @param name Name of the payment gateway
   * @param supportsCrypto Whether the gateway supports cryptocurrency
   */
  async createPaymentGateway(
    name: string = "Solana Payment",
    supportsCrypto: boolean = true
  ): Promise<Record<string, any>> {
    // This is a conceptual implementation
    // In a real scenario, you would need to develop a Shopify app
    // with a custom payment gateway integration
    
    return {
      success: true,
      note: "This is a conceptual implementation. In reality, you would need to develop a custom Shopify app with a payment gateway integration.",
      payment_gateway: {
        name,
        supports_crypto: supportsCrypto,
        created_at: new Date().toISOString()
      }
    };
  }

  /**
   * Get details of a specific product
   * @param productId ID of the product
   */
  async getProduct(productId: string | number): Promise<ShopifyProductResult> {
    try {
      const response = await this.client.get(`/products/${productId}.json`);
      
      if (response.status === 200) {
        const product = response.data.product;
        return {
          success: true,
          product_id: product.id,
          title: product.title,
          description: product.body_html || "",
          price: product.variants[0]?.price,
          admin_url: `https://${this.shopName}/admin/products/${product.id}`,
          product_url: `https://${this.shopName}/products/${product.handle}`
        };
      } else {
        return {
          success: false,
          error: `Failed to get product: ${JSON.stringify(response.data)}`,
          status_code: response.status
        };
      }
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : String(e)
      };
    }
  }

  /**
   * List products in the Shopify store
   * @param limit Number of products to return
   * @param page Page number for pagination
   */
  async listProducts(limit: number = 10, page: number = 1): Promise<ShopifyProductListResult> {
    try {
      const response = await this.client.get(`/products.json?limit=${limit}&page=${page}`);
      
      if (response.status === 200) {
        const products = response.data.products;
        return {
          success: true,
          count: products.length,
          products: products.map((product: any) => ({
            id: product.id,
            title: product.title,
            handle: product.handle,
            product_type: product.product_type,
            created_at: product.created_at,
            variants_count: product.variants.length,
            admin_url: `https://${this.shopName}/admin/products/${product.id}`,
            product_url: `https://${this.shopName}/products/${product.handle}`
          }))
        };
      } else {
        return {
          success: false,
          error: `Failed to list products: ${JSON.stringify(response.data)}`,
          status_code: response.status
        };
      }
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : String(e)
      };
    }
  }

  /**
   * Create a webhook for a custom crypto payment app
   * @param webhookUrl URL to receive webhook notifications
   * @param topics List of webhook topics to subscribe to
   */
  async createCryptoPaymentAppWebhook(
    webhookUrl: string,
    topics: string[] = ["orders/create"]
  ): Promise<ShopifyWebhookResult> {
    try {
      // Create webhooks for each topic
      const results = [];
      
      for (const topic of topics) {
        const webhookData = {
          webhook: {
            topic,
            address: webhookUrl,
            format: "json"
          }
        };
        
        try {
          const response = await this.client.post('/webhooks.json', webhookData);
          
          if (response.status >= 200 && response.status < 300) {
            const webhook = response.data.webhook;
            results.push({
              success: true,
              webhook_id: webhook.id,
              topic: webhook.topic,
              address: webhook.address
            });
          } else {
            results.push({
              success: false,
              topic,
              error: `Failed to create webhook: ${JSON.stringify(response.data)}`,
              status_code: response.status
            });
          }
        } catch (e) {
          results.push({
            success: false,
            topic,
            error: e instanceof Error ? e.message : String(e)
          });
        }
      }
      
      return {
        success: results.some(result => result.success),
        webhooks: results
      };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : String(e),
        webhooks: []
      };
    }
  }
}

// Demo function to show Shopify integration in action
async function shopifyDemo() {
  // Load environment variables
  const shopName = process.env.SHOPIFY_SHOP_NAME;
  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiPassword = process.env.SHOPIFY_API_PASSWORD;
  
  if (!shopName || !apiKey || !apiPassword) {
    console.log("Missing Shopify credentials. Set SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, and SHOPIFY_API_PASSWORD environment variables.");
    return;
  }
  
  // Initialize Shopify integration
  const shopify = new ShopifyIntegration(shopName, apiKey, apiPassword);
  
  // Example: Create a product
  console.log("Creating a Shopify product...");
  const productResult = await shopify.createProduct(
    "Solana Developer Toolkit",
    "A comprehensive toolkit for Solana blockchain developers, including code templates, tutorials, and resources.",
    149.99,
    "Digital",
    "Solana-Stripe Agent",
    [{ src: "https://example.com/images/solana-toolkit.jpg", alt: "Solana Developer Toolkit" }]
  );
  
  console.log(JSON.stringify(productResult, null, 2));
  
  if (productResult.success && productResult.variant_id) {
    // Example: Create a checkout
    console.log("\nCreating a checkout...");
    const checkoutResult = await shopify.createCheckout(
      productResult.variant_id,
      1,
      "customer@example.com"
    );
    
    console.log(JSON.stringify(checkoutResult, null, 2));
  }
  
  // Example: List products
  console.log("\nListing products...");
  const productsResult = await shopify.listProducts(5);
  
  console.log(JSON.stringify(productsResult, null, 2));
}

// Run the demo if this file is executed directly
if (require.main === module) {
  shopifyDemo().catch(console.error);
}

export default ShopifyIntegration;