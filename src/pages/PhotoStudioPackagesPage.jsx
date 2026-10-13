import { Link } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { createContactMailto } from '@/lib/contact';
import {
  PHOTO_STUDIO_PACKAGES,
  PHOTO_STUDIO_PACKAGE_NOTES,
} from './photoStudioPackagesData';
import './PhotoStudioServicesPage.css';
import './PhotoStudioPackagesPage.css';

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="photo-package-check"
    >
      <path
        d="M3.2 8.4 6.1 11.2 12.8 4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function PhotoStudioPackagesPage() {
  return (
    <main className="photo-studio-page photo-packages-page">
      <Navbar />

      <section className="photo-studio-hero photo-packages-hero">
        <div className="photo-studio-container">
          <div className="photo-studio-hero-grid">
            <div className="photo-studio-hero-main">
              <p className="photo-studio-eyebrow">
                Pricing packages
              </p>

              <h1>
                Choose
                <br />
                <span>a sitting.</span>
              </h1>
            </div>

            <div className="photo-studio-hero-side">
              <span className="photo-studio-index">
                JMD
              </span>

              <p>
                Three ways to book the studio — portraits,
                events, and commercial work. Prices are
                quoted in Jamaican dollars.
              </p>

              <nav
                className="photo-packages-switch"
                aria-label="Photo Studio pages"
              >
                <Link to="/studios/photo-studio/services">
                  Work
                </Link>
                <Link
                  to="/studios/photo-studio/packages"
                  aria-current="page"
                >
                  Packages
                </Link>
              </nav>
            </div>
          </div>

          <div className="photo-studio-hero-line" />
        </div>
      </section>

      <section className="photo-packages-grid-section">
        <div className="photo-studio-container">
          <div className="photo-studio-section-header">
            <div>
              <span className="photo-studio-section-number">
                01
              </span>
              <span className="photo-studio-section-label">
                Package deals
              </span>
            </div>
            <p>
              Pick a starting deal. Hours, locations, and
              usage are confirmed before the shoot.
            </p>
          </div>

          <div className="photo-packages-grid">
            {PHOTO_STUDIO_PACKAGES.map((pkg) => {
              const mailto = createContactMailto(
                `Photo Studio — ${pkg.name} package`,
                {
                  Package: pkg.name,
                  Message: `I want to book the ${pkg.name} package.`,
                },
              );

              return (
                <article
                  key={pkg.id}
                  className={`photo-package-card${
                    pkg.featured ? ' is-featured' : ''
                  }`}
                >
                  <header className="photo-package-card__head">
                    <div className="photo-package-card__meta">
                      <span>{pkg.tag}</span>
                      {pkg.featured && (
                        <strong>Most popular</strong>
                      )}
                    </div>
                    <h2>{pkg.name}</h2>
                    <p className="photo-package-card__price">
                      <b>{pkg.price}</b>
                      <span>{pkg.cadence}</span>
                    </p>
                    <p className="photo-package-card__summary">
                      {pkg.summary}
                    </p>
                  </header>

                  <a className="photo-package-cta" href={mailto}>
                    <span>Book this package</span>
                    <strong>↗</strong>
                  </a>

                  <ul>
                    {pkg.includes.map((item) => (
                      <li key={item}>
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="photo-studio-statement">
        <div className="photo-studio-container">
          <span className="photo-studio-section-number">
            02
          </span>

          <h2>
            Quoted from the package.
            <br />
            <span>Shot for the brief.</span>
          </h2>

          <div className="photo-studio-statement-bottom">
            <ul className="photo-packages-footnotes">
              {PHOTO_STUDIO_PACKAGE_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <Link
              className="photo-studio-contact"
              to="/studios/photo-studio/services"
            >
              <span>See the work</span>
              <strong>↗</strong>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
