/**
 * LarHub Property Card
 */
import {
  formatPropertyPrice
} from "../utils/currency.js";

const PUBLIC_STATUS_LABELS = {
  "for-sale": "For Sale",
  "to-rent": "To Rent",
  "new": "New",
  "under-offer": "Under Offer"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLocation(location) {
  return [
    location?.suburb,
    location?.city
  ]
    .filter(Boolean)
    .join(", ");
}

function formatArea(value) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return `${value.toLocaleString("en-ZA")} m²`;
}

export function getPropertyFactLabels(
  property
) {
  const facts = property.facts ?? {};
  const labels = [];

  if (property.propertyType === "land") {
    if (Number.isFinite(facts.landArea)) {
      labels.push(
        `Land ${formatArea(facts.landArea)}`
      );
    }

    return labels;
  }

  if (property.propertyType === "commercial") {
    if (property.commercialType) {
      labels.push(
        property.commercialType
          .charAt(0)
          .toUpperCase()
        + property.commercialType.slice(1)
      );
    }

    if (Number.isFinite(facts.floorArea)) {
      labels.push(formatArea(facts.floorArea));
    }

    if (Number.isFinite(facts.parking)) {
      labels.push(`${facts.parking} parking`);
    }

    return labels;
  }

  if (Number.isFinite(facts.bedrooms)) {
    labels.push(
      `${facts.bedrooms} bed${
        facts.bedrooms === 1 ? "" : "s"
      }`
    );
  }

  if (Number.isFinite(facts.bathrooms)) {
    labels.push(
      `${facts.bathrooms} bath${
        facts.bathrooms === 1 ? "" : "s"
      }`
    );
  }

  if (Number.isFinite(facts.floorArea)) {
    labels.push(formatArea(facts.floorArea));
  }

  return labels;
}

export function renderPropertyCard(
  property
) {
  const image =
    property.images?.[0]
    ?? "/assets/images/properties/property-placeholder.svg";

  const status =
    PUBLIC_STATUS_LABELS[property.publicStatus]
    ?? "";

  const facts =
    getPropertyFactLabels(property);

  const price =
    formatPropertyPrice(
      property.price,
      property.pricePeriod
    );

  return `
    <article
      class="property-card"
      data-property-id="${escapeHtml(property.id)}"
    >
      <div class="property-card__media media-property">
        <a
          class="property-card__image-link"
          href="/property.html?id=${encodeURIComponent(property.id)}"
          aria-label="View ${escapeHtml(property.title)}"
        >
          <img
            class="property-card__image"
            src="${escapeHtml(image)}"
            alt="${escapeHtml(property.title)}"
            loading="lazy"
          >
        </a>

        ${
          status
            ? `
              <span class="property-card__status">
                ${escapeHtml(status)}
              </span>
            `
            : ""
        }

        <button
          class="property-card__save icon-button"
          type="button"
          aria-label="Save ${escapeHtml(property.title)}"
          data-save-property
          data-property-id="${escapeHtml(property.id)}"
        >
          <span aria-hidden="true">♡</span>
        </button>
      </div>

      <div class="property-card__content">
        <p class="property-card__price text-price text-tabular">
          ${escapeHtml(price)}
        </p>

        <h3 class="property-card__title">
          <a
            href="/property.html?id=${encodeURIComponent(property.id)}"
          >
            ${escapeHtml(property.title)}
          </a>
        </h3>

        <p class="property-card__location text-small">
          ${escapeHtml(formatLocation(property.location))}
        </p>

        ${
          facts.length
            ? `
              <ul
                class="property-card__facts"
                aria-label="Key property facts"
              >
                ${facts
                  .map(
                    (fact) => `<li>${escapeHtml(fact)}</li>`
                  )
                  .join("")}
              </ul>
            `
            : ""
        }
      </div>
    </article>
  `;
}
