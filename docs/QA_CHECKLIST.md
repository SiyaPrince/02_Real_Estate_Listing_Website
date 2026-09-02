# LarHub — QA Checklist

QA criteria will be expanded incrementally as features are implemented.

## Increment 0.1

- [x] Project structure created.
- [x] Expected page/module directories exist.
- [x] No feature implementation was introduced prematurely.

## Increment 0.2

- [x] `tokens.css` exists and is imported.
- [x] Shared design tokens are defined.
- [x] No component/page styling was introduced.

## Increment 0.3

- [x] `base.css` exists and is imported.
- [x] Browser defaults are normalized.
- [x] Focus and reduced-motion baselines are preserved.
- [x] No typography hierarchy/layout/component styling was introduced prematurely.

## Increment 0.4

- [x] `typography.css` exists.
- [x] `main.css` imports typography after base styles.
- [x] H1 and H2 use fluid sizing.
- [x] H3/H4/body roles use shared tokens.
- [x] Display text uses the locked LarHub scale.
- [x] Price treatments exist for cards/details.
- [x] Secondary/muted text roles exist.
- [x] Readable-measure helpers exist.
- [x] UI label and eyebrow roles exist.
- [x] Number alignment helper exists.
- [x] No container/grid/component/page styling was introduced.

## Pending Runtime Verification

- [ ] Run through local HTTP server.
- [ ] Confirm typography CSS imports successfully.
- [ ] Confirm heading sizes scale without overflow.
- [ ] Confirm long content wraps safely.
- [ ] Confirm text remains readable at narrow widths.
