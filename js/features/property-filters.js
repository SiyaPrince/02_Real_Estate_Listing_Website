/**
 * LarHub Property Filter Logic
 */

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function matchesLocation(
  property,
  location
) {
  const query = normalize(location);

  if (!query) {
    return true;
  }

  const haystack = [
    property.location?.suburb,
    property.location?.city,
    property.location?.province
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function matchesFeatures(
  property,
  features
) {
  if (!features.length) {
    return true;
  }

  const propertyFeatures =
    (property.features ?? [])
      .map(normalize);

  return features.every(
    (feature) => {
      const query = normalize(feature);

      return propertyFeatures.some(
        (item) => item.includes(query)
      );
    }
  );
}

export function filterProperties(
  properties,
  state
) {
  return properties.filter(
    (property) => {
      if (
        state.listing
        && property.listingType
          !== state.listing
      ) {
        return false;
      }

      if (
        state.type
        && property.propertyType
          !== state.type
      ) {
        return false;
      }

      if (
        !matchesLocation(
          property,
          state.location
        )
      ) {
        return false;
      }

      if (
        Number.isFinite(state.minPrice)
        && property.price < state.minPrice
      ) {
        return false;
      }

      if (
        Number.isFinite(state.maxPrice)
        && property.price > state.maxPrice
      ) {
        return false;
      }

      if (
        Number.isFinite(state.bedrooms)
      ) {
        const bedrooms =
          property.facts?.bedrooms;

        if (
          !Number.isFinite(bedrooms)
          || bedrooms < state.bedrooms
        ) {
          return false;
        }
      }

      if (
        Number.isFinite(state.bathrooms)
      ) {
        const bathrooms =
          property.facts?.bathrooms;

        if (
          !Number.isFinite(bathrooms)
          || bathrooms < state.bathrooms
        ) {
          return false;
        }
      }

      if (
        !matchesFeatures(
          property,
          state.features
        )
      ) {
        return false;
      }

      return true;
    }
  );
}
