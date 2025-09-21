import { AffiliatesProps } from "@/types/types";
import { BedDouble, Home, Plane, Ticket, Train, Wifi } from "lucide-react";

// 表示するアプリのデータを定義します。
// name: サービス名
// affiliateUrl: アフィリエイトリンク
// homeUrl: アフィリエイトプログラムのホームページ
// type: 'banner' または 'card'
// image: ロゴ画像のパス
// icon: 画像がない場合のアイコン
// description: サービスの説明
// status: 'ready' (準備完了) or 'pending' (準備中)
// bannerHtml: バナー表示用のHTML
export const affiliates: AffiliatesProps[] = [
  {
    name: "Trip.com",
    affiliateUrl:
      "https://jp.trip.com/?Allianceid=7063246&SID=258431426&trip_sub1=",
    homeUrl: "https://jp.trip.com/partners/index",
    type: "banner",
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description:
      "航空券・ホテル・列車まで、旅の予約がこれ一つで完結！セールも豊富でお得に旅しよう。",
    status: "ready",
    bannerHtml: `<a href="https://jp.trip.com/?Allianceid=7063246&SID=258431426&trip_sub1=" target="_blank" rel="noopener noreferrer"><img src="/images/Hokkaido/air-plane.jpg" alt="Trip.com Banner"/></a>`,
  },
  {
    name: "Booking.com",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    icon: <BedDouble className="w-10 h-10 text-primary" />,
    description: "世界中のホテルや宿を網羅。豊富な口コミで安心して選べます。",
    status: "pending",
    bannerHtml: `<a href="YOUR_AFFILIATE_LINK_HERE" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=Booking.com+Banner" alt="Booking.com Banner"/></a>`,
  },
  {
    name: "Airbnb",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    icon: <Home className="w-10 h-10 text-primary" />,
    description: "現地の人から借りるユニークな宿で、特別な宿泊体験を。",
    status: "pending",
    bannerHtml: `<a href="YOUR_AFFILIATE_LINK_HERE" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=Airbnb+Banner" alt="Airbnb Banner"/></a>`,
  },
  {
    name: "Klook",
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=99371&aff_adid=1126092&k_site=https%3A%2F%2Fwww.klook.com%2F",
    homeUrl: "https://affiliate.klook.com/ja/",
    type: "card",
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "遊びの予約に特化。テーマパークや現地ツアーをお得に予約。",
    status: "ready",
    bannerHtml: `<a href="https://affiliate.klook.com/redirect?aid=99371&aff_adid=1126092&k_site=https%3A%2F%2Fwww.klook.com%2F" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=Klook+Banner" alt="Klook Banner"/></a>`,
  },
  {
    name: "GetYourGuide",
    affiliateUrl:
      "https://www.getyourguide.com?partner_id=GTNOM0E&utm_medium=online_publisher",
    homeUrl: "https://partner.getyourguide.com/",
    type: "card",
    icon: <Ticket className="w-10 h-10 text-primary" />,
    description: "世界中のユニークな体験ツアーが見つかる。旅の思い出作りに。",
    status: "ready",
    bannerHtml: `<a href="https://www.getyourguide.com?partner_id=GTNOM0E&utm_medium=online_publisher" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=GetYourGuide+Banner" alt="GetYourGuide Banner"/></a>`,
  },
  {
    name: "Omio",
    affiliateUrl: "https://omio.sjv.io/MAqKX2",
    homeUrl: "https://www.omio.jp/affiliate",
    type: "card",
    icon: <Train className="w-10 h-10 text-primary" />,
    description: "ヨーロッパの鉄道やバスをまとめて検索・予約。周遊旅行に便利。",
    status: "ready",
    bannerHtml: `<a href="https://omio.sjv.io/MAqKX2" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=Omio+Banner" alt="Omio Banner"/></a>`,
  },
  {
    name: "SkyScanner",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    icon: <Plane className="w-10 h-10 text-primary" />,
    description: "世界中の航空券を一発で比較",
    status: "pending",
    bannerHtml: `<a href="YOUR_AFFILIATE_LINK_HERE" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=SkyScanner+Banner" alt="SkyScanner Banner"/></a>`,
  },
  {
    name: "Trifa",
    affiliateUrl: "YOUR_AFFILIATE_LINK_HERE",
    homeUrl: "YOUR_AFFILIATE_LINK_HERE",
    type: "card",
    icon: <Wifi className="w-10 h-10 text-primary" />,
    description: "eSIMで海外でもスマホを快適に。SIMの差し替え不要で楽々。",
    status: "pending",
    bannerHtml: `<a href="YOUR_AFFILIATE_LINK_HERE" target="_blank" rel="noopener noreferrer"><img src="https://via.placeholder.com/1200x400.png?text=Trifa+Banner" alt="Trifa Banner"/></a>`,
  },
];
