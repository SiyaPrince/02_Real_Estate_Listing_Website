# LarHub — Project State

## Current Increment

**Increment 3 — Home**

Status:

**COMPLETE — pending browser acceptance**

---

## Current Project Phase

```text
PLANNING / DESIGN          COMPLETE
FOUNDATION                 COMPLETE + LOCKED
PUBLIC SHELL               COMPLETE
PROPERTY DATA FOUNDATION   COMPLETE
HOME                       IMPLEMENTED
PROPERTIES                 NEXT
PROPERTY DETAILS           NOT STARTED
AGENTS                     NOT STARTED
AUTHENTICATION UI          NOT STARTED
USER APPLICATION           NOT STARTED
AGENT APPLICATION          NOT STARTED
ADMIN APPLICATION          NOT STARTED
```

---

## Increment 3 Completed

### Home Hero

Implemented:

- LarHub eyebrow
- Primary H1
- Supporting copy
- Explicit hero image element
- Responsive two-column desktop composition
- Mobile stacked composition

### Home Search

Implemented:

```text
Buy / Rent
Location
Property Type
Search Properties
```

Search submission creates query parameters and sends the user to:

```text
properties.html
```

Example:

```text
/properties.html?listing=sale&location=Johannesburg&type=house
```

The full Properties filtering system remains deferred to Increment 4.

### Featured Properties

Implemented:

- 3 featured public properties
- Data sourced through `getFeaturedProperties()`
- Shared Property Card renderer
- Link to full marketplace

### Discovery

Implemented:

- Buy discovery card
- Rent discovery card
- Johannesburg link
- Cape Town link
- Pretoria link
- Durban link

### Platform Value

Implemented:

```text
Search clearly
Compare quickly
Connect confidently
```

No fake marketplace statistics were added.

### Final CTA

Implemented:

```text
Browse Properties
```

---

## Hero Image

Current Home hero uses:

```text
assets/images/home/home-hero-placeholder.svg
```

This is a temporary structural placeholder.

The `<img>` placement is now explicit and can later be replaced without restructuring the Home page.

---

## Next

**Increment 4 — Properties**
