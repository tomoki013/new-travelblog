"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Home, Plane, Ticket, Train, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { sectionVariants } from "../animation";

// 表示するアプリのデータを定義します。
// name: サービス名
// url: アフィリエイトリンク
// type: 'banner' または 'card'
// image: バナー画像 or ロゴ画像のパス
// icon: 画像がない場合のアイコン
// description: サービスの説明
// status: 'ready' (準備完了) or 'pending' (準備中)
const affiliates = [
  {
    name: "Trip.com",
    url: "https://jp.trip.com/?Allianceid=7063246&SID=258431426&trip_sub1=",
    type: "card", // Trip.comはバナーが使えるとの想定
    // image: "/images/apps/tripcom-banner.png", // 仮のパスです。取得したバナー画像へのパスを指定してください。
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description:
      "航空券・ホテル・列車まで、旅の予約がこれ一つで完結！セールも豊富でお得に旅しよう。",
    status: "ready",
  },
  {
    name: "Booking.com",
    url: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    image: "/images/apps/bookingcom-logo.png", // ロゴ画像のパス
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description: "世界中のホテルや宿を網羅。豊富な口コミで安心して選べます。",
    status: "pending",
  },
  {
    name: "Airbnb",
    url: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    image: "/images/apps/airbnb-logo.png", // ロゴ画像のパス
    icon: <Home className="w-10 h-10 text-primary" />,
    description: "現地の人から借りるユニークな宿で、特別な宿泊体験を。",
    status: "pending",
  },
  {
    name: "Klook",
    url: "https://affiliate.klook.com/redirect?aid=99371&aff_adid=1126092&k_site=https%3A%2F%2Fwww.klook.com%2F",
    type: "card",
    // image: "/images/apps/klook-logo.png", // ロゴ画像のパス
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "遊びの予約に特化。テーマパークや現地ツアーをお得に予約。",
    status: "ready",
  },
  {
    name: "GetYourGuide",
    url: "https://www.getyourguide.com?partner_id=GTNOM0E&utm_medium=online_publisher",
    type: "card",
    // image: "/images/apps/getyourguide-logo.png", // ロゴ画像のパス
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "世界中のユニークな体験ツアーが見つかる。旅の思い出作りに。",
    status: "ready",
  },
  {
    name: "Omio",
    url: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    image: "/images/apps/omio-logo.png", // ロゴ画像のパス
    icon: <Train className="w-10 h-10 text-primary" />,
    description: "ヨーロッパの鉄道やバスをまとめて検索・予約。周遊旅行に便利。",
    status: "pending",
  },
  {
    name: "SkyScanner",
    url: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    image: "/images/apps/omio-logo.png", // ロゴ画像のパス
    icon: <Plane className="w-10 h-10 text-primary" />,
    description: "世界中の航空券を一発で比較",
    status: "pending",
  },
  {
    name: "Trifa",
    url: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    image: "/images/apps/trifa-logo.png", // ロゴ画像のパス
    icon: <Wifi className="w-10 h-10 text-primary" />,
    description: "eSIMで海外でもスマホを快適に。SIMの差し替え不要で楽々。",
    status: "pending",
  },
];

const Affiliates = () => {
  const appsToShow = affiliates.filter((aff) => aff.status === "ready");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            旅の予約におすすめのサイト・アプリ
          </h2>
          <p className="text-muted-foreground mt-2">
            旅行の準備がもっと楽しく、スムーズになる予約ツールを集めました。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {appsToShow.map((app) => (
            <Link
              href={app.url}
              key={app.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`block group ${
                app.type === "banner" ? "md:col-span-2 lg:col-span-3" : "" // バナータイプは幅を広げる
              }`}
            >
              {app.type === "banner" ? (
                // --- バナー表示 ---
                <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
                  <Image
                    src={app.image!}
                    alt={`${app.name} バナー`}
                    width={1200}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <p className="text-muted-foreground">{app.description}</p>
                  </div>
                </div>
              ) : (
                // --- カード表示 ---
                <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col items-center text-center">
                  <div className="mb-4 h-12 w-12 flex items-center justify-center">
                    {app.image ? (
                      <Image
                        src={app.image}
                        alt={`${app.name} ロゴ`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      app.icon
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {app.name}
                  </h3>
                  <p className="text-muted-foreground flex-grow">
                    {app.description}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Affiliates;
