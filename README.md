# LarHub

LarHub is a real estate listing platform currently being implemented as a modular
HTML, CSS, and vanilla JavaScript frontend.

## Current State

The project is currently at:

**Increment 0.1 — Project Structure**

Only the structural project skeleton has been created.

No page designs, property data, search logic, authentication logic, dashboards,
or design-system styling have been implemented yet.

## Development

LarHub should be served through a local HTTP server.

```powershell
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Documentation

See the `/docs` directory for implementation-state and downstream notes.

## Design Tokens

The shared LarHub design-token layer is defined in:

```text
css/tokens.css
```

The tokens cover brand colours, typography references, spacing, containers,
radii, shadows, control sizing, motion, layering, and breakpoint references.

Component styling has not yet been implemented.

## CSS Foundation

LarHub now includes:

```text
css/tokens.css
css/base.css
```

`tokens.css` defines shared design values.

`base.css` establishes predictable browser defaults, responsive media behaviour,
form-control inheritance, focus visibility, and reduced-motion handling.

Typography hierarchy, layout primitives, components, and page styling are still pending.

## Typography System

LarHub now includes a shared typography layer in:

```text
css/typography.css
```

It defines the heading hierarchy, fluid display/H1/H2 sizing, body text roles,
labels, eyebrow text, property-price treatments, text colours, readable measure,
and number-alignment helpers.

Layout primitives, shared components, and page styling are still pending.

## Layout Foundation

The shared structural layout layer is defined in:

```text
css/layout.css
```

It provides responsive containers, section rhythm, flow/stack/cluster patterns,
generic grids, split layouts, application shells, and intrinsic media wrappers.

## Utility Layer

The shared utility layer is defined in:

```text
css/utilities.css
```

It provides a deliberately small set of accessibility, display, alignment,
spacing, width, overflow, surface, border, radius, and responsive-visibility
helpers.

LarHub avoids turning utilities into a replacement for meaningful component CSS.

## JavaScript Foundation

LarHub now has an ES-module application entry point:

```text
js/main.js
```

Shared DOM-ready and selector helpers live in:

```text
js/utils/dom.js
```

A minimal URL-query helper lives in:

```text
js/utils/url.js
```

Feature logic remains intentionally deferred.

## Project Documentation Discipline

LarHub maintains implementation state and downstream decisions in:

```text
docs/PROJECT_STATE.md
docs/QA_CHECKLIST.md
docs/IMAGE_ASSET_INVENTORY.md
docs/BACKEND_INTEGRATION_NOTES.md
docs/DECISIONS.md
```

These documents should be updated deliberately as increments are accepted.

`PROJECT_STATE.md` is the implementation-status source of truth.

`DECISIONS.md` records important locked architectural/product decisions rather
than conversation history.

## Foundation Verification

Increment 0.9 verified the current foundation through a local HTTP server.

Verified:

- Public/auth/application route availability
- Shared CSS resources
- JavaScript resources and syntax
- Local HTML/CSS/JS reference integrity
- Basic overflow-risk patterns

The detailed report is available at:

```text
docs/FOUNDATION_VERIFICATION.md
```

Full visual multi-viewport QA remains scheduled for later once implemented UI exists.

## Foundation Status

LarHub Foundation Increments **0.1–0.10 are complete and locked**.

The accepted shared foundation consists of:

```text
css/tokens.css
css/base.css
css/typography.css
css/layout.css
css/utilities.css

js/main.js
js/utils/dom.js
js/utils/url.js
```

See:

```text
docs/FOUNDATION_LOCK.md
```

for the final foundation review.

The next development phase is **Increment 1 — Public Shell**.

## Public Shell

LarHub now includes one reusable public shell across all public pages.

Implemented:

- Shared header
- Desktop navigation
- Mobile hamburger navigation
- Active navigation state
- Skip link
- Shared buttons
- Shared footer

Primary implementation files:

```text
css/components/buttons.css
css/components/navigation.css
css/components/footer.css

js/components/public-header.js
js/components/public-footer.js
js/features/navigation.js
```
