import time
from playwright.sync_api import sync_playwright, Page, expect

def verify_ai_planner_page(page: Page):
    """
    This test verifies that the AI Planner page displays the new hero section.
    """
    # Wait for the server to start
    time.sleep(15)

    # 1. Arrange: Go to the AI Planner page.
    page.goto("http://localhost:3000/ai-planner")

    # 2. Assert: Check if the hero section's title is visible.
    hero_title = page.get_by_role("heading", name="AIと創る、あなただけの旅")
    expect(hero_title).to_be_visible()

    # 3. Assert: Check if the main content title is visible.
    main_title = page.get_by_role("heading", name="AI旅行プランナー（ベータ版）")
    expect(main_title).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_ai_planner_page(page)
        browser.close()

if __name__ == "__main__":
    main()