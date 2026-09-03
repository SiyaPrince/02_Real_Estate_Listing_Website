# LarHub — Project State

## Current Increment

**Increment 9 — User Application**

Status:

**COMPLETE — pending browser acceptance**

---

## Current Project Phase

```text
PLANNING / DESIGN          COMPLETE
FOUNDATION                 COMPLETE + LOCKED
PUBLIC EXPERIENCE          COMPLETE
AUTHENTICATION UI          COMPLETE
USER APPLICATION           IMPLEMENTED
AGENT APPLICATION          NEXT
ADMIN APPLICATION          NOT STARTED
FINAL QA / CONSOLIDATION   NOT STARTED
```

---

## Increment 9 Completed

### Shared Application Shell

Activated:

```text
js/components/app-navigation.js
css/components/dashboard.css
```

The shell supports:

- Responsive application sidebar
- Mobile application menu
- Backdrop
- Escape-to-close
- Active navigation state
- Public marketplace link
- Demo role badge
- Exit Demo action

The component is structured for reuse in Agent/Admin increments.

### User Overview

Implemented:

- Saved Properties count
- Recently Viewed count
- Local Demo Enquiries count
- Recently Viewed preview
- Demo Access notice when User demo role is not active

### Saved Properties

Reads:

```text
larhub.savedProperties
```

and resolves IDs through the Property Service.

Only currently public properties render.

### Recently Viewed

Activated:

```text
larhub.recentlyViewed
```

Property Details records a property when a valid public detail page is opened.

History:

- is browser-local
- stores property IDs only
- is capped at 12 IDs
- can be cleared

### Enquiries

Activated local demonstration records:

```text
larhub.demoEnquiries
```

Valid Property Details enquiry/viewing forms now save a local demo record.

Important:

- no enquiry is sent
- no viewing is scheduled
- records exist only in the current browser
- the UI says this explicitly

### Profile

Activated local demonstration profile:

```text
larhub.demoUserProfile
```

Fields:

- Name
- Email
- Phone
- Preferred location
- Buying/Renting preference

No server account is updated.

### Demo Access

The User workspace recognizes:

```text
larhub.demoSession
```

with:

```text
role: "user"
```

The UI remains viewable without Demo Access because this is a frontend portfolio build,
but clearly warns that User Demo Access is not active.

---

## Next

**Increment 10 — Agent Application**
