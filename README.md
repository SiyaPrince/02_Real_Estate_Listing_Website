# LarHub

LarHub is a real estate listing platform currently being implemented as a modular
HTML, CSS, and vanilla JavaScript frontend.

## Current State

The project is currently at:

**Increment 0.1 — Project Structure**

Only the structural project skeleton has been created.

No page designs, property data, search logic, authentication logic, dashboards,
or design-system styling have been implemented yet.

## Development

LarHub should be served through a local HTTP server.

```powershell
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Documentation

See the `/docs` directory for implementation-state and downstream notes.

## Design Tokens

The shared LarHub design-token layer is defined in:

```text
css/tokens.css
```

The tokens cover brand colours, typography references, spacing, containers,
radii, shadows, control sizing, motion, layering, and breakpoint references.

Component styling has not yet been implemented.

## CSS Foundation

LarHub now includes:

```text
css/tokens.css
css/base.css
```

`tokens.css` defines shared design values.

`base.css` establishes predictable browser defaults, responsive media behaviour,
form-control inheritance, focus visibility, and reduced-motion handling.

Typography hierarchy, layout primitives, components, and page styling are still pending.

## Typography System

LarHub now includes a shared typography layer in:

```text
css/typography.css
```

It defines the heading hierarchy, fluid display/H1/H2 sizing, body text roles,
labels, eyebrow text, property-price treatments, text colours, readable measure,
and number-alignment helpers.

Layout primitives, shared components, and page styling are still pending.

## Layout Foundation

The shared structural layout layer is defined in:

```text
css/layout.css
```

It provides responsive containers, section rhythm, flow/stack/cluster patterns,
generic grids, split layouts, application shells, and intrinsic media wrappers.

## Utility Layer

The shared utility layer is defined in:

```text
css/utilities.css
```

It provides a deliberately small set of accessibility, display, alignment,
spacing, width, overflow, surface, border, radius, and responsive-visibility
helpers.

LarHub avoids turning utilities into a replacement for meaningful component CSS.

## JavaScript Foundation

LarHub now has an ES-module application entry point:

```text
js/main.js
```

Shared DOM-ready and selector helpers live in:

```text
js/utils/dom.js
```

A minimal URL-query helper lives in:

```text
js/utils/url.js
```

Feature logic remains intentionally deferred.

## Project Documentation Discipline

LarHub maintains implementation state and downstream decisions in:

```text
docs/PROJECT_STATE.md
docs/QA_CHECKLIST.md
docs/IMAGE_ASSET_INVENTORY.md
docs/BACKEND_INTEGRATION_NOTES.md
docs/DECISIONS.md
```

These documents should be updated deliberately as increments are accepted.

`PROJECT_STATE.md` is the implementation-status source of truth.

`DECISIONS.md` records important locked architectural/product decisions rather
than conversation history.

## Foundation Verification

Increment 0.9 verified the current foundation through a local HTTP server.

Verified:

- Public/auth/application route availability
- Shared CSS resources
- JavaScript resources and syntax
- Local HTML/CSS/JS reference integrity
- Basic overflow-risk patterns

The detailed report is available at:

```text
docs/FOUNDATION_VERIFICATION.md
```

Full visual multi-viewport QA remains scheduled for later once implemented UI exists.

## Foundation Status

LarHub Foundation Increments **0.1–0.10 are complete and locked**.

The accepted shared foundation consists of:

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

See:

```text
docs/FOUNDATION_LOCK.md
```

for the final foundation review.

The next development phase is **Increment 1 — Public Shell**.

## Public Shell

LarHub now includes one reusable public shell across all public pages.

Implemented:

- Shared header
- Desktop navigation
- Mobile hamburger navigation
- Active navigation state
- Skip link
- Shared buttons
- Shared footer

Primary implementation files:

```text
css/components/buttons.css
css/components/navigation.css
css/components/footer.css

js/components/public-header.js
js/components/public-footer.js
js/features/navigation.js
```


## Property Data Foundation

Demo data and service boundaries now exist for properties and agents.

Primary files:

```text
js/data/properties.js
js/data/agents.js
js/services/property-service.js
js/services/agent-service.js
js/utils/currency.js
js/components/property-card.js
js/components/agent-card.js
css/components/property-card.css
css/components/agent-card.css
```

Public property retrieval excludes Sold, Rented, Draft, and other management-only records.


## Home Page

LarHub Home now includes:

- Responsive hero
- Primary property search
- Featured Property Cards
- Buy/Rent discovery
- Popular South African locations
- Concise platform value section
- Browse Properties CTA

The Home search passes its state into the future Properties experience using query parameters.

The current hero asset is a temporary structural placeholder and is explicitly referenced through an `<img>` element.


## Properties Marketplace

The public Properties page now supports:

- URL-backed search state
- Buy/Rent filtering
- Location filtering
- Property Type filtering
- Price filtering
- Bedroom/bathroom filtering
- Feature filtering
- Sorting
- Active filter chips
- Result counts
- Pagination
- Empty states
- Responsive mobile filter drawer

The marketplace continues to use only public-property records from the Property Service.


## Property Details

The Property Details experience now supports:

- Dynamic `?id=` loading
- Public-property eligibility checks
- Multi-image gallery/lightbox
- Property facts
- Description/features
- Agent contact panel
- Saved properties through `localStorage`
- Enquiry UI
- Request-viewing UI
- Similar properties
- Honest frontend-only messaging for backend-dependent actions


## Agents

LarHub now includes a public agent directory and agent profile experience.

Directory search supports:

- Agent name
- Agency
- Area served

Agent profiles load through:

```text
agent.html?id=agent-001
```

Public active listing counts are derived from public property data, so Sold, Rented, Draft,
and other management-only listings are not included.


## Supporting Public Pages

LarHub now includes completed public About and Contact interfaces.

About covers:

- Marketplace purpose
- Discovery process
- User groups
- Platform principles
- Current frontend-only project stage

Contact includes:

- General-enquiry guidance
- Accessible client-side validation
- Inline errors
- First-invalid-field focus
- Honest frontend-only result messaging

The form does not claim a message was delivered because no backend is connected yet.


## Authentication UI

LarHub now includes frontend-only authentication interfaces for:

- Login
- Registration
- Forgot Password
- Google
- Facebook
- Apple

The UI validates locally but never claims that authentication, account creation,
password reset delivery, or provider OAuth succeeded.

A separate Demo Access mode allows User, Agent, and Admin application areas to be previewed
without pretending a real authenticated session exists.


## User Application

LarHub now includes a complete frontend User workspace:

- Overview
- Saved Properties
- Recently Viewed
- Enquiries
- Profile

The workspace reuses the shared Property Card and Property Service and uses browser-local
demonstration persistence.

Important local keys:

```text
larhub.savedProperties
larhub.recentlyViewed
larhub.demoEnquiries
larhub.demoUserProfile
```

Local enquiry/viewing records are explicitly not delivered or scheduled.


## Agent Application

LarHub now includes a complete frontend Agent workspace:

- Overview
- My Listings
- Add/Edit Property
- Listing lifecycle management
- Enquiries
- Performance
- Profile settings

Management lifecycle includes:

```text
Draft
Published
Under Offer
Sold
Rented
```

Sold and Rented remain management-only states.

Agent workspace edits are stored locally under:

```text
larhub.demoAgentListings
larhub.demoAgentProfile
```

They do not mutate the static public marketplace dataset or claim backend persistence.


## Admin Application

LarHub now includes a complete frontend Admin workspace:

- Overview
- Property moderation
- Agent management
- User management
- Marketplace activity
- Settings

Admin state is browser-local only.

Primary local keys:

```text
larhub.demoAdminPropertyState
larhub.demoAdminAgentState
larhub.demoAdminUsers
larhub.demoAdminSettings
```

The Admin workspace does not mutate the static public datasets or claim that production
moderation/configuration has occurred.
