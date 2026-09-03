# LarHub — Project State

## Current Increment

**Increment 2 — Property Data Foundation**

Status: **COMPLETE — pending browser acceptance of reusable cards**

## Completed

- 15 property demo records
- 6 approved public agent demo records
- Sale and rental data
- Residential, commercial, and land data
- Public + management-only property states
- Property service
- Agent service
- Central rand formatting
- Reusable Property Card renderer/styles
- Reusable Agent Card renderer/styles
- Neutral property/agent fallback images

## Public Visibility Rule

Public retrieval requires:

- `moderationStatus === "approved"`
- lifecycle `published` or `under-offer`
- a valid `publicStatus`

Sold, Rented, Draft, and management-only records are excluded from public discovery.

## Next

**Increment 3 — Home**
