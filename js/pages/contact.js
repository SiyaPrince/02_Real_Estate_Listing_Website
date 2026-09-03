/**
 * LarHub Contact Page
 */

import {
  clearFormErrors,
  focusFirstInvalidField,
  setFieldError
} from "../features/forms.js";

import {
  onReady,
  select
} from "../utils/dom.js";

function validateContactForm(
  form
) {
  clearFormErrors(form);

  let valid = true;

  const name =
    form.elements.name.value
      .trim();

  const email =
    form.elements.email.value
      .trim();

  const subject =
    form.elements.subject.value;

  const message =
    form.elements.message.value
      .trim();

  if (!name) {
    valid = false;

    setFieldError(
      form,
      "name",
      "Enter your name."
    );
  }

  if (!email) {
    valid = false;

    setFieldError(
      form,
      "email",
      "Enter your email address."
    );
  } else if (
    !form.elements.email.validity.valid
  ) {
    valid = false;

    setFieldError(
      form,
      "email",
      "Enter a valid email address."
    );
  }

  if (!subject) {
    valid = false;

    setFieldError(
      form,
      "subject",
      "Select a subject."
    );
  }

  if (!message) {
    valid = false;

    setFieldError(
      form,
      "message",
      "Enter a message."
    );
  } else if (
    message.length < 10
  ) {
    valid = false;

    setFieldError(
      form,
      "message",
      "Your message should be at least 10 characters."
    );
  }

  return valid;
}

function initContactForm() {
  const form =
    select(
      "[data-contact-form]"
    );

  const status =
    select(
      "[data-contact-status]"
    );

  if (
    !form
    || !status
  ) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      status.textContent = "";

      const valid =
        validateContactForm(
          form
        );

      if (!valid) {
        status.textContent =
          "Please correct the highlighted fields.";

        focusFirstInvalidField(
          form
        );

        return;
      }

      status.innerHTML = `
        <p class="contact-form__notice">
          Your message is ready, but it has not been sent.
          Backend message delivery is not connected in this
          frontend build.
        </p>
      `;
    }
  );

  form.addEventListener(
    "input",
    (event) => {
      const field =
        event.target;

      if (
        !field.name
        || !field.hasAttribute(
          "aria-invalid"
        )
      ) {
        return;
      }

      field.removeAttribute(
        "aria-invalid"
      );

      const error =
        form.querySelector(
          `[data-error-for="${field.name}"]`
        );

      if (error) {
        error.textContent = "";
      }
    }
  );
}

function initContact() {
  initContactForm();
}

onReady(initContact);
