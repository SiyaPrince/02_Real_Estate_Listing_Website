/**
 * LarHub Agent Card
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderAgentCard(agent) {
  const areas = (agent.areasServed ?? [])
    .slice(0, 3)
    .join(" · ");

  return `
    <article
      class="agent-card"
      data-agent-id="${escapeHtml(agent.id)}"
    >
      <a
        class="agent-card__media media-agent"
        href="/agent.html?id=${encodeURIComponent(agent.id)}"
        aria-label="View ${escapeHtml(agent.name)}"
      >
        <img
          class="agent-card__image"
          src="${escapeHtml(agent.photo)}"
          alt="${escapeHtml(agent.name)}"
          loading="lazy"
        >
      </a>

      <div class="agent-card__content">
        <h3 class="agent-card__name">
          <a
            href="/agent.html?id=${encodeURIComponent(agent.id)}"
          >
            ${escapeHtml(agent.name)}
          </a>
        </h3>

        <p class="agent-card__agency text-small">
          ${escapeHtml(agent.agency)}
        </p>

        <p class="agent-card__areas text-small">
          ${escapeHtml(areas)}
        </p>

        ${
          Number.isFinite(agent.activeListingCount)
            ? `
              <p class="agent-card__count text-small">
                ${agent.activeListingCount}
                active listing${
                  agent.activeListingCount === 1 ? "" : "s"
                }
              </p>
            `
            : ""
        }

        <a
          class="text-link"
          href="/agent.html?id=${encodeURIComponent(agent.id)}"
        >
          View Profile
        </a>
      </div>
    </article>
  `;
}
