/**
 * LarHub Demo Admin Service
 *
 * Increment 11 — Admin Application
 *
 * Provides browser-local moderation and management state.
 * It does not mutate the source public marketplace dataset.
 */

import {
  getProperties
} from "./property-service.js";

import {
  getPublicAgents
} from "./agent-service.js";

const PROPERTY_KEY =
  "larhub.demoAdminPropertyState";

const AGENT_KEY =
  "larhub.demoAdminAgentState";

const USER_KEY =
  "larhub.demoAdminUsers";

const SETTINGS_KEY =
  "larhub.demoAdminSettings";

const DEFAULT_USERS = [
  {
    id: "user-001",
    name: "Demo User",
    email: "demo.user@example.com",
    role: "user",
    status: "active",
    createdAt: "2026-08-20"
  },
  {
    id: "user-002",
    name: "Nandi Khumalo",
    email: "nandi.khumalo@example.com",
    role: "user",
    status: "active",
    createdAt: "2026-08-22"
  },
  {
    id: "user-003",
    name: "Musa Dube",
    email: "musa.dube@example.com",
    role: "user",
    status: "suspended",
    createdAt: "2026-08-24"
  },
  {
    id: "user-004",
    name: "Keitumetse Molefe",
    email: "keitumetse.molefe@example.com",
    role: "user",
    status: "active",
    createdAt: "2026-08-28"
  }
];

const DEFAULT_SETTINGS = {
  marketplaceName: "LarHub",
  supportEmail: "support@example.com",
  allowDemoRegistration: true,
  requireAgentApproval: true,
  requireListingApproval: true
};

function readJson(
  key,
  fallback
) {
  try {
    const raw =
      window.localStorage.getItem(
        key
      );

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(
  key,
  value
) {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch {
    // Keep demo UI non-blocking.
  }
}

export function getAdminProperties() {
  const overrides =
    readJson(
      PROPERTY_KEY,
      {}
    );

  return getProperties()
    .map(
      (property) => ({
        ...property,
        adminState: {
          status:
            overrides[
              property.id
            ]?.status
            ?? property.moderationStatus,
          reason:
            overrides[
              property.id
            ]?.reason
            ?? ""
        }
      })
    );
}

export function updateAdminPropertyState(
  propertyId,
  status,
  reason = ""
) {
  const overrides =
    readJson(
      PROPERTY_KEY,
      {}
    );

  overrides[propertyId] = {
    status,
    reason,
    updatedAt:
      new Date().toISOString()
  };

  writeJson(
    PROPERTY_KEY,
    overrides
  );

  return overrides[
    propertyId
  ];
}

export function getAdminAgents() {
  const overrides =
    readJson(
      AGENT_KEY,
      {}
    );

  return getPublicAgents()
    .map(
      (agent) => ({
        ...agent,
        adminState: {
          status:
            overrides[
              agent.id
            ]?.status
            ?? agent.accountStatus
        }
      })
    );
}

export function updateAdminAgentState(
  agentId,
  status
) {
  const overrides =
    readJson(
      AGENT_KEY,
      {}
    );

  overrides[agentId] = {
    status,
    updatedAt:
      new Date().toISOString()
  };

  writeJson(
    AGENT_KEY,
    overrides
  );

  return overrides[
    agentId
  ];
}

export function getAdminUsers() {
  const stored =
    readJson(
      USER_KEY,
      null
    );

  return Array.isArray(stored)
    ? stored
    : [...DEFAULT_USERS];
}

export function updateAdminUserStatus(
  userId,
  status
) {
  const users =
    getAdminUsers();

  const next =
    users.map(
      (user) => (
        user.id === userId
          ? {
              ...user,
              status
            }
          : user
      )
    );

  writeJson(
    USER_KEY,
    next
  );

  return next;
}

export function getAdminSettings() {
  return {
    ...DEFAULT_SETTINGS,
    ...readJson(
      SETTINGS_KEY,
      {}
    )
  };
}

export function saveAdminSettings(
  settings
) {
  const next = {
    ...getAdminSettings(),
    ...settings
  };

  writeJson(
    SETTINGS_KEY,
    next
  );

  return next;
}

export function resetAdminDemoState() {
  [
    PROPERTY_KEY,
    AGENT_KEY,
    USER_KEY,
    SETTINGS_KEY
  ].forEach(
    (key) => {
      try {
        window.localStorage.removeItem(
          key
        );
      } catch {
        // No blocking behavior.
      }
    }
  );
}
