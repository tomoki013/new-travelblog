"use client";

import { useEffect, useState } from "react";
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

interface Message {
  role: "user" | "ai";
  content: string;
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
  // 親から受け取る型を PostMetadata[] に修正します
  allPosts: PostMetadata[];
  continents: ContinentData[];
}

export default function AiPlannerClient({
  allPosts,
  continents,
}: AiPlannerClientProps) {
  // 国の識別に使うのは name ではなく id/slug です
  const [selectedCountryId, setSelectedCountryId] = useState<string>("spain");
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("3日間");
  const [interests, setInterests] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    if (selectedCountryId) {
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

  const handleGenerate = async () => {
    if (filteredPosts.length === 0) {
      setError(
        "選択された国に関連する記事が見つかりません。別の国を選択してください。"
      );
      return;
    }

    setIsLoading(true);
    setError("");

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
      { role: "ai", content: "" }, // AIの応答をストリーミングでここに追記
    ];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleSlugs: filteredPosts.map((p) => p.slug),
          countryName: countryName,
          destination,
          duration,
          interests,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `サーバーから予期せぬ応答がありました (HTTP ${response.status})`,
        }));
        throw new Error(errorData.error);
      }

      if (!response.body) throw new Error("レスポンスストリームがありません。");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content += chunk;
          return updatedMessages;
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
      setError(errorMessage);
      setMessages((prev) =>
        prev.filter((msg) => msg.role !== "ai" || msg.content !== "")
      );
    } finally {
      setIsLoading(false);
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
            <p className="text-sm text-muted-foreground mt-2">
              {filteredPosts.length > 0
                ? `${filteredPosts.length}件の記事を参考にします。`
                : "この国に関する記事はまだありません。"}
            </p>
          </div>

          <div>
            <Label htmlFor="destination">Step 2: 行き先</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {destinationPresets.map((preset) => (
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
              onChange={(e) => setDestination(e.target.value)}
              placeholder="例: パリ、バンコク"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="duration">Step 3: 期間</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="例: 3日間"
              className="mt-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="interests">Step 4: 興味・関心</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {interestPresets.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setInterests(preset)}
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
            disabled={isLoading || filteredPosts.length === 0}
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

      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
          <h3 className="font-bold text-red-800 dark:text-red-200">
            エラーが発生しました
          </h3>
          <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
        </div>
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
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              この旅行プランはお役に立ちましたか？
              <br />
              今後の改善のため、ぜひ
              <a href="/contact" className="underline">
                フィードバック
              </a>
              をお寄せください。
            </p>
          </div>
        )}
    </div>
  );
}
