---
description: Fix a GitHub issue test-first and open a pull request
argument-hint: <issue-number>
---

Fix GitHub issue #$ARGUMENTS in this repository.

1. Read the issue. Restate the bug and the expected behaviour in two sentences.
2. Find the code responsible. Write a test that reproduces the issue, run it, and show that it fails.
3. Make the smallest change that fixes it. Don't touch unrelated code.
4. Run `npm test` and `npm run e2e`. Both must pass.
5. Commit with the message `Fix #$ARGUMENTS: <short summary>` and push the branch.
6. Open a pull request. In the description include: the root cause, the fix, how it was tested, and `Fixes #$ARGUMENTS`.

Finish with a short summary: root cause, files changed, and test results.
