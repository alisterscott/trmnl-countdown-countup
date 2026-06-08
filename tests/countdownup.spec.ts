import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("can see a standard sized display for a date in 2 days", async ({
  page,
}) => {
  const sourceFile = path.join(__dirname, "in2days.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");

  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  if (!fs.existsSync(destFile)) {
    throw new Error(`Destination file not found: ${destFile}`);
  }

  const originalContent = fs.readFileSync(destFile, "utf-8"); // Save original content to restore later

  fs.copyFileSync(sourceFile, destFile);

  try {
    const routes = ["/full", "/half_horizontal", "/half_vertical", "/quadrant"];

    for (const route of routes) {
      await test.step(`Testing route: ${route}`, async () => {
        await page.goto(route);
        await page.getByRole("link", { name: "Poll" }).click();
        const trmnlFrame = page.frameLocator("iframe");
        if (route === "/full" || route === "/quadrant") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-heading"))
            .toHaveText("it is");
        }
        await expect.soft(trmnlFrame.locator("div.fdp-count")).toHaveText("2");
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText("days until");
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText("10");
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText("June");
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText("2026");
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText("10 June 2026");
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});
