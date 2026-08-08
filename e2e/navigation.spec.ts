import { test, expect } from "@playwright/test";

test("home page loads and displays hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1")).toContainText("intelligent software");
});

test("navigation to solutions page works", async ({ page }) => {
  await page.goto("/");
  await page.click('a[href="/solutions"]');
  await expect(page).toHaveURL(/\/solutions/);
  await expect(page.locator("h1")).toBeVisible();
});

test("navigation to contact page works", async ({ page }) => {
  await page.goto("/contact");
  await expect(page).toHaveURL(/\/contact/);
  await expect(page.locator("h1")).toContainText("build something intelligent");
});

test("blog page lists posts", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.locator("h1")).toContainText("Blog");
  await expect(page.locator("a[href*='/blog/']").first()).toBeVisible();
});

test("case studies page loads", async ({ page }) => {
  await page.goto("/case-studies");
  await expect(page.locator("h1")).toContainText("Real projects");
});

test("login page loads", async ({ page }) => {
  await page.goto("/login");
  await expect(page.locator("h1")).toContainText("Welcome back");
});

test("register page loads", async ({ page }) => {
  await page.goto("/register");
  await expect(page.locator("h1")).toContainText("Create your account");
});

test("legal pages load", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.locator("h1")).toContainText("Privacy Policy");

  await page.goto("/terms");
  await expect(page.locator("h1")).toContainText("Terms of Service");

  await page.goto("/security");
  await expect(page.locator("h1")).toContainText("Security by design");
});

test("mobile menu toggles", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const menuButton = page.locator('button[aria-label="Toggle menu"]');
  await menuButton.click();
  await expect(page.locator('a[href="/company"]').first()).toBeVisible();
});
