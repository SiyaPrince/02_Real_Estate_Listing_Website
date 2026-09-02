# LarHub — Backend Integration Notes

## Purpose

This file records frontend-to-backend integration boundaries as they become relevant.

It is **not** a backend design specification.

The goal is to ensure that frontend architecture anticipates real integration without pretending
that backend functionality currently exists.

---

## Integration Rule

Preferred architecture:

```text
UI
↓
Feature / Application Logic
↓
Service Layer
↓
Data Source
```

Current:

```text
Service Layer
↓
Demo Data / Local State
```

Future:

```text
Service Layer
↓
API
↓
Backend
↓
Database / External Provider
```

---

## Authentication

### Frontend UI

Planned:

- Email/password login
- Registration
- Forgot password
- Google
- Facebook
- Apple

### Future Backend Requirements

Potential operations:

```text
POST /auth/login
POST /auth/register
POST /auth/forgot-password
POST /auth/logout
```

Provider flows:

```text
Google OAuth
Facebook OAuth
Apple Sign In
```

Also required later:

- Session/token handling
- Role authorization
- Agent approval state
- User account state
- Password reset token flow

### Current State

**Not connected.**

Frontend must not claim authentication succeeded.

---

## Properties

### Public Read Operations

Potential future operations:

```text
GET /properties
GET /properties/:id
```

Potential filters/query parameters:

- listing type
- location
- property type
- minimum price
- maximum price
- bedrooms
- bathrooms
- features
- sort
- page

### Agent Write Operations

Potential future operations:

```text
POST /properties
PATCH /properties/:id
DELETE /properties/:id
```

Additional lifecycle operations may be implemented through update endpoints or dedicated
workflow endpoints depending on later backend architecture.

### Current State

Demo/local data only.

---

## Property Images

Future requirements:

- Upload endpoint or storage-provider integration
- File validation
- Image ordering
- Primary-image selection
- Delete/replacement
- CDN/storage URLs

Current frontend may support file selection/preview only.

It must not claim files were uploaded persistently.

---

## Agents

Potential future operations:

```text
GET /agents
GET /agents/:id
PATCH /agents/:id
```

Admin approval may require:

```text
POST /agents/:id/approve
POST /agents/:id/reject
POST /agents/:id/suspend
```

Exact endpoint design is deferred.

---

## Enquiries

Potential future operation:

```text
POST /enquiries
```

Agent-side management may require:

```text
GET /agent/enquiries
PATCH /enquiries/:id
```

Current frontend must not claim a message was delivered.

---

## Saved Properties

Potential future account endpoints:

```text
GET /me/saved-properties
POST /me/saved-properties/:propertyId
DELETE /me/saved-properties/:propertyId
```

Initial frontend may use `localStorage`.

---

## Recently Viewed

Possible future approaches:

- Local-only history
- Authenticated account history
- Hybrid local/account sync

No decision required yet.

---

## Admin Moderation

Potential future requirements:

- Listing approval/rejection
- Flagging
- Removal
- Agent approval/rejection
- User suspension/reactivation
- Report resolution
- Audit logging

Current frontend only represents/modifies demo state.

---

## Analytics

Agent performance data will eventually require real event tracking and aggregation.

Current dashboard values are demonstration data only.

Do not present demo analytics as real activity.

---

## Contact

Potential future operation:

```text
POST /contact
```

Delivery may later use:

- Email provider
- Ticketing system
- Internal message store

Current frontend must not claim delivery.

---

## Integration Notes Discipline

When a frontend feature introduces a future backend dependency:

1. Record the dependency here.
2. Keep the frontend service boundary clean.
3. Do not invent unnecessary backend architecture.
4. Do not claim unavailable server behaviour exists.
5. Update this document when the real backend contract is eventually defined.
