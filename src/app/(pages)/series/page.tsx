import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "テーマで旅を深掘り - Series",
  description:
    "「ともきちの旅行日記」の連載企画（シリーズ）を一覧でご紹介。「世界の夕陽から」[cite: 54]や「絶景建築編」[cite: 55]など、特定のテーマで旅の記録を深掘りできます。あなたの好奇心を刺激する物語を見つけてください。",
};

const SeriesPage = () => {
  return <Client />;
};

export default SeriesPage;
