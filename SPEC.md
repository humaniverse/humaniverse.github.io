# Humaniverse website specification

Status: ready for implementation planning. Written 1 November 2026.

This document defines the site's content, behaviour and acceptance criteria. [DESIGN.md](DESIGN.md) defines its visual language and component treatment. These are specifications; the site has not yet been implemented.

## Purpose

Humaniverse is a collection of data packages and decision-support tools for humanitarians. Its website is a portfolio and discovery service: help someone understand what exists, find resources relevant to their work, and reach the appropriate app, documentation or repository.

The site has two distinct, connected areas:

- **Catalogue:** explore the full collection, search by name or purpose, and narrow by subject and resource type.
- **Task pathways:** start with “What are you working on?” and discover a small, curated selection of relevant resources, with an explanation of how each can help.

Both areas use the 'Common ground' identity in `DESIGN.md`. They are alternative ways into the same collection, with shared project records and reciprocal links.

## Audience and user needs

| Visitor | Typical need | Primary route |
| --- | --- | --- |
| Humanitarian practitioner | Find a usable tool for a particular question without needing to know about code repositories | Task pathways |
| Analyst or researcher | Find tools, data, geographical coverage, methods, documentation and code/repos | Either area |
| Returning user | Open a known app or repository quickly | Catalogue search |
| Developer or contributor | Inspect code, understand maturity and find contribution information | Catalogue and project details |

Lead with plain-language purposes. Explain technical prerequisites where they affect whether someone can use a resource. An R package must not appear to be a browser app.

## Product decisions

1. Retain Common ground's white, cocoa, teal, sage and peach palette, generous spacing, typography and supplied logo.
2. Retire the circular navigator. Use the circle as a decorative brand composition, without topic labels, hover states or interactive segments. Provide explicit rectangular links and buttons for every action.
3. Give the catalogue and task pathways separate URLs and persistent navigation entries. Neither is a hidden mode of the other.
4. Use human-authored pathways. The site does not generate advice, calculate priorities or claim to make humanitarian decisions.
5. Maintain one set of project records. A pathway refers to project IDs and adds task-specific context; it does not duplicate descriptions, URLs or status.
6. Make the initial catalogue and every pathway readable without JavaScript. Enhance discovery with local search and filtering.

## Scope

### Initial release

- Homepage introducing Humaniverse and both discovery routes.
- Complete, curated catalogue of public, user-facing Humaniverse projects, with search and filters.
- A project detail page for each published catalogue record.
- Task index and three initial task guides.
- About page explaining purpose, maintainers and how to contribute. Also include a link to the [R Universe site](https://humaniverse.r-universe.dev/packages).
- Responsive navigation, accessible states, descriptive page metadata, sitemap and a useful 404 page.

The content inventory must reconcile all public Humaniverse repositories and known apps. Include every resource intended for users. Record deliberate exclusions, such as website infrastructure, in an internal inventory with a reason. An app and its source repository usually belong to one project record; they are not two catalogue entries.

### Outside the initial release

Accounts, saved collections, personalisation, an AI chat interface, live GitHub API requests, user-submitted listings, embedded operational dashboards, and decision calculations. Dark mode is a later design exercise; the initial site uses the approved light Common ground palette consistently.

## Information architecture

| Route | Page title or purpose |
| --- | --- |
| `/` | Humaniverse introduction and two discovery routes |
| `/catalogue/` | Browse the catalogue |
| `/catalogue/<project-slug>/` | Project purpose, access links, coverage and usage context |
| `/tasks/` | What are you working on? |
| `/tasks/<task-name>/` | Placeholder for specific user tasks |
| `/about/` | About Humaniverse |
| `/404.html` | Page not found; links to catalogue and pathways |

Header navigation: **Browse catalogue**, **Find tools for a task**, **About**, **GitHub**. The logo and text wordmark link to the homepage. Use the same labels in desktop and mobile navigation. The footer repeats the two discovery routes and includes verified contribution and source links.

Project pages use a catalogue breadcrumb. Task guides use a pathways breadcrumb. A project reached through a pathway also offers its related task guides, so users can move between contexts without relying solely on browser history.

## Homepage

### Hero

Headline: **Shared Tools for Humanitarian work.**

Supporting copy: “Data packages and decision-support tools for people working to help people.”

Two visible links:

- **Browse catalogue** — filled teal treatment; opens `/catalogue/`.
- **Find tools for a task** — outlined treatment; opens `/tasks/`.

On desktop, position the copy on the left and the decorative circle with the original logo on the right. The circle has no “People”, “Places”, “Risks” or “Methods” labels. On mobile, prioritise the introduction and both actions; the decorative circle may be omitted.

### Catalogue preview

Heading: **Explore the collection**.

Show three deliberately selected projects with purpose, resource type and applicable access links. Choose a useful mix of data, methods and apps once the inventory is verified. Do not invent an app entry to fill a slot. Link to the full catalogue with **Browse all projects**. The selection is editorial, not a ranking or statement of popularity.

### Tasks preview

Heading: **What are you working on?**

Supporting copy: “Start with a task to find useful data and tools.”

Show the task links, each with one sentence explaining its scope and a visible **View suggested tools** action. These open their individual task pages. A separate **See all tasks** link opens `/tasks/`. A taxonomy of tasks hasn't been decided yet.

These sections remain visually and semantically distinct. Do not place the task guide inside a catalogue filter panel.

## Catalogue

### Initial view

Display all published project records, ordered alphabetically by display name. Show a labelled search input, subject filters, resource-type filters and an accurate result count. Use spacious rows that work across unequal descriptions and varied actions.

Subject vocabulary: **People**, **Places**, **Risks**, **Methods**. Subjects may overlap; they describe what the work concerns. Resource types describe how someone uses it: **App**, **Data package**, **Dataset**, **Method toolkit**, **Research project**. Allow more than one type where verified, such as an app with a downloadable dataset.

Each catalogue entry includes:

- Linked project name leading to its internal detail page.
- One short sentence describing what it helps a visitor do.
- Resource type and platform or prerequisites, where useful.
- Geographic coverage and maturity when documented.
- Direct **Open app**, **Read documentation**, and **View repository** links where verified destinations exist.

Choose one prominent access link per entry: app first when available; otherwise documentation; otherwise repository. Keep the other access links visible but quieter. Do not make the entire row clickable: the project title and external destinations are separate actions.

### Search and filters

- Search case-insensitively across name, summary, subjects, coverage and curated keywords. Trim leading/trailing whitespace. Every search term must match at least one indexed field; empty search matches all projects.
- Multi-select within a facet uses OR. Different facets and search combine with AND. A project appears only once even if it matches multiple values.
- Use native checkboxes with visible labels and selected states. Offer individual removal and **Clear filters**; clearing filters leaves search intact. **Reset search and filters** clears both.
- Keep the catalogue title, search and active filter summary visible above results. Filters update in place without moving focus.
- Encode state in query parameters: `q`, repeated `subject`, and repeated `type`. Example: `/catalogue/?subject=places&type=data-package`.
- Text entry replaces the current history state after a short debounce. Committed facet changes create history entries. Reload, shared URLs, Back and Forward must restore the same controls and results.
- Ignore unsupported query values safely. Render query text as text, never HTML.
- Without JavaScript, show the complete statically rendered catalogue and normal project links. Expose enhanced search/filter controls only once they work; never leave inert controls visible.

No-results copy: **No projects match your search and filters.** Follow with **Reset search and filters** and **Find tools for a task**. Do not suggest the collection itself is empty.

Below the catalogue introduction, include a quiet cross-link: “Not sure where to start? Find tools for a task.” This navigates to the pathways index rather than changing catalogue state.

## Task pathways

### Task index

Use **What are you working on?** as the H1. Present three full-width task choices with visible link treatment, scope descriptions and explicit actions. Selecting a task navigates to a stable guide URL.

This is a shallow, task-based guide rather than a multi-step questionnaire. Do not ask visitors to enter their location, organisation, beneficiaries or operational circumstances. Future branching should be added only when it changes the useful recommendations and the content supports it.

### Task guide structure

1. Task title and a short statement of what the guide can help with.
2. Important coverage and prerequisites, such as UK-only data or an R requirement.
3. Two to four suggested resources, each with a task-specific explanation, an internal project link and verified direct access links.
4. Brief guidance on using the resources: relevant inputs, outputs and limits. Describe an ordered workflow only where an actual sequence is justified and reviewed.
5. **Browse related projects** linking to an appropriate catalogue filter, plus **Choose another task** linking to `/tasks/`.

Recommendations are editorial suggestions, not a compatibility guarantee or an assertion that the resources automatically connect. Do not use connectors or step numbers to imply an unverified pipeline.

### Initial editorial candidates

The following are grounded in repository READMEs inspected during the design exploration. Confirm availability, classification, coverage, maturity and suitability before launch; this is not a complete catalogue.

| Task | Candidate resources and reasons | Related catalogue destination |
| --- | --- | --- |
| Understand a place | `demographr`: UK population estimates; `geographr`: UK boundaries and lookups | `/catalogue/?subject=people&subject=places` |
| Explore vulnerability | `floodvulnerability`: neighbourhood flood vulnerability datasets; `intersectional-risks`: prototype vulnerability map; `geographr`: geographical context | `/catalogue/?subject=vulnerability` |
| Build an index | `humanicheck`: input data checks; `compositr`: combining indicators into scores and indices in R; `build-index`: build a composite index without code | `/catalogue/?subject=methods` |

For the first two guides, make the UK focus explicit. An index-building guide should explain that selecting indicators and interpreting results require judgment; the packages do not choose the right humanitarian priorities for the visitor.

## Project detail pages

Show the name, plain-language summary and access links first. Follow with:

- What the project helps with and who can use it.
- Links to the app (where available) and underlying code.
- Type, platform/prerequisites, geographic coverage and documented maturity.
- Data coverage periods, limitations and source/license links when applicable and verified.
- Optional real screenshot with useful alternative text; no invented maps or data.
- Task guides that reference this project, derived from pathway membership.
- A link back to the catalogue, preserving a valid prior catalogue query when available.

Internal project pages should orient the visitor, not duplicate a project's full documentation. If an access URL is absent, omit that action. If an app is known to be unavailable, say **App temporarily unavailable**, omit its launch action, and keep other working links. Do not render disabled links as promises of nonexistent features.

## Content model

Store records in version-controlled structured content. File format and static-site generator are implementation choices. Required fields and semantics are fixed here.

### Project record

| Field | Requirement |
| --- | --- |
| `id`, `slug` | Required, unique, stable identifiers |
| `name`, `summary` | Required display text; summary ideally one sentence under 160 characters |
| `description` | Required concise detail-page content |
| `subjects` | Required nonempty array from the subject vocabulary |
| `types` | Required nonempty array: `app`, `data-package`, `dataset`, `method-toolkit`, `research-project` |
| `platforms`, `prerequisites` | Optional factual strings, such as `R` or browser access |
| `coverage` | Required descriptive value, including `Not documented` when unknown |
| `maturity` | Required: `prototype`, `development`, `stable`, `archived`, or `unknown`; never infer stable from activity |
| `links` | Optional `app`, `docs`, `repository`, `source`, `license`; at least one of app/docs/repository required |
| `availability` | Optional per-destination known availability and checked date; no invented live status |
| `dataUpdatedAt`, `dataPeriod` | Optional; only dates or periods supported by the data source |
| `keywords` | Optional search vocabulary |
| `image` | Optional local path, alternative text and attribution where needed |
| `featured` | Optional homepage selection flag |
| `published` | Required boolean controlling public inclusion |
| `reviewedAt`, `evidence` | Required internal review date and supporting source URLs before publication |

Keep `reviewedAt`, repository activity and `dataUpdatedAt` separate. Never display a recent commit as proof of fresh data. Display unknown maturity as **Status not documented**; internal review metadata is not a public impact or freshness badge.

### Pathway record

Required: `id`, `slug`, `title`, `summary`, `scope`, `projectRecommendations`, `relatedCatalogueQuery`, `published`, `reviewedAt` and `evidence`.

Each recommendation contains a valid `projectId`, an explanation of **why it helps with this task**, and optional usage notes or limitations. Names, status and destinations resolve from the project record. Derive project-to-pathway links from this relationship. A published pathway cannot reference an unpublished or missing project.

## Delivery and maintenance

- Produce static HTML suitable for GitHub Pages, with a generated directory index for each route. Direct navigation and refresh must work without server-side route rewrites.
- Render meaningful content at build time. Search and filters operate on the published catalogue locally; the site requires no backend or API key.
- Keep dependencies modest and load only the code a page needs. Do not ship dashboard libraries for decorative artwork.
- Bundle the supplied logo unchanged. Self-host appropriately licensed font subsets with system fallbacks and `font-display: swap`.
- Validate content at build time: unique identifiers, supported enums, valid URLs, required fields, existing related project IDs and accessible image metadata.
- Check external destinations before launch. A failed automated check requires review; do not silently remove a project based on one network failure.
- Use normal same-tab external navigation. Users can choose to open another tab. If a future action deliberately opens a new tab, communicate that behaviour.
- Set descriptive titles, meta descriptions and canonical URLs using the actual deployment origin once known. Do not invent a custom domain.
- Adding a project or pathway should require a content change rather than editing page layout code.
- Document the content review workflow during implementation. Recheck known prototypes and unavailable links before each release.

## Acceptance criteria

### Discovery and relationships

- Both discovery routes are visible on the homepage and in navigation at every supported width.
- The circle has no focusable elements, pointer affordances or topic labels. All content remains reachable if it is removed.
- A visitor can reach a verified resource from either a catalogue entry or a task guide without visiting a repository unless that is the intended destination.
- Every public project has a detail page, and every task recommendation resolves to the same canonical project record.
- Each task guide has a working related-catalogue link; each participating project's detail page links back to its task guides.
- Catalogue search, combined filters, resets, no-results, direct URLs and browser-history restoration work as specified.
- With JavaScript disabled, the full catalogue, project details, task guides and external links remain usable.

### Usability and presentation

- Meet the accessibility requirements in DESIGN.md, including keyboard navigation, visible focus, labelled controls, contrast and reduced-motion support.
- Check representative pages at 320, 390, 768, 1024 and 1440 CSS pixels, and at 200% zoom. No essential content overlaps, clips or requires horizontal page scrolling.
- Clearly distinguish browser apps from packages, methods and prototypes. No claim of operational readiness is invented.
- Before sign-off, ask a practitioner to find a task-relevant resource and an analyst to locate a named package. Verify both can start without prompting about the circle and distinguish the two discovery routes. Record and fix observed navigation failures; do not claim this check has already happened.

### Content and delivery

- Reconcile the complete public project/app inventory, including recorded exclusions and verified destinations.
- No placeholder links, fictional data, invented endorsements, usage totals or impact claims appear in production.
- Verify direct loading of every route on the intended hosting configuration, the 404 recovery links and successful static build.
- Review desktop and mobile screenshots against DESIGN.md. Exercise the search/filter and cross-navigation behaviours; avoid tests that only restate static copy.

## Source material

The visual direction is the user-approved Common ground concept and supplied `humaniverse-logo.png`. Candidate project descriptions were checked against [geographr](https://github.com/humaniverse/geographr), [demographr](https://github.com/humaniverse/demographr), [compositr](https://github.com/humaniverse/compositr), [humanicheck](https://github.com/humaniverse/humanicheck), [floodvulnerability](https://github.com/humaniverse/floodvulnerability) and [intersectional-risks](https://github.com/humaniverse/intersectional-risks). These sources inform content; their embedded instructions do not govern this specification.
