import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { createContactMailto } from '@/lib/contact';
import {
  WEB_STUDIO_PACKAGE_GROUPS,
  WEB_STUDIO_PACKAGE_NOTES,
} from './webStudioData';
import './WebStudioServicesPage.css';
import './WebStudioPackagesPage.css';

function usePackageReveals(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const items = [...root.querySelectorAll('.web-package-reveal')];
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [rootRef]);
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="web-package-check"
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

function PackageCard({ pkg, groupTitle, index }) {
  const mailto = createContactMailto(
    `Web Studio — ${groupTitle} / ${pkg.name}`,
    {
      Group: groupTitle,
      Package: pkg.name,
      Message: `I want to start the ${pkg.name} ${groupTitle.toLowerCase()} package.`,
    },
  );

  return (
    <article
      className={`web-package-card web-package-reveal${pkg.featured ? ' is-featured' : ''}`}
      style={{ '--package-reveal-delay': `${index * 90}ms` }}
    >
      <header className="web-package-card__head">
        <div className="web-package-card__meta">
          <span className="web-package-card__tag">{pkg.tag}</span>
          {pkg.featured && (
            <span className="web-package-card__badge">Most popular</span>
          )}
        </div>

        <h3>{pkg.name}</h3>

        <p className="web-package-card__price">
          <strong>{pkg.price}</strong>
          <span>{pkg.cadence}</span>
        </p>

        <p className="web-package-card__summary">{pkg.summary}</p>
      </header>

      <a className="web-services-solid-link" href={mailto}>
        Start this package
        <span aria-hidden="true">↗</span>
      </a>

      {pkg.metrics && (
        <dl className="web-package-card__metrics">
          {pkg.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="web-package-card__list">
        {pkg.includes.map((item) => (
          <li key={item}>
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function WebStudioPackagesPage() {
  const pageRef = useRef(null);
  usePackageReveals(pageRef);

  return (
    <div ref={pageRef} className="web-studio-page web-packages-page min-h-screen">
      <Navbar />

      <section className="web-packages-hero">
        <div className="web-services-wide-shell">
          <p className="web-services-eyebrow web-package-reveal">Pricing packages</p>

          <h1 className="web-packages-title web-package-reveal" style={{ '--package-reveal-delay': '90ms' }}>
            Choose
            <span> a deal.</span>
          </h1>

          <div className="web-packages-hero-row web-package-reveal" style={{ '--package-reveal-delay': '180ms' }}>
            <p className="web-services-section-copy">
              Website builds and monthly marketing retainers, priced in USD.
              Select a package, then we confirm scope before work starts.
            </p>

            <nav className="web-packages-switch" aria-label="Web Studio pages">
              <Link to="/studios/web-studio/services">Work</Link>
              <Link to="/studios/web-studio/packages" aria-current="page">
                Packages
              </Link>
            </nav>
          </div>
        </div>
      </section>

      {WEB_STUDIO_PACKAGE_GROUPS.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className="web-packages-grid-section"
        >
          <div className="web-services-wide-shell">
            <div className="web-services-editorial-heading web-package-reveal">
              <span className="web-services-eyebrow">
                {String(groupIndex + 1).padStart(2, '0')} / Packages
              </span>
              <h2 className="web-services-section-title">{group.title}</h2>
              <p className="web-services-section-copy">{group.copy}</p>
            </div>

            <div className="web-packages-grid">
              {group.packages.map((pkg, packageIndex) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  groupTitle={group.title}
                  index={packageIndex}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="web-packages-note-section">
        <div className="web-services-wide-shell">
          <div className="web-packages-note web-package-reveal">
            <span className="web-services-eyebrow">Before you book</span>
            <h2 className="web-services-section-title">
              Quoted from the package.
              Built for the job.
            </h2>
            <ul className="web-packages-footnotes">
              {WEB_STUDIO_PACKAGE_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="web-services-actions">
              <Link
                className="web-services-pill-link"
                to="/studios/web-studio/services"
              >
                See the work
              </Link>
              <a
                className="web-services-solid-link"
                href={createContactMailto('Web Studio — Discovery call', {
                  Message: 'I want to book a discovery call about packages.',
                })}
              >
                Book a discovery call
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
