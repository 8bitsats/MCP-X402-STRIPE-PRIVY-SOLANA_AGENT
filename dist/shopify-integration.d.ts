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
declare class ShopifyIntegration {
    private client;
    private baseUrl;
    private shopName;
    /**
     * Initialize the Shopify integration
     * @param shopName Your Shopify store name (e.g., your-store.myshopify.com)
     * @param apiKey Shopify API key
     * @param apiPassword Shopify API password or access token
     * @param apiVersion Shopify API version
     */
    constructor(shopName: string, apiKey: string, apiPassword: string, apiVersion?: string);
    /**
     * Create a new product in Shopify
     * @param title Product title
     * @param description Product description
     * @param price Product price
     * @param productType Type of product
     * @param vendor Product vendor
     * @param images List of image URLs with alt text
     */
    createProduct(title: string, description: string, price: number, productType?: string, vendor?: string, images?: ShopifyImage[]): Promise<ShopifyProductResult>;
    /**
     * Create a checkout for a product variant
     * @param variantId ID of the product variant
     * @param quantity Quantity to purchase
     * @param customerEmail Optional customer email
     * @param shippingAddress Optional shipping address
     */
    createCheckout(variantId: string | number, quantity?: number, customerEmail?: string, shippingAddress?: ShopifyAddress): Promise<ShopifyCheckoutResult>;
    /**
     * Create a custom payment gateway for Solana payments
     * Note: This is conceptual and would require additional Shopify app development
     * @param name Name of the payment gateway
     * @param supportsCrypto Whether the gateway supports cryptocurrency
     */
    createPaymentGateway(name?: string, supportsCrypto?: boolean): Promise<Record<string, any>>;
    /**
     * Get details of a specific product
     * @param productId ID of the product
     */
    getProduct(productId: string | number): Promise<ShopifyProductResult>;
    /**
     * List products in the Shopify store
     * @param limit Number of products to return
     * @param page Page number for pagination
     */
    listProducts(limit?: number, page?: number): Promise<ShopifyProductListResult>;
    /**
     * Create a webhook for a custom crypto payment app
     * @param webhookUrl URL to receive webhook notifications
     * @param topics List of webhook topics to subscribe to
     */
    createCryptoPaymentAppWebhook(webhookUrl: string, topics?: string[]): Promise<ShopifyWebhookResult>;
}
export default ShopifyIntegration;
