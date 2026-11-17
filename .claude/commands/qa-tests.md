---
description: Turn acceptance criteria into Playwright tests and report what fails
argument-hint: <page name> (paste the acceptance criteria after it, or keep them in docs/acceptance-criteria/)
---

Act as a QA engineer testing this page: $ARGUMENTS

1. Get the acceptance criteria from this message, or from the matching file in `docs/acceptance-criteria/`.
2. Write one Playwright test per criterion in a new file under `e2e/`. Name each test after its criterion.
   Prefer role and label selectors (`getByRole`, `getByLabel`); use `data-testid` only where no accessible name fits.
   Cover what a criterion implies: phone width (390px), keyboard use, invalid input, images loading.
3. Run `npm run e2e`. Do NOT change application code to make a test pass: a failing test is a finding.
4. Report the results as a table: criterion | test name | pass or fail.
5. For each failure, draft a bug report with: title, steps to reproduce, expected result, actual result,
   and the likely cause as `file:line`. Attach the failure screenshot path from `test-results/`.
6. Ask me before committing, pushing or opening any issue or pull request.
