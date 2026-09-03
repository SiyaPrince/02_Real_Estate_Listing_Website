/**
 * LarHub Agent Service
 */
import {
  agents
} from "../data/agents.js";

import {
  getPublicPropertiesByAgent
} from "./property-service.js";

export function getPublicAgents() {
  return agents.filter(
    (agent) => agent.accountStatus === "approved"
  );
}

export function getAgentById(id) {
  return (
    agents.find(
      (agent) => agent.id === id
    ) ?? null
  );
}

export function getPublicAgentProfile(id) {
  const agent = getAgentById(id);

  if (!agent) {
    return null;
  }

  return {
    ...agent,
    activeListingCount:
      getPublicPropertiesByAgent(id).length
  };
}
