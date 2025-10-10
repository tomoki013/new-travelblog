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
import { ShareIcon } from "@/components/common/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// PostMetadata と ContinentData を types/types.ts からインポートします
import { PostMetadata, ContinentData, TravelPlan } from "@/types/types";
import FeedbackModal from "@/components/common/FeedbackModal";
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


      // Step 2: Summarize Articles Iteratively
      const articleSlugs = filteredPosts.map((p) => p.slug);
      let summarizedKnowledgeBase = "";
      console.log(`Step 2: AIへのリクエストを開始します - ${articleSlugs.length}件の記事を1件ずつ要約`);

      for (let i = 0; i < articleSlugs.length; i++) {
        const slug = articleSlugs[i];
        setLoadingMessage(`記事を分析中... (${i + 1} / ${articleSlugs.length})`);
        console.log(`  - (${i + 1}/${articleSlugs.length}) ${slug} を要約中...`);

        const summaryBody = {
          messages: [],
          countryName,
          step: 'summarize_one_article',
          articleSlug: slug,
          requirementsData: requirementsJson, // requirementsJson を渡す
        };

        const summaryResponse = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(summaryBody),
        });

        if (!summaryResponse.ok) {
          const errorData = await summaryResponse.json().catch(() => ({ error: `記事「${slug}」の要約中にサーバーエラーが発生しました。` }));
          throw new Error(`サーバーエラー (ステータス: ${summaryResponse.status}): ${errorData.error || '詳細不明'}`);
        }

        const { summary } = await summaryResponse.json();
        summarizedKnowledgeBase += summary + "\n\n---\n\n";
        console.log(`  - (${i + 1}/${articleSlugs.length}) ${slug} の要約完了`);
      }
      console.log("Step 2: すべての記事の要約が完了しました。");


      // Step 3: Draft Itinerary
      setLoadingMessage("旅程の骨子を作成中...");
      console.log("Step 3: AIへのリクエストを開始します - 旅程の骨子作成");
      const draftBody = {
        messages: [],
        articleSlugs: filteredPosts.map((p) => p.slug),
        countryName,
        step: 'draft_itinerary',
        previous_data: summarizedKnowledgeBase,
        requirementsData: requirementsJson,
      };
      const draftResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftBody),
      });
      if (!draftResponse.ok) {
        const errorData = await draftResponse.json().catch(() => ({ error: "旅程の骨子作成中にサーバーエラーが発生しました。" }));
        throw new Error(`サーバーエラー (ステータス: ${draftResponse.status}): ${errorData.error || '詳細不明'}`);
      }
      const draftPlanData = await draftResponse.json();
      console.log("Step 3: 旅程の骨子作成が完了しました。", draftPlanData);

      // Step 4: Flesh out details day by day
      console.log("Step 4: 旅程の詳細化を1日ずつ開始します。");
      // バックエンドが直接JSONオブジェクトを返すため、クライアントでのパースは不要です。
      // TravelPlanのスキーマに沿っていることを確認します
      const draftPlan: TravelPlan = draftPlanData.itinerary ? draftPlanData : { itinerary: draftPlanData };

      const detailedItinerary = JSON.parse(JSON.stringify(draftPlan.itinerary)); // Deep copy

      for (let i = 0; i < detailedItinerary.days.length; i++) {
        const day = detailedItinerary.days[i];
        setLoadingMessage(`プランの詳細を作成中... (${i + 1}日目 / ${detailedItinerary.days.length}日目)`);
        console.log(`  - (${i + 1}/${detailedItinerary.days.length}) ${day.title} の詳細を作成中...`);

        const fleshOutDayBody = {
          messages: [],
          countryName,
          step: 'flesh_out_one_day',
          dayData: JSON.stringify(day),
          requirementsData: requirementsJson,
          summarizedKnowledgeBase: summarizedKnowledgeBase,
        };

        const fleshOutDayResponse = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fleshOutDayBody),
        });

        if (!fleshOutDayResponse.ok) {
          const errorData = await fleshOutDayResponse.json().catch(() => ({ error: `${i + 1}日目の詳細作成中にサーバーエラーが発生しました。` }));
          throw new Error(`サーバーエラー (ステータス: ${fleshOutDayResponse.status}): ${errorData.error || '詳細不明'}`);
        }

        const detailedDayData = await fleshOutDayResponse.json();
        detailedItinerary.days[i] = detailedDayData; // Replace the draft day with the detailed one
        console.log(`  - (${i + 1}/${detailedItinerary.days.length}) の詳細作成完了`);
      }
      console.log("Step 4: 全日程の詳細化が完了しました。");

      // Step 5: Calculate final budget
      setLoadingMessage("最終的な予算を計算中...");
      console.log("Step 5: AIへのリクエストを開始します - 最終予算の計算");
      const budgetBody = {
        messages: [],
        countryName,
        step: 'calculate_final_budget',
        finalItinerary: JSON.stringify(detailedItinerary),
      };

      const budgetResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budgetBody),
      });

      if (!budgetResponse.ok) {
        const errorData = await budgetResponse.json().catch(() => ({ error: "最終予算の計算中にサーバーエラーが発生しました。" }));
        throw new Error(`サーバーエラー (ステータス: ${budgetResponse.status}): ${errorData.error || '詳細不明'}`);
      }
      const budgetSummary = await budgetResponse.json();
      console.log("Step 5: 最終予算の計算が完了しました。", budgetSummary);

      const finalPlan: TravelPlan = {
        itinerary: detailedItinerary,
        budgetSummary,
      };

      setPlanJson(finalPlan);

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
