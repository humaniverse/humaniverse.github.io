# Review of the task pathways

Reviewed 1 November 2026. The eight-task recommendation was subsequently adopted and implemented locally in `content/pathways.json`. Existing task URLs were preserved; see `docs/QA.md` for implementation verification. This document records the reasoning and product mapping behind that decision.

## Recommendation

Keep the task-led approach and redesign its coverage around eight specific jobs. Retain **Build an index**, broaden **Understand a place**, and replace the broad **Explore vulnerability** route with clearer questions about hazards, health and country-level comparisons. Add anticipatory analysis, uncertainty, and data maintenance.

The eight pathways below are an editorial proposal, not a taxonomy validated by visitor research. They give every catalogue product an intelligible home without requiring every product to become a prominent recommendation. A product may help with more than one task.

## What the current pathways cover

The canonical catalogue contains 28 published products. The current three pathways recommend seven distinct products:

| Current pathway | Products | Assessment |
| --- | --- | --- |
| Understand a place | demographr, geographr | A useful starting point, but its title promises a broader community profile than its population and geography ingredients provide. It also gives practitioners only R-based starting points. |
| Explore vulnerability | floodvulnerability, IMD, geographr | The label is broad while the recommendations are UK-focused and lead with flooding. It does not distinguish hazard-specific vulnerability, health and access, or global country-level indices. |
| Build an index | humanicheck, compositr, Vulnerability Index Builder | The clearest existing task. Keep it, add shinycoin as another way to work, and present data checking as supporting guidance. |

The remaining 21 products have no pathway membership. This is a discovery gap, not evidence that every one needs a task card. In particular, development projects and sparsely documented datasets should remain available as related material without being presented as established operational tools.

The subject filters **People, Places, Risks, Methods** can stay. They already answer a different browsing question from the task pathways, although evaluating the catalogue filters themselves is outside this review.

## Alternative taxonomies

| Model | Possible structure | Strength | Limitation |
| --- | --- | --- | --- |
| A. Expand the existing three | Understand a place; Explore vulnerability; Build an index, with further tasks linked within each guide | Smallest navigation change; familiar labels | Anticipatory analysis, estimation and data maintenance still fit poorly. Broader guides risk becoming miniature catalogues. |
| B. Organise by analytical stage | Find context; Prepare data; Build measures; Explore futures; Review results; Maintain and share data | Coherent for analysts learning the collection or conducting a project | People must translate their substantive question into an analytical stage. The stages must not imply an automatically connected pipeline. |
| C. Organise by substantive concern | Population and migration; Deprivation and community needs; Health and access; Climate and disasters; Global vulnerability; Analytical methods | Easy recognition for visitors with a known topic | This is closer to an expanded subject taxonomy. Analytical methods becomes a large catch-all; cross-cutting products appear in many places. |
| D. Organise by the visitor's question — recommended | Eight task pathways listed below | Concrete purposes, clear differences between using existing evidence and creating new analysis, and a place for every product | More choices than the current three; needs concise summaries and a visible distinction between direct recommendations and exploratory material. |

These can coexist selectively: use D for task titles, C for contextual links inside guides, and B to organise guidance where a real sequence is justified. Do not expose three competing navigation systems at once.

## Proposed task titles and scope

| ID | Task title | One-sentence card copy | Main starting points | Additional or exploratory material |
| --- | --- | --- | --- | --- |
| P1 | Understand a community | Find population, deprivation and other evidence to describe a UK community. | demographr; IMD; Deprivation Explorer; geographr for geographical context | asylum for asylum and resettlement statistics; Loneliness index for a specific research question |
| P2 | Explore vulnerability to floods, heat and wildfire | Examine how social conditions and environmental hazards overlap. | floodvulnerability; Heat disadvantage; wildfires; Compare risk maps | Intersectional risks as a prototype to inspect |
| P3 | Investigate health inequalities and access | Find indicators of health and barriers to accessing healthcare. | healthyr; DEPAHRI | Health Inequalities Explorer data; Health Index for Wales; Health Index Scotland; Northern Ireland health indicators; a cross-link to the Loneliness index |
| P4 | Compare country-level vulnerability | Find and compare published global indices, their concepts and coverage. | globalvuln, with a browser explorer and a separate R data route | Links to original publishers and methodology, rather than unrelated products added to fill space |
| P5 | Carry out an anticipatory analysis | Learn the method, develop an analysis or facilitate a workshop. | Anticipatory analysis field guide | fermi as an optional route for a separate quantitative estimation question |
| P6 | Build an index | Combine your own indicators into a documented composite index. | Vulnerability Index Builder; compositr; shinycoin | humanicheck for input diagnostics; a cross-link to the uncertainty pathway |
| P7 | Estimate uncertainty and test assumptions | Estimate uncertain quantities or examine how analytical choices affect results. | fermi; specr (Humaniverse fork); shinyspecr | shinycoin for sensitivity analysis within its own index-building workflow |
| P8 | Maintain and share data | Check data, watch source pages for updates and export package data for others. | humanicheck; peralta; broadcast | Cross-links from the other analytical pathways when these utilities are relevant |

P1–P4 describe existing evidence; P5–P7 describe analytical work; P8 is a compact maintenance guide. Those distinctions can organise the task index visually without requiring another navigation step. Keep the homepage preview selective and offer all tasks on the task index.

P7 and P8 are the broadest proposals. Make their internal choices explicit: **Estimate a quantity** versus **Test analytical choices**, and **Check data**, **Watch for updates**, or **Export data**. If observed visitors struggle with these combinations, split the relevant guide; do not create five extra top-level cards pre-emptively.

## Complete product mapping

Every published catalogue product has one primary home below. Secondary links should be editorially useful, rather than added to maximise membership counts. “Starting point” means a close match to the task, not a claim of production readiness.

| Product and source | Primary home | Role and placement judgment |
| --- | --- | --- |
| [Anticipatory analysis field guide](https://github.com/humaniverse/anticipatory-analysis-guide/blob/main/README.md) | P5 | Lead resource. Its learning, working-session and workshop functions are three entry links within one task, not three separate product listings. |
| [Deprivation Explorer](https://github.com/humaniverse/deprivation-explorer/blob/main/README.md) | P1 | Browser entry to existing UK deprivation evidence. Also relevant to health and hazard context. The very short README limits what can be promised about its features. |
| [Vulnerability Index Builder](https://github.com/humaniverse/build-index/blob/main/README.md) | P6 | Browser route using the visitor's spreadsheets. Explain inputs and methodological choices; distinguish it from browsing an existing vulnerability index. |
| [geographr](https://github.com/humaniverse/geographr/blob/main/README.md) | P1 | Geography support: boundaries, lookups and aggregation. Cross-link from hazard and health analysis when geography matching matters. Requires R; under development. |
| [globalvuln](https://github.com/humaniverse/globalvuln/blob/main/README.md) | P4 | Country-level indices and a browser explorer. Compare concepts and coverage before comparing results. Original scores retain their publisher scales; no combined meta-score is produced. |
| [IMD](https://github.com/humaniverse/IMD/blob/master/README.md) | P1 | Existing deprivation and community-needs measures. Offer the documented downloadable data route as well as R; distinguish nations and editions. |
| [demographr](https://github.com/humaniverse/demographr/blob/main/README.md) | P1 | Population estimates and denominators for a community profile. Requires R; under development. |
| [compositr](https://github.com/humaniverse/compositr/blob/main/README.md) | P6 | R route for creating composite scores. Under development; the visitor supplies data and methods. |
| [humanicheck](https://github.com/humaniverse/humanicheck/blob/main/README.md) | P8 | Data diagnostics, with contextual links from index building and other analytical tasks. Checks missingness, duplicates, outliers and geometry-type consistency; does not certify fitness for purpose. |
| [floodvulnerability](https://github.com/humaniverse/floodvulnerability/blob/main/README.md) | P2 | Existing flood vulnerability and disadvantage datasets. UK coverage, geography and dates differ by dataset. Distinguish social vulnerability from exposure to a particular event. |
| [Intersectional risks](https://github.com/humaniverse/intersectional-risks/blob/main/README.md) | P2 | Related research only. The README identifies a prototype but does not document coverage or operational suitability. |
| [shinycoin](https://github.com/humaniverse/shinycoin/blob/main/README.md) | P6 | Guided COINr route including screening, weighting, sensitivity analysis and a replication script. Requires a local R/Shiny setup; it is not a documented hosted browser service. |
| [healthyr](https://github.com/humaniverse/healthyr/blob/main/README.md) | P3 | UK health-data starting point for R users. Under development; individual datasets require inspection. |
| [asylum](https://github.com/humaniverse/asylum/blob/main/README.md) | P1 | A specific population and policy-context branch. The README describes September 2023 data; avoid presenting it as a current needs assessment or a measure of individual needs. |
| [Loneliness index](https://github.com/humaniverse/loneliness/blob/main/README.md) | P1 | Related community research, also linked from P3. The nations use different approaches, and scores are not comparable between nations. Prescribing proxies do not measure individual loneliness. |
| [peralta](https://github.com/humaniverse/peralta/blob/main/README.md) | P8 | Source-page monitoring for maintainers. Detecting a page update does not establish what changed in the data. Requires R; under development. |
| [wildfires](https://github.com/humaniverse/wildfires/blob/main/README.md) | P2 | Existing social-vulnerability and modelled wildfire-risk measures for UK nations. Scores are standardised within nations; not a live incident forecasting service. |
| [broadcast](https://github.com/humaniverse/broadcast/blob/main/README.md) | P8 | Export .rda files from an R package to CSV for wider use. This supports a specific sharing task, not a general publishing platform. |
| [Health Inequalities Explorer data](https://github.com/humaniverse/hiedata/blob/main/README.md) | P3 | Related source files. The README does not document a hosted explorer, geography, periods or definitions. Do not present it as an app. |
| [Compare risk maps](https://github.com/humaniverse/compare-risk-maps/blob/main/README.md) | P2 | Closely matches comparing overlaps between risk maps. Coverage is not documented in the catalogue/README and must be checked before claiming a UK-wide comparison. |
| [Heat disadvantage](https://github.com/humaniverse/heat-disadvantage/blob/main/README.md) | P2 | Existing heat and social-vulnerability evidence for England, Wales and Scotland. No Northern Ireland data; the national approaches differ. |
| [DEPAHRI](https://github.com/humaniverse/DEPAHRI/blob/main/README.md) | P3 | Specific evidence about digital and physical barriers to healthcare in Great Britain. Area-level risk; not a generic measure of access to all services. |
| [specr (Humaniverse fork)](https://github.com/humaniverse/specr/blob/master/README.md) | P7 | Test how plausible analytical choices affect statistical results. Keep fork attribution clear. Do not treat this as an index-weight sensitivity tool or a data-quality checker. |
| [Health Index for Wales](https://github.com/humaniverse/healthindexwales/blob/main/README.md) | P3 | Related development work. The README still describes a collection pause awaiting a 2025 API; it does not confirm a restart. |
| [Health Index Scotland](https://github.com/humaniverse/healthindexscotland/blob/main/README.md) | P3 | Related development work and indicator metadata. Incomplete indicators and varying reference periods make an operational-index promise inappropriate. |
| [Northern Ireland health indicators](https://github.com/humaniverse/healthindexni/blob/main/README.md) | P3 | Related development work. The README is only a title; the richer catalogue description depends on repository metadata/source inspection. Do not imply a complete reviewed health index. |
| [fermi](https://github.com/humaniverse/fermi/blob/master/README.md) | P7 | Probabilistic estimation from uncertain component quantities. An optional link from P5, with no implied integration with the anticipatory guide. Requires R; under development. |
| [shinyspecr](https://github.com/humaniverse/shinyspecr/blob/main/README.md) | P7 | Explore the statistical models and choices behind a specr result. A documented sequence exists from a specr result to this explorer. Requires R/Shiny and a result object; not a documented hosted app. |

## How the guides should work

1. Start with a recognisable question and the scope that affects use: location, geographical level, data period and access requirements.
2. Offer a small number of strong recommendations, usually two to four. A single-resource guide is appropriate when a flagship resource directly answers a distinct task, as with P4 and P5. Revise the specification's current two-to-four requirement if this model is adopted.
3. Explain why each resource helps with this question. Put technical utilities and exploratory research behind clear contextual links where they do not belong among the main recommendations.
4. Distinguish **use existing measures**, **create a measure**, **estimate uncertain quantities**, and **test analytical choices**. These are different jobs even when they share terminology such as vulnerability or uncertainty.
5. Present browser and R access as alternatives where supported. In P6, for example: browser spreadsheet workflow; custom R functions; local guided COINr workflow. Their different interfaces and methods do not imply equivalent outputs.
6. Include a concrete account of what the visitor must bring and what the resource returns. Do not imply an automatically connected workflow between independently maintained tools.

For example, P6 can open with: “Combine your indicator data into a composite index. Choose a browser tool or an R workflow, document your choices, and examine how those choices affect the result.” It can then distinguish the three tools by access and method, with humanicheck offered as input diagnostics and shinycoin's own sensitivity analysis described specifically.

## Boundaries on the recommendation

No proposed pathway should be labelled **Choose where to intervene**, **Allocate resources**, **Identify vulnerable individuals**, **Predict the next disaster**, or **Measure programme impact** on the present evidence. Those titles promise outcomes beyond the reviewed products. This does not prevent users from bringing the evidence into a wider decision process.

Do not add a standalone top-level pathway for every topic with a single specialist dataset. Asylum and loneliness can be clearly labelled links within the community guide; the three national health-index projects belong together as related development work. In contrast, global comparison and anticipatory analysis each justify a distinct task because their flagship product supports a substantial, recognisable activity.

## Validation before adopting the taxonomy

Use short navigation exercises with practitioners and analysts. Example questions: “Find evidence about vulnerability to extreme heat”; “Compare published country-level vulnerability measures”; “Create an index from my spreadsheet”; “Run an anticipatory workshop”; “See whether a result depends on my modelling choices”; and “Notice when a data publisher updates a source.” Check the first task selected, whether the expected resource is found, and whether the visitor understands the access requirements.

Also test the boundaries most likely to overlap: community deprivation versus health inequalities, country-level comparison versus local hazard vulnerability, and index-building sensitivity versus statistical specification curves. Adjust labels in response to observed confusion. No such user testing has been performed for this proposal.

## Evidence and review method

Read all 28 published records in `content/projects.json`, all three records in `content/pathways.json`, the reconciled `content/inventory.json`, and the task and audience requirements in `SPEC.md`. Read the current GitHub README for every product; links are provided in the complete mapping. The inventory records two deliberate infrastructure exclusions, which do not need task homes.

This is an information-architecture review based on documented purposes and the catalogue's existing qualifications. It does not establish data freshness, app availability, interoperability or operational readiness. No application execution or additional source-code audit was needed to make the taxonomy proposal.
