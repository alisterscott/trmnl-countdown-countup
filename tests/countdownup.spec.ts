import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("can see all display sizes for a date in 2 days", async ({ page }) => {
  const sourceFile = path.join(__dirname, "in2days.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedHeadingText = "it is";
  const expectedDaysText = "2";
  const expectedText = "days until";
  const expectedDateDay = "10";
  const expectedDateMonth = "June";
  const expectedDateYear = "2026";
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

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
            .toHaveText(expectedHeadingText);
        }
        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedDaysText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedText);
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText(expectedDateDay);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText(expectedDateMonth);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText(expectedDateYear);
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText(expectedFullDate);
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});

test("can see a all display sizes for a date in 1 day", async ({ page }) => {
  const sourceFile = path.join(__dirname, "in1day.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedHeadingText = "it is";
  const expectedDaysText = "1";
  const expectedText = "day until";
  const expectedDateDay = "10";
  const expectedDateMonth = "June";
  const expectedDateYear = "2026";
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

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
            .toHaveText(expectedHeadingText);
        }
        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedDaysText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedText);
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText(expectedDateDay);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText(expectedDateMonth);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText(expectedDateYear);
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText(expectedFullDate);
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});

test("can see all display sizes for today (shows zero)", async ({ page }) => {
  const sourceFile = path.join(__dirname, "today.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedHeadingText = "it is";
  const expectedDaysText = "0";
  const expectedText = "days until";
  const expectedDateDay = "10";
  const expectedDateMonth = "June";
  const expectedDateYear = "2026";
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

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
            .toHaveText(expectedHeadingText);
        }
        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedDaysText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedText);
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText(expectedDateDay);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText(expectedDateMonth);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText(expectedDateYear);
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText(expectedFullDate);
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});

test("can see all display sizes for a date 2 days ago", async ({ page }) => {
  const sourceFile = path.join(__dirname, "2daysago.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedHeadingText = "it has been";
  const expectedDaysText = "2";
  const expectedText = "days since";
  const expectedDateDay = "6";
  const expectedDateMonth = "June";
  const expectedDateYear = "2026";
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

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
            .toHaveText(expectedHeadingText);
        }
        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedDaysText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedText);
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText(expectedDateDay);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText(expectedDateMonth);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText(expectedDateYear);
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText(expectedFullDate);
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});

test("can see all display sizes for a date 1 day ago", async ({ page }) => {
  const sourceFile = path.join(__dirname, "1dayago.trmnlp.yml");
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedHeadingText = "it has been";
  const expectedDaysText = "1";
  const expectedText = "day since";
  const expectedDateDay = "7";
  const expectedDateMonth = "June";
  const expectedDateYear = "2026";
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

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
            .toHaveText(expectedHeadingText);
        }
        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedDaysText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedText);
        if (route !== "/half_vertical") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-day"))
            .toHaveText(expectedDateDay);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-month"))
            .toHaveText(expectedDateMonth);
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-year"))
            .toHaveText(expectedDateYear);
        } else {
          await expect
            .soft(trmnlFrame.locator("div.fdp-target-combined"))
            .toHaveText(expectedFullDate);
        }
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8"); // Restore original content
  }
});
