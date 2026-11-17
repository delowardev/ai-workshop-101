import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/blog');
});

test('header and footer link to the blog, with Resources marked current', async ({ page }) => {
  const resources = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Resources' });
  await expect(resources).toHaveAttribute('aria-current', 'page');
  await expect(resources).toHaveAttribute('href', /\/blog\/?$/);
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Blog' })).toHaveAttribute('href', /\/blog\/?$/);
});

test('the homepage links to the blog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Resources' }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Better emails, every week.');
});

test('shows the intro and a search field that does nothing', async ({ page }) => {
  await expect(page.getByText('The Sender blog')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Better emails, every week.');
  const search = page.getByRole('searchbox', { name: 'Search articles' });
  await search.fill('welcome');
  await search.press('Enter');
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(search).toHaveValue('welcome');
});

test('lists the categories with All current', async ({ page }) => {
  const categories = page.getByRole('navigation', { name: 'Categories' }).getByRole('link');
  await expect(categories).toHaveText(['All', 'Email marketing', 'Automation', 'Ecommerce', 'Deliverability', 'Lead capture']);
  await expect(categories.first()).toHaveAttribute('aria-current', 'page');
});

test('shows the featured article', async ({ page }) => {
  const featured = page.getByTestId('featured-post');
  await expect(featured.getByRole('heading', { level: 2 })).toHaveText('Subject lines that get opened: 12 patterns worth stealing');
  await expect(featured).toContainText('Featured · Email marketing');
  await expect(featured).toContainText('9 min read');
  await expect(featured).toContainText('Read the article');
});

test('lists six articles with hidden decorative covers', async ({ page }) => {
  const cards = page.getByTestId('post-card');
  await expect(cards).toHaveCount(6);
  await expect(cards.getByRole('heading', { level: 3 })).toHaveText([
    'The welcome series, step by step',
    'Abandoned cart emails that don’t feel pushy',
    'SPF, DKIM and DMARC in plain English',
    'How to clean your list without losing good subscribers',
    'Popups that convert without annoying visitors',
    'Building segments that update themselves',
  ]);
  for (const card of await cards.all()) {
    await expect(card).toContainText(/\d+ min read/);
    await expect(card.locator('[aria-hidden="true"]').first()).toBeAttached();
  }
});

test('has pagination with page 1 current', async ({ page }) => {
  const pagination = page.getByRole('navigation', { name: 'Pagination' });
  await expect(pagination.getByRole('link')).toHaveText(['1', '2', '3', 'Next']);
  await expect(pagination.getByRole('link', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
});

test('newsletter signup confirms without sending anything', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'One email a week. All signal.' })).toBeVisible();
  await page.getByLabel('Your email').fill('test@example.com');
  await page.getByTestId('newsletter-email-form').getByRole('button', { name: 'Subscribe' }).click();
  await expect(page.getByTestId('newsletter-email-status')).toHaveText('Thanks! This is a design preview, so no email was sent.');
});

test('newsletter signup rejects an invalid email', async ({ page }) => {
  await page.getByLabel('Your email').fill('not-an-email');
  await page.getByTestId('newsletter-email-form').getByRole('button', { name: 'Subscribe' }).click();
  await expect(page.getByTestId('newsletter-email-status')).toHaveText('');
});

test('has exactly one orange button', async ({ page }) => {
  const orange = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('a, button')]
      .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(247, 91, 17)')
      .map((el) => el.textContent?.trim()),
  );
  expect(orange).toEqual(['Subscribe']);
});

test('all images load', async ({ page }) => {
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
      [...document.querySelectorAll<HTMLElement>('main a, main button, main h1, main h2, main h3, main input, header a')]
        // Visually hidden headings are 1px boxes on purpose.
        .filter((el) => !el.classList.contains('sr-only'))
        .filter((el) => el.scrollWidth > el.clientWidth + 1 || el.getBoundingClientRect().right > window.innerWidth)
        .map((el) => el.textContent?.trim() || el.getAttribute('aria-label') || el.tagName),
    );
    expect(spills).toEqual([]);
  });
});
