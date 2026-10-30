import { lazy, Suspense, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { CONTACT_EMAIL, createContactMailto } from '@/lib/contact';
import useSpringsFx from './useSpringsFx';
import './SpringsPage.css';

const SpringsScene = lazy(() => import('./SpringsScene'));

const SPRINGS_PRODUCTS = [
  {
    number: '01',
    size: '500',
    unit: 'ML',
    title: 'Everyday Bottle',
    use: 'ON THE GO',
    description: 'A crisp, easy carry for the workday, a school bag, or the next event.',
  },
  {
    number: '02',
    size: '1.5',
    unit: 'L',
    title: 'Family Bottle',
    use: 'HOME & HOSPITALITY',
    description: 'A larger pour for family tables, hotel rooms, gyms, and shared spaces.',
  },
  {
    number: '03',
    size: '5',
    unit: 'GAL',
    title: 'Cooler Refill',
    use: 'REFILL & DELIVERY',
    description: 'Dependable cooler refills for homes, offices, shops, and everyday service.',
  },
];

const STORE_FEATURES = [
  { label: '01 / SOURCE', value: 'Natural spring' },
  { label: '02 / FINISH', value: 'Filtered pure' },
  { label: '03 / SERVICE', value: 'Store + delivery' },
];

export default function SpringsPage() {
  const rootRef = useRef(null);
  useSpringsFx(rootRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = createContactMailto('ALDEN Springs Early Access', formData);
  };

  const updateField = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="springs-page" ref={rootRef}>
      <Navbar />

      <main>
        <section className="springs-hero" aria-labelledby="springs-title">
          <div className="springs-hero-shell">
            <div className="springs-hero-main">
              <p className="springs-kicker">ALDEN SPRINGS <span>·</span> PURE WATER</p>
              <h1 id="springs-title" className="springs-hero-title">SPRINGS</h1>
              <div className="springs-hero-rule">
                <span>01</span><span>JAMAICA · COMING 2027</span>
              </div>
            </div>

            <aside className="springs-hero-aside" aria-label="ALDEN Springs launch information">
              <div className="springs-stage" aria-hidden="true">
                <Suspense fallback={null}><SpringsScene /></Suspense>
                <span className="springs-stage-label">ALDEN<br />SPRINGS</span>
              </div>
              <div className="springs-hero-note">
                <span className="springs-launch-label">COMING 2027</span>
                <p>Bottled spring water, cooler refills, and delivery for homes, stores, offices, gyms, and events across Jamaica.</p>
                <a className="springs-button springs-button--light" href="#water-store">
                  Explore the water store <span aria-hidden="true">↓</span>
                </a>
              </div>
            </aside>
          </div>
          <div className="springs-hero-coordinate" aria-hidden="true">18° 01′ N&nbsp; / &nbsp;76° 48′ W</div>
        </section>

        <section id="water-store" className="springs-store-section" aria-labelledby="water-store-title">
          <div className="springs-section-shell">
            <div className="springs-section-heading" data-reveal>
              <div>
                <p className="springs-kicker">WATER STORE <span>·</span> 01—03</p>
                <h2 id="water-store-title">Good water.<br /><em>Every day.</em></h2>
              </div>
              <p>From a bottle in your bag to a refill at your door, find the format that fits your day.</p>
            </div>

            <div className="springs-product-grid">
              {SPRINGS_PRODUCTS.map((product, index) => (
                <article key={product.number} className="springs-product-card" data-tilt data-reveal style={{ '--delay': `${index * 110}ms` }}>
                  <div className="springs-product-topline">
                    <span>{product.number} / FORMAT</span>
                    <span>{product.use}</span>
                  </div>
                  <div className="springs-product-volume" aria-label={`${product.size} ${product.unit}`}>
                    <span>{product.size}</span><small>{product.unit}</small>
                  </div>
                  <div className="springs-product-copy">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="springs-product-index" aria-hidden="true">A</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="springs-source-section" aria-labelledby="springs-source-title">
          <div className="springs-section-shell">
            <div className="springs-source-heading" data-reveal>
              <p className="springs-kicker">THE SPRINGS STANDARD</p>
              <h2 id="springs-source-title">From natural source<br />to everyday supply.</h2>
              <p>ALDEN Springs is building a dependable water service for daily hydration: bottled water, cooler refills, and supply for homes and businesses across Jamaica.</p>
            </div>

            <div className="springs-standard-list">
              {STORE_FEATURES.map((item, index) => (
                <div className="springs-standard-item" key={item.label} data-reveal style={{ '--delay': `${index * 110}ms` }}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <span className="springs-standard-mark" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
          <div className="springs-watermark" aria-hidden="true">PURE<br />BY<br />NATURE</div>
        </section>

        <section id="early-access" className="springs-access-section" aria-labelledby="springs-access-title">
          <div className="springs-section-shell springs-access-layout">
            <div className="springs-access-intro" data-reveal>
              <p className="springs-kicker">EARLY ACCESS <span>·</span> COMING 2027</p>
              <h2 id="springs-access-title">Be first<br />to <em>pour.</em></h2>
              <p>Hear about bottle sizes, cooler refill plans, wholesale supply, delivery routes, and launch pricing as ALDEN Springs gets ready to open.</p>
              <span className="springs-access-note">KINGSTON, JAMAICA <i /> JOIN THE LIST</span>
            </div>

            <form onSubmit={handleSubmit} className="springs-form" data-reveal style={{ '--delay': '110ms' }}>
              <div className="springs-form-heading">
                <span>YOUR DETAILS</span>
                <span>01 — 04</span>
              </div>
              <label className="springs-field" htmlFor="springs-name">
                <span>Full name</span>
                <input id="springs-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={updateField} />
              </label>
              <label className="springs-field" htmlFor="springs-email">
                <span>Email address</span>
                <input id="springs-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={updateField} />
              </label>
              <label className="springs-field" htmlFor="springs-phone">
                <span>Phone number <small>Optional</small></span>
                <input id="springs-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={updateField} />
              </label>
              <label className="springs-field" htmlFor="springs-interest">
                <span>What are you interested in?</span>
                <select id="springs-interest" name="interest" required value={formData.interest} onChange={updateField}>
                  <option value="">Choose a water service</option>
                  <option value="home-delivery">Home delivery</option>
                  <option value="office-supply">Office supply</option>
                  <option value="retail">Retail / wholesale</option>
                  <option value="events">Events</option>
                </select>
              </label>
              <button className="springs-button springs-button--bright" type="submit">Join early access <span aria-hidden="true">↗</span></button>
              <p className="springs-form-note">Your email app opens with the request ready for you to send.</p>
            </form>
          </div>
        </section>

        <section className="springs-contact-section" aria-labelledby="springs-contact-title">
          <div className="springs-section-shell springs-contact-layout">
            <div data-reveal>
              <p className="springs-kicker">QUESTIONS / PARTNERSHIPS</p>
              <h2 id="springs-contact-title">Let’s talk<br /><em>water.</em></h2>
            </div>
            <div className="springs-contact-details" data-reveal style={{ '--delay': '110ms' }}>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<span aria-hidden="true">↗</span></a>
              <span>Kingston, Jamaica</span>
              <a className="springs-contact-link" href="/contact">Contact ALDEN</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
