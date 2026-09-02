/**
 * LarHub Public Footer
 *
 * Increment 1 — Public Shell
 */

/**
 * Render the shared public footer.
 */
export function renderPublicFooter() {
  const target = document.querySelector(
    "[data-public-footer]"
  );

  if (!target) {
    return;
  }

  const year = new Date().getFullYear();

  target.className = "site-footer";

  target.innerHTML = `
    <div class="container">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <a
            class="site-brand"
            href="/index.html"
            aria-label="LarHub home"
          >
            LarHub
          </a>

          <p>
            Find property with clarity.
          </p>
        </div>

        <nav
          class="site-footer__nav"
          aria-label="Footer"
        >
          <div class="site-footer__group">
            <h2 class="site-footer__heading">
              Explore
            </h2>

            <ul class="site-footer__list">
              <li>
                <a
                  class="site-footer__link"
                  href="/properties.html?listing=sale"
                >
                  Buy
                </a>
              </li>
              <li>
                <a
                  class="site-footer__link"
                  href="/properties.html?listing=rent"
                >
                  Rent
                </a>
              </li>
              <li>
                <a
                  class="site-footer__link"
                  href="/properties.html"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  class="site-footer__link"
                  href="/agents.html"
                >
                  Agents
                </a>
              </li>
            </ul>
          </div>

          <div class="site-footer__group">
            <h2 class="site-footer__heading">
              Company
            </h2>

            <ul class="site-footer__list">
              <li>
                <a
                  class="site-footer__link"
                  href="/about.html"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  class="site-footer__link"
                  href="/contact.html"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div class="site-footer__group">
            <h2 class="site-footer__heading">
              Account
            </h2>

            <ul class="site-footer__list">
              <li>
                <a
                  class="site-footer__link"
                  href="/auth/login.html"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  class="site-footer__link"
                  href="/auth/register.html"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="site-footer__bottom">
        <p class="text-small">
          © ${year} LarHub
        </p>

        <div class="site-footer__legal text-small">
          <a href="#">
            Privacy
          </a>

          <a href="#">
            Terms
          </a>
        </div>
      </div>
    </div>
  `;
}
