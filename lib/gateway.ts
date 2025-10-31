import { createGateway } from "ai";

// Create AI Gateway instance
// For Vercel deployments: OIDC authentication is automatic
// For local dev: either use 'vercel dev' or set AI_GATEWAY_API_KEY
export const gateway = createGateway({
  // API key is optional - uses OIDC on Vercel deployments
  apiKey: process.env.AI_GATEWAY_API_KEY,
  // Base URL is optional - defaults to https://ai-gateway.vercel.sh/v1/ai
  ...(process.env.AI_GATEWAY_BASE_URL && {
    baseURL: process.env.AI_GATEWAY_BASE_URL,
  }),
});
