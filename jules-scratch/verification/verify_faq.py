from playwright.sync_api import sync_playwright, Page, expect
import time

def verify_faq_page(page: Page):
    """
    This test verifies that the FAQ page is correctly translated to Japanese,
    and that the new animations are working as expected.
    """
    # 1. Arrange: Go to the FAQ page.
    page.goto("http://localhost:3000/faq")

    # Give the server a moment to start up if it's slow.
    print("Waiting for the development server to start...")
    time.sleep(30)
    print("Continuing with verification...")

    # Take a screenshot immediately to debug the page state.
    page.screenshot(path="jules-scratch/verification/debug_faq_page.png")
    print("Debug screenshot captured.")

    # 2. Assert: Check for Japanese content.
    expect(page.get_by_role("heading", name="よくある質問")).to_be_visible()
    expect(page.get_by_text("このサイトについて")).to_be_visible()

    # 3. Act & Assert: Interact with the accordion and check animations.
    # Click the first FAQ item to open it.
    first_question = page.get_by_text("このサイトについて")
    first_question.click()

    # Wait for the animation to complete.
    page.wait_for_timeout(500)

    # Check if the answer is visible.
    expect(page.get_by_text("このサイトは旅行ブログとして、様々な観光地を紹介しています。")).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/faq_page.png")
    print("Screenshot captured successfully.")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    verify_faq_page(page)
    browser.close()
