import re
import time
from playwright.sync_api import sync_playwright, Page, expect

def verify_planner_output(page: Page):
    """
    This script verifies that the AI Planner output is formatted correctly.
    It checks that the output is an itinerary with daily headings and no conversational text.
    """
    # 1. Navigate to the AI Planner page.
    page.goto("http://localhost:3000/ai-planner")

    # Wait for the page to load, specifically for the main heading.
    expect(page.get_by_role("heading", name="AI Travel Planner")).to_be_visible(timeout=20000)

    # 2. Interact with the form to generate a travel plan.

    # Step 1: Select Country
    country_select = page.get_by_label("旅行先の国を選択")
    expect(country_select).to_be_visible()
    country_select.click()
    page.get_by_role('option', name='日本').click()

    # Step 2: Select Destination
    # Wait for the destination select to be enabled and visible
    destination_select = page.get_by_label("目的地を選択")
    expect(destination_select).to_be_enabled(timeout=10000)
    expect(destination_select).to_be_visible()
    destination_select.click()
    page.get_by_role('option', name='東京').click()

    # Step 3: Enter Interests
    interests_input = page.get_by_placeholder("例：アート、美味しいもの、絶景")
    expect(interests_input).to_be_visible()
    interests_input.fill("美味しいラーメンと歴史的なお寺を巡りたい")

    # Step 4: Generate Plan
    generate_button = page.get_by_role("button", name="プランを作成する")
    expect(generate_button).to_be_enabled()
    generate_button.click()

    # 3. Wait for the plan to be generated.
    # The process involves multiple streaming steps. We need to wait for the final result.
    # We can look for the final message bubble. A timeout of 180s should be sufficient.
    final_message_locator = page.locator(".markdown-body").last
    expect(final_message_locator).to_be_visible(timeout=180000)

    # Allow a brief moment for rendering to complete after visibility.
    time.sleep(5)

    # 4. Assert that the final output is formatted correctly.
    # The content should start with a daily heading like "1日目".
    # It should not contain conversational filler.
    final_content = final_message_locator.inner_text()

    # Check for the presence of daily headings
    assert re.search(r"1日目", final_content), "The plan should start with '1日目'"
    assert re.search(r"2日目", final_content), "The plan should contain '2日目'"

    # Check for the absence of conversational phrases (this is a basic check)
    assert "承知いたしました" not in final_content, "The plan should not contain conversational phrases."
    assert "旅行プラン" not in final_content, "The plan should not contain conversational phrases like '旅行プラン'."
    assert "ご提案します" not in final_content, "The plan should not contain conversational phrases."

    # 5. Take a screenshot of the result.
    page.screenshot(path="jules-scratch/verification/verification.png")

    print("Verification script completed successfully.")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_planner_output(page)
        finally:
            browser.close()

if __name__ == "__main__":
    main()
