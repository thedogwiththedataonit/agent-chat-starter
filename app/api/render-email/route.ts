import { NextRequest } from 'next/server';
import { renderJsxToHtml } from '@/lib/render-jsx';

export async function POST(req: NextRequest) {
  try {
    const { jsx } = await req.json();
    
    console.log('[Render Email API] Received JSX length:', jsx?.length);
    
    if (!jsx) {
      return new Response(
        JSON.stringify({ error: 'No JSX provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use the shared rendering utility (with pretty formatting for preview)
    const html = await renderJsxToHtml(jsx, { pretty: true });

    console.log('[Render Email API] Successfully rendered HTML, length:', html.length);
    console.log('[Render Email API] HTML preview (first 500 chars):', html.substring(0, 500));

    return new Response(
      JSON.stringify({ html }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Render Email API] Error rendering email:', error);
    console.error('[Render Email API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return new Response(
      JSON.stringify({ 
        error: 'Failed to render email', 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
