import { NextResponse } from "next/server";
import { SUPPORTED_MODELS } from "@/lib/constants";

export async function GET() {
  // Return curated list of supported models
  // Note: Dynamic model discovery via gateway.getAvailableModels() 
  // can have validation issues with some model specifications
  const models = SUPPORTED_MODELS.map((id) => {
    const [provider, modelName] = id.split('/');
    return {
      id,
      name: modelName || id,
      provider,
      description: `${modelName} by ${provider}`,
    };
  });

  return NextResponse.json({
    models,
  });
}