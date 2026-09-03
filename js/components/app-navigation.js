/**
 * LarHub Application Navigation
 *
 * Increment 9 — User Application
 *
 * Shared application-shell rendering intended for reuse
 * by User, Agent, and Admin workspaces.
 */

import {
  clearDemoSession,
  getDemoSession
} from "../services/auth-service.js";

const AREA_CONFIG = {
  user: {
    label: "User",
    home: "/user/index.html",
    links: [
      {
        href: "/user/index.html",
        label: "Overview",
        key: "overview"
      },
      {
        href: "/user/saved.html",
        label: "Saved Properties",
        key: "saved"
      },
      {
        href: "/user/enquiries.html",
        label: "Enquiries",
        key: "enquiries"
      },
      {
        href: "/user/recently-viewed.html",
        label: "Recently Viewed",
        key: "recent"
      },
      {
        href: "/user/profile.html",
        label: "Profile",
        key: "profile"
      }
    ]
  },
  agent: {
    label: "Agent",
    home: "/agent/index.html",
    links: [
      {
        href: "/agent/index.html",
        label: "Overview",
        key: "overview"
      },
      {
        href: "/agent/listings.html",
        label: "My Listings",
        key: "listings"
      },
      {
        href: "/agent/property-form.html",
        label: "Add Property",
        key: "property-form"
      },
      {
        href: "/agent/enquiries.html",
        label: "Enquiries",
        key: "enquiries"
      },
      {
        href: "/agent/performance.html",
        label: "Performance",
        key: "performance"
      },
      {
        href: "/agent/profile.html",
        label: "Profile",
        key: "profile"
      }
    ]
  },
  admin: {
    label: "Admin",
    home: "/admin/index.html",
    links: [
      {
        href: "/admin/index.html",
        label: "Overview",
        key: "overview"
      },
      {
        href: "/admin/properties.html",
        label: "Properties",
        key: "properties"
      },
      {
        href: "/admin/agents.html",
        label: "Agents",
        key: "agents"
      },
      {
        href: "/admin/users.html",
        label: "Users",
        key: "users"
      },
      {
        href: "/admin/activity.html",
        label: "Activity",
        key: "activity"
      },
      {
        href: "/admin/settings.html",
        label: "Settings",
        key: "settings"
      }
    ]
  }
};

function getCurrentKey(area) {
  const pathname =
    window.location.pathname;

  if (area === "user") {
    if (
      pathname.endsWith(
        "/user/saved.html"
      )
    ) {
      return "saved";
    }

    if (
      pathname.endsWith(
        "/user/enquiries.html"
      )
    ) {
      return "enquiries";
    }

    if (
      pathname.endsWith(
        "/user/recently-viewed.html"
      )
    ) {
      return "recent";
    }

    if (
      pathname.endsWith(
        "/user/profile.html"
      )
    ) {
      return "profile";
    }

    return "overview";
  }

  if (area === "agent") {
    if (
      pathname.endsWith(
        "/agent/listings.html"
      )
    ) {
      return "listings";
    }

    if (
      pathname.endsWith(
        "/agent/property-form.html"
      )
    ) {
      return "property-form";
    }

    if (
      pathname.endsWith(
        "/agent/enquiries.html"
      )
    ) {
      return "enquiries";
    }

    if (
      pathname.endsWith(
        "/agent/performance.html"
      )
    ) {
      return "performance";
    }

    if (
      pathname.endsWith(
        "/agent/profile.html"
      )
    ) {
      return "profile";
    }

    return "overview";
  }

  if (area === "admin") {
    if (
      pathname.endsWith(
        "/admin/properties.html"
      )
    ) {
      return "properties";
    }

    if (
      pathname.endsWith(
        "/admin/agents.html"
      )
    ) {
      return "agents";
    }

    if (
      pathname.endsWith(
        "/admin/users.html"
      )
    ) {
      return "users";
    }

    if (
      pathname.endsWith(
        "/admin/activity.html"
      )
    ) {
      return "activity";
    }

    if (
      pathname.endsWith(
        "/admin/settings.html"
      )
    ) {
      return "settings";
    }

    return "overview";
  }

  return "";
}

function renderLinks(
  links,
  currentKey
) {
  return links
    .map(
      (link) => `
        <li>
          <a
            class="app-nav__link"
            href="${link.href}"
            ${
              link.key === currentKey
                ? 'aria-current="page"'
                : ""
            }
          >
            ${link.label}
          </a>
        </li>
      `
    )
    .join("");
}

function renderAccessState(
  area,
  config,
  session
) {
  if (
    session?.mode === "demo"
    && session.role === area
  ) {
    return `
      <span class="app-demo-badge">
        Demo ${config.label}
      </span>
    `;
  }

  return `
    <a
      class="app-demo-badge app-demo-badge--warning"
      href="/auth/login.html"
    >
      Demo access required
    </a>
  `;
}

/**
 * Render shared application navigation.
 *
 * @param {"user"|"agent"|"admin"} area
 */
export function renderAppNavigation(
  area
) {
  const target =
    document.querySelector(
      "[data-app-navigation]"
    );

  const topbar =
    document.querySelector(
      "[data-app-topbar]"
    );

  const config =
    AREA_CONFIG[area];

  if (
    !target
    || !config
  ) {
    return;
  }

  const session =
    getDemoSession();

  const currentKey =
    getCurrentKey(area);

  target.className = "app-nav";

  target.innerHTML = `
    <div class="app-nav__brand-row">
      <a
        class="site-brand"
        href="/index.html"
        aria-label="LarHub public home"
      >
        LarHub
      </a>

      <span class="app-nav__area">
        ${config.label}
      </span>
    </div>

    <nav
      aria-label="${config.label} workspace"
    >
      <ul class="app-nav__list">
        ${renderLinks(
          config.links,
          currentKey
        )}
      </ul>
    </nav>

    <div class="app-nav__footer">
      ${renderAccessState(
        area,
        config,
        session
      )}

      <a
        class="app-nav__public-link"
        href="/properties.html"
      >
        Browse marketplace
      </a>

      ${
        session?.mode === "demo"
          ? `
            <button
              class="button button--tertiary"
              type="button"
              data-demo-exit
            >
              Exit Demo
            </button>
          `
          : ""
      }
    </div>
  `;

  if (topbar) {
    topbar.innerHTML = `
      <button
        class="app-menu-toggle"
        type="button"
        aria-controls="app-navigation"
        aria-expanded="false"
        data-app-menu-toggle
      >
        <span aria-hidden="true">
          ☰
        </span>

        <span>
          Menu
        </span>
      </button>

      <a
        class="site-brand"
        href="/index.html"
      >
        LarHub
      </a>

      ${renderAccessState(
        area,
        config,
        session
      )}
    `;
  }

  initAppNavigationBehavior();
}

function initAppNavigationBehavior() {
  const nav =
    document.querySelector(
      "[data-app-navigation]"
    );

  const toggle =
    document.querySelector(
      "[data-app-menu-toggle]"
    );

  const backdrop =
    document.querySelector(
      "[data-app-nav-backdrop]"
    );

  const exit =
    document.querySelector(
      "[data-demo-exit]"
    );

  function closeMenu() {
    nav?.classList.remove(
      "is-open"
    );

    toggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    if (backdrop) {
      backdrop.hidden = true;
    }

    document.body.classList.remove(
      "app-nav-open"
    );
  }

  function openMenu() {
    nav?.classList.add(
      "is-open"
    );

    toggle?.setAttribute(
      "aria-expanded",
      "true"
    );

    if (backdrop) {
      backdrop.hidden = false;
    }

    document.body.classList.add(
      "app-nav-open"
    );
  }

  toggle?.addEventListener(
    "click",
    () => {
      const open =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (open) {
        closeMenu();
      } else {
        openMenu();
      }
    }
  );

  backdrop?.addEventListener(
    "click",
    closeMenu
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape"
        && nav?.classList.contains(
          "is-open"
        )
      ) {
        closeMenu();
        toggle?.focus();
      }
    }
  );

  nav?.addEventListener(
    "click",
    (event) => {
      if (
        event.target.closest("a")
      ) {
        closeMenu();
      }
    }
  );

  exit?.addEventListener(
    "click",
    () => {
      clearDemoSession();

      window.location.href =
        "/auth/login.html";
    }
  );
}
