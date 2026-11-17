import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the hero headline and main call to action', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Email marketing\s*without the hassle\./);
  await expect(page.getByRole('link', { name: 'Start free' })).toBeVisible();
});

test('has every homepage section in order', async ({ page }) => {
  const headings = page.getByRole('heading', { level: 2 });
  await expect(headings).toHaveText([
    'Everything you need to grow a list. Nothing you’ll pay extra for.',
    'Set it up once. It keeps sending.',
    'Free to start. Fair as you grow.',
    'Switch in 7 days. We do the moving.',
    'Plugs into your stack',
    'Run campaigns from your AI assistant',
    'Real humans, around the clock.',
    'Your next send starts here.',
    'Product',
    'Use cases',
    'Resources',
  ]);
});

test('hero signup confirms without sending anything', async ({ page }) => {
  await page.getByLabel('Your email').first().fill('test@example.com');
  await page.getByTestId('hero-email-form').getByRole('button', { name: 'Start free' }).click();
  await expect(page.getByTestId('hero-email-status')).toHaveText(/no email was sent/);
});

test('hero signup rejects an invalid email', async ({ page }) => {
  await page.getByLabel('Your email').first().fill('not-an-email');
  await page.getByTestId('hero-email-form').getByRole('button', { name: 'Start free' }).click();
  await expect(page.getByTestId('hero-email-status')).toHaveText('');
});

test('pricing shows the free plan and both paid plans', async ({ page }) => {
  await expect(page.getByTestId('plan-free')).toContainText('$0');
  const paid = page.getByTestId('plan-paid');
  await expect(paid).toContainText('Standard');
  await expect(paid).toContainText('$7');
  await expect(paid).toContainText('Professional');
  await expect(paid).toContainText('$15');
});

test('all images load', async ({ page }) => {
  // Images below the fold are lazy-loaded, so scroll through the page first.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  });
  const images = page.locator('img');
  await expect
    .poll(() => images.evaluateAll((imgs) => (imgs as HTMLImageElement[]).filter((img) => img.naturalWidth === 0).map((img) => img.alt || img.src)))
    .toEqual([]);
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hides the main nav and has no horizontal scroll', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('no text spills outside its box', async ({ page }) => {
    const spills = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('main a, main button, main h1, main h2, main h3, header a')]
        .filter((el) => el.scrollWidth > el.clientWidth + 1 || el.getBoundingClientRect().right > window.innerWidth)
        .map((el) => el.textContent?.trim()),
    );
    expect(spills).toEqual([]);
  });
});
