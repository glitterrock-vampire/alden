import { useEffect, useState } from 'react';
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
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop',
    ],
  },
];

const FEATURED_WORK = {
  title: 'Featured Work',
  description:
    'A selection of portraits, celebrations, landscapes, and the everyday details in between.',
  features: [
    'Landscapes',
    'Portraits',
    'Street Stories',
    'Celebrations',
  ],
  images: [
    {
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=900&fit=crop',
      title: 'Jamaica landscapes',
      category: 'Nature photography',
    },
    {
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=700&fit=crop',
      title: 'Portrait sessions',
      category: 'Portrait photography',
    },
    {
      src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=900&h=700&fit=crop',
      title: 'Urban exploration',
      category: 'Street photography',
    },
    {
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&h=700&fit=crop',
      title: 'Wedding stories',
      category: 'Event photography',
    },
    {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=700&fit=crop',
      title: 'Product photography',
      category: 'Commercial',
    },
    {
      src: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&h=700&fit=crop',
      title: 'Architectural details',
      category: 'Architecture',
    },
  ],
};

export default function PhotoStudioServicesPage() {
  const [selectedService, setSelectedService] =
    useState(FEATURED_WORK);

  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    if (!activePhoto) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  const openPhoto = (photo, index) => {
    const image =
      typeof photo === 'string'
        ? photo
        : photo.src;

    const title =
      typeof photo === 'string'
        ? `${selectedService.title} · ${String(index + 1).padStart(2, '0')}`
        : photo.title;

    setActivePhoto({
      image,
      title,
    });
  };

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
              selectedService.images.length,
              8,
            )}`}
            aria-live="polite"
          >
            <AnimatePresence mode="popLayout">
              {selectedService.images.map((photo, index) => {
                const image =
                  typeof photo === 'string'
                    ? photo
                    : photo.src;

                const title =
                  typeof photo === 'string'
                    ? `${selectedService.title} · ${String(
                        index + 1,
                      ).padStart(2, '0')}`
                    : photo.title;

                const category =
                  typeof photo === 'string'
                    ? selectedService.title
                    : photo.category;

                return (
                  <motion.button
                    key={`${selectedService.title}-${image}-${index}`}
                    className="photo-studio-tile"
                    type="button"
                    aria-label={`View ${title}`}
                    onClick={() => openPhoto(photo, index)}
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
                    <img
                      src={image}
                      alt={title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />

                    <span className="photo-studio-tile-overlay" />

                    <span className="photo-studio-tile-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="photo-studio-caption">
                      <strong>{title}</strong>
                      <small>{category}</small>
                    </span>

                    <span
                      className="photo-studio-tile-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </motion.button>
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

            <span>
              Kingston, Jamaica
              <br />
              Available beyond.
            </span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="photo-studio-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={() => setActivePhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="photo-studio-close"
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close image viewer"
            >
              <span>Close</span>
              <strong>×</strong>
            </button>

            <figure
              className="photo-studio-lightbox-figure"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
              />

              <figcaption>
                {activePhoto.title}
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}