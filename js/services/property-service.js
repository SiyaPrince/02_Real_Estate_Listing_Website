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


/**
 * Return public properties transformed by a caller-provided
 * predicate pipeline.
 *
 * This keeps pages dependent on the service layer rather than
 * importing the raw demo array.
 *
 * @param {(properties: object[]) => object[]} transform
 * @returns {object[]}
 */
export function searchPublicProperties(
  transform
) {
  const publicProperties =
    getPublicProperties();

  return typeof transform === "function"
    ? transform(publicProperties)
    : publicProperties;
}


/**
 * Return similar public properties.
 *
 * Similarity is intentionally simple for the frontend demo:
 * same city is preferred, then same property type.
 *
 * @param {object} property
 * @param {number} [limit=3]
 * @returns {object[]}
 */
export function getSimilarPublicProperties(
  property,
  limit = 3
) {
  if (!property) {
    return [];
  }

  return getPublicProperties()
    .filter(
      (candidate) =>
        candidate.id !== property.id
    )
    .map(
      (candidate) => {
        let score = 0;

        if (
          candidate.location?.city
          === property.location?.city
        ) {
          score += 2;
        }

        if (
          candidate.propertyType
          === property.propertyType
        ) {
          score += 1;
        }

        if (
          candidate.listingType
          === property.listingType
        ) {
          score += 1;
        }

        return {
          candidate,
          score
        };
      }
    )
    .sort(
      (a, b) =>
        b.score - a.score
        || new Date(
          b.candidate.listedDate
        ) - new Date(
          a.candidate.listedDate
        )
    )
    .slice(0, limit)
    .map(
      ({ candidate }) => candidate
    );
}
