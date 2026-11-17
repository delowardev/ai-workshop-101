# Blog: acceptance criteria

Drafted from the "Blog" artboard of the Sender Redesign design canvas and the rules in `CLAUDE.md`.

1. The page lives at `/blog`. The header and footer are the shared site ones. "Resources" in the main navigation and
   "Blog" in the footer link to it, and "Resources" is marked as the current page.
2. The intro shows the eyebrow "The Sender blog", the headline "Better emails, every week." and an article search
   field with a label. Searching does nothing and the page does not reload: this is a static concept site.
3. Category pills appear in this order: All, Email marketing, Automation, Ecommerce, Deliverability, Lead capture,
   with "All" marked as current.
4. A featured article card shows "Subject lines that get opened: 12 patterns worth stealing", its category, its
   reading time and a "Read the article" prompt.
5. A grid lists six more articles, each with a decorative cover, category, reading time, title and excerpt.
   Covers are hidden from screen readers.
6. Pagination shows pages 1, 2 and 3 and "Next", with page 1 marked as current.
7. A newsletter block reads "One email a week. All signal." Submitting it with a valid address shows
   "Thanks! This is a design preview, so no email was sent."; an invalid address shows no confirmation.
   Its "Subscribe" button is the only orange button on the page.
8. Every image loads.
9. At 390px wide there is no horizontal scroll and no text spills out of its button, pill or card.
10. All text meets WCAG AA contrast (4.5:1, or 3:1 for text 24px and larger).
