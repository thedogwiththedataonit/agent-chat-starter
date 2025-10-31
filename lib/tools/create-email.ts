import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";
import { formatEmailExamplesForPrompt } from "./email-examples";

export const createEmail = tool({
  description: 'Create a complete email using React Email components. This will generate a professional email with modern styling.',
  inputSchema: z.object({
    description: z.string().min(1).describe('Description of the email to create (e.g., "welcome email for new users", "promotional email for Black Friday sale")'),
    referenceImageUrl: z.string().url().optional().describe('Optional URL of a screenshot to use as visual reference for the email design'),
  }),
  execute: async ({ description, referenceImageUrl }) => {
    try {
      // Create the content array for the LLM call
      const contentParts: Array<{ type: 'text'; text: string } | { type: 'image'; image: URL }> = [
        { 
          type: 'text' as const, 
          text: `Create an email for: ${description}${referenceImageUrl ? '\n\nUse the provided screenshot as visual reference while adapting the content to match the description provided.' : ''}`
        }
      ];

      // Add reference image if provided
      if (referenceImageUrl) {
        contentParts.push({
          type: 'image' as const,
          image: new URL(referenceImageUrl)
        });
      }

      const { text: emailJsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are an expert email developer specializing in React Email. You create beautiful, responsive emails that work perfectly across all email clients${referenceImageUrl ? ' based on the user\'s description and the provided reference screenshot image' : ''}.

REACT EMAIL COMPONENTS (from @react-email/components):
You MUST use these exact component names from the React Email library:

Core Structure:
- <Html> - Root wrapper for the entire email
- <Head> - Document head (use inside Html)
- <Preview> - Preview text shown in inbox (use inside Head)
- <Body> - Main email body content

Layout Components:
- <Container> - Centered container, use maxWidth="600px" for emails
- <Section> - Semantic section for organizing content blocks
- <Row> - Horizontal row for multi-column layouts
- <Column> - Column within a Row for grid layouts

Content Components:
- <Text> - Paragraph text content
- <Heading> - Heading text (h1-h6)
- <Button> - Call-to-action button with href prop
- <Link> - Inline text link with href prop
- <Img> - Images with src, alt, width, height
- <Hr> - Horizontal divider line

Special Components:
- <CodeBlock> - Code snippets with syntax highlighting
- <CodeInline> - Inline code text
- <Markdown> - Render markdown content
- <Font> - Custom font loading
- <Tailwind> - Tailwind CSS support (optional)

IMPORTANT EMAIL DESIGN PRINCIPLES:
- Emails should be 600px max width (use Container maxWidth="600px")
- Use inline styles or React Email's style prop (NO Tailwind CSS)
- Use web-safe fonts: Arial, Helvetica, Georgia, Times New Roman, Verdana
- Keep layouts simple and single-column when possible
- Use tables for complex layouts (React Email handles this)
- All images must have full URLs (no relative paths)
- Include alt text for all images
- Use high contrast colors for text readability
- Mobile-responsive design is handled by React Email components

STRUCTURE YOUR EMAIL:
1. Start with <Html> and <Head> with <Preview> text
2. Use <Body> with appropriate background color
3. Main content in <Container maxWidth="600px">
4. Organize with <Section> components
5. Use proper spacing with padding/margin in style props
6. Include clear call-to-action <Button> elements

STYLING GUIDELINES:
- Use inline style objects: style={{ color: '#333', fontSize: '16px' }}
- Common patterns:
  - Headings: { fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px' }
  - Body text: { fontSize: '16px', lineHeight: '24px', color: '#333' }
  - Buttons: { backgroundColor: '#007bff', color: '#fff', padding: '12px 24px', borderRadius: '4px' }
  - Containers: { padding: '20px', backgroundColor: '#ffffff' }

COMMON EMAIL TYPES & PATTERNS:
- Welcome emails: Hero section, introduction, key features, CTA
- Promotional: Eye-catching header, product/offer details, urgency, CTA
- Transactional: Clear subject, order/action details, next steps
- Newsletter: Header, multiple content sections, footer with links
- Confirmation: Order/booking details, summary, contact info
${referenceImageUrl ? `
REFERENCE IMAGE USAGE:
- Use the provided screenshot as visual reference for colors, layout, typography, and style
- Recreate the visual hierarchy and spacing shown in the screenshot
- Match the color scheme and design approach as closely as possible
- Adapt the content to fit the user's description while maintaining the visual style
- Analyze the screenshot to understand design patterns and component layouts` : ''}

EMAIL CLIENT COMPATIBILITY:
- Tested to work with Gmail, Outlook, Apple Mail, Yahoo Mail
- Avoid: CSS Grid, Flexbox (limited support), absolute positioning
- Stick to: Tables (Container/Section handle this), inline styles, simple layouts

${formatEmailExamplesForPrompt()}

CRITICAL OUTPUT FORMAT:
- Return ONLY the JSX code using React Email component syntax
- Start with <Html> and end with </Html>
- Use proper JSX syntax with React Email components
- DO NOT wrap in markdown code fences (no \`\`\`jsx or \`\`\`)
- DO NOT include any explanatory text before or after the JSX
- DO NOT include import statements - just the JSX
- DO NOT include TypeScript interfaces or export statements
- The response should be ONLY the JSX element tree starting with <Html>

FOLLOW THE EXAMPLES ABOVE - they show production-quality patterns from Stripe, Linear, Notion, Vercel, and AWS.

Create a professional, modern email inspired by these real-world examples that renders perfectly across all email clients.`,
        messages: [
          {
            role: 'user',
            content: contentParts
          }
        ],
      });

      // Strip any markdown code fences if present
      let cleanedJsx = emailJsx.trim();
      if (cleanedJsx.startsWith('```')) {
        // Remove opening fence (```jsx, ```javascript, etc.)
        cleanedJsx = cleanedJsx.replace(/^```[a-z]*\n?/i, '');
        // Remove closing fence
        cleanedJsx = cleanedJsx.replace(/\n?```$/, '');
        cleanedJsx = cleanedJsx.trim();
      }

      return cleanedJsx;
    } catch (error) {
      console.error('Error creating email:', error);
      return { 
        error: 'Failed to create email. Please try with a different description.',
        success: false 
      };
    }
  },
});

