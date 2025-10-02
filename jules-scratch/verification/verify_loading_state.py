from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:3000/ai-planner", timeout=60000)

    # Wait for the page to load
    expect(page.get_by_label("Step 1: 国を選択")).to_be_visible(timeout=30000)

    # Fill out the form
    page.locator('button[id="country"]').click()
    time.sleep(0.5) # Allow options to render
    page.get_by_role("option", name="スペイン").click()
    expect(page.get_by_label("Step 2: 行き先")).to_be_visible()
    page.get_by_label("Step 2: 行き先").fill("マドリード")
    page.keyboard.press("Enter")
    expect(page.get_by_label("Step 3: 期間")).to_be_visible()
    page.locator('button[id="duration"]').click()
    time.sleep(0.5) # Allow options to render
    page.get_by_role("option", name="3日間").click()
    expect(page.get_by_label("Step 4: 興味・関心")).to_be_visible()
    page.get_by_label("Step 4: 興味・関心").fill("グルメ")

    # Click generate button
    page.get_by_role("button", name="旅行プランを生成する").click()

    # Wait for the loading indicator and take screenshot
    loading_indicator = page.locator("svg.animate-spin")
    expect(loading_indicator).to_be_visible(timeout=15000)
    time.sleep(1) # Allow UI to settle
    page.screenshot(path="jules-scratch/verification/loading-state.png")

    browser.close()

with sync_playwright() as p:
    run(p)