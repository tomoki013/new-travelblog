"use client";

import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: "user" | "ai";
  content: string;
  isError?: boolean;
}

interface MessageComponentProps {
  messages: Message[];
  isLoading: boolean;
  loadingMessage: string;
}

export default function MessageComponent({
  messages,
  isLoading,
  loadingMessage,
}: MessageComponentProps) {
  // Wait until the first AI message is populated to render anything
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 ${
            message.role === "user" ? "justify-end" : ""
          }`}
        >
          {message.role === "ai" && (
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/images/ai-icon.png" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`rounded-lg p-3 max-w-[85%] ${
              message.role === "user"
                ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                : message.isError
                  ? "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                  : "bg-muted"
            }`}
          >
            {/* For AI messages, render the loading state if content is empty */}
            {message.role === "ai" && isLoading && !message.content ? (
              <div className="flex items-center gap-2 p-4 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p>{loadingMessage}</p>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {message.role === "user" && (
            <Avatar className="w-8 h-8 border">
              {/* Assuming a generic user icon */}
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  );
}