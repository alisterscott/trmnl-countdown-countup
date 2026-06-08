import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

async function assertAllRoutes(
  page: any,
  sourceFileName: string,
  expectedHeadingText: string,
  expectedCountText: string,
  expectedRelationText: string,
  expectedDateDay: string,
  expectedDateMonth: string,
  expectedDateYear: string,
) {
  const sourceFile = path.join(__dirname, sourceFileName);
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");
  const expectedFullDate = `${expectedDateDay} ${expectedDateMonth} ${expectedDateYear}`;

  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  if (!fs.existsSync(destFile)) {
    throw new Error(`Destination file not found: ${destFile}`);
  }

  const originalContent = fs.readFileSync(destFile, "utf-8");
  fs.copyFileSync(sourceFile, destFile);

  try {
    const routes = ["/full", "/half_horizontal", "/half_vertical", "/quadrant"];

    for (const route of routes) {
      await test.step(`Testing route: ${route}`, async () => {
        await page.goto(route);
        const trmnlFrame = page.frameLocator("iframe");

        if (route === "/full" || route === "/quadrant") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-heading"))
            .toHaveText(expectedHeadingText);
        }

        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedCountText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedRelationText);

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
    fs.writeFileSync(destFile, originalContent, "utf-8");
  }
}

test("can see all display sizes for a date in 2 days", async ({ page }) => {
  await assertAllRoutes(
    page,
    "in2days.trmnlp.yml",
    "it is",
    "2",
    "days until",
    "10",
    "June",
    "2026",
  );
});

test("can see a all display sizes for a date in 1 day", async ({ page }) => {
  await assertAllRoutes(
    page,
    "in1day.trmnlp.yml",
    "it is",
    "1",
    "day until",
    "10",
    "June",
    "2026",
  );
});

test("can see all display sizes for today (shows zero)", async ({ page }) => {
  await assertAllRoutes(
    page,
    "today.trmnlp.yml",
    "it is",
    "0",
    "days until",
    "10",
    "June",
    "2026",
  );
});

test("can see all display sizes for a date 2 days ago", async ({ page }) => {
  await assertAllRoutes(
    page,
    "2daysago.trmnlp.yml",
    "it has been",
    "2",
    "days since",
    "6",
    "June",
    "2026",
  );
});

test("uses week for exact one-week difference", async ({ page }) => {
  await assertAllRoutes(
    page,
    "1weekago.trmnlp.yml",
    "it has been",
    "1",
    "week since",
    "1",
    "June",
    "2026",
  );
});

test("uses month for exact one-month difference", async ({ page }) => {
  await assertAllRoutes(
    page,
    "1monthago.trmnlp.yml",
    "it has been",
    "1",
    "month since",
    "8",
    "May",
    "2026",
  );
});

test("uses year for exact one-year difference", async ({ page }) => {
  await assertAllRoutes(
    page,
    "1yearago.trmnlp.yml",
    "it has been",
    "1",
    "year since",
    "8",
    "June",
    "2025",
  );
});

test("falls back to days for just under one year", async ({ page }) => {
  await assertAllRoutes(
    page,
    "justunder1yearago.trmnlp.yml",
    "it has been",
    "364",
    "days since",
    "9",
    "June",
    "2025",
  );
});

test("can see all display sizes for a date 1 day ago", async ({ page }) => {
  await assertAllRoutes(
    page,
    "1dayago.trmnlp.yml",
    "it has been",
    "1",
    "day since",
    "7",
    "June",
    "2026",
  );
});

test("uses week across leap day when difference is exactly 7 days", async ({
  page,
}) => {
  await assertAllRoutes(
    page,
    "leapweekuntil.trmnlp.yml",
    "it is",
    "1",
    "week until",
    "6",
    "March",
    "2024",
  );
});

test("falls back to days for Feb 29 anniversary in non-leap year", async ({
  page,
}) => {
  await assertAllRoutes(
    page,
    "leapdaynonleapanniversary.trmnlp.yml",
    "it has been",
    "365",
    "days since",
    "29",
    "February",
    "2024",
  );
});

async function assertAllRoutesWithCustomText(
  page: any,
  sourceFileName: string,
  expectedHeadingText: string,
  expectedCountText: string,
  expectedRelationText: string,
  expectedCustomText: string,
) {
  const sourceFile = path.join(__dirname, sourceFileName);
  const destFile = path.join(__dirname, "..", ".trmnlp.yml");

  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  if (!fs.existsSync(destFile)) {
    throw new Error(`Destination file not found: ${destFile}`);
  }

  const originalContent = fs.readFileSync(destFile, "utf-8");
  fs.copyFileSync(sourceFile, destFile);

  try {
    const routes = ["/full", "/half_horizontal", "/half_vertical", "/quadrant"];

    for (const route of routes) {
      await test.step(`Testing route: ${route}`, async () => {
        await page.goto(route);
        const trmnlFrame = page.frameLocator("iframe");

        if (route === "/full" || route === "/quadrant") {
          await expect
            .soft(trmnlFrame.locator("div.fdp-heading"))
            .toHaveText(expectedHeadingText);
        }

        await expect
          .soft(trmnlFrame.locator("div.fdp-count"))
          .toHaveText(expectedCountText);
        await expect
          .soft(trmnlFrame.locator("div.fdp-relation"))
          .toHaveText(expectedRelationText);

        // Check that custom text is displayed instead of date elements
        await expect
          .soft(trmnlFrame.locator("div.fdp-target"))
          .toContainText(expectedCustomText);
      });
    }
  } finally {
    fs.writeFileSync(destFile, originalContent, "utf-8");
  }
}

test("displays custom_text instead of target date", async ({ page }) => {
  await assertAllRoutesWithCustomText(
    page,
    "customtext.trmnlp.yml",
    "it is",
    "1",
    "week until",
    "our wedding",
  );
});
