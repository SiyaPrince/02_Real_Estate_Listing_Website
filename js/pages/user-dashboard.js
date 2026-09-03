/**
 * LarHub User Application
 *
 * Increment 9
 */

import {
  renderAppNavigation
} from "../components/app-navigation.js";

import {
  renderPropertyCard
} from "../components/property-card.js";

import {
  getDemoSession
} from "../services/auth-service.js";

import {
  clearDemoEnquiries,
  getDemoEnquiries
} from "../services/enquiry-service.js";

import {
  getDemoUserProfile,
  saveDemoUserProfile
} from "../services/profile-service.js";

import {
  getPropertyById,
  isPublicProperty
} from "../services/property-service.js";

import {
  getRecentlyViewedIds,
  clearRecentlyViewed
} from "../features/recently-viewed.js";

import {
  getSavedPropertyIds
} from "../features/saved-properties.js";

import {
  onReady,
  select
} from "../utils/dom.js";

function getPublicPropertiesByIds(
  ids
) {
  return ids
    .map(getPropertyById)
    .filter(
      (property) =>
        property
        && isPublicProperty(property)
    );
}

function renderAccessNote() {
  const target =
    select(
      "[data-user-access-note]"
    );

  if (!target) {
    return;
  }

  const session =
    getDemoSession();

  const validDemo =
    session?.mode === "demo"
    && session.role === "user";

  if (validDemo) {
    target.hidden = true;

    return;
  }

  target.hidden = false;

  target.innerHTML = `
    <strong>
      User Demo Access is not active.
    </strong>

    <span>
      This workspace remains visible as frontend UI,
      but use Demo Access from the sign-in page to
      preview the intended user flow.
    </span>

    <a
      class="text-link"
      href="/auth/login.html"
    >
      Open Demo Access
    </a>
  `;
}

function renderOverview() {
  const savedCount =
    select(
      "[data-user-saved-count]"
    );

  const recentCount =
    select(
      "[data-user-recent-count]"
    );

  const enquiryCount =
    select(
      "[data-user-enquiry-count]"
    );

  const recentPreview =
    select(
      "[data-user-recent-preview]"
    );

  if (savedCount) {
    savedCount.textContent =
      String(
        getSavedPropertyIds()
          .length
      );
  }

  if (recentCount) {
    recentCount.textContent =
      String(
        getRecentlyViewedIds()
          .length
      );
  }

  if (enquiryCount) {
    enquiryCount.textContent =
      String(
        getDemoEnquiries()
          .length
      );
  }

  if (recentPreview) {
    const properties =
      getPublicPropertiesByIds(
        getRecentlyViewedIds()
      ).slice(0, 3);

    if (properties.length) {
      recentPreview.innerHTML =
        properties
          .map(renderPropertyCard)
          .join("");
    } else {
      recentPreview.innerHTML = `
        <div class="empty-state">
          <h3>
            Nothing viewed yet
          </h3>

          <p>
            Open Property Details pages to build
            your local browsing history.
          </p>

          <a
            class="button button--secondary"
            href="/properties.html"
          >
            Browse Properties
          </a>
        </div>
      `;
    }
  }
}

function renderSaved() {
  const grid =
    select(
      "[data-user-saved-grid]"
    );

  const empty =
    select(
      "[data-user-saved-empty]"
    );

  if (
    !grid
    || !empty
  ) {
    return;
  }

  const properties =
    getPublicPropertiesByIds(
      getSavedPropertyIds()
    );

  grid.innerHTML =
    properties
      .map(renderPropertyCard)
      .join("");

  grid.hidden =
    properties.length === 0;

  empty.hidden =
    properties.length !== 0;
}

function renderRecent() {
  const grid =
    select(
      "[data-user-recent-grid]"
    );

  const empty =
    select(
      "[data-user-recent-empty]"
    );

  if (
    !grid
    || !empty
  ) {
    return;
  }

  const properties =
    getPublicPropertiesByIds(
      getRecentlyViewedIds()
    );

  grid.innerHTML =
    properties
      .map(renderPropertyCard)
      .join("");

  grid.hidden =
    properties.length === 0;

  empty.hidden =
    properties.length !== 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  const list =
    select(
      "[data-user-enquiries]"
    );

  const empty =
    select(
      "[data-user-enquiries-empty]"
    );

  if (
    !list
    || !empty
  ) {
    return;
  }

  const records =
    getDemoEnquiries();

  list.innerHTML =
    records
      .map(
        (record) => `
          <article class="user-enquiry">
            <div class="user-enquiry__heading">
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
                    || "Property"
                  )}
                </h3>
              </div>

              <span class="status-badge">
                Local demo
              </span>
            </div>

            <dl class="user-enquiry__meta">
              <div>
                <dt>
                  Created
                </dt>

                <dd>
                  ${escapeHtml(
                    formatDate(
                      record.createdAt
                    )
                  )}
                </dd>
              </div>

              ${
                record.propertyReference
                  ? `
                    <div>
                      <dt>
                        Reference
                      </dt>

                      <dd>
                        ${escapeHtml(
                          record.propertyReference
                        )}
                      </dd>
                    </div>
                  `
                  : ""
              }

              ${
                record.preferredDate
                  ? `
                    <div>
                      <dt>
                        Preferred date
                      </dt>

                      <dd>
                        ${escapeHtml(
                          record.preferredDate
                        )}
                        ${
                          record.preferredTime
                            ? ` at ${escapeHtml(
                                record.preferredTime
                              )}`
                            : ""
                        }
                      </dd>
                    </div>
                  `
                  : ""
              }
            </dl>

            ${
              record.message
                ? `
                  <p class="user-enquiry__message">
                    ${escapeHtml(
                      record.message
                    )}
                  </p>
                `
                : ""
            }

            ${
              record.propertyId
                ? `
                  <a
                    class="text-link"
                    href="/property.html?id=${encodeURIComponent(
                      record.propertyId
                    )}"
                  >
                    View property
                  </a>
                `
                : ""
            }
          </article>
        `
      )
      .join("");

  list.hidden =
    records.length === 0;

  empty.hidden =
    records.length !== 0;
}

function initProfile() {
  const form =
    select(
      "[data-user-profile-form]"
    );

  const status =
    select(
      "[data-user-profile-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  const profile =
    getDemoUserProfile();

  for (
    const [key, value]
    of Object.entries(profile)
  ) {
    if (
      form.elements[key]
    ) {
      form.elements[key].value =
        value ?? "";
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

      const nextProfile = {
        name:
          form.elements.name.value
            .trim(),
        email:
          form.elements.email.value
            .trim(),
        phone:
          form.elements.phone.value
            .trim(),
        preferredLocation:
          form.elements.preferredLocation.value
            .trim(),
        preferredListingType:
          form.elements.preferredListingType.value
      };

      saveDemoUserProfile(
        nextProfile
      );

      status.textContent =
        "Demo profile saved locally in this browser. No server account was updated.";
    }
  );
}

function initUserActions() {
  select(
    "[data-clear-recent]"
  )?.addEventListener(
    "click",
    () => {
      clearRecentlyViewed();
      renderRecent();
    }
  );

  select(
    "[data-clear-enquiries]"
  )?.addEventListener(
    "click",
    () => {
      clearDemoEnquiries();
      renderEnquiries();
    }
  );
}

function initUserApplication() {
  renderAppNavigation(
    "user"
  );

  renderAccessNote();

  const page =
    document.body.dataset.userPage;

  if (page === "overview") {
    renderOverview();
  }

  if (page === "saved") {
    renderSaved();
  }

  if (page === "recent") {
    renderRecent();
  }

  if (page === "enquiries") {
    renderEnquiries();
  }

  if (page === "profile") {
    initProfile();
  }

  initUserActions();
}

onReady(initUserApplication);
