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
