/**
 * LarHub Authentication UI Helpers
 */

import {
  continueWithProvider
} from "../services/auth-service.js";

export function getPasswordStrength(
  password
) {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 2) {
    return {
      key: "weak",
      label: "Weak"
    };
  }

  if (score <= 4) {
    return {
      key: "medium",
      label: "Medium"
    };
  }

  return {
    key: "strong",
    label: "Strong"
  };
}

export function validatePassword(
  password
) {
  return password.length >= 8;
}

export async function handleProviderButton(
  button,
  status
) {
  const provider =
    button.dataset.authProvider;

  if (!provider) {
    return;
  }

  status.textContent =
    `Checking ${provider} sign-in…`;

  const result =
    await continueWithProvider(
      provider
    );

  status.textContent =
    result.message;
}
