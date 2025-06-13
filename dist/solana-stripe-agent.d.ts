interface SolanaBalanceResult {
    success: boolean;
    balance_lamports?: number;
    balance_sol?: number;
    public_key?: string;
    error?: string;
}
interface SolanaTransferResult {
    success: boolean;
    transaction_signature?: string;
    from_public_key?: string;
    to_public_key?: string;
    amount_sol?: number;
    error?: string;
}
interface HybridPaymentResult {
    stripe?: any;
    solana?: {
        success: boolean;
        payment_address: string;
        price_sol: number;
        instructions: string;
    };
}
interface AgentAssignmentResult {
    result: string;
}
declare class SolanaStripeAgent {
    private stripeSecretKey;
    private solanaRpcUrl;
    private stripe;
    private solanaConnection;
    private solanaKeypair?;
    private openaiClient;
    /**
     * Initialize the Solana-Stripe Agent
     * @param stripeSecretKey Your Stripe secret API key
     * @param solanaRpcUrl URL for Solana RPC connection
     * @param solanaKeypairPath Path to your Solana keypair JSON file (optional)
     * @param openaiApiKey OpenAI API key for agent functionality
     */
    constructor(stripeSecretKey: string, solanaRpcUrl?: string, solanaKeypairPath?: string, openaiApiKey?: string);
    /**
     * Get balance for a Solana account
     * @param publicKey Solana account public key
     */
    solanaGetBalance(publicKey: string): Promise<SolanaBalanceResult>;
    /**
     * Transfer SOL from the agent's account to another account
     * @param toPublicKey Recipient's Solana public key
     * @param amountSol Amount of SOL to transfer
     */
    solanaTransfer(toPublicKey: string, amountSol: number): Promise<SolanaTransferResult>;
    /**
     * Create a payment option that supports both Stripe and Solana
     * @param productName Name of the product
     * @param description Product description
     * @param priceUsd Price in USD
     * @param solanaAddress Solana address to receive payments (optional)
     */
    createHybridPayment(productName: string, description: string, priceUsd: number, solanaAddress?: string): Promise<HybridPaymentResult>;
    /**
     * Create a Stripe product and payment link
     * @param productName Name of the product
     * @param description Product description
     * @param priceUsd Price in USD
     */
    private _createStripePayment;
    /**
     * Convert USD to estimated SOL amount based on current exchange rate
     * @param usdAmount Amount in USD
     */
    private _getSolPrice;
    /**
     * Process a natural language assignment with the agent
     * @param assignment Natural language assignment to process
     */
    processAssignment(assignment: string): Promise<AgentAssignmentResult>;
    private _handleToolCall;
}
export default SolanaStripeAgent;
