import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { CONTACT_EMAIL } from '@/lib/contact';

import './PhotoStudioServicesPage.css';

const PHOTO_STUDIO_SERVICES = [
  {
    title: 'Portrait',
    description:
      'Professional headshots and personal portraits that capture personality, presence, and professional identity.',
    features: [
      'Corporate Headshots',
      'Professional Portraits',
      'Personal Branding',
      'Executive Portraits',
    ],
    imageCount: 8,
  },
  {
    title: 'Event',
    description:
      'Event coverage focused on atmosphere, people, movement, and the moments that define the occasion.',
    features: [
      'Weddings & Ceremonies',
      'Corporate Events',
      'Birthday Parties',
      'Concerts & Performances',
    ],
    imageCount: 6,
  },
  {
    title: 'Landscape',
    description:
      'Natural landscapes, environments, and places photographed with an emphasis on atmosphere and scale.',
    features: [
      'Mountain & Nature',
      'Coastal & Ocean',
      'Urban & Architecture',
      'Sunset & Golden Hour',
    ],
    imageCount: 6,
  },
  {
    title: 'Product',
    description:
      'Product photography designed to give objects clarity, context, and visual presence across digital and print.',
    features: [
      'E-commerce Products',
      'Food & Beverage',
      'Fashion & Apparel',
      'Lifestyle Products',
    ],
    imageCount: 6,
  },
  {
    title: 'Architecture',
    description:
      'Architectural photography that studies structure, materials, spatial relationships, and design.',
    features: [
      'Interior Design',
      'Exterior Shots',
      'Real Estate',
      'Construction Progress',
    ],
    imageCount: 6,
  },
  {
    title: 'Commercial',
    description:
      'Commercial photography for campaigns, advertising, marketing content, and brand storytelling.',
    features: [
      'Brand Campaigns',
      'Advertising',
      'Social Media Content',
      'Print Media',
    ],
    imageCount: 6,
  },
  {
    title: 'Creative Projects',
    description:
      'Conceptual and experimental photography developed around visual ideas, art direction, and creative exploration.',
    features: [
      'Conceptual Projects',
      'Art Direction',
      'Creative Retouching',
      'Experimental Projects',
    ],
    imageCount: 6,
  },
  {
    title: 'Photo Editing',
    description:
      'Professional editing and retouching that refines imagery while preserving the character of the original photograph.',
    features: [
      'Color Correction',
      'Retouching & Restoration',
      'Background Removal',
      'Professional Printing',
    ],
    imageCount: 6,
  },
  {
    title: 'Photo Sessions',
    description:
      'Personalized sessions built around the subject, location, mood, and visual direction of the project.',
    features: [
      'Individual Sessions',
      'Family & Group',
      'Couples & Engagement',
      'Custom Themes',
    ],
    imageCount: 6,
  },
];

const FEATURED_WORK = {
  title: 'Featured Work',
  description:
    'The studio portfolio is ready for your photography. Supplied images will appear here by discipline.',
  features: [
    'Landscapes',
    'Portraits',
    'Street Stories',
    'Celebrations',
  ],
  imageCount: 6,
};

export default function PhotoStudioServicesPage() {
  const [selectedService, setSelectedService] =
    useState(FEATURED_WORK);

  return (
    <main className="photo-studio-page">
      <Navbar />

      <section className="photo-studio-hero">
        <div className="photo-studio-container">
          <div className="photo-studio-hero-grid">
            <div className="photo-studio-hero-main">
              <p className="photo-studio-eyebrow">
                ALDEN Photo Studio
              </p>

              <h1>
                Photography
                <br />
                <span>with presence.</span>
              </h1>
            </div>

            <div className="photo-studio-hero-side">
              <span className="photo-studio-index">
                01 / 09
              </span>

              <p>
                Portraits, places, people, products, and
                moments — photographed with intention.
              </p>
            </div>
          </div>

          <div className="photo-studio-hero-line" />
        </div>
      </section>

      <section
        className="photo-studio-work"
        id="services"
      >
        <div className="photo-studio-container">
          <div className="photo-studio-section-header">
            <div>
              <span className="photo-studio-section-number">
                01
              </span>

              <span className="photo-studio-section-label">
                Selected work
              </span>
            </div>

            <p>
              Explore the studio's photographic disciplines.
            </p>
          </div>

          <div className="photo-studio-selector">
            <div className="photo-studio-selector-intro">
              <span>Services</span>

              <strong>
                {selectedService.title}
              </strong>
            </div>

            <nav
              className="photo-studio-filters"
              aria-label="Photography services"
            >
              <button
                type="button"
                className="photo-studio-filter"
                aria-pressed={
                  selectedService.title === FEATURED_WORK.title
                }
                onClick={() =>
                  setSelectedService(FEATURED_WORK)
                }
              >
                Featured
              </button>

              {PHOTO_STUDIO_SERVICES.map((service) => (
                <button
                  key={service.title}
                  type="button"
                  className="photo-studio-filter"
                  aria-pressed={
                    selectedService.title === service.title
                  }
                  onClick={() =>
                    setSelectedService(service)
                  }
                >
                  {service.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="photo-studio-selected">
            <div className="photo-studio-selected-copy">
              <span className="photo-studio-mini-label">
                {selectedService.title}
              </span>

              <h2>
                {selectedService.title === 'Featured Work'
                  ? 'A visual selection.'
                  : `${selectedService.title}, considered.`}
              </h2>

              <p>
                {selectedService.description}
              </p>
            </div>

            <div className="photo-studio-feature-list">
              {selectedService.features.map((feature, index) => (
                <span key={feature}>
                  <small>
                    {String(index + 1).padStart(2, '0')}
                  </small>
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`photo-studio-gallery photo-studio-gallery--${Math.min(
              selectedService.imageCount,
              8,
            )}`}
            aria-live="polite"
          >
            <AnimatePresence mode="popLayout">
              {Array.from({ length: selectedService.imageCount }, (_, index) => {
                const title = `${selectedService.title} · ${String(index + 1).padStart(2, '0')}`;
                return (
                  <motion.div
                    key={`${selectedService.title}-${index}`}
                    className="photo-studio-tile"
                    role="img"
                    aria-label={`${title}, photography image to be supplied`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    layout
                  >
                    <span className="photo-studio-tile-overlay" />

                    <span className="photo-studio-image-placeholder" aria-hidden="true">
                      <span className="photo-studio-placeholder-mark">A</span>
                      <span>Image to be supplied</span>
                    </span>

                    <span className="photo-studio-tile-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="photo-studio-caption">
                      <strong>{title}</strong>
                      <small>{selectedService.title}</small>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="photo-studio-bottom">
            <div className="photo-studio-bottom-note">
              <span>02</span>
              <p>
                Every frame is treated as part of the
                larger visual language.
              </p>
            </div>

            <div className="photo-studio-bottom-actions">
              <Link
                className="photo-studio-contact photo-studio-contact--primary"
                to="/studios/photo-studio/packages"
              >
                <span>View packages & pricing</span>
                <strong>↗</strong>
              </Link>
              <a
                className="photo-studio-contact"
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  'Photo Studio Booking',
                )}`}
              >
                <span>Book a session</span>
                <strong>↗</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="photo-studio-statement">
        <div className="photo-studio-container">
          <span className="photo-studio-section-number">
            02
          </span>

          <h2>
            Good photographs
            <br />
            <span>make you look again.</span>
          </h2>

          <div className="photo-studio-statement-bottom">
            <p>
              From personal portraits to commercial work,
              ALDEN Photo Studio approaches each project
              with a balance of direction, observation,
              and technical precision.
            </p>

            <div className="photo-studio-pricing-preview">
              <span>Pricing starts at</span>
              <strong>$250 USD</strong>
              <Link
                to="/studios/photo-studio/packages"
                className="photo-studio-pricing-link"
              >
                View all packages
                <strong>↗</strong>
              </Link>
            </div>

            <span>
              Kingston, Jamaica
              <br />
              Available beyond.
            </span>
          </div>
        </div>
      </section>

      <section className="photo-studio-pricing-standout">
        <div className="photo-studio-container">
          <div className="photo-studio-pricing-standout-inner">
            <span>Book a session today</span>
            <h2>
              Starting at
              <br />
              <strong>$250 USD</strong>
            </h2>
            <Link
              to="/studios/photo-studio/packages"
              className="photo-studio-pricing-cta"
            >
              View packages
              <strong>↗</strong>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
