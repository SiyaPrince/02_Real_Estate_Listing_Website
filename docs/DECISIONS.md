# LarHub — Architecture and Product Decision Log

## Purpose

This file records important accepted decisions that should not be casually reversed during
implementation.

It is not a transcript.

Only decisions with downstream architectural or UX significance belong here.

---

## Decision Format

```text
ID
Date
Decision
Reason
Impact
Status
```

Status values:

- LOCKED
- SUPERSEDED
- UNDER REVIEW

---

## DEC-001 — Product Name

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

The product name is **LarHub**.

### Impact

Use LarHub consistently across:

- Public marketplace
- Authentication UI
- User area
- Agent area
- Admin area
- Documentation
- Metadata
- Future logo/wordmark

---

## DEC-002 — Technology Stage

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Initial LarHub implementation uses:

- HTML5
- CSS3
- Vanilla JavaScript
- ES Modules

No React/framework is introduced in this project stage.

### Reason

LarHub is intended to deepen advanced frontend fundamentals and application architecture before
moving to framework abstraction in a later project.

---

## DEC-003 — Backend Boundary

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

LarHub is frontend-only in the current stage, but the interface should represent the intended
complete frontend product.

Backend-dependent behaviour must remain honest and explicitly unconnected.

---

## DEC-004 — Social Authentication UI

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Authentication pages include:

- Google
- Facebook
- Apple

even before provider integration exists.

### Reason

The finished intended frontend should be designed now so backend integration does not require a
major authentication layout redesign.

---

## DEC-005 — Public Sold/Rented Visibility

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

`Sold` and `Rented` do not appear as active public marketplace listing statuses.

They belong in Agent/Admin management interfaces.

### Public States

- For Sale
- To Rent
- New
- Under Offer

---

## DEC-006 — Shared Component Strategy

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

LarHub should use shared systems for:

- Public header/footer
- Application shells
- Property Card
- Agent Card
- Forms/validation
- Overlays
- Status badges
- Tables/mobile record cards

Avoid duplicated markup/logic where responsibilities are genuinely shared.

---

## DEC-007 — Search State

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Public property-search state should be representable through query parameters where practical.

### Impact

Supports:

- Back/forward navigation
- Refresh persistence
- Shareable searches
- Buy/Rent entry points
- Pagination state

---

## DEC-008 — Imagery

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Meaningful planned imagery must be explicitly implemented with image elements.

Do not rely on empty media placeholders or CSS backgrounds for meaningful content.

---

## DEC-009 — Public vs Management Density

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Public marketplace UI is image-rich and discovery-oriented.

User/Agent/Admin application UI is denser and task-oriented.

Both use the same LarHub brand/design system.

---

## DEC-010 — Increment Discipline

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

Implementation proceeds incrementally.

Do not add future feature code to an earlier foundation increment merely because it may eventually
be required.

Accepted increments should be preserved unless a real defect or architecture issue justifies a
change.


## DEC-011 — Foundation Lock

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

LarHub Foundation Increments 0.1–0.10 are accepted as the shared implementation baseline.

### Locked Foundation

```text
css/tokens.css
css/base.css
css/typography.css
css/layout.css
css/utilities.css

js/main.js
js/utils/dom.js
js/utils/url.js
```

### Impact

Future page and component work should build on these files.

Changes to locked foundation files should be targeted and justified by a genuine shared
requirement, accessibility issue, architecture issue, or reproducible defect.

Page-specific problems should not trigger broad foundation rewrites.


## DEC-012 — Shared Public Shell

**Date:** 2026-09-02  
**Status:** LOCKED

### Decision

All public LarHub pages use one shared JavaScript-rendered header and one shared
JavaScript-rendered footer.

### Navigation

```text
Buy
Rent
Agents
About
Contact
Sign In
```

### Reason

This prevents repeated header/footer markup across the public marketplace while preserving a
single source of truth for navigation, active states, mobile behavior, and future maintenance.

### Impact

Public pages retain explicit semantic `<main>` content while shared public chrome is mounted into
the existing header/footer placeholders.


## DEC-013 — Property Data Model

**Date:** 2026-09-03  
**Status:** LOCKED

LarHub separately stores:

```text
publicStatus
lifecycleStatus
moderationStatus
```

This allows Sold/Rented/Draft records to remain available for future Agent/Admin interfaces
without appearing in public marketplace discovery.


## DEC-014 — Demo User State

**Date:** 2026-09-03  
**Status:** LOCKED

### Decision

The frontend-only User Application may persist demonstration state in browser storage.

Keys:

```text
larhub.savedProperties
larhub.recentlyViewed
larhub.demoEnquiries
larhub.demoUserProfile
```

### Constraint

Browser-local records must never be presented as server-backed account data, delivered enquiries,
or scheduled viewings.
