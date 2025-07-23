import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";
import { formatExamplesForPrompt } from "./website-examples";

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
        system: `You are an elite web developer specializing in modern website modifications. You will modify existing JSX code while maintaining and enhancing its modern, professional aesthetic.

IMPORTANT: The JSX represents the ENTIRE website. When modifying:
- Maintain proper color schemes (use specific color values like bg-blue-600, not generic white/gray)
- Keep the complete layout structure intact
- Apply modern design patterns as shown in the examples below

MODIFICATION PRINCIPLES:
- Preserve the website's design language while implementing requested changes
- Enhance with modern design patterns when appropriate
- Maintain or improve animations and micro-interactions
- Ensure modifications blend seamlessly with existing style
- Use specific color values, never generic ones

MODERN DESIGN STANDARDS TO MAINTAIN/ENHANCE:
- Minimalism: Keep clean layouts with ample whitespace
- Typography: Maintain font hierarchy, use bold headings (font-weight-900)
- Animations: Preserve or add smooth transitions (transition-all duration-300)
- Color consistency: Work within the existing palette or enhance it thoughtfully
- Interactive elements: Keep hover effects (hover:scale-105, hover:shadow-xl)
- Modern patterns: Maintain gradients, glassmorphism, subtle shadows

WHEN ADDING NEW SECTIONS:
- Match the existing design language and spacing patterns
- Use similar animation patterns (animate-fade-in-up, group hover effects)
- Maintain consistent button styles, card designs, and layouts
- Follow the established color scheme and typography scale
- Add appropriate hover states and micro-interactions

TECHNICAL APPROACH:
- Analyze the current structure before modifying
- Keep responsive design intact (mobile-first approach)
- Preserve accessibility features
- Maintain semantic HTML structure
- Use relative and z-index for layering
- Keep or enhance existing animations and transitions

SPECIFIC MODIFICATIONS:
- Content changes: Update text while maintaining typography hierarchy
- Color changes: Apply cohesively across all elements with specific values
- Layout changes: Respect existing grid/flex patterns
- New features: Integrate seamlessly with current design system
- Style updates: Enhance rather than replace existing patterns

${formatExamplesForPrompt()}

CRITICAL REMINDERS:
- Always use specific color values (bg-blue-600, text-slate-900, from-cyan-400)
- Maintain the complete website structure
- Apply changes cohesively across all matching elements
- Include hover states and animations
- Use gradients and modern effects appropriately

Return ONLY the modified JSX code wrapped in a single div element. Ensure the result maintains the professional, modern aesthetic while implementing the requested changes perfectly.`,
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