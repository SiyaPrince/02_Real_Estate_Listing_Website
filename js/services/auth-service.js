/**
 * LarHub Authentication Service
 *
 * Increment 8 — Authentication UI
 *
 * No real backend or OAuth provider is connected.
 * These functions deliberately return explicit
 * frontend-only responses.
 */

const DEMO_SESSION_KEY =
  "larhub.demoSession";

export async function loginWithEmail(
  credentials
) {
  return {
    ok: false,
    connected: false,
    action: "login",
    credentialsAcceptedLocally:
      Boolean(
        credentials?.email
        && credentials?.password
      ),
    message:
      "Email/password authentication is not connected in this frontend build."
  };
}

export async function registerAccount(
  details
) {
  return {
    ok: false,
    connected: false,
    action: "register",
    detailsAcceptedLocally:
      Boolean(
        details?.name
        && details?.email
        && details?.password
      ),
    message:
      "Account creation is not connected in this frontend build."
  };
}

export async function requestPasswordReset(
  email
) {
  return {
    ok: false,
    connected: false,
    action: "password-reset",
    emailAcceptedLocally:
      Boolean(email),
    message:
      "Password reset delivery is not connected in this frontend build."
  };
}

export async function continueWithProvider(
  provider
) {
  return {
    ok: false,
    connected: false,
    action: "provider-login",
    provider,
    message:
      `${provider} authentication is not connected in this frontend build.`
  };
}

export function startDemoSession(
  role
) {
  const allowedRoles =
    new Set([
      "user",
      "agent",
      "admin"
    ]);

  if (!allowedRoles.has(role)) {
    return null;
  }

  const session = {
    mode: "demo",
    role,
    startedAt:
      new Date().toISOString()
  };

  try {
    window.localStorage.setItem(
      DEMO_SESSION_KEY,
      JSON.stringify(session)
    );
  } catch {
    // Demo navigation can still proceed if storage is blocked.
  }

  return session;
}

export function getDemoSession() {
  try {
    const raw =
      window.localStorage.getItem(
        DEMO_SESSION_KEY
      );

    if (!raw) {
      return null;
    }

    const parsed =
      JSON.parse(raw);

    if (
      parsed?.mode !== "demo"
      || !parsed?.role
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  try {
    window.localStorage.removeItem(
      DEMO_SESSION_KEY
    );
  } catch {
    // Keep frontend demo behavior non-blocking.
  }
}
