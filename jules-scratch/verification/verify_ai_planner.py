import time
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(locale="ja-JP")
    page = context.new_page()

    try:
        # AIプランナーのページに移動します
        page.goto("http://localhost:3000/ai-planner", timeout=60000)

        # ページの読み込みを待ちます（特に国のセレクター）
        expect(page.get_by_label("Step 1: 国を選択")).to_be_visible(timeout=30000)
        print("✅ AI Planner page loaded.")

        # Step 1: 国を選択
        country_selector = page.get_by_label("Step 1: 国を選択")
        country_selector.click()
        # 例として「スペイン」を選択
        page.get_by_role("option", name="スペイン").click()
        print("✅ Country 'スペイン' selected.")

        # Step 2が表示されるのを待ちます
        step2_label = page.get_by_label("Step 2: 行き先")
        expect(step2_label).to_be_visible()

        # Step 2: 行き先を入力し、Enterキーを押して送信します
        step2_label.fill("マドリード")
        step2_label.press("Enter")
        print("✅ Destination 'マドリード' entered and submitted.")

        # Step 3が表示されるのを待ちます
        step3_label = page.get_by_label("Step 3: 期間")
        expect(step3_label).to_be_visible()

        # Step 3: 期間を選択
        step3_label.click()
        page.get_by_role("option", name="3日間").click()
        print("✅ Duration '3日間' selected.")

        # Step 4が表示されるのを待ちます
        expect(page.get_by_label("Step 4: 興味・関心")).to_be_visible()

        # Step 4: 興味・関心を入力
        page.get_by_label("Step 4: 興味・関心").fill("美術館とグルメ")
        print("✅ Interests '美術館とグルメ' entered.")

        # 生成ボタンを見つけてクリックします
        generate_button = page.get_by_role("button", name="旅行プランを生成する")
        expect(generate_button).to_be_enabled()
        generate_button.click()
        print("✅ 'Generate' button clicked.")

        # AIの応答が開始されるのを待ちます。
        print("⏳ Waiting for AI response...")
        expect(page.get_by_text("プランを生成中...")).to_be_hidden(timeout=90000)
        print("✅ AI response generation finished.")

        # まずクッキーバナーを閉じます (DOMの最後にあると仮定)
        # バナーが表示されるまで少し待ちます
        page.wait_for_timeout(1000)
        page.get_by_role("button", name="閉じる").last.click()
        print("✅ Cookie banner closed.")

        # UIが安定するのを待ちます
        page.wait_for_timeout(500)

        # 次にフィードバックモーダルを閉じます
        feedback_modal_close_button = page.get_by_role("button", name="閉じる")
        expect(feedback_modal_close_button).to_be_visible(timeout=10000)
        feedback_modal_close_button.click()
        print("✅ Feedback modal closed.")

        # 応答が完全に読み込まれ、「別のプランを生成する」ボタンが表示されることを確認します。
        expect(page.get_by_role("button", name="別のプランを生成する")).to_be_visible(timeout=5000)
        print("✅ 'Generate another plan' button is visible.")

        # スクリーンショットを撮影します
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("📸 Screenshot taken successfully.")

    except Exception as e:
        print(f"❌ An error occurred during verification: {e}")
        # エラーが発生した場合もスクリーンショットを撮ってデバッグに役立てます
        page.screenshot(path="jules-scratch/verification/error.png")
        # 例外を再スローして、実行が失敗したことを示します
        raise
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run_verification(playwright)