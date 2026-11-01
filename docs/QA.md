# Release verification

## Eight-task update — 1 November 2026

- `npm test`: all eight tests passed, including resource and related-task reference validation, single-resource guides, full catalogue coverage, reciprocal links for supporting/research resources, and the selected homepage preview.
- `npm run build`: 41 static HTML pages, including eight task guides and 28 project pages; the sitemap contains 40 routes. The three existing task URLs remain valid.
- All 28 published products have a task home. The task index lists eight choices; the homepage shows three selected guides and a link to all eight. Exploratory material is labelled separately from main recommendations.
- All 96 unique external destinations returned HTTP 200. The automated audit verified 94; Compare risk maps and Deprivation Explorer timed out on HEAD requests, then returned their expected app HTML with HTTP 200 on targeted GET retries. Both retries are annotated in `docs/link-checks.json`. This verifies HTTP destinations, not app calculations or data freshness.
- Browser checks covered the task index, all eight guides, the homepage and the hiedata detail page. No horizontal overflow was detected in the complete 11-page checks at 320, 390 and 1440 CSS pixels. Additional checks exercised tablet/intermediate widths. Desktop and mobile screenshots were inspected for long titles, task-choice layout and the health guide.
- Followed the health guide’s research link to hiedata and its reciprocal task link back. Verified the skip link moves focus to main and the mobile menu expands with Enter. Browser error logs were empty during the final desktop checks.
- Main and supplemental resource content and navigation are statically rendered and covered by the no-JavaScript build test. Existing catalogue search/filter behaviour is covered by the unchanged discovery tests; the original browser checks below were not repeated in full.
- Screenshot evidence is saved in `output/cua/tasks-eight-desktop.jpg`, `output/cua/tasks-eight-mobile.jpg` and `output/cua/health-task-mobile.jpg` (ignored by Git).

Real practitioner/analyst taxonomy testing, native 200% browser zoom and production-host checks remain outstanding. This update has not been pushed or deployed.

## Original three-guide baseline

The following sections record verification before the eight-task update.

Implementation reviewed on 1 November 2026 using Node.js 22 and Chromium, against the local static build.

## Build and content

- `npm test`: six tests passed. These cover direct output and asset resolution, static content, project/pathway relationships, publication validation, search semantics and URL parsing.
- `npm run build`: 36 static HTML pages: homepage, catalogue, 28 project pages, task index, three task guides, About and 404.
- All 35 sitemap routes returned HTTP 200 by direct request. An unknown route returned HTTP 404 with catalogue, task and homepage recovery links.
- The 30 public repositories were reconciled into 28 canonical resources and two documented infrastructure exclusions. See `content/inventory.json`.
- All 96 unique external destinations returned HTTP 200. Two initial license paths were reviewed and corrected to LICENSE.md. See `docs/link-checks.json` for URLs, results and timestamps. HTTP availability does not certify app calculations or data freshness.
- The bundled logo matches the supplied original by SHA-256. Both fonts are locally served with their Open Font Licenses.

## Browser behaviour

Verified with real browser interactions:

- Shared query URLs restore text, checkboxes and results. Matching is case-insensitive, trims whitespace, uses OR within a facet and AND between search and facets, with no duplicate rows.
- Debounced text search replaces history; facet changes create entries. Reload, Back and Forward restore the expected controls and results.
- Clear filters retains search text. Reset clears both. Named filter removal leaves focus on the next filter or search control. Facet updates retain checkbox focus.
- No-results content offers working recovery actions. HTML-like search text is treated literally and unsupported enum values are ignored.
- Project return links preserve valid catalogue state. Project/task relationships and related-catalogue links work in both directions.
- Mobile Menu and filter disclosures work from the keyboard. Native checkboxes respond to Space; the skip link is the first focusable control and moves focus to main.
- With JavaScript disabled, all 28 projects remain visible, enhanced search controls are hidden, and mobile navigation, task guides and project access links remain usable.
- Reduced-motion preference disables optional transitions. No JavaScript page errors occurred during the checks.

## Layout and visual review

Reviewed the homepage, catalogue, task index, index-building guide, demographr detail and About at **320, 390, 768, 1024 and 1440 CSS pixels**, plus a 720px reflow viewport equivalent to a 1440px display at 200% zoom. No horizontal page overflow or out-of-viewport content was detected across these 36 page/viewport combinations. Native browser zoom itself was not separately exercised.

Desktop and mobile screenshots were inspected for typography, spacing, readable metadata, access-link hierarchy, menu and focus states, and the no-results treatment. Final review removed a repeated homepage introduction, corrected mobile header sizing, added a missing word space in the compact footer, and kept the circle entirely decorative. Task index choices use H2s; nested resource/task components use H3s.

Local screenshot artifacts are in `output/playwright/` (ignored by Git), including `home-1440.png`, `home-390.png`, `catalogue-1440.png`, `tasks-1440.png`, `catalogue-demographr-1440.png`, `tasks-build-an-index-390.png`, `no-results-1440.png`, `menu-320.png` and `filter-focus-320.png`.

Computed contrast for the approved tokens:

| Combination | Ratio |
| --- | --- |
| Cocoa on white | 13.79:1 |
| Deep teal on white | 7.46:1 |
| Muted green on white | 6.58:1 |
| Muted green on sage | 5.78:1 |
| Deep teal on sage | 6.55:1 |
| Cocoa on apricot | 9.80:1 |

The corresponding inverse white-on-teal ratio is 7.46:1. Text, controls, selected states and visible focus use these combinations. This review is not a formal accessibility certification or a substitute for assistive-technology user testing.

## Human sign-off and hosting

The practitioner task-finding session and analyst named-package session specified in SPEC.md have **not** taken place. Before release, ask those participants to try the discovery routes independently, confirm they distinguish browser apps from R packages, and record and fix navigation failures. Do not mark those sessions complete based on automated tests.

The GitHub Pages workflow is prepared. This implementation has not been pushed or deployed, so direct-route checks are against the local static server rather than the live production origin. Select GitHub Actions as the Pages source, deploy, and confirm routes and the 404 response on that host before public sign-off.
