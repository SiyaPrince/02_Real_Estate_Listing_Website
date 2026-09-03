/**
 * LarHub Agent Application
 *
 * Increment 10
 */

import {
  renderAppNavigation
} from "../components/app-navigation.js";

import {
  getDemoSession
} from "../services/auth-service.js";

import {
  getDemoEnquiries
} from "../services/enquiry-service.js";

import {
  getDemoAgentProfile,
  saveDemoAgentProfile
} from "../services/agent-profile-service.js";

import {
  createDemoAgentListing,
  DEMO_AGENT_ID,
  getDemoAgentListingById,
  getDemoAgentListings,
  resetDemoAgentListings,
  saveDemoAgentListing,
  updateDemoListingStatus
} from "../services/agent-listing-service.js";

import {
  formatPropertyPrice
} from "../utils/currency.js";

import {
  getQueryParam
} from "../utils/url.js";

import {
  onReady,
  select
} from "../utils/dom.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLocation(
  listing
) {
  return [
    listing.location?.suburb,
    listing.location?.city
  ]
    .filter(Boolean)
    .join(", ");
}

function statusLabel(
  status
) {
  const labels = {
    published: "Published",
    "under-offer": "Under Offer",
    draft: "Draft",
    sold: "Sold",
    rented: "Rented"
  };

  return labels[status]
    ?? status;
}

function renderAccessNote() {
  const target =
    select(
      "[data-agent-access-note]"
    );

  if (!target) {
    return;
  }

  const session =
    getDemoSession();

  const valid =
    session?.mode === "demo"
    && session.role === "agent";

  if (valid) {
    target.hidden = true;

    return;
  }

  target.hidden = false;

  target.innerHTML = `
    <strong>
      Agent Demo Access is not active.
    </strong>

    <span>
      The workspace is still visible for frontend review,
      but Demo Access should be used to preview the intended
      Agent flow.
    </span>

    <a
      class="text-link"
      href="/auth/login.html"
    >
      Open Demo Access
    </a>
  `;
}

function getAgentEnquiries() {
  const listingIds =
    new Set(
      getDemoAgentListings()
        .map(
          (listing) => listing.id
        )
    );

  return getDemoEnquiries()
    .filter(
      (record) =>
        listingIds.has(
          record.propertyId
        )
    );
}

function renderListingCard(
  listing
) {
  const closed =
    listing.lifecycleStatus
      === "sold"
    || listing.lifecycleStatus
      === "rented";

  return `
    <article
      class="agent-listing"
      data-agent-listing-id="${escapeHtml(listing.id)}"
    >
      <div class="agent-listing__media">
        <img
          src="${escapeHtml(
            listing.images?.[0]
            ?? "/assets/images/properties/property-placeholder.svg"
          )}"
          alt="${escapeHtml(listing.title)}"
        >
      </div>

      <div class="agent-listing__body">
        <div class="agent-listing__heading">
          <div>
            <span
              class="status-badge status-badge--${escapeHtml(listing.lifecycleStatus)}"
            >
              ${escapeHtml(
                statusLabel(
                  listing.lifecycleStatus
                )
              )}
            </span>

            <h3>
              ${escapeHtml(listing.title)}
            </h3>

            <p class="text-small">
              ${escapeHtml(
                formatLocation(listing)
              )}
            </p>
          </div>

          <p class="text-price">
            ${escapeHtml(
              formatPropertyPrice(
                listing.price,
                listing.pricePeriod
              )
            )}
          </p>
        </div>

        <div class="agent-listing__meta text-small">
          <span>
            Ref ${escapeHtml(listing.reference)}
          </span>

          <span>
            ${escapeHtml(listing.propertyType)}
          </span>
        </div>

        <div class="agent-listing__actions">
          <a
            class="button button--secondary button--sm"
            href="/agent/property-form.html?id=${encodeURIComponent(listing.id)}"
          >
            Edit
          </a>

          ${
            !closed
              ? `
                <select
                  aria-label="Change lifecycle status for ${escapeHtml(listing.title)}"
                  data-agent-status-select
                  data-listing-id="${escapeHtml(listing.id)}"
                >
                  <option value="published" ${
                    listing.lifecycleStatus === "published"
                      ? "selected"
                      : ""
                  }>
                    Published
                  </option>

                  <option value="under-offer" ${
                    listing.lifecycleStatus === "under-offer"
                      ? "selected"
                      : ""
                  }>
                    Under Offer
                  </option>

                  <option value="draft" ${
                    listing.lifecycleStatus === "draft"
                      ? "selected"
                      : ""
                  }>
                    Draft
                  </option>

                  <option value="sold">
                    Sold
                  </option>

                  <option value="rented">
                    Rented
                  </option>
                </select>
              `
              : `
                <select
                  aria-label="Change lifecycle status for ${escapeHtml(listing.title)}"
                  data-agent-status-select
                  data-listing-id="${escapeHtml(listing.id)}"
                >
                  <option value="${escapeHtml(listing.lifecycleStatus)}" selected>
                    ${escapeHtml(
                      statusLabel(
                        listing.lifecycleStatus
                      )
                    )}
                  </option>

                  <option value="published">
                    Return to Published
                  </option>

                  <option value="draft">
                    Move to Draft
                  </option>
                </select>
              `
          }
        </div>
      </div>
    </article>
  `;
}

function renderOverview() {
  const listings =
    getDemoAgentListings();

  const active =
    listings.filter(
      (listing) =>
        listing.lifecycleStatus
          === "published"
    ).length;

  const underOffer =
    listings.filter(
      (listing) =>
        listing.lifecycleStatus
          === "under-offer"
    ).length;

  const enquiries =
    getAgentEnquiries();

  const activeTarget =
    select(
      "[data-agent-active-count]"
    );

  const offerTarget =
    select(
      "[data-agent-offer-count]"
    );

  const enquiryTarget =
    select(
      "[data-agent-enquiry-count]"
    );

  const recentTarget =
    select(
      "[data-agent-overview-listings]"
    );

  if (activeTarget) {
    activeTarget.textContent =
      String(active);
  }

  if (offerTarget) {
    offerTarget.textContent =
      String(underOffer);
  }

  if (enquiryTarget) {
    enquiryTarget.textContent =
      String(enquiries.length);
  }

  if (recentTarget) {
    recentTarget.innerHTML =
      listings
        .slice(0, 3)
        .map(renderListingCard)
        .join("");
  }
}

function renderListings() {
  const target =
    select(
      "[data-agent-listings]"
    );

  const filter =
    select(
      "[data-agent-listing-filter]"
    );

  if (
    !target
    || !filter
  ) {
    return;
  }

  const status =
    filter.value;

  const listings =
    getDemoAgentListings()
      .filter(
        (listing) =>
          !status
          || listing.lifecycleStatus
            === status
      );

  target.innerHTML =
    listings.length
      ? listings
          .map(renderListingCard)
          .join("")
      : `
        <div class="empty-state">
          <h3>
            No listings in this status
          </h3>

          <p>
            Change the status filter or add a new demo listing.
          </p>
        </div>
      `;
}

function numberOrNull(value) {
  if (
    value === ""
    || value === null
    || value === undefined
  ) {
    return null;
  }

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function populatePropertyForm() {
  const form =
    select(
      "[data-agent-property-form]"
    );

  const title =
    select(
      "[data-agent-form-title]"
    );

  if (!form) {
    return;
  }

  const listingId =
    getQueryParam("id");

  if (!listingId) {
    return;
  }

  const listing =
    getDemoAgentListingById(
      listingId
    );

  if (!listing) {
    return;
  }

  if (title) {
    title.textContent =
      "Edit property";
  }

  form.dataset.listingId =
    listing.id;

  const values = {
    title:
      listing.title,
    listingType:
      listing.listingType,
    propertyType:
      listing.propertyType,
    price:
      listing.price,
    lifecycleStatus:
      listing.lifecycleStatus,
    suburb:
      listing.location?.suburb,
    city:
      listing.location?.city,
    province:
      listing.location?.province,
    bedrooms:
      listing.facts?.bedrooms,
    bathrooms:
      listing.facts?.bathrooms,
    parking:
      listing.facts?.parking,
    floorArea:
      listing.facts?.floorArea,
    landArea:
      listing.facts?.landArea,
    features:
      (listing.features ?? [])
        .join(", "),
    description:
      listing.description ?? ""
  };

  for (
    const [key, value]
    of Object.entries(values)
  ) {
    if (
      form.elements[key]
      && value !== null
      && value !== undefined
    ) {
      form.elements[key].value =
        value;
    }
  }
}

function initPropertyForm() {
  const form =
    select(
      "[data-agent-property-form]"
    );

  const status =
    select(
      "[data-agent-property-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  populatePropertyForm();

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

      const record = {
        title:
          form.elements.title.value
            .trim(),
        listingType:
          form.elements.listingType.value,
        propertyType:
          form.elements.propertyType.value,
        price:
          Number(
            form.elements.price.value
          ),
        lifecycleStatus:
          form.elements.lifecycleStatus.value,
        location: {
          suburb:
            form.elements.suburb.value
              .trim(),
          city:
            form.elements.city.value
              .trim(),
          province:
            form.elements.province.value
              .trim()
        },
        facts: {
          bedrooms:
            numberOrNull(
              form.elements.bedrooms.value
            ),
          bathrooms:
            numberOrNull(
              form.elements.bathrooms.value
            ),
          parking:
            numberOrNull(
              form.elements.parking.value
            ),
          floorArea:
            numberOrNull(
              form.elements.floorArea.value
            ),
          landArea:
            numberOrNull(
              form.elements.landArea.value
            )
        },
        features:
          form.elements.features.value
            .split(",")
            .map(
              (feature) =>
                feature.trim()
            )
            .filter(Boolean),
        description:
          form.elements.description.value
            .trim()
      };

      const listingId =
        form.dataset.listingId;

      let saved;

      if (listingId) {
        const existing =
          getDemoAgentListingById(
            listingId
          );

        saved =
          saveDemoAgentListing({
            ...existing,
            ...record
          });
      } else {
        saved =
          createDemoAgentListing(
            record
          );

        form.dataset.listingId =
          saved.id;

        const url =
          `/agent/property-form.html?id=${encodeURIComponent(saved.id)}`;

        window.history.replaceState(
          {},
          "",
          url
        );
      }

      status.textContent =
        `Demo listing ${saved.reference} saved locally. The public marketplace dataset was not changed.`;
    }
  );
}

function formatDate(value) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-ZA",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(date);
}

function renderEnquiries() {
  const target =
    select(
      "[data-agent-enquiries]"
    );

  const empty =
    select(
      "[data-agent-enquiries-empty]"
    );

  if (
    !target
    || !empty
  ) {
    return;
  }

  const records =
    getAgentEnquiries();

  target.innerHTML =
    records
      .map(
        (record) => `
          <article class="agent-enquiry">
            <div class="agent-enquiry__heading">
              <div>
                <p class="text-eyebrow">
                  ${
                    record.type === "viewing"
                      ? "Viewing request"
                      : "Property enquiry"
                  }
                </p>

                <h3>
                  ${escapeHtml(
                    record.propertyTitle
                    || record.propertyReference
                  )}
                </h3>
              </div>

              <span class="status-badge">
                Local demo
              </span>
            </div>

            <dl class="agent-enquiry__meta">
              <div>
                <dt>
                  From
                </dt>

                <dd>
                  ${escapeHtml(record.name)}
                </dd>
              </div>

              <div>
                <dt>
                  Contact
                </dt>

                <dd class="text-break">
                  ${escapeHtml(record.email)}
                  ${
                    record.phone
                      ? `<br>${escapeHtml(record.phone)}`
                      : ""
                  }
                </dd>
              </div>

              <div>
                <dt>
                  Created
                </dt>

                <dd>
                  ${escapeHtml(
                    formatDate(record.createdAt)
                  )}
                </dd>
              </div>
            </dl>

            ${
              record.message
                ? `
                  <p class="agent-enquiry__message">
                    ${escapeHtml(record.message)}
                  </p>
                `
                : ""
            }

            <a
              class="text-link"
              href="/property.html?id=${encodeURIComponent(record.propertyId)}"
            >
              View property
            </a>
          </article>
        `
      )
      .join("");

  target.hidden =
    records.length === 0;

  empty.hidden =
    records.length !== 0;
}

function renderPerformance() {
  const listings =
    getDemoAgentListings();

  const counts = {
    published: 0,
    "under-offer": 0,
    sold: 0,
    rented: 0,
    draft: 0
  };

  listings.forEach(
    (listing) => {
      if (
        Object.hasOwn(
          counts,
          listing.lifecycleStatus
        )
      ) {
        counts[
          listing.lifecycleStatus
        ] += 1;
      }
    }
  );

  const published =
    select(
      "[data-performance-published]"
    );

  const offer =
    select(
      "[data-performance-offer]"
    );

  const closed =
    select(
      "[data-performance-closed]"
    );

  const enquiries =
    select(
      "[data-performance-enquiries]"
    );

  if (published) {
    published.textContent =
      String(counts.published);
  }

  if (offer) {
    offer.textContent =
      String(
        counts["under-offer"]
      );
  }

  if (closed) {
    closed.textContent =
      String(
        counts.sold
        + counts.rented
      );
  }

  if (enquiries) {
    enquiries.textContent =
      String(
        getAgentEnquiries()
          .length
      );
  }

  const list =
    select(
      "[data-performance-status-list]"
    );

  if (list) {
    list.innerHTML =
      Object.entries(counts)
        .map(
          ([status, count]) => `
            <div class="agent-performance-row">
              <span>
                ${escapeHtml(
                  statusLabel(status)
                )}
              </span>

              <strong class="text-tabular">
                ${count}
              </strong>
            </div>
          `
        )
        .join("");
  }
}

function initProfile() {
  const form =
    select(
      "[data-agent-profile-form]"
    );

  const status =
    select(
      "[data-agent-profile-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  const profile =
    getDemoAgentProfile();

  const values = {
    name:
      profile.name ?? "",
    agency:
      profile.agency ?? "",
    role:
      profile.role ?? "",
    phone:
      profile.phone ?? "",
    email:
      profile.email ?? "",
    areasServed:
      (profile.areasServed ?? [])
        .join(", "),
    specialisations:
      (profile.specialisations ?? [])
        .join(", "),
    biography:
      profile.biography ?? ""
  };

  for (
    const [key, value]
    of Object.entries(values)
  ) {
    if (form.elements[key]) {
      form.elements[key].value =
        value;
    }
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

      saveDemoAgentProfile({
        name:
          form.elements.name.value
            .trim(),
        agency:
          form.elements.agency.value
            .trim(),
        role:
          form.elements.role.value
            .trim(),
        phone:
          form.elements.phone.value
            .trim(),
        email:
          form.elements.email.value
            .trim(),
        areasServed:
          form.elements.areasServed.value
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),
        specialisations:
          form.elements.specialisations.value
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),
        biography:
          form.elements.biography.value
            .trim()
      });

      status.textContent =
        "Demo Agent profile saved locally. The public Agent Profile dataset was not changed.";
    }
  );
}

function initListingActions() {
  const filter =
    select(
      "[data-agent-listing-filter]"
    );

  filter?.addEventListener(
    "change",
    renderListings
  );

  document.addEventListener(
    "change",
    (event) => {
      const control =
        event.target.closest(
          "[data-agent-status-select]"
        );

      if (!control) {
        return;
      }

      updateDemoListingStatus(
        control.dataset.listingId,
        control.value
      );

      renderListings();
      renderOverview();
      renderPerformance();
    }
  );

  select(
    "[data-reset-agent-listings]"
  )?.addEventListener(
    "click",
    () => {
      resetDemoAgentListings();
      renderListings();
    }
  );
}

function initAgentApplication() {
  renderAppNavigation(
    "agent"
  );

  renderAccessNote();

  const page =
    document.body.dataset.agentPage;

  if (page === "overview") {
    renderOverview();
  }

  if (page === "listings") {
    renderListings();
  }

  if (
    page === "property-form"
  ) {
    initPropertyForm();
  }

  if (page === "enquiries") {
    renderEnquiries();
  }

  if (
    page === "performance"
  ) {
    renderPerformance();
  }

  if (page === "profile") {
    initProfile();
  }

  initListingActions();
}

onReady(initAgentApplication);
