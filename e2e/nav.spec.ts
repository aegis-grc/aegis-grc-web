import { test, expect } from '@playwright/test';

test.describe('desktop mega-menu', () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop navigation only');
  });

  test('opens and closes with the keyboard and keeps aria state in sync', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('#products-trigger');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAttribute('aria-controls', 'mega-products');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mega-products')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.locator('#mega-products a').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await expect(page.locator('#mega-products')).toBeHidden();
  });

  test('hover opens and leaving closes; hover then click pins it open', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('#products-trigger');
    await trigger.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.move(700, 800);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.hover();
    await trigger.click(); // pins: must not close the menu the pointer just opened
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.move(700, 800);
    await page.waitForTimeout(300);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await trigger.click(); // second click closes
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('closes when clicking outside', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('#products-trigger');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.click(700, 800);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('lists the three products, with Aria as a secondary link and not a product', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('#products-trigger').click();
    const products = page.locator('#mega-products .mega-products > li > a.mega-item');
    await expect(products).toHaveText([/Aegis GRC/, /Aegis Amplify/, /Aegis Sentinel/]);
    await expect(page.locator('#mega-products .aria-link')).toContainText('Meet Aria');
    await expect(page.locator('#mega-products .mega-foot a.link-arrow')).toHaveAttribute(
      'href',
      '/products/',
    );
  });
});

test.describe('mobile drawer', () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name === 'desktop', 'drawer is below 960px');
  });

  test('toggles with aria-expanded, lists products inline, and closes on link click', async ({
    page,
  }) => {
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#site-nav')).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#site-nav')).toBeVisible();
    await expect(page.getByRole('link', { name: /Aegis Sentinel/ }).first()).toBeVisible();

    await page.locator('#site-nav').getByRole('link', { name: 'Security', exact: true }).click();
    await expect(page).toHaveURL(/\/security\/$/);
  });

  test('Escape closes the drawer and returns focus to the toggle', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    await toggle.click();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('navigation and content remain reachable', async ({ page }, info) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    // Products falls back to a plain link to /products/.
    await expect(page.locator('a.nav-fallback')).toHaveAttribute('href', '/products/');
    if (info.project.name !== 'desktop') {
      await expect(page.locator('#site-nav')).toBeVisible();
    }
    await expect(
      page.locator('main').getByRole('link', { name: /Explore Aegis GRC/ }),
    ).toBeVisible();
  });
});

test.describe('contact and sign-in', () => {
  test('contact preselects the topic from the query string', async ({ page }) => {
    await page.goto('/contact/?topic=sentinel');
    await expect(page.locator('#cf-topic')).toHaveValue('sentinel');
  });

  test('contact form composes a mailto with the chosen topic', async ({ page }) => {
    await page.goto('/contact/?topic=grc');
    await page.evaluate(() => {
      document.getElementById('contact-form')!.addEventListener('contact:compose', (e) => {
        e.preventDefault(); // do not launch a mail client
        (window as unknown as { composed: string }).composed = (e as CustomEvent).detail.href;
      });
    });
    await page.fill('#cf-name', 'Test Person');
    await page.fill('#cf-email', 'test@example.com');
    await page.fill('#cf-company', 'Example Co');
    await page.fill('#cf-message', 'We need a quote.');
    await page.click('button[type=submit]');
    const href = await page.evaluate(() => (window as unknown as { composed: string }).composed);
    expect(href).toMatch(/^mailto:[^?]+\?subject=/);
    const q = new URL(href.replace('mailto:', 'http://x/?').replace('?subject', '&subject'));
    expect(decodeURIComponent(q.searchParams.get('subject') ?? '')).toBe(
      'Aegis enquiry: Aegis GRC',
    );
    const body = decodeURIComponent(q.searchParams.get('body') ?? '');
    expect(body).toContain('We need a quote.');
    expect(body).toContain('Work email: test@example.com');
    expect(body).toContain('Company: Example Co');
  });

  test('sign-in shows no dead links when app URLs are not configured', async ({ page }) => {
    await page.goto('/sign-in/');
    const links = await page
      .locator('main a')
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    for (const href of links) {
      expect(href, 'every link is a real route or mailto').toMatch(/^(\/|mailto:)/);
    }
    await expect(page.getByText('comes from your administrator')).toHaveCount(3);
  });
});
