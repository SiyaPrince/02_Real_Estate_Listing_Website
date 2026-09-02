# LarHub — User Area UX Design

## 1. Purpose

The User Area gives property seekers a focused account-style interface for managing their
LarHub activity.

Core responsibility:

> Give a property seeker one place to manage saved properties, enquiries, recently viewed
> listings, and profile information.

---

## 2. User Area Structure

```text
USER AREA
│
├── Overview
├── Saved Properties
├── Enquiries
├── Recently Viewed
└── Profile
```

---

## 3. Application Shell

Desktop:

```text
┌───────────────┬─────────────────────────────────────────┐
│ LarHub        │                                         │
│               │ Welcome back                           │
│ Overview      │                                         │
│ Saved         │ Your property activity at a glance.    │
│ Enquiries     │                                         │
│ Recently      │ Main content                           │
│ Profile       │                                         │
│               │                                         │
│ Back to       │                                         │
│ Marketplace   │                                         │
│ Sign Out      │                                         │
└───────────────┴─────────────────────────────────────────┘
```

This should feel like application UI rather than a marketing page.

---

## 4. Overview

Recommended summary:

```text
Saved Properties
8

Enquiries
3

Recently Viewed
12
```

Potential future metric:

```text
Viewing Requests
2
```

only if viewing requests become part of the actual user workflow.

### Dashboard Content

```text
Welcome back

Your property activity at a glance.

[ Saved ] [ Enquiries ] [ Recently Viewed ]

Saved Properties Preview

Recent Activity
```

No giant hero imagery.

---

## 5. Saved Properties

Reuse the shared Property Card.

```text
SAVED PROPERTIES

8 saved properties                       Sort ▼

[CARD] [CARD] [CARD]

[CARD] [CARD] [CARD]
```

Primary interactions:

- Open property
- Remove from saved

A dashboard variant may display contextual metadata such as:

```text
Saved 3 days ago
```

without creating a completely unrelated card component.

---

## 6. Saved Empty State

```text
No saved properties yet

Properties you save will appear here
so you can return to them easily.

[ Browse Properties ]
```

A good empty state explains:

1. What happened?
2. What is this page for?
3. What can I do next?

---

## 7. Save Interaction

Public card:

```text
♡
```

Saved:

```text
♥
```

In the account area, removal should be explicit:

```text
♥ Saved
Remove
```

Icon-only controls must have accessible labels.

---

## 8. Enquiries

Conceptual record:

```text
Modern Family Home
Rosebank
Ref LH-1024

Agent:
Nomsa Dlamini

Status:
Submitted

View Property →
```

During frontend-only development, these are demonstration records.

Do not imply that real messages were sent.

Potential future backend-tracked states may include:

- Submitted
- Viewed
- Responded
- Closed

These should only become real user-facing status claims when the backend genuinely tracks them.

---

## 9. Recently Viewed

```text
RECENTLY VIEWED

[CARD] [CARD] [CARD]
```

This is secondary to saved properties but useful for returning to previous browsing.

It may initially use local storage.

---

## 10. Profile

Keep the seeker profile intentionally simple.

Fields:

- Full name
- Email
- Phone
- Account type

Potential later preference:

- Preferred locations

Do not turn the seeker profile into an unnecessary CRM record.

### Edit Profile

```text
PROFILE

Personal Information

Full name
[                         ]

Email
[                         ]

Phone
[                         ]

[ Save Changes ]
```

Without backend persistence, changes must be described as demo/client-side behaviour.

---

## 11. User Navigation

```text
Overview
Saved Properties
Enquiries
Recently Viewed
Profile

──────────────

Back to Marketplace
Sign Out
```

The public navigation should not be duplicated into the application area.

---

## 12. Avatar

Initials can be used as a fallback:

```text
SN
```

Profile image support is optional.

Property seekers should not be required to upload a profile photo merely to use the platform.

---

## 13. Mobile

Desktop sidebar becomes mobile application navigation.

Possible compact structure:

```text
LarHub                         ☰

Welcome back

Saved: 8
Enquiries: 3

Saved Properties

[ PROPERTY ]

[ PROPERTY ]
```

Avoid forcing a permanent narrow sidebar on mobile.

---

## 14. Data Density

Public:

- Large imagery
- Generous spacing
- Editorial composition

User application:

- Compact controls
- Smaller section spacing
- More information
- Less decoration

Brand identity remains consistent.

---

## 15. Empty States

### Saved

```text
No saved properties
[ Browse Properties ]
```

### Enquiries

```text
No enquiries yet

When you contact an agent about a property,
your enquiries will appear here.
```

### Recently Viewed

```text
Nothing viewed recently

Properties you explore will appear here.
```

---

## 16. Accessibility

- Sidebar/mobile navigation keyboard accessible
- Current page clearly indicated
- Save/remove controls labelled
- Logical heading structure
- Forms labelled
- Status not colour-only
- Mobile navigation manages focus
- Empty states remain understandable without icons
- Interactive cards do not create conflicting nested controls

---

## 17. Acceptance Criteria

The user area should allow a property seeker to:

1. Understand their account area.
2. Navigate between sections.
3. View demo saved properties.
4. Remove saved properties at frontend level.
5. Inspect enquiry UI.
6. View recently viewed listings.
7. Edit profile information through validated frontend forms.
8. Return to the marketplace.
9. Use the account area on mobile.
10. Understand which functionality is demo-only.
