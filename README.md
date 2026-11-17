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
| `.claude/commands/` | Shared slash commands: `/fix-issue <n>` and `/qa-tests <page>` |
| `.claude/settings.json` | Pre-approved test commands; blocks Claude from reading `workshop/` |
| `.github/workflows/ci.yml` | Type check and browser tests on every pull request |
| `.github/workflows/pages.yml` | Deploys the static site to GitHub Pages on every push to `main` |
| `facilitator/` | Facilitator guide. Rename it to `workshop/` so Claude can't read it during demos. |

## Try it yourself

1. Open [claude.ai/code](https://claude.ai/code) and pick this repository.
2. Developers: ask Claude to build a new page and open a pull request.
3. QA: run `/qa-tests homepage` and read the report.
4. Then try `/code-review` on any open pull request.
