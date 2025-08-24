import Link from "next/link";
import { Metadata } from "next";
import { Post } from "@/types/types";
import { getAllPostTypes } from "@/lib/markdown";
import HeroSection from "@/components/sections/HeroSection";
import { featuredSeries } from "@/data/series";
import { allRegions } from "@/data/regions";

export const metadata: Metadata = {
  title: "サイトマップ",
  description:
    "サイトの全コンテンツ一覧。主要ページ、シリーズ、国・地域、全記事へのリンクをまとめています。目的のページを素早く見つけるためにご活用ください。",
};

// 記事を「年 > 月」の形式にグループ分けしてソートする関数
type YearMonthPosts = {
  year: string;
  months: { month: string; posts: Post[] }[];
}[];

const groupPostsByYearMonth = (posts: Post[]): YearMonthPosts => {
  // 年月ごとにグループ化
  const grouped: Record<string, Record<string, Post[]>> = {};
  posts.forEach((post) => {
    const date = new Date(post.dates[0]);
    const year = date.getFullYear().toString();
    const month = `${date.getMonth() + 1}月`;
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(post);
  });

  // 年・月を新しい順で配列化
  return Object.keys(grouped)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({
      year,
      months: Object.keys(grouped[year])
        .sort(
          (a, b) => Number(b.replace("月", "")) - Number(a.replace("月", ""))
        )
        .map((month) => ({ month, posts: grouped[year][month] })),
    }));
};

const mainList = [
  { pass: "/", name: "ホーム" },
  { pass: "/about", name: "プロフィール" },
  { pass: "/posts", name: "ブログ一覧" },
  { pass: "/series", name: "シリーズ一覧" },
  { pass: "/destination", name: "地域別" },
  { pass: "/gallery", name: "写真ギャラリー" },
  { pass: "/social", name: "SNSページ" },
  { pass: "/request", name: "記事テーマ募集ページ" },
  { pass: "/contact", name: "お問い合わせページ" },
  { pass: "/privacy", name: "プライバシーポリシー/免責事項" },
  { pass: "/terms", name: "利用規約/免責事項" },
];

// --- Page Component ---

export default async function SitemapPage() {
  const allPosts = await getAllPostTypes();
  const postsByYearMonth = groupPostsByYearMonth(allPosts);
  const regions = allRegions;

  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <HeroSection
        src="/images/Egypt/the-three-great-pyramids-of-giza-with-sunset.jpg"
        alt="Sitemap Hero Image"
        pageTitle="SITEMAP"
        pageMessage="サイトの全コンテンツ一覧"
        textColor="text-foreground"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {/* ==================== 手動更新エリア ==================== */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-4">
                メインページ
              </h2>
              <ul className="space-y-2 text-foreground">
                {mainList.map((p) => (
                  <li key={p.pass}>
                    <Link href={p.pass} className="hover:text-secondary">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-4">
                シリーズ一覧
              </h2>
              <ul className="space-y-2 text-foreground">
                {featuredSeries.map((series) => (
                  <li key={series.id}>
                    <Link
                      href={`/series/${series.slug}`}
                      className="hover:text-secondary"
                    >
                      {series.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-4">
                国・地域別一覧
              </h2>
              <ul className="space-y-2 text-foreground">
                {regions.map((region) => (
                  <li key={region.slug}>
                    <Link
                      href={`/destination/${region.slug}`}
                      className="hover:text-secondary"
                    >
                      {region.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ==================== 自動更新エリア ==================== */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-4">
              全記事一覧 (時系列)
            </h2>
            <div className="space-y-8">
              {postsByYearMonth.map(({ year, months }) => (
                <div key={year}>
                  <h3 className="text-xl font-semibold text-foreground">
                    {year}年
                  </h3>
                  <div className="mt-2 space-y-4">
                    {months.map(({ month, posts }) => (
                      <div key={month}>
                        <h4 className="font-bold text-foreground">{month}</h4>
                        <ul className="mt-2 ml-4 space-y-2 text-foreground list-disc list-inside">
                          {posts.map((post) => (
                            <li key={post.slug}>
                              <Link
                                href={`/posts/${post.slug}`}
                                className="hover:text-secondary"
                              >
                                {post.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
