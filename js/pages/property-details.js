/**
 * LarHub Property Details Page
 */

import {
  renderPropertyCard
} from "../components/property-card.js";

import {
  getAgentById
} from "../services/agent-service.js";

import {
  getPropertyById,
  getSimilarPublicProperties,
  isPublicProperty
} from "../services/property-service.js";

import {
  formatPropertyPrice
} from "../utils/currency.js";

import {
  onReady,
  select
} from "../utils/dom.js";

import {
  getQueryParam
} from "../utils/url.js";

import {
  initPropertyGallery
} from "../features/property-gallery.js";

import {
  isPropertySaved,
  setPropertySaved
} from "../features/saved-properties.js";

import {
  recordRecentlyViewed
} from "../features/recently-viewed.js";

import {
  createDemoEnquiry
} from "../services/enquiry-service.js";

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
    location?.city,
    location?.province
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

function buildKeyFacts(property) {
  const facts =
    property.facts ?? {};

  const items = [];

  if (
    property.propertyType
    !== "land"
    && Number.isFinite(
      facts.bedrooms
    )
  ) {
    items.push({
      label: "Bedrooms",
      value: facts.bedrooms
    });
  }

  if (
    property.propertyType
    !== "land"
    && Number.isFinite(
      facts.bathrooms
    )
  ) {
    items.push({
      label: "Bathrooms",
      value: facts.bathrooms
    });
  }

  if (
    Number.isFinite(
      facts.parking
    )
  ) {
    items.push({
      label: "Parking",
      value: facts.parking
    });
  }

  if (
    Number.isFinite(
      facts.floorArea
    )
  ) {
    items.push({
      label: "Floor area",
      value:
        formatArea(
          facts.floorArea
        )
    });
  }

  if (
    Number.isFinite(
      facts.landArea
    )
  ) {
    items.push({
      label: "Land area",
      value:
        formatArea(
          facts.landArea
        )
    });
  }

  if (
    property.propertyType
    === "commercial"
    && property.commercialType
  ) {
    items.unshift({
      label: "Commercial type",
      value:
        property.commercialType
          .charAt(0)
          .toUpperCase()
        + property.commercialType
          .slice(1)
    });
  }

  return items;
}

function renderGallery(images) {
  const safeImages =
    images?.length
      ? images
      : [
          "/assets/images/properties/property-placeholder.svg"
        ];

  const secondary =
    safeImages.slice(1, 3);

  return `
    <div
      class="property-gallery"
      data-property-gallery
    >
      <button
        class="property-gallery__main"
        type="button"
        data-gallery-open="0"
        aria-label="Open property image 1"
      >
        <img
          src="${escapeHtml(safeImages[0])}"
          alt="Primary property view"
        >
      </button>

      <div class="property-gallery__secondary">
        ${secondary
          .map(
            (image, index) => `
              <button
                class="property-gallery__thumb"
                type="button"
                data-gallery-open="${index + 1}"
                aria-label="Open property image ${index + 2}"
              >
                <img
                  src="${escapeHtml(image)}"
                  alt="Additional property view ${index + 2}"
                >
              </button>
            `
          )
          .join("")}
      </div>

      <button
        class="button button--secondary property-gallery__view-all"
        type="button"
        data-gallery-open="0"
      >
        View all ${safeImages.length} photo${safeImages.length === 1 ? "" : "s"}
      </button>
    </div>
  `;
}

function renderAgentPanel(agent) {
  if (!agent) {
    return `
      <aside class="property-agent-card">
        <p class="text-eyebrow">
          Agent
        </p>

        <h2>
          Agent information unavailable
        </h2>
      </aside>
    `;
  }

  return `
    <aside
      class="property-agent-card"
      aria-labelledby="property-agent-title"
    >
      <p class="text-eyebrow">
        Listed by
      </p>

      <div class="property-agent-card__identity">
        <img
          class="property-agent-card__image"
          src="${escapeHtml(agent.photo)}"
          alt="${escapeHtml(agent.name)}"
        >

        <div>
          <h2 id="property-agent-title">
            ${escapeHtml(agent.name)}
          </h2>

          <p class="text-small">
            ${escapeHtml(agent.agency)}
          </p>
        </div>
      </div>

      <div class="property-agent-card__actions">
        <a
          class="button button--secondary"
          href="/agent.html?id=${encodeURIComponent(agent.id)}"
        >
          View Agent
        </a>

        <a
          class="button button--secondary"
          href="tel:${escapeHtml(agent.phone)}"
        >
          Call
        </a>

        <a
          class="button button--secondary"
          href="mailto:${escapeHtml(agent.email)}"
        >
          Email
        </a>
      </div>
    </aside>
  `;
}

function renderForms(property) {
  return `
    <section
      class="property-contact"
      aria-labelledby="property-contact-title"
    >
      <div class="flow-sm">
        <p class="text-eyebrow">
          Interested?
        </p>

        <h2 id="property-contact-title">
          Enquire about this property
        </h2>

        <p class="text-small">
          These forms are frontend demonstrations.
          No message or viewing request is sent yet.
        </p>
      </div>

      <div class="property-contact__grid">
        <form
          class="property-form"
          data-property-enquiry
          novalidate
        >
          <h3>
            General enquiry
          </h3>

          <input
            type="hidden"
            name="reference"
            value="${escapeHtml(property.reference)}"
          >

          <label>
            <span class="text-label">
              Name
            </span>

            <input
              name="name"
              type="text"
              autocomplete="name"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Email
            </span>

            <input
              name="email"
              type="email"
              autocomplete="email"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Phone
            </span>

            <input
              name="phone"
              type="tel"
              autocomplete="tel"
            >
          </label>

          <label>
            <span class="text-label">
              Message
            </span>

            <textarea
              name="message"
              rows="5"
              required
            >I'm interested in ${escapeHtml(property.title)} (${escapeHtml(property.reference)}).</textarea>
          </label>

          <button
            class="button"
            type="submit"
          >
            Continue Enquiry
          </button>

          <p
            class="form-status text-small"
            data-enquiry-status
            aria-live="polite"
          ></p>
        </form>

        <form
          class="property-form"
          data-viewing-request
          novalidate
        >
          <h3>
            Request a viewing
          </h3>

          <label>
            <span class="text-label">
              Name
            </span>

            <input
              name="name"
              type="text"
              autocomplete="name"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Email
            </span>

            <input
              name="email"
              type="email"
              autocomplete="email"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Phone
            </span>

            <input
              name="phone"
              type="tel"
              autocomplete="tel"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Preferred date
            </span>

            <input
              name="date"
              type="date"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Preferred time
            </span>

            <input
              name="time"
              type="time"
              required
            >
          </label>

          <label>
            <span class="text-label">
              Message
            </span>

            <textarea
              name="message"
              rows="4"
            ></textarea>
          </label>

          <button
            class="button"
            type="submit"
          >
            Continue Viewing Request
          </button>

          <p
            class="form-status text-small"
            data-viewing-status
            aria-live="polite"
          ></p>
        </form>
      </div>
    </section>
  `;
}

function renderProperty(property) {
  const target =
    select(
      "[data-property-content]"
    );

  const breadcrumb =
    select(
      "[data-breadcrumb-current]"
    );

  if (!target) {
    return;
  }

  const agent =
    getAgentById(
      property.agentId
    );

  const status =
    PUBLIC_STATUS_LABELS[
      property.publicStatus
    ] ?? "";

  const facts =
    buildKeyFacts(property);

  const features =
    property.features ?? [];

  const similar =
    getSimilarPublicProperties(
      property,
      3
    );

  const saved =
    isPropertySaved(
      property.id
    );

  breadcrumb.textContent =
    property.reference;

  document.title =
    `${property.title} | LarHub`;

  target.innerHTML = `
    ${renderGallery(property.images)}

    <section class="property-summary">
      <div class="property-summary__main">
        ${
          status
            ? `
              <p class="property-summary__status text-eyebrow">
                ${escapeHtml(status)}
              </p>
            `
            : ""
        }

        <h1>
          ${escapeHtml(property.title)}
        </h1>

        <p class="text-body-lg">
          ${escapeHtml(formatLocation(property.location))}
        </p>

        <p class="text-price-lg text-tabular">
          ${escapeHtml(
            formatPropertyPrice(
              property.price,
              property.pricePeriod
            )
          )}
        </p>

        <p class="text-small">
          Ref ${escapeHtml(property.reference)}
        </p>
      </div>

      <div class="property-summary__actions">
        <button
          class="button button--secondary"
          type="button"
          data-property-save
          aria-pressed="${saved}"
        >
          ${saved ? "Saved" : "Save Property"}
        </button>

        <button
          class="button button--tertiary"
          type="button"
          data-copy-property-link
        >
          Copy Link
        </button>

        <p
          class="text-small"
          data-share-status
          aria-live="polite"
        ></p>
      </div>
    </section>

    <div class="property-detail-layout">
      <div class="property-detail-main">
        <section
          class="property-section"
          aria-labelledby="property-facts-title"
        >
          <h2 id="property-facts-title">
            Key facts
          </h2>

          <dl class="property-facts">
            ${facts
              .map(
                (fact) => `
                  <div class="property-fact">
                    <dt>
                      ${escapeHtml(fact.label)}
                    </dt>

                    <dd>
                      ${escapeHtml(fact.value)}
                    </dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </section>

        <section
          class="property-section"
          aria-labelledby="property-description-title"
        >
          <h2 id="property-description-title">
            About this property
          </h2>

          <p class="text-measure">
            ${escapeHtml(
              property.description
              ?? "This LarHub demonstration listing includes structured property information and is ready for a fuller backend-driven description later."
            )}
          </p>
        </section>

        <section
          class="property-section"
          aria-labelledby="property-features-title"
        >
          <h2 id="property-features-title">
            Features
          </h2>

          <ul class="property-features">
            ${features
              .map(
                (feature) => `
                  <li>
                    ${escapeHtml(feature)}
                  </li>
                `
              )
              .join("")}
          </ul>
        </section>

        <section
          class="property-section"
          aria-labelledby="property-location-title"
        >
          <h2 id="property-location-title">
            Location
          </h2>

          <p class="text-body-lg">
            ${escapeHtml(formatLocation(property.location))}
          </p>

          <p class="text-small text-measure">
            LarHub is not displaying a fake map in this frontend build.
            A real map or geospatial integration can be connected later
            if the backend/product scope requires it.
          </p>
        </section>
      </div>

      <div class="property-detail-aside">
        ${renderAgentPanel(agent)}
      </div>
    </div>

    ${renderForms(property)}

    <section
      class="property-similar"
      aria-labelledby="similar-properties-title"
    >
      <div class="property-similar__heading">
        <div>
          <p class="text-eyebrow">
            Keep exploring
          </p>

          <h2 id="similar-properties-title">
            Similar properties
          </h2>
        </div>

        <a
          class="text-link"
          href="/properties.html"
        >
          View all properties
        </a>
      </div>

      <div class="grid grid-3">
        ${similar
          .map(
            renderPropertyCard
          )
          .join("")}
      </div>
    </section>
  `;

  target.hidden = false;

  initPropertyGallery(
    property.images ?? []
  );

  initSaveButton(property.id);
  initCopyLink();
  initDemoForms(property);
}

function initSaveButton(
  propertyId
) {
  const button =
    select(
      "[data-property-save]"
    );

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {
      const next =
        !isPropertySaved(
          propertyId
        );

      setPropertySaved(
        propertyId,
        next
      );

      button.setAttribute(
        "aria-pressed",
        String(next)
      );

      button.textContent =
        next
          ? "Saved"
          : "Save Property";
    }
  );
}

function initCopyLink() {
  const button =
    select(
      "[data-copy-property-link]"
    );

  const status =
    select(
      "[data-share-status]"
    );

  if (
    !button
    || !status
  ) {
    return;
  }

  button.addEventListener(
    "click",
    async () => {
      try {
        await navigator.clipboard.writeText(
          window.location.href
        );

        status.textContent =
          "Property link copied.";
      } catch {
        status.textContent =
          "Copy is unavailable in this browser.";
      }
    }
  );
}

function bindDemoForm(
  selector,
  statusSelector,
  property,
  type
) {
  const form =
    select(selector);

  const status =
    select(statusSelector);

  if (
    !form
    || !status
  ) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();

        status.textContent =
          "Please complete the required fields.";

        return;
      }

      const formData =
        new FormData(form);

      createDemoEnquiry({
        type,
        propertyId:
          property.id,
        propertyReference:
          property.reference,
        propertyTitle:
          property.title,
        name:
          formData.get("name"),
        email:
          formData.get("email"),
        phone:
          formData.get("phone"),
        preferredDate:
          formData.get("date"),
        preferredTime:
          formData.get("time"),
        message:
          formData.get("message")
      });

      status.textContent =
        type === "viewing"
          ? "Your viewing request was saved locally for Demo Access. It has not been scheduled or sent."
          : "Your enquiry was saved locally for Demo Access. It has not been sent.";
    }
  );
}

function initDemoForms(
  property
) {
  bindDemoForm(
    "[data-property-enquiry]",
    "[data-enquiry-status]",
    property,
    "enquiry"
  );

  bindDemoForm(
    "[data-viewing-request]",
    "[data-viewing-status]",
    property,
    "viewing"
  );
}

function showNotFound() {
  select(
    "[data-property-loading]"
  )?.setAttribute(
    "hidden",
    ""
  );

  const notFound =
    select(
      "[data-property-not-found]"
    );

  if (notFound) {
    notFound.hidden = false;
  }
}

function initPropertyDetails() {
  const propertyId =
    getQueryParam("id");

  if (!propertyId) {
    showNotFound();

    return;
  }

  const property =
    getPropertyById(propertyId);

  if (
    !property
    || !isPublicProperty(property)
  ) {
    showNotFound();

    return;
  }

  select(
    "[data-property-loading]"
  )?.setAttribute(
    "hidden",
    ""
  );

  recordRecentlyViewed(
    property.id
  );

  renderProperty(property);
}

onReady(initPropertyDetails);
