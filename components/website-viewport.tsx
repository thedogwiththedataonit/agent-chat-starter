"use client";

import { JsxRenderer } from "@/components/ui/jsx-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Code, Eye } from "lucide-react";
import { useState, memo } from "react";

interface WebsiteViewportProps {
  jsx?: string;
  onToggleVisibility: () => void;
}

export const WebsiteViewport = memo(function WebsiteViewport({ 
  jsx, 
  onToggleVisibility 
}: WebsiteViewportProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);

  const viewModeClasses = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-[1024px] mx-auto',
    mobile: 'w-[375px] h-[667px] mx-auto'
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

      {/* Viewport Content */}
      <div className="flex-1 overflow-auto p-4">
        {jsx ? (
          <div className="h-full">
            {showCode ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Generated JSX Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto h-[calc(100%-4rem)]">
                    <code>{jsx}</code>
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                <div className={`${viewModeClasses[viewMode]} overflow-auto`}>
                  <JsxRenderer
                    jsx={jsx}
                    components={{
                      // Add any custom components that might be needed
                    }}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Monitor className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No website generated yet</p>
              <p className="text-sm">Ask the AI to create a website to see it here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});