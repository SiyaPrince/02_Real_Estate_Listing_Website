/**
 * LarHub Recently Viewed Properties
 */

const STORAGE_KEY =
  "larhub.recentlyViewed";

const MAX_ITEMS = 12;

export function getRecentlyViewedIds() {
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

export function recordRecentlyViewed(
  propertyId
) {
  if (!propertyId) {
    return [];
  }

  const next = [
    propertyId,
    ...getRecentlyViewedIds()
      .filter(
        (id) => id !== propertyId
      )
  ].slice(
    0,
    MAX_ITEMS
  );

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next)
    );
  } catch {
    // Keep browsing functional if storage is unavailable.
  }

  return next;
}

export function clearRecentlyViewed() {
  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch {
    // No blocking behavior.
  }
}
