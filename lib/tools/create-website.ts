import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";
import * as fs from "fs";
import * as path from "path";

export const createWebsite = tool({
  description: 'Create a complete website with JSX components. This will generate a full website layout with modern styling.',
  inputSchema: z.object({
    description: z.string().min(1).max(500).describe('Description of the website to create (e.g., "landing page for a coffee shop", "portfolio website for a designer")'),
  }),
  execute: async ({ description }) => {
    try {
      // Read site examples to include in prompt
      const examplesPath = path.join(process.cwd(), 'lib/tools/site-examples.tsx');
      const siteExamples = fs.readFileSync(examplesPath, 'utf-8');

      const { text: websiteJsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are a skilled web developer creating modern, responsive websites. You will be given a description and should create a complete website using JSX with Tailwind CSS styling.

Guidelines:
- Create a complete, functional website based on the description
- Use modern Tailwind CSS for styling with beautiful, responsive design
- Include multiple sections (hero, features, testimonials, footer, etc.) as appropriate
- Make the design visually appealing with proper spacing, colors, and typography
- Use semantic HTML elements and proper accessibility practices
- Include interactive elements and hover effects where appropriate
- Make it fully responsive for mobile, tablet, and desktop
- Use modern design patterns like gradients, shadows, and animations
- DO NOT USE ANY ABSOLUTE OR FIXED POSITIONING
- Include appropriate icons and visual elements (you can use emoji or simple SVG-like elements)
- For images, use placeholder services like https://images.unsplash.com/photo-1234567890/800x600 or https://picsum.photos/800/600 that will reliably load. If you need specific images, use descriptive placeholder URLs that will fallback gracefully
- Keep the content relevant to the description provided

Here are some high-quality website examples for inspiration:

${siteExamples}

Return ONLY the complete JSX code wrapped in a single div element. Do not include any markdown formatting or explanations - just the pure JSX code.`,
        prompt: `Create a website for: ${description}`,
      });

      return websiteJsx;
    } catch (error) {
      console.error('Error creating website:', error);
      return { 
        error: 'Failed to create website. Please try with a different description.',
        success: false 
      };
    }
  },
}); 