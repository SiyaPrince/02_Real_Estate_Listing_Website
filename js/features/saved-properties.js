/**
 * LarHub Saved Properties
 *
 * Increment 5 — Property Details
 */

const STORAGE_KEY =
  "larhub.savedProperties";

function readSavedIds() {
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
      ? parsed.filter(
          (value) =>
            typeof value === "string"
        )
      : [];
  } catch {
    return [];
  }
}

function writeSavedIds(ids) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ids)
    );
  } catch {
    // Keep save interaction non-blocking if storage is unavailable.
  }
}

export function getSavedPropertyIds() {
  return readSavedIds();
}

export function isPropertySaved(
  propertyId
) {
  return readSavedIds().includes(
    propertyId
  );
}

export function setPropertySaved(
  propertyId,
  saved
) {
  const ids =
    new Set(readSavedIds());

  if (saved) {
    ids.add(propertyId);
  } else {
    ids.delete(propertyId);
  }

  const nextIds =
    Array.from(ids);

  writeSavedIds(nextIds);

  return nextIds;
}

export function togglePropertySaved(
  propertyId
) {
  const nextSaved =
    !isPropertySaved(propertyId);

  setPropertySaved(
    propertyId,
    nextSaved
  );

  return nextSaved;
}
