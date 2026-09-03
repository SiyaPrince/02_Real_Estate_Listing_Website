/**
 * LarHub Home Page
 *
 * Increment 3 — Home
 */

import {renderPropertyCard} from "../components/property-card.js";

import {getFeaturedProperties} from "../services/property-service.js";

import {onReady, select} from "../utils/dom.js";

function renderFeaturedProperties() {
  const target = select(
    "[data-featured-properties]"
  );

  if (!target) {
    return;
  }

  const properties =
    getFeaturedProperties(3);

  target.innerHTML = properties
    .map(renderPropertyCard)
    .join("");
}

function initHomeSearch() {
  const form = select("[data-home-search]");

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const formData =
        new FormData(form);

      const params =
        new URLSearchParams();

      for (const [key, rawValue]
        of formData.entries()) {
        const value =
          String(rawValue).trim();

        if (!value) {
          continue;
        }

        params.set(
          key,
          value
        );
      }

      const query =
        params.toString();

      window.location.href =
        query
          ? `/properties.html?${query}`
          : "/properties.html";
    }
  );
}

function initHome() {
  renderFeaturedProperties();
  initHomeSearch();
}

onReady(initHome);
