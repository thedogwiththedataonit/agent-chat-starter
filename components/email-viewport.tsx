"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Code, Eye, Mail } from "lucide-react";
import { useState, memo, useEffect, useRef } from "react";
import { SendEmailDialog } from "@/components/send-email-dialog";

interface EmailViewportProps {
  jsx?: string;
  onToggleVisibility: () => void;
}

export const EmailViewport = memo(function EmailViewport({ 
  jsx, 
  onToggleVisibility 
}: EmailViewportProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [html, setHtml] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!jsx) {
      setHtml("");
      return;
    }

    console.log('Email Viewport received JSX:', jsx);

    // Render the JSX to HTML via API route
    const renderEmail = async () => {
      try {
        console.log('Calling render-email API...');
        const response = await fetch('/api/render-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsx }),
        });

        console.log('API response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error response:', errorData);
          throw new Error(errorData.details || 'Failed to render email');
        }

        const data = await response.json();
        console.log('Received HTML from API, length:', data.html?.length);
        
        if (!data.html) {
          throw new Error('No HTML returned from API');
        }
        
        // Wrap in a nice container with proper email styling
        const wrappedHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
    </style>
  </head>
  <body>
    ${data.html}
  </body>
</html>`;

        console.log('Setting wrapped HTML in viewport');
        setHtml(wrappedHtml);
      } catch (error) {
        console.error('Error rendering email:', error);
        // Fallback to showing JSX code with error details
        const errorMessage = error instanceof Error ? error.message : String(error);
        const fallbackHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; padding: 20px; background: #f5f5f5; font-family: monospace; }
      .error { background: #fee; border: 2px solid #fcc; padding: 20px; border-radius: 8px; color: #c00; margin-bottom: 20px; }
      pre { background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 6px; overflow-x: auto; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="error">
      <h3>⚠️ Error rendering email</h3>
      <p><strong>Error:</strong> ${errorMessage}</p>
      <p>Could not render the email preview. The generated JSX is shown below:</p>
    </div>
    <pre><code>${jsx.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </body>
</html>`;
        setHtml(fallbackHtml);
      }
    };

    renderEmail();
  }, [jsx]);

  // Update iframe content when HTML changes or when toggling back to preview
  useEffect(() => {
    if (iframeRef.current && html && !showCode) {
      console.log('Updating iframe with HTML, length:', html.length);
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
        console.log('Iframe content updated successfully');
      } else {
        console.error('Could not access iframe contentDocument');
      }
    } else {
      console.log('Skipping iframe update - iframeRef:', !!iframeRef.current, 'html length:', html?.length || 0, 'showCode:', showCode);
    }
  }, [html, showCode]);

  const viewModeClasses = {
    desktop: 'w-full h-full',
    mobile: 'w-[375px] h-full mx-auto border-x border-gray-300'
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Viewport Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="h-8 w-8 p-0"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Toggle Code View */}
          <Button
            variant={showCode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="h-8 w-8 p-0"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Send Email Button */}
          <SendEmailDialog jsx={jsx} />
          
          {/* Close Viewport Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Viewport Content */}
      <div className="flex-1 overflow-auto p-4">
        {jsx ? (
          <div className="h-full">
            {showCode ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">React Email JSX Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto h-[calc(100%-4rem)]">
                    <code>{jsx}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                <div className={`${viewModeClasses[viewMode]} overflow-auto h-full`}>
                  <iframe
                    ref={iframeRef}
                    title="Email Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No email generated yet</p>
              <p className="text-sm">Ask the AI to create an email to see it here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
