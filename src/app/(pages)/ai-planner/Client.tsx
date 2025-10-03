"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import MessageComponent from "./MessageComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostMetadata, ContinentData } from "@/types/types";
import FeedbackModal from "@/components/elements/FeedbackModal";

interface Message {
  role: "user" | "ai";
  content: string;
  isError?: boolean;
}

const destinationPresets = [
  "マドリード",
  "バルセロナ",
  "パリ",
  "バンコク",
  "デリー",
];
const interestPresets = [
  "グルメ旅",
  "芸術・建築巡り",
  "世界遺産巡り",
  "歴史散策",
  "寺院巡り",
];

const loadingMessages = [
  "あなたの好みを分析しています...",
  "旅の思い出をAIが読み込んでいます...",
  "最高のプランを組み立てています...",
  "もうすぐプランが完成します！",
];

interface AiPlannerClientProps {
  allPosts: PostMetadata[];
  continents: ContinentData[];
}

export default function AiPlannerClient({
  allPosts,
  continents,
}: AiPlannerClientProps) {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const hasShownFeedbackModal = useRef(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedCountryId) {
      const allowedSlugs = (() => {
        const slugs = [selectedCountryId];
        for (const continent of continents) {
          const country = continent.countries.find(
            (c) => c.slug === selectedCountryId
          );
          if (country) {
            if (country.children) {
              slugs.push(...country.children.map((ch) => ch.slug));
            }
            break;
          }
        }
        return slugs.map((s) => s.toLowerCase());
      })();
      const postsInCountry = allPosts.filter((post) => {
        if (!post.location) return false;
        let locations: string[] = [];
        const loc = post.location as unknown;
        if (typeof loc === "string") {
          locations = loc.split(",").map((l: string) => l.trim().toLowerCase());
        } else if (Array.isArray(loc)) {
          locations = loc.map((l: string) => l.trim().toLowerCase());
        }
        return locations.some((l) => allowedSlugs.includes(l));
      });
      setFilteredPosts(postsInCountry);
      setCurrentStep(2);
    } else {
      setFilteredPosts([]);
      setCurrentStep(1);
    }
    setDestination("");
    setInterests("");
  }, [selectedCountryId, allPosts, continents]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      let messageIndex = 0;
      setLoadingMessage(loadingMessages[messageIndex]);
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 5000);
    } else {
      setLoadingMessage("");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // Cleanup polling on component unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleDestinationSubmit = (value: string) => {
    if (value.trim()) {
      setDestination(value.trim());
      setCurrentStep(3);
    }
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    setCurrentStep(4);
  };

  const handleInterestPresetClick = (preset: string) => {
    setInterests((prev) => (prev ? `${prev}, ${preset}` : preset));
  };

  const pollJobStatus = async (currentJobId: string) => {
    try {
      const response = await fetch(`/api/chat/status/${currentJobId}`);
      if (!response.ok) {
        // Stop polling on server error
        // Add status text for better error messages
        throw new Error(`ステータスの確認に失敗しました: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data.status === "COMPLETED") {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        const resultResponse = await fetch(`/api/chat/result/${currentJobId}`);
        const resultData = await resultResponse.json();

        if (!resultResponse.ok) {
          throw new Error(resultData.error || "結果の取得に失敗しました。");
        }

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = resultData.result;
          return updatedMessages;
        });

        if (!hasShownFeedbackModal.current) {
          setIsFeedbackModalOpen(true);
          hasShownFeedbackModal.current = true;
        }
        setIsLoading(false);

      } else if (data.status === "FAILED") {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        throw new Error(data.error || "プランの生成に失敗しました。");
      }
      // If status is "PENDING", do nothing and let the interval call this function again.

    } catch (err) {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        const errorMessage = err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
        setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            if (lastMessage && lastMessage.role === "ai") {
            lastMessage.content = `エラー: ${errorMessage}`;
            lastMessage.isError = true;
            }
            return updated;
        });
        setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (filteredPosts.length === 0) {
      setMessages([
        {
          role: "ai",
          content: "選択された国に関連する記事が見つかりません。別の国を選択してください。",
          isError: true,
        },
      ]);
      return;
    }

    setIsLoading(true);

    let countryName = "";
    for (const continent of continents) {
      const country = continent.countries.find(
        (c) => c.slug === selectedCountryId
      );
      if (country) {
        countryName = country.name;
        break;
      }
    }

    const userMessageContent = `
- **国:** ${countryName}
- **行き先:** ${destination}
- **期間:** ${duration}
- **興味・関心:** ${interests}
`;

    const newMessages: Message[] = [
      { role: "user", content: userMessageContent },
      { role: "ai", content: "" }, // Placeholder for AI response
    ];
    setMessages(newMessages);

    try {
      const requestBody = {
        messages: newMessages,
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName: countryName,
        destination,
        duration,
        interests,
      };

      const response = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `サーバーから予期せぬ応答がありました (HTTP ${response.status})`,
        }));
        throw new Error(errorData.error);
      }

      const { jobId: newJobId } = await response.json();
      if (!newJobId) {
          throw new Error("ジョブIDの取得に失敗しました。");
      }

      // Start polling
      pollingIntervalRef.current = setInterval(() => {
          pollJobStatus(newJobId);
      }, 3000); // Poll every 3 seconds

    } catch (err) {
      const rawErrorMessage =
        err instanceof Error ? err.message : "予期せぬエラーが発生しました。";

      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage && lastMessage.role === "ai") {
          lastMessage.content = `エラーが発生しました: ${rawErrorMessage}`;
          lastMessage.isError = true;
        }
        return updated;
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setSelectedCountryId("");
    setDestination("");
    setDuration("");
    setInterests("");
    setCurrentStep(1);
    setIsLoading(false);
    if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
    }
  };

  return (
    <div className="space-y-6">
      {messages.length === 0 && (
        <>
          <div>
            <Label htmlFor="country">Step 1: 国を選択</Label>
            <Select
              value={selectedCountryId}
              onValueChange={(value) => setSelectedCountryId(value)}
              disabled={isLoading}
            >
              <SelectTrigger id="country" className="mt-2">
                <SelectValue placeholder="プランを作成したい国を選んでください" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) =>
                  continent.countries.map((country) => (
                    <SelectItem key={country.slug} value={country.slug}>
                      {country.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {selectedCountryId && (
              <p className="text-sm text-muted-foreground mt-2">
                {filteredPosts.length > 0
                  ? `${filteredPosts.length}件の記事を参考にします。`
                  : "この国に関する記事はまだありません。"}
              </p>
            )}
          </div>

          {currentStep >= 2 && (
            <div>
              <Label htmlFor="destination">Step 2: 行き先</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {destinationPresets.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDestinationSubmit(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDestinationSubmit(destination);
                  }
                }}
                placeholder="例: パリ、バンコク"
                disabled={isLoading}
              />
            </div>
          )}

          {currentStep >= 3 && (
            <div>
              <Label htmlFor="duration">Step 3: 期間</Label>
              <Select
                value={duration}
                onValueChange={handleDurationChange}
                disabled={isLoading}
              >
                <SelectTrigger id="duration" className="mt-2">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="半日間">半日間</SelectItem>
                  <SelectItem value="日帰り">日帰り</SelectItem>
                  {Array.from({ length: 9 }, (_, i) => i + 2).map((days) => (
                    <SelectItem key={days} value={`${days}日間`}>
                      {`${days}日間`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep >= 4 && (
            <>
              <div>
                <Label htmlFor="interests">Step 4: 興味・関心</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {interestPresets.map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => handleInterestPresetClick(preset)}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
                <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="例: 寺院巡りがしたい"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  isLoading ||
                  filteredPosts.length === 0 ||
                  !destination ||
                  !interests
                }
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> プランを生成中...
                  </span>
                ) : (
                  "旅行プランを生成する"
                )}
              </Button>
            </>
          )}
        </>
      )}

      <div className="mt-6">
        <MessageComponent
          messages={messages}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
        />
      </div>

      {!isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "ai" &&
        messages[messages.length - 1].content && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button onClick={handleReset} size="lg">
              別のプランを生成する
            </Button>
          </div>
        )}

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}