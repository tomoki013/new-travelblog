from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the gallery page
        page.goto("http://localhost:3000/gallery")

        # Wait for the page to load and for at least one image to be visible
        # We'll target an image by its 'alt' attribute, which should be present.
        # This is a robust way to ensure the dynamic content has loaded.
        first_image = page.locator("img[alt]").first
        expect(first_image).to_be_visible(timeout=30000) # 30 second timeout

        print("Gallery page loaded successfully and at least one image is visible.")

        # Take a screenshot for visual verification
        screenshot_path = "jules-scratch/verification/gallery.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        # Clean up
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)