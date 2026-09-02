# LarHub Design Documentation

This folder contains the locked pre-implementation design and architecture decisions for the
LarHub real estate listing platform.

The documents are intentionally separated by relevance and responsibility so that downstream
implementation work can reference the correct source without searching through one enormous
planning document.

## Documents

### 01 — Project Scope and Product Architecture

`01_PROJECT_SCOPE_AND_PRODUCT_ARCHITECTURE.md`

Use this when deciding:

- What LarHub is
- Which product areas exist
- Which pages are in scope
- Who each area serves
- What belongs in frontend scope
- What requires a backend
- Which status models exist

### 02 — Design System and Visual Direction

`02_DESIGN_SYSTEM_AND_VISUAL_DIRECTION.md`

Use this for:

- Brand personality
- Colour tokens
- Typography
- Spacing
- Containers
- Grid
- Responsive ranges
- Buttons/forms
- Imagery
- Motion
- Accessibility-oriented visual rules

### 03 — Public Marketplace UX and Page Designs

`03_PUBLIC_MARKETPLACE_UX_AND_PAGE_DESIGNS.md`

Use this when building:

- Home
- Properties
- Property Details
- Agents
- Agent Profile
- About
- Contact
- Public navigation/footer

### 04 — Authentication UX Design

`04_AUTHENTICATION_UX_DESIGN.md`

Use this when building:

- Login
- Register
- Forgot Password
- Google/Facebook/Apple authentication UI
- Authentication validation
- Demo/not-connected states

### 05 — User Area UX Design

`05_USER_AREA_UX_DESIGN.md`

Use this when building:

- User dashboard
- Saved Properties
- Enquiries
- Recently Viewed
- Profile

### 06 — Agent Area UX and Workflows

`06_AGENT_AREA_UX_AND_WORKFLOWS.md`

Use this when building:

- Agent dashboard
- Listing management
- Property form
- Agent enquiries
- Performance
- Agent profile management
- Agent lifecycle UI

### 07 — Admin Area UX and Moderation

`07_ADMIN_AREA_UX_AND_MODERATION.md`

Use this when building:

- Admin dashboard
- Listing moderation
- Users
- Agent approval
- Reports
- Admin settings
- Moderation states/workflows

### 08 — Shared Components, Interaction and State Model

`08_SHARED_COMPONENTS_INTERACTION_AND_STATE_MODEL.md`

Use this for:

- Shared shells
- Property Card
- Agent Card
- Search state
- Saved/recent state
- Forms
- Tables
- Status badges
- Empty states
- Drawers/dialogs/lightboxes
- Shared component ownership

### 09 — Technical Architecture and Project Structure

`09_TECHNICAL_ARCHITECTURE_AND_PROJECT_STRUCTURE.md`

Use this when deciding:

- HTML/CSS/JavaScript architecture
- File/folder structure
- Services/data/pages separation
- Query-parameter routing
- localStorage
- Rendering strategy
- CSS/JS module ownership
- Local development
- Git/documentation strategy

### 10 — Implementation Roadmap and Acceptance Plan

`10_IMPLEMENTATION_ROADMAP_AND_ACCEPTANCE_PLAN.md`

Use this to control:

- Increment order
- Scope of each increment
- QA
- Acceptance
- Final consolidation

## Authority

These documents capture the agreed LarHub design state immediately before implementation.

If implementation exposes a genuine missing requirement or defect, update the relevant design
document deliberately rather than silently diverging from it.
