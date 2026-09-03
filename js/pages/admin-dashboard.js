/**
 * LarHub Admin Application
 *
 * Increment 11
 */

import {
  renderAppNavigation
} from "../components/app-navigation.js";

import {
  getDemoSession
} from "../services/auth-service.js";

import {
  getAdminActivitySummary
} from "../services/admin-activity-service.js";

import {
  getAdminAgents,
  getAdminProperties,
  getAdminSettings,
  getAdminUsers,
  resetAdminDemoState,
  saveAdminSettings,
  updateAdminAgentState,
  updateAdminPropertyState,
  updateAdminUserStatus
} from "../services/admin-service.js";

import {
  formatPropertyPrice
} from "../utils/currency.js";

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

function statusLabel(value) {
  const labels = {
    approved: "Approved",
    "pending-review": "Pending Review",
    rejected: "Rejected",
    suspended: "Suspended",
    active: "Active"
  };

  return labels[value]
    ?? value;
}

function renderAccessNote() {
  const target =
    select(
      "[data-admin-access-note]"
    );

  if (!target) {
    return;
  }

  const session =
    getDemoSession();

  const valid =
    session?.mode === "demo"
    && session.role === "admin";

  if (valid) {
    target.hidden = true;

    return;
  }

  target.hidden = false;

  target.innerHTML = `
    <strong>
      Admin Demo Access is not active.
    </strong>

    <span>
      This workspace remains visible for frontend review.
      Use Demo Access from Sign In to preview the intended
      Admin navigation state.
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
  const summary =
    getAdminActivitySummary();

  const propertyCount =
    select(
      "[data-admin-property-count]"
    );

  const agentCount =
    select(
      "[data-admin-agent-count]"
    );

  const userCount =
    select(
      "[data-admin-user-count]"
    );

  const enquiryCount =
    select(
      "[data-admin-enquiry-count]"
    );

  if (propertyCount) {
    propertyCount.textContent =
      String(
        summary.totalProperties
      );
  }

  if (agentCount) {
    agentCount.textContent =
      String(
        summary.activeAgents
      );
  }

  if (userCount) {
    userCount.textContent =
      String(
        summary.activeUsers
      );
  }

  if (enquiryCount) {
    enquiryCount.textContent =
      String(
        summary.demoEnquiries
      );
  }

  const target =
    select(
      "[data-admin-overview]"
    );

  if (target) {
    target.innerHTML = `
      <article class="admin-summary-card">
        <p class="text-small">
          Approved properties
        </p>

        <strong>
          ${summary.approvedProperties}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Pending properties
        </p>

        <strong>
          ${summary.pendingProperties}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Rejected properties
        </p>

        <strong>
          ${summary.rejectedProperties}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Suspended accounts
        </p>

        <strong>
          ${
            summary.suspendedAgents
            + summary.suspendedUsers
          }
        </strong>
      </article>
    `;
  }
}

function renderProperties() {
  const target =
    select(
      "[data-admin-properties]"
    );

  const filter =
    select(
      "[data-admin-property-filter]"
    );

  if (
    !target
    || !filter
  ) {
    return;
  }

  const status =
    filter.value;

  const properties =
    getAdminProperties()
      .filter(
        (property) =>
          !status
          || property.adminState.status
            === status
      );

  target.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>
            Property
          </th>

          <th>
            Price
          </th>

          <th>
            Lifecycle
          </th>

          <th>
            Moderation
          </th>

          <th>
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        ${properties
          .map(
            (property) => `
              <tr>
                <td>
                  <strong>
                    ${escapeHtml(property.title)}
                  </strong>

                  <span class="text-small">
                    ${escapeHtml(property.reference)}
                  </span>
                </td>

                <td>
                  ${escapeHtml(
                    formatPropertyPrice(
                      property.price,
                      property.pricePeriod
                    )
                  )}
                </td>

                <td>
                  ${escapeHtml(
                    property.lifecycleStatus
                  )}
                </td>

                <td>
                  <span class="status-badge">
                    ${escapeHtml(
                      statusLabel(
                        property.adminState.status
                      )
                    )}
                  </span>
                </td>

                <td>
                  <select
                    data-admin-property-status
                    data-property-id="${escapeHtml(property.id)}"
                    aria-label="Moderation status for ${escapeHtml(property.title)}"
                  >
                    <option
                      value="approved"
                      ${
                        property.adminState.status
                          === "approved"
                          ? "selected"
                          : ""
                      }
                    >
                      Approved
                    </option>

                    <option
                      value="pending-review"
                      ${
                        property.adminState.status
                          === "pending-review"
                          ? "selected"
                          : ""
                      }
                    >
                      Pending Review
                    </option>

                    <option
                      value="rejected"
                      ${
                        property.adminState.status
                          === "rejected"
                          ? "selected"
                          : ""
                      }
                    >
                      Rejected
                    </option>
                  </select>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderAgents() {
  const target =
    select(
      "[data-admin-agents]"
    );

  if (!target) {
    return;
  }

  const agents =
    getAdminAgents();

  target.innerHTML =
    agents
      .map(
        (agent) => `
          <article class="admin-agent-card">
            <img
              src="${escapeHtml(agent.photo)}"
              alt="${escapeHtml(agent.name)}"
            >

            <div class="admin-agent-card__content">
              <div>
                <h3>
                  ${escapeHtml(agent.name)}
                </h3>

                <p class="text-small">
                  ${escapeHtml(agent.agency)}
                </p>
              </div>

              <span class="status-badge">
                ${escapeHtml(
                  statusLabel(
                    agent.adminState.status
                  )
                )}
              </span>

              <select
                data-admin-agent-status
                data-agent-id="${escapeHtml(agent.id)}"
                aria-label="Account status for ${escapeHtml(agent.name)}"
              >
                <option
                  value="approved"
                  ${
                    agent.adminState.status
                      === "approved"
                      ? "selected"
                      : ""
                  }
                >
                  Approved
                </option>

                <option
                  value="suspended"
                  ${
                    agent.adminState.status
                      === "suspended"
                      ? "selected"
                      : ""
                  }
                >
                  Suspended
                </option>
              </select>
            </div>
          </article>
        `
      )
      .join("");
}

function renderUsers() {
  const target =
    select(
      "[data-admin-users]"
    );

  if (!target) {
    return;
  }

  const users =
    getAdminUsers();

  target.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>
            User
          </th>

          <th>
            Email
          </th>

          <th>
            Created
          </th>

          <th>
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        ${users
          .map(
            (user) => `
              <tr>
                <td>
                  <strong>
                    ${escapeHtml(user.name)}
                  </strong>
                </td>

                <td class="text-break">
                  ${escapeHtml(user.email)}
                </td>

                <td>
                  ${escapeHtml(user.createdAt)}
                </td>

                <td>
                  <select
                    data-admin-user-status
                    data-user-id="${escapeHtml(user.id)}"
                    aria-label="Status for ${escapeHtml(user.name)}"
                  >
                    <option
                      value="active"
                      ${
                        user.status === "active"
                          ? "selected"
                          : ""
                      }
                    >
                      Active
                    </option>

                    <option
                      value="suspended"
                      ${
                        user.status === "suspended"
                          ? "selected"
                          : ""
                      }
                    >
                      Suspended
                    </option>
                  </select>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderActivity() {
  const summary =
    getAdminActivitySummary();

  const values = {
    "[data-activity-pending]":
      summary.pendingProperties,
    "[data-activity-rejected]":
      summary.rejectedProperties,
    "[data-activity-agents]":
      summary.suspendedAgents,
    "[data-activity-users]":
      summary.suspendedUsers
  };

  for (
    const [selector, value]
    of Object.entries(values)
  ) {
    const target =
      select(selector);

    if (target) {
      target.textContent =
        String(value);
    }
  }

  const distribution =
    select(
      "[data-admin-activity-distribution]"
    );

  if (distribution) {
    distribution.innerHTML = `
      <article class="admin-summary-card">
        <p class="text-small">
          Total properties
        </p>

        <strong>
          ${summary.totalProperties}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Approved agents
        </p>

        <strong>
          ${summary.activeAgents}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Active users
        </p>

        <strong>
          ${summary.activeUsers}
        </strong>
      </article>

      <article class="admin-summary-card">
        <p class="text-small">
          Demo enquiries
        </p>

        <strong>
          ${summary.demoEnquiries}
        </strong>
      </article>
    `;
  }
}

function initSettings() {
  const form =
    select(
      "[data-admin-settings-form]"
    );

  const status =
    select(
      "[data-admin-settings-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  const settings =
    getAdminSettings();

  form.elements.marketplaceName.value =
    settings.marketplaceName;

  form.elements.supportEmail.value =
    settings.supportEmail;

  form.elements.allowDemoRegistration.checked =
    Boolean(
      settings.allowDemoRegistration
    );

  form.elements.requireAgentApproval.checked =
    Boolean(
      settings.requireAgentApproval
    );

  form.elements.requireListingApproval.checked =
    Boolean(
      settings.requireListingApproval
    );

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

      saveAdminSettings({
        marketplaceName:
          form.elements.marketplaceName.value
            .trim(),
        supportEmail:
          form.elements.supportEmail.value
            .trim(),
        allowDemoRegistration:
          form.elements.allowDemoRegistration.checked,
        requireAgentApproval:
          form.elements.requireAgentApproval.checked,
        requireListingApproval:
          form.elements.requireListingApproval.checked
      });

      status.textContent =
        "Admin demo settings saved locally. No production configuration was changed.";
    }
  );

  select(
    "[data-reset-admin-state]"
  )?.addEventListener(
    "click",
    () => {
      resetAdminDemoState();

      status.textContent =
        "Admin demo state reset.";

      initSettings();
    }
  );
}

function initAdminActions() {
  select(
    "[data-admin-property-filter]"
  )?.addEventListener(
    "change",
    renderProperties
  );

  document.addEventListener(
    "change",
    (event) => {
      const propertyControl =
        event.target.closest(
          "[data-admin-property-status]"
        );

      if (propertyControl) {
        updateAdminPropertyState(
          propertyControl.dataset.propertyId,
          propertyControl.value
        );

        renderProperties();
        renderOverview();
        renderActivity();

        return;
      }

      const agentControl =
        event.target.closest(
          "[data-admin-agent-status]"
        );

      if (agentControl) {
        updateAdminAgentState(
          agentControl.dataset.agentId,
          agentControl.value
        );

        renderAgents();
        renderOverview();
        renderActivity();

        return;
      }

      const userControl =
        event.target.closest(
          "[data-admin-user-status]"
        );

      if (userControl) {
        updateAdminUserStatus(
          userControl.dataset.userId,
          userControl.value
        );

        renderUsers();
        renderOverview();
        renderActivity();
      }
    }
  );
}

function initAdminApplication() {
  renderAppNavigation(
    "admin"
  );

  renderAccessNote();

  const page =
    document.body.dataset.adminPage;

  if (page === "overview") {
    renderOverview();
  }

  if (page === "properties") {
    renderProperties();
  }

  if (page === "agents") {
    renderAgents();
  }

  if (page === "users") {
    renderUsers();
  }

  if (page === "activity") {
    renderActivity();
  }

  if (page === "settings") {
    initSettings();
  }

  initAdminActions();
}

onReady(initAdminApplication);
