/**
 * LarHub URL Utilities
 */

export function getQueryParam(key) {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get(key);
}

export function getQueryParams() {
  return new URLSearchParams(
    window.location.search
  );
}

export function setQueryParams(
  values,
  {
    replace = true
  } = {}
) {
  const params =
    new URLSearchParams();

  for (
    const [key, rawValue]
    of Object.entries(values)
  ) {
    if (
      rawValue === null
      || rawValue === undefined
      || rawValue === ""
    ) {
      continue;
    }

    if (Array.isArray(rawValue)) {
      for (const value of rawValue) {
        if (value !== "") {
          params.append(
            key,
            String(value)
          );
        }
      }

      continue;
    }

    params.set(
      key,
      String(rawValue)
    );
  }

  const query =
    params.toString();

  const nextUrl =
    `${window.location.pathname}${
      query ? `?${query}` : ""
    }`;

  window.history[
    replace
      ? "replaceState"
      : "pushState"
  ](
    {},
    "",
    nextUrl
  );
}
