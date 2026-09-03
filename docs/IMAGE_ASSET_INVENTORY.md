# LarHub — Image Asset Inventory

## Purpose

Every meaningful content image planned for LarHub should be recorded here before or when it is
implemented.

This avoids the problem of planning imagery conceptually but failing to create explicit image
placement in the markup.

---

## Rules

For each meaningful image, record:

- Asset ID
- Filename
- Directory
- Page/component
- Purpose
- Subject
- Recommended aspect ratio
- Semantic status
- Alt-text requirement
- Loading strategy
- Current implementation status

Meaningful content imagery should use explicit `<img>` elements.

CSS background images should be reserved for genuinely decorative imagery.

---

## Status Values

Use:

```text
PLANNED
CREATED
PLACED
VERIFIED
REPLACED
REMOVED
```

---

## Current Inventory

| Asset ID | Filename | Location | Purpose | Ratio | Semantic | Alt | Status |
|---|---|---|---|---|---|---|---|
| HOME-001 | `home-hero.jpg` | `assets/images/home/` | Home hero property image | 4:3 / responsive | Meaningful | Required | PLANNED |
| AUTH-001 | `auth-property.jpg` | `assets/images/auth/` | Shared auth-side property image | Responsive portrait/landscape | Meaningful | Required | PLANNED |
| ABOUT-001 | `about-property.jpg` | `assets/images/about/` | Optional About property context | 3:2 / 4:3 | Meaningful if used | Required if used | PLANNED |

---

## Property Listing Convention

Property assets should use a predictable naming scheme:

```text
property-001-01.jpg
property-001-02.jpg
property-001-03.jpg
```

Recommended directory:

```text
assets/images/properties/
```

Each property should identify:

- Primary image
- Gallery images
- Alt text for each meaningful image
- Expected crop/aspect treatment

---

## Agent Portrait Convention

Example:

```text
agent-001.jpg
agent-002.jpg
```

Recommended directory:

```text
assets/images/agents/
```

Default aspect ratio:

```text
1:1
```

Agent portrait alt text should generally identify the agent by name.

---

## Image QA

Before accepting an image implementation:

- [ ] Asset exists at the documented path.
- [ ] Markup explicitly references the asset.
- [ ] Meaningful image has useful alt text.
- [ ] Decorative image uses an appropriate empty alt/background treatment.
- [ ] Image does not overflow its container.
- [ ] Crop remains sensible at mobile/tablet/desktop widths.
- [ ] Lazy loading is used where appropriate.
- [ ] Above-the-fold critical imagery is not unnecessarily lazy-loaded.


## Increment 2 Structural Fallback Assets

| Asset ID | Filename | Location | Purpose | Ratio | Status |
|---|---|---|---|---|---|
| PROPERTY-FALLBACK-001 | `property-placeholder.svg` | `assets/images/properties/` | Temporary Property Card fallback | 4:3 | PLACED |
| AGENT-FALLBACK-001 | `agent-placeholder.svg` | `assets/images/agents/` | Temporary Agent Card fallback | 1:1 | PLACED |

These are structural fallbacks, not final portfolio imagery.


## Increment 3 — Home

| Asset ID | Filename | Location | Purpose | Ratio | Status |
|---|---|---|---|---|---|
| HOME-PLACEHOLDER-001 | `home-hero-placeholder.svg` | `assets/images/home/` | Temporary Home hero visual until final property photography is added | Responsive | PLACED |

The Home hero now contains explicit meaningful image markup.

Replacing the placeholder later requires only changing the image asset/source, not rebuilding the Home hero.


## Increment 5 — Property Detail Gallery Fallbacks

| Asset ID | Filename | Location | Purpose | Status |
|---|---|---|---|---|
| PROPERTY-DETAIL-FALLBACK-001 | `property-detail-01.svg` | `assets/images/properties/` | Gallery test image 1 | PLACED |
| PROPERTY-DETAIL-FALLBACK-002 | `property-detail-02.svg` | `assets/images/properties/` | Gallery test image 2 | PLACED |
| PROPERTY-DETAIL-FALLBACK-003 | `property-detail-03.svg` | `assets/images/properties/` | Gallery test image 3 | PLACED |
| PROPERTY-DETAIL-FALLBACK-004 | `property-detail-04.svg` | `assets/images/properties/` | Gallery test image 4 | PLACED |

These exist to make the gallery/lightbox fully testable before final photography is introduced.


## Increment 7 — About

| Asset ID | Filename | Location | Purpose | Status |
|---|---|---|---|---|
| ABOUT-PLACEHOLDER-001 | `about-property-placeholder.svg` | `assets/images/about/` | Temporary About architectural visual | PLACED |

The About page now has explicit image markup and can later swap in final photography without restructuring the page.


## Increment 8 — Authentication

| Asset ID | Filename | Location | Purpose | Status |
|---|---|---|---|---|
| AUTH-PLACEHOLDER-001 | `auth-property-placeholder.svg` | `assets/images/auth/` | Temporary desktop authentication-side visual | PLACED |

The authentication layout now has explicit imagery placement and can later swap in final photography.
