/**
 * LarHub DOM Utilities
 *
 * Increment 0.7
 *
 * Small shared helpers for safe DOM initialization
 * and element selection.
 */

/**
 * Run a callback when the document is ready.
 *
 * If the DOM is already available, the callback runs
 * immediately. Otherwise it waits for DOMContentLoaded.
 *
 * @param {() => void} callback
 */
export function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      callback,
      {
        once: true
      }
    );

    return;
  }

  callback();
}

/**
 * Find the first matching element within a root.
 *
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {T|null}
 */
export function select(
  selector,
  root = document
) {
  return root.querySelector(selector);
}

/**
 * Find all matching elements within a root.
 *
 * Returns a plain array so callers can safely use
 * standard array methods.
 *
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {T[]}
 */
export function selectAll(
  selector,
  root = document
) {
  return Array.from(
    root.querySelectorAll(selector)
  );
}

/**
 * Determine whether an element exists.
 *
 * @param {Element|null|undefined} element
 * @returns {boolean}
 */
export function exists(element) {
  return element instanceof Element;
}
