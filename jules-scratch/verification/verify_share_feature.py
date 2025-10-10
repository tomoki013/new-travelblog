import re
import time
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Give the server a moment to start
        time.sleep(15)

        page.goto("http://localhost:3000/ai-planner", timeout=60000)

        # Step 1: Select Country
        page.get_by_role("combobox").click()
        page.get_by_role("option", name="スペイン").click()

        # Wait for suggestions to load
        expect(page.get_by_role("button", name="マドリード")).to_be_visible(timeout=10000)

        # Step 2: Enter Destination
        page.get_by_role("button", name="マドリード").click()

        # Step 3: Select Duration
        page.get_by_role("combobox").last.click()
        page.get_by_role("option", name="3日間").click()

        # Step 4: Enter Interests
        page.get_by_role("button", name="グルメ旅").click()

        # Step 5: Generate Plan
        page.get_by_role("button", name="旅行プランを生成する").click()

        # Wait for the plan to be generated. This can take a while.
        expect(page.get_by_role("button", name="別のプランを生成する")).to_be_visible(timeout=180000)

        # The share button should be visible now
        share_button = page.get_by_role("button", name="このプランを共有する")
        expect(share_button).to_be_visible()

        # Step 6: Click Share button
        share_button.click()

        # Step 7: Verify success toast
        success_toast = page.get_by_text("共有URLをクリップボードにコピーしました！")
        expect(success_toast).to_be_visible(timeout=10000)

        # Step 8: Take screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification script completed successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
