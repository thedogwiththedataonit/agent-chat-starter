import { convertToModelMessages, type UIMessage } from "ai";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";
import { createEmailAgent } from "@/lib/agents/email-agent";

export const maxDuration = 300; // 5 minutes for complex email generation

export async function POST(req: Request) {
  const {
    messages,
    modelId = DEFAULT_MODEL,
  }: { messages: UIMessage[]; modelId: string } = await req.json();

  if (!SUPPORTED_MODELS.includes(modelId)) {
    return new Response(
      JSON.stringify({ error: `Model ${modelId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const agent = createEmailAgent(modelId);

  const result = await agent.stream({
    
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
