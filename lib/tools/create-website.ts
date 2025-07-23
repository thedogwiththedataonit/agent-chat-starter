import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";

export const createWebsite = tool({
  description: 'Create a complete website with JSX components. This will generate a full website layout with modern styling.',
  inputSchema: z.object({
    description: z.string().min(1).describe('Description of the website to create (e.g., "landing page for a coffee shop", "portfolio website for a designer")'),
  }),
  execute: async ({ description }) => {
    try {
      const { text: websiteJsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are an elite web developer creating cutting-edge, modern websites that exemplify contemporary design trends. You will create a complete website using JSX with Tailwind CSS styling.

MODERN DESIGN PRINCIPLES:
- Embrace minimalism: Use plenty of whitespace, clean layouts, and focused content
- Typography-first design: Use large, bold headings with excellent font hierarchy (use font-weight-900 for impact)
- Subtle animations: Add smooth transitions, hover effects, and micro-interactions using Tailwind's animation classes
- Modern color schemes: Use neutral backgrounds (white, gray-50) with bold accent colors, or sophisticated dark themes
- Glassmorphism and subtle shadows: Use backdrop-blur, subtle drop shadows, and layered depth
- Gradient accents: Incorporate subtle gradients for buttons, backgrounds, or text (bg-gradient-to-r, text-transparent bg-clip-text)
- Smooth scrolling sections with intersection observer effects (use animation delays)

ANIMATION & INTERACTION GUIDELINES:
- Use transition-all duration-300 ease-in-out for smooth transitions
- Add hover:scale-105 or hover:scale-110 for interactive elements
- Implement hover:shadow-xl for cards and buttons
- Use group hover effects for complex interactions
- Add animate-fade-in-up or animate-slide-in for section reveals
- Include subtle parallax effects with transform styles
- Use peer classes for advanced interactive states

LAYOUT & COMPONENTS:
- Hero sections: Full viewport height with bold statements, subtle animations, and clear CTAs
- Feature cards: Minimal with icons, hover effects, and consistent spacing
- Navigation: Sticky/fixed with backdrop-blur, smooth scroll behavior
- Buttons: Rounded with gradients or solid colors, clear hover states, and shadows
- Sections: Clear separation with alternating backgrounds or subtle borders
- Footer: Minimal with essential links and modern social icons

TECHNICAL REQUIREMENTS:
- Mobile-first responsive design using Tailwind's responsive prefixes
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Implement smooth scroll behavior
- Use CSS Grid and Flexbox for modern layouts
- NO absolute or fixed positioning except for navigation
- Use relative and z-index for layering
- Include custom animations using Tailwind's arbitrary values when needed

STYLING SPECIFICS:
- Fonts: Use font-sans with varying weights (light, normal, semibold, bold, black)
- Spacing: Consistent use of Tailwind's spacing scale (p-8, mt-16, gap-6)
- Borders: Subtle (border-gray-200) or none, with rounded corners (rounded-lg, rounded-2xl)
- Colors: Cohesive palette with primary, secondary, and neutral tones
- Icons: Use Heroicons notation or elegant Unicode symbols (→, ✓, ★, ◆)

Return ONLY the complete JSX code wrapped in a single div element. Create a stunning, professional website that would impress on awwwards or dribbble.`,
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