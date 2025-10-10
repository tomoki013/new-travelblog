"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import pako from "pako";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ShareIcon } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// PostMetadata と ContinentData を types/types.ts からインポートします
import { PostMetadata, ContinentData, TravelPlan } from "@/types/types";
import FeedbackModal from "@/components/elements/FeedbackModal";
import PlanDisplay from "./PlanDisplay";

interface ShareableState {
  selectedCountryId: string;
  destination: string;
  duration: string;
  interests: string;
  planJson: TravelPlan | null;
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // 国の識別に使うのは name ではなく id/slug です
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>(destinationPresets);
  const [filteredPosts, setFilteredPosts] = useState<PostMetadata[]>([]);

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState("");

  const [planJson, setPlanJson] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const hasShownFeedbackModal = useRef(false);
  const [hasEditedDestination, setHasEditedDestination] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      try {
        const binaryString = atob(planParam);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const decompressed = pako.inflate(bytes, { to: "string" });
        const restoredState: ShareableState = JSON.parse(decompressed);

        setSelectedCountryId(restoredState.selectedCountryId);
        setDestination(restoredState.destination);
        setDuration(restoredState.duration);
        setInterests(restoredState.interests);
        setPlanJson(restoredState.planJson);

        toast.success("共有されたプランを復元しました。");

        // Clean the URL
        const url = new URL(window.location.href);
        url.searchParams.delete("plan");
        router.replace(url.toString(), { scroll: false });

      } catch (error) {
        console.error("Failed to restore plan from URL:", error);
        toast.error("URLからのプランの復元に失敗しました。");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setError("選択された国に関連する記事が見つかりません。別の国を選択してください。");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlanJson(null);

    let countryName = "";
    for (const continent of continents) {
      const country = continent.countries.find((c) => c.slug === selectedCountryId);
      if (country) {
        countryName = country.name;
        break;
      }
    }

    const userMessageContent = `- **国:** ${countryName}\n- **行き先:** ${destination}\n- **期間:** ${duration}\n- **興味・関心:** ${interests}`;
    const initialUserMessage = { role: "user", content: userMessageContent };

    try {
      // Step 1: Extract Requirements
      setLoadingMessage("旅行のテーマを整理中...");
      console.log("Step 1: AIへのリクエストを開始します - 要件の抽出");
      const extractBody = {
        messages: [initialUserMessage],
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'extract_requirements',
      };
      console.log("リクエストボディ:", JSON.stringify(extractBody, null, 2));

      const extractResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractBody),
      });

      if (!extractResponse.ok) {
        const errorData = await extractResponse.json().catch(() => ({ error: "要件の抽出中にサーバーエラーが発生しました。" }));
        console.error("要件の抽出中にサーバーでエラーが発生しました。:", errorData);
        throw new Error(`サーバーエラー (ステータス: ${extractResponse.status}): ${errorData.error || '詳細不明'}`);
      }
      const { response: requirementsJson } = await extractResponse.json();
      console.log("Step 1: 要件の抽出が完了しました。", requirementsJson);


      // Step 2: Flesh out the plan into JSON
      setLoadingMessage("旅行プランを生成中...");
      console.log("Step 2: AIへのリクエストを開始します - プランの具体化");
      const planBody = {
        messages: [], // Not needed for this step
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'flesh_out_plan_json',
        previous_data: requirementsJson,
      };
      console.log("リクエストボディ:", JSON.stringify(planBody, null, 2));


      const planResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planBody),
      });

      if (!planResponse.ok) {
        const errorData = await planResponse.json().catch(() => ({ error: "プランの生成中にサーバーエラーが発生しました。" }));
        console.error("プランの生成中にサーバーでエラーが発生しました。:", errorData);
        throw new Error(`サーバーエラー (ステータス: ${planResponse.status}): ${errorData.error || '詳細不明'}`);
      }

      const planData = await planResponse.json();
      console.log("Step 2: プランの生成が完了しました。", planData);
      setPlanJson(planData as TravelPlan); // Add type assertion

      if (!hasShownFeedbackModal.current) {
        setTimeout(() => {
          setIsFeedbackModalOpen(true);
          hasShownFeedbackModal.current = true;
        }, 3000);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
      console.error("旅行プランの生成中にエラーが発生しました。", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };


  const handleShare = useCallback(() => {
    if (typeof window === "undefined" || !planJson) return;

    try {
      const state: ShareableState = {
        selectedCountryId,
        destination,
        duration,
        interests,
        planJson,
      };
      const jsonString = JSON.stringify(state);
      const compressed = pako.deflate(jsonString);

      const binaryString = Array.from(compressed, byte => String.fromCharCode(byte)).join('');
      const encoded = btoa(binaryString);

      const url = new URL(window.location.href);
      url.searchParams.set("plan", encoded);

      navigator.clipboard.writeText(url.toString());
      toast.success("共有URLをクリップボードにコピーしました！");
    } catch (error) {
      console.error("Failed to create share link:", error);
      toast.error("共有URLの作成に失敗しました。");
    }
  }, [selectedCountryId, destination, duration, interests, planJson]);

  const handleReset = () => {
    setPlanJson(null);
    setError(null);
    setSelectedCountryId("");
    setDestination("");
    setDuration("");
    setInterests("");
    setCurrentStep(1);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {!planJson && !isLoading && !error && (
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

      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          <p className="mt-4 text-center text-muted-foreground">{loadingMessage || "プランを生成中..."}</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <h3 className="font-semibold text-destructive">エラーが発生しました</h3>
          <p className="mt-2 text-sm text-destructive">{error}</p>
          <Button onClick={handleReset} variant="destructive" className="mt-4">
            やり直す
          </Button>
        </div>
      )}

      {planJson && !isLoading && (
        <div>
          <PlanDisplay plan={planJson} />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleReset} size="lg">
              別のプランを生成する
            </Button>
            <Button
              onClick={handleShare}
              size="lg"
              variant="outline"
              disabled={!planJson}
            >
              <ShareIcon className="mr-2 h-5 w-5" />
              このプランを共有する
            </Button>
          </div>
        </div>
      )}

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}
