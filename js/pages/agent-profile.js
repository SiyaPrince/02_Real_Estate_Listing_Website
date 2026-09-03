/**
 * LarHub Public Agent Profile
 */

import {
  renderPropertyCard
} from "../components/property-card.js";

import {
  getPublicAgentProfile
} from "../services/agent-service.js";

import {
  getPublicPropertiesByAgent
} from "../services/property-service.js";

import {
  onReady,
  select
} from "../utils/dom.js";

import {
  getQueryParam
} from "../utils/url.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAgentProfile(
  agent
) {
  const target =
    select(
      "[data-agent-profile-content]"
    );

  const breadcrumb =
    select(
      "[data-agent-breadcrumb]"
    );

  if (!target) {
    return;
  }

  const listings =
    getPublicPropertiesByAgent(
      agent.id
    );

  breadcrumb.textContent =
    agent.name;

  document.title =
    `${agent.name} | LarHub`;

  target.innerHTML = `
    <section
      class="agent-profile-hero"
      aria-labelledby="agent-profile-title"
    >
      <div class="agent-profile-hero__media media-agent">
        <img
          src="${escapeHtml(agent.photo)}"
          alt="${escapeHtml(agent.name)}"
        >
      </div>

      <div class="agent-profile-hero__content">
        <p class="text-eyebrow">
          ${escapeHtml(agent.role)}
        </p>

        <h1 id="agent-profile-title">
          ${escapeHtml(agent.name)}
        </h1>

        <p class="text-body-lg">
          ${escapeHtml(agent.agency)}
        </p>

        <p>
          ${escapeHtml(
            (agent.areasServed ?? [])
              .join(" · ")
          )}
        </p>

        <p class="text-small">
          ${agent.activeListingCount}
          active listing${
            agent.activeListingCount === 1
              ? ""
              : "s"
          }
        </p>

        <div class="agent-profile-hero__actions">
          <a
            class="button"
            href="tel:${escapeHtml(agent.phone)}"
          >
            Call Agent
          </a>

          <a
            class="button button--secondary"
            href="mailto:${escapeHtml(agent.email)}"
          >
            Email Agent
          </a>
        </div>
      </div>
    </section>

    <div class="agent-profile-layout">
      <div class="agent-profile-main">
        <section
          class="agent-profile-section"
          aria-labelledby="agent-about-title"
        >
          <p class="text-eyebrow">
            About
          </p>

          <h2 id="agent-about-title">
            About ${escapeHtml(agent.name)}
          </h2>

          <p class="text-measure">
            ${escapeHtml(agent.biography)}
          </p>
        </section>

        <section
          class="agent-profile-section"
          aria-labelledby="agent-specialisations-title"
        >
          <p class="text-eyebrow">
            Expertise
          </p>

          <h2 id="agent-specialisations-title">
            Specialisations
          </h2>

          <ul class="agent-profile-tags">
            ${(agent.specialisations ?? [])
              .map(
                (item) => `
                  <li>
                    ${escapeHtml(item)}
                  </li>
                `
              )
              .join("")}
          </ul>
        </section>

        <section
          class="agent-profile-section"
          aria-labelledby="agent-areas-title"
        >
          <p class="text-eyebrow">
            Areas served
          </p>

          <h2 id="agent-areas-title">
            Property areas
          </h2>

          <ul class="agent-profile-tags">
            ${(agent.areasServed ?? [])
              .map(
                (item) => `
                  <li>
                    ${escapeHtml(item)}
                  </li>
                `
              )
              .join("")}
          </ul>
        </section>
      </div>

      <aside class="agent-profile-contact">
        <p class="text-eyebrow">
          Contact
        </p>

        <h2>
          Speak with ${escapeHtml(agent.name)}
        </h2>

        <dl>
          <div>
            <dt>
              Phone
            </dt>

            <dd>
              <a href="tel:${escapeHtml(agent.phone)}">
                ${escapeHtml(agent.phone)}
              </a>
            </dd>
          </div>

          <div>
            <dt>
              Email
            </dt>

            <dd class="text-break">
              <a href="mailto:${escapeHtml(agent.email)}">
                ${escapeHtml(agent.email)}
              </a>
            </dd>
          </div>

          <div>
            <dt>
              Agency
            </dt>

            <dd>
              ${escapeHtml(agent.agency)}
            </dd>
          </div>
        </dl>
      </aside>
    </div>

    <section
      class="agent-profile-listings"
      aria-labelledby="agent-listings-title"
    >
      <div class="agent-profile-listings__heading">
        <div>
          <p class="text-eyebrow">
            Current inventory
          </p>

          <h2 id="agent-listings-title">
            Active listings
          </h2>
        </div>

        <a
          class="text-link"
          href="/properties.html"
        >
          Browse all properties
        </a>
      </div>

      ${
        listings.length
          ? `
            <div class="grid grid-3">
              ${listings
                .map(renderPropertyCard)
                .join("")}
            </div>
          `
          : `
            <div class="empty-state">
              <h3>
                No active listings
              </h3>

              <p>
                This agent currently has no active public listings.
              </p>
            </div>
          `
      }
    </section>
  `;

  target.hidden = false;
}

function showNotFound() {
  select(
    "[data-agent-profile-loading]"
  )?.setAttribute(
    "hidden",
    ""
  );

  const notFound =
    select(
      "[data-agent-profile-not-found]"
    );

  if (notFound) {
    notFound.hidden = false;
  }
}

function initAgentProfile() {
  const agentId =
    getQueryParam("id");

  if (!agentId) {
    showNotFound();

    return;
  }

  const agent =
    getPublicAgentProfile(
      agentId
    );

  if (!agent) {
    showNotFound();

    return;
  }

  select(
    "[data-agent-profile-loading]"
  )?.setAttribute(
    "hidden",
    ""
  );

  renderAgentProfile(agent);
}

onReady(initAgentProfile);
