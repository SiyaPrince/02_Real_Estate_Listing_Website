/**
 * LarHub Demo Agent Profile Service
 */

import {
  getAgentById
} from "./agent-service.js";

import {
  DEMO_AGENT_ID
} from "./agent-listing-service.js";

const STORAGE_KEY =
  "larhub.demoAgentProfile";

export function getDemoAgentProfile() {
  const base =
    getAgentById(
      DEMO_AGENT_ID
    ) ?? {};

  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return {
        ...base
      };
    }

    return {
      ...base,
      ...JSON.parse(raw)
    };
  } catch {
    return {
      ...base
    };
  }
}

export function saveDemoAgentProfile(
  profile
) {
  const next = {
    ...getDemoAgentProfile(),
    ...profile
  };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next)
    );
  } catch {
    // Keep demo UI non-blocking.
  }

  return next;
}
