/**
 * LarHub Public Navigation Behaviour
 *
 * Increment 1 — Public Shell
 */

import {
  select
} from "../utils/dom.js";

const DESKTOP_MEDIA =
  "(min-width: 64rem)";

/**
 * Initialize the public mobile navigation.
 */
export function initPublicNavigation() {
  const toggle = select("[data-nav-toggle]");
  const nav = select("[data-site-nav]");

  if (!toggle || !nav) {
    return;
  }

  const desktopMedia =
    window.matchMedia(DESKTOP_MEDIA);

  function closeNavigation({
    restoreFocus = false
  } = {}) {
    nav.classList.remove("is-open");
    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    if (restoreFocus) {
      toggle.focus();
    }
  }

  function openNavigation() {
    nav.classList.add("is-open");
    toggle.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  function toggleNavigation() {
    const isOpen =
      toggle.getAttribute(
        "aria-expanded"
      ) === "true";

    if (isOpen) {
      closeNavigation();

      return;
    }

    openNavigation();
  }

  toggle.addEventListener(
    "click",
    toggleNavigation
  );

  nav.addEventListener(
    "click",
    (event) => {
      const link =
        event.target.closest("a");

      if (!link) {
        return;
      }

      closeNavigation();
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      const isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (!isOpen) {
        return;
      }

      closeNavigation({
        restoreFocus: true
      });
    }
  );

  desktopMedia.addEventListener(
    "change",
    (event) => {
      if (!event.matches) {
        return;
      }

      closeNavigation();
    }
  );
}
