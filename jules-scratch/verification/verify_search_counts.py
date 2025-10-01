import re
from playwright.sync_api import sync_playwright, expect

def verify_search_functionality(page):
    # --- 1. Verify Search Overlay ---
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")

    print("Opening search overlay...")
    # ヘッダー内の検索ボタンをクリック
    page.locator('header button[aria-label="検索を開く"]').click()

    # オーバーレイが表示されるのを待つ
    overlay = page.locator('div[role="dialog"], .fixed.inset-0.z-50') # Fallback selector
    expect(overlay).to_be_visible(timeout=10000)
    print("Search overlay is visible.")

    print("Typing search query 'Spain'...")
    search_input = overlay.get_by_placeholder("キーワードを入力...")
    search_input.fill("Spain")

    # 検索結果の件数表示を待つ
    print("Waiting for search results count...")
    results_count_locator = overlay.locator('text=/検索結果: .*件/')
    expect(results_count_locator).to_be_visible(timeout=10000)

    # 件数が0より大きいことを確認
    results_text = results_count_locator.inner_text()
    count = int(re.search(r'(\d+)', results_text).group(1))
    assert count > 0, f"Expected search results to be greater than 0, but got {count}"
    print(f"Search overlay count is visible: {results_text}")

    # スクリーンショットを撮る
    print("Taking screenshot of search overlay...")
    page.screenshot(path="jules-scratch/verification/search_overlay_verification.png")
    print("Screenshot saved to jules-scratch/verification/search_overlay_verification.png")

    # オーバーレイを閉じる
    overlay.get_by_label("検索を閉じる").click()
    expect(overlay).not_to_be_visible()
    print("Search overlay closed.")


    # --- 2. Verify Posts Page ---
    print("\nNavigating to posts page with search query...")
    page.goto("http://localhost:3000/posts?search=Spain&category=all")

    # 検索結果の件数表示を待つ
    print("Waiting for posts page results count...")
    posts_page_results_locator = page.locator('text=/検索結果: .*件/')
    expect(posts_page_results_locator).to_be_visible(timeout=10000)

    # 件数が0より大きいことを確認
    posts_page_results_text = posts_page_results_locator.inner_text()
    posts_count = int(re.search(r'(\d+)', posts_page_results_text).group(1))
    assert posts_count > 0, f"Expected posts page results to be greater than 0, but got {posts_count}"
    print(f"Posts page count is visible: {posts_page_results_text}")

    # スクリーンショットを撮る
    print("Taking screenshot of posts page...")
    page.screenshot(path="jules-scratch/verification/posts_page_verification.png")
    print("Screenshot saved to jules-scratch/verification/posts_page_verification.png")

    print("\nVerification script completed successfully!")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_search_functionality(page)
        finally:
            browser.close()

if __name__ == "__main__":
    main()