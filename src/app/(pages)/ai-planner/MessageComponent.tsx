"use client";

import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TravelPlan } from "@/types/types";

interface Message {
  role: "user" | "ai";
  content: string;
  isError?: boolean;
  data?: TravelPlan;
}

// Function to format the JSON data into a readable Markdown string
function formatJsonAsMarkdown(data: TravelPlan): string {
  if (!data || !data.itinerary) return "プランのデータが不正です。";

  const { itinerary, budgetSummary } = data;
  let markdown = `## ${itinerary.title}\n\n`;
  markdown += `${itinerary.description}\n\n`;

  if (itinerary.days && itinerary.days.length > 0) {
    itinerary.days.forEach((day) => {
      markdown += `### ${day.day}日目: ${day.title}\n`;
      if (day.budget) {
        markdown += `**予算:** ${day.budget.toLocaleString()}円\n`;
      }
      markdown += "\n";
      if (day.schedule && day.schedule.length > 0) {
        day.schedule.forEach((item) => {
          markdown += `**${item.time}**: **${item.activity}**\n`;
          markdown += `- **場所:** ${item.location.name}\n`;
          markdown += `- **詳細:** ${item.details}\n`;
          if (item.cost) {
            markdown += `- **費用:** ${item.cost.toLocaleString()}円\n`;
          }
          markdown += "\n";
        });
      }
    });
  }

  if (budgetSummary) {
    markdown += `## 予算概要\n\n`;
    markdown += `**合計予算:** ${budgetSummary.total.toLocaleString()}円\n\n`;
    if (budgetSummary.categories && budgetSummary.categories.length > 0) {
      markdown += "| カテゴリ | 金額 |\n";
      markdown += "|:---|---:|\n";
      budgetSummary.categories.forEach((cat) => {
        markdown += `| ${cat.category} | ${cat.amount.toLocaleString()}円 |\n`;
      });
    }
  }

  return markdown;
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
                  {message.data ? formatJsonAsMarkdown(message.data) : message.content}
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