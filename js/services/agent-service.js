/**
 * LarHub Agent Service
 */

import {
  agents
} from "../data/agents.js";

import {
  getPublicPropertiesByAgent
} from "./property-service.js";

function withPublicListingCount(agent) {
  return {
    ...agent,
    activeListingCount:
      getPublicPropertiesByAgent(
        agent.id
      ).length
  };
}

/**
 * Return approved public agents with active listing counts.
 *
 * @returns {object[]}
 */
export function getPublicAgents() {
  return agents
    .filter(
      (agent) =>
        agent.accountStatus === "approved"
    )
    .map(withPublicListingCount);
}

/**
 * Return one agent by ID.
 *
 * @param {string} id
 * @returns {object|null}
 */
export function getAgentById(id) {
  return (
    agents.find(
      (agent) => agent.id === id
    ) ?? null
  );
}

/**
 * Return an approved public agent profile.
 *
 * @param {string} id
 * @returns {object|null}
 */
export function getPublicAgentProfile(id) {
  const agent =
    getAgentById(id);

  if (
    !agent
    || agent.accountStatus
      !== "approved"
  ) {
    return null;
  }

  return withPublicListingCount(agent);
}

/**
 * Search approved public agents.
 *
 * Search matches:
 * - name
 * - agency
 * - areas served
 *
 * @param {string} query
 * @returns {object[]}
 */
export function searchPublicAgents(
  query = ""
) {
  const normalized =
    String(query)
      .trim()
      .toLowerCase();

  const publicAgents =
    getPublicAgents();

  if (!normalized) {
    return publicAgents;
  }

  return publicAgents.filter(
    (agent) => {
      const haystack = [
        agent.name,
        agent.agency,
        ...(agent.areasServed ?? [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(
        normalized
      );
    }
  );
}
