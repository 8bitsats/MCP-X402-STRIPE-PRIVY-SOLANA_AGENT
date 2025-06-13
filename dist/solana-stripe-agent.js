"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const openai_1 = require("openai");
const stripe_1 = __importDefault(require("stripe"));
// solana-stripe-agent.ts
const web3_js_1 = require("@solana/web3.js");
class SolanaStripeAgent {
    /**
     * Initialize the Solana-Stripe Agent
     * @param stripeSecretKey Your Stripe secret API key
     * @param solanaRpcUrl URL for Solana RPC connection
     * @param solanaKeypairPath Path to your Solana keypair JSON file (optional)
     * @param openaiApiKey OpenAI API key for agent functionality
     */
    constructor(stripeSecretKey, solanaRpcUrl = "https://api.devnet.solana.com", solanaKeypairPath, openaiApiKey) {
        this.stripeSecretKey = stripeSecretKey;
        this.solanaRpcUrl = solanaRpcUrl;
        // Initialize Stripe
        this.stripe = new stripe_1.default(stripeSecretKey, {
        // apiVersion: '2023-10-16', // Remove or update this line if not required
        });
        // Initialize Solana connection
        this.solanaConnection = new web3_js_1.Connection(solanaRpcUrl);
        // Load Solana keypair if provided
        if (solanaKeypairPath) {
            const keypairData = JSON.parse(fs.readFileSync(solanaKeypairPath, 'utf-8'));
            this.solanaKeypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(keypairData));
        }
        // Initialize OpenAI client
        this.openaiClient = new openai_1.OpenAI({
            apiKey: openaiApiKey || process.env.OPENAI_API_KEY || '',
        });
    }
    /**
     * Get balance for a Solana account
     * @param publicKey Solana account public key
     */
    async solanaGetBalance(publicKey) {
        try {
            const pubkey = new web3_js_1.PublicKey(publicKey);
            const balance = await this.solanaConnection.getBalance(pubkey);
            const balanceSol = balance / 1000000000; // Convert lamports to SOL
            return {
                success: true,
                balance_lamports: balance,
                balance_sol: balanceSol,
                public_key: publicKey,
            };
        }
        catch (e) {
            return {
                success: false,
                error: e instanceof Error ? e.message : String(e),
            };
        }
    }
    /**
     * Transfer SOL from the agent's account to another account
     * @param toPublicKey Recipient's Solana public key
     * @param amountSol Amount of SOL to transfer
     */
    async solanaTransfer(toPublicKey, amountSol) {
        if (!this.solanaKeypair) {
            return {
                success: false,
                error: "No Solana keypair provided for transfer",
            };
        }
        try {
            // Convert SOL to lamports
            const amountLamports = amountSol * 1000000000;
            // Create recipient public key
            const recipient = new web3_js_1.PublicKey(toPublicKey);
            // Create transfer instruction
            const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: this.solanaKeypair.publicKey,
                toPubkey: recipient,
                lamports: amountLamports,
            }));
            // Get the recent blockhash
            const { blockhash } = await this.solanaConnection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = this.solanaKeypair.publicKey;
            // Sign transaction
            transaction.sign(this.solanaKeypair);
            // Send transaction
            const signature = await this.solanaConnection.sendRawTransaction(transaction.serialize());
            // Wait for confirmation
            await this.solanaConnection.confirmTransaction(signature);
            return {
                success: true,
                transaction_signature: signature,
                from_public_key: this.solanaKeypair.publicKey.toString(),
                to_public_key: toPublicKey,
                amount_sol: amountSol,
            };
        }
        catch (e) {
            return {
                success: false,
                error: e instanceof Error ? e.message : String(e),
            };
        }
    }
    /**
     * Create a payment option that supports both Stripe and Solana
     * @param productName Name of the product
     * @param description Product description
     * @param priceUsd Price in USD
     * @param solanaAddress Solana address to receive payments (optional)
     */
    async createHybridPayment(productName, description, priceUsd, solanaAddress) {
        const results = {};
        // 1. Create Stripe product and payment link
        const stripeResult = await this._createStripePayment(productName, description, priceUsd);
        results.stripe = stripeResult;
        // 2. Setup Solana payment option if address provided
        if (solanaAddress) {
            const priceSol = await this._getSolPrice(priceUsd);
            results.solana = {
                success: true,
                payment_address: solanaAddress,
                price_sol: priceSol,
                instructions: `Send ${priceSol} SOL to ${solanaAddress}`,
            };
        }
        return results;
    }
    /**
     * Create a Stripe product and payment link
     * @param productName Name of the product
     * @param description Product description
     * @param priceUsd Price in USD
     */
    async _createStripePayment(productName, description, priceUsd) {
        try {
            // Create Stripe product
            const product = await this.stripe.products.create({
                name: productName,
                description: description,
            });
            // Create price for the product
            const price = await this.stripe.prices.create({
                product: product.id,
                unit_amount: Math.round(priceUsd * 100), // Convert to cents
                currency: 'usd',
            });
            // Create payment link
            const paymentLink = await this.stripe.paymentLinks.create({
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
            });
            return {
                success: true,
                product_id: product.id,
                price_id: price.id,
                payment_link: paymentLink.url,
            };
        }
        catch (e) {
            return {
                success: false,
                error: e instanceof Error ? e.message : String(e),
            };
        }
    }
    /**
     * Convert USD to estimated SOL amount based on current exchange rate
     * @param usdAmount Amount in USD
     */
    async _getSolPrice(usdAmount) {
        try {
            // Call CoinGecko API to get current SOL/USD price
            const response = await axios_1.default.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
            const solPriceUsd = response.data.solana.usd;
            return Number((usdAmount / solPriceUsd).toFixed(4));
        }
        catch (e) {
            // Fallback to an estimated value if API call fails
            return Number((usdAmount / 100).toFixed(4)); // Assuming 1 SOL = $100 as fallback
        }
    }
    /**
     * Process a natural language assignment with the agent
     * @param assignment Natural language assignment to process
     */
    async processAssignment(assignment) {
        try {
            // Create a chat completion using the OpenAI API
            const completion = await this.openaiClient.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an agent that helps with Stripe and Solana payment processing. Process the user's request and provide a clear response."
                    },
                    {
                        role: "user",
                        content: assignment
                    }
                ],
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "create_stripe_product",
                            description: "Create a Stripe product",
                            parameters: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Name of the product"
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description of the product"
                                    }
                                },
                                required: ["name"]
                            }
                        }
                    },
                    {
                        type: "function",
                        function: {
                            name: "create_stripe_price",
                            description: "Create a price for a Stripe product",
                            parameters: {
                                type: "object",
                                properties: {
                                    product_id: {
                                        type: "string",
                                        description: "ID of the Stripe product"
                                    },
                                    unit_amount: {
                                        type: "number",
                                        description: "Price in cents"
                                    },
                                    currency: {
                                        type: "string",
                                        description: "Currency code",
                                        default: "usd"
                                    }
                                },
                                required: ["product_id", "unit_amount"]
                            }
                        }
                    },
                    {
                        type: "function",
                        function: {
                            name: "create_payment_link",
                            description: "Create a Stripe payment link",
                            parameters: {
                                type: "object",
                                properties: {
                                    price_id: {
                                        type: "string",
                                        description: "ID of the Stripe price"
                                    }
                                },
                                required: ["price_id"]
                            }
                        }
                    }
                ]
            });
            // Extract the result from the completion
            const result = completion.choices[0].message.content ||
                "I processed your request, but couldn't generate a proper response.";
            return { result };
        }
        catch (e) {
            return {
                result: `Error processing assignment: ${e instanceof Error ? e.message : String(e)}`
            };
        }
    }
    // Function to handle the tool calls from OpenAI
    async _handleToolCall(toolCall) {
        const functionName = toolCall.function.name;
        const arguments_json = JSON.parse(toolCall.function.arguments);
        switch (functionName) {
            case "create_stripe_product":
                return await this.stripe.products.create({
                    name: arguments_json.name,
                    description: arguments_json.description || ""
                });
            case "create_stripe_price":
                return await this.stripe.prices.create({
                    product: arguments_json.product_id,
                    unit_amount: arguments_json.unit_amount,
                    currency: arguments_json.currency || "usd"
                });
            case "create_payment_link":
                return await this.stripe.paymentLinks.create({
                    line_items: [
                        {
                            price: arguments_json.price_id,
                            quantity: 1
                        }
                    ]
                });
            default:
                throw new Error(`Unknown function: ${functionName}`);
        }
    }
}
// Example usage
async function main() {
    // Load environment variables
    const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_example";
    // Initialize the agent
    const agent = new SolanaStripeAgent(stripeKey, "https://api.devnet.solana.com");
    // Example: Create a hybrid payment product
    const result = await agent.createHybridPayment("Solana NFT Access Pass", "Premium access pass for Solana developers", 99.99, "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri");
    console.log("\n--- Hybrid Payment Created ---");
    console.log(JSON.stringify(result, null, 2));
    // Example: Process a natural language assignment
    const assignmentResult = await agent.processAssignment("Create a payment link for a new product called 'Solana Development Course' with a price of $149.99");
    console.log("\n--- Natural Language Assignment Result ---");
    console.log(assignmentResult.result);
}
if (require.main === module) {
    main().catch(console.error);
}
exports.default = SolanaStripeAgent;
//# sourceMappingURL=solana-stripe-agent.js.map