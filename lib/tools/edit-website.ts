import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";

export const editWebsite = tool({
  description: 'Edit or modify an existing website JSX. Can change colors, content, layout, add sections, or make custom modifications.',
  inputSchema: z.object({
    modification: z.string().min(1).describe('Description of what to modify (e.g., "change the hero title to Welcome to My Store", "make the color scheme green", "add a testimonials section")'),
    currentJsx: z.string().min(1).describe('The current JSX code of the website to modify'),
  }),
  execute: async ({ modification, currentJsx }) => {
    try {
      const { text: modifiedJsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are a web developer helping to modify an existing website. You will be given the current JSX code and a description of what changes to make.

Guidelines:
- Analyze the current JSX and understand its structure
- Apply the requested modifications precisely
- Maintain the overall structure and functionality of the site
- Keep the same styling approach (Tailwind CSS)
- Ensure the modifications are well-integrated with the existing design
- Make responsive and modern design choices
- Keep existing sections that aren't being modified
- If adding new sections, make them consistent with the existing style
- DO NOT USE ANY ABSOLUTE OR FIXED POSITIONING
- For any new images, use placeholder services like https://images.unsplash.com/photo-1234567890/800x600 or https://picsum.photos/800/600 that will reliably load. If you need specific images, use descriptive placeholder URLs that will fallback gracefully

Return ONLY the modified JSX code wrapped in a single div element. Do not include any markdown formatting or explanations - just the pure JSX code.`,
        prompt: `Current website JSX:
${currentJsx}

Modification requested: ${modification}`,
      });

      return modifiedJsx;
    } catch (error) {
      console.error('Error editing website:', error);
      return { 
        error: 'Failed to edit website. Please try with a different modification request.',
        success: false 
      };
    }
  },
}); 