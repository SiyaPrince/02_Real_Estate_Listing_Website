# LarHub — Project State

## Current Increment

**Increment 5 — Property Details**

Status:

**COMPLETE — pending browser acceptance**

---

## Current Project Phase

```text
PLANNING / DESIGN          COMPLETE
FOUNDATION                 COMPLETE + LOCKED
PUBLIC SHELL               COMPLETE
PROPERTY DATA FOUNDATION   COMPLETE
HOME                       COMPLETE
PROPERTIES                 COMPLETE
PROPERTY DETAILS           IMPLEMENTED
AGENTS                     NEXT
AUTHENTICATION UI          NOT STARTED
USER APPLICATION           NOT STARTED
AGENT APPLICATION          NOT STARTED
ADMIN APPLICATION          NOT STARTED
```

---

## Increment 5 Completed

### Dynamic Loading

Property Details reads:

```text
property.html?id=property-001
```

and loads the matching record through the Property Service.

Invalid, missing, Sold, Rented, Draft, or otherwise non-public records show the unavailable state.

### Gallery

Implemented:

- Main property image
- Secondary images
- View-all control
- Full-screen lightbox
- Previous / Next
- Escape-to-close
- Left / Right arrow navigation
- Focus restoration after closing

### Property Information

Implemented:

- Public status
- Title
- Full location
- Price
- Property reference
- Property-type-aware key facts
- Description
- Features
- Textual location context

No fake map was added.

### Saved Property

Implemented with:

```text
localStorage
```

Key:

```text
larhub.savedProperties
```

Only property IDs are persisted.

### Agent Panel

Implemented:

- Agent photo
- Name
- Agency
- Public Agent Profile link
- Call
- Email

### Enquiry UI

Implemented:

- General enquiry form
- Request-viewing form
- Required-field validation
- Honest frontend-only result messaging

No message or viewing request is claimed to have been sent.

### Similar Properties

Implemented using:

```text
getSimilarPublicProperties()
```

and the shared Property Card renderer.

---

## Image Status

Selected demo properties now have multi-image placeholder galleries so gallery behavior can be tested.

These remain structural placeholders, not final property photography.

---

## Next

**Increment 6 — Agents**
