# Implementation notes

## Design plan and review

Common ground uses white #FFFFFF, cocoa #48230F, deep teal #155E63, pale sage #EAF2ED, apricot #FFD0B2 and muted green #466359. Bricolage Grotesque carries the brand and headings; Source Sans 3 handles text and controls. All writing is left-aligned.

```text
brand                                      catalogue / tasks / about / GitHub

Shared tools for              open quarter-circle composition
humanitarian work.            original hands logo in a white centre
description
[catalogue] [task guides]

Explore the collection                            Browse all projects
data resource                 method resource           browser app

sage task area: title / three selected task links / all eight tasks

quiet footer: purpose / discovery / contribute
```

Review before implementation: use the exact supplied palette and typefaces, not a new editorial identity. The large circle is the only expressive composition. Avoid numbered tasks (they are choices, not steps), card shadows, decorative icons, uppercase labels and unnecessary badges. The catalogue uses open rows; task links use bounded sage surfaces to communicate their single destination. No circle interaction or animation.

## Content decisions

The public repository inventory was reconciled on 1 November 2026; see `content/inventory.json`. Website and R Universe infrastructure are recorded as exclusions. The Humaniverse specr fork is identified as a fork and links to upstream documentation. Locally run Shiny apps state their R requirements and have no invented launch destination. Maturity is based on README lifecycle statements, never repository activity. Unknown dates and maturity remain unknown.

The eight task guides follow the question-based taxonomy in `docs/task-pathways-review.md`. Existing `understand-a-place`, `explore-vulnerability` and `build-an-index` IDs and slugs remain stable; the first two titles and scopes have changed. Three featured guides form the homepage preview, and the task index lists all eight.

Each guide recommends one to four main resources. Optional supporting resources and related data/research use quieter links to project details, keeping exploratory material distinct from the main recommendations. All resource groups contribute reciprocal project-to-task links; all 28 published products have a task home. Related-task links resolve titles and slugs from the pathway records. The content validator checks references across every group, rejects duplicates across groups, and rejects invalid, unpublished or self-referencing related tasks.

Task recommendations are curated suggestions, not an assertion of compatibility. Related-catalogue links use the supported subject, type and search parameters.

## Architecture

A dependency-free Node.js static generator renders every route and all content into `dist/`. Only the catalogue loads filtering JavaScript; project pages load a small return-link enhancement. The mobile menu uses native details/summary and remains usable without JavaScript. No runtime API calls are made.

The known GitHub Pages origin follows the repository identity: https://humaniverse.github.io. Set `SITE_URL` to change it for a different deployment. The Pages workflow builds and uploads `dist/`; no route rewrites are required.

## Release checks

Run the build, content and filter tests, static route/link checks, and external link audit. Browser review must cover the specified widths, keyboard use, query sharing/history, no results, no JavaScript and increased text size. Record results in `docs/QA.md`.

The practitioner and analyst usability sessions in SPEC.md require real participants and remain a release sign-off item; automated checks cannot substitute for those sessions.
