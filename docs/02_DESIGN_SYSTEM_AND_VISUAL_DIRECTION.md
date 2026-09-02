# LarHub — Design System and Visual Direction

## 1. Purpose

This document defines the locked visual language, design tokens, layout philosophy, imagery
direction, responsive principles, motion, and component-level styling rules for LarHub.

---

## 2. Brand Personality

LarHub should feel:

- Modern
- Trustworthy
- Architectural
- Refined
- Calm
- Professional
- Premium but accessible

LarHub should **not** feel:

- Ultra-luxury
- Corporate and sterile
- Playful
- Flashy
- Futuristic
- Visually noisy

Core principle:

> **Properties provide personality. Interface provides clarity.**

---

## 3. Colour System

### Brand

| Token | Value | Purpose |
|---|---:|---|
| Primary | `#173F35` | Deep architectural green |
| Primary Hover | `#0F3028` | Primary interaction hover |
| Primary Soft | `#E7EFEC` | Soft branded backgrounds |

### Surfaces

| Token | Value |
|---|---:|
| Background | `#F7F6F2` |
| Surface | `#FFFFFF` |
| Secondary Surface | `#F0F0EB` |

### Text

| Token | Value |
|---|---:|
| Primary Text | `#1D211F` |
| Secondary Text | `#606762` |
| Muted Text | `#7B827E` |

### Borders

| Token | Value |
|---|---:|
| Border | `#DADDD9` |
| Strong Border | `#B8BDB9` |

### Semantic

| Token | Value |
|---|---:|
| Success | `#287A4B` |
| Warning | `#A66B18` |
| Error | `#B43A3A` |
| Information | `#356A8A` |

Semantic status must never be communicated through colour alone.

---

## 4. Typography

Primary candidate:

**Inter**

The interface should primarily use one strong sans-serif family.

### Approximate Type Scale

| Role | Desktop | Mobile |
|---|---:|---:|
| Display | 64px | 42px |
| H1 | 48px | 36px |
| H2 | 36px | 30px |
| H3 | 24px | 24px |
| H4 | 20px | 20px |
| Body Large | 18px | 18px |
| Body | 16px | 16px |
| Small | 14px | 14px |
| Caption | 12–13px | 12–13px |

Recommended weights:

- 400
- 500
- 600
- 700

Typography should establish hierarchy without relying on excessive decorative styling.

---

## 5. Spacing Scale

Locked conceptual spacing scale:

```text
4
8
12
16
24
32
48
64
80
96
```

### Section Spacing

Public marketing sections:

- Desktop: approximately 80–96px
- Mobile: approximately 56–64px

Dashboard/application sections:

- approximately 24–48px depending on density

Application UI should be more compact than public/editorial UI.

---

## 6. Container System

Conceptual container widths:

```text
Narrow       ~640px
Standard     ~1120px
Wide         ~1280px
Application  ~1440px
```

### Gutters

```text
Mobile       16–20px
Tablet       24–32px
Desktop      32–48px
```

---

## 7. Grid

LarHub uses a conceptual 12-column layout system.

Typical property grid:

```text
Desktop       3 cards with filter sidebar
Tablet        2 cards
Mobile        1 card
```

Very large screens may be tested for four cards, but four columns should not be forced merely
because space exists.

---

## 8. Responsive Ranges

Conceptual ranges:

```text
< 640px        Mobile
640–767px      Large mobile / small tablet
768–1023px     Tablet
1024–1279px    Desktop
1280px+        Large desktop
```

These are not rigid device targets.

Actual breakpoints should be introduced when content or layout fails.

Responsive design principle:

> Design for changing space, not named devices.

---

## 9. Radius System

```text
Small      4px
Control    6px
Medium     8px
Large      12px
Pill       999px only when semantically appropriate
```

Avoid excessive pill-shaped UI.

---

## 10. Borders and Shadows

LarHub should rely more on:

- Surface contrast
- Borders
- Spacing
- Typography

than on heavy shadows.

Shadow levels:

```text
None
Subtle
Overlay
```

Cards should not all float unnecessarily.

---

## 11. Buttons

Button families:

- Primary
- Secondary
- Tertiary
- Destructive
- Icon button

Approximate heights:

```text
Small       minimum 36px
Default     44px
Large       48–52px
```

Buttons must have clear hover, focus, active, and disabled states.

---

## 12. Form Controls

Typical input height:

```text
44–48px
```

Required states:

- Default
- Hover
- Focus
- Filled
- Disabled
- Error

Visible labels are required.

Placeholder text is not a replacement for labels.

---

## 13. Property Imagery

Recommended aspect ratios:

```text
Property card        4:3
Gallery main         ~3:2 or 16:10
Agent portrait       1:1
Homepage editorial   3:2 / 4:3 / 16:9
```

Meaningful imagery should use explicit image elements.

Do not create intended content imagery as empty `<div>` backgrounds.

CSS background imagery should be reserved for genuinely decorative visuals.

---

## 14. Property Card Visual Hierarchy

A property card should have explicit regions:

```text
PROPERTY CARD
│
├── Media
│   ├── Property image
│   ├── Public status
│   └── Save control
│
└── Content
    ├── Price
    ├── Title
    ├── Location
    └── Key facts
```

Primary reading order:

```text
Image
↓
Price
↓
Title
↓
Location
↓
Facts
```

Commercial and land cards must adapt their facts rather than pretending every property has
bedrooms and bathrooms.

---

## 15. Agent Card

```text
AGENT CARD
├── Portrait
├── Name
├── Agency / role
├── Area
├── Active public listing count
└── View Profile
```

Avoid meaningless badges such as "Verified" or "Top Agent" unless a real verification/ranking
process exists.

---

## 16. Dashboard Visual Direction

Public pages:

- Larger imagery
- More generous spacing
- Editorial composition
- Discovery-oriented

Dashboard/application pages:

- Compact controls
- Smaller section spacing
- Higher information density
- Reduced decoration
- Task-oriented hierarchy

The same LarHub design system should remain recognizable across both.

---

## 17. Tables

Desktop management interfaces may use semantic tables.

Mobile should not squeeze desktop tables into unreadable layouts.

Concept:

```text
Same records
│
├── Desktop → semantic table
└── Mobile  → structured record cards
```

---

## 18. Status Badges

One reusable status badge system should support semantic variants such as:

- Neutral
- Information
- Success
- Warning
- Error

Text communicates the state.

Colour only reinforces it.

---

## 19. Overlay Hierarchy

Conceptual stacking order:

```text
Base
↓
Sticky
↓
Dropdown
↓
Backdrop
↓
Drawer / Modal
↓
Critical Notification
```

Overlay behaviour must be predictable across the application.

---

## 20. Motion

Motion should be restrained.

Approximate durations:

```text
Fast       ~150ms
Default    200–250ms
Slow       300–400ms
```

Motion should:

- Explain state changes
- Improve continuity
- Avoid unnecessary spectacle
- Respect `prefers-reduced-motion`

---

## 21. Accessibility as a Design Requirement

Accessibility is not a later polish stage.

Component designs must account for:

- Keyboard use
- Visible focus
- Logical heading hierarchy
- Semantic landmarks
- Form labels
- Helpful errors
- Image alt strategy
- Sufficient contrast
- Non-colour status communication
- Reduced motion
- Focus management for overlays

---

## 22. South African Context

South African identity should emerge naturally through:

- Rand pricing
- Realistic South African locations
- Property architecture
- Agent identities/content
- Marketplace language

Avoid decorative stereotypes.

---

## 23. Visual Direction Lock

The visual system should remain calm enough that property imagery is allowed to carry emotional
weight.

The interface itself should primarily communicate:

- Trust
- Structure
- Clarity
- Professionalism
- Ease of discovery
