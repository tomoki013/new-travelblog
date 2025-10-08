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
// PostMetadata と ContinentData を types/types.ts からインポートします
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

interface AiPlannerClientProps {
  // 親から受け取る型を PostMetadata[] に修正します
  allPosts: PostMetadata[];
  continents: ContinentData[];
}

export default function AiPlannerClient({
  allPosts,
  continents,
}: AiPlannerClientProps) {
  // 国の識別に使うのは name ではなく id/slug です
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>(destinationPresets);
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
  const [hasEditedDestination, setHasEditedDestination] = useState(false);

  useEffect(() => {
    if (destination) {
      setHasEditedDestination(true);
      setCurrentStep(3);
    }
  }, [destination]);

  useEffect(() => {
    if (selectedCountryId) {
      let suggestions = destinationPresets; // デフォルト値
      for (const continent of continents) {
        const country = continent.countries.find(c => c.slug === selectedCountryId);
        if (country && country.children && country.children.length > 0) {
          suggestions = country.children.map(city => city.name);
          break;
        }
      }
      setDestinationSuggestions(suggestions);

      // 選択された国の slug と、もしあればその子要素（都市）の slug も含める
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
        // post.location は types で string[] | undefined になっているため
        // string と配列の両方に対応するガードを入れます。
        if (!post.location) return false;

        let locations: string[] = [];
        const loc = post.location as unknown;
        if (typeof loc === "string") {
          locations = loc.split(",").map((l: string) => l.trim().toLowerCase());
        } else if (Array.isArray(loc)) {
          locations = loc.map((l: string) => l.trim().toLowerCase());
        }

        // 記事の locations に allowedSlugs のいずれかが含まれていれば true
        return locations.some((l) => allowedSlugs.includes(l));
      });
      setFilteredPosts(postsInCountry);
      setCurrentStep(2);
    } else {
      setFilteredPosts([]);
      setCurrentStep(1);
    }
    // Reset subsequent fields whenever country changes
    setDestination("");
    setInterests("");
  }, [selectedCountryId, allPosts, continents]);

  const handleDurationChange = (value: string) => {
    setDuration(value);
    setCurrentStep(4);
  };

  const handleInterestPresetClick = (preset: string) => {
    setInterests((prev) => (prev ? `${prev}, ${preset}` : preset));
  };

  const handleGeneratePlan = async () => {
    if (filteredPosts.length === 0) {
      setMessages([{ role: "ai", content: "選択された国に関連する記事が見つかりません。別の国を選択してください。", isError: true }]);
      return;
    }

    setIsLoading(true);
    let countryName = "";
    for (const continent of continents) {
      const country = continent.countries.find((c) => c.slug === selectedCountryId);
      if (country) {
        countryName = country.name;
        break;
      }
    }

    const userMessageContent = `- **国:** ${countryName}\n- **行き先:** ${destination}\n- **期間:** ${duration}\n- **興味・関心:** ${interests}`;
    const initialUserMessage: Message = { role: "user", content: userMessageContent };
    const aiResponsePlaceholder: Message = { role: "ai", content: "" };
    setMessages([initialUserMessage, aiResponsePlaceholder]);

    const handleError = (errorMsg: string) => {
      console.error("[CLIENT LOG] handleError called with:", errorMsg);
      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage && lastMessage.role === "ai") {
          // Append error message instead of replacing content, preserving the outline
          lastMessage.content += `\n\n---\n**エラー:** ${errorMsg}`;
          lastMessage.isError = true;
        }
        return updated;
      });
    };

    const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, initialContent: string = "") => {
      const decoder = new TextDecoder();
      let fullResponse = initialContent;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.role === "ai") {
            lastMessage.content = fullResponse;
            lastMessage.isError = false;
          }
          return updated;
        });
      }
      return fullResponse;
    };

    try {
      console.log("[CLIENT LOG] --- Starting Plan Generation ---");
      // Step 1: Extract Requirements
      setLoadingMessage("旅行のテーマを整理中...");
      const extractBody = {
        messages: [initialUserMessage],
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'extract_requirements',
      };
      console.log("[CLIENT LOG] Step 1: Sending extract_requirements request:", extractBody);
      const extractResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractBody),
      });
      console.log(`[CLIENT LOG] Step 1: Response status: ${extractResponse.status}`);
      if (!extractResponse.ok) {
        const errorData = await extractResponse.json().catch(() => ({ error: "要件の抽出中にサーバーエラーが発生しました。" }));
        console.error("[CLIENT LOG] Step 1: Error response data:", errorData);
        throw new Error(errorData.error);
      }
      const { response: requirementsJson } = await extractResponse.json();
      console.log("[CLIENT LOG] Step 1: Received requirements:", requirementsJson);

      // Step 2: Create Outline
      setLoadingMessage("プランの骨子を作成中...");
      const outlineBody = {
        messages: [],
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'create_outline',
        previous_data: requirementsJson,
      };
      console.log("[CLIENT LOG] Step 2: Sending create_outline request:", outlineBody);
      const outlineResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outlineBody),
      });
      console.log(`[CLIENT LOG] Step 2: Response status: ${outlineResponse.status}`);
      if (!outlineResponse.ok || !outlineResponse.body) {
        const errorData = await outlineResponse.json().catch(() => ({ error: "骨子の作成中にサーバーエラーが発生しました。" }));
        console.error("[CLIENT LOG] Step 2: Error response data:", errorData);
        throw new Error(errorData.error);
      }
      console.log("[CLIENT LOG] Step 2: Starting to process stream...");
      const outlineText = await processStream(outlineResponse.body.getReader());
      console.log("[CLIENT LOG] Step 2: Stream processed. Outline text:", outlineText);

      if (!outlineText || outlineText.trim() === "") {
        console.error("[CLIENT LOG] Outline text is empty. Throwing error.");
        throw new Error("AIがプランの骨子を生成できませんでした。条件を変えて再度お試しください。");
      }

      // Step 3: Flesh out the plan
      setLoadingMessage("詳細情報を追加中...");
       const finalPlanBody = {
        messages: [],
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'flesh_out_plan',
        previous_data: outlineText,
      };
      console.log("[CLIENT LOG] Step 3: Sending flesh_out_plan request:", finalPlanBody);
      const finalPlanResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPlanBody),
      });
      console.log(`[CLIENT LOG] Step 3: Response status: ${finalPlanResponse.status}`);
      if (!finalPlanResponse.ok || !finalPlanResponse.body) {
        const errorData = await finalPlanResponse.json().catch(() => ({ error: "詳細プランの作成中にサーバーエラーが発生しました。" }));
        console.error("[CLIENT LOG] Step 3: Error response data:", errorData);
        throw new Error(errorData.error);
      }
      console.log("[CLIENT LOG] Step 3: Starting to process final stream...");
      await processStream(finalPlanResponse.body.getReader(), outlineText);
      console.log("[CLIENT LOG] --- Plan Generation Finished ---");

      if (!hasShownFeedbackModal.current) {
        setTimeout(() => {
          setIsFeedbackModalOpen(true);
          hasShownFeedbackModal.current = true;
        }, 3000);
      }
    } catch (err) {
      console.error("[CLIENT LOG] An error occurred in handleGeneratePlan:", err);
      const errorMessage = err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
      handleError(errorMessage);
    } finally {
      console.log("[CLIENT LOG] Finalizing handleGeneratePlan.");
      setIsLoading(false);
      setLoadingMessage("");
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
                {destinationSuggestions.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setDestination(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (e.target.value) {
                    setCurrentStep(3);
                  }
                }}
                placeholder="例: パリ、バンコク"
                disabled={isLoading}
              />
            </div>
          )}

          {(currentStep >= 3 || hasEditedDestination) && (
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
                onClick={handleGeneratePlan}
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
