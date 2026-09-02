/**
 * LarHub Public Header
 *
 * Increment 1 — Public Shell
 */

function getCurrentNavigationKey() {
  const pathname = window.location.pathname;
  const params = new URLSearchParams(
    window.location.search
  );

  if (pathname.endsWith("/properties.html")) {
    const listing = params.get("listing");

    if (listing === "sale") {
      return "buy";
    }

    if (listing === "rent") {
      return "rent";
    }

    return "properties";
  }

  if (pathname.endsWith("/agents.html")) {
    return "agents";
  }

  if (pathname.endsWith("/agent.html")) {
    return "agents";
  }

  if (pathname.endsWith("/about.html")) {
    return "about";
  }

  if (pathname.endsWith("/contact.html")) {
    return "contact";
  }

  return "";
}

function navLink(
  href,
  label,
  key,
  currentKey
) {
  const current =
    key === currentKey
      ? ' aria-current="page"'
      : "";

  return `
    <li>
      <a
        class="site-nav__link"
        href="${href}"
        ${current}
      >
        ${label}
      </a>
    </li>
  `;
}

/**
 * Render the shared public header.
 */
export function renderPublicHeader() {
  const target = document.querySelector(
    "[data-public-header]"
  );

  if (!target) {
    return;
  }

  const currentKey = getCurrentNavigationKey();

  target.className = "site-header";

  target.innerHTML = `
    <a
      class="skip-link"
      href="#main-content"
    >
      Skip to main content
    </a>

    <div class="container site-header__inner">
      <a
        class="site-brand"
        href="/index.html"
        aria-label="LarHub home"
      >
        LarHub
      </a>

      <button
        class="site-nav-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded="false"
        data-nav-toggle
      >
        <span class="visually-hidden">
          Toggle navigation
        </span>

        <span
          class="site-nav-toggle__icon"
          aria-hidden="true"
        >
          <span class="site-nav-toggle__line"></span>
          <span class="site-nav-toggle__line"></span>
          <span class="site-nav-toggle__line"></span>
        </span>

        <span aria-hidden="true">
          Menu
        </span>
      </button>

      <nav
        class="site-nav"
        id="site-navigation"
        aria-label="Primary"
        data-site-nav
      >
        <ul class="site-nav__list">
          ${navLink(
            "/properties.html?listing=sale",
            "Buy",
            "buy",
            currentKey
          )}
          ${navLink(
            "/properties.html?listing=rent",
            "Rent",
            "rent",
            currentKey
          )}
          ${navLink(
            "/agents.html",
            "Agents",
            "agents",
            currentKey
          )}
          ${navLink(
            "/about.html",
            "About",
            "about",
            currentKey
          )}
          ${navLink(
            "/contact.html",
            "Contact",
            "contact",
            currentKey
          )}
        </ul>

        <div class="site-nav__account">
          <a
            class="button button--secondary"
            href="/auth/login.html"
          >
            Sign In
          </a>
        </div>
      </nav>
    </div>
  `;
}
