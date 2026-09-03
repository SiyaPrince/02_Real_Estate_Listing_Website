# LarHub — Project State

## Current Increment

**Increment 4 — Properties**

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
PROPERTIES                 IMPLEMENTED
PROPERTY DETAILS           NEXT
AGENTS                     NOT STARTED
AUTHENTICATION UI          NOT STARTED
USER APPLICATION           NOT STARTED
AGENT APPLICATION          NOT STARTED
ADMIN APPLICATION          NOT STARTED
```

---

## Increment 4 Completed

### Query-State Marketplace

Properties reads and writes:

```text
listing
location
type
minPrice
maxPrice
bedrooms
bathrooms
features
sort
page
```

Example:

```text
/properties.html?listing=sale&location=Johannesburg&type=house&bedrooms=3
```

Browser back/forward is supported through `popstate`.

### Search

Implemented:

- Buy / Rent
- Location
- Property Type

### Filters

Implemented:

- Minimum price
- Maximum price
- Minimum bedrooms
- Minimum bathrooms
- Garden
- Security
- Solar
- Fibre

Feature filtering uses AND logic across selected features.

### Sorting

Implemented:

- Most relevant
- Price low to high
- Price high to low
- Newest

### Results

Implemented:

- Dynamic result count
- Shared Property Card rendering
- Active filter chips
- Individual filter removal
- Clear-all
- Empty state
- Pagination
- Responsive grid

### Mobile Filters

Implemented:

- Filter drawer
- Backdrop
- Escape-to-close
- Focus restoration
- Basic focus trapping
- Desktop reset behavior

### Pagination

Current page size:

```text
6 properties
```

---

## Public Data Boundary

Properties uses:

```text
getPublicProperties()
```

and therefore excludes Sold, Rented, Draft, and other management-only records.

---

## Next

**Increment 5 — Property Details**
