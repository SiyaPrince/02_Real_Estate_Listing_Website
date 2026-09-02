# LarHub — Project Scope and Product Architecture

## 1. Document Purpose

This document records the locked product scope, product domains, user roles, page inventory,
major journeys, and frontend/backend boundary for LarHub.

It is the highest-level design reference for the project.

---

## 2. Product Definition

**LarHub** is a modern real estate listing platform designed around clear property discovery,
comparison, agent connection, and marketplace management.

The product should feel:

- Modern
- Trustworthy
- Architectural
- Refined
- Calm
- Professional
- Premium but accessible

Core design principle:

> **Properties provide personality. Interface provides clarity.**

South African identity should come primarily through the content itself — locations, rand
pricing, property types, agents, and architecture — rather than stereotyped visual motifs.

---

## 3. Product Domains

LarHub consists of five frontend domains:

```text
LARHUB
│
├── PUBLIC MARKETPLACE
├── AUTHENTICATION
├── USER AREA
├── AGENT AREA
└── ADMIN AREA
```

These are parts of one product, not independent websites.

They share:

- Brand identity
- Design tokens
- Typography
- Controls
- Form patterns
- Accessibility rules
- Responsive principles
- Status patterns
- Feedback patterns

Each domain receives an appropriate layout shell.

---

## 4. Public Marketplace

```text
PUBLIC MARKETPLACE
├── Home
├── Properties
│   ├── For Sale
│   └── To Rent
├── Property Details
├── Agents
├── Agent Profile
├── About
└── Contact
```

### Primary Marketplace Journey

```text
Home
↓
Search
↓
Properties
↓
Filter / Sort
↓
Property Details
↓
Agent
↓
Enquiry
```

The primary marketplace user is a property seeker looking to buy or rent residential,
commercial, or land property.

---

## 5. Authentication

```text
AUTHENTICATION
├── Login
├── Register
└── Forgot Password
```

The intended authentication interface includes:

- Email/password
- Continue with Google
- Continue with Facebook
- Continue with Apple

These provider buttons should exist in the frontend design now so that later backend/OAuth
integration does not require a major interface redesign.

Until authentication providers are connected, these controls must clearly communicate that
provider authentication is unavailable in the frontend-only build.

They must never falsely claim that authentication succeeded.

---

## 6. User Area

```text
USER AREA
├── Overview
├── Saved Properties
├── Enquiries
├── Recently Viewed
└── Profile
```

Purpose:

> Give a property seeker one place to manage their LarHub activity.

The public marketplace answers:

> What property can I find?

The user area answers:

- What have I saved?
- What have I enquired about?
- What have I recently viewed?
- What account information do I have?

---

## 7. Agent Area

```text
AGENT AREA
├── Overview
├── Listings
│   ├── All
│   ├── Draft
│   ├── Pending Review
│   ├── Published
│   ├── Under Offer
│   ├── Sold
│   ├── Rented
│   └── Archived
├── Add Property
├── Edit Property
├── Enquiries
├── Performance
└── Profile
```

Purpose:

> Help agents manage the lifecycle of their listings and the interest those listings generate.

---

## 8. Admin Area

```text
ADMIN AREA
├── Overview
├── Listings
│   ├── All
│   ├── Pending Review
│   ├── Approved
│   ├── Rejected
│   ├── Flagged
│   └── Removed
├── Users
├── Agents
├── Reports / Moderation
└── Settings
```

Purpose:

> Manage the health, quality, and governance of the LarHub marketplace.

Admin UI should be operational and data-focused rather than decorative.

---

## 9. Status Model

LarHub deliberately separates public merchandising/lifecycle language from agent workflow and
admin moderation.

### 9.1 Public Listing State

Allowed public-facing states:

- FOR SALE
- TO RENT
- NEW
- UNDER OFFER

`FEATURED` may exist as merchandising metadata rather than a lifecycle status.

**Sold and Rented must not appear as active public discovery statuses.**

Sold or rented properties should normally disappear from active public search/discovery.

### 9.2 Agent Lifecycle State

```text
DRAFT
PENDING REVIEW
PUBLISHED
UNDER OFFER
SOLD
RENTED
ARCHIVED
```

Conceptual lifecycle:

```text
Draft
↓
Submit for Review
↓
Pending Review
↓
Approved
↓
Published
↓
Under Offer
↓
Sold / Rented
↓
Archived
```

Alternative moderation path:

```text
Pending Review
↓
Rejected
↓
Back to Draft / Correction
```

### 9.3 Admin Moderation State

```text
PENDING REVIEW
APPROVED
REJECTED
FLAGGED
REMOVED
```

These concepts should not be collapsed into one ambiguous status.

A property could conceptually be:

```text
Public intent:       For Sale
Lifecycle:           Published
Moderation:          Approved
```

---

## 10. Frontend-Only Scope

LarHub is being designed as a complete frontend product experience before backend integration.

### Can Work Genuinely in Frontend

- Property search
- Filtering
- Sorting
- Pagination
- Property galleries
- Saved-property UI/state
- Recently viewed state
- Form validation
- Property image previews
- Dashboard filtering
- Responsive navigation
- Drawers and dialogs
- Demo listing state transitions
- Demo management records

### May Use Local Persistence

`localStorage` may be used where appropriate for:

- Saved properties
- Recently viewed properties
- Selected preferences
- Clearly labelled demo session state

### Deferred Backend Capabilities

- Real authentication
- Google OAuth
- Facebook OAuth
- Apple OAuth
- Database persistence
- Real listing creation/update
- Persistent image upload/storage
- Real enquiry delivery
- Agent approval persistence
- Admin moderation persistence
- Real analytics
- Password recovery
- Server-side authorization
- Real role permissions
- Audit logging

---

## 11. No Fake Functionality Rule

Frontend controls may represent the intended finished interface, but LarHub must never claim
that a backend-dependent operation succeeded when no backend exists.

Examples:

Do not claim:

- "Signed in successfully with Google"
- "Reset email sent"
- "Listing published"
- "Enquiry sent"
- "Account created"

unless those operations genuinely occurred.

Instead, frontend-only states should truthfully communicate that the relevant backend/provider
integration is not connected.

---

## 12. Backend-Ready Principle

The architecture should aim for:

```text
UI
↓
Application / Feature Logic
↓
Service Layer
↓
Data Source
```

Initially:

```text
Service Layer
↓
Demo Data / Local State
```

Later:

```text
Service Layer
↓
API
↓
Backend
↓
Database
```

The objective is that backend integration changes data sources and persistence more than it
changes page structure or interface design.

---

## 13. Major Page Architecture Status

```text
PUBLIC
├── Home ✓
├── Properties ✓
├── Property Details ✓
├── Agents ✓
├── Agent Profile ✓
├── About ✓
└── Contact ✓

AUTH
├── Login ✓
├── Register ✓
└── Forgot Password ✓

USER
├── Dashboard ✓
├── Saved Properties ✓
├── Enquiries ✓
├── Recently Viewed ✓
└── Profile ✓

AGENT
├── Dashboard ✓
├── Listings ✓
├── Add / Edit Property ✓
├── Enquiries ✓
├── Performance ✓
└── Profile ✓

ADMIN
├── Dashboard ✓
├── Listings / Moderation ✓
├── Users ✓
├── Agents ✓
├── Reports ✓
└── Settings ✓
```

---

## 14. Locked Scope Decision

LarHub is not merely a collection of marketing pages.

It is designed as a complete frontend application architecture containing:

- Public marketplace discovery
- Authentication interfaces
- Property-seeker account interfaces
- Agent management interfaces
- Administrator management/moderation interfaces

The backend is deferred, not the intended frontend experience.
