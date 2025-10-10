import re
import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Wait for the dev server to start
        time.sleep(60)

        page.goto("http://localhost:3000/ai-planner", timeout=60000)

        # Print the page content to debug
        print(page.content())

        # Step 1: Select Country
        page.get_by_label("Step 1: 国を選択").click()
        page.get_by_role("option", name="スペイン").click()

        # Step 2: Select Destination
        page.get_by_role("button", name="マドリード").click()

        # Step 3: Select Duration
        page.get_by_label("Step 3: 期間").click()
        page.get_by_role("option", name="3日間").click()

        # Step 4: Fill Interests
        page.get_by_label("Step 4: 興味・関心").click()
        page.get_by_label("Step 4: 興味・関心").fill("美術館巡りと美味しいタパス")

        # Generate Plan
        page.get_by_role("button", name="旅行プランを生成する").click()

        # Wait for the plan to be generated and the title to be visible
        # The timeout is increased because the AI generation can be slow.
        plan_title = page.get_by_role("heading", level=1)
        expect(plan_title).to_be_visible(timeout=180000)

        # Take a screenshot of the generated plan
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
