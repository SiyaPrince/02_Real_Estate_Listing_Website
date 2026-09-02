/**
 * LarHub URL Utilities
 *
 * Increment 0.7
 *
 * Minimal URL helpers only.
 * Search-state parsing belongs to later increments.
 */

/**
 * Read one query-string parameter from the current URL.
 *
 * @param {string} key
 * @returns {string|null}
 */
export function getQueryParam(key) {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get(key);
}
