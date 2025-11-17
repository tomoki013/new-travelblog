"use client";

import { useMemo } from "react";

// 既存の18種類のローダーアニメーションの情報を配列にまとめる
const loaders = [
  {
    className: "loader-map-route",
    html: `
      <svg width="120" height="70" viewBox="0 0 120 70">
        <path class="map-path" d="M10,50 Q60,10 110,50 T210,50" />
        <path class="route-line" d="M10,50 Q60,10 110,50 T210,50" />
        <path class="plane" d="M0,0 L10,5 L0,10 Z" />
      </svg>
    `,
  },
  {
    className: "loader-journal",
    html: `
      <div class="book">
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
      </div>
    `,
  },
  {
    className: "loader-compass",
    html: `
      <div class="rose">
        <div class="marker n">N</div>
        <div class="marker s">S</div>
        <div class="marker w">W</div>
        <div class="marker e">E</div>
      </div>
      <div class="needle"></div>
    `,
  },
  {
    className: "loader-aperture",
    html: `
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
    `,
  },
  {
    className: "loader-passport-stamp",
    html: `<div class="stamp">✈</div>`,
  },
  {
    className: "loader-airplane-window",
    html: `<div class="clouds"></div>`,
  },
  {
    className: "loader-carousel",
    html: `
      <div class="track"></div>
      <div class="luggage l1"></div>
      <div class="luggage l2"></div>
      <div class="luggage l3"></div>
    `,
  },
  {
    className: "loader-split-flap",
    html: `
      <div class="char-container"><div class="flap top">T</div><div class="flap bottom">T</div></div>
      <div class="char-container"><div class="flap top">R</div><div class="flap bottom">R</div></div>
      <div class="char-container"><div class="flap top">V</div><div class="flap bottom">V</div></div>
      <div class="char-container"><div class="flap top">L</div><div class="flap bottom">L</div></div>
    `,
  },
  {
    className: "loader-lantern",
    html: `
      <div class="lantern" style="left: 20%; animation-delay: 0s;"></div>
      <div class="lantern" style="left: 45%; animation-delay: 1.5s;"></div>
      <div class="lantern" style="left: 70%; animation-delay: 3s;"></div>
    `,
  },
  {
    className: "loader-backpack",
    html: `
      <div class="flap"></div>
      <div class="item passport"></div>
      <div class="item camera"></div>
    `,
  },
  {
    className: "loader-boarding-pass",
    html: `<div class="stub"></div>`,
  },
  {
    className: "loader-postcard",
    html: `
      <svg viewBox="0 0 100 60" class="w-full h-full">
        <path class="writing-path" d="M10 30 C 20 10, 40 10, 50 30 S 80 50, 90 30" />
      </svg>
    `,
  },
  {
    className: "loader-day-night",
    html: `
      <div class="sky">
        <div class="sun-moon"></div>
      </div>
    `,
  },
  {
    className: "loader-landmark",
    html: `
      <svg viewBox="0 0 100 100">
        <path d="M50 2 L98 98 H2 Z" />
      </svg>
    `,
  },
  {
    className: "loader-polaroid",
    html: `<div class="photo"></div>`,
  },
  {
    className: "loader-noodles",
    html: `
      <div class="steam steam1"></div>
      <div class="steam steam2"></div>
      <div class="steam steam3"></div>
    `,
  },
  {
    className: "loader-treasure-chest",
    html: `
      <div class="lid"></div>
      <div class="base"></div>
      <div class="glow"></div>
    `,
  },
  {
    className: "loader-message-bottle",
    html: `
      <div class="wave wave1"></div>
      <div class="bottle"></div>
      <div class="wave wave2"></div>
    `,
  },
];

// 表示するメッセージの配列
const messages = [
  "新しい景色を探しに行きましょう...",
  "最高の旅を計画しています...",
  "未知の冒険が待っています...",
  "次の目的地へ、まもなく出発します...",
  "思い出の1ページを作成中...",
];

export default function Loading() {
  // useMemoを使って、コンポーネントのマウント時にのみランダムな値が選ばれるようにする
  const { selectedLoader, selectedMessage } = useMemo(() => {
    const loaderIndex = Math.floor(Math.random() * loaders.length);
    const messageIndex = Math.floor(Math.random() * messages.length);
    return {
      selectedLoader: loaders[loaderIndex],
      selectedMessage: messages[messageIndex],
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div
        className={selectedLoader.className}
        dangerouslySetInnerHTML={{ __html: selectedLoader.html }}
      />
      <p className="mt-6 text-lg font-semibold text-primary animate-pulse">
        {selectedMessage}
      </p>
    </div>
  );
}
