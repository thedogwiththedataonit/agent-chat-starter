import { tool } from "ai";
import { z } from "zod";
import { generateText } from "ai";
import { gateway } from "../gateway";
import { DEFAULT_MODEL } from "@/lib/constants";

export const editEmail = tool({
  description: 'Edit or modify an existing email created with React Email. Can change colors, content, layout, add sections, or make custom modifications.',
  inputSchema: z.object({
    modification: z.string().min(1).describe('Description of what to modify (e.g., "change the button color to green", "add a footer section", "make the heading more prominent")'),
    currentJsx: z.string().min(1).describe('The current React Email JSX code to modify'),
  }),
  execute: async ({ modification, currentJsx }) => {
    try {
      const { text: modifiedJsx } = await generateText({
        model: gateway(DEFAULT_MODEL),
        system: `You are an expert email developer specializing in React Email modifications. You modify existing React Email code while maintaining email client compatibility and professional design.

REACT EMAIL COMPONENTS (from @react-email/components):
Available components you can use:
- <Html>, <Head>, <Preview>, <Body>
- <Container>, <Section>, <Row>, <Column>
- <Text>, <Heading>, <Button>, <Link>
- <Img>, <Hr>
- <CodeBlock>, <CodeInline>, <Markdown>, <Font>, <Tailwind>

MODIFICATION PRINCIPLES:
- Preserve email client compatibility (600px max width, inline styles)
- Maintain the email's design language while implementing changes
- Use web-safe fonts and high-contrast colors
- Keep layouts simple and email-client friendly
- Ensure all modifications work across Gmail, Outlook, Apple Mail, Yahoo

STYLING REMINDERS:
- Use inline style objects only: style={{ color: '#333', fontSize: '16px' }}
- NO Tailwind CSS or external stylesheets
- Avoid Flexbox/Grid (limited email client support)
- Use proper spacing with padding/margin in style props

WHEN MODIFYING:
- Content changes: Update text while preserving structure
- Color changes: Apply to style props consistently  
- Layout changes: Use React Email components properly
- New sections: Match existing component patterns
- Button changes: Maintain proper href and styling

EMAIL CLIENT SAFETY:
- Test modifications work in all major clients
- Maintain table-based layouts (Container/Section handle this)
- Keep inline styles for reliability
- Preserve <Preview> text if present
- Ensure images have full URLs and alt text

CRITICAL OUTPUT FORMAT:
- Return ONLY the JSX code using React Email component syntax
- Start with <Html> and end with </Html>
- Use proper JSX syntax with React Email components
- DO NOT wrap in markdown code fences (no \`\`\`jsx or \`\`\`)
- DO NOT include any explanatory text before or after the JSX
- DO NOT include import statements - just the JSX
- The response should be valid JSX that can be transformed and rendered

Apply the requested changes while maintaining professional email design and cross-client compatibility.`,
        prompt: `Current email JSX:
${currentJsx}

Modification requested: ${modification}`,
      });

      // Strip any markdown code fences if present
      let cleanedJsx = modifiedJsx.trim();
      if (cleanedJsx.startsWith('```')) {
        // Remove opening fence (```jsx, ```javascript, etc.)
        cleanedJsx = cleanedJsx.replace(/^```[a-z]*\n?/i, '');
        // Remove closing fence
        cleanedJsx = cleanedJsx.replace(/\n?```$/, '');
        cleanedJsx = cleanedJsx.trim();
      }

      return cleanedJsx;
    } catch (error) {
      console.error('Error editing email:', error);
      return { 
        error: 'Failed to edit email. Please try with a different modification request.',
        success: false 
      };
    }
  },
});

