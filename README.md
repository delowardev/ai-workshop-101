# AI Workshop 101: Claude Code for development & QA

Sample repo for a 30-minute workshop on using Claude Code (locally and in the cloud) for development and QA.

The project is a redesign concept of the **Sender** marketing site, built with Next.js, React, TypeScript and Tailwind CSS.
The homepage is done; the other pages get built live during the workshop, which shows the full loop:
issue → Claude Code session → page + tests → pull request → CI → human review → deployed.

**Live site:** https://delowardev.github.io/ai-workshop-101/

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # type check + browser tests (Playwright)
```

## What's in here

| Path | What it is |
|---|---|
| `src/` | The site: routes in `src/app`, sections in `src/components`, content in `src/content` |
| `e2e/` | Playwright tests, including phone-width checks |
| `docs/acceptance-criteria/` | What each page must do; used in the QA demo |
| `CLAUDE.md` | Team rules and design rules Claude reads at the start of every session |
| `.claude/settings.json` | Pre-approved test commands; blocks Claude from reading `workshop/` |
| `.github/workflows/ci.yml` | Type check and browser tests on every pull request |
| `.github/workflows/pages.yml` | Deploys the static site to GitHub Pages on every push to `main` |
| `slides/claude-code-workshop.pdf` | The workshop slides (18 slides, PDF) |

## Progress

Updated as work lands. Each item is built in its own Claude Code session and ships as a pull request.

### Pages

| Page | Route | Status | PR | Notes |
|---|---|---|---|---|
| Homepage | `/` | ✅ Done | — | Built before the workshop |
| Blog | `/blog` | ✅ Merged | [#5](https://github.com/delowardev/ai-workshop-101/pull/5) | Acceptance criteria in `docs/acceptance-criteria/blog.md` are a draft and need review |
| Features | `/features` | ⏳ Not started | — | |
| Pricing | `/pricing` | ⏳ Not started | — | |

### Tooling and docs

| Item | Status | PR | Notes |
|---|---|---|---|
| `CLAUDE.md` | ✅ Merged | [#4](https://github.com/delowardev/ai-workshop-101/pull/4) | Commands, build/deploy notes, layout |
| `/qa-tests` skill | ✅ Merged | [#6](https://github.com/delowardev/ai-workshop-101/pull/6) | Tests desktop and mobile, sends screenshots, writes ClickUp ticket descriptions for bugs |
| Progress tracker (this section) | ✅ Merged | [#7](https://github.com/delowardev/ai-workshop-101/pull/7) | |
| Logoipsum placeholder logo + noindex | ✅ Merged | [#8](https://github.com/delowardev/ai-workshop-101/pull/8) | Header/footer logo replaced; every exported page has `noindex, nofollow` (verified on the live site) |
| CI type check fix | ✅ Merged | [#9](https://github.com/delowardev/ai-workshop-101/pull/9) | CI runs `npx next typegen` before the type check; `main` is green |

### Known issues

- Homepage (found by `/qa-tests`): orange "hassle." in the hero headline fails AA contrast (2.95:1); the "New" pill is 36px tall (under the 44px minimum).
- "Sender" brand text remains in page titles/metadata, the blog eyebrow, and a few homepage/footer strings (listed in #8).
- Blog page: possible extra gap above the newsletter email field at phone width (not yet confirmed).

## Try it yourself

1. Open [claude.ai/code](https://claude.ai/code) and pick this repository.
2. Developers: ask Claude to build a new page and open a pull request.
3. QA: ask Claude to turn `docs/acceptance-criteria/homepage.md` into Playwright tests and report what fails.
4. Then try `/code-review` on any open pull request.
