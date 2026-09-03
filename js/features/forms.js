/**
 * LarHub Shared Form Validation
 */

export function clearFieldError(
  form,
  fieldName
) {
  const field =
    form.elements[fieldName];

  const error =
    form.querySelector(
      `[data-error-for="${fieldName}"]`
    );

  if (field) {
    field.removeAttribute(
      "aria-invalid"
    );
  }

  if (error) {
    error.textContent = "";
  }
}

export function setFieldError(
  form,
  fieldName,
  message
) {
  const field =
    form.elements[fieldName];

  const error =
    form.querySelector(
      `[data-error-for="${fieldName}"]`
    );

  if (field) {
    field.setAttribute(
      "aria-invalid",
      "true"
    );
  }

  if (error) {
    error.textContent =
      message;
  }
}

export function clearFormErrors(
  form
) {
  const fields =
    form.querySelectorAll(
      "[aria-invalid]"
    );

  fields.forEach(
    (field) => {
      field.removeAttribute(
        "aria-invalid"
      );
    }
  );

  form
    .querySelectorAll(
      "[data-error-for]"
    )
    .forEach(
      (error) => {
        error.textContent = "";
      }
    );
}

export function focusFirstInvalidField(
  form
) {
  const field =
    form.querySelector(
      '[aria-invalid="true"]'
    );

  field?.focus();
}
