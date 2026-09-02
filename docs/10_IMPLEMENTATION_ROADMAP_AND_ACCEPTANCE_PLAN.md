# LarHub — Implementation Roadmap and Acceptance Plan

## 1. Purpose

This document defines the planned implementation sequence after design/architecture lock.

LarHub should be implemented incrementally, with each increment reviewed and accepted before the
next major layer is added.

---

## 2. Development Cycle

For every increment:

```text
Design
↓
Implement
↓
Static / Code Review
↓
Run in Browser
↓
Inspect
↓
Repair
↓
Verify
↓
Accept
↓
Lock
↓
Next Increment
```

Do not build the entire application and postpone testing until the end.

---

## 3. Increment 0 — Foundation

Scope:

- Initial project structure
- Git-ready baseline
- Design tokens
- Base CSS
- Typography
- Containers
- Layout primitives
- Minimal utilities
- Shared JavaScript entry architecture
- Documentation structure

Internal order:

```text
0.1  Create project/file structure
0.2  Establish design tokens
0.3  Build CSS base/reset
0.4  Build typography system
0.5  Build layout/container primitives
0.6  Add minimal utilities
0.7  Establish JS module entry architecture
0.8  Establish documentation files
0.9  Run locally and verify
0.10 Review + lock Increment 0
```

Do not build page features prematurely during this increment.

---

## 4. Increment 1 — Public Shell

- Public header
- Public footer
- Desktop navigation
- Mobile navigation
- Shared buttons
- Basic responsive shell
- Keyboard/focus behaviour

---

## 5. Increment 2 — Property Data Foundation

- Demo property dataset
- Agent dataset
- Property service
- Agent service
- Currency utility
- Property Card
- Agent Card
- Initial rendering tests

---

## 6. Increment 3 — Home

- Hero
- Primary search
- Featured properties
- Buy/Rent discovery
- Popular locations
- Platform value section
- CTA
- Responsive QA

---

## 7. Increment 4 — Properties

- Search state
- URL query parameters
- Core filters
- More Filters interaction
- Sorting
- Active filter chips
- Result count
- Pagination
- Empty state
- Mobile filter drawer
- Back/refresh state verification

---

## 8. Increment 5 — Property Details

- Dynamic property loading
- Property gallery
- Key facts
- Description
- Features
- Agent panel
- Save interaction
- Similar properties
- Enquiry UI
- Request-viewing UI
- Gallery accessibility

---

## 9. Increment 6 — Agents

- Agent directory
- Search/filter
- Agent Card
- Agent profile
- Active public listings
- Pagination
- Responsive QA

---

## 10. Increment 7 — Supporting Public Pages

- About
- Contact
- Contact validation
- General public-page consistency review

---

## 11. Increment 8 — Authentication

- Login
- Register
- Forgot Password
- Google authentication UI
- Facebook authentication UI
- Apple authentication UI
- Shared validation
- Password visibility controls
- Truthful not-connected provider states
- Optional clearly labelled demo-session entry

---

## 12. Increment 9 — User Application

- User application shell
- Overview
- Saved Properties
- Recently Viewed
- Enquiries
- Profile
- Local/demo state
- Mobile navigation
- Empty states

---

## 13. Increment 10 — Agent Application

- Agent shell
- Overview
- Listings
- Lifecycle filtering
- Listing actions
- Add/Edit Property
- Conditional property fields
- Image previews
- Enquiries
- Performance
- Profile
- Responsive table/card transformation

---

## 14. Increment 11 — Admin Application

- Admin shell
- Overview
- Listing moderation
- Listing review
- Users
- Agents
- Agent review
- Reports/Moderation
- Limited Settings
- Confirmation flows
- Responsive operational UI

---

## 15. Increment 12 — Integration Polish

Review:

- Shared state consistency
- Component reuse
- Responsive behaviour
- Accessibility
- Interaction consistency
- Empty states
- Error states
- Loading states where appropriate
- Backend boundary honesty
- Status-model consistency

---

## 16. Increment 13 — Browser QA

Test:

- Desktop
- Tablet ranges
- Mobile
- Narrow mobile
- Keyboard navigation
- Forms
- Horizontal overflow
- Public navigation
- Application navigation
- Drawers
- Dialogs
- Gallery
- Filters
- Sorting
- Pagination
- Dashboard tables/cards
- Reduced motion
- Focus restoration

Screenshots showing defects should be treated as authoritative.

Repairs should be targeted and preserve already accepted work.

---

## 17. Increment 14 — Final Consolidation

- README
- Project-state document
- Image inventory
- Backend integration notes
- QA checklist
- Code review
- Dead-code removal
- Naming consistency
- Final acceptance
- Portfolio presentation

---

## 18. Hard Implementation Rules

### Scope Discipline

Build only what the current increment requires.

Do not sneak future features into foundational increments merely because they may eventually be
needed.

### Preserve Accepted Work

Once an increment is accepted, future changes should preserve it unless a genuine architecture,
UX, accessibility, or defect reason requires revision.

### Modular Code

Prefer focused modules and shared responsibilities.

Avoid:

- Giant scripts
- Repeated navigation/footer markup
- Repeated validators
- Repeated Property Card implementations
- Repeated Add/Edit forms

### Readability

Target approximately 80–100 characters per line where practical.

Split long HTML attributes across lines.

Use semantic HTML.

### JavaScript Hooks

Prefer `data-*` hooks for behaviour.

Do not couple JavaScript unnecessarily to styling class names.

### Imagery

Meaningful images must have explicit image elements and an image inventory.

CSS backgrounds are for genuinely decorative imagery.

### No Fake Functionality

Backend-dependent UI may exist now, but it must not claim that unavailable server operations
succeeded.

### Accessibility

Accessibility is part of each increment's acceptance criteria, not a final-stage add-on.

### Responsive Design

Breakpoints should be introduced when content needs them rather than by blindly targeting device
names.

---

## 19. Project Completion Definition

LarHub is frontend-complete when:

1. All planned public pages are implemented.
2. Authentication interfaces are complete, including Google/Facebook/Apple UI.
3. User, Agent, and Admin areas are navigable and visually complete.
4. Frontend-capable interactions genuinely work.
5. Backend-dependent interactions are represented honestly.
6. Property search/filter/sort/pagination work.
7. Shared data/component architecture is respected.
8. Responsive layouts are verified.
9. Keyboard and focus behaviour are verified.
10. Forms provide accessible validation.
11. Imagery is explicit and documented.
12. Browser QA is complete.
13. Documentation reflects actual implementation.
14. No known critical visual or interaction defects remain.
