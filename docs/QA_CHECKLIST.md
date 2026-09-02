# LarHub — QA Checklist

## Purpose

This document is the reusable quality-assurance checklist for LarHub.

QA is performed incrementally.

A feature is not accepted merely because the code was written.

The expected cycle is:

```text
Implement
↓
Review code
↓
Run in browser
↓
Inspect behaviour
↓
Repair defects
↓
Verify
↓
Accept
↓
Lock
```

---

# 1. Foundation QA

## 1.1 Project Structure

- [x] Required project directories exist.
- [x] Public page files exist.
- [x] Auth page files exist.
- [x] User-area page files exist.
- [x] Agent-area page files exist.
- [x] Admin-area page files exist.
- [x] CSS module directories exist.
- [x] JavaScript module directories exist.
- [x] Documentation directory exists.

## 1.2 Design Tokens

- [x] Colour tokens exist.
- [x] Semantic colours are distinct from brand colours.
- [x] Typography tokens exist.
- [x] Spacing scale exists.
- [x] Container tokens exist.
- [x] Radius/border/shadow tokens exist.
- [x] Motion tokens exist.
- [x] Layering tokens exist.
- [x] Breakpoint references are documented.

## 1.3 Base / Reset

- [x] Global box sizing is predictable.
- [x] Default body margin is removed.
- [x] Images/media are responsive by default.
- [x] Form controls inherit typography.
- [x] Tables use a normalized model.
- [x] Keyboard focus is not globally removed.
- [x] Reduced-motion preferences are respected.

## 1.4 Typography

- [x] Shared heading hierarchy exists.
- [x] Display/H1/H2 use fluid sizing.
- [x] Body roles exist.
- [x] Label and eyebrow roles exist.
- [x] Property-price roles exist.
- [x] Readable-measure helpers exist.
- [x] Tabular-number helper exists.

## 1.5 Layout

- [x] Standard container exists.
- [x] Narrow container exists.
- [x] Wide container exists.
- [x] Application container exists.
- [x] Responsive gutters exist.
- [x] Flow/stack/cluster primitives exist.
- [x] Responsive grids exist.
- [x] Split layout exists.
- [x] Media aspect-ratio wrappers exist.

## 1.6 Utilities

- [x] Visually-hidden helper exists.
- [x] Focusable visually-hidden helper exists.
- [x] Display helpers exist.
- [x] Alignment helpers exist.
- [x] Width/overflow helpers exist.
- [x] Token-based spacing helpers exist.
- [x] Surface/border/radius helpers exist.
- [x] Responsive visibility helpers exist.

## 1.7 JavaScript Foundation

- [x] `js/main.js` is an ES module.
- [x] DOM-ready initialization is centralized.
- [x] Single-element selector helper exists.
- [x] Multi-element selector helper exists.
- [x] Query-parameter helper exists.
- [x] No page feature logic was introduced prematurely.

---

# 2. Runtime Foundation Verification

These checks must be completed during Increment 0.9.

## Local Server

- [ ] Run `py -m http.server 5500`.
- [ ] Open `http://localhost:5500`.
- [ ] Confirm `index.html` loads.
- [ ] Confirm subdirectory pages load directly.

## CSS

- [ ] Confirm `main.css` loads.
- [ ] Confirm `tokens.css` loads.
- [ ] Confirm `base.css` loads.
- [ ] Confirm `typography.css` loads.
- [ ] Confirm `layout.css` loads.
- [ ] Confirm `utilities.css` loads.
- [ ] Confirm no CSS import 404s.

## JavaScript

- [ ] Confirm `js/main.js` loads.
- [ ] Confirm `js/utils/dom.js` imports successfully.
- [ ] Confirm browser console has no module errors.
- [ ] Confirm no path-resolution errors.

## Layout

- [ ] Verify narrow mobile width.
- [ ] Verify ordinary mobile width.
- [ ] Verify tablet width.
- [ ] Verify desktop width.
- [ ] Verify large desktop width.
- [ ] Confirm no accidental horizontal scrolling.

## Accessibility Foundation

- [ ] Verify visible keyboard focus.
- [ ] Verify reduced-motion media query behaviour.
- [ ] Verify visually-hidden content remains accessible.
- [ ] Verify focusable hidden content becomes visible on focus.

---

# 3. Future Public Marketplace QA

To be expanded when implemented.

Will include:

- Header/footer
- Mobile navigation
- Property cards
- Search
- Filters
- Sorting
- Pagination
- Property gallery
- Agent cards
- Forms
- Empty states

---

# 4. Future Application QA

To be expanded when implemented.

Will include:

- User shell
- Agent shell
- Admin shell
- Tables/mobile record cards
- Property form
- Auth UI
- Social provider UI
- Confirmation dialogs
- Moderation workflows
- Demo state
