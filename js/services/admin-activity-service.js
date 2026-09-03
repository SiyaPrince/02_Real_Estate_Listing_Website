/**
 * LarHub Demo Admin Activity Service
 */

import {
  getDemoEnquiries
} from "./enquiry-service.js";

import {
  getAdminAgents,
  getAdminProperties,
  getAdminUsers
} from "./admin-service.js";

export function getAdminActivitySummary() {
  const properties =
    getAdminProperties();

  const agents =
    getAdminAgents();

  const users =
    getAdminUsers();

  const enquiries =
    getDemoEnquiries();

  return {
    totalProperties:
      properties.length,
    approvedProperties:
      properties.filter(
        (property) =>
          property.adminState.status
            === "approved"
      ).length,
    pendingProperties:
      properties.filter(
        (property) =>
          property.adminState.status
            === "pending-review"
      ).length,
    rejectedProperties:
      properties.filter(
        (property) =>
          property.adminState.status
            === "rejected"
      ).length,
    activeAgents:
      agents.filter(
        (agent) =>
          agent.adminState.status
            === "approved"
      ).length,
    suspendedAgents:
      agents.filter(
        (agent) =>
          agent.adminState.status
            === "suspended"
      ).length,
    activeUsers:
      users.filter(
        (user) =>
          user.status === "active"
      ).length,
    suspendedUsers:
      users.filter(
        (user) =>
          user.status === "suspended"
      ).length,
    demoEnquiries:
      enquiries.length
  };
}
