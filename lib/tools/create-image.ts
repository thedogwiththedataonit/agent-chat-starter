import { tool } from "ai";
import { z } from "zod";
import { generateImageServer } from "../nanobanana-server";
import { uploadUrlToBlob } from "../blob";

/**
 * Tool for creating images using text-to-image generation
 * Generates images via nanobanana, uploads to blob storage, and returns blob URLs for email embedding
 */
export const createImage = tool({
  description: 'Generate a new image from a text description using AI image generation. Returns a blob storage URL that can be embedded directly in emails. Use this when you need custom images, illustrations, or visuals for the email content.',
  inputSchema: z.object({
    prompt: z.string().min(1).describe('Detailed description of the image to generate (e.g., "a modern tech startup office with people collaborating", "a minimalist product hero image with gradient background")'),
    aspectRatio: z.enum(["16:9", "3:2", "1:1", "4:3"]).optional().describe('Aspect ratio for the generated image. Use 16:9 for hero images, 1:1 for square logos/icons, 3:2 for general content'),
  }),
  execute: async ({ prompt, aspectRatio }) => {
    try {
      console.log('[CreateImage Tool] Generating image with prompt:', prompt);
      
      const result = await generateImageServer({
        mode: "text-to-image",
        prompt,
        aspectRatio: aspectRatio || "16:9",
      });

      console.log('[CreateImage Tool] Image generated successfully');
      console.log('[CreateImage Tool] Original URL:', result.url);

      // Upload to Vercel Blob storage for permanent hosting
      const timestamp = Date.now();
      const fileName = `generated-image-${timestamp}.png`;
      const blobUrl = await uploadUrlToBlob(result.url, fileName);
      
      console.log('[CreateImage Tool] Uploaded to blob storage');
      console.log('[CreateImage Tool] Blob URL:', blobUrl);

      return {
        success: true,
        imageUrl: blobUrl,
        blobUrl: blobUrl,
        originalUrl: result.url,
        prompt: result.prompt,
        description: result.description,
        aspectRatio: aspectRatio || "16:9",
        message: `Image generated and uploaded successfully. Use this URL in your email's <Img> component: <Img src="${blobUrl}" alt="${prompt}" width="600" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />`
      };
    } catch (error) {
      console.error('[CreateImage Tool] Error generating image:', error);
      return { 
        success: false,
        error: 'Failed to generate image. Please try with a different prompt or check if the nanobanana service is available.',
      };
    }
  },
});

