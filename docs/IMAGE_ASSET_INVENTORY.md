# LarHub — Image Asset Inventory

## Purpose

This inventory is the source of truth for LarHub meaningful imagery and technical image fallbacks.

For the full visual rationale and property-by-property subject plan, see `docs/IMAGERY_AUDIT.md`.

## Final Imagery Standard

```text
Property images   4:3 · 1600×1200 · JPG
Agent portraits   1:1 · 1000×1000 · JPG
Home hero         3:2 · 1350×900 · JPG
About image       4:3 · 1600×1200 · JPG
Auth image        4:5 · 1600×2000 · JPG
```

## Editorial Assets

| Asset ID | Final filename | Directory | Placement | Ratio | Current state | Final state |
|---|---|---|---|---|---|---|
| HOME-001 | `home-hero.jpg` | `assets/images/home/` | Home hero | 3:2 | Final hero JPG is referenced by `index.html` | PLACED |
| ABOUT-001 | `about-property.jpg` | `assets/images/about/` | About hero | 4:3 | `about-property-placeholder.svg` is placed | PLANNED |
| AUTH-001 | `auth-property.jpg` | `assets/images/auth/` | Login/Register/Forgot desktop visual | 4:5 | `auth-property-placeholder.svg` is placed | PLANNED |

## Property Asset Convention

Every seeded property receives four unique final images:

```text
assets/images/properties/property-001-01.jpg
assets/images/properties/property-001-02.jpg
assets/images/properties/property-001-03.jpg
assets/images/properties/property-001-04.jpg
```

This pattern continues through `property-015-04.jpg`.

| Property range | Images/property | Final asset count | Current condition | Final state |
|---|---:|---:|---|---|
| `property-001` → `property-015` | 4 | 60 | Generic placeholder or shared gallery-test SVGs | PLANNED |

## Agent Portrait Convention

| Agent | Final filename | Ratio | Current condition | Final state |
|---|---|---:|---|---|
| agent-001 — Nomsa Dlamini | `agent-001.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |
| agent-002 — Thabo Molefe | `agent-002.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |
| agent-003 — Lerato Mokoena | `agent-003.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |
| agent-004 — Ayesha Khan | `agent-004.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |
| agent-005 — Kagiso Maseko | `agent-005.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |
| agent-006 — Zanele Ndlovu | `agent-006.jpg` | 1:1 | Shared `agent-placeholder.svg` | PLANNED |

## Technical Fallback Assets

| Asset | Purpose | Policy |
|---|---|---|
| `assets/images/properties/property-placeholder.svg` | Missing image / locally-created Agent demo listing | **KEEP** as defensive fallback |
| `assets/images/agents/agent-placeholder.svg` | Missing agent portrait | **KEEP** as defensive fallback unless fallback strategy changes |
| `property-detail-01.svg` → `property-detail-04.svg` | Temporary gallery testing | **REMOVE in 13.7** after seeded data has no references |
| Home/About/Auth placeholder SVGs | Temporary structural imagery | **REMOVE in 13.7** after final JPG references are verified |

## Current Image QA

- [x] Meaningful image placements are explicit in markup/components.
- [x] Property and agent imagery are data-driven.
- [x] Gallery/lightbox has a real image-array contract.
- [x] Technical fallbacks are distinct from final visual assets.
- [x] Final Home hero installed.
- [ ] 60 unique seeded property images installed.
- [ ] 6 unique agent portraits installed.
- [ ] Final About image installed.
- [ ] Final Auth image installed.
- [ ] Temporary visual-test SVG references removed.
- [ ] Final image crop/alt/loading browser QA completed.


### 13.2 Home Integration Note

The Home hero now references:

```text
assets/images/home/home-hero.jpg
```

The previous `home-hero-placeholder.svg` is retained temporarily only for Phase 13 cleanup. It is no longer used by the Home page.

Featured Property Cards on Home still inherit their images from the property dataset. Their final unique photography is intentionally handled in **13.3 — Property Imagery**, so there is one source of truth for property photography.


## Phase 13.3 — Property Imagery Integration

Status: **COMPLETE**

All 15 seeded LarHub property records now reference four explicit local JPEG assets:

```text
assets/images/properties/property-001-01.jpg
...
assets/images/properties/property-015-04.jpg
```

This provides:

- 60 property image files
- 4-image detail galleries per seeded property
- unique file references for cards and gallery positions
- no seeded property dependence on `property-placeholder.svg`

`property-placeholder.svg` remains intentionally available as the fallback for
new browser-local Agent demo listings that have no uploaded image.

The seeded public and management datasets continue to use the same property
records and lifecycle/moderation rules; only their image sources changed.

## Phase 13.4 — Agent Imagery Integration

Status: **COMPLETE**

Each seeded LarHub agent now references an individual local JPEG portrait under:

```text
assets/images/agents/
```

The shared `agent-placeholder.svg` remains available only as a fallback asset.

Agent Directory and Agent Profile continue to use the shared Agent data/service
architecture; no page-specific portrait duplication was introduced.

## Phase 13.5 — About and Authentication Imagery

Status: **COMPLETE**

Final local photographic assets integrated:

```text
assets/images/about/about-architecture.jpg
assets/images/auth/auth-property.jpg
```

The About page uses explicit architectural imagery. Login, Register, and Forgot
Password share one intentional authentication-shell property image so the auth
experience remains visually coherent rather than duplicating unrelated imagery.

No authentication behavior changed.

## Phase 13.6 — UI Polish

No new image assets were introduced.

Existing final imagery received shared presentation refinements through:

```text
css/components/polish.css
```

This standardizes card crops, hover treatment, responsive media presentation,
and final image behavior without changing image references.


## Phase 13.7 — Final Imagery Integration Audit

Status: **COMPLETE**

### Final Integrated Asset Summary

```text
Property JPEGs      60
Agent portraits      6
Home hero            1
About editorial      1
Authentication       1
----------------------
Final visual assets 69
```

### Intentional Fallbacks Retained

```text
assets/images/properties/property-placeholder.svg
assets/images/agents/agent-placeholder.svg
```

These are retained for future/unseeded browser-local demo records and are not used by
the seeded portfolio catalogue.

### Obsolete Assets Removed

- `assets/images/home/home-hero-placeholder.svg`
- `assets/images/about/about-property-placeholder.svg`
- `assets/images/auth/auth-property-placeholder.svg`
- `assets/images/properties/property-detail-01.svg`
- `assets/images/properties/property-detail-02.svg`
- `assets/images/properties/property-detail-03.svg`
- `assets/images/properties/property-detail-04.svg`

### Final Rule

Seeded portfolio properties and agents use explicit local JPEG imagery.
Generic placeholders exist only as defensive/demo fallbacks.


## Final Imagery Repair — Clean Source Assets

The previous screenshot-derived image set was replaced.

- 60 seeded property JPEGs now contain photo-only content with no LarHub UI/text overlays.
- Home, About, and Authentication use photo-only local JPEGs.
- Six seeded agent portraits were remapped to match the fictional agent names/gender presentation.
- Property galleries use four different images per seeded property.
- Existing fallback SVGs remain only for future/unseeded demo records.


## Final Clean Imagery Repair

The screenshot-derived imagery issue was corrected before final packaging.

- Seeded property cards and galleries use photo-only JPEGs with no visible LarHub UI text/chrome.
- Fifteen primary property visuals are visually distinct; each seeded property has four gallery images.
- Home, About, and Authentication imagery is photo-only.
- Agent portraits are individually mapped to the six fictional agents, with gender presentation aligned to their names.
