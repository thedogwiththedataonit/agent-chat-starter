import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";


export const createWebsite = tool({
  description: 'Create a complete website with JSX components. This will generate a full website layout with modern styling. Can optionally use a reference URL to base the design on.',
  inputSchema: z.object({
    description: z.string().min(1).max(500).describe('Description of the website to create (e.g., "landing page for a coffee shop", "portfolio website for a designer")'),
    referenceUrl: z.string().url().optional().describe('Optional URL of a website to use as visual reference for the design'),
    referenceTitle: z.string().optional().describe('Optional title of the reference website for context'),
    referenceDescription: z.string().optional().describe('Optional description of the reference website for context'),
  }),
  execute: async ({ description, referenceUrl, referenceTitle, referenceDescription }) => {
    try {
      // If a reference URL is provided, take a screenshot first
      let screenshotUrl = '';
      if (referenceUrl) {
        try {
          const { takeWebsiteScreenshot } = await import('./website-screenshot');
          const screenshotData = await takeWebsiteScreenshot(referenceUrl);
          if (screenshotData.status === 'success') {
            screenshotUrl = screenshotData.data.screenshot.url;
          }
        } catch (error) {
          console.error('Error taking screenshot for reference:', error);
        }
      }

      const messages = [
        {
          role: 'user' as const,
          content: [
            { 
              type: 'text' as const, 
              text: `Create a website for: ${description}${referenceTitle ? `
Reference website title: ${referenceTitle}` : ''}${referenceDescription ? `
Reference website description: ${referenceDescription}` : ''}

${screenshotUrl ? 'Use the screenshot as visual reference while adapting the content to match the description provided.' : ''}`
            },
            ...(screenshotUrl ? [{
              type: 'image' as const,
              image: new URL(screenshotUrl)
            }] : [])
          ]
        }
      ];

      const { text: jsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are a creative web developer. Generate a complete, modern, responsive website in JSX format based on the user's description${screenshotUrl ? ' and the provided reference screenshot image' : ''}. 

Guidelines:
- Create a full single-page website with multiple sections (header, hero, features/services, testimonials, contact, footer)
- Use modern Tailwind CSS classes for styling
- Make it responsive with proper mobile/desktop breakpoints
- Include realistic content that fits the description
- Use semantic HTML elements
- Add hover effects and transitions
- Make the design visually appealing and professional
- Include proper navigation and call-to-action buttons
- Use appropriate icons (SVG) and placeholder images if needed
- Ensure the color scheme is cohesive and modern
- Make it engaging and interactive with proper UX
- DO NOT USE ANY ABSOLUTE OR FIXED POSITIONING
${screenshotUrl ? `
- IMPORTANT: Use the provided screenshot image as visual reference for layout, colors, typography, and overall design style
- Recreate the visual hierarchy, spacing, and design elements shown in the screenshot
- Match the color scheme and styling approach as closely as possible
- Adapt the content to fit the user's description while maintaining the visual style from the screenshot
- Analyze the screenshot carefully to understand the design patterns, component layouts, and visual elements` : ''}

Return ONLY the JSX code wrapped in a single div element. Do not include any markdown formatting or explanations - just the pure JSX code.`,
        messages,
      });

      return jsx;
    } catch (error) {
      console.error('Error creating website:', error);
      return { error: 'Failed to create website. Please try again with a different description.' };
    }
  },
}); 