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


# 10. Increment 6 — Agents QA

## Agent Directory

- [x] Directory renders through Agent Service.
- [x] Shared Agent Card is reused.
- [x] Search matches agent name.
- [x] Search matches agency.
- [x] Search matches areas served.
- [x] Search state uses `?q=`.
- [x] Browser Back/Forward restores search.
- [x] Result count is announced with `aria-live`.
- [x] Empty state exists.
- [x] Clear search exists.

## Agent Counts

- [x] Active listing counts derive from public property data.
- [x] Sold/Rented/Draft records are excluded.
- [x] Agent Card count is data-driven.

## Agent Profile

- [x] Profile loads from `?id=`.
- [x] Approved public agent validation exists.
- [x] Missing/unknown agent shows unavailable state.
- [x] Biography renders.
- [x] Areas served render.
- [x] Specialisations render.
- [x] Phone link exists.
- [x] Email link exists.
- [x] Active public listings render through Property Card.
- [x] Sold/Rented history is not shown publicly.

## Pending Browser Acceptance

- [ ] Verify directory grid at mobile/tablet/desktop widths.
- [ ] Verify long agency names do not overflow.
- [ ] Verify agent portraits crop correctly.
- [ ] Verify Agent Profile hero balance.
- [ ] Verify sticky contact panel.
- [ ] Verify active listing cards align correctly.


# 11. Increment 7 — Supporting Public Pages QA

## About

- [x] About page has one H1.
- [x] Meaningful About imagery uses explicit `<img>` markup.
- [x] What LarHub Does section exists.
- [x] Discover/Refine/Explore/Connect flow exists.
- [x] Seeker/Agent/Admin audiences are represented.
- [x] Platform principles are represented.
- [x] No fake awards, history, or scale statistics are shown.
- [x] Current frontend-only stage is stated truthfully.

## Contact

- [x] General-contact purpose is clear.
- [x] Property-specific enquiry is redirected conceptually to Property Details.
- [x] Agent-specific enquiry is redirected conceptually to Agent Profile.
- [x] Name field is validated.
- [x] Email field is validated.
- [x] Subject is validated.
- [x] Message is validated.
- [x] Errors appear next to the relevant fields.
- [x] Invalid fields use `aria-invalid`.
- [x] Focus moves to first invalid field.
- [x] Form result is announced with `aria-live`.
- [x] Successful frontend validation does not claim backend delivery.

## Pending Browser Acceptance

- [ ] Verify About image balance on mobile/desktop.
- [ ] Verify About grids stack cleanly.
- [ ] Verify Contact form width on narrow mobile.
- [ ] Verify sticky Contact form on desktop.
- [ ] Verify visible error/focus states.
- [ ] Verify long status messages wrap safely.


# 12. Increment 8 — Authentication QA

## Login

- [x] Email field exists.
- [x] Password field exists.
- [x] Password visibility toggle exists.
- [x] Forgot Password link exists.
- [x] Google button exists.
- [x] Facebook button exists.
- [x] Apple button exists.
- [x] Invalid email is rejected locally.
- [x] Missing password is rejected locally.
- [x] Frontend does not claim authentication succeeded.

## Registration

- [x] Name field exists.
- [x] Email field exists.
- [x] Password field exists.
- [x] Confirm Password exists.
- [x] Password length validation exists.
- [x] Matching-password validation exists.
- [x] Password-strength feedback exists.
- [x] Demo acknowledgement checkbox exists.
- [x] Social-provider buttons exist.
- [x] Frontend does not claim an account was created.

## Forgot Password

- [x] Email validation exists.
- [x] Reset request interface exists.
- [x] Frontend does not claim an email was sent.

## Provider Authentication

- [x] Google UI exists.
- [x] Facebook UI exists.
- [x] Apple UI exists.
- [x] Provider clicks return explicit not-connected status.

## Demo Access

- [x] Demo Access is explicitly labeled.
- [x] User role exists.
- [x] Agent role exists.
- [x] Admin role exists.
- [x] Demo session is stored separately from real authentication.
- [x] Demo session uses `larhub.demoSession`.
- [x] Demo Access does not claim real authentication.

## Pending Browser Acceptance

- [ ] Verify auth layout on narrow mobile.
- [ ] Verify two-column desktop composition.
- [ ] Verify provider buttons fit without wrapping badly.
- [ ] Verify password toggles remain keyboard accessible.
- [ ] Verify password strength colors/text.
- [ ] Verify inline error messages.
- [ ] Verify Demo Access routes correctly.


# 13. Increment 9 — User Application QA

## Application Shell

- [x] User sidebar exists.
- [x] Mobile application navigation exists.
- [x] Mobile backdrop exists.
- [x] Escape closes mobile navigation.
- [x] Active page uses `aria-current`.
- [x] Public marketplace link exists.
- [x] Demo role state is visible.
- [x] Exit Demo clears demo session.

## Overview

- [x] Saved count is data-driven.
- [x] Recent count is data-driven.
- [x] Demo enquiry count is data-driven.
- [x] Recently Viewed preview reuses Property Card.
- [x] Missing Demo Access is explained truthfully.

## Saved Properties

- [x] Saved IDs come from `larhub.savedProperties`.
- [x] IDs resolve through Property Service.
- [x] Management-only properties cannot render.
- [x] Empty state exists.
- [x] Shared Property Card is reused.

## Recently Viewed

- [x] Property Details records valid public property views.
- [x] Recently Viewed stores IDs only.
- [x] History is capped.
- [x] Clear history exists.
- [x] Empty state exists.
- [x] Shared Property Card is reused.

## Enquiries

- [x] Valid Property Details forms create local demo records.
- [x] Enquiries page reads local demo records.
- [x] Viewing request records are distinguishable.
- [x] Records are explicitly marked Local Demo.
- [x] UI never claims an enquiry was sent.
- [x] UI never claims a viewing was scheduled.
- [x] Clear demo records exists.

## Profile

- [x] Demo profile loads locally.
- [x] Demo profile saves locally.
- [x] Required field validation remains.
- [x] UI explicitly states no server account was updated.

## Pending Browser Acceptance

- [ ] Verify sidebar/mobile drawer layout.
- [ ] Verify dashboard cards on mobile/tablet/desktop.
- [ ] Verify saved state updates after Property Details interactions.
- [ ] Verify recently viewed ordering.
- [ ] Verify local enquiry records after submitting property forms.
- [ ] Verify profile state survives refresh.


# 14. Increment 10 — Agent Application QA

## Application Shell

- [x] Agent navigation is active.
- [x] Overview link exists.
- [x] My Listings link exists.
- [x] Add Property link exists.
- [x] Enquiries link exists.
- [x] Performance link exists.
- [x] Profile link exists.
- [x] Active page state works.
- [x] Agent Demo Access state is visible.

## Listings

- [x] Demo Agent base listings load.
- [x] Local overrides merge with base listings.
- [x] Local additions load.
- [x] Status filtering works.
- [x] Draft exists.
- [x] Published exists.
- [x] Under Offer exists.
- [x] Sold exists.
- [x] Rented exists.
- [x] Sold/Rented are shown only in management UI.
- [x] Local management changes do not mutate the public static dataset.
- [x] Local listing reset exists.

## Property Form

- [x] Create mode exists.
- [x] Edit mode exists through `?id=`.
- [x] Required fields use native validation.
- [x] Numeric property facts are normalized.
- [x] Comma-separated features are normalized.
- [x] New local listing receives ID/reference.
- [x] Save result explicitly says it is browser-local.

## Enquiries

- [x] Agent view filters Demo Enquiries by managed listing IDs.
- [x] Enquiry sender details render.
- [x] Viewing requests remain distinguishable.
- [x] Local Demo status is explicit.
- [x] No delivery/scheduling success is claimed.

## Performance

- [x] Published count is computed.
- [x] Under Offer count is computed.
- [x] Sold/Rented count is computed.
- [x] Demo enquiry count is computed.
- [x] Lifecycle distribution is computed.
- [x] No fake views/conversion/revenue metrics were added.

## Profile

- [x] Demo Agent profile loads from real demo Agent data.
- [x] Local profile override exists.
- [x] Areas served are editable locally.
- [x] Specialisations are editable locally.
- [x] UI explicitly states public profile data is unchanged.

## Pending Browser Acceptance

- [ ] Verify Agent sidebar/mobile navigation.
- [ ] Verify listing cards at mobile/desktop widths.
- [ ] Verify status control behavior.
- [ ] Verify Add/Edit form on narrow screens.
- [ ] Verify local additions survive refresh.
- [ ] Verify Sold/Rented states remain management-only.
- [ ] Verify performance counts after status changes.
