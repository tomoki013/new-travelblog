import asyncio
from playwright.async_api import async_playwright, expect
import re

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            print("Starting frontend verification script...")
            # Give the dev server some time to start up
            print("Waiting for dev server to be ready...")
            await asyncio.sleep(20)

            await page.goto("http://localhost:3000/ai-planner", timeout=120000)
            print("Navigated to AI Planner page.")

            # Fill out the form to trigger the plan generation
            await page.get_by_role("combobox").first.click()
            await page.get_by_role("option", name="スペイン").click()
            print("Selected country: Spain")

            await expect(page.get_by_label("Step 2: 行き先")).to_be_visible(timeout=10000)
            await page.get_by_placeholder("例: パリ、バンコク").fill("マドリード")
            await page.get_by_placeholder("例: パリ、バンコク").press("Enter")
            print("Entered destination: Madrid")

            await expect(page.get_by_label("Step 3: 期間")).to_be_visible(timeout=10000)
            await page.get_by_role('combobox').nth(1).click()
            await page.get_by_role('option', name='3日間').click()
            print("Selected duration: 3 days")

            await expect(page.get_by_label("Step 4: 興味・関心")).to_be_visible(timeout=10000)
            await page.get_by_placeholder("例: 寺院巡りがしたい").fill("アートと美味しいもの")
            print("Entered interests: Art and delicious food")

            # Click the generate button
            await page.get_by_role("button", name="旅行プランを生成する").click()
            print("Clicked 'Generate Plan' button.")

            # Verification: Check that the final AI message contains BOTH the outline and the error
            # This verifies the new graceful error handling
            ai_message_locator = page.locator(".prose").nth(-1)

            # Verification: Check that ONLY the error message is displayed, as the first API call fails.

            # 1. Assert that the error message is present.
            await expect(ai_message_locator).to_contain_text(re.compile("エラー:"), timeout=30000)
            print("Verified: Error message is visible.")

            # 2. Assert that the outline is NOT present.
            await expect(ai_message_locator).not_to_contain_text(re.compile("1日目"))
            print("Verified: Plan outline is not visible, as expected.")

            print("\n--- Frontend Verification Result ---")
            print("✅ Successfully verified the initial API error handling UX.")

            # Take a screenshot for confirmation
            await page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot saved to jules-scratch/verification/verification.png")

        except Exception as e:
            print(f"An error occurred during frontend verification: {e}")
            await page.screenshot(path="jules-scratch/verification/verification_failed.png")
            print("Screenshot saved to jules-scratch/verification/verification_failed.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
