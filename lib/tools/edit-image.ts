import { tool } from "ai";
import { z } from "zod";
import { generateImageServer } from "../nanobanana-server";

/**
 * Extract image URLs from React Email JSX
 */
function extractImageUrls(jsx: string): Array<{ url: string; fullMatch: string; index: number }> {
  const images: Array<{ url: string; fullMatch: string; index: number }> = [];
  
  // Match <Img src="..." /> or <Img src="..." > patterns
  const imgRegex = /<Img[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/gi;
  let match;
  
  while ((match = imgRegex.exec(jsx)) !== null) {
    images.push({
      url: match[1],
      fullMatch: match[0],
      index: match.index
    });
  }
  
  return images;
}

/**
 * Decode a proxied URL to get the original fal.media URL
 */
function decodeProxiedUrl(url: string): string {
  // If it's already a direct URL, return it
  if (url.startsWith('http')) {
    return url;
  }
  
  // Extract from proxy URL: /api/proxy-image?url=...
  const match = url.match(/[?&]url=([^&]+)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }
  
  return url;
}

/**
 * Tool for editing existing images using image-to-image generation
 * Transforms images via nanobanana and returns proxied URLs for email embedding
 */
export const editImage = tool({
  description: 'Edit or transform images within a React Email. Intelligently finds images in the email JSX, applies AI transformations, and returns updated JSX with new image URLs. Use this to modify existing email images (e.g., "make the hero image more vibrant", "change the product image to show a different angle").',
  inputSchema: z.object({
    prompt: z.string().min(1).describe('Description of how to modify the image (e.g., "make it more vibrant and add a blue gradient", "change to a warmer color palette", "add professional lighting")'),
    currentEmailJsx: z.string().min(1).describe('The complete React Email JSX code containing the image(s) to edit'),
    imageSelector: z.enum(['first', 'last', 'all']).default('first').describe('Which image to edit: "first" (hero/header image), "last" (footer image), or "all" (apply to all images)'),
    secondImageUrl: z.string().url().optional().describe('Optional second image URL to blend with the existing image'),
  }),
  execute: async ({ prompt, currentEmailJsx, imageSelector, secondImageUrl }) => {
    try {
      console.log('[EditImage Tool] Editing image with prompt:', prompt);
      console.log('[EditImage Tool] Image selector:', imageSelector);
      
      // Extract all images from the JSX
      const images = extractImageUrls(currentEmailJsx);
      
      if (images.length === 0) {
        return {
          success: false,
          error: 'No images found in the email JSX. Make sure the email contains <Img> components with src attributes.',
        };
      }
      
      console.log('[EditImage Tool] Found', images.length, 'image(s) in JSX');
      
      // Determine which image(s) to edit
      let imagesToEdit: typeof images = [];
      if (imageSelector === 'first') {
        imagesToEdit = [images[0]];
      } else if (imageSelector === 'last') {
        imagesToEdit = [images[images.length - 1]];
      } else if (imageSelector === 'all') {
        imagesToEdit = images;
      }
      
      let updatedJsx = currentEmailJsx;
      const editedImages: Array<{ original: string; new: string; proxied: string }> = [];
      
      // Process each selected image
      for (const img of imagesToEdit) {
        const decodedUrl = decodeProxiedUrl(img.url);
        console.log('[EditImage Tool] Editing image:', decodedUrl);
        
        const result = await generateImageServer({
          mode: "image-editing",
          prompt,
          image1: decodedUrl,
          image2: secondImageUrl,
        });
        
        // Create proxied URL
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(result.url)}`;
        
        console.log('[EditImage Tool] Generated new image:', result.url);
        console.log('[EditImage Tool] Proxied URL:', proxyUrl);
        
        // Replace the old URL with the new proxied URL in the JSX
        updatedJsx = updatedJsx.replace(img.url, proxyUrl);
        
        editedImages.push({
          original: img.url,
          new: result.url,
          proxied: proxyUrl,
        });
      }
      
      console.log('[EditImage Tool] Successfully edited', editedImages.length, 'image(s)');
      
      return {
        success: true,
        updatedEmailJsx: updatedJsx,
        editedImages,
        imagesProcessed: editedImages.length,
        prompt: prompt,
        message: `Successfully edited ${editedImages.length} image(s). The email JSX has been updated with new image URLs.`,
      };
    } catch (error) {
      console.error('[EditImage Tool] Error editing image:', error);
      return { 
        success: false,
        error: 'Failed to edit image. Please verify the email JSX is valid and contains accessible image URLs.',
      };
    }
  },
});

