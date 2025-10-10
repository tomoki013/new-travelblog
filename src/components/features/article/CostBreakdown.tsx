import {
  Wallet,
  Plane,
  Hotel,
  UtensilsCrossed,
  Train,
  Car,
  Camera,
  Ellipsis,
} from "lucide-react";
import React from "react";

// 親コンポーネントから受け取るpropsの型定義
type CostBreakdownProps = {
  costs: { [key: string]: number };
};

// カテゴリキーと日本語名、アイコンをマッピング
const categoryMap: {
  [key: string]: { label: string; icon: React.ElementType };
} = {
  flight: { label: "航空券", icon: Plane },
  hotel: { label: "宿泊費", icon: Hotel },
  food: { label: "食費", icon: UtensilsCrossed },
  train: { label: "鉄道", icon: Train },
  transport: { label: "交通費", icon: Car },
  sightseeing: { label: "観光", icon: Camera },
  other: { label: "その他", icon: Ellipsis },
};

/**
 * 費用の内訳を視覚的に表示するためのカードコンポーネント
 */
const CostBreakdown = ({ costs }: CostBreakdownProps) => {
  // costsオブジェクトが存在しない、または空の場合は何も表示しない
  if (!costs || Object.keys(costs).length === 0) {
    return null;
  }

  // 合計金額を計算
  const totalCost = Object.values(costs).reduce(
    (sum, current) => sum + current,
    0
  );

  // 金額の大きい順にソート
  const sortedCosts = Object.entries(costs).sort(([, a], [, b]) => b - a);

  return (
    <details className="group bg-muted rounded-lg p-6 my-6 border-l-4 border-secondary">
      <summary className="flex cursor-pointer items-center list-none transition-opacity hover:opacity-80">
        <div className="h-5 w-5 text-foreground transition-transform duration-300 group-open:rotate-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-full w-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Wallet className="h-5 w-5 text-foreground" />
          <h3 className="text-lg font-bold text-foreground">費用の内訳</h3>
        </div>
      </summary>
      <ul className="space-y-4">
        {sortedCosts.map(([categoryKey, amount]) => {
          const { label, icon: Icon } = categoryMap[categoryKey] || {
            label: categoryKey,
            icon: Ellipsis,
          };
          const percentage = totalCost > 0 ? (amount / totalCost) * 100 : 0;
          return (
            <li key={categoryKey}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="flex items-center font-medium text-muted-foreground">
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </span>
                <span className="font-semibold">
                  {amount.toLocaleString()}円
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
      {/* 合計金額セクション */}
      <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-base">
        <span>合計金額</span>
        <span>{totalCost.toLocaleString()}円</span>
      </div>
    </details>
  );
};

export default CostBreakdown;
