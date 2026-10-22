import { expect, test } from "@playwright/test";

test("homepage entrance covers the portfolio before JavaScript loads", async ({ page }) => {
  let release!: () => void;
  const scriptsReady = new Promise<void>(resolve => { release = resolve; });
  await page.route(/\/_next\/static\/.*\.js(?:\?|$)/, async route => {
    await scriptsReady;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator(".homepage-entrance")).toBeVisible();
    await expect(page.locator("#intro-heading")).not.toBeVisible();
    await expect(page.locator("#intro-heading")).toHaveText("Noel Biju");
  } finally { release(); }
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-state", "exploring");
});

test("homepage entrance waits for activation, reveals in place and replays on a fresh visit", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("dialog", { name: "Noel Biju", exact: true })).toBeVisible();
  await expect(page.locator(".entrance-content")).toHaveAttribute("inert", "");
  await expect(page.locator("#intro-heading")).not.toBeVisible();
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-chapter", "name", { timeout: 10000 });
  await page.waitForTimeout(30000);
  await expect(page.locator(".homepage-entrance")).toBeVisible();
  await page.getByRole("button", { name: "Enter Noel Biju’s portfolio" }).click({ position: { x: 150, y: 300 } });
  await expect(page.locator(".homepage-entrance")).toHaveCount(0);
  await expect(page.locator("#intro-heading")).toBeVisible();
  await expect(page.locator(".entrance-content")).not.toHaveAttribute("inert");
  await expect(page.locator("main")).toBeFocused();
  await expect(page).toHaveURL(/\/$/);
  await page.reload();
  await expect(page.locator(".homepage-entrance")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-state", "static");
  await page.getByRole("button", { name: "Enter Noel Biju’s portfolio" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#intro-heading")).toBeVisible();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.locator("#intro-heading")).toBeVisible();
  await expect(page.locator(".homepage-entrance")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("internal Home and name links never replay the entrance, including direct inner-page arrivals", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/about");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const expectHome = async () => {
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("#intro-heading")).toBeVisible();
    await expect(page.locator(".homepage-entrance")).toHaveCount(0);
    await expect(page.locator(".entrance-content")).not.toHaveAttribute("inert");
  };
  await page.getByRole("link", { name: "Noel Biju, home", exact: true }).click();
  await expectHome();
  for (const label of ["Projects", "About", "Experience", "Contact"]) {
    await navigation.getByRole("link", { name: label, exact: true }).click();
    await expect(page.locator("h1")).toBeVisible();
    await navigation.getByRole("link", { name: "Home", exact: true }).click();
    await expectHome();
    await navigation.getByRole("link", { name: label, exact: true }).click();
    await page.getByRole("link", { name: "Noel Biju, home", exact: true }).click();
    await expectHome();
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/contact$/);
  await page.goForward();
  await expectHome();
  await page.getByRole("link", { name: "Noel Biju, home", exact: true }).click();
  await expectHome();
  await page.reload();
  await expect(page.locator(".homepage-entrance")).toBeVisible();
  expect(errors).toEqual([]);
});

test("entrance holds indefinitely until deliberately activated", async ({ page, isMobile }) => {
  await page.goto("/enter");
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-chapter", "name", { timeout: 10000 });
  await page.waitForTimeout(30000);
  await expect(page).toHaveURL(/\/enter$/);
  await expect(page.locator(".entry-surface")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  if (!isMobile) {
    await page.mouse.wheel(0, 700);
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/enter$/);
  }
  await page.locator(".entry-surface").click({ position: { x: 150, y: 300 } });
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".entry-intro")).toHaveCount(0);
  await expect(page.locator("main")).not.toHaveAttribute("inert");
});

test("a drag does not enter and a subsequent tap does", async ({ page }) => {
  await page.goto("/enter");
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-state", "exploring");
  await page.mouse.move(100, 300);
  await page.mouse.down();
  await page.mouse.move(210, 340, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(/\/enter$/);
  await page.locator(".entry-surface").click({ position: { x: 150, y: 300 } });
  await expect(page).toHaveURL(/\/$/);
});

test("reduced motion remains deliberate and keyboard accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/enter");
  await expect(page.locator(".entry-intro")).toHaveAttribute("data-state", "static");
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/\/enter$/);
  await page.locator(".entry-surface").focus();
  await page.keyboard.press("Space");
  await expect(page).toHaveURL(/\/$/);
});

test("library search, clear, native language filter and URL restoration work", async ({ page }) => {
  await page.goto("/projects");
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await expect(search).toBeEnabled();
  const total = Number((await page.locator(".library-status [role=status]").innerText()).match(/^\d+/)?.[0]);
  await expect(page.locator(".library-project")).toHaveCount(Math.min(total, 12));
  if (total > 12) {
    await page.getByRole("button", { name: /Load more projects/ }).click();
    await expect(page.locator(".library-project")).toHaveCount(Math.min(total, 24));
  }
  await search.fill("pageradar");
  await expect(page.locator(".library-project")).toHaveCount(1);
  await expect(page).toHaveURL(/q=pageradar/);
  await page.locator(".library-project h3 a").click();
  await expect(page).toHaveURL(/\/projects\/pageradar$/);
  await page.goBack();
  await expect(search).toHaveValue("pageradar");
  await page.getByRole("button", { name: "Clear project search" }).click();
  await expect(search).toBeFocused();
  await page.getByLabel("Language", { exact: true }).selectOption("Python");
  await expect(page).toHaveURL(/language=Python/);
  await search.fill("no-project-with-this-name-123456");
  await expect(page.getByRole("heading", { name: "No projects match just yet." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByLabel("Language", { exact: true })).toHaveValue("all");
});

test("direct routes have unique canonicals, visible content, and no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const path of ["/", "/about", "/projects", "/experience", "/contact", "/projects/pageradar", "/projects/etlab-plus"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    if (path === "/") {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.getByRole("button", { name: "Enter Noel Biju’s portfolio" }).click();
      await expect(page.locator(".homepage-entrance")).toHaveCount(0);
    }
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".entry-intro")).toHaveCount(0);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).href).toBe(new URL(path, "https://noelbiju.in").href);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
  const response = await page.goto("/projects/this-project-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "A loose end." })).toBeVisible();
  expect(errors).toEqual([]);
});

test("content and entrance links work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#intro-heading")).toBeVisible();
  await expect(page.locator(".homepage-entrance")).not.toBeVisible();
  await page.goto("/projects");
  const total = Number((await page.locator(".library-status [role=status]").innerText()).match(/^\d+/)?.[0]);
  await expect(page.locator(".library-project")).toHaveCount(total);
  await page.goto("/enter");
  await page.getByRole("link", { name: "Enter Noel Biju’s portfolio" }).click({ position: { x: 150, y: 300 } });
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Noel Biju" })).toBeVisible();
  await context.close();
});
