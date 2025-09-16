import { AffiliatesProps } from "@/types/types";
import { BedDouble, Home, Plane, Ticket, Train, Wifi } from "lucide-react";

// 表示するアプリのデータを定義します。
// name: サービス名
// affiliateUrl: アフィリエイトリンク
// homeUrl: アフィリエイトプログラムのホームページ
// type: 'banner' または 'card'
// image: バナー画像 or ロゴ画像のパス
// icon: 画像がない場合のアイコン
// description: サービスの説明
// status: 'ready' (準備完了) or 'pending' (準備中)
export const affiliates: AffiliatesProps[] = [
  {
    name: "Trip.com",
    affiliateUrl:
      "https://jp.trip.com/?Allianceid=7063246&SID=258431426&trip_sub1=",
    homeUrl: "https://jp.trip.com/partners/index",
    type: "card",
    // image: "/images/apps/tripcom-banner.png",
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description:
      "航空券・ホテル・列車まで、旅の予約がこれ一つで完結！セールも豊富でお得に旅しよう。",
    status: "ready",
  },
  {
    name: "Booking.com",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    // image: "/images/apps/bookingcom-logo.png",
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description: "世界中のホテルや宿を網羅。豊富な口コミで安心して選べます。",
    status: "pending",
  },
  {
    name: "Airbnb",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    // image: "/images/apps/airbnb-logo.png"
    icon: <Home className="w-10 h-10 text-primary" />,
    description: "現地の人から借りるユニークな宿で、特別な宿泊体験を。",
    status: "pending",
  },
  {
    name: "Klook",
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=99371&aff_adid=1126092&k_site=https%3A%2F%2Fwww.klook.com%2F",
    homeUrl: "https://affiliate.klook.com/ja/",
    type: "card",
    // image: "/images/apps/klook-logo.png",
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "遊びの予約に特化。テーマパークや現地ツアーをお得に予約。",
    status: "ready",
  },
  {
    name: "GetYourGuide",
    affiliateUrl:
      "https://www.getyourguide.com?partner_id=GTNOM0E&utm_medium=online_publisher",
    homeUrl: "https://partner.getyourguide.com/",
    type: "card",
    // image: "/images/apps/getyourguide-logo.png",
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "世界中のユニークな体験ツアーが見つかる。旅の思い出作りに。",
    status: "ready",
  },
  {
    name: "Omio",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    // image: "/images/apps/omio-logo.png",
    icon: <Train className="w-10 h-10 text-primary" />,
    description: "ヨーロッパの鉄道やバスをまとめて検索・予約。周遊旅行に便利。",
    status: "pending",
  },
  {
    name: "SkyScanner",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    // image: "/images/apps/omio-logo.png",
    icon: <Plane className="w-10 h-10 text-primary" />,
    description: "世界中の航空券を一発で比較",
    status: "pending",
  },
  {
    name: "Trifa",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    // image: "/images/apps/trifa-logo.png
    icon: <Wifi className="w-10 h-10 text-primary" />,
    description: "eSIMで海外でもスマホを快適に。SIMの差し替え不要で楽々。",
    status: "pending",
  },
];
