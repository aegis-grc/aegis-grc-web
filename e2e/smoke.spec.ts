import { test, expect } from '@playwright/test';
import { routes } from './routes';

for (const route of routes) {
  test(`structure and layout: ${route}`, async ({ page }) => {
    const problems: string[] = [];
    page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
    page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));

    const res = await page.goto(route);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('header.site-header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);

    // No page-level horizontal scroll at any viewport.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);

    expect(problems).toEqual([]);
  });
}
