import './Footer.css';

const navigation = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Studios',
    href: '/studios',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Careers',
    href: '/about/careers',
  },
];

const socials = [
  {
    label: 'Instagram',
    href: '#',
  },
  {
    label: 'LinkedIn',
    href: '#',
  },
  {
    label: 'GitHub',
    href: '#',
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* ================================================================
          MAIN FOOTER
          ================================================================ */}

      <div className="footer-navigation">
        <div className="footer-container">

          <div className="footer-main">

            {/* ==========================================================
                BRAND
                ========================================================== */}

            <div className="footer-brand">

              <div className="footer-logo">
                ALDEN
              </div>

              <p className="footer-description">
                Independent creative technology studio
                building digital experiences, software,
                and visual work.
              </p>

              <p className="footer-location">
                Kingston, Jamaica
              </p>

            </div>

            {/* ==========================================================
                NAVIGATION
                ========================================================== */}

            <div className="footer-navigation-grid">

              {/* Explore */}

              <div className="footer-column">

                <p className="footer-label">
                  Explore
                </p>

                <div className="footer-links">

                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="footer-link"
                    >
                      <span>
                        {item.label}
                      </span>

                      <span
                        className="footer-link-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  ))}

                </div>

              </div>

              {/* Connect */}

              <div className="footer-column">

                <p className="footer-label">
                  Connect
                </p>

                <div className="footer-links">

                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="footer-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                        {social.label}
                      </span>

                      <span
                        className="footer-link-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================================
          BOTTOM BAR
          ================================================================ */}

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-grid">

          <span className="footer-bottom-brand">
            ALDEN
          </span>

          <span>
            © 2026 — All rights reserved
          </span>

          <span>
            Technology · Innovation · Design
          </span>

        </div>
      </div>

    </footer>
  );
}