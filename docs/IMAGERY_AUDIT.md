# LarHub — Phase 13.1 Full Imagery Audit

**Phase:** 13 — Visual Polish & Final Imagery

**Increment:** 13.1 — Full Imagery Audit

**Audit result:** **COMPLETE**

## Executive Summary

LarHub has the correct structural image placement, but the visual layer is still almost entirely placeholder-driven.

The current dataset contains **15 properties** and **6 agents**. Of the properties, **12** are public/under-offer records and **3** are management-only records. **11 properties still point directly at the generic property placeholder**, while **4 properties reuse the same four gallery test SVGs across unrelated listings.** All six agents reuse one portrait placeholder.

The good news is that imagery is already wired into the application correctly. This phase therefore does **not** require redesigning page structure. The primary work is replacing asset sources with a coherent final image library.

## Current Image Architecture

| Visual role | Current implementation | Structural status | Visual status |
|---|---|---|---|
| Home hero | Explicit `<img>` | Correct | Placeholder |
| Property cards | Data-driven image source | Correct | Placeholder/reused demo art |
| Property gallery/lightbox | Data-driven image array | Correct | Reused demo art / missing unique galleries |
| Agent cards | Data-driven portrait source | Correct | One shared placeholder |
| Agent profiles | Same agent portrait data | Correct | One shared placeholder |
| About hero | Explicit `<img>` | Correct | Placeholder |
| Authentication visual | Explicit shared `<img>` | Correct | Placeholder |
| User saved/recent cards | Reuse Property Card | Correct | Inherits property imagery |
| Agent listing management | Reuses listing image data | Correct | Inherits property imagery |
| Admin agent management | Reuses agent portrait data | Correct | Inherits agent imagery |
| Contact | No meaningful image required | Correct | Keep text/form-led |

## Main Problems Found

1. **Property identity is not visually unique.** Several unrelated listings reuse the same SVG gallery assets, and most listings still use one generic property placeholder.
2. **Agent identity is not visually unique.** All six agents use the same portrait placeholder.
3. **Home, About, and Authentication still look like scaffolding.** Their image regions are structurally correct but visibly placeholder assets.
4. **The image inventory records placement but not a complete final asset matrix.** This audit now defines the final naming and crop plan.
5. **Final image quality should be controlled globally.** Property photography should feel like one marketplace, not a random stock-image collection.

## Final Visual Direction

LarHub should use a **contemporary South African residential-property editorial aesthetic**: natural daylight, warm neutral architecture, realistic lived-in spaces, restrained styling, accurate perspective, and minimal heavy HDR or oversaturation.

Recommended visual characteristics:

- contemporary but believable South African homes and apartments
- soft natural light and warm neutral interiors
- clean architecture with some greenery / exterior context
- realistic property-listing photography rather than luxury-magazine fantasy
- consistent exposure and white balance across listings
- no visible watermarks, logos, fake property-board text, or embedded typography
- no identifiable people in property photography unless genuinely necessary
- agent portraits should be professional, approachable, and consistently framed

## Canonical Asset Naming

### Editorial / Site Images

```text
assets/images/home/home-hero.jpg
assets/images/about/about-property.jpg
assets/images/auth/auth-property.jpg
```

### Property Images

Each listing receives four unique images:

```text
property-001-01.jpg   primary / exterior-or-best-overview
property-001-02.jpg   principal interior
property-001-03.jpg   secondary interior / feature
property-001-04.jpg   exterior / lifestyle / secondary feature
```

### Agent Portraits

```text
agent-001.jpg
agent-002.jpg
agent-003.jpg
agent-004.jpg
agent-005.jpg
agent-006.jpg
```

## Asset Ratio and Resolution Standard

| Role | Working ratio | Recommended source size | Crop behavior |
|---|---:|---:|---|
| Home hero | 4:3 source, responsive crop | 1800×1350 | `object-fit: cover` |
| Property primary/card image | 4:3 | 1600×1200 | `object-fit: cover` |
| Property gallery images | 4:3 preferred | 1600×1200 | cover in gallery, contain in lightbox |
| Agent portrait | 1:1 | 1000×1000 | centered face/upper torso |
| About image | 4:3 | 1600×1200 | responsive cover |
| Auth image | 4:5 portrait | 1600×2000 | full-height desktop cover |

JPG is the default final format. WebP/AVIF can be introduced in a later optimization pass if desired, but is not required to complete the portfolio-quality visual replacement.

## Complete Property Image Matrix

Every property gets four unique visual assets so card, gallery, User, Agent, and Admin surfaces all share one consistent source of truth.

| Property | Listing context | Image 01 | Image 02 | Image 03 | Image 04 |
|---|---|---|---|---|---|
| property-001 — Modern Family Home in Rosebank | Rosebank, Johannesburg · house · sale · published | `property-001-01.jpg` — exterior/front elevation | `property-001-02.jpg` — main living room | `property-001-03.jpg` — kitchen/dining | `property-001-04.jpg` — garden/pool/outdoor |
| property-002 — City Apartment with Skyline Views | Sandton, Johannesburg · apartment · sale · published | `property-002-01.jpg` — living area / view | `property-002-02.jpg` — kitchen / open plan | `property-002-03.jpg` — bedroom | `property-002-04.jpg` — balcony / building / shared amenity |
| property-003 — Three-Bedroom Townhouse in Midrand | Halfway Gardens, Midrand · townhouse · sale · published | `property-003-01.jpg` — exterior / entrance | `property-003-02.jpg` — living room | `property-003-03.jpg` — kitchen / dining | `property-003-04.jpg` — private garden / estate context |
| property-004 — Furnished Apartment near the Waterfront | Green Point, Cape Town · apartment · rent · published | `property-004-01.jpg` — living area / view | `property-004-02.jpg` — kitchen / open plan | `property-004-03.jpg` — bedroom | `property-004-04.jpg` — balcony / building / shared amenity |
| property-005 — Spacious Family Home in Waterkloof | Waterkloof, Pretoria · house · sale · published | `property-005-01.jpg` — exterior/front elevation | `property-005-02.jpg` — main living room | `property-005-03.jpg` — kitchen/dining | `property-005-04.jpg` — garden/pool/outdoor |
| property-006 — Contemporary Rental in Umhlanga | Umhlanga Ridge, Durban · apartment · rent · published | `property-006-01.jpg` — living area / view | `property-006-02.jpg` — kitchen / open plan | `property-006-03.jpg` — bedroom | `property-006-04.jpg` — balcony / building / shared amenity |
| property-007 — Commercial Office Suite in Sandton | Sandton Central, Johannesburg · commercial · rent · published | `property-007-01.jpg` — building / reception | `property-007-02.jpg` — main workspace | `property-007-03.jpg` — boardroom / internal feature | `property-007-04.jpg` — exterior / parking / frontage |
| property-008 — Vacant Residential Land in Stellenbosch | Paradyskloof, Stellenbosch · land · sale · published | `property-008-01.jpg` — wide site overview | `property-008-02.jpg` — view / slope / landscape | `property-008-03.jpg` — road access / boundary context | `property-008-04.jpg` — surrounding mountain/neighbourhood context |
| property-009 — Secure Two-Bedroom Rental in Pretoria East | Lynnwood, Pretoria · townhouse · rent · published | `property-009-01.jpg` — exterior / entrance | `property-009-02.jpg` — living room | `property-009-03.jpg` — kitchen / dining | `property-009-04.jpg` — private garden / estate context |
| property-010 — Renovated Home in Parkhurst | Parkhurst, Johannesburg · house · sale · under-offer | `property-010-01.jpg` — exterior/front elevation | `property-010-02.jpg` — main living room | `property-010-03.jpg` — kitchen/dining | `property-010-04.jpg` — garden/pool/outdoor |
| property-011 — Modern Loft in Maboneng | Maboneng, Johannesburg · apartment · sale · published | `property-011-01.jpg` — living area / view | `property-011-02.jpg` — kitchen / open plan | `property-011-03.jpg` — bedroom | `property-011-04.jpg` — balcony / building / shared amenity |
| property-012 — Four-Bedroom Home in Durban North | Durban North, Durban · house · sale · published | `property-012-01.jpg` — exterior/front elevation | `property-012-02.jpg` — main living room | `property-012-03.jpg` — kitchen/dining | `property-012-04.jpg` — garden/pool/outdoor |
| property-013 — Sold Family Home in Bryanston | Bryanston, Johannesburg · house · sale · sold | `property-013-01.jpg` — exterior/front elevation | `property-013-02.jpg` — main living room | `property-013-03.jpg` — kitchen/dining | `property-013-04.jpg` — garden/pool/outdoor |
| property-014 — Rented Apartment in Sea Point | Sea Point, Cape Town · apartment · rent · rented | `property-014-01.jpg` — living area / view | `property-014-02.jpg` — kitchen / open plan | `property-014-03.jpg` — bedroom | `property-014-04.jpg` — balcony / building / shared amenity |
| property-015 — Draft Commercial Unit in Centurion | Centurion Central, Pretoria · commercial · sale · draft | `property-015-01.jpg` — building / reception | `property-015-02.jpg` — main workspace | `property-015-03.jpg` — boardroom / internal feature | `property-015-04.jpg` — exterior / parking / frontage |

### Management-only properties

Properties `property-013`, `property-014`, and `property-015` are not active public discovery records, but they still need final imagery because Agent/Admin management surfaces display their listing image. Keeping four images for all 15 properties also prevents the data model from having special-case image rules.

## Agent Portrait Matrix

| Agent | Final filename | Crop | Portrait direction |
|---|---|---|---|
| agent-001 — Nomsa Dlamini | `agent-001.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |
| agent-002 — Thabo Molefe | `agent-002.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |
| agent-003 — Lerato Mokoena | `agent-003.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |
| agent-004 — Ayesha Khan | `agent-004.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |
| agent-005 — Kagiso Maseko | `agent-005.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |
| agent-006 — Zanele Ndlovu | `agent-006.jpg` | 1:1 | Professional South African property practitioner; upper torso; neutral/warm background; direct approachable expression |

## Editorial Image Matrix

| Asset | Final path | Purpose | Required visual direction |
|---|---|---|---|
| Home hero | `assets/images/home/home-hero.jpg` | First impression of marketplace | Premium contemporary South African home, architectural exterior/interior connection, natural daylight, broad composition with safe crop |
| About | `assets/images/about/about-property.jpg` | Editorial context for LarHub | Human-scale contemporary architecture, thoughtful design, less sales-oriented than property cards |
| Authentication | `assets/images/auth/auth-property.jpg` | Full-height desktop auth visual | Vertical architectural/property composition with darker/quiet lower area suitable behind LarHub overlay |

## Pages That Should Not Receive New Standalone Imagery

The following should remain function-led rather than being decorated simply because images are available:

- Properties search/filter header
- Contact page
- User Overview/Profile
- Agent Performance/Profile settings
- Admin Overview/Activity/Settings

Where these pages display properties or agents, they should inherit the shared Property Card / Agent image data rather than introduce separate imagery.

## Replacement Map

| Current asset | Replacement | After replacement |
|---|---|---|
| `home-hero-placeholder.svg` | `home-hero.jpg` | Remove placeholder once no references remain |
| `about-property-placeholder.svg` | `about-property.jpg` | Remove placeholder once no references remain |
| `auth-property-placeholder.svg` | `auth-property.jpg` | Remove placeholder once no references remain |
| `agent-placeholder.svg` | six individual `agent-00X.jpg` files | Keep as true fallback only or remove after fallback policy decision |
| `property-detail-01.svg` … `04.svg` | unique property galleries | Remove after no data references remain |
| `property-placeholder.svg` | unique property primary images | Keep as technical fallback for locally-created Agent demo listings |

## Important Fallback Decision

`property-placeholder.svg` should **not** be deleted during visual polish. It still has a legitimate technical role for new local Agent demo listings that do not yet support image upload. It becomes a fallback, not a visible portfolio asset in the seeded property dataset.

`agent-placeholder.svg` may likewise remain as a defensive fallback even after all six seeded agents receive final portraits, though no seeded agent should reference it.

## Final Asset Count

| Category | Count |
|---|---:|
| Property photography | 60 |
| Agent portraits | 6 |
| Home/About/Auth editorial imagery | 3 |
| **Total final visual assets** | **69** |

Technical fallback SVGs are not included in the 69 final portfolio images.

## Implementation Order

```text
13.2  Home imagery
13.3  Property imagery
13.4  Agent imagery
13.5  About + Authentication imagery
13.6  UI visual polish
13.7  Final imagery integration audit
```

## 13.1 Acceptance

- [x] Every current placeholder asset identified.
- [x] Every meaningful image placement identified.
- [x] Every inherited image surface identified.
- [x] Pages that should remain image-light identified.
- [x] Final asset naming convention defined.
- [x] Property image matrix defined for all 15 records.
- [x] Agent portrait matrix defined for all 6 records.
- [x] Aspect ratios and source resolutions defined.
- [x] Fallback-vs-final asset policy defined.
- [x] Replacement/deletion policy defined.

**13.1 is complete. No live UI image references were changed in this audit increment.**
