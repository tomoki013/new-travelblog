import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    time.sleep(15) # Wait for dev server to start
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")
    footer = page.locator("footer")
    footer.scroll_into_view_if_needed()
    page.screenshot(path="jules-scratch/verification/footer_screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
