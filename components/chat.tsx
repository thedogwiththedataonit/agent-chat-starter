"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SendIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
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

export function Chat({ modelId = DEFAULT_MODEL }: { modelId: string }) {
  const [input, setInput] = useState("");
  const [currentModelId, setCurrentModelId] = useState(modelId);

  const handleModelIdChange = (newModelId: string) => {
    setCurrentModelId(newModelId);
  };

  const { messages, error, sendMessage, regenerate } = useChat({
    maxSteps: 25,
  });

  console.log(messages);

  return (
    <div className="grid w-screen h-screen grid-rows-[1fr_auto_auto] max-w-[800px] m-auto">
      <div className="flex flex-col-reverse gap-8 p-8 overflow-y-auto">
        {messages.toReversed().map((m) => (
          <div
            key={m.id}
            className={cn(
              m.role === "user" &&
                "bg-muted/50 rounded-md p-3 ml-auto max-w-[80%]"
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
                    <div key={`${m.id}-${i}`}>
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input }, { body: { modelId: currentModelId } });
          setInput("");
        }}
        className="flex justify-center px-8 pt-0 pb-4"
      >
        <Card className="w-full p-0">
          <CardContent className="flex items-center gap-3 p-2">
            <ModelSelectorHandler
              modelId={modelId}
              onModelIdChange={handleModelIdChange}
            />
            <div className="flex flex-1 items-center">
              <Input
                name="prompt"
                placeholder="Type your message..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
                autoFocus
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                variant="ghost"
                className="h-8 w-8 ml-1"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>


    </div>
  );
}
