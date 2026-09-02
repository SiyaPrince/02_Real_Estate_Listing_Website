# LarHub — QA Checklist

QA criteria will be expanded incrementally as features are implemented.

## Increment 0.1

- [x] Project structure created.
- [x] Expected public/auth/user/agent/admin page files exist.
- [x] CSS/JS module directories exist.
- [x] No feature implementation was introduced prematurely.

## Increment 0.2

- [x] `tokens.css` exists.
- [x] `main.css` imports `tokens.css`.
- [x] Brand colours match the locked design direction.
- [x] Semantic colours are separate from brand colours.
- [x] Shared spacing/container/radius/shadow/motion tokens exist.
- [x] No component or page styling was added.

## Increment 0.3

- [x] `base.css` exists.
- [x] `main.css` imports `base.css` after `tokens.css`.
- [x] Global box sizing is predictable.
- [x] Browser-default body margin is removed.
- [x] Images/media do not overflow their containers by default.
- [x] Form controls inherit LarHub typography.
- [x] Tables use a normalized collapse model.
- [x] Keyboard focus is not globally removed.
- [x] Reduced-motion preferences are respected.
- [x] No typography hierarchy was introduced prematurely.
- [x] No layout/component/page styling was introduced.

## Pending Runtime Verification

- [ ] Run LarHub through the local HTTP server.
- [ ] Confirm there are no CSS import errors.
- [ ] Confirm browser console has no CSS-related warnings.
- [ ] Confirm body does not create unexpected horizontal overflow.
