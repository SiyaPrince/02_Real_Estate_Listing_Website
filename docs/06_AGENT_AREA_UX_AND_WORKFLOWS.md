# LarHub — Agent Area UX and Workflows

## 1. Purpose

The Agent Area helps property agents manage listings, enquiries, performance information, and
their public-facing profile.

Core responsibility:

> Help agents manage the lifecycle of their listings and the interest those listings generate.

---

## 2. Agent Area Structure

```text
AGENT AREA
│
├── Overview
├── Listings
│   ├── All
│   ├── Draft
│   ├── Pending Review
│   ├── Published
│   ├── Under Offer
│   ├── Sold
│   ├── Rented
│   └── Archived
├── Add Property
├── Edit Property
├── Enquiries
├── Performance
└── Profile
```

Sold and Rented belong here, not in active public discovery.

---

## 3. Agent Dashboard

Desktop concept:

```text
┌───────────────┬──────────────────────────────────────────┐
│ LarHub        │ Good afternoon                           │
│               │                                          │
│ Overview      │ Here's what's happening with your       │
│ Listings      │ property portfolio.                     │
│ Add Property  │                                          │
│ Enquiries     │ [ Active ] [ Enquiries ] [ Views ]     │
│ Performance   │                                          │
│ Profile       │ Recent Listings                         │
│               │                                          │
│               │ Recent Enquiries                        │
└───────────────┴──────────────────────────────────────────┘
```

Useful summary metrics:

- Active listings
- Pending review
- Enquiries
- Listing views

Potential internal metrics:

- Sold this month
- Rented this month

---

## 4. Listings Workspace

```text
MY LISTINGS

[ Add Property ]

All
Published
Draft
Pending
Under Offer
Sold
Rented
Archived

Search listings...

PROPERTY              PRICE       STATUS         ACTIONS

Rosebank Family Home  R2.45m      Published      •••
Sandton Apartment     R18,500/m   Draft          •••
Midrand Townhouse     R1.85m      Under Offer    •••
```

Status tabs are filtered views of one workspace, not separate duplicated pages.

---

## 5. Listing Lifecycle

```text
Draft
↓
Submit for Review
↓
Pending Review
↓
Approved
↓
Published
↓
Under Offer
↓
Sold / Rented
↓
Archived
```

Rejected path:

```text
Pending Review
↓
Rejected
↓
Correction / Draft
```

Frontend demo state may simulate these transitions, but must not claim persistent backend
changes.

---

## 6. Contextual Listing Actions

Potential actions:

- View
- Edit
- Duplicate
- Mark Under Offer
- Mark Sold / Rented
- Archive
- Delete

Actions must depend on the listing's current state.

Example:

A Draft should not expose nonsensical lifecycle actions such as `Mark Sold`.

---

## 7. Destructive Actions

Delete should require deliberate confirmation.

```text
Delete this listing?

This action would permanently remove the
listing in a connected production system.

[ Cancel ] [ Delete Listing ]
```

In the frontend-only build, demo records may be removed from client-side state if useful, but
the behaviour must be documented as demonstration state.

---

## 8. Mobile Listings

Desktop:

```text
Semantic table
```

Mobile:

```text
┌────────────────────────────┐
│ Rosebank Family Home       │
│                            │
│ R2 450 000                 │
│ Published                  │
│ 8 enquiries                │
│                            │
│ [ Edit ]          [ ••• ]  │
└────────────────────────────┘
```

Do not shrink complex tables into unreadable mobile grids.

---

## 9. Add / Edit Property Form

Use one shared form architecture in create/edit modes.

```text
PROPERTY FORM
│
├── Basic Information
├── Location
├── Property Details
├── Features
├── Description
├── Images
└── Listing Settings
```

A sectioned single-page form is preferred initially unless browser testing proves that a
multi-step experience would be materially better.

---

## 10. Basic Information

Fields:

- Property title
- Listing type
  - For Sale
  - To Rent
- Property type
- Price
- Property reference

The reference may be auto-generated later.

Agents should not freely select internal moderation outcomes such as Approved or Rejected.

---

## 11. Location

Fields:

- Province
- City
- Suburb
- Street address
- Postal code

Latitude/longitude may be added later if map/geospatial integration requires them.

---

## 12. Property Details

Residential example:

- Bedrooms
- Bathrooms
- Parking
- Floor area
- Land size

The form should adapt based on property type.

### Example

House:

```text
Bedrooms
Bathrooms
Parking
Floor Area
Land Size
```

Commercial:

```text
Floor Area
Parking
Commercial Subtype
Backup Power
```

Land:

```text
Land Size
Zoning
```

Do not show irrelevant fields merely because they exist in another property category.

---

## 13. Features

Potential residential feature set:

- Swimming pool
- Garden
- Garage
- Security
- Solar
- Balcony
- Fireplace
- Fibre
- Pet friendly

Commercial property may use different feature groups.

---

## 14. Description

Use a standard textarea.

Potential guidance:

```text
0 / 2,000
```

Do not introduce a rich text editor unless a genuine content requirement emerges.

---

## 15. Property Images

Concept:

```text
PROPERTY IMAGES

[ + Add Images ]

┌──────────┐ ┌──────────┐ ┌──────────┐
│ IMAGE 1  │ │ IMAGE 2  │ │ IMAGE 3  │
│ PRIMARY  │ │          │ │          │
│ Remove   │ │ Remove   │ │ Remove   │
└──────────┘ └──────────┘ └──────────┘
```

Frontend can genuinely support:

- File selection
- Preview
- File-type validation
- File-size validation
- File-count validation
- Primary-image selection
- Potential reordering

Without a backend/storage provider, do not claim images were uploaded persistently.

---

## 16. Listing Settings

Creation should primarily offer:

```text
○ Save as Draft
○ Submit for Review
```

Agents should not select arbitrary outcomes such as:

- Published
- Sold
- Rejected

during initial creation.

---

## 17. Enquiries

Desktop:

```text
ENQUIRIES

Search...

Property           Enquirer      Date       Status

Rosebank Home      Jane Doe      02 Sep     New
Sandton Apartment  John Smith    01 Sep     Viewed
Midrand Home       S. Mokoena    31 Aug     Responded
```

Enquiry detail:

```text
Jane Doe

Property:
Modern Family Home
REF: LH-1024

Email
Phone

Message:
"I'm interested in arranging..."

[ View Property ]
```

Potential future internal statuses:

- New
- Viewed
- Responded
- Closed

These are management states, not necessarily public seeker-facing status claims.

---

## 18. Performance

Keep analytics useful and restrained.

Potential metrics:

- Listing views
- Saved count
- Enquiries
- Most viewed listings

Example:

```text
PERFORMANCE

This Month

Views
1,248

Enquiries
36

Saves
92

Top Listings

1. Rosebank Family Home      324 views
2. Sandton Apartment         279 views
3. Midrand Townhouse         188 views
```

Charts may be added only when they communicate meaningful trends.

Avoid dashboard decoration for its own sake.

---

## 19. Agent Profile Management

Fields:

- Profile photo
- Full name
- Agency
- Biography
- Phone
- Email
- Areas served
- Specialisation

Conceptual relationship:

```text
Agent Dashboard Profile
↓
eventually updates
↓
Public Agent Profile
```

The management form should align with the public profile model.

---

## 20. Agent Navigation

```text
Overview
Listings
Add Property
Enquiries
Performance
Profile

──────────────

Back to Marketplace
Sign Out
```

Desktop uses a sidebar.

Mobile uses an accessible drawer/menu.

---

## 21. Frontend Behaviour That Can Be Real

- Form validation
- Conditional fields
- Image previews
- Image reordering UI
- Demo listing filtering
- Sorting
- Status filtering
- Confirmation dialogs
- Responsive tables/cards
- Demo state transitions

Backend-dependent:

- Persistent listing creation
- Real image upload/storage
- Real moderation
- Real analytics
- Real enquiry delivery
- Persistent status changes
- Real agent authentication

---

## 22. Accessibility

- Keyboard-accessible sidebar/mobile navigation
- Current page indicated
- Semantic tables
- Mobile record labels retained
- Fieldsets/legends where appropriate
- Keyboard-operable image controls
- Status text not colour-only
- Confirmation dialogs manage focus
- Validation errors associated with fields
- Mobile menu restores focus

---

## 23. Acceptance Criteria

An agent should be able to:

1. Understand portfolio status.
2. Browse demo listings.
3. Filter by lifecycle status.
4. Open contextual listing actions.
5. Access Add Property.
6. Complete and validate property fields.
7. Preview selected images.
8. Access edit-mode UI.
9. Inspect enquiry records.
10. View demo performance metrics.
11. Edit profile UI.
12. Navigate comfortably on mobile.
13. Understand which actions are demonstrations.
14. Access major functionality with a keyboard.
