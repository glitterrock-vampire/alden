import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import { CONTACT_EMAIL } from '@/lib/contact';

const PHOTO_STUDIO_SERVICES = [
  {
    title: "Portrait",
    description: "Professional headshots and personal portraits that capture your unique personality and professional image.",
    features: [
      "Corporate Headshots",
      "Professional Portraits",
      "Personal Branding",
      "Executive Portraits"
    ],
    icon: "👤",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Event",
    description: "Comprehensive event coverage capturing moments and emotions from weddings to corporate functions.",
    features: [
      "Weddings & Ceremonies",
      "Corporate Events",
      "Birthday Parties",
      "Concerts & Performances"
    ],
    icon: "✓",
    images: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Landscape",
    description: "Stunning natural landscapes and scenic environments showcasing the beauty of Jamaica and beyond.",
    features: [
      "Mountain & Nature",
      "Coastal & Ocean",
      "Urban & Architecture",
      "Sunset & Golden Hour"
    ],
    icon: "🏔",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Product",
    description: "High-quality product photography that showcases your products in the best light and context.",
    features: [
      "E-commerce Products",
      "Food & Beverage",
      "Fashion & Apparel",
      "Lifestyle Products"
    ],
    icon: "📦",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Architecture",
    description: "Architectural photography that highlights design details, spatial relationships, and building aesthetics.",
    features: [
      "Interior Design",
      "Exterior Shots",
      "Real Estate",
      "Construction Progress"
    ],
    icon: "🏛",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Commercial",
    description: "Commercial photography for advertising, marketing campaigns, and brand storytelling.",
    features: [
      "Brand Campaigns",
      "Advertising",
      "Social Media Content",
      "Print Media"
    ],
    icon: "💼",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Creative Projects",
    description: "Artistic and conceptual photography projects that push creative boundaries.",
    features: [
      "Conceptual Projects",
      "Art Direction",
      "Creative Retouching",
      "Experimental Projects"
    ],
    icon: "🎨",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Photo Editing",
    description: "Professional photo editing and retouching services to enhance and perfect your images.",
    features: [
      "Color Correction",
      "Retouching & Restoration",
      "Background Removal",
      "Professional Printing"
    ],
    icon: "🎭",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Photo Sessions",
    description: "Personalized photo sessions tailored to your specific needs and vision.",
    features: [
      "Individual Sessions",
      "Family & Group",
      "Couples & Engagement",
      "Custom Themes"
    ],
    icon: "📅",
    images: [
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
    ]
  }
];

const FEATURED_WORK = {
  title: 'Featured work',
  description: 'A selection of portraits, celebrations, landscapes, and the everyday details in between.',
  features: ['Landscapes', 'Portraits', 'Street stories', 'Celebrations'],
  images: [
    { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1000&h=900&fit=crop', title: 'Jamaica landscapes', category: 'Nature photography' },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop', title: 'Portrait sessions', category: 'Portrait photography' },
    { src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop', title: 'Urban exploration', category: 'Street photography' },
    { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop', title: 'Wedding stories', category: 'Event photography' },
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', title: 'Product photography', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1000&h=600&fit=crop', title: 'Architectural details', category: 'Architecture' }
  ]
};

export default function PhotoStudioServicesPage() {
  const [selectedService, setSelectedService] = useState(FEATURED_WORK);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    if (!activePhoto) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activePhoto]);

  return (
    <main className="studio-photo-page">
      <Navbar />
      <style>{`
        .studio-photo-page { min-height: 100vh; background: #111310; color: #f3f1e9; }
        .studio-photo-shell { width: min(1440px, 100%); margin: 0 auto; padding: clamp(2.5rem, 6vw, 5rem) clamp(1rem, 5vw, 4.5rem) 3rem; }
        .studio-photo-heading { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-bottom: 1.6rem; }
        .studio-photo-kicker { margin: 0 0 .7rem; color: #c5a36d; font: 500 .66rem/1.5 var(--font-body); letter-spacing: .14em; text-transform: uppercase; }
        .studio-photo-heading h1 { margin: 0; font: 400 clamp(2.7rem, 6vw, 5.4rem)/.9 var(--font-heading); }
        .studio-photo-detail { max-width: 24rem; }
        .studio-photo-detail h2 { margin: 0 0 .4rem; color: #e6c995; font: 400 1.1rem/1.3 var(--font-heading); }
        .studio-photo-detail p { margin: 0; color: #aaa99f; font: 400 .7rem/1.7 var(--font-body); }
        .studio-photo-filters { display: flex; gap: .45rem; overflow-x: auto; padding: .5rem 0 1rem; scrollbar-width: thin; }
        .studio-photo-filter { flex: 0 0 auto; border: 1px solid #383a34; background: transparent; color: #aaa99f; padding: .62rem .78rem; font: 400 .6rem/1 var(--font-body); text-transform: uppercase; cursor: pointer; transition: color .2s, background .2s, border-color .2s; }
        .studio-photo-filter:hover, .studio-photo-filter[aria-pressed="true"] { border-color: #d1ad71; background: #d1ad71; color: #191a16; }
        .studio-photo-mosaic { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: repeat(4, clamp(3rem, 6vw, 5.2rem)); gap: .55rem; }
        .studio-photo-tile { position: relative; min-width: 0; overflow: hidden; padding: 0; border: 0; background: #252720; text-align: left; cursor: zoom-in; }
        .studio-photo-tile:nth-child(1) { grid-column: 1 / 7; grid-row: 1 / 5; }
        .studio-photo-tile:nth-child(2) { grid-column: 7 / 10; grid-row: 1 / 3; }
        .studio-photo-tile:nth-child(3) { grid-column: 10 / 13; grid-row: 1 / 3; }
        .studio-photo-tile:nth-child(4) { grid-column: 7 / 10; grid-row: 3 / 5; }
        .studio-photo-tile:nth-child(5) { grid-column: 10 / 13; grid-row: 3 / 5; }
        .studio-photo-tile:nth-child(6) { grid-column: 1 / 7; grid-row: 5 / 7; }
        .studio-photo-tile img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.2,.7,.2,1), filter .4s; }
        .studio-photo-tile:hover img, .studio-photo-tile:focus-visible img { transform: scale(1.045); filter: saturate(1.12); }
        .studio-photo-tile::after { position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(0,0,0,.65)); content: ''; opacity: .7; transition: opacity .25s; }
        .studio-photo-tile:hover::after { opacity: 1; }
        .studio-photo-caption { position: absolute; z-index: 1; right: .75rem; bottom: .7rem; left: .75rem; color: white; font: 400 .8rem/1.2 var(--font-body); }
        .studio-photo-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1rem; }
        .studio-photo-meta p { margin: 0; color: #aaa99f; font: 400 .64rem/1.6 var(--font-body); }
        .studio-photo-features { display: flex; flex-wrap: wrap; gap: .35rem .8rem; color: #d9c29b; }
        .studio-photo-features span { white-space: nowrap; }
        .studio-photo-contact { flex: 0 0 auto; color: #e0c18e; font: 500 .64rem/1.5 var(--font-body); text-decoration: none; }
        .studio-photo-contact:hover { color: white; }
        .studio-photo-lightbox { position: fixed; z-index: 100; inset: 0; display: grid; place-items: center; padding: 1.5rem; background: rgba(10,11,9,.95); backdrop-filter: blur(12px); }
        .studio-photo-lightbox img { max-width: min(1100px, 90vw); max-height: 78vh; object-fit: contain; }
        .studio-photo-lightbox figcaption { margin-top: .8rem; color: white; font: 400 .75rem/1.5 var(--font-body); }
        .studio-photo-close { position: absolute; top: 1.25rem; right: 1.25rem; border: 1px solid #777; background: transparent; color: white; padding: .7rem .9rem; font: 400 .62rem/1 var(--font-body); cursor: pointer; }
        @media (max-width: 700px) {
          .studio-photo-heading { align-items: start; flex-direction: column; gap: .8rem; }
          .studio-photo-detail { max-width: 30rem; }
          .studio-photo-mosaic { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(4, clamp(4rem, 19vw, 7rem)); gap: .4rem; }
          .studio-photo-tile:nth-child(1) { grid-column: 1 / 5; grid-row: 1 / 3; }
          .studio-photo-tile:nth-child(2) { grid-column: 1 / 3; grid-row: 3; }
          .studio-photo-tile:nth-child(3) { grid-column: 3 / 5; grid-row: 3; }
          .studio-photo-tile:nth-child(4) { grid-column: 1 / 3; grid-row: 4; }
          .studio-photo-tile:nth-child(5) { grid-column: 3 / 5; grid-row: 4; }
          .studio-photo-tile:nth-child(6) { display: none; }
          .studio-photo-meta { align-items: start; flex-direction: column; gap: .8rem; }
        }
        @media (prefers-reduced-motion: reduce) { .studio-photo-tile img, .studio-photo-tile::after, .studio-photo-filter { transition: none; } }
      `}</style>
      <section className="studio-photo-shell" id="services">
        <header className="studio-photo-heading">
          <div>
            <p className="studio-photo-kicker">Alden Photo Studio · Kingston, Jamaica</p>
            <h1>Photography,<br />up close.</h1>
          </div>
          <div className="studio-photo-detail" aria-live="polite">
            <h2>{selectedService.title}</h2>
            <p>{selectedService.description}</p>
          </div>
        </header>
        <nav className="studio-photo-filters" aria-label="Photography services">
          {[FEATURED_WORK, ...PHOTO_STUDIO_SERVICES].map((service) => (
            <button
              key={service.title}
              className="studio-photo-filter"
              type="button"
              aria-pressed={selectedService.title === service.title}
              onClick={() => setSelectedService(service)}
            >
              {service.title}
            </button>
          ))}
        </nav>
        <div className="studio-photo-mosaic" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {selectedService.images.map((photo, index) => {
              const image = typeof photo === 'string' ? photo : photo.src;
              const title = typeof photo === 'string'
                ? `${selectedService.title} · ${String(index + 1).padStart(2, '0')}`
                : photo.title;

              return (
              <motion.button
                key={`${selectedService.title}-${image}-${index}`}
                className="studio-photo-tile"
                type="button"
                aria-label={`View ${title.toLowerCase()}`}
                onClick={() => setActivePhoto({ image, title })}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: .97 }}
                transition={{ duration: .35, delay: index * .04 }}
                layout
              >
                <img src={image} alt={title} loading={index < 3 ? 'eager' : 'lazy'} />
                <span className="studio-photo-caption">
                  {title}{typeof photo === 'string' ? '' : ` · ${photo.category}`}
                </span>
              </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="studio-photo-meta">
          <p className="studio-photo-features">
            {selectedService.features.map((feature) => <span key={feature}>{feature}</span>)}
          </p>
          <a className="studio-photo-contact" href={`mailto:${CONTACT_EMAIL}?subject=Photo%20Studio%20Booking`}>BOOK A SESSION ↗</a>
        </div>
      </section>
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="studio-photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={() => setActivePhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="studio-photo-close" type="button" onClick={() => setActivePhoto(null)}>CLOSE ×</button>
            <figure onClick={(event) => event.stopPropagation()}>
              <img src={activePhoto.image} alt={activePhoto.title} />
              <figcaption>{activePhoto.title}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
      <FooterSection />
    </main>
  );
}
