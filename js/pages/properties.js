/**
 * LarHub Properties Page
 */

import {
  renderPropertyCard
} from "../components/property-card.js";

import {
  paginateItems,
  renderPagination
} from "../components/pagination.js";

import {
  filterProperties
} from "../features/property-filters.js";

import {
  sortProperties
} from "../features/property-sort.js";

import {
  getPublicProperties
} from "../services/property-service.js";

import {
  onReady,
  select
} from "../utils/dom.js";

import {
  getQueryParams,
  setQueryParams
} from "../utils/url.js";

const PAGE_SIZE = 6;

const defaultState = {
  listing: "",
  location: "",
  type: "",
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  bathrooms: null,
  features: [],
  sort: "relevance",
  page: 1
};

let state = {
  ...defaultState
};

const publicProperties =
  getPublicProperties();

function parseNumber(value) {
  if (
    value === null
    || value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function readStateFromUrl() {
  const params =
    getQueryParams();

  state = {
    ...defaultState,
    listing:
      params.get("listing") ?? "",
    location:
      params.get("location") ?? "",
    type:
      params.get("type") ?? "",
    minPrice:
      parseNumber(
        params.get("minPrice")
      ),
    maxPrice:
      parseNumber(
        params.get("maxPrice")
      ),
    bedrooms:
      parseNumber(
        params.get("bedrooms")
      ),
    bathrooms:
      parseNumber(
        params.get("bathrooms")
      ),
    features:
      params.getAll("features"),
    sort:
      params.get("sort")
      ?? "relevance",
    page:
      parseNumber(
        params.get("page")
      ) ?? 1
  };
}

function getSerializableState() {
  return {
    listing: state.listing,
    location: state.location,
    type: state.type,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    features: state.features,
    sort:
      state.sort === "relevance"
        ? ""
        : state.sort,
    page:
      state.page === 1
        ? ""
        : state.page
  };
}

function syncUrl({
  replace = true
} = {}) {
  setQueryParams(
    getSerializableState(),
    {
      replace
    }
  );
}

function populateControls() {
  const searchForm =
    select(
      "[data-properties-search]"
    );

  const filterForm =
    select(
      "[data-filter-form]"
    );

  const sortControl =
    select(
      "[data-sort-control]"
    );

  if (searchForm) {
    searchForm.elements.listing.value =
      state.listing;

    searchForm.elements.location.value =
      state.location;

    searchForm.elements.type.value =
      state.type;
  }

  if (filterForm) {
    filterForm.elements.minPrice.value =
      state.minPrice ?? "";

    filterForm.elements.maxPrice.value =
      state.maxPrice ?? "";

    filterForm.elements.bedrooms.value =
      state.bedrooms ?? "";

    filterForm.elements.bathrooms.value =
      state.bathrooms ?? "";

    const checkboxes =
      filterForm.querySelectorAll(
        'input[name="features"]'
      );

    checkboxes.forEach(
      (checkbox) => {
        checkbox.checked =
          state.features.includes(
            checkbox.value
          );
      }
    );
  }

  if (sortControl) {
    sortControl.value =
      state.sort;
  }
}

function getFilteredSortedProperties() {
  return sortProperties(
    filterProperties(
      publicProperties,
      state
    ),
    state.sort
  );
}

function formatContext() {
  const parts = [];

  if (state.listing === "sale") {
    parts.push("for sale");
  }

  if (state.listing === "rent") {
    parts.push("to rent");
  }

  if (state.location) {
    parts.push(
      `in ${state.location}`
    );
  }

  if (state.type) {
    const type =
      state.type.replace(
        /(^.|-.)/g,
        (match) => (
          match
            .replace("-", " ")
            .toUpperCase()
        )
      );

    parts.push(type);
  }

  return parts.length
    ? `Properties ${parts.join(" ")}`
    : "Available properties";
}

function renderContext() {
  const context =
    select(
      "[data-properties-context]"
    );

  const title =
    select(
      "[data-results-title]"
    );

  if (context) {
    context.textContent =
      state.location
        ? `Explore available property options around ${state.location}.`
        : "Explore available properties across South Africa.";
  }

  if (title) {
    title.textContent =
      formatContext();
  }
}

function renderResults() {
  const grid =
    select(
      "[data-property-grid]"
    );

  const count =
    select(
      "[data-result-count]"
    );

  const empty =
    select(
      "[data-empty-state]"
    );

  const pagination =
    select(
      "[data-pagination]"
    );

  if (
    !grid
    || !count
    || !empty
    || !pagination
  ) {
    return;
  }

  const filtered =
    getFilteredSortedProperties();

  const pageData =
    paginateItems(
      filtered,
      state.page,
      PAGE_SIZE
    );

  if (pageData.page !== state.page) {
    state.page =
      pageData.page;

    syncUrl();
  }

  const start =
    filtered.length
      ? ((state.page - 1)
        * PAGE_SIZE) + 1
      : 0;

  const end =
    Math.min(
      state.page * PAGE_SIZE,
      filtered.length
    );

  count.textContent =
    filtered.length
      ? `Showing ${start}–${end} of ${filtered.length} properties`
      : "0 properties found";

  grid.innerHTML =
    pageData.items
      .map(renderPropertyCard)
      .join("");

  empty.hidden =
    filtered.length !== 0;

  grid.hidden =
    filtered.length === 0;

  renderPagination(
    pagination,
    {
      page: state.page,
      pageCount:
        pageData.pageCount,
      onPageChange:
        (page) => {
          state.page = page;
          syncUrl({
            replace: false
          });
          renderAll();

          window.scrollTo({
            top:
              document
                .querySelector(
                  ".properties-results"
                )
                ?.offsetTop ?? 0,
            behavior: "smooth"
          });
        }
    }
  );
}

function getFilterLabels() {
  const labels = [];

  if (state.listing) {
    labels.push({
      key: "listing",
      label:
        state.listing === "sale"
          ? "For Sale"
          : "To Rent"
    });
  }

  if (state.location) {
    labels.push({
      key: "location",
      label: state.location
    });
  }

  if (state.type) {
    labels.push({
      key: "type",
      label:
        state.type
          .charAt(0)
          .toUpperCase()
        + state.type.slice(1)
    });
  }

  if (
    Number.isFinite(
      state.minPrice
    )
  ) {
    labels.push({
      key: "minPrice",
      label:
        `Min R${state.minPrice
          .toLocaleString("en-ZA")}`
    });
  }

  if (
    Number.isFinite(
      state.maxPrice
    )
  ) {
    labels.push({
      key: "maxPrice",
      label:
        `Max R${state.maxPrice
          .toLocaleString("en-ZA")}`
    });
  }

  if (
    Number.isFinite(
      state.bedrooms
    )
  ) {
    labels.push({
      key: "bedrooms",
      label:
        `${state.bedrooms}+ bedrooms`
    });
  }

  if (
    Number.isFinite(
      state.bathrooms
    )
  ) {
    labels.push({
      key: "bathrooms",
      label:
        `${state.bathrooms}+ bathrooms`
    });
  }

  state.features.forEach(
    (feature) => {
      labels.push({
        key: "feature",
        value: feature,
        label: feature
      });
    }
  );

  return labels;
}

function renderActiveFilters() {
  const target =
    select(
      "[data-active-filters]"
    );

  if (!target) {
    return;
  }

  const labels =
    getFilterLabels();

  if (!labels.length) {
    target.innerHTML = "";
    target.hidden = true;

    return;
  }

  target.hidden = false;

  target.innerHTML = `
    <div class="active-filters__list">
      ${labels
        .map(
          (item) => `
            <button
              class="filter-chip"
              type="button"
              data-remove-filter="${item.key}"
              ${
                item.value
                  ? `data-filter-value="${item.value}"`
                  : ""
              }
            >
              <span>
                ${item.label}
              </span>

              <span aria-hidden="true">
                ×
              </span>
            </button>
          `
        )
        .join("")}

      <button
        class="button button--tertiary"
        type="button"
        data-clear-filters
      >
        Clear all
      </button>
    </div>
  `;
}

function renderAll() {
  renderContext();
  renderActiveFilters();
  renderResults();
  populateControls();
}

function clearAllFilters() {
  state = {
    ...defaultState,
    sort: state.sort
  };

  syncUrl({
    replace: false
  });

  renderAll();
}

function handleRemoveFilter(
  button
) {
  const key =
    button.dataset.removeFilter;

  if (key === "feature") {
    const value =
      button.dataset.filterValue;

    state.features =
      state.features.filter(
        (feature) => feature !== value
      );
  } else if (
    Object.hasOwn(state, key)
  ) {
    state[key] =
      defaultState[key];
  }

  state.page = 1;

  syncUrl({
    replace: false
  });

  renderAll();
}

function readSearchForm() {
  const form =
    select(
      "[data-properties-search]"
    );

  if (!form) {
    return;
  }

  state.listing =
    form.elements.listing.value;

  state.location =
    form.elements.location.value
      .trim();

  state.type =
    form.elements.type.value;

  state.page = 1;
}

function readFilterForm() {
  const form =
    select(
      "[data-filter-form]"
    );

  if (!form) {
    return;
  }

  state.minPrice =
    parseNumber(
      form.elements.minPrice.value
    );

  state.maxPrice =
    parseNumber(
      form.elements.maxPrice.value
    );

  state.bedrooms =
    parseNumber(
      form.elements.bedrooms.value
    );

  state.bathrooms =
    parseNumber(
      form.elements.bathrooms.value
    );

  state.features =
    Array.from(
      form.querySelectorAll(
        'input[name="features"]:checked'
      )
    ).map(
      (input) => input.value
    );

  state.page = 1;
}

function initForms() {
  const searchForm =
    select(
      "[data-properties-search]"
    );

  const filterForm =
    select(
      "[data-filter-form]"
    );

  const sortControl =
    select(
      "[data-sort-control]"
    );

  searchForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      readSearchForm();

      syncUrl({
        replace: false
      });

      renderAll();
    }
  );

  filterForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      readFilterForm();

      syncUrl({
        replace: false
      });

      renderAll();
      closeFilterPanel();
    }
  );

  sortControl?.addEventListener(
    "change",
    () => {
      state.sort =
        sortControl.value;

      state.page = 1;

      syncUrl({
        replace: false
      });

      renderAll();
    }
  );

  document.addEventListener(
    "click",
    (event) => {
      const remove =
        event.target.closest(
          "[data-remove-filter]"
        );

      if (remove) {
        handleRemoveFilter(remove);

        return;
      }

      if (
        event.target.closest(
          "[data-clear-filters]"
        )
        || event.target.closest(
          "[data-empty-clear]"
        )
      ) {
        clearAllFilters();
      }
    }
  );
}

let previousFilterFocus = null;

function getFocusableElements(
  panel
) {
  return Array.from(
    panel.querySelectorAll(
      [
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "a[href]"
      ].join(",")
    )
  );
}

function openFilterPanel() {
  const panel =
    select(
      "[data-filter-panel]"
    );

  const toggle =
    select(
      "[data-filter-toggle]"
    );

  const backdrop =
    select(
      "[data-filter-backdrop]"
    );

  if (
    !panel
    || !toggle
    || !backdrop
  ) {
    return;
  }

  previousFilterFocus =
    document.activeElement;

  panel.classList.add(
    "is-open"
  );

  backdrop.hidden = false;

  toggle.setAttribute(
    "aria-expanded",
    "true"
  );

  document.body.classList.add(
    "filters-open"
  );

  const focusable =
    getFocusableElements(panel);

  focusable[0]?.focus();
}

function closeFilterPanel() {
  const panel =
    select(
      "[data-filter-panel]"
    );

  const toggle =
    select(
      "[data-filter-toggle]"
    );

  const backdrop =
    select(
      "[data-filter-backdrop]"
    );

  if (
    !panel
    || !toggle
    || !backdrop
  ) {
    return;
  }

  panel.classList.remove(
    "is-open"
  );

  backdrop.hidden = true;

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "filters-open"
  );

  previousFilterFocus?.focus();
}

function initFilterDrawer() {
  const panel =
    select(
      "[data-filter-panel]"
    );

  const toggle =
    select(
      "[data-filter-toggle]"
    );

  const close =
    select(
      "[data-filter-close]"
    );

  const backdrop =
    select(
      "[data-filter-backdrop]"
    );

  if (
    !panel
    || !toggle
    || !close
    || !backdrop
  ) {
    return;
  }

  toggle.addEventListener(
    "click",
    openFilterPanel
  );

  close.addEventListener(
    "click",
    closeFilterPanel
  );

  backdrop.addEventListener(
    "click",
    closeFilterPanel
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        !panel.classList.contains(
          "is-open"
        )
      ) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeFilterPanel();

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable =
        getFocusableElements(
          panel
        );

      if (!focusable.length) {
        return;
      }

      const first =
        focusable[0];

      const last =
        focusable[
          focusable.length - 1
        ];

      if (
        event.shiftKey
        && document.activeElement
          === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey
        && document.activeElement
          === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  );

  const desktopMedia =
    window.matchMedia(
      "(min-width: 64rem)"
    );

  desktopMedia.addEventListener(
    "change",
    (event) => {
      if (
        event.matches
        && panel.classList.contains(
          "is-open"
        )
      ) {
        panel.classList.remove(
          "is-open"
        );

        backdrop.hidden = true;

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "filters-open"
        );
      }
    }
  );
}

function initHistory() {
  window.addEventListener(
    "popstate",
    () => {
      readStateFromUrl();
      renderAll();
    }
  );
}

function initProperties() {
  readStateFromUrl();
  populateControls();
  initForms();
  initFilterDrawer();
  initHistory();
  renderAll();
}

onReady(initProperties);
