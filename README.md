# Solana-Stripe Payment Processing Agent

A TypeScript agent that processes payments using Stripe, Shopify, and the Solana blockchain with its own MCP (Model Context Protocol) server for AI tool integration.

## Architecture Overview

This agent combines traditional payment processing with blockchain capabilities:

- **Core Agent**: Processes natural language instructions and manages payment flows
- **MCP Server**: Provides context to LLMs like Claude or GPT through a standardized API
- **Payment Processing**: Integrates Stripe, Solana, and Shopify

## Features

- Create hybrid payment options that accept both traditional and blockchain payments
- Process natural language instructions for payment operations
- Integrate with Shopify for e-commerce capabilities
- Provide an MCP server for AI tool integration
- Handle Solana blockchain transactions and balance queries

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-stripe-agent.git
cd solana-stripe-agent

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Build the project
npm run build
```

## Usage

### Running the Agent

```bash
# Start the agent demo
npm start

# Start the MCP server
npm run serve
```

### Basic Example

```typescript
import { SolanaStripeAgent } from 'solana-stripe-agent';

// Initialize the agent
const agent = new SolanaStripeAgent(
  'sk_test_your_stripe_key',
  'https://api.devnet.solana.com'
);

// Create a hybrid payment product
const result = await agent.createHybridPayment(
  'Solana NFT Access Pass',
  'Premium access pass for Solana developers',
  99.99,
  'your_solana_address'
);

console.log(result);
```

### Using the MCP Server with AI Tools

Configure your AI tool (like Claude Desktop or Cursor) with the following MCP server configuration:

```json
{
  "mcpServers": {
    "solana-stripe": {
      "command": "npx",
      "args": ["ts-node", "src/mcp-server.ts"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_test_your_stripe_key",
        "SOLANA_RPC_URL": "https://api.devnet.solana.com"
      }
    }
  }
}
```

## Available Components

### 1. Solana-Stripe Agent

The core agent that processes payments with Stripe and Solana.

```typescript
import { SolanaStripeAgent } from 'solana-stripe-agent';

const agent = new SolanaStripeAgent(stripeKey, solanaRpcUrl, solanaKeypairPath);

// Check Solana balance
const balance = await agent.solanaGetBalance('some_solana_address');

// Process a natural language request
const result = await agent.processAssignment('Create a payment link for Product X at $49.99');
```

### 2. Shopify Integration

Connect to Shopify for e-commerce capabilities.

```typescript
import { ShopifyIntegration } from 'solana-stripe-agent';

const shopify = new ShopifyIntegration(shopName, apiKey, apiPassword);

// Create a product
const product = await shopify.createProduct(
  'Product Name',
  'Description',
  99.99,
  'Digital'
);

// Create a checkout
const checkout = await shopify.createCheckout(product.variant_id);
```

### 3. MCP Server

Run a Model Context Protocol server for AI tool integration.

```bash
# Start the MCP server
npm run serve
```

## Project Structure

- `/src`: Source code
  - `solana-stripe-agent.ts`: Core agent functionality
  - `mcp-server.ts`: MCP server implementation
  - `shopify-integration.ts`: Shopify integration module
  - `index.ts`: Main entry point

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT