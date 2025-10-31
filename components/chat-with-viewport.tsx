"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CopyIcon, 
  RefreshCcwIcon, 
  SendIcon, 
  SparklesIcon 
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { DEFAULT_MODEL } from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { EmailViewport } from "@/components/email-viewport";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { 
  Conversation, 
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton
} from "@/components/ai-elements/conversation";
import { 
  Message, 
  MessageContent 
} from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { 
  Actions, 
  Action 
} from "@/components/ai-elements/actions";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { Loader } from "@/components/ai-elements/loader";
import type { ToolUIPart } from "ai";

// Helper to copy text to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
};

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

  const { messages, error, sendMessage, regenerate, status } = useChat({
    experimental_throttle: 16, // Ultra-smooth streaming at ~60fps (16ms)
  });

  // Create a stable hash of just the tool outputs to prevent rerenders during text streaming
  const emailToolHash = useMemo(() => {
    const toolOutputs: string[] = [];
    for (const message of messages) {
      for (const part of message.parts) {
        if ((part.type === "tool-createEmail" || part.type === "tool-editEmail") && 'output' in part && part.output) {
          const partWithOutput = part as typeof part & { output: unknown };
          if (typeof partWithOutput.output === 'string' && partWithOutput.output.trim()) {
            toolOutputs.push(`${part.type}:${partWithOutput.output}`);
          }
        }
      }
    }
    return toolOutputs.join('|');
  }, [messages]);

  // Extract the latest email from createEmail or editEmail tool calls
  const emailToolCalls = useMemo(() => {
    const toolCalls: Array<{ type: string; output: string }> = [];
    
    for (const message of messages) {
      for (const part of message.parts) {
        if ((part.type === "tool-createEmail" || part.type === "tool-editEmail") && 'output' in part && part.output) {
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
  }, [emailToolHash]);

  // Extract the latest email from the stable tool calls array
  const latestEmail = useMemo(() => {
    console.log('Email tool calls count:', emailToolCalls.length);
    console.log('Email tool calls:', emailToolCalls);
    
    if (emailToolCalls.length === 0) return null;
    
    const lastToolCall = emailToolCalls[emailToolCalls.length - 1];
    const foundEmail = {
      jsx: lastToolCall.output,
      description: lastToolCall.type === "tool-editEmail" ? 'Edited Email' : 'Generated Email'
    };
    
    console.log('Latest email found:', foundEmail);
    console.log('Email JSX length:', foundEmail.jsx?.length);
    
    // Show viewport automatically when an email is created or edited
    if (foundEmail && !isViewportVisible) {
      setIsViewportVisible(true);
    }
    
    return foundEmail;
  }, [emailToolCalls, isViewportVisible]);

  if (!isViewportVisible || !latestEmail) {
    // When viewport is not visible or no email exists, show only the chat with full width
    return (
      <div className="w-screen h-screen">
        <div className="flex flex-col h-full">
          <div className="grid h-full grid-rows-[1fr_auto_auto] max-w-[800px] m-auto w-full">
            <Conversation className="flex-1">
              <ConversationContent className="space-y-4">
                {messages.length === 0 ? (
                  <ConversationEmptyState
                    icon={<SparklesIcon className="size-8" />}
                    title="Start Creating"
                    description="Ask me to create a beautiful website or design for you"
                  />
                ) : (
                  messages.map((m, messageIndex) => {
                    const isLastMessage = messageIndex === messages.length - 1;
                    const isAssistant = m.role === "assistant";
                    
                    // Separate text and tool parts
                    const textParts = m.parts.filter(p => p.type === "text");
                    const toolParts = m.parts.filter(p => p.type.startsWith("tool-"));
                    
                    // Get the combined text for copying
                    const messageText = textParts.map(p => p.type === "text" ? p.text : "").join("");

                    return (
                      <div key={m.id} className="space-y-2">
                        {/* Render tool calls */}
                        {toolParts.map((part, i) => {
                          const toolPart = part as ToolUIPart;
                        return (
                            <Tool key={`${m.id}-tool-${i}`}>
                              <ToolHeader
                                type={toolPart.type}
                                state={toolPart.state}
                              />
                              <ToolContent>
                                <ToolInput input={toolPart.input} />
                                <ToolOutput
                                  output={toolPart.output}
                                  errorText={toolPart.errorText}
                                />
                              </ToolContent>
                            </Tool>
                          );
                        })}

                        {/* Render text message */}
                        {textParts.length > 0 && (
                          <Message from={m.role}>
                            <div className="flex flex-col gap-1">
                              <MessageContent variant={isAssistant ? "flat" : "contained"}>
                                {textParts.map((part, i) => {
                                  if (part.type === "text") {
                                    return isAssistant ? (
                                      <Response key={`${m.id}-${i}`}>
                                        {part.text}
                                      </Response>
                                    ) : (
                                      <div key={`${m.id}-${i}`}>{part.text}</div>
                                    );
                                  }
                        return null;
                                })}
                              </MessageContent>

                              {/* Actions for assistant messages */}
                              {isAssistant && isLastMessage && (
                                <Actions className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Action
                                    label="Regenerate"
                                    tooltip="Regenerate response"
                                    onClick={() => regenerate()}
                                  >
                                    <RefreshCcwIcon className="size-3" />
                                  </Action>
                                  <Action
                                    label="Copy"
                                    tooltip="Copy to clipboard"
                                    onClick={() => copyToClipboard(messageText)}
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                            </div>
                          </Message>
                        )}
                </div>
                    );
                  })
                )}

                {/* Loading indicator */}
                {(status === "streaming" || status === "submitted") && (
                  <div className="flex items-center gap-2 text-muted-foreground py-4">
                    <Loader size={16} />
                    <span className="text-sm">Thinking...</span>
            </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

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
        </div>

        {/* Email Viewport - only show toggle button if email exists */}
        {latestEmail && (
          <EmailViewport
            jsx={latestEmail.jsx}
            onToggleVisibility={toggleViewportVisibility}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
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
          <div className="grid h-full grid-rows-[1fr_auto_auto] max-w-[800px] m-auto w-full">
            <Conversation className="flex-1">
              <ConversationContent className="space-y-4">
                {messages.length === 0 ? (
                  <ConversationEmptyState
                    icon={<SparklesIcon className="size-8" />}
                    title="Start Creating"
                    description="Ask me to create a beautiful website or design for you"
                  />
                ) : (
                  messages.map((m, messageIndex) => {
                    const isLastMessage = messageIndex === messages.length - 1;
                    const isAssistant = m.role === "assistant";
                    
                    // Separate text and tool parts
                    const textParts = m.parts.filter(p => p.type === "text");
                    const toolParts = m.parts.filter(p => p.type.startsWith("tool-"));
                    
                    // Get the combined text for copying
                    const messageText = textParts.map(p => p.type === "text" ? p.text : "").join("");

                    return (
                      <div key={m.id} className="space-y-2">
                        {/* Render tool calls */}
                        {toolParts.map((part, i) => {
                          const toolPart = part as ToolUIPart;
                        return (
                            <Tool key={`${m.id}-tool-${i}`}>
                              <ToolHeader
                                type={toolPart.type}
                                state={toolPart.state}
                              />
                              <ToolContent>
                                <ToolInput input={toolPart.input} />
                                <ToolOutput
                                  output={toolPart.output}
                                  errorText={toolPart.errorText}
                                />
                              </ToolContent>
                            </Tool>
                          );
                        })}

                        {/* Render text message */}
                        {textParts.length > 0 && (
                          <Message from={m.role}>
                            <div className="flex flex-col gap-1">
                              <MessageContent variant={isAssistant ? "flat" : "contained"}>
                                {textParts.map((part, i) => {
                                  if (part.type === "text") {
                                    return isAssistant ? (
                                      <Response key={`${m.id}-${i}`}>
                                        {part.text}
                                      </Response>
                                    ) : (
                                      <div key={`${m.id}-${i}`}>{part.text}</div>
                                    );
                                  }
                        return null;
                                })}
                              </MessageContent>

                              {/* Actions for assistant messages */}
                              {isAssistant && isLastMessage && (
                                <Actions className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Action
                                    label="Regenerate"
                                    tooltip="Regenerate response"
                                    onClick={() => regenerate()}
                                  >
                                    <RefreshCcwIcon className="size-3" />
                                  </Action>
                                  <Action
                                    label="Copy"
                                    tooltip="Copy to clipboard"
                                    onClick={() => copyToClipboard(messageText)}
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                            </div>
                          </Message>
                        )}
                </div>
                    );
                  })
                )}

                {/* Loading indicator */}
                {(status === "streaming" || status === "submitted") && (
                  <div className="flex items-center gap-2 text-muted-foreground py-4">
                    <Loader size={16} />
                    <span className="text-sm">Thinking...</span>
            </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

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
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel 
          defaultSize={80} 
          minSize={15} 
          maxSize={100}
          className="flex flex-col"
        >
          <EmailViewport
            jsx={latestEmail?.jsx}
            onToggleVisibility={toggleViewportVisibility}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
} 