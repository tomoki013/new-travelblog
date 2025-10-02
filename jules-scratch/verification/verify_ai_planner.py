import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_ai_planner_ui(page: Page):
    """
    Verifies the UI/UX improvements on the AI Planner page.
    1. Checks the initial form state.
    2. Simulates user input and plan generation.
    3. Verifies the conversation view and feedback section after generation.
    """
    # 1. Navigate to the page
    page.goto("http://localhost:3000/ai-planner")

    # 2. Verify initial state
    expect(page.get_by_role("heading", name="AI Travel Planner (Beta)")).to_be_visible()
    expect(page.get_by_text("この機能は現在ベータ版です。")).to_be_visible()
    expect(page.get_by_label("Step 1: 国を選択")).to_be_visible()
    expect(page.get_by_label("Step 2: 行き先")).to_be_visible()
    expect(page.get_by_label("Step 3: 期間")).to_be_visible()
    expect(page.get_by_label("Step 4: 興味・関心")).to_be_visible()

    # 3. Fill out the form
    page.get_by_label("Step 2: 行き先").fill("マドリード")
    page.get_by_label("Step 3: 期間").fill("5日間")
    page.get_by_label("Step 4: 興味・関心").fill("美術館巡りと美味しいパエリアが食べたい")

    # 4. Generate plan
    generate_button = page.get_by_role("button", name="旅行プランを生成する")
    expect(generate_button).to_be_enabled()
    generate_button.click()

    # 5. Verify the conversation view
    # Wait for the initial form to disappear
    expect(page.get_by_label("Step 1: 国を選択")).not_to_be_visible(timeout=10000)

    # Check for user message
    expect(page.get_by_text("- 国: Spain")).to_be_visible()
    expect(page.get_by_text("- 行き先: マドリード")).to_be_visible()

    # Wait for AI response to appear and finish streaming
    # We can look for the feedback section which appears after the response is complete.
    feedback_section = page.get_by_text("この旅行プランはお役に立ちましたか？")
    expect(feedback_section).to_be_visible(timeout=60000) # Increased timeout for AI generation

    # Check that AI response is not empty
    ai_message_div = page.locator('.prose').last
    expect(ai_message_div).not_to_be_empty()

    # 6. Take screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

# Main execution block
if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_ai_planner_ui(page)
            print("Verification script completed successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()