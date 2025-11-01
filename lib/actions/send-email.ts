'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { renderJsxToHtml } from '@/lib/render-jsx';

const sendEmailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  from: z.string().min(1, 'From email is required'),
  to: z.string().min(1, 'To email is required'),
  replyTo: z.string().optional(),
  jsx: z.string().min(1, 'Email content is required'),
});

export async function sendEmail(formData: FormData) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    console.log('[Send Email] Config check:', {
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 7) + '...' : 'none',
    });
    
    if (!apiKey) {
      console.error('[Send Email] No API key found in environment variables');
      return {
        success: false,
        error: 'Resend API key not configured. Add RESEND_API_KEY to your environment variables.',
      };
    }

    // Parse and validate form data
    const data = {
      subject: formData.get('subject') as string,
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      replyTo: (formData.get('replyTo') as string) || undefined,
      jsx: formData.get('jsx') as string,
    };

    console.log('[Send Email] Form data:', {
      subject: data.subject,
      from: data.from,
      to: data.to,
      hasJsx: !!data.jsx,
    });

    const validated = sendEmailSchema.parse(data);

    // Transform the JSX string into HTML using the same logic as the preview
    console.log('[Send Email] Rendering JSX to HTML...');
    const html = await renderJsxToHtml(validated.jsx);
    
    console.log('[Send Email] Rendered HTML length:', html.length);

    // Send email via Resend
    const resend = new Resend(apiKey);
    const toEmails = validated.to.split(',').map((email) => email.trim());

    console.log('[Send Email] Sending to:', toEmails);
    console.log('[Send Email] From:', validated.from);
    console.log('[Send Email] Subject:', validated.subject);

    const result = await resend.emails.send({
      to: toEmails,
      from: validated.from,
      replyTo: validated.replyTo,
      subject: validated.subject,
      html,
    });

    console.log('[Send Email] Resend result:', {
      error: result.error,
      data: result.data,
    });

    if (result.error) {
      console.error('[Send Email] Resend error:', result.error);
      
      // Provide helpful error messages
      let errorMessage = result.error.message;
      
      if (errorMessage.includes('not verified') || errorMessage.includes('verify')) {
        errorMessage = `The "From" email is not verified. Use "onboarding@resend.dev" for testing, or verify your domain at https://resend.com/domains`;
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }

    console.log('[Send Email] Success! Email ID:', result.data?.id);

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('[Send Email] Exception:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => e.message).join(', '),
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

