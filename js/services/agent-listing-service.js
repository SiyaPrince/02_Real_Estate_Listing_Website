/**
 * LarHub Demo Agent Listing Service
 *
 * Increment 10 — Agent Application
 *
 * This service merges the static demo property dataset with
 * browser-local Agent workspace overrides/additions.
 *
 * It does NOT mutate the public marketplace dataset.
 */

import {
  getPropertiesByAgent
} from "./property-service.js";

const STORAGE_KEY =
  "larhub.demoAgentListings";

export const DEMO_AGENT_ID =
  "agent-001";

const MANAGEMENT_STATUSES =
  new Set([
    "draft",
    "published",
    "under-offer",
    "sold",
    "rented"
  ]);

function readLocalRecords() {
  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function writeLocalRecords(
  records
) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );
  } catch {
    // Keep demo UI usable if storage is unavailable.
  }
}

function derivePublicStatus(
  listingType,
  lifecycleStatus
) {
  if (
    lifecycleStatus === "draft"
    || lifecycleStatus === "sold"
    || lifecycleStatus === "rented"
  ) {
    return null;
  }

  if (
    lifecycleStatus
    === "under-offer"
  ) {
    return "under-offer";
  }

  return listingType === "rent"
    ? "to-rent"
    : "for-sale";
}

function normalizeRecord(
  record
) {
  const lifecycleStatus =
    MANAGEMENT_STATUSES.has(
      record.lifecycleStatus
    )
      ? record.lifecycleStatus
      : "draft";

  return {
    ...record,
    agentId:
      record.agentId
      ?? DEMO_AGENT_ID,
    lifecycleStatus,
    publicStatus:
      derivePublicStatus(
        record.listingType,
        lifecycleStatus
      ),
    moderationStatus:
      record.moderationStatus
      ?? "approved"
  };
}

function getLocalById() {
  return new Map(
    readLocalRecords()
      .map(
        (record) => [
          record.id,
          normalizeRecord(record)
        ]
      )
  );
}

export function getDemoAgentListings() {
  const localById =
    getLocalById();

  const base =
    getPropertiesByAgent(
      DEMO_AGENT_ID
    )
      .map(
        (property) => {
          const override =
            localById.get(
              property.id
            );

          localById.delete(
            property.id
          );

          return normalizeRecord(
            override
              ? {
                  ...property,
                  ...override
                }
              : property
          );
        }
      );

  const additions =
    Array.from(
      localById.values()
    );

  return [
    ...base,
    ...additions
  ].sort(
    (a, b) =>
      new Date(b.listedDate)
      - new Date(a.listedDate)
  );
}

export function getDemoAgentListingById(
  listingId
) {
  return (
    getDemoAgentListings()
      .find(
        (listing) =>
          listing.id === listingId
      )
    ?? null
  );
}

export function saveDemoAgentListing(
  listing
) {
  const records =
    readLocalRecords();

  const existingIndex =
    records.findIndex(
      (record) =>
        record.id === listing.id
    );

  const normalized =
    normalizeRecord({
      ...listing,
      agentId:
        DEMO_AGENT_ID,
      updatedAt:
        new Date().toISOString()
    });

  if (
    existingIndex >= 0
  ) {
    records[
      existingIndex
    ] = normalized;
  } else {
    records.push(normalized);
  }

  writeLocalRecords(records);

  return normalized;
}

export function createDemoAgentListing(
  listing
) {
  const id =
    `demo-property-${Date.now()}`;

  const reference =
    `LH-DEMO-${String(
      Date.now()
    ).slice(-5)}`;

  return saveDemoAgentListing({
    ...listing,
    id,
    reference,
    listedDate:
      new Date()
        .toISOString()
        .slice(0, 10),
    agentId:
      DEMO_AGENT_ID,
    moderationStatus:
      "approved",
    featured: false,
    images: [
      "/assets/images/properties/property-placeholder.svg"
    ]
  });
}

export function updateDemoListingStatus(
  listingId,
  lifecycleStatus
) {
  const listing =
    getDemoAgentListingById(
      listingId
    );

  if (!listing) {
    return null;
  }

  return saveDemoAgentListing({
    ...listing,
    lifecycleStatus
  });
}

export function resetDemoAgentListings() {
  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch {
    // No blocking behavior.
  }
}
