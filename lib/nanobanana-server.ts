/**
 * Server-side nanobanana image generation
 * Used by agent tools to generate images
 * Calls fal.ai directly without going through API routes
 */

import { fal } from "@fal-ai/client"

// Configure fal with API key
fal.config({
  credentials: process.env.FAL_KEY,
})

export type NanobananaMode = "text-to-image" | "image-editing"
export type AspectRatio = "16:9" | "3:2" | "1:1" | "4:3"

export interface GenerateImageServerParams {
  mode: NanobananaMode
  prompt: string
  aspectRatio?: AspectRatio
  image1?: string // URL for server-side processing
  image2?: string // URL for server-side processing
}

export interface GeneratedImageResult {
  url: string
  prompt: string
  description?: string
}

/**
 * Generates an image using the nanobanana API (server-side)
 * This is called by agent tools and directly calls fal.ai
 */
export const generateImageServer = async (
  params: GenerateImageServerParams
): Promise<GeneratedImageResult> => {
  const { mode, prompt, aspectRatio, image1, image2 } = params

  console.log('[NanobananaServer] Generating image with prompt:', prompt)
  console.log('[NanobananaServer] Mode:', mode)
  console.log('[NanobananaServer] Aspect Ratio:', aspectRatio)

  try {
    let result: any

    if (mode === "text-to-image") {
      console.log('[NanobananaServer] Using text-to-image mode')

      const input: any = {
        prompt: prompt,
        num_images: 1,
        output_format: "png",
      }

      // Add aspect ratio if specified
      if (aspectRatio) {
        input.aspect_ratio = aspectRatio
      }

      result = await fal.subscribe("fal-ai/nano-banana", {
        input,
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs?.map((log) => log.message).forEach(console.log)
          }
        },
      })
    } else if (mode === "image-editing") {
      console.log('[NanobananaServer] Using image-editing mode')

      // Build image URLs array for editing
      const imageUrls: string[] = []
      
      if (image1) {
        imageUrls.push(image1)
        console.log('[NanobananaServer] Using Image1 URL:', image1)
      }
      
      if (image2) {
        imageUrls.push(image2)
        console.log('[NanobananaServer] Using Image2 URL:', image2)
      }

      if (imageUrls.length === 0) {
        throw new Error('At least one image URL is required for editing mode')
      }

      // Reverse order to match API route behavior
      imageUrls.reverse()

      console.log('[NanobananaServer] Total images for editing:', imageUrls.length)

      result = await fal.subscribe("fal-ai/nano-banana/edit", {
        input: {
          prompt: prompt,
          image_urls: imageUrls,
          output_format: "png",
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs?.map((log) => log.message).forEach(console.log)
          }
        },
      })
    } else {
      throw new Error(`Unsupported mode: ${mode}`)
    }

    console.log('[NanobananaServer] Raw result from fal.ai:', result)

    if (!result || !result.data || !result.data.images || result.data.images.length === 0) {
      console.error('[NanobananaServer] Invalid result structure:', result)
      throw new Error("No images generated - invalid response from fal.ai")
    }

    const imageUrl = result.data.images[0].url

    if (!imageUrl) {
      console.error('[NanobananaServer] No URL in result:', result)
      throw new Error("No image URL in response")
    }

    console.log('[NanobananaServer] Image generated successfully:', imageUrl)

    return {
      url: imageUrl,
      prompt: prompt,
      description: `Generated with nanobanana: ${prompt}`,
    }
  } catch (error) {
    console.error('[NanobananaServer] Error generating image:', error)
    throw error
  }
}

