import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "About-旅の記録と発見の物語",
  description:
    "旅は新しい自分に出会う物語。『ともきちの旅行日記』へようこそ！このページでは、管理人ともきちの自己紹介と、旅の記録に込めた想いをお伝えします。あなたも一緒に、発見の旅に出かけませんか？",
  openGraph: {
    title: "About-旅の記録と発見の物語",
    description:
      "旅は、ただ場所を訪れるだけじゃない。そこにはいつも、新しい発見と自分だけの物語がある。『ともきちの旅行日記』は、そんな旅の記録と発見の物語を綴る場所です。はじめまして、管理人のともきちです。私がこのブログに込めた想いを、少しだけお話しさせてください。",
  },
  twitter: {
    title: "About-旅の記録と発見の物語",
    description:
      "旅は、ただ場所を訪れるだけじゃない。そこにはいつも、新しい発見と自分だけの物語がある。『ともきちの旅行日記』は、そんな旅の記録と発見の物語を綴る場所です。はじめまして、管理人のともきちです。私がこのブログに込めた想いを、少しだけお話しさせてください。",
  },
};

const AboutPage = () => {
  return <Client />;
};

export default AboutPage;
