# LarHub — Admin Area UX and Moderation

## 1. Purpose

The Admin Area is the operational control centre of LarHub.

Agent responsibility:

> Manage my business and listings.

Admin responsibility:

> Manage the marketplace itself.

Admin UI should prioritize operational clarity and data density rather than marketing-style
presentation.

---

## 2. Admin Structure

```text
ADMIN AREA
│
├── Overview
├── Listings
│   ├── All
│   ├── Pending Review
│   ├── Approved
│   ├── Rejected
│   ├── Flagged
│   └── Removed
├── Users
├── Agents
├── Reports / Moderation
└── Settings
```

Settings should remain intentionally limited until real platform requirements justify expansion.

---

## 3. Admin Dashboard

Concept:

```text
┌───────────────┬──────────────────────────────────────────┐
│ LarHub Admin  │ Platform Overview                        │
│               │                                          │
│ Overview      │ Monitor marketplace activity and        │
│ Listings      │ review items requiring attention.       │
│ Users         │                                          │
│ Agents        │ [ Listings ] [ Agents ] [ Pending ]    │
│ Moderation    │                                          │
│ Settings      │ Pending Reviews                         │
│               │                                          │
│               │ Recent Reports                          │
└───────────────┴──────────────────────────────────────────┘
```

Priority overview metrics:

- Total listings
- Pending review
- Registered agents
- Open reports

Additional metrics may include:

- Published listings
- Users

Do not overcrowd the first viewport with stat cards.

---

## 4. Pending Reviews

High-priority admin task:

```text
PENDING LISTING REVIEWS

Property                 Agent            Submitted        Action

Rosebank Family Home     Nomsa Dlamini    2 Sep            Review
Sandton Apartment        Thabo Molefe     2 Sep            Review
Midrand Townhouse        Lerato Mokoena   1 Sep            Review
```

Admins should be able to move quickly from overview into a review workflow.

---

## 5. Listings Moderation

```text
LISTINGS

[ Search listings ]

All
Pending
Approved
Rejected
Flagged
Removed

PROPERTY          AGENT         STATUS          UPDATED       ACTIONS

Rosebank Home     N. Dlamini    Approved        Today         •••
Sandton Apt       T. Molefe     Pending         Today         •••
Midrand Home      L. Mokoena    Flagged         Yesterday     •••
```

---

## 6. Status Separation

Public:

```text
For Sale
To Rent
New
Under Offer
```

Agent lifecycle:

```text
Draft
Pending Review
Published
Under Offer
Sold
Rented
Archived
```

Admin moderation:

```text
Pending Review
Approved
Rejected
Flagged
Removed
```

These should remain distinct concepts in the UI and future data model.

---

## 7. Listing Review

```text
LISTING REVIEW

Modern Family Home in Rosebank
REF: LH-1024

Submitted by:
Nomsa Dlamini

Property Images
[ IMAGE ] [ IMAGE ] [ IMAGE ]

Basic Information
Price
Location
Property Type
Key Facts

Description

Features

Review Decision

[ Approve Listing ]
[ Reject ]
[ Flag for Further Review ]
```

The administrator should have enough context on one review screen to make a decision.

---

## 8. Rejection

Rejecting requires a reason.

```text
Reject Listing

Reason
[ Select reason ▼ ]

Additional notes
[                         ]

[ Cancel ] [ Reject Listing ]
```

Potential reasons:

- Incomplete information
- Misleading description
- Incorrect property details
- Poor / invalid images
- Duplicate listing
- Policy violation
- Other

This creates a useful future moderation model.

---

## 9. Approval

```text
Approve this listing?

The property will become eligible
for publication on LarHub.

[ Cancel ] [ Approve Listing ]
```

Frontend-only state must not imply persistent approval.

---

## 10. Flagging

Flagging does not automatically mean removal.

Potential reasons:

- Further investigation
- Potential duplication
- Suspicious agent activity
- Reported content
- Incorrect details

Flagged items need review context.

---

## 11. Users

```text
USERS

Search user...

NAME            EMAIL                 TYPE      STATUS      JOINED

Jane Doe        jane@example.com      Seeker    Active      12 Aug
John Smith      john@example.com      Seeker    Active      10 Aug
```

Potential actions:

- View
- Suspend
- Reactivate

User deletion should not be the default management action.

Potential internal states:

- Active
- Suspended
- Disabled

---

## 12. Agents

```text
AGENTS

NAME             AGENCY        STATUS        LISTINGS      ACTIONS

Nomsa Dlamini    Example Co    Approved      18            •••
Thabo Molefe     PropertyCo    Pending       —             Review
Lerato Mokoena   HomeWorks     Suspended     7             •••
```

Agent management states:

- Pending Approval
- Approved
- Rejected
- Suspended

---

## 13. Agent Application Review

```text
AGENT APPLICATION

Nomsa Dlamini

Email
Phone
Agency
Areas served
Professional information

[ Approve Agent ]
[ Reject Application ]
```

Do not invent regulatory documents or verification requirements until the product actually
defines them.

Conceptual flow:

```text
Agent registration
↓
Pending Approval
↓
Admin review
↓
Approved
↓
Public agent profile eligible
↓
Agent can publish listings
```

---

## 14. Reports / Moderation

```text
REPORTS

TYPE              TARGET                 REPORTED BY     STATUS

Listing           LH-1024                User #203       Open
Agent Profile     Nomsa Dlamini          User #102       Reviewing
Listing           LH-993                 User #511       Resolved
```

Detail:

```text
Report details

Reason:
Misleading listing information

Reported item:
Modern Family Home

Submitted:
2 Sep 2026

[ View Listing ]

[ Resolve ]
[ Take Action ]
```

Potential report states:

- Open
- Reviewing
- Resolved
- Dismissed

---

## 15. Contextual Admin Actions

Actions should reflect valid state transitions.

Pending Agent:

```text
Approve
Reject
```

Approved Agent:

```text
View
Suspend
```

Suspended Agent:

```text
View
Reactivate
```

Do not expose every possible action on every record.

---

## 16. Destructive Actions

Example:

```text
Remove listing?

This would remove the listing
from the public marketplace.

Reason
[                         ]

[ Cancel ] [ Remove Listing ]
```

Future backend implementation should consider audit logging, but audit-log design is not part of
the current frontend scope.

---

## 17. Tables and Mobile Records

Desktop uses semantic tables where appropriate.

Mobile converts the same data into labelled management cards.

Example:

```text
┌────────────────────────────┐
│ Rosebank Family Home       │
│                            │
│ Agent: Nomsa Dlamini       │
│ Status: Pending Review     │
│ Submitted: Today           │
│                            │
│ [ Review ]                 │
└────────────────────────────┘
```

---

## 18. Search and Filters

Keep admin filtering practical:

- Search
- Status
- Date
- Agent where relevant

Do not build an unnecessarily complex advanced query interface.

Bulk moderation is deferred initially because it introduces additional complexity and safety
concerns.

---

## 19. Settings

Potential limited settings:

- Platform details
- Contact information
- Default marketplace settings

Do not invent unrelated systems such as:

- Billing
- API key management
- Theme builders
- Integration marketplaces
- Feature flags
- Email template systems

without product requirements.

---

## 20. Admin Navigation

```text
LarHub Admin

Overview
Listings
Users
Agents
Moderation
Settings

──────────────

Back to Marketplace
Sign Out
```

Mobile uses an accessible application drawer/menu.

---

## 21. Frontend Behaviour That Can Be Real

- Navigation
- Demo-data search
- Filtering
- Sorting
- Review panels
- Form validation
- Confirmation dialogs
- Demo UI status changes
- Tabs
- Dropdowns
- Responsive table/card transformation

Backend-dependent:

- Persistent approval/rejection
- Persistent suspension
- Database moderation records
- Real user access control
- Real role permissions
- Audit logging
- Real reports
- Persistent listing removal
- Real platform statistics

---

## 22. Accessibility

- Semantic tables
- Labelled controls
- Current navigation indicated
- Status text not colour-only
- Dialog focus management
- Clearly named destructive actions
- Mobile record labels retained
- Keyboard-operable menus
- Screen-reader-friendly table headers
- Errors associated with controls

---

## 23. Acceptance Criteria

An administrator should be able to:

1. Understand marketplace status.
2. Identify pending work.
3. Browse demo listing records.
4. Filter moderation records.
5. Review a listing.
6. Simulate approve/reject/flag interactions.
7. Browse users.
8. Browse agents.
9. Inspect pending agent applications.
10. Interact with report/moderation UI.
11. Understand destructive actions.
12. Use admin interfaces on mobile.
13. Operate major actions by keyboard.
14. Understand that persistence/authentication is not yet connected.
