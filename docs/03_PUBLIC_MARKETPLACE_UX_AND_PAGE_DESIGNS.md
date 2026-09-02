# LarHub — Public Marketplace UX and Page Designs

## 1. Purpose

This document defines the page responsibilities, information hierarchy, wireframe-level
structure, responsive behaviour, and major interactions for LarHub's public marketplace.

---

# 2. Shared Public Navigation

```text
LarHub

Buy
Rent
Agents
About
Contact

Sign In
```

`Buy` and `Rent` are pre-filtered entry points into the shared Properties experience rather
than separate duplicated property systems.

Conceptually:

```text
Buy
↓
Properties
listingType = sale
```

```text
Rent
↓
Properties
listingType = rent
```

---

# 3. Shared Public Footer

```text
LARHUB
Find property with clarity.

EXPLORE
Buy
Rent
Agents
Properties

COMPANY
About
Contact

ACCOUNT
Sign In
Register

© 2026 LarHub
Privacy
Terms
```

The footer should remain useful and restrained rather than becoming a massive site map.

---

# 4. Home

## Responsibility

Introduce LarHub, establish trust, and move users quickly into property discovery.

## Structure

```text
HOME
│
├── Public Header
├── Hero + Primary Search
├── Featured Properties
├── Buy / Rent Discovery
├── Popular Locations
├── Platform Value
├── Browse CTA
└── Public Footer
```

## Hero

Candidate copy:

```text
PROPERTY DISCOVERY, SIMPLIFIED

Find a place that feels like yours.

Discover homes, rentals and commercial
property across South Africa.
```

Primary search:

```text
[ Buy / Rent ]
[ Location ]
[ Property Type ]
[ Search ]
```

Desktop may use a split composition with a meaningful property image.

Mobile stacks the content and search.

No forced horizontal carousel is required on mobile.

## Featured Properties

Small curated set:

```text
Desktop    3
Tablet     2
Mobile     1 stacked
```

Reuse the shared Property Card.

## Buy / Rent Discovery

These are navigation/discovery cards, not property listing cards.

## Popular Locations

Initial locations:

- Johannesburg
- Cape Town
- Pretoria
- Durban

Each links into a filtered Properties state.

## Platform Value

Candidate:

```text
Property discovery made clearer.

Search clearly
Compare quickly
Connect confidently
```

Avoid fake market leadership statistics.

## CTA

```text
Ready to start your search?

[ Browse Properties ]
```

---

# 5. Properties

## Responsibility

Help users find properties matching their needs.

## Desktop Structure

```text
PUBLIC HEADER

Compact Search

Properties for sale in Johannesburg

128 properties                       Sort ▼

[ House × ] [ 3+ Bedrooms × ] [ Under R3m × ]
Clear all

┌──────────────┬──────────────────────────────────────────┐
│ FILTERS      │ PROPERTY GRID                            │
│              │                                          │
│ Listing Type │ [CARD] [CARD] [CARD]                    │
│ Type         │                                          │
│ Price        │ [CARD] [CARD] [CARD]                    │
│ Bedrooms     │                                          │
│ Bathrooms    │ ...                                      │
│              │                                          │
│ More Filters │                                          │
└──────────────┴──────────────────────────────────────────┘

Showing 1–12 of 128 properties

Pagination

PUBLIC FOOTER
```

## Core Filters

Visible:

- Listing type
- Property type
- Location
- Minimum price
- Maximum price
- Bedrooms
- Bathrooms

`More Filters` may contain:

- Floor area
- Parking
- Pool
- Garden
- Garage
- Security
- Solar
- Balcony
- Other relevant features

Use minimum/maximum price inputs rather than a slider-only interaction.

## Filter Logic

Across categories:

```text
AND
```

Within multi-select categories:

```text
OR
```

Example:

```text
Johannesburg
AND
(House OR Townhouse)
AND
3+ Bedrooms
```

## Sorting

- Most relevant
- Price: low to high
- Price: high to low
- Newest

## Active Filters

Filters should appear as removable chips.

Users can:

- Remove one filter
- Clear all filters

## Pagination

Traditional pagination is preferred.

Example:

```text
Showing 1–12 of 128 properties
```

## Empty State

```text
No properties match your filters.

Try adjusting your search or clearing
some filters.

[ Clear Filters ]
```

## Responsive Behaviour

Tablet:

- Sidebar disappears
- Dedicated Filters control
- Two-column property grid

Mobile:

- One-column grid
- Filter drawer
- Sort control
- Compact search summary

Filter drawer behaviour:

```text
Open
↓
Save previous focus
↓
Move focus inside
↓
Manage focus while open
↓
Escape closes
↓
Restore focus
```

---

# 6. Property Details

## Responsibility

Help a user evaluate one property and decide whether to contact the agent.

## Structure

```text
Breadcrumb

Property Gallery

Status
Title
Location
Price

Key Facts

Description

Features

Agent

Enquiry / Request Viewing

Location Context

Similar Properties

Public Footer
```

## Gallery

Desktop:

```text
┌─────────────────────┬─────────────┐
│                     │ Image 2     │
│     Main Image      ├─────────────┤
│                     │ Image 3     │
└─────────────────────┴─────────────┘

[ View all 12 photos ]
```

Full gallery supports:

- Previous
- Next
- Close
- Image count
- Keyboard arrows
- Escape
- Focus management

Mobile:

- One prominent image
- Image count
- Swipe/navigation controls as appropriate

## Key Facts

Facts adapt to property type.

Residential:

- Bedrooms
- Bathrooms
- Parking
- Floor area
- Land area where relevant

Commercial:

- Floor area
- Parking
- Commercial subtype
- Other relevant commercial facts

Land:

- Land area
- Zoning/type
- Relevant land facts

## Agent Panel

Desktop may use a sticky panel within its section.

Mobile uses a compact composition.

Potential actions:

- View Agent
- Call
- Email
- Enquire
- Request Viewing

## Enquiry Form

Fields:

- Property reference
- Name
- Email
- Phone
- Message

## Request Viewing

Fields:

- Name
- Email
- Phone
- Preferred date
- Preferred time
- Message

Until a backend exists, submission must not claim the enquiry/viewing request was delivered.

## Location

Textual location context is acceptable.

Do not insert a fake map image merely to imitate a map integration.

## Similar Properties

Reuse shared Property Card.

## Property Reference

Example:

```text
LH-1024
```

---

# 7. Agents

## Responsibility

Help users discover property professionals.

## Search

Search criteria:

- Agent name
- Area
- Agency

Specialisation may be added later if useful.

## Agent Card

```text
[ Portrait ]

Nomsa Dlamini
Example Property Group

Rosebank · Sandton · Parktown

18 active listings

[ View Profile ]
```

The listing count must include only active public listings.

It must exclude:

- Draft
- Pending
- Sold
- Rented
- Archived
- Removed
- Other internal-only states

## Layout

Desktop/tablet may use a grid.

Mobile uses one-column cards.

Pagination is preferred for larger result sets.

---

# 8. Agent Profile

## Responsibility

Help users evaluate an agent and browse their active public listings.

## Structure

```text
Agent Identity
├── Photo
├── Name
├── Agency / role
├── Areas served
├── Specialisation
└── Contact actions

Biography

Active Listings
└── Shared Property Cards
```

Public agent profile data must remain distinct from internal agent-dashboard data.

Sold/rented history is not included by default.

---

# 9. About

## Responsibility

Explain what LarHub does, who it serves, and how property discovery works.

## Candidate Hero

```text
Property discovery built around clarity.
```

## Structure

```text
Intro

What LarHub Does
├── Discover
├── Refine
├── Explore
└── Connect

Who LarHub Serves
├── Property seekers
├── Property agents
└── Platform administrators

How Discovery Works

Platform Principles
├── Clarity
├── Discovery
├── Transparency
└── Accessibility

CTA

Footer
```

Avoid:

- Fake company history
- Fake awards
- Fake scale statistics
- Generic corporate values sections

Imagery should be minimal and meaningful.

---

# 10. Contact

## Responsibility

Handle general LarHub enquiries.

Property-specific enquiries belong on Property Details.

Agent-specific questions belong on Agent Profile.

## Structure

```text
Intro

Contact Details

General Contact Form

Support / Enquiry Guidance

Footer
```

## Form

Fields:

- Name
- Email
- Subject
- Message

Possible subjects:

- General enquiry
- Technical support
- Agent enquiry
- Listing question
- Other

## Guidance

```text
Property enquiry
→ relevant property / agent

Agent question
→ agent profile

General LarHub question
→ contact form
```

No fake "message sent" success without backend delivery.

---

# 11. Public Accessibility Requirements

- Semantic header/nav/main/footer landmarks
- Logical heading hierarchy
- Keyboard-operable navigation
- Visible focus
- Meaningful image alt text
- Decorative imagery treated appropriately
- Form labels
- Associated validation errors
- `aria-invalid`/descriptions where useful
- Focus first invalid field after failed submission
- Accessible filter drawer
- Accessible gallery/lightbox
- Status not communicated through colour alone
- Reduced-motion support

---

# 12. Public Marketplace Acceptance Summary

A user should be able to:

1. Understand what LarHub offers.
2. Search by buy/rent, location, and property type.
3. Refine results.
4. Sort results.
5. Remove active filters.
6. Paginate.
7. Open a property.
8. Explore its gallery and details.
9. Understand relevant property facts.
10. Save a property at frontend level.
11. Discover agents.
12. Open agent profiles.
13. Access enquiry interfaces.
14. Navigate on mobile.
15. Use core interactions by keyboard.
16. Clearly distinguish working frontend behaviour from backend-dependent behaviour.
