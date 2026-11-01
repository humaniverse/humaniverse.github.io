# Humaniverse

A static catalogue and task guides for humanitarian data and decision-support tools. Built from the approved [specification](SPEC.md) and [Common ground design system](DESIGN.md), using Node.js without runtime dependencies.

## Develop

Requires Node.js 22 or later. No dependency installation is needed.

```sh
npm run dev
```

Open the printed local URL (default http://127.0.0.1:4175). If that port is busy, run `PORT=4176 npm run dev`. Changes to content, styles and assets rebuild automatically; refresh the browser to see them. Generator changes require restarting the server.

```sh
npm test
npm run build
npm run check:links
```

The build writes a directory index for each route, a 404 page, sitemap, robots.txt, fonts and unchanged supplied logo to `dist/`. The external link audit writes `docs/link-checks.json` and exits unsuccessfully if any destination needs review. A response failure does not automatically remove a project.

## Content and review

- `content/projects.json` is the canonical project catalogue. Add or edit a project there; no template edit is required. Use the supported subjects and types in SPEC.md.
- `content/pathways.json` stores task context and recommendations by project ID. Project names, status and links resolve from the catalogue. Reciprocal project-to-task links are generated automatically.
- `content/inventory.json` reconciles the public Humaniverse repositories, including explicit exclusions. Recheck the full public repository list before each release.

Before publishing a record, read its README and relevant source documentation. Verify its purpose, platform, coverage, maturity and links. Record the review date and supporting URLs in `reviewedAt` and `evidence`. Keep data reference periods separate from review dates and repository activity. Use `unknown` maturity or `Not documented` coverage when the source is silent; do not infer readiness.

For app availability, an optional link-specific record such as `"availability": {"app": {"status": "unavailable", "checkedAt": "2026-11-01"}}` suppresses the launch action and shows an explanation while preserving documentation and code links. An automated network failure alone is insufficient evidence. Review prototypes and known unavailable apps before every release.

Run tests, the build and the link audit after content changes. Check keyboard operation, representative widths, 200% zoom, no-JavaScript content, no results, filter URLs and browser history. The real practitioner/analyst usability sessions in SPEC.md remain a human release check. See [QA notes](docs/QA.md) and [implementation notes](docs/IMPLEMENTATION.md).

## GitHub Pages

The workflow in `.github/workflows/pages.yml` tests, builds and deploys `dist/` when changes are pushed to `main`. In repository Settings → Pages, select **GitHub Actions** as the deployment source. The known origin is `https://humaniverse.github.io`, derived from this repository. Override `SITE_URL` when building for another origin; no custom domain is assumed. No backend, API key or runtime GitHub request is required.

Pushing or deploying is separate from local implementation. No remote publishing is performed by the build command.

## Assets and reuse

The supplied logo is copied unchanged to `public/assets/brand/humaniverse-logo.png`. Bricolage Grotesque and Source Sans 3 are self-hosted Latin WOFF2 subsets; their SIL Open Font Licenses are included beside the font files. Individual projects and their underlying data have their own reuse terms.
