/**
 * LarHub Property Gallery
 */

import {
  select
} from "../utils/dom.js";

let activeImages = [];
let activeIndex = 0;
let previousFocus = null;

function updateLightbox() {
  const image =
    select(
      "[data-lightbox-image]"
    );

  const count =
    select(
      "[data-lightbox-count]"
    );

  if (
    !image
    || !count
    || !activeImages.length
  ) {
    return;
  }

  image.src =
    activeImages[activeIndex];

  image.alt =
    `Property image ${activeIndex + 1} of ${activeImages.length}`;

  count.textContent =
    `${activeIndex + 1} / ${activeImages.length}`;
}

function openLightbox(
  images,
  index,
  trigger
) {
  const dialog =
    select(
      "[data-gallery-lightbox]"
    );

  if (!dialog) {
    return;
  }

  activeImages = images;
  activeIndex = index;
  previousFocus = trigger;

  dialog.hidden = false;

  document.body.classList.add(
    "lightbox-open"
  );

  updateLightbox();

  select(
    "[data-lightbox-close]",
    dialog
  )?.focus();
}

function closeLightbox() {
  const dialog =
    select(
      "[data-gallery-lightbox]"
    );

  if (!dialog) {
    return;
  }

  dialog.hidden = true;

  document.body.classList.remove(
    "lightbox-open"
  );

  previousFocus?.focus();

  activeImages = [];
  activeIndex = 0;
}

function moveLightbox(step) {
  if (!activeImages.length) {
    return;
  }

  activeIndex =
    (
      activeIndex
      + step
      + activeImages.length
    )
    % activeImages.length;

  updateLightbox();
}

export function initPropertyGallery(
  images
) {
  const gallery =
    select(
      "[data-property-gallery]"
    );

  const dialog =
    select(
      "[data-gallery-lightbox]"
    );

  if (
    !gallery
    || !dialog
    || !images.length
  ) {
    return;
  }

  gallery.addEventListener(
    "click",
    (event) => {
      const trigger =
        event.target.closest(
          "[data-gallery-open]"
        );

      if (!trigger) {
        return;
      }

      const index =
        Number(
          trigger.dataset.galleryOpen
        );

      openLightbox(
        images,
        Number.isFinite(index)
          ? index
          : 0,
        trigger
      );
    }
  );

  dialog.addEventListener(
    "click",
    (event) => {
      if (
        event.target.closest(
          "[data-lightbox-close]"
        )
      ) {
        closeLightbox();

        return;
      }

      if (
        event.target.closest(
          "[data-lightbox-prev]"
        )
      ) {
        moveLightbox(-1);

        return;
      }

      if (
        event.target.closest(
          "[data-lightbox-next]"
        )
      ) {
        moveLightbox(1);

        return;
      }

      if (
        event.target
        === dialog
      ) {
        closeLightbox();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (dialog.hidden) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      }
    }
  );
}
