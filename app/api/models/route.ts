import { gateway } from "@/lib/gateway";
import { NextResponse } from "next/server";
import { SUPPORTED_MODELS } from "@/lib/constants";

export async function GET() {
  const allModels = await gateway.getAvailableModels();
  
  const response = NextResponse.json({
    models: allModels.models.filter((model) =>
      SUPPORTED_MODELS.includes(model.id)
    ),
  });

  // Cache for 1 week (604,800 seconds)
  response.headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800');
  
  return response;
}
