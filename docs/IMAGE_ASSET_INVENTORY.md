# LarHub — Image Asset Inventory

## Purpose

This inventory is the source of truth for LarHub meaningful imagery and technical image fallbacks.

For the full visual rationale and property-by-property subject plan, see `docs/IMAGERY_AUDIT.md`.

## Final Imagery Standard

```text
Property images   4:3 · 1600×1200 · JPG
Agent portraits   1:1 · 1000×1000 · JPG
Home hero         4:3 · 1800×1350 · JPG
About image       4:3 · 1600×1200 · JPG
Auth image        4:5 · 1600×2000 · JPG
```

## Editorial Assets

| Asset ID | Final filename | Directory | Placement | Ratio | Current state | Final state |
|---|---|---|---|---|---|---|
| HOME-001 | `home-hero.jpg` | `assets/images/home/` | Home hero | 4:3 | `home-hero-placeholder.svg` is placed | PLANNED |
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
- [ ] Final Home hero installed.
- [ ] 60 unique seeded property images installed.
- [ ] 6 unique agent portraits installed.
- [ ] Final About image installed.
- [ ] Final Auth image installed.
- [ ] Temporary visual-test SVG references removed.
- [ ] Final image crop/alt/loading browser QA completed.
