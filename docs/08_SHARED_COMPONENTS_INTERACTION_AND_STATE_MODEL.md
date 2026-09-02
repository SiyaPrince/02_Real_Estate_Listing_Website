# LarHub — Shared Components, Interaction and State Model

## 1. Purpose

This document defines what should be shared across LarHub, how state should be represented, and
how common interaction patterns should behave.

The objective is to avoid discovering unnecessary duplication during implementation.

---

## 2. Frontend Layers

```text
FOUNDATION
│
├── Design tokens
├── Typography
├── Base styles
├── Layout primitives
└── Accessibility foundation

SHARED UI
│
├── Buttons
├── Forms
├── Icons
├── Badges
├── Cards
├── Overlays
└── Empty / error states

DOMAIN COMPONENTS
│
├── Property UI
├── Agent UI
├── Search UI
├── Dashboard UI
└── Authentication UI

PAGES
└── Compose shared systems
```

---

## 3. Shells

### Public Shell

```text
PublicShell
├── PublicHeader
├── MainContent
└── PublicFooter
```

Used by public marketplace pages.

### Auth Shell

```text
AuthShell
├── Brand
├── OptionalMedia
└── AuthContent
```

### User Shell

```text
UserShell
├── AppSidebar
├── AppTopbar
├── MobileAppNavigation
└── MainContent
```

### Management Shell

Agent and Admin can share the same structural application-shell system:

```text
ManagementShell
├── Sidebar
├── Topbar
├── MobileNavigation
└── MainContent
```

Navigation configuration differs by role.

---

## 4. Property Card

One shared Property Card family should be used in:

- Home
- Properties
- Agent Profile
- Saved Properties
- Recently Viewed
- Similar Properties

Structure:

```text
PropertyCard
│
├── PropertyImage
├── PublicStatus
├── SaveControl
├── Price
├── Title
├── Location
└── KeyFacts
```

Contextual variants are acceptable, but the underlying component should remain shared.

---

## 5. Agent Card

```text
AgentCard
├── Portrait
├── Name
├── Agency
├── Areas
├── ActiveListingCount
└── ProfileLink
```

---

## 6. Search State

```text
searchState
│
├── listingType
├── location
├── propertyType
├── minPrice
├── maxPrice
├── bedrooms
├── bathrooms
├── features[]
├── sort
└── page
```

Interaction:

```text
User changes filter
↓
Search state updates
↓
Results recalculate
↓
Result count changes
↓
Active chips update
↓
Pagination resets if necessary
↓
Results render
```

Search state should eventually be representable through URL query parameters.

---

## 7. Saved Property State

Concept:

```text
savedPropertyIds
├── property-001
├── property-008
└── property-014
```

Any Property Card should be able to determine whether its property is saved.

Initial implementation may use client-side/local storage.

Later implementation may use authenticated account persistence.

The UI should not require redesign.

---

## 8. Recently Viewed State

Store references/IDs rather than duplicate complete property objects.

Conceptually:

```text
recentlyViewedIds
├── property-004
├── property-001
└── property-011
```

A reasonable maximum may be applied later.

---

## 9. Property Information Model

Frontend conceptual model:

```text
Property
│
├── id
├── reference
├── title
├── listingType
├── propertyType
├── price
├── location
│   ├── suburb
│   ├── city
│   └── province
├── facts
├── description
├── features[]
├── images[]
├── agentId
├── publicStatus
├── lifecycleStatus
├── moderationStatus
└── listedDate
```

The separation between public, lifecycle, and moderation state is deliberate.

---

## 10. Agent Information Model

```text
Agent
│
├── id
├── name
├── photo
├── agency
├── biography
├── phone
├── email
├── areasServed[]
├── specialisations[]
├── accountStatus
└── publicListingIds[]
```

---

## 11. User Information Model

```text
User
│
├── id
├── name
├── email
├── phone
├── accountType
├── savedPropertyIds[]
├── recentlyViewedIds[]
└── enquiryIds[]
```

These are frontend information models, not final database schemas.

---

## 12. Forms

Shared field pattern:

```text
FormField
│
├── Label
├── Control
├── HelpText
└── ErrorMessage
```

Shared validation concerns:

- Required
- Email
- Phone
- Minimum length
- Matching passwords
- Date
- Number

Page-specific rules should build on shared validation rather than duplicate common validators.

---

## 13. Property Form

```text
PropertyForm
│
├── BasicInformationSection
├── LocationSection
├── PropertyDetailsSection
├── FeaturesSection
├── DescriptionSection
├── PropertyImagesSection
└── ListingSettingsSection
```

Modes:

```text
Create
Edit
```

Avoid two unrelated implementations of the same form.

---

## 14. Data Table

```text
DataTable
│
├── TableHeader
├── TableRows
├── StatusBadge
├── RowActions
├── EmptyState
└── Pagination
```

Potential use:

- Agent Listings
- Agent Enquiries
- Admin Listings
- Admin Users
- Admin Agents
- Admin Reports

Columns vary while interaction language remains consistent.

---

## 15. Empty State

Shared pattern:

```text
EmptyState
├── Heading
├── Explanation
└── OptionalAction
```

Examples:

```text
No properties found
[ Clear Filters ]
```

```text
No saved properties
[ Browse Properties ]
```

```text
No pending reviews
```

---

## 16. Status Badge

One reusable status system.

Potential semantic variants:

- Neutral
- Information
- Success
- Warning
- Error

The visible text communicates meaning.

---

## 17. Overlay Types

### Dialog / Modal

Use for blocking decisions:

- Delete listing
- Reject listing
- Confirm action

### Drawer

Use for contextual tools:

- Mobile navigation
- Mobile property filters

### Lightbox

Use for:

- Property photography

Do not use modals for every interaction.

---

## 18. Overlay Behaviour

Blocking overlays should follow:

```text
Open
↓
Remember previous focus
↓
Move focus inside
↓
Manage/trap focus where appropriate
↓
Escape closes
↓
Restore previous focus
```

---

## 19. Feedback Model

Shared feedback states:

- Information
- Success
- Warning
- Error

Examples:

Information:

```text
Google authentication is not connected
in this frontend build.
```

Validation error:

```text
Enter a valid email address.
```

Backend success messages such as:

```text
Listing submitted for review.
```

should only appear when the operation actually succeeds.

---

## 20. Shared Component Inventory

### Foundation

- Container
- Section
- Stack
- Inline/cluster layout
- Visually-hidden utility

### Navigation

- PublicHeader
- PublicFooter
- MobileNavigation
- ApplicationSidebar
- ApplicationTopbar

### Controls

- Button
- IconButton
- TextLink
- Input
- Select
- Checkbox
- Radio
- Textarea
- SearchField

### Marketplace

- SearchBar
- FilterPanel
- FilterChip
- SortControl
- PropertyCard
- PropertyGrid
- PropertyGallery
- KeyFacts
- FeatureList
- AgentCard
- AgentContactPanel
- Pagination

### Forms

- FormField
- FormGroup
- FormStatus
- PasswordField
- SocialAuthGroup

### Application

- StatCard
- DataTable
- MobileRecordCard
- StatusBadge
- EmptyState
- ActionMenu

### Overlays

- Dialog
- Drawer
- Lightbox
- ConfirmationDialog

---

## 21. Do Not Over-Abstract

Do not create components merely because something exists.

Avoid unnecessary abstraction for:

- Every heading
- Every paragraph
- Every wrapper
- Every tiny icon
- Every one-off section

Test:

> Does this represent genuinely shared responsibility?

---

## 22. Interaction Ownership

Conceptual JavaScript responsibilities:

```text
navigation
→ public/mobile navigation

search
→ search state

filters
→ filter controls

properties
→ property rendering

saved
→ saved-property state

gallery
→ property gallery

forms
→ shared validation

auth
→ authentication UI behaviour

property-form
→ agent property form

tables
→ management-table behaviour

dialogs
→ shared dialog patterns
```

Exact filenames may evolve, but responsibility boundaries should remain focused.

---

## 23. Architecture Lock

Shared systems to preserve during implementation:

```text
4 MAIN SHELL TYPES

Public
Auth
User
Management


SHARED PROPERTY SYSTEM

One Property Card family
One property information model
One gallery system
One saved-state system


SHARED FORM SYSTEM

Common fields
Common validation
Page-specific rules


SHARED DASHBOARD SYSTEM

Application shell
Tables
Stat cards
Status badges
Mobile records


SHARED OVERLAY SYSTEM

Navigation drawers
Filter drawers
Dialogs
Lightbox
```
