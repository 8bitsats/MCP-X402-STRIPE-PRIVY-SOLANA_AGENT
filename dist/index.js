"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaStripeAgent = exports.ShopifyIntegration = void 0;
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const shopify_integration_1 = __importDefault(require("./shopify-integration"));
exports.ShopifyIntegration = shopify_integration_1.default;
const solana_stripe_agent_1 = __importDefault(require("./solana-stripe-agent"));
exports.SolanaStripeAgent = solana_stripe_agent_1.default;
// Load environment variables
dotenv_1.default.config();
// Example main function to demonstrate usage
async function main() {
    // Get environment variables
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const solanaRpcUrl = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
    const solanaKeypairPath = process.env.SOLANA_KEYPAIR_PATH;
    const shopifyShopName = process.env.SHOPIFY_SHOP_NAME;
    const shopifyApiKey = process.env.SHOPIFY_API_KEY;
    const shopifyApiPassword = process.env.SHOPIFY_API_PASSWORD;
    // Validate required environment variables
    if (!stripeKey) {
        console.error("Missing STRIPE_SECRET_KEY environment variable");
        process.exit(1);
    }
    // Initialize the Solana-Stripe agent
    const agent = new solana_stripe_agent_1.default(stripeKey, solanaRpcUrl, solanaKeypairPath);
    console.log("Creating a hybrid payment product...");
    // Create a hybrid payment product
    const result = await agent.createHybridPayment("Solana NFT Access Pass", "Premium access pass for Solana developers", 99.99, "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri");
    console.log(JSON.stringify(result, null, 2));
    // Initialize Shopify integration if credentials are available
    if (shopifyShopName && shopifyApiKey && shopifyApiPassword) {
        console.log("\nInitializing Shopify integration...");
        const shopify = new shopify_integration_1.default(shopifyShopName, shopifyApiKey, shopifyApiPassword);
        // List Shopify products
        console.log("Listing Shopify products...");
        const productsResult = await shopify.listProducts(5);
        console.log(JSON.stringify(productsResult, null, 2));
    }
    else {
        console.log("\nSkipping Shopify integration (missing credentials)");
    }
    // Process a natural language assignment
    console.log("\nProcessing natural language assignment...");
    const assignmentResult = await agent.processAssignment("Create a payment link for a new product called 'Solana Development Course' with a price of $149.99");
    console.log(assignmentResult.result);
}
// Run the demo if this file is executed directly
if (require.main === module) {
    main().catch(error => {
        console.error("Error in main:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map