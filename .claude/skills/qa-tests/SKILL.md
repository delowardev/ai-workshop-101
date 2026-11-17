---
name: qa-tests
description: QA-test the Sender marketing site in a real browser at desktop (1440×900) and phone (390×844) widths, check each page against its acceptance criteria, take full-page and bug close-up screenshots, and write a pass/fail report plus ready-to-paste ClickUp bug tickets. Use when asked to QA, smoke-test, check or review a page or the whole site before a release or PR. Reports bugs only; never fixes them.
argument-hint: "[page or route, e.g. /blog]"
---

# /qa-tests: QA run for the Sender site

You are QA, not a developer. **Do not change any file under `src/`, `e2e/` or `docs/` during this run, and do not fix
bugs**, even trivial ones. Find them, prove them with a screenshot, and report them. Offer fixes only as a "Suggested fix"
line in the ticket.

Arguments: `$ARGUMENTS` (route(s) such as `/blog`, or a page name; empty means every page).

## 1. Scope

- With arguments: test those routes. Map a page name to its route (`homepage` → `/`, `blog` → `/blog`).
- Without arguments: test every page. A page is each `page.tsx` under `src/app/`; its route is its folder path
  (`src/app/page.tsx` → `/`, `src/app/blog/page.tsx` → `/blog`). List them with `find src/app -name page.tsx`.
- For each route, read its acceptance criteria in `docs/acceptance-criteria/` (`/` → `homepage.md`, `/blog` → `blog.md`,
  otherwise `<name>.md`). **These are the source of truth.** If a page has no criteria file, say so in the report and test
  it against the general rules in `CLAUDE.md` (design rules, 390px rule, accessibility rules).
- Also read the "Design rules" and "Rules" sections of `CLAUDE.md`: they apply to every page.

## 2. Start the site

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100   # 200 means a server is already up: reuse it
```

If nothing answers:

```bash
ls node_modules >/dev/null 2>&1 || npm ci
ls next-env.d.ts >/dev/null 2>&1 || npx next typegen
nohup npx next dev -p 3100 > /tmp/qa-next-dev.log 2>&1 &          # same port Playwright uses
for i in $(seq 1 60); do curl -s -o /dev/null http://localhost:3100 && break; sleep 1; done
```

Then request each route once (`curl -s -o /dev/null -w '%{http_code}' http://localhost:3100/blog`) so dev compilation
happens before the browser run. Leave a server you started running; `npm run e2e` reuses it.

## 3. Automated checks and screenshots

Use a dated output folder (gitignored): `D=qa-reports/$(date +%F)`.

```bash
node .claude/skills/qa-tests/scripts/screenshot.mjs --base http://localhost:3100 --out "$D" / /blog
```

It uses the preinstalled Playwright (`require('playwright')`). **Never run `playwright install`.** For every route ×
viewport (`desktop` 1440×900; `mobile` = Playwright's iPhone 13 device at 390×844) it scrolls the page so lazy images
load, saves `$D/<page>-<viewport>.png` (full page) and writes `$D/results.json` with:

| Key | What it means |
| --- | --- |
| `horizontalOverflowPx`, `offscreen` | horizontal scroll and the outermost elements past the viewport edge |
| `spills` | links, buttons and headings whose text overflows its box (same rule as the e2e specs) |
| `brokenImages`, `imagesMissingAlt` | images that failed to load or have no `alt` attribute |
| `brokenLinks`, `placeholderLinks` | internal links answering ≥400; `#` links (expected until their page exists: not a bug) |
| `consoleErrors`, `failedRequests` | console errors/warnings, page errors, failed or ≥400 requests |
| `unlabelledFields`, `unnamedControls`, `h1Count`, `headings` | basic accessibility and structure |
| `contrast` | text below WCAG AA (4.5:1, or 3:1 at 24px+), with the measured ratio; text over gradients/images is skipped (`contrastUnknown`) |
| `orangeButtons`, `smallTargets` | brand-500 buttons (one per view allowed) and pill buttons under 44px tall |

The console summary flags anything suspicious per page and viewport. **Treat every flag as a lead, not a verdict**: open
`results.json`, look at the screenshot and decide whether it breaks an acceptance criterion or a `CLAUDE.md` rule.
Known non-bugs: the round "N" Next.js dev-tools badge at bottom left (dev server only), `#` placeholder links,
two orange buttons that are more than a screen apart (the summary already filters those).

## 4. Manual checks (in Playwright, both viewports)

The script does not click anything. Write a short throwaway script in your scratchpad (not in the repo) with
`require('playwright')` and the same two viewports, and check every acceptance criterion the automated pass can't:

- **Header/navigation**: logo, nav links and their targets, `aria-current` on the current page, and the breakpoints in the
  criteria (e.g. nav hidden below 860px, "Log in" hidden below 480px: test at 859/861 and 479/481px).
- **Forms**: submit with a valid address, an invalid one and an empty one. Check the exact confirmation text, that nothing
  navigates or reloads (`page.url()` unchanged) and that nothing is sent (no new request on submit).
- **Buttons and links**: every visible control has an accessible name and does something sensible (no dead buttons).
- **Content**: exact headlines, text, order of sections/pills/plans and anything else the criteria name.
- **Accessibility**: labels on fields, alt text (logos need alt unless next to their name), decorative art
  `aria-hidden="true"`, keyboard focus reaches the main controls (`page.keyboard.press('Tab')`).

Then run the existing end-to-end suite and record the result (passed/failed counts, and any failing test names):

```bash
npm run e2e
```

A failing e2e test is a bug to report, not something to edit.

## 5. Close-up screenshot for every bug

```bash
node .claude/skills/qa-tests/scripts/screenshot.mjs closeup --base http://localhost:3100 --route /blog \
  --viewport mobile --selector '<css or playwright selector>' --out "$D/bug-01-<short-name>-<viewport>.png"
```

Options: `--pad 24` (space around the element), `--nth 0` (which match), `--hover`. The element gets a red outline.
`results.json` gives a ready `selector` for each automated finding; Playwright selectors such as
`a:has-text("Run campaigns")` work too. Number bugs `bug-01`, `bug-02`, … in the order of the report.

## 6. Show the screenshots

Don't just list paths. Send every full-page screenshot and every bug close-up to the user with `SendUserFile`
(`display: "render"`, one call with all files, caption naming page × viewport), or attach them by whatever file-sharing
tool the session has. Mobile shots are taken at the iPhone's 3× pixel density, so long pages are taller than 8000px and
the chat shows a scaled-down copy: say so, and offer the full-size originals in a .zip. Look at each screenshot yourself first (Read the PNG) to catch visual bugs the checks miss:
overlapping text, cut-off content, broken layout, wrong colours.

Never `git add` anything under `qa-reports/` (it is in `.gitignore`).

## 7. Report

Reply with this structure (and save the same Markdown as `$D/report.md`):

```markdown
# QA report: <routes> (<date>)

Server: <url, dev or prod build> · e2e: <N passed / M failed>

| Page | Desktop 1440×900 | Mobile 390×844 | Notes |
| --- | --- | --- | --- |
| `/` | ✅ Pass / ❌ Fail (bug-01) | … | … |

## Acceptance criteria
<per page: each numbered criterion → ✅ / ❌ (bug-NN) / ⚠️ not testable, with one line of evidence>

## Bugs
<one ClickUp ticket per bug, template below, most severe first>

## Screenshots
<file list: full pages, then close-ups>
```

A page/viewport **fails** if any acceptance criterion or `CLAUDE.md` rule fails there. Mention flags you investigated and
dismissed (with the reason) in "Notes", so the next run doesn't redo the work.

## 8. ClickUp tickets

One ticket per distinct bug (one bug seen on both viewports is one ticket listing both). Use exactly this template, in a
fenced `markdown` block so it pastes cleanly:

```markdown
**Title:** [<Page>] <what is wrong, in under 80 characters>
**Severity:** Critical | High | Medium | Low
**Page/URL:** <route> (http://localhost:3100<route>)
**Viewport/device:** Desktop 1440×900 | Mobile 390×844 (iPhone 13) | Both
**Steps to reproduce:**
1. …
2. …
**Expected:** <what the criterion or rule says should happen>
**Actual:** <what happens, with measured values>
**Screenshot:** `qa-reports/<date>/bug-NN-<name>-<viewport>.png`
**Acceptance criterion violated:** `docs/acceptance-criteria/<page>.md` #<n>: "<quote>" (or "None: CLAUDE.md rule '<rule>'")
**Suggested fix / likely file:** `src/…:<line>`: <one-line suggestion>
```

Severity guide: **Critical**: page broken, crashes, or a main flow (signup form, navigation) unusable. **High**: an
acceptance criterion fails visibly for most users (wrong content, horizontal scroll at 390px, broken image, form
confirmation missing). **Medium**: accessibility or design-rule failure with a workaround (contrast, missing label,
second orange button). **Low**: minor polish (small offsets, a pill a few px short).

To find the likely file: section components are in `src/components/<page>/`, shared ones in `src/components/site` and
`src/components/ui`, links and nav in `src/content/site.ts`. Grep for the visible text.

If a ClickUp connector is available (tools named `clickup_*`, found with ToolSearch), end by **offering** to create the
tickets and asking which list to use. **Never create, edit or comment on ClickUp tasks without the user's explicit
confirmation in this conversation.**

## Rules

- Report only; don't fix, refactor, or edit tests, even when the fix is one line.
- Don't skip a viewport or a page in scope. If something can't be tested, say so and why.
- Don't commit screenshots or reports.
