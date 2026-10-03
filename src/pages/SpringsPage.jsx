import { useState } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import { CONTACT_EMAIL, createContactMailto } from '@/lib/contact';

const SPRINGS_PRODUCTS = [
  {
    size: '500ML',
    title: 'Everyday Bottle',
    description: 'Clean grab-and-go spring water for events, offices, schools, and daily hydration.',
  },
  {
    size: '1.5L',
    title: 'Family Bottle',
    description: 'A larger pure water format for homes, hotels, gyms, and hospitality service.',
  },
  {
    size: '5GAL',
    title: 'Cooler Refill',
    description: 'Refill and delivery plans for dispensers, kitchens, shops, and workplace hydration.',
  },
];

const STORE_FEATURES = [
  { label: 'Source', value: 'Natural Spring' },
  { label: 'Finish', value: 'Filtered Pure' },
  { label: 'Service', value: 'Store + Delivery' },
];

export default function SpringsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = createContactMailto('ALDEN Springs Early Access', formData);
  };

  return (
    <div className="springs-page min-h-screen bg-background">
      <Navbar />

      <section className="springs-hero">
        <div className="springs-hero-overlay" aria-hidden="true" />

        <div className="springs-hero-content">
          <p className="springs-kicker">ALDEN SPRINGS · PURE WATER STORE</p>
          <h1 className="springs-hero-title">SPRINGS</h1>
          <div className="springs-hero-copy">
            <span>COMING 2027</span>
            <p>
              Bottled spring water, cooler refills, and pure water delivery for homes, stores, offices, gyms, and events across Jamaica.
            </p>
            <a href="#water-store">Explore Water Store</a>
          </div>
        </div>
      </section>

      <section id="water-store" className="springs-store-section">
        <div className="springs-section-shell">
          <div className="springs-section-heading">
            <span className="springs-kicker">Water Store</span>
            <h2>Pure Water, Built Like A Brand Experience</h2>
            <p>
              ALDEN Springs is shifting from irrigation language into a clean water storefront: bottled spring water, refill systems, delivery, and retail-ready supply.
            </p>
          </div>

          <div className="springs-product-grid">
            {SPRINGS_PRODUCTS.map((product) => (
              <article key={product.size} className="springs-product-card">
                <span className="springs-product-size">{product.size}</span>
                <div className="springs-product-bottle" aria-hidden="true">
                  <i />
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="springs-scroll-environment">
        <div className="springs-sticky-frame">
          <div className="springs-scroll-copy">
            <span className="springs-kicker">Virtual Source</span>
            <h2>Scroll Through The Waterfall</h2>
            <p>
              The environment pans as you move down the page, creating the feeling of traveling from the waterfall source into the pool where the water brand begins.
            </p>
          </div>
        </div>
      </section>

      <section className="springs-proof-section">
        <div className="springs-section-shell">
          <div className="springs-store-stats">
            {STORE_FEATURES.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="springs-about-card">
            <span className="springs-kicker">About ALDEN Springs</span>
            <h2>From Natural Source To Everyday Supply</h2>
            <p>
              ALDEN Springs is a pure water venture focused on bottled water, refill distribution, and dependable hydration service. The page now reflects a water store first, with a natural source environment supporting the brand story.
            </p>
          </div>
        </div>
      </section>

      <section className="springs-access-section">
        <div className="springs-access-card">
          <span className="springs-kicker">Early Access</span>
          <h2>Join The Water Store List</h2>
          <p>
            Be first to hear about bottle sizes, cooler refill plans, wholesale supply, delivery routes, and launch pricing.
          </p>

          <form onSubmit={handleSubmit} className="springs-form">
            <div className="springs-form-grid">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="springs-form-grid">
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                required
                value={formData.interest}
                onChange={e => setFormData({ ...formData, interest: e.target.value })}
              >
                <option value="">Select Interest</option>
                <option value="home-delivery">Home Delivery</option>
                <option value="office-supply">Office Supply</option>
                <option value="retail">Retail / Wholesale</option>
                <option value="events">Events</option>
              </select>
            </div>
            <button type="submit">Join Early Access</button>
          </form>
        </div>
      </section>

      <section className="springs-contact-section">
        <div className="springs-section-shell">
          <h2>Get Water Store Updates</h2>
          <p>Questions about supply, delivery, retail, or partnerships?</p>
          <div className="springs-contact-grid">
            <span>Email: <strong><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></strong></span>
            <span>Location: <strong>Kingston, Jamaica</strong></span>
          </div>
          <a href="/contact">Contact Us</a>
        </div>
      </section>

      <FooterSection />

      <style>{`
        .springs-page {
          background:
            radial-gradient(circle at 18% 12%, rgba(80, 185, 205, 0.14), transparent 28rem),
            radial-gradient(circle at 82% 58%, rgba(204, 187, 135, 0.1), transparent 28rem),
            #050505;
          color: #e7e5df;
        }

        .springs-hero {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: clamp(7rem, 12vh, 10rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 7vh, 5rem);
        }



        .springs-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.32) 54%, rgba(5, 5, 5, 0.72)),
            linear-gradient(0deg, #050505 0%, transparent 34%);
        }

        .springs-hero-content {
          position: relative;
          z-index: 2;
          width: min(100%, 92rem);
          margin: 0 auto;
        }

        .springs-kicker {
          display: inline-block;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.68rem, 1vw, 0.82rem);
          letter-spacing: 0.28em;
          color: #8dd8e8;
          text-transform: uppercase;
        }

        .springs-hero-title {
          font-family: 'Koulen', cursive;
          font-size: clamp(4.75rem, 14vw, 14rem);
          line-height: 0.72;
          color: #f4fbff;
          text-shadow: 0 0 3rem rgba(141, 216, 232, 0.24);
          max-width: 78rem;
          margin: 1.35rem 0 0;
        }

        .springs-hero-copy {
          display: grid;
          gap: 1rem;
          max-width: 38rem;
          margin-top: clamp(1.5rem, 4vw, 2.5rem);
        }

        .springs-hero-copy span {
          width: max-content;
          border: 1px solid rgba(141, 216, 232, 0.38);
          border-radius: 999px;
          padding: 0.7rem 1rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #8dd8e8;
        }

        .springs-hero-copy p,
        .springs-section-heading p,
        .springs-about-card p,
        .springs-access-card p,
        .springs-contact-section p {
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.92rem, 1.25vw, 1.05rem);
          line-height: 1.75;
          color: rgba(231, 229, 223, 0.7);
        }

        .springs-hero-copy a,
        .springs-contact-section a {
          width: max-content;
          border: 1px solid rgba(141, 216, 232, 0.58);
          border-radius: 999px;
          padding: 0.9rem 1.25rem;
          color: #e7fbff;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .springs-hero-copy a:hover,
        .springs-contact-section a:hover {
          background: #8dd8e8;
          color: #051015;
          transform: translateY(-2px);
        }

        .springs-section-shell {
          width: min(100%, 92rem);
          margin: 0 auto;
        }

        .springs-store-section,
        .springs-proof-section,
        .springs-access-section,
        .springs-contact-section {
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem);
        }

        .springs-section-heading {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: end;
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }

        .springs-section-heading h2,
        .springs-about-card h2,
        .springs-access-card h2,
        .springs-contact-section h2,
        .springs-scroll-copy h2 {
          margin: 0;
          font-family: 'Koulen', cursive;
          font-size: clamp(2.6rem, 6vw, 5.8rem);
          line-height: 0.9;
          color: #f4fbff;
        }

        .springs-section-heading p {
          grid-column: 2;
        }

        .springs-product-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .springs-product-card {
          position: relative;
          min-height: 27rem;
          overflow: hidden;
          border: 1px solid rgba(141, 216, 232, 0.16);
          border-radius: 1.6rem;
          padding: 1.25rem;
          background:
            radial-gradient(circle at 50% 16%, rgba(141, 216, 232, 0.18), transparent 11rem),
            linear-gradient(160deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025));
          box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.22);
        }

        .springs-product-size {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: #8dd8e8;
        }

        .springs-product-bottle {
          position: absolute;
          left: 50%;
          top: 48%;
          width: 7rem;
          height: 16rem;
          border: 1px solid rgba(244, 251, 255, 0.34);
          border-radius: 2.2rem 2.2rem 1.1rem 1.1rem;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 32%, rgba(141, 216, 232, 0.2) 70%, rgba(255, 255, 255, 0.12)),
            linear-gradient(180deg, rgba(141, 216, 232, 0.08), rgba(141, 216, 232, 0.28));
          transform: translate(-50%, -50%);
        }

        .springs-product-bottle::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -2.5rem;
          width: 2.6rem;
          height: 3rem;
          border: 1px solid rgba(244, 251, 255, 0.34);
          border-bottom: 0;
          border-radius: 0.65rem 0.65rem 0 0;
          background: rgba(141, 216, 232, 0.12);
          transform: translateX(-50%);
        }

        .springs-product-bottle i {
          position: absolute;
          left: 0.9rem;
          right: 0.9rem;
          bottom: 2.2rem;
          height: 46%;
          border-radius: 0 0 0.9rem 0.9rem;
          background: linear-gradient(180deg, rgba(141, 216, 232, 0.18), rgba(141, 216, 232, 0.54));
          animation: springsBottleWater 3.4s ease-in-out infinite;
        }

        .springs-product-card h3 {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 5.4rem;
          margin: 0;
          font-family: 'Koulen', cursive;
          font-size: 1.8rem;
          color: #f4fbff;
        }

        .springs-product-card p {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.25rem;
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          line-height: 1.55;
          color: rgba(231, 229, 223, 0.62);
        }

        .springs-scroll-environment {
          position: relative;
          min-height: 50vh;
          background: #050505;
        }

        .springs-sticky-frame {
          position: relative;
          min-height: 50vh;
          display: grid;
          align-items: center;
          padding: clamp(5rem, 9vh, 7rem) clamp(1.25rem, 5vw, 4rem);
        }

        .springs-scroll-copy {
          position: relative;
          z-index: 3;
          width: min(100%, 35rem);
          display: grid;
          gap: 1rem;
          padding: clamp(1rem, 3vw, 1.5rem);
          border: 1px solid rgba(141, 216, 232, 0.16);
          border-radius: 1.5rem;
          background: rgba(5, 12, 16, 0.56);
          backdrop-filter: blur(18px);
        }

        .springs-store-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-bottom: clamp(1rem, 2vw, 1.5rem);
        }

        .springs-store-stats div,
        .springs-about-card,
        .springs-access-card {
          border: 1px solid rgba(141, 216, 232, 0.14);
          border-radius: 1.4rem;
          background: rgba(255, 255, 255, 0.045);
          box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.18);
        }

        .springs-store-stats div {
          padding: 1.4rem;
          font-family: 'Roboto Mono', monospace;
        }

        .springs-store-stats span {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          color: rgba(231, 229, 223, 0.52);
          text-transform: uppercase;
        }

        .springs-store-stats strong {
          color: #8dd8e8;
          font-weight: 500;
        }

        .springs-about-card,
        .springs-access-card {
          display: grid;
          gap: 1.1rem;
          padding: clamp(1.25rem, 4vw, 2.5rem);
        }

        .springs-access-section {
          display: flex;
          justify-content: center;
        }

        .springs-access-card {
          width: min(100%, 48rem);
          text-align: center;
        }

        .springs-form {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }

        .springs-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .springs-form input,
        .springs-form select {
          width: 100%;
          min-height: 3.4rem;
          border: 1px solid rgba(141, 216, 232, 0.18);
          border-radius: 0.85rem;
          background: rgba(255, 255, 255, 0.075);
          color: #e7e5df;
          padding: 0 1rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.84rem;
          outline: 0;
        }

        .springs-form input::placeholder {
          color: rgba(231, 229, 223, 0.46);
        }

        .springs-form button {
          min-height: 3.5rem;
          border: 0;
          border-radius: 0.85rem;
          background: #f4fbff;
          color: #051015;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.76rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .springs-form button:hover {
          background: #8dd8e8;
          transform: translateY(-2px);
        }

        .springs-contact-section {
          text-align: center;
        }

        .springs-contact-section .springs-section-shell {
          display: grid;
          justify-items: center;
          gap: 1.1rem;
          width: min(100%, 52rem);
        }

        .springs-contact-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.8rem;
          color: rgba(231, 229, 223, 0.62);
        }

        .springs-contact-grid span {
          border: 1px solid rgba(141, 216, 232, 0.14);
          border-radius: 999px;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.045);
        }

        .springs-contact-grid strong {
          color: #8dd8e8;
          font-weight: 500;
        }



        @media (max-width: 900px) {
          .springs-section-heading,
          .springs-product-grid,
          .springs-store-stats {
            grid-template-columns: 1fr;
          }

          .springs-section-heading {
            text-align: center;
          }

          .springs-section-heading p {
            grid-column: auto;
          }

          .springs-scroll-copy {
            margin-top: auto;
          }
        }

        @keyframes springsBottleWater {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-0.35rem);
          }
        }

        @media (max-width: 640px) {
          .springs-hero {
            align-items: center;
            padding: 6.5rem 1rem 2.5rem;
          }

          .springs-hero-title {
            font-size: clamp(3.5rem, 18vw, 5.25rem);
          }

          .springs-hero-copy {
            max-width: 100%;
          }

          .springs-hero-copy a,
          .springs-contact-section a {
            width: 100%;
            justify-content: center;
            text-align: center;
          }

          .springs-store-section,
          .springs-proof-section,
          .springs-access-section,
          .springs-contact-section {
            padding: 3.5rem 1rem;
          }

          .springs-product-card {
            min-height: 24rem;
          }

          .springs-sticky-frame {
            padding: 5.5rem 1rem 1rem;
            align-items: end;
          }

          .springs-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
