# Humaniverse design system: Common ground

Status: approved aesthetic translated into an implementation design brief, 1 November 2026. Individual components still require implementation and visual review.

Use this document with [SPEC.md](SPEC.md). SPEC.md owns information architecture, content and behaviour; this document owns visual decisions and interaction presentation.

## Design intent

Humaniverse should feel like a shared collection of useful resources made by people who understand humanitarian work. Preserve the warmth of the supplied circle-of-hands logo and combine it with clear, practical navigation.

The memorable element is the logo within an open circular composition. Everything surrounding it is calm: left-aligned writing, generous whitespace, strong project names, visible links and limited surface decoration.

The catalogue and task pathways are two rooms in the same website. They share typography, colours, navigation, resource components and language. Their layouts differ because browsing a collection and following a task guide are different activities.

## The circle is a brand element

The earlier circular navigator did not clearly communicate that its segments were clickable. Preserve the appearance but remove its navigational responsibility.

- Use four softly coloured quarter-circle shapes, separated by white space, with the original logo at their centre.
- Remove all topic labels from the shapes. No “People”, “Places”, “Risks” or “Methods” text belongs inside this decorative composition.
- Do not add hover changes, pointer cursors, tooltips, links, buttons or selected states to the circle.
- Mark the entire redundant hero composition as decorative for assistive technology. The header already supplies the brand name.
- Put two explicit actions beside the hero copy: **Browse catalogue** and **Find tools for a task**.
- Topic labels belong in catalogue filters, with recognisable controls.

This decision is foundational. Do not reintroduce a radial menu as the only route to any resource, including on touch screens.

## Brand and assets

Preserve the supplied `humaniverse-logo.png` unchanged. During implementation, place it at `public/assets/brand/humaniverse-logo.png` or the equivalent static asset location for the chosen generator. Keep a white backing behind the original artwork where necessary; do not recolour its hands to fit subject categories.

In the header, display the complete mark at approximately 48 × 48px beside the text **Humaniverse**. At narrow widths, 40 × 40px is sufficient with the text wordmark retained. The tiny text inside the logo must never be the only readable brand name. Use empty image alt text when the adjacent linked wordmark provides the same name.

Use the large hero mark once on the homepage. Internal pages use the header mark and quiet circular details only when they help maintain continuity. Do not repeat giant logos above each page's content. Obtain a vector source if available; do not trace a replacement without a design decision.

## Colour

The initial site has a fixed light theme. Do not automatically invert the artwork or derive an unreviewed dark theme from these tokens.

| Token | Name | Value | Use |
| --- | --- | --- | --- |
| `--color-background` | White | `#FFFFFF` | Main page and reading surfaces |
| `--color-text` | Cocoa | `#48230F` | Headings and primary text |
| `--color-action` | Deep teal | `#155E63` | Links, primary actions, active controls |
| `--color-surface` | Pale sage | `#EAF2ED` | Pathway area, related-resource surfaces, circle segments |
| `--color-warm` | Apricot | `#FFD0B2` | Remaining circle segments and small brand accents |
| `--color-muted` | Muted green | `#466359` | Supporting descriptions and metadata |

Supporting functional tokens:

```css
:root {
  color-scheme: light;
  --color-background: #FFFFFF;
  --color-text: #48230F;
  --color-action: #155E63;
  --color-action-hover: #104A4E;
  --color-on-action: #FFFFFF;
  --color-surface: #EAF2ED;
  --color-warm: #FFD0B2;
  --color-muted: #466359;
  --color-divider: #D9E3DD;
  --color-control-border: #466359;
  --color-focus: #155E63;
  --color-error: #9B2525;
}
```

Use cocoa on white, sage or apricot. Use white on deep teal for primary actions. Muted green remains legible text, not a low-opacity treatment. The pale divider is decorative separation; it must not be the only visible boundary of an input or unselected control. Use the darker control-border token for those boundaries.

Colour never carries a category, status or selected state alone. Include a label, checkmark or another visible shape. Status labels are plain text by default. Avoid a rainbow of badges and do not map skin tones to project categories.

Verify contrast in the rendered components, including focus and error states: at least 4.5:1 for normal text, 3:1 for large text, and 3:1 for essential control boundaries and state indicators.

## Typography

Use **Bricolage Grotesque** for the wordmark, display headline, page headings and project names. Use **Source Sans 3** for body copy, controls, navigation and metadata. Self-host licensed subsets when implementing; keep the relevant licence files. Fallback to `system-ui, sans-serif`.

| Role | Desktop target | Narrow target | Weight / line height |
| --- | --- | --- | --- |
| Homepage headline | 64px | 38–44px | 500 / 1.03–1.1 |
| Internal page H1 | 48px | 34–38px | 500 / 1.12 |
| Section H2 | 32px | 28px | 500 / 1.2 |
| Project or task H3 | 24px | 22px | 500 / 1.25 |
| Introductory paragraph | 20px | 18px | 400 / 1.5 |
| Body and controls | 18px | 17px | 400 or 500 / 1.5 |
| Metadata | 15px | 15px | 400 / 1.45 |

Use fluid sizing between these values. Keep body text around 60–68 characters per line, introductory copy around 34–40, and homepage headline around 12–14. Set these as max-widths, not forced line breaks that break small screens. Check the long word “Humanitarian” at the narrowest supported width.

Use modest negative tracking on display text only: about `-0.035em`. Smaller headings may use `-0.015em`; body text keeps normal tracking. Left-align content. Do not justify paragraphs or centre long descriptions.

Headlines use one consistent treatment. Do not highlight one word in a second colour or italic style. Use sentence case, including metadata and navigation. Avoid uppercase eyebrow labels, monospace metadata and decorative numbering.

## Layout and spacing

Use a shared content width of approximately 1160px, centred with responsive side gutters: 20px on small screens, 32px on medium screens and 48px where space allows. At 320px, reduce gutters to 16px if needed.

Spacing scale: **4, 8, 12, 16, 24, 32, 48, 64, 96px**. Use the larger intervals between sections, not within a single resource entry. Let content determine page height; never carry the prototype's equal-height carousel stages into the real site.

Desktop hero: approximately 55% copy and 45% artwork, with 48px between columns. The art should be roughly 320–400px across and subordinate to the headline and actions. Leave enough white space around the central hexagonal mark that its outline remains legible.

Use layout breakpoints based on content fit. Starting points are 640px for single-column composition and 960px for expanded navigation and catalogue filtering. A long translated label or increased text size must be able to wrap without colliding.

## Page compositions

### Homepage: introduce the collection, then offer two routes

```text
Logo + Humaniverse       Browse catalogue  Find tools for a task  About  GitHub

Humanitarian work.                         Decorative circle
Shared tools.                              with original logo
One short description                      (no topic labels)
[Browse catalogue] [Find tools for a task]

Explore the collection                                     Browse all projects
Project + purpose              Project + purpose            Project + purpose
Access links                   Access links                 Access links

What are you working on?                          pale sage section background
Understand a place                  Scope sentence       View suggested tools
Explore vulnerability               Scope sentence       View suggested tools
Build an index                      Scope sentence       View suggested tools
See all tasks

Purpose / About / contribution links / GitHub
```

The featured catalogue preview sits on white. A pale sage band identifies the task-based area without introducing a different brand. The sections should be understandable independently and remain in this order on mobile.

### Catalogue: a useful, scannable index

```text
Browse the catalogue
Short introduction                 Not sure where to start? Find tools for a task
[Search projects by name or purpose                                    ]

Subjects / resource types     Result count + active filters + reset
Native checkbox groups       Project name      Purpose, coverage        Access
                             Type / status    Useful context           links
                             ------------------------------------------------
                             Project name      Purpose, coverage        Access
```

Use a filter sidebar on wide screens and a native expandable **Filter projects** section above results on small screens. Keep search and active-filter summary visible when the filter section is closed. Include the active filter count in its label, such as **Filter projects (2)**.

Resource rows use whitespace and a subtle divider, not enclosing cards with shadows. Align project names, descriptions and actions into loose columns. On mobile, stack name, metadata, purpose and actions in that order. Long names and URLs must wrap safely.

### Task area: a clear question and useful routes

```text
What are you working on?
Start with a task to find useful data and tools.

Understand a place          Short description          View suggested tools
Explore vulnerability      Short description          View suggested tools
Build an index              Short description          View suggested tools

Prefer to explore the whole collection? Browse catalogue
```

Task choices sit on pale sage with generous padding and explicit action text. Use one anchor per choice, containing its title, description and visible action label; do not nest a button inside that anchor. The whole choice may be a link because it has one destination. Make its border and text treatment communicate interactivity before hover.

On an individual task guide, use a white reading column with the title, scope and suggested resources, plus a restrained sage related-project area. Each suggestion explains **why this resource is useful here**. It is not merely a repeated catalogue summary. Avoid flowchart arrows, step numbers or progress bars unless the content actually describes a verified sequence.

Project detail pages inherit the same reading width and action hierarchy. Related task guides use the same task-link component at a smaller scale.

## Components and interactions

### Global navigation

Header links are text links with sufficient spacing and a visible current-page underline. Use `aria-current="page"` for the exact destination; use a separate visual section indicator on nested pages without falsely marking an unrelated URL as the current page.

At narrow widths, use a plainly labelled **Menu** disclosure with a visible expanded state. Keep the wordmark visible. The menu must work without JavaScript, for example with native disclosure semantics; do not ship a dead hamburger icon.

### Actions

- Primary: deep teal fill, white text, approximately 6px corner radius, minimum 44px target height and 16–24px horizontal padding.
- Secondary: white fill, teal text and a visible teal outline of about 1.5px. Same sizing and typography as primary.
- Text link: teal with a persistent underline, offset around 3px. Do not rely on colour or hover to distinguish it from body copy.
- Primary emphasis belongs to the most useful action in a local group; do not fill every resource destination with teal.
- Use **Open app**, **Read documentation**, **View repository**, **Browse catalogue**, and **Find tools for a task** consistently.

Use links for navigation and buttons for state changes. Avoid generic “Explore” or “Learn more” when a more explicit destination fits. Do not append arrows to every action. An external-link icon may be used only as supporting information with an accessible label; it does not replace action text.

### Search, filters and states

Provide a visible **Search projects** label; placeholder copy supplements it. Use a white field, dark visible boundary and clear focus treatment. Native checkboxes expose selection through both the checkmark and label, with the whole label providing a comfortable target.

Show a textual result count near the list. Announce completed search/filter changes politely without announcing each keystroke. Selected filters have named removal actions such as **Remove Places filter**. Clearing or removing a filter retains a sensible focus position.

No-results content uses ordinary text and visible recovery actions. Errors explain the problem and the next action in plain language. Use the error colour on the message or relevant field indicator, with supporting text; do not tint the entire page.

### Project entries

Show information in this order: name, resource type, purpose, relevant coverage/status, access links. In desktop rows these can align horizontally while retaining the same logical reading order.

Maturity is separate from resource type: an app can be a prototype, and a package can be stable. Avoid trophy, verified or popularity symbols without evidence. Show availability messaging only where it is known and relevant to a destination.

### Surface treatment

White is the default. Sage marks related task content; peach is a restrained brand accent. Use 6px radii for controls, up to 12px for a bounded task surface, and large curves only for the brand circle. Avoid universal rounding, floating shadows, glossy gradients and an undifferentiated grid of identical cards.

Dividers organise content; they are not a decorative texture across every section. Use no more than one boundary treatment for the same group.

## Responsive behaviour

- Homepage hero stacks into one column. Keep both actions close to the introduction, wrapping or stacking with full labels. The circle may disappear; navigation must remain complete.
- Featured projects stack as normal content, not a swipe carousel.
- Catalogue rows stack; filters collapse through an accessible disclosure. Do not use an off-screen drawer for essential search controls in the initial release.
- Task choices become full-width links with descriptions and action labels underneath the title. No content depends on hover.
- At increased text size, allow navigation and actions to wrap or move to the compact navigation layout.
- Test at 320, 390, 768, 1024 and 1440 CSS pixels. No fixed heights on text containers, clipped action labels or horizontal page scrolling.

## Accessibility and motion

Target WCAG 2.2 AA. Use semantic landmarks, one H1 per page, logical heading levels, a visible-on-focus **Skip to content** link, native controls and a natural DOM tab order.

All actions have visible keyboard focus. Use an approximately 3px teal outline with a 3px offset; maintain a white separation ring where the neighbouring surface is teal. Do not remove browser focus until a replacement is present. Focus must not be obscured by a header or disclosure.

Provide at least 44 × 44px effective targets for buttons, filters and mobile navigation where practical. Essential content and actions are visible without hover. Keyboard users must be able to search, select filters, reset, navigate task choices and follow every resource link.

Do not animate the hero circle or rotate the logo. No autoplay, pulsing topic areas, parallax or repeated entrance effects. Optional 120–180ms colour transitions may acknowledge hover or selection; respect reduced-motion preferences. Filter results should update promptly without sliding the whole page or stealing focus.

## Voice

Write as a helpful colleague familiar with humanitarian analysis. Use plain verbs and specific descriptions. Explain what a resource does before describing its technical implementation.

Preferred: “Find UK boundaries and geographical lookups.” Avoid: “Unlock powerful geospatial intelligence.”

Use **decision-support tools** in the short public introduction. “Decision intelligence” can be explained on the About page if useful, rather than assumed as familiar terminology. Avoid promises of better outcomes, authoritative priorities or complete coverage without evidence.

## Review and exclusions

The Common ground identity is specific to the supplied circle-of-hands logo. Its warmth comes from cocoa and peach against white, balanced by teal actions. Preserve this combination across both site areas.

Do not introduce the alternative concepts' blue interface palette, purple-and-yellow folders or serif headlines. Their useful navigation ideas are incorporated through task guides and catalogue rows, while the approved aesthetic remains consistent.

Before signing off a page, check:

- Is its purpose and next action apparent without interacting with the circle?
- Can someone distinguish a project title, a filter and an external destination before hover?
- Are catalogue and task pathways clearly separate, visibly related and easy to move between?
- Is the typography, spacing and palette recognisably Common ground?
- Does every visual boundary encode a real grouping or interaction?
- Can an unnecessary badge, border, icon or repeated explanation be removed?

Review real screenshots at desktop and mobile sizes, keyboard focus states and a no-results state. Validate the completed site against the acceptance criteria in SPEC.md; these checks are requirements, not claims that an unbuilt site has passed.
