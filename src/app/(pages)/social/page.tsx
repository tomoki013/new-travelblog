import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Follow Me",
  description:
    "YouTube, TikTok, GitHubなど、各種SNSアカウントの活動内容やコンセプトをご紹介します。お好きなプラットフォームで、お気軽にフォローしてください！",
};

const SocialPage = () => {
  return <Client />;
};

export default SocialPage;
