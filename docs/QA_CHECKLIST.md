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

These checks were completed during Increment 0.9.

## Local Server

- [x] LarHub ran through a local HTTP server.
- [x] `/` returned HTTP 200.
- [x] `/index.html` returned HTTP 200.
- [x] Public page routes returned HTTP 200.
- [x] Authentication page routes returned HTTP 200.
- [x] Representative User/Agent/Admin page routes returned HTTP 200.

## CSS

- [x] `main.css` returned HTTP 200.
- [x] `tokens.css` returned HTTP 200.
- [x] `base.css` returned HTTP 200.
- [x] `typography.css` returned HTTP 200.
- [x] `layout.css` returned HTTP 200.
- [x] `utilities.css` returned HTTP 200.
- [x] Static CSS import references resolve to existing files.
- [x] No tested CSS resources returned 404.

## JavaScript

- [x] `js/main.js` returned HTTP 200.
- [x] `js/utils/dom.js` returned HTTP 200.
- [x] `js/utils/url.js` returned HTTP 200.
- [x] Every JavaScript file passes `node --check`.
- [x] Static JavaScript import references resolve to existing files.

## HTML / Resource References

- [x] Local HTML `src`/`href` references resolve to existing files.
- [x] No broken local references were found in the static reference scan.

## Overflow-Risk Inspection

- [x] No obvious `100vw` pattern was found in foundation CSS.
- [x] No obvious 1000px+ fixed `width`/`min-width` pattern was found.
- [x] Shared grids use `minmax(0, 1fr)` where implemented.

## Browser Rendering Note

- [ ] Full visual multi-viewport browser inspection.

Reason:

The available headless Chromium process did not complete a reliable screenshot/render pass in the
verification environment.

This check is intentionally deferred to later visual QA, once real components/pages exist.

The current foundation verification still passed HTTP/resource/syntax/reference checks.


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


## Increment 0.9 Verification Summary

**Result: PASS**

No blocking foundation issue was found.

Verified categories:

- HTTP routing
- CSS resource loading
- JavaScript resource loading
- JavaScript syntax
- Static import/reference integrity
- Basic overflow-risk patterns

Full visual/browser interaction QA remains intentionally deferred until implemented UI exists.


## Increment 0.10 — Foundation Lock

- [x] Required foundation files exist.
- [x] CSS foundation import order is correct.
- [x] Foundation CSS uses declared design tokens.
- [x] No undefined token references were found.
- [x] `js/main.js` remains a small bootstrap module.
- [x] No property/search/authentication feature logic has leaked into the foundation.
- [x] Increment 0.9 runtime verification remains valid.
- [x] Foundation documentation is present.
- [x] Foundation is approved for downstream implementation.

**Foundation status: LOCKED**


# 5. Increment 1 — Public Shell QA

## Structure

- [x] Shared public header component exists.
- [x] Shared public footer component exists.
- [x] All public pages contain shared header/footer mount points.
- [x] Shared button CSS exists.
- [x] Shared navigation CSS exists.
- [x] Shared footer CSS exists.

## Navigation

- [x] Buy links to sale-filtered Properties.
- [x] Rent links to rent-filtered Properties.
- [x] Agents links to public agent directory.
- [x] About links to About.
- [x] Contact links to Contact.
- [x] Sign In links to authentication UI.
- [x] Active navigation state is generated from current path/query state.

## Mobile Navigation

- [x] Hamburger control exists.
- [x] Control uses `aria-controls`.
- [x] Control updates `aria-expanded`.
- [x] Escape closes an open menu.
- [x] Escape returns focus to the menu control.
- [x] Selecting a mobile navigation link closes the menu.
- [x] Navigation resets when entering desktop range.

## Accessibility

- [x] Skip-to-content link exists.
- [x] Primary navigation has an accessible label.
- [x] Footer navigation has an accessible label.
- [x] Mobile menu toggle has an accessible name.
- [x] Active page uses `aria-current="page"`.
- [x] Touch targets use the shared minimum target token.

## Pending Browser Acceptance

- [ ] Verify header visual balance on desktop.
- [ ] Verify hamburger visibility on mobile.
- [ ] Verify desktop navigation does not wrap unexpectedly.
- [ ] Verify mobile navigation does not create horizontal overflow.
- [ ] Verify footer composition on mobile/tablet/desktop.
- [ ] Verify keyboard navigation in a real browser.
- [ ] Verify focus visibility on all header/footer links.


# 6. Increment 2 — Property Data Foundation QA

- [x] Property IDs are unique.
- [x] Property references are unique.
- [x] Prices are numeric.
- [x] Every property `agentId` resolves to an agent.
- [x] Sale and rent data exist.
- [x] House, apartment, townhouse, commercial, and land data exist.
- [x] Multiple South African locations exist.
- [x] Sold/Rented/Draft records are management-only.
- [x] Public-property service excludes management-only records.
- [x] Featured-property service exists.
- [x] Public agent listing count derives from public property data.
- [x] Currency formatting is centralized.
- [x] Reusable Property Card exists.
- [x] Reusable Agent Card exists.
- [x] Cards use explicit image markup.
- [x] Temporary fallback assets exist.

## Pending Browser Acceptance

- [ ] Render sample Property Cards.
- [ ] Render sample Agent Cards.
- [ ] Verify long titles do not overflow.
- [ ] Verify fallback media crops correctly.
- [ ] Verify hover/focus states.


# 7. Increment 3 — Home QA

## Structure

- [x] Home has one H1.
- [x] Hero image uses explicit `<img>` markup.
- [x] Home search uses a semantic `<form>`.
- [x] Search controls have visible labels.
- [x] Featured section has a labelled heading.
- [x] Buy/Rent discovery uses real links.
- [x] Popular locations use real links.
- [x] Final CTA uses a real link.

## Search

- [x] Listing type is included in URL query state.
- [x] Location is included only when provided.
- [x] Property type is included only when provided.
- [x] Empty optional values are omitted.
- [x] Search routes to `properties.html`.
- [x] Full Properties filtering logic remains deferred.

## Data

- [x] Featured listings are loaded through the Property Service.
- [x] Shared Property Card is reused.
- [x] Home does not duplicate raw property markup.

## Content

- [x] No fake user/listing/platform statistics are shown.
- [x] South African context appears naturally in property/location content.
- [x] Home remains concise rather than becoming a duplicate Properties page.

## Responsive

- [x] Hero starts stacked.
- [x] Hero becomes two-column on desktop.
- [x] Search stacks on mobile.
- [x] Search becomes denser at larger widths.
- [x] Featured listings use shared responsive grid.
- [x] CTA stacks before becoming horizontal.

## Pending Browser Acceptance

- [ ] Verify hero visual balance on desktop.
- [ ] Verify search-field spacing on mobile.
- [ ] Verify search does not overflow narrow mobile widths.
- [ ] Verify Property Cards appear consistently.
- [ ] Verify Buy/Rent cards remain balanced.
- [ ] Verify location-row hover/focus states.
- [ ] Replace hero placeholder with final photography when imagery is available.


# 8. Increment 4 — Properties QA

## URL State

- [x] Query parameters initialize Properties state.
- [x] Search updates query state.
- [x] Filter submission updates query state.
- [x] Sort updates query state.
- [x] Pagination updates query state.
- [x] Browser back/forward rehydrates state.
- [x] Empty/default values are omitted from the URL where practical.

## Search / Filters

- [x] Buy/Rent filter works.
- [x] Location filter checks suburb/city/province.
- [x] Property Type filter works.
- [x] Minimum price works.
- [x] Maximum price works.
- [x] Minimum bedrooms works.
- [x] Minimum bathrooms works.
- [x] Feature filters work.
- [x] Selected features use AND logic.

## Sorting

- [x] Relevance/default sorting exists.
- [x] Price ascending exists.
- [x] Price descending exists.
- [x] Newest exists.

## Results

- [x] Result count is announced through `aria-live`.
- [x] Shared Property Card is reused.
- [x] Empty state exists.
- [x] Active filter chips exist.
- [x] One filter can be removed.
- [x] All filters can be cleared.
- [x] Pagination exists.
- [x] Page number is clamped to valid range.

## Mobile Drawer

- [x] Drawer opens from Filters button.
- [x] `aria-expanded` updates.
- [x] Escape closes drawer.
- [x] Backdrop closes drawer.
- [x] Focus returns to prior control.
- [x] Focus is contained while drawer is open.
- [x] Desktop breakpoint clears mobile drawer state.

## Pending Browser Acceptance

- [ ] Verify filter drawer width on narrow phones.
- [ ] Verify no horizontal overflow.
- [ ] Verify 2-column tablet grid.
- [ ] Verify desktop sidebar alignment.
- [ ] Verify 3-column large-desktop grid.
- [ ] Verify chips wrap gracefully.
- [ ] Verify pagination layout on mobile.
- [ ] Verify browser Back/Forward visually restores controls.


# 9. Increment 5 — Property Details QA

## Loading

- [x] Property ID is read from query state.
- [x] Property loads through Property Service.
- [x] Missing ID shows unavailable state.
- [x] Unknown ID shows unavailable state.
- [x] Sold/Rented/Draft management-only records do not render publicly.

## Gallery

- [x] Main image exists.
- [x] Secondary images exist where available.
- [x] Lightbox opens from gallery.
- [x] Previous/Next works.
- [x] Left/Right keyboard navigation exists.
- [x] Escape closes lightbox.
- [x] Focus restores after closing.
- [x] Image count is shown.

## Property Information

- [x] Status renders as text.
- [x] Price uses centralized formatter.
- [x] Key facts adapt to property type.
- [x] Description exists.
- [x] Features render.
- [x] No fake map is displayed.

## Save State

- [x] Save button uses `aria-pressed`.
- [x] Saved property IDs persist in `localStorage`.
- [x] Only IDs are stored, not duplicate property objects.

## Agent

- [x] Agent panel loads from Agent Service.
- [x] Agent profile link works.
- [x] Call link exists.
- [x] Email link exists.

## Enquiry / Viewing

- [x] General enquiry form exists.
- [x] Request-viewing form exists.
- [x] Browser validation is used.
- [x] Frontend-only status is explicit.
- [x] No fake send/scheduling success is shown.

## Similar Properties

- [x] Similar-property service exists.
- [x] Current property is excluded.
- [x] Shared Property Card is reused.

## Pending Browser Acceptance

- [ ] Verify gallery layout on mobile/tablet/desktop.
- [ ] Verify lightbox image scaling.
- [ ] Verify sticky agent panel behavior.
- [ ] Verify save state survives refresh.
- [ ] Verify form controls fit narrow mobile widths.
- [ ] Verify similar Property Cards align correctly.
