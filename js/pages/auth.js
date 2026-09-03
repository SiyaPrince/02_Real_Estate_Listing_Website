/**
 * LarHub Authentication Pages
 */

import {
  getPasswordStrength,
  handleProviderButton,
  validatePassword
} from "../features/auth.js";

import {
  clearFormErrors,
  focusFirstInvalidField,
  setFieldError
} from "../features/forms.js";

import {
  loginWithEmail,
  registerAccount,
  requestPasswordReset,
  startDemoSession
} from "../services/auth-service.js";

import {
  onReady,
  select,
  selectAll
} from "../utils/dom.js";

function validateEmailField(
  form
) {
  const email =
    form.elements.email;

  if (!email?.value.trim()) {
    setFieldError(
      form,
      "email",
      "Enter your email address."
    );

    return false;
  }

  if (!email.validity.valid) {
    setFieldError(
      form,
      "email",
      "Enter a valid email address."
    );

    return false;
  }

  return true;
}

function initPasswordToggles() {
  selectAll(
    "[data-password-toggle]"
  ).forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const wrapper =
            button.closest(
              ".auth-password-field"
            );

          const input =
            wrapper?.querySelector(
              "input"
            );

          if (!input) {
            return;
          }

          const showing =
            input.type === "text";

          input.type =
            showing
              ? "password"
              : "text";

          button.textContent =
            showing
              ? "Show"
              : "Hide";

          button.setAttribute(
            "aria-label",
            showing
              ? "Show password"
              : "Hide password"
          );
        }
      );
    }
  );
}

function initProviderButtons() {
  const status =
    select(
      "[data-auth-status]"
    );

  if (!status) {
    return;
  }

  selectAll(
    "[data-auth-provider]"
  ).forEach(
    (button) => {
      button.addEventListener(
        "click",
        async () => {
          await handleProviderButton(
            button,
            status
          );
        }
      );
    }
  );
}

function initLoginForm() {
  const form =
    select(
      "[data-login-form]"
    );

  const status =
    select(
      "[data-auth-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearFormErrors(form);
      status.textContent = "";

      let valid =
        validateEmailField(form);

      const password =
        form.elements.password.value;

      if (!password) {
        valid = false;

        setFieldError(
          form,
          "password",
          "Enter your password."
        );
      }

      if (!valid) {
        status.textContent =
          "Please correct the highlighted fields.";

        focusFirstInvalidField(form);

        return;
      }

      const result =
        await loginWithEmail(
          {
            email:
              form.elements.email.value
                .trim(),
            password
          }
        );

      status.textContent =
        result.message;
    }
  );
}

function initRegisterForm() {
  const form =
    select(
      "[data-register-form]"
    );

  const status =
    select(
      "[data-auth-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearFormErrors(form);
      status.textContent = "";

      let valid = true;

      const name =
        form.elements.name.value
          .trim();

      const password =
        form.elements.password.value;

      const confirmPassword =
        form.elements.confirmPassword.value;

      if (!name) {
        valid = false;

        setFieldError(
          form,
          "name",
          "Enter your full name."
        );
      }

      if (!validateEmailField(form)) {
        valid = false;
      }

      if (!validatePassword(password)) {
        valid = false;

        setFieldError(
          form,
          "password",
          "Use at least 8 characters."
        );
      }

      if (
        !confirmPassword
        || confirmPassword
          !== password
      ) {
        valid = false;

        setFieldError(
          form,
          "confirmPassword",
          "Passwords must match."
        );
      }

      if (!form.elements.terms.checked) {
        valid = false;

        form.elements.terms.setAttribute(
          "aria-invalid",
          "true"
        );
      }

      if (!valid) {
        status.textContent =
          "Please correct the highlighted fields.";

        focusFirstInvalidField(form);

        return;
      }

      const result =
        await registerAccount(
          {
            name,
            email:
              form.elements.email.value
                .trim(),
            password
          }
        );

      status.textContent =
        result.message;
    }
  );
}

function initForgotForm() {
  const form =
    select(
      "[data-forgot-form]"
    );

  const status =
    select(
      "[data-auth-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearFormErrors(form);
      status.textContent = "";

      if (!validateEmailField(form)) {
        status.textContent =
          "Please correct the highlighted field.";

        focusFirstInvalidField(form);

        return;
      }

      const result =
        await requestPasswordReset(
          form.elements.email.value
            .trim()
        );

      status.textContent =
        result.message;
    }
  );
}

function initPasswordStrength() {
  const input =
    select(
      "[data-password-strength-input]"
    );

  const target =
    select(
      "[data-password-strength]"
    );

  if (
    !input
    || !target
  ) {
    return;
  }

  input.addEventListener(
    "input",
    () => {
      const password =
        input.value;

      if (!password) {
        target.textContent =
          "Use at least 8 characters.";

        target.dataset.strength = "";

        return;
      }

      const strength =
        getPasswordStrength(
          password
        );

      target.textContent =
        `Password strength: ${strength.label}`;

      target.dataset.strength =
        strength.key;
    }
  );
}

function initDemoAccess() {
  const form =
    select(
      "[data-demo-access]"
    );

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const role =
        form.elements.role.value;

      const session =
        startDemoSession(role);

      if (!session) {
        return;
      }

      const routes = {
        user: "/user/index.html",
        agent: "/agent/index.html",
        admin: "/admin/index.html"
      };

      window.location.href =
        routes[role];
    }
  );
}

function initAuth() {
  initPasswordToggles();
  initProviderButtons();
  initLoginForm();
  initRegisterForm();
  initForgotForm();
  initPasswordStrength();
  initDemoAccess();
}

onReady(initAuth);
