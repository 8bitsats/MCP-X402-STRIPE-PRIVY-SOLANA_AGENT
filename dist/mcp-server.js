"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
// mcp-server.ts
const express_1 = __importDefault(require("express"));
const solana_stripe_agent_1 = __importDefault(require("./solana-stripe-agent"));
// Initialize environment variables
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_example";
const solanaKeypairPath = process.env.SOLANA_KEYPAIR_PATH;
const openaiApiKey = process.env.OPENAI_API_KEY;
// Create the agent
const agent = new solana_stripe_agent_1.default(stripeKey, process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com", solanaKeypairPath, openaiApiKey);
// Create Express app
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "3000");
// Middleware
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
// Root endpoint with server information
app.get('/', (req, res) => {
    res.json({
        name: "Solana-Stripe Agent MCP Server",
        version: "1.0.0",
        description: "MCP Server for Solana and Stripe payment processing with agent capabilities"
    });
});
// Get available tools information
app.get('/tools', (req, res) => {
    const tools = [
        {
            name: "solana_get_balance",
            description: "Get the balance of a Solana account",
            parameters: {
                public_key: "Solana account public key (string)"
            }
        },
        {
            name: "solana_transfer",
            description: "Transfer SOL between Solana accounts",
            parameters: {
                to_public_key: "Recipient's Solana public key (string)",
                amount_sol: "Amount of SOL to transfer (number)"
            }
        },
        {
            name: "create_hybrid_payment",
            description: "Create a payment that accepts both Stripe and Solana",
            parameters: {
                product_name: "Name of the product (string)",
                description: "Product description (string)",
                price_usd: "Price in USD (number)",
                solana_address: "Solana address to receive payments (string, optional)"
            }
        },
        {
            name: "stripe_create_product",
            description: "Create a Stripe product",
            parameters: {
                name: "Product name (string)",
                description: "Product description (string)"
            }
        },
        {
            name: "stripe_create_price",
            description: "Create a price for a Stripe product",
            parameters: {
                product_id: "Stripe product ID (string)",
                unit_amount: "Price amount in cents (integer)",
                currency: "Currency code (string, default: usd)"
            }
        },
        {
            name: "stripe_create_payment_link",
            description: "Create a Stripe payment link",
            parameters: {
                price_id: "Stripe price ID (string)"
            }
        },
        {
            name: "search_documentation",
            description: "Search Stripe or Solana documentation",
            parameters: {
                query: "Search query (string)",
                platform: "Platform to search (string, options: stripe, solana, both)"
            }
        }
    ];
    res.json({ tools });
});
// Call a specific tool with parameters
app.post('/tool/:toolName', async (req, res) => {
    try {
        const { toolName } = req.params;
        const { parameters } = req.body;
        let result;
        switch (toolName) {
            case "solana_get_balance":
                result = await agent.solanaGetBalance(parameters.public_key);
                break;
            case "solana_transfer":
                result = await agent.solanaTransfer(parameters.to_public_key, parameters.amount_sol);
                break;
            case "create_hybrid_payment":
                result = await agent.createHybridPayment(parameters.product_name, parameters.description, parameters.price_usd, parameters.solana_address);
                break;
            case "stripe_create_product":
                const assignment = `Create a product called '${parameters.name}' with description '${parameters.description || ''}'`;
                result = await agent.processAssignment(assignment);
                break;
            case "stripe_create_price":
                const productId = parameters.product_id;
                const unitAmount = parameters.unit_amount;
                const currency = parameters.currency || "usd";
                const priceAssignment = `Create a price of $${unitAmount / 100} for product with ID ${productId} in ${currency}`;
                result = await agent.processAssignment(priceAssignment);
                break;
            case "stripe_create_payment_link":
                const priceId = parameters.price_id;
                const linkAssignment = `Create a payment link for price with ID ${priceId}`;
                result = await agent.processAssignment(linkAssignment);
                break;
            case "search_documentation":
                const query = parameters.query || "";
                const platform = parameters.platform || "both";
                result = {
                    search_results: [
                        {
                            title: "Example documentation result",
                            snippet: `Documentation search result for '${query}' on ${platform}`,
                            url: `https://example.com/docs?q=${query}&platform=${platform}`
                        }
                    ]
                };
                break;
            default:
                res.status(404).json({
                    content: null,
                    error: `Tool '${toolName}' not found`
                });
                return;
        }
        res.json({ content: result });
    }
    catch (e) {
        res.json({
            content: null,
            error: e instanceof Error ? e.message : String(e)
        });
    }
});
// Process a natural language request with the agent
app.post('/process', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({
                content: null,
                error: "No text provided"
            });
            return;
        }
        const result = await agent.processAssignment(text);
        res.json({ content: result });
    }
    catch (e) {
        res.json({
            content: null,
            error: e instanceof Error ? e.message : String(e)
        });
    }
});
// Check server status and connected services
app.get('/status', (req, res) => {
    const stripeStatus = stripeKey.startsWith("sk_") ? "connected" : "not configured";
    const solanaStatus = `connected to ${process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com"}`;
    res.json({
        status: "operational",
        services: {
            stripe: stripeStatus,
            solana: solanaStatus,
            agent: "initialized"
        },
        uptime: process.uptime()
    });
});
// Start the server
function startServer() {
    app.listen(port, () => {
        console.log(`Starting Solana-Stripe Agent MCP Server on port ${port}`);
        console.log("To configure in your LLM tool, use the following settings:");
        console.log(`
    {
      "mcpServers": {
        "solana-stripe": {
          "command": "npx",
          "args": ["ts-node", "mcp-server.ts"],
          "env": {
            "STRIPE_SECRET_KEY": "${stripeKey}",
            "SOLANA_RPC_URL": "${process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com'}",
            "PORT": "${port}"
          }
        }
      }
    }
    `);
    });
}
// Start the server if this file is run directly
if (require.main === module) {
    startServer();
}
exports.default = app;
//# sourceMappingURL=mcp-server.js.map