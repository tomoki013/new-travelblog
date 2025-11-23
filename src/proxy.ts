import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // 現在のパスを取得
  const path = request.nextUrl.pathname;

  // パスに大文字が含まれているかチェック
  if (path !== path.toLowerCase()) {
    // 新しいURLオブジェクトを作成（クエリパラメータ等を維持するため）
    const url = request.nextUrl.clone();

    // パスを小文字に変換
    url.pathname = path.toLowerCase();

    // 308 Permanent Redirect (恒久的なリダイレクト) で転送
    // SEO的に「小文字が正規のURLです」と伝える効果があります
    return NextResponse.redirect(url, 308);
  }

  // 何もしない場合はそのまま処理を続行
  return NextResponse.next();
}

// ミドルウェアを適用するパスの設定
export const config = {
  matcher: [
    /*
     * 以下のパスは除外する（リダイレクト不要なファイル）:
     * - api (API routes)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコン)
     * - 画像ファイル拡張子 (.png, .jpg, .svg など)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
