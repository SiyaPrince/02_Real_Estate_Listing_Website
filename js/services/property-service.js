/**
 * LarHub Property Service
 */
import {
  properties
} from "../data/properties.js";

const PUBLIC_LIFECYCLE_STATES = new Set([
  "published",
  "under-offer"
]);

export function getProperties() {
  return [...properties];
}

export function getPropertyById(id) {
  return (
    properties.find(
      (property) => property.id === id
    ) ?? null
  );
}

export function isPublicProperty(property) {
  return (
    property.moderationStatus === "approved"
    && PUBLIC_LIFECYCLE_STATES.has(
      property.lifecycleStatus
    )
    && Boolean(property.publicStatus)
  );
}

export function getPublicProperties() {
  return properties.filter(isPublicProperty);
}

export function getFeaturedProperties(
  limit = 3
) {
  return getPublicProperties()
    .filter((property) => property.featured)
    .slice(0, limit);
}

export function getPublicPropertiesByAgent(
  agentId
) {
  return getPublicProperties().filter(
    (property) => property.agentId === agentId
  );
}

export function getPropertiesByAgent(
  agentId
) {
  return properties.filter(
    (property) => property.agentId === agentId
  );
}
