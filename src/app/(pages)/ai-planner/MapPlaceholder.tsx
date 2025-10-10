"use client";

import { MapPinIcon } from "lucide-react";

export default function MapPlaceholder() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center">
      <MapPinIcon className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold text-muted-foreground">
        マップ機能は近日公開予定です
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        各アクティビティの場所が地図上で確認できるようになります。
      </p>
    </div>
  );
}
