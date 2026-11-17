#!/usr/bin/env node
// QA helper for the /qa-tests skill.
//
// Audit mode (default): for every route × viewport, load the page, scroll it so lazy images load,
// take a full-page screenshot and run automated checks. Writes <out>/results.json and prints a summary.
//
//   node .claude/skills/qa-tests/scripts/screenshot.mjs --base http://localhost:3100 --out qa-reports/2026-11-17 / /blog
//   options: --viewports desktop,mobile (default both)
//
// Close-up mode: screenshot one element (padded) to document a bug.
//
//   node .claude/skills/qa-tests/scripts/screenshot.mjs closeup --base http://localhost:3100 \
//     --route /blog --viewport mobile --selector '[data-testid="featured-post"] h2' --out qa-reports/2026-11-17/bug-01.png
//   options: --pad 24 (px around the element), --nth 0 (which match), --hover (hover the element first)
//
// Uses the preinstalled Playwright (require('playwright')); never runs `playwright install`.

import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = createRequire(path.join(process.cwd(), 'noop.js'))('playwright');
}
const { chromium, devices } = playwright;

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  // iPhone 13 (touch, mobile UA, deviceScaleFactor 3), at its full 390×844 screen size:
  // Playwright's preset viewport is 390×664 (Safari chrome subtracted), but the specs use 390×844.
  mobile: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } },
};

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) args[key] = true;
      else args[key] = argv[++i];
    } else args._.push(a);
  }
  return args;
}

async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    // The project's Playwright may pin a version that doesn't match the preinstalled browser.
    if (fs.existsSync('/opt/pw-browsers/chromium')) {
      return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
    }
    throw err;
  }
}

function slug(route) {
  const s = route.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-');
  return s || 'home';
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(300);
}

// Runs in the page. Returns a list of findings for this page and viewport.
function inPageChecks() {
  const out = {};
  const vw = window.innerWidth;
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0;
  };
  const describe = (el) => {
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
    const id = el.id ? `#${el.id}` : '';
    const testid = el.closest('[data-testid]')?.getAttribute('data-testid');
    return { tag: el.tagName.toLowerCase() + id, text: text || el.getAttribute('aria-label') || '', testid: testid || null };
  };
  // Unique-ish CSS selector, used for close-up screenshots.
  const selectorFor = (el) => {
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && node !== document.body) {
      if (node.id) {
        parts.unshift(`#${CSS.escape(node.id)}`);
        break;
      }
      let part = node.tagName.toLowerCase();
      const parent = node.parentElement;
      if (parent) {
        const same = [...parent.children].filter((c) => c.tagName === node.tagName);
        if (same.length > 1) part += `:nth-of-type(${same.indexOf(node) + 1})`;
      }
      parts.unshift(part);
      node = parent;
    }
    return (node === document.body ? 'body > ' : '') + parts.join(' > ');
  };

  // Layout: horizontal scroll and elements poking past the viewport.
  out.horizontalOverflowPx = document.documentElement.scrollWidth - vw;
  out.offscreen = [...document.querySelectorAll('body *')]
    .filter((el) => visible(el) && !el.closest('[aria-hidden="true"]') && !el.classList.contains('sr-only'))
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.right > vw + 1 || r.left < -1;
    })
    // Keep only the outermost offender of each subtree.
    .filter((el, _, all) => !all.some((o) => o !== el && o.contains(el)))
    .filter((el) => {
      // Ignore content clipped by an overflow-hidden/auto ancestor (carousels, scroll rows).
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ov = getComputedStyle(p).overflowX;
        if (ov === 'hidden' || ov === 'auto' || ov === 'scroll' || ov === 'clip') return false;
      }
      return true;
    })
    .slice(0, 20)
    .map((el) => ({ ...describe(el), selector: selectorFor(el), right: Math.round(el.getBoundingClientRect().right) }));

  // Text spilling out of its box (same rule as the e2e specs).
  out.spills = [...document.querySelectorAll('main a, main button, main h1, main h2, main h3, main input, header a, footer a')]
    .filter((el) => visible(el) && !el.classList.contains('sr-only'))
    .filter((el) => el.scrollWidth > el.clientWidth + 1 || el.getBoundingClientRect().right > vw)
    .map((el) => ({ ...describe(el), selector: selectorFor(el), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));

  // Images.
  out.images = [...document.images].map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.getAttribute('alt'),
    broken: img.complete && img.naturalWidth === 0,
    decorative: !!img.closest('[aria-hidden="true"]') || img.getAttribute('alt') === '',
    selector: selectorFor(img),
    nearbyText: (img.parentElement?.textContent || '').trim().slice(0, 60),
  }));
  out.brokenImages = out.images.filter((i) => i.broken);
  out.imagesMissingAlt = out.images.filter((i) => i.alt === null);

  // Links.
  out.links = [...document.querySelectorAll('a')].map((a) => ({
    text: (a.textContent || '').trim().replace(/\s+/g, ' ') || a.getAttribute('aria-label') || '',
    href: a.getAttribute('href'),
    resolved: a.href,
    visible: visible(a),
  }));
  out.placeholderLinks = out.links.filter((l) => l.href === '#').map((l) => l.text);
  out.unnamedControls = [...document.querySelectorAll('a, button, [role="button"]')]
    .filter((el) => visible(el))
    .filter((el) => {
      const name = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').trim();
      const imgAlt = [...el.querySelectorAll('img')].some((i) => (i.getAttribute('alt') || '').trim());
      const labelledby = el.getAttribute('aria-labelledby');
      return !name && !imgAlt && !labelledby;
    })
    .map((el) => ({ ...describe(el), selector: selectorFor(el) }));

  // Form fields need a label.
  out.unlabelledFields = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')]
    .filter((el) => {
      if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) return false;
      if (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) return false;
      return !el.closest('label');
    })
    .map((el) => ({ ...describe(el), selector: selectorFor(el), type: el.type }));

  // Headings.
  out.h1Count = document.querySelectorAll('h1').length;
  out.headings = [...document.querySelectorAll('h1, h2, h3')].map((h) => `${h.tagName}: ${(h.textContent || '').trim().replace(/\s+/g, ' ')}`);

  // Orange (brand-500 #f75b11) buttons visible in the page: CLAUDE.md allows one primary per view.
  const isOrange = (c) => c.replace(/\s/g, '') === 'rgb(247,91,17)';
  out.orangeButtons = [...document.querySelectorAll('a, button')]
    .filter((el) => visible(el) && isOrange(getComputedStyle(el).backgroundColor))
    .map((el) => ({ ...describe(el), selector: selectorFor(el), top: Math.round(el.getBoundingClientRect().top + window.scrollY) }));
  out.smallTargets = [...document.querySelectorAll('main a, main button, header a, header button')]
    .filter((el) => visible(el) && el.closest('main, header'))
    .filter((el) => {
      const cs = getComputedStyle(el);
      const pill = parseFloat(cs.borderTopLeftRadius) >= 999 || cs.borderRadius.includes('9999');
      return pill && el.getBoundingClientRect().height < 44;
    })
    .map((el) => ({ ...describe(el), selector: selectorFor(el), height: Math.round(el.getBoundingClientRect().height) }));

  // Contrast (WCAG AA, using the acceptance criteria rule: 4.5:1, or 3:1 for text 24px and up).
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = '1'] = m[1].split(/[,\s/]+/).filter(Boolean);
    return [Number(r), Number(g), Number(b), Number(a)];
  };
  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const blend = (fg, bg) => {
    const a = fg[3];
    return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1];
  };
  const background = (el) => {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return { unknown: true };
      const c = parse(cs.backgroundColor);
      if (c && c[3] > 0) {
        layers.push(c);
        if (c[3] >= 1) break;
      }
    }
    let bg = [255, 255, 255, 1];
    for (const layer of layers.reverse()) bg = blend(layer, bg);
    return { color: bg };
  };
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const seen = new Set();
  out.contrast = [];
  out.contrastUnknown = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || el.closest('[aria-hidden="true"], .sr-only, svg')) continue;
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!ownText) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    const bg = background(el);
    if (!fg || bg.unknown) {
      out.contrastUnknown++;
      continue;
    }
    const opacity = [...(function* () { for (let n = el; n; n = n.parentElement) yield Number(getComputedStyle(n).opacity); })()].reduce((a, b) => a * b, 1);
    const fgBlended = blend([fg[0], fg[1], fg[2], fg[3] * opacity], bg.color);
    const size = parseFloat(cs.fontSize);
    const need = size >= 24 ? 3 : 4.5;
    const r = ratio(fgBlended, bg.color);
    if (r < need) {
      const key = `${cs.color}|${bg.color.join(',')}|${size}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.contrast.push({
        ...describe(el),
        selector: selectorFor(el),
        ratio: Math.round(r * 100) / 100,
        required: need,
        color: cs.color,
        background: `rgb(${bg.color.slice(0, 3).map(Math.round).join(', ')})`,
        fontSize: size,
      });
    }
  }
  return out;
}

async function audit(args) {
  const base = (args.base || 'http://localhost:3100').replace(/\/$/, '');
  const routes = args._.length ? args._ : ['/'];
  const viewports = String(args.viewports || 'desktop,mobile').split(',');
  const outDir = args.out || path.join('qa-reports', new Date().toISOString().slice(0, 10));
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await launch();
  const results = [];
  const linkStatus = new Map();

  for (const route of routes) {
    for (const vpName of viewports) {
      const vp = VIEWPORTS[vpName];
      if (!vp) throw new Error(`Unknown viewport "${vpName}" (use desktop or mobile)`);
      const context = await browser.newContext(vp);
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`[${m.type()}] ${m.text()}`);
      });
      page.on('pageerror', (e) => consoleErrors.push(`[pageerror] ${e.message}`));
      page.on('requestfailed', (r) => failedRequests.push(`${r.url()} (${r.failure()?.errorText})`));
      page.on('response', (r) => {
        if (r.status() >= 400) failedRequests.push(`${r.url()} (HTTP ${r.status()})`);
      });

      const url = base + route;
      const response = await page.goto(url, { waitUntil: 'load' });
      await scrollThrough(page);
      const checks = await page.evaluate(inPageChecks);
      const shot = path.join(outDir, `${slug(route)}-${vpName}.png`);
      await page.screenshot({ path: shot, fullPage: true });

      // Internal links: check each target once.
      for (const link of checks.links) {
        if (!link.resolved || link.href === '#' || !link.resolved.startsWith(base)) continue;
        const target = link.resolved.split('#')[0];
        if (!linkStatus.has(target)) {
          const res = await context.request.get(target).catch((e) => ({ status: () => `error: ${e.message}` }));
          linkStatus.set(target, res.status());
        }
      }
      const brokenLinks = checks.links
        .filter((l) => l.resolved && l.resolved.startsWith(base) && l.href !== '#')
        .map((l) => ({ ...l, status: linkStatus.get(l.resolved.split('#')[0]) }))
        .filter((l) => typeof l.status !== 'number' || l.status >= 400);

      delete checks.images;
      const linksTotal = checks.links.length;
      delete checks.links;
      results.push({
        route,
        url,
        viewport: vpName,
        size: vp.viewport,
        httpStatus: response?.status(),
        screenshot: shot,
        consoleErrors,
        failedRequests,
        brokenLinks,
        linksTotal,
        ...checks,
      });
      await context.close();
    }
  }
  await browser.close();

  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));

  for (const r of results) {
    const flags = [];
    if (r.httpStatus !== 200) flags.push(`HTTP ${r.httpStatus}`);
    if (r.horizontalOverflowPx > 0) flags.push(`horizontal scroll ${r.horizontalOverflowPx}px`);
    if (r.offscreen.length) flags.push(`${r.offscreen.length} element(s) past viewport edge`);
    if (r.spills.length) flags.push(`${r.spills.length} text spill(s)`);
    if (r.brokenImages.length) flags.push(`${r.brokenImages.length} broken image(s)`);
    if (r.imagesMissingAlt.length) flags.push(`${r.imagesMissingAlt.length} image(s) without alt`);
    if (r.brokenLinks.length) flags.push(`${r.brokenLinks.length} broken link(s)`);
    if (r.consoleErrors.length) flags.push(`${r.consoleErrors.length} console error/warning(s)`);
    if (r.failedRequests.length) flags.push(`${r.failedRequests.length} failed request(s)`);
    if (r.unlabelledFields.length) flags.push(`${r.unlabelledFields.length} unlabelled field(s)`);
    if (r.unnamedControls.length) flags.push(`${r.unnamedControls.length} unnamed control(s)`);
    if (r.h1Count !== 1) flags.push(`${r.h1Count} h1 elements`);
    if (r.contrast.length) flags.push(`${r.contrast.length} contrast failure(s)`);
    if (r.smallTargets.length) flags.push(`${r.smallTargets.length} pill(s) under 44px`);
    const crowded = r.orangeButtons.filter((b, i) => r.orangeButtons.some((o, j) => j !== i && Math.abs(o.top - b.top) < r.size.height));
    if (crowded.length) flags.push(`${crowded.length} orange buttons within one screen of each other: ${crowded.map((b) => `"${b.text}"`).join(', ')}`);
    console.log(`${flags.length ? '⚠' : '✓'} ${r.route} [${r.viewport} ${r.size.width}×${r.size.height}] → ${r.screenshot}`);
    for (const f of flags) console.log(`    - ${f}`);
  }
  console.log(`\nDetails: ${path.join(outDir, 'results.json')} (placeholder "#" links are listed there, not flagged)`);
}

async function closeup(args) {
  const base = (args.base || 'http://localhost:3100').replace(/\/$/, '');
  const vp = VIEWPORTS[args.viewport || 'desktop'];
  if (!vp) throw new Error(`Unknown viewport "${args.viewport}" (use desktop or mobile)`);
  if (!args.selector || !args.out) throw new Error('closeup needs --selector and --out');
  const pad = Number(args.pad ?? 24);
  fs.mkdirSync(path.dirname(args.out), { recursive: true });

  const browser = await launch();
  const context = await browser.newContext(vp);
  const page = await context.newPage();
  await page.goto(base + (args.route || '/'), { waitUntil: 'load' });
  await scrollThrough(page);
  const el = page.locator(args.selector).nth(Number(args.nth ?? 0));
  await el.scrollIntoViewIfNeeded();
  if (args.hover) await el.hover();
  await el.evaluate((node) => {
    node.style.outline = '3px solid #e5004c';
    node.style.outlineOffset = '2px';
  });
  const box = await el.boundingBox();
  if (!box) throw new Error(`Element "${args.selector}" is not visible`);
  const size = vp.viewport;
  // Clip in page coordinates; fullPage lets the clip extend past the window (e.g. horizontal overflow).
  const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY, w: document.documentElement.scrollWidth }));
  const x = Math.max(0, box.x + scroll.x - pad);
  const y = Math.max(0, box.y + scroll.y - pad);
  const width = Math.min(Math.max(box.width + pad * 2, 200), Math.max(size.width, scroll.w) - x);
  const height = box.height + pad * 2;
  await page.screenshot({ path: args.out, fullPage: true, clip: { x, y, width, height } });
  await browser.close();
  console.log(`Saved ${args.out}`);
}

const args = parseArgs(process.argv.slice(2));
const mode = args._[0] === 'closeup' ? (args._.shift(), 'closeup') : 'audit';
(mode === 'closeup' ? closeup(args) : audit(args)).catch((err) => {
  console.error(err);
  process.exit(1);
});
