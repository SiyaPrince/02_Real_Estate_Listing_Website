# LarHub — Technical Architecture and Project Structure

## 1. Purpose

This document defines how the locked LarHub UX architecture should be implemented.

The objective is:

> Build LarHub so that the frontend is useful and complete now, while later backend integration
> primarily changes data sources and persistence rather than requiring a frontend rebuild.

---

## 2. Technology Boundary

LarHub's initial implementation uses:

```text
HTML5
CSS3
Vanilla JavaScript
ES Modules
Local/client-side demo data
localStorage where appropriate
```

No frontend framework is introduced in this project stage.

LarHub is intended to be a more advanced vanilla-JavaScript project than the previous static
frontend work.

Primary learning areas:

- Structured application state
- Data-driven rendering
- Reusable UI
- Filtering
- Sorting
- Pagination
- Role-based UI
- Dashboard interfaces
- Complex forms
- Client-side persistence
- Service boundaries
- Application architecture

---

## 3. Architectural Direction

Preferred:

```text
UI
↓
Feature / Application Logic
↓
Services
↓
Data Source
```

Initial:

```text
Services
↓
Demo Data
```

Future:

```text
Services
↓
API
↓
Backend
↓
Database
```

Pages should not directly depend on random hard-coded data arrays spread throughout the
application.

---

## 4. Proposed Project Structure

```text
larhub/
│
├── index.html
├── properties.html
├── property.html
├── agents.html
├── agent.html
├── about.html
├── contact.html
│
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
│
├── user/
│   ├── index.html
│   ├── saved.html
│   ├── enquiries.html
│   ├── recently-viewed.html
│   └── profile.html
│
├── agent/
│   ├── index.html
│   ├── listings.html
│   ├── property-form.html
│   ├── enquiries.html
│   ├── performance.html
│   └── profile.html
│
├── admin/
│   ├── index.html
│   ├── listings.html
│   ├── listing-review.html
│   ├── users.html
│   ├── agents.html
│   ├── agent-review.html
│   ├── moderation.html
│   └── settings.html
│
├── assets/
│   ├── images/
│   │   ├── home/
│   │   ├── properties/
│   │   ├── agents/
│   │   ├── auth/
│   │   └── about/
│   └── icons/
│
├── css/
│   ├── main.css
│   ├── tokens.css
│   ├── base.css
│   ├── typography.css
│   ├── layout.css
│   ├── utilities.css
│   ├── components/
│   └── pages/
│
├── js/
│   ├── main.js
│   ├── components/
│   ├── features/
│   ├── services/
│   ├── data/
│   ├── utils/
│   └── pages/
│
├── docs/
│   ├── PROJECT_STATE.md
│   ├── IMAGE_ASSET_INVENTORY.md
│   ├── QA_CHECKLIST.md
│   └── BACKEND_INTEGRATION_NOTES.md
│
└── README.md
```

The structure grows incrementally. Every possible file should not be created on day one.

---

## 5. Data, Services and Pages

### Data

Contains frontend demonstration records.

Examples:

```text
properties.js
agents.js
users.js
enquiries.js
```

### Services

Own data access operations.

Conceptual property service:

```text
getProperties()
getPropertyById()
getFeaturedProperties()
getPropertiesByAgent()
searchProperties()
```

Initially these functions operate on demo data.

Later their internal implementation can call an API.

### Pages

Page modules coordinate page-level features.

They should orchestrate shared modules rather than own every responsibility themselves.

---

## 6. Example Property Model

Conceptual:

```js
{
  id: "property-001",
  reference: "LH-1024",

  title: "Modern Family Home in Rosebank",

  listingType: "sale",
  propertyType: "house",

  price: 2450000,

  location: {
    suburb: "Rosebank",
    city: "Johannesburg",
    province: "Gauteng"
  },

  facts: {
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    floorArea: 250,
    landArea: 480
  },

  features: [
    "Swimming Pool",
    "Garden",
    "Solar",
    "Security"
  ],

  images: [],

  agentId: "agent-001",

  publicStatus: "for-sale",
  lifecycleStatus: "published",
  moderationStatus: "approved"
}
```

Data values should remain useful for logic.

Example:

Store:

```text
2450000
```

rather than:

```text
"R2 450 000"
```

Formatting belongs in presentation utilities.

---

## 7. Relationships

Properties reference agents by ID.

```text
PROPERTY
agentId = agent-001
       │
       ▼
AGENT
id = agent-001
```

This introduces relational thinking without prematurely defining a database schema.

---

## 8. Rendering Strategy

Use a hybrid strategy.

### Static HTML

Appropriate for:

- Page headings
- About content
- Contact content
- Form structure
- Navigation landmarks
- Static sections

### Data-Driven Rendering

Appropriate for:

- Property cards
- Agent cards
- Search results
- Saved listings
- Similar listings
- Dashboard records
- Management tables
- Pagination

Avoid both extremes:

- Hard-code every repeated data record
- Generate the entire website unnecessarily through JavaScript

---

## 9. Shared HTML

Plain HTML has no native include mechanism.

Shared site/application structures such as:

- Public header
- Public footer
- Application navigation

may use lightweight JavaScript-driven shared components/fragments.

Concept:

```html
<header data-public-header></header>

<main>
  ...
</main>

<footer data-public-footer></footer>
```

The shared module supplies the repeated structure.

Page content should remain meaningful and semantic.

---

## 10. JavaScript Entry Point

`main.js` should remain small.

Responsibilities may include:

- Shared navigation initialization
- Shared footer initialization
- Global dialog helpers
- Global form helpers

Page-specific functionality belongs in page modules.

Example:

```text
properties.html
↓
main.js
+
pages/properties.js
```

`pages/properties.js` coordinates:

- Search
- Filters
- Sort
- Pagination
- Rendering

while delegating work to focused modules.

---

## 11. Data Hooks

Use classes for styling and `data-*` attributes for JavaScript hooks.

Example:

```html
<button
  class="filter-button"
  type="button"
  data-filter-toggle
>
  Filters
</button>
```

CSS targets:

```text
.filter-button
```

JavaScript targets:

```text
[data-filter-toggle]
```

This keeps styling and behaviour contracts separate.

---

## 12. URL Search State

Properties search should be representable in query parameters.

Example:

```text
properties.html
?listing=sale
&location=johannesburg
&type=house
&beds=3
&sort=price-asc
&page=2
```

Benefits:

- Browser back/forward
- Refresh preservation
- Shareable searches
- Bookmarkable searches
- Home-to-results continuity
- Buy/Rent navigation
- Pagination state

---

## 13. Detail Routing

Without a framework router:

```text
property.html?id=property-001
```

The page module:

```text
reads ID
↓
propertyService.getPropertyById()
↓
renders property
```

Agent profiles can use:

```text
agent.html?id=agent-001
```

---

## 14. Local Storage

Potential keys:

```text
larhub.savedProperties
larhub.recentlyViewed
```

Store IDs/references rather than duplicate complete property records.

Example:

```text
[
  "property-001",
  "property-008",
  "property-014"
]
```

The property dataset/service remains the source of truth.

---

## 15. Demo Authentication

A clearly labelled frontend demonstration session may be provided to make the user, agent, and
admin dashboards explorable.

Potential demo roles:

- Demo Property Seeker
- Demo Agent
- Demo Administrator

This must not be presented as real authentication.

---

## 16. Service Boundaries

Conceptual services:

```text
property-service
agent-service
auth-service
enquiry-service
storage-service
```

Examples:

Today:

```text
getProperties()
↓
demo data
```

Future:

```text
getProperties()
↓
GET /api/properties
```

Today:

```text
loginWithGoogle()
↓
not-connected response
```

Future:

```text
loginWithGoogle()
↓
OAuth provider flow
```

---

## 17. Image Strategy

Image folders:

```text
assets/images/
├── home/
├── properties/
├── agents/
├── auth/
└── about/
```

Maintain:

```text
docs/IMAGE_ASSET_INVENTORY.md
```

Track:

- Filename
- Page/component
- Purpose
- Alt strategy
- Aspect ratio
- Status

Meaningful images use explicit `<img>` elements.

---

## 18. Demo Dataset

A useful initial property dataset may contain approximately:

```text
12–18 properties
```

with enough diversity to test:

- Sale
- Rent
- House
- Apartment
- Townhouse
- Commercial
- Land
- Johannesburg
- Cape Town
- Pretoria
- Durban
- Different prices
- Different bedroom/bathroom counts
- Different sizes
- Different agents

Selected detailed listings may have approximately 3–6 images.

The goal is enough data for meaningful frontend behaviour without creating an asset-management
problem.

---

## 19. CSS Architecture

Foundation:

```text
tokens.css
base.css
typography.css
layout.css
utilities.css
```

Components may include:

```text
buttons.css
forms.css
navigation.css
property-card.css
agent-card.css
search.css
filters.css
pagination.css
gallery.css
dialogs.css
tables.css
status.css
dashboard.css
empty-state.css
```

Page-specific CSS should only contain page-specific composition.

A shared Property Card must not be reimplemented in multiple page stylesheets.

---

## 20. CSS Loading

A central `main.css` may import shared foundation and component styles.

Pages may additionally load page-specific CSS where needed.

This keeps HTML manageable while preserving CSS ownership.

---

## 21. JavaScript Responsibility Rule

A module should have a clear reason to change.

Examples:

```text
currency
→ currency formatting

saved-properties
→ saved-property behaviour

property-card
→ property-card rendering
```

Avoid a single enormous application script.

---

## 22. Avoid Premature Tooling

The initial LarHub implementation does not require:

- React
- TypeScript
- Redux
- Webpack
- Babel
- Large UI libraries
- Complex build tooling

Modern browsers already support ES modules.

Architecture should be learned before adding framework abstraction.

---

## 23. Local Development

Run LarHub through a local HTTP server rather than `file://`.

Windows example:

```powershell
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

This avoids ES-module limitations under direct file execution.

---

## 24. Browser Target

Modern evergreen browsers:

- Chrome
- Edge
- Firefox
- Safari

Internet Explorer compatibility is not required.

---

## 25. Documentation During Development

Maintain:

```text
docs/PROJECT_STATE.md
docs/IMAGE_ASSET_INVENTORY.md
docs/QA_CHECKLIST.md
docs/BACKEND_INTEGRATION_NOTES.md
```

### Project State

Tracks:

- Current increment/version
- Completed work
- In-progress work
- Pending work
- Known issues
- Accepted decisions

### Backend Integration Notes

Records future integration boundaries without prematurely implementing backend architecture.

Examples:

```text
Contact
→ future POST /contact

Authentication
→ login/register/OAuth/session integration

Properties
→ future property read/write endpoints
```

---

## 26. Git Strategy

Use Git from the beginning.

Prefer logical commits such as:

```text
chore: initialize larhub project
feat: build public application shell
feat: build home page
feat: add property card system
feat: build property search
```

Avoid one final `finished website` commit.

---

## 27. Technical Architecture Lock

```text
TECHNOLOGY

HTML5
CSS3
Vanilla JavaScript
ES Modules
localStorage where appropriate
No framework
No backend yet
```

```text
ARCHITECTURE

Pages
↓
Feature modules
↓
Services
↓
Demo data

Later:

Pages
↓
Feature modules
↓
Services
↓
API
↓
Backend/database
```

```text
ROUTING

Multi-page HTML
+
Query parameters
```

```text
DEVELOPMENT

Local HTTP server
Git from beginning
Incremental QA
Project-state tracking
Backend-integration notes
```
