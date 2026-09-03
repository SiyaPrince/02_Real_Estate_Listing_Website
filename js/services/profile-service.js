/**
 * LarHub Demo User Profile Service
 */

const STORAGE_KEY =
  "larhub.demoUserProfile";

const DEFAULT_PROFILE = {
  name: "Demo User",
  email: "demo.user@example.com",
  phone: "",
  preferredLocation: "",
  preferredListingType: ""
};

export function getDemoUserProfile() {
  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return {
        ...DEFAULT_PROFILE
      };
    }

    return {
      ...DEFAULT_PROFILE,
      ...JSON.parse(raw)
    };
  } catch {
    return {
      ...DEFAULT_PROFILE
    };
  }
}

export function saveDemoUserProfile(
  profile
) {
  const next = {
    ...DEFAULT_PROFILE,
    ...profile
  };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next)
    );
  } catch {
    // Keep the UI non-blocking.
  }

  return next;
}
