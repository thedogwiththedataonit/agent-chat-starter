"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SendIcon, WrenchIcon } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { DEFAULT_MODEL } from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { WebsiteViewport } from "@/components/website-viewport";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Simple badge component
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        className
      )}
    >
      {children}
    </span>
  );
}

// Tool call badge with dialog
function ToolCallBadge({ toolName, part }: { 
  toolName: string; 
  part: {
    type: string;
    toolCallId?: string;
    state?: string;
    input?: unknown;
    output?: unknown;
    [key: string]: unknown;
  };
}) {

  console.log(part);
  const formatForDisplay = (value: unknown): string => {
    if (typeof value === 'string') {
      return value;
    }
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  return (
    <Dialog>
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div className="flex items-center gap-1">
        <Badge className="flex items-center gap-1">
          <WrenchIcon className="h-3 w-3" />
          {toolName}
        </Badge>
        {
          part.output && typeof part.output === 'object' && part.output !== null && 'path' in part.output ? (
            <p className="text-sm text-muted-foreground">
              {String((part.output as { path?: string }).path)}
            </p>
          ) : null
        }
        </div>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            View Details <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-[80vw] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Tool Call: {toolName}</DialogTitle>
          <DialogDescription>
            Details for the {toolName} tool execution
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">

          {part.output ? (
            <div className="flex flex-col gap-2">
              {typeof part.output === 'object' && part.output !== null && 'path' in part.output && part.output.path ? (
                <h4 className="font-semibold mb-2">Path: /{String(part.output.path)}</h4>
              ) : (
                <h4 className="font-semibold mb-2">Action: {typeof part.output === 'object' && part.output !== null && 'action' in part.output ? String(part.output.action) : 'Unknown'}</h4>
              )}
              <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                {(() => {
                  if (typeof part.output === 'object' && part.output !== null && 'output' in part.output) {
                    return formatForDisplay((part.output as { output: unknown }).output);
                  }
                  if (typeof part.output === 'object' && part.output !== null && 'action' in part.output) {
                    return formatForDisplay((part.output as { action: unknown }).action);
                  }
                  return formatForDisplay(part.output);
                })()}
              </pre>
            </div>
          ) : null}
          {part.state && (
            <div>
              <h4 className="font-semibold mb-2">State:</h4>
              <Badge className={part.state === 'output-available' ? 'bg-green-500' : 'bg-yellow-500'}>
                {String(part.state)}
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ModelSelectorHandler({
  modelId,
  onModelIdChange,
}: {
  modelId: string;
  onModelIdChange: (newModelId: string) => void;
}) {
  const router = useRouter();

  const handleSelectChange = (newModelId: string) => {
    onModelIdChange(newModelId);
    const params = new URLSearchParams();
    params.set("modelId", newModelId);
    router.push(`?${params.toString()}`);
  };

  return <ModelSelector modelId={modelId} onModelChange={handleSelectChange} />;
}

export function ChatWithViewport({ modelId = DEFAULT_MODEL }: { modelId: string }) {
  const [input, setInput] = useState("");
  const [currentModelId, setCurrentModelId] = useState(modelId);
  const [isViewportVisible, setIsViewportVisible] = useState(false);

  const handleModelIdChange = useCallback((newModelId: string) => {
    setCurrentModelId(newModelId);
  }, []);

  const toggleViewportVisibility = useCallback(() => {
    setIsViewportVisible(!isViewportVisible);
  }, [isViewportVisible]);

  const { messages, error, sendMessage, regenerate } = useChat({
    maxSteps: 25,
  });

  console.log(messages);

  // Create a stable hash of just the tool outputs to prevent rerenders during text streaming
  const websiteToolHash = useMemo(() => {
    const toolOutputs: string[] = [];
    for (const message of messages) {
      for (const part of message.parts) {
        if ((part.type === "tool-createWebsite" || part.type === "tool-editWebsite") && 'output' in part && part.output) {
          const partWithOutput = part as typeof part & { output: unknown };
          if (typeof partWithOutput.output === 'string' && partWithOutput.output.trim()) {
            toolOutputs.push(`${part.type}:${partWithOutput.output}`);
          }
        }
      }
    }
    return toolOutputs.join('|');
  }, [messages]);

  // Extract the latest website from createWebsite or editWebsite tool calls
  const websiteToolCalls = useMemo(() => {
    const toolCalls: Array<{ type: string; output: string }> = [];
    
    for (const message of messages) {
      for (const part of message.parts) {
        if ((part.type === "tool-createWebsite" || part.type === "tool-editWebsite") && 'output' in part && part.output) {
          // Type guard to ensure we have the right part type with output
          const partWithOutput = part as typeof part & { output: unknown };
          if (typeof partWithOutput.output === 'string' && partWithOutput.output.trim()) {
            toolCalls.push({ type: part.type, output: partWithOutput.output });
          }
        }
      }
    }
    
    return toolCalls;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteToolHash]);

  // Extract the latest website from the stable tool calls array
  const latestWebsite = useMemo(() => {
    if (websiteToolCalls.length === 0) return null;
    
    const lastToolCall = websiteToolCalls[websiteToolCalls.length - 1];
    const foundWebsite = {
      jsx: lastToolCall.output,
      description: lastToolCall.type === "tool-editWebsite" ? 'Edited Website' : 'Generated Website'
    };
    
    // Show viewport automatically when a website is created or edited
    if (foundWebsite && !isViewportVisible) {
      setIsViewportVisible(true);
    }
    
    return foundWebsite;
  }, [websiteToolCalls, isViewportVisible]);

  if (!isViewportVisible || !latestWebsite) {
    // When viewport is not visible or no website exists, show only the chat with full width
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-[900px] m-auto px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  v0
                </h1>
                <ModelSelectorHandler
                  modelId={modelId}
                  onModelIdChange={handleModelIdChange}
                />
              </div>
            </div>
          </div>

          <div className="grid h-full grid-rows-[1fr_auto] max-w-[900px] m-auto w-full">
            {/* Messages */}
            <div className="flex flex-col-reverse gap-6 p-8 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                      What can I help you build?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[600px]">
                      Describe your vision and I'll help bring it to life with code.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-[700px]">
                    {[
                      "Create a landing page for a SaaS product",
                      "Build a pricing card component",
                      "Design a modern dashboard layout",
                      "Make a responsive navigation menu"
                    ].map((example, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(example);
                        }}
                        className="p-4 text-left rounded-lg border bg-card hover:bg-accent/50 transition-colors text-sm"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.toReversed().map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "rounded-lg",
                      m.role === "user" &&
                        "bg-muted/50 border p-4 ml-auto max-w-[85%]",
                      m.role === "assistant" && "space-y-3"
                    )}
                  >
                    {m.parts.map((part, i) => {
                      // Check if this is a tool call part (starts with "tool-")
                      if (part.type.startsWith("tool-")) {
                        const toolName = part.type.substring(5); // Remove "tool-" prefix
                        return <ToolCallBadge key={`${m.id}-${i}`} toolName={toolName} part={part} />;
                      }

                      switch (part.type) {
                        case "text":
                          return (
                            <div key={`${m.id}-${i}`} className="prose prose-sm dark:prose-invert max-w-none">
                              <MarkdownContent
                                id={`message-${m.id}-part-${i}`}
                                content={part.text}
                              />
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                ))
              )}
            </div>

            {error && (
              <div className="px-8 pb-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    An error occurred while generating the response.
                  </AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => regenerate()}
                  >
                    Retry
                  </Button>
                </Alert>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage({ text: input }, { body: { modelId: currentModelId } });
                setInput("");
              }}
              className="flex justify-center px-8 pt-4 pb-8"
            >
              <Card className="w-full shadow-lg border-2">
                <CardContent className="flex items-center gap-2 p-3">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      name="prompt"
                      placeholder="Describe what you want to build..."
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      autoFocus
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                      onKeyDown={(e) => {
                        if (e.metaKey && e.key === "Enter") {
                          sendMessage(
                            { text: input },
                            { body: { modelId: currentModelId } }
                          );
                          setInput("");
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      disabled={!input.trim()}
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>

        {/* Website Viewport - only show toggle button if website exists */}
        {latestWebsite && (
          <WebsiteViewport
            jsx={latestWebsite.jsx}
            onToggleVisibility={toggleViewportVisibility}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={30}
          minSize={15}
          maxSize={50}
          className="flex flex-col"
        >
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  v0
                </h1>
                <ModelSelectorHandler
                  modelId={modelId}
                  onModelIdChange={handleModelIdChange}
                />
              </div>
            </div>
          </div>

          <div className="grid h-full grid-rows-[1fr_auto] w-full">
            {/* Messages */}
            <div className="flex flex-col-reverse gap-6 p-6 overflow-y-auto">
              {messages.toReversed().map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "rounded-lg",
                    m.role === "user" &&
                      "bg-muted/50 border p-3 ml-auto max-w-[85%]",
                    m.role === "assistant" && "space-y-3"
                  )}
                >
                  {m.parts.map((part, i) => {
                    // Check if this is a tool call part (starts with "tool-")
                    if (part.type.startsWith("tool-")) {
                      const toolName = part.type.substring(5); // Remove "tool-" prefix
                      return <ToolCallBadge key={`${m.id}-${i}`} toolName={toolName} part={part} />;
                    }

                    switch (part.type) {
                      case "text":
                        return (
                          <div key={`${m.id}-${i}`} className="prose prose-sm dark:prose-invert max-w-none">
                            <MarkdownContent
                              id={`message-${m.id}-part-${i}`}
                              content={part.text}
                            />
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
            </div>

            {error && (
              <div className="px-6 pb-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    An error occurred while generating the response.
                  </AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => regenerate()}
                  >
                    Retry
                  </Button>
                </Alert>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage({ text: input }, { body: { modelId: currentModelId } });
                setInput("");
              }}
              className="flex justify-center px-6 pt-4 pb-6"
            >
              <Card className="w-full shadow-lg border-2">
                <CardContent className="flex items-center gap-2 p-3">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      name="prompt"
                      placeholder="Describe what you want to build..."
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      autoFocus
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                      onKeyDown={(e) => {
                        if (e.metaKey && e.key === "Enter") {
                          sendMessage(
                            { text: input },
                            { body: { modelId: currentModelId } }
                          );
                          setInput("");
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      disabled={!input.trim()}
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={80}
          minSize={15}
          maxSize={100}
          className="flex flex-col"
        >
          <WebsiteViewport
            jsx={latestWebsite?.jsx}
            onToggleVisibility={toggleViewportVisibility}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 