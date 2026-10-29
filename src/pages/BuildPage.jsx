import { useState } from 'react';
import { motion } from 'framer-motion';

import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

import './BuildPage.css';

const CONSTRUCTION_VIDEO =
  '/videos/14194634_3840_2160_30fps.mp4';

const CONSTRUCTION_SERVICES = [
  {
    number: '01',
    title: 'Steel Frame Homes',
    description:
      'Durable and affordable steel frame construction designed around modern living.',
    price: 'From $XXk',
    size: '1–3 BR',
    timeline: '3–4 months',
    features: [
      'Earthquake resistant',
      'Energy efficient',
      'Low maintenance',
      'Customizable designs',
    ],
    status: 'Coming Soon',
  },
  {
    number: '02',
    title: 'Container Homes',
    description:
      'Modern container home conversions with practical layouts and contemporary finishes.',
    price: 'From $XXk',
    size: 'Studio–2 BR',
    timeline: '2–3 months',
    features: [
      'Sustainable materials',
      'Quick construction',
      'Portable design',
      'Modern finishes',
    ],
    status: 'Coming Soon',
  },
  {
    number: '03',
    title: 'Blueprint Packages',
    description:
      'DIY home building plans and material guidance for people who want to build independently.',
    price: 'From $XXX',
    size: 'Various',
    timeline: 'DIY',
    features: [
      'Detailed plans',
      'Material lists',
      'Construction guide',
      'Support consultation',
    ],
    status: 'Available',
  },
];

const WAITLIST_BENEFITS = [
  'Early-bird pricing discounts',
  'Priority access to first homes',
  'Exclusive design previews',
  'Regular construction updates',
  'Invitation to launch events',
];

const PROJECT_TIMELINE = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'Discuss your site, budget, lifestyle, and preferred home configuration.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Develop the floor plan, finishes, materials, and overall direction.',
  },
  {
    number: '03',
    title: 'Planning',
    description:
      'Finalize specifications, costs, procurement, and construction planning.',
  },
  {
    number: '04',
    title: 'Build',
    description:
      'Construction begins with progress tracked from foundation to completion.',
  },
];

const BUILD_PRINCIPLES = [
  {
    number: '01',
    title: 'Designed for real life',
    description: 'Thoughtful layouts make room for the routines, people, and plans that turn a house into a home.',
  },
  {
    number: '02',
    title: 'Practical by design',
    description: 'Engineering, materials, and construction planning work together from the first conversation.',
  },
  {
    number: '03',
    title: 'Clear from day one',
    description: 'Each project starts with a clear scope, a considered timeline, and decisions made with you.',
  },
];

const BUILD_FAQ = [
  {
    question: 'What can I enquire about now?',
    answer: 'You can register interest in steel frame homes, container homes, or the blueprint packages that are currently available.',
  },
  {
    question: 'When will the homes be available?',
    answer: 'Steel frame and container homes are marked as coming soon. Join the early access list for launch timing, designs, and pricing updates.',
  },
  {
    question: 'Can a home be tailored to my needs?',
    answer: 'Yes. The first conversation covers your site, budget, preferred layout, and timeline so the right starting point can be scoped.',
  },
  {
    question: 'What happens after I enquire?',
    answer: 'The process begins with a consultation, then moves through design, planning, and a build plan with clear next steps.',
  },
];

function createContactMailto(subject, data) {
  const body = [
    `Name: ${data.name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    `Home Type: ${data.homeType || ''}`,
    `Timeline: ${data.timeline || ''}`,
    '',
    'Message:',
    data.message || '',
  ].join('\n');

  return `mailto:hello@alden-one.vercel.app?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function HomeTypeCard({ service }) {
  return (
    <article className="home-type-card">
      <div className="home-type-card-top">
        <span className="home-type-number">
          {service.number}
        </span>

        <span
          className={`home-type-status ${
            service.status === 'Available'
              ? 'is-available'
              : ''
          }`}
        >
          {service.status}
        </span>
      </div>

      <div className="home-type-card-content">
        <h3>{service.title}</h3>

        <p className="home-type-description">
          {service.description}
        </p>

        <div className="home-type-specs">
          <div>
            <span>PRICE</span>
            <strong>{service.price}</strong>
          </div>

          <div>
            <span>SIZE</span>
            <strong>{service.size}</strong>
          </div>

          <div>
            <span>TIMELINE</span>
            <strong>{service.timeline}</strong>
          </div>
        </div>

        <ul className="home-type-features">
          {service.features.map((feature) => (
            <li key={feature}>
              <span>+</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function BuildPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeType: '',
    timeline: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    window.location.href = createContactMailto(
      'ALDEN Construction Waitlist',
      formData
    );
  };

  return (
    <div className="build-page">
      <Navbar />

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

      <section className="build-hero">
        <div className="build-hero-video">
          <video
            className="build-hero-video-element"
            src={CONSTRUCTION_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          />
        </div>

        <div className="build-hero-overlay" />
        <div className="build-hero-vignette" />

        <div className="build-hero-content">
          <div className="build-hero-kicker">
            <span>ALDEN</span>
            <span>CONSTRUCTION</span>
          </div>

          <div className="build-hero-title">
            <h1>
              BUILD
              <br />
              <span>SOMETHING</span>
              <br />
              SOLID.
            </h1>
          </div>

          <div className="build-hero-bottom">
            <p>
              Thoughtful homes.
              <br />
              Built differently.
            </p>

            <div className="build-hero-scroll">
              <span>SCROLL TO EXPLORE</span>
              <i />
            </div>
          </div>

          <a className="build-hero-cta" href="#services">
            Explore home options <span aria-hidden="true">↘</span>
          </a>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTRO                                                            */}
      {/* ================================================================ */}

      <section className="build-section build-idea">
        <div className="build-section-inner">
          <div className="section-index">01 / A DIFFERENT APPROACH</div>

          <div className="build-idea-layout">
            <h2>
              HOMES WITH
              <br />
              <span>PURPOSE.</span>
            </h2>

            <div className="build-idea-copy">
              <p className="large-copy">
                Building should feel considered from the first sketch to the final handover.
              </p>

              <p>
                ALDEN Construction brings practical engineering, thoughtful design, and modern building methods together to create functional, adaptable homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="build-section build-principles">
        <div className="build-section-inner">
          <div className="section-index">02 / WHAT GUIDES THE WORK</div>
          <div className="build-principles-heading">
            <h2>BUILT AROUND<br /><span>WHAT MATTERS.</span></h2>
            <p>Good homes balance how they look with how they work, age, and support everyday life.</p>
          </div>
          <div className="build-principles-grid">
            {BUILD_PRINCIPLES.map((principle) => (
              <article className="build-principle" key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOME TYPES                                                       */}
      {/* ================================================================ */}

      <section className="build-section build-home-types">
        <div className="build-section-inner">
          <div className="section-index">03 / HOME OPTIONS</div>

          <div className="home-types-heading">
            <h2>
              CHOOSE YOUR
              <br />
              <span>STARTING POINT.</span>
            </h2>

            <p>
              From complete homes to
              independent build packages,
              choose the approach that fits
              your project.
            </p>
          </div>

          <div id="services" className="home-types-grid">
            {CONSTRUCTION_SERVICES.map(
              (service) => (
                <HomeTypeCard
                  key={service.number}
                  service={service}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROCESS                                                          */}
      {/* ================================================================ */}

      <section className="build-section build-process">
        <div className="build-section-inner">
          <div className="section-index">04 / THE PROCESS</div>

          <div className="build-process-layout">
            <div className="build-process-heading">
              <h2>
                FROM IDEA
                <br />
                <span>TO HOME.</span>
              </h2>
            </div>

            <div className="process-list">
              {PROJECT_TIMELINE.map(
                (step, index) => (
                  <motion.article
                    key={step.number}
                    className="process-item"
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.06,
                    }}
                  >
                    <div className="process-number">
                      {step.number}
                    </div>

                    <div className="process-copy">
                      <h3>{step.title}</h3>

                      <p>
                        {step.description}
                      </p>
                    </div>

                    <div className="process-arrow">
                      ↗
                    </div>
                  </motion.article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="build-section build-faq">
        <div className="build-section-inner">
          <div className="section-index">05 / GOOD TO KNOW</div>
          <div className="build-faq-layout">
            <div>
              <h2>QUESTIONS<br /><span>BEFORE YOU BUILD.</span></h2>
              <p>Quick answers about ALDEN Construction and getting started.</p>
            </div>
            <div className="build-faq-list">
              {BUILD_FAQ.map((item, index) => (
                <details className="build-faq-item" key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WAITLIST                                                         */}
      {/* ================================================================ */}

      <section
        id="waitlist"
        className="build-section build-waitlist"
      >
        <div className="build-section-inner">
          <div className="section-index">06 / EARLY ACCESS</div>

          <div className="waitlist-layout">
            <div className="waitlist-intro">
              <h2>
                BE FIRST
                <br />
                <span>IN LINE.</span>
              </h2>

              <p>
                Join the ALDEN Construction
                waitlist for early access to
                upcoming homes, pricing,
                designs, and project updates.
              </p>

              <ul>
                {WAITLIST_BENEFITS.map(
                  (benefit) => (
                    <li key={benefit}>
                      <span>+</span>
                      {benefit}
                    </li>
                  )
                )}
              </ul>
            </div>

            <form
              className="waitlist-form"
              onSubmit={handleSubmit}
            >
              <div className="form-field">
                <label htmlFor="name">
                  NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">
                  PHONE
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1"
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="homeType">
                    HOME TYPE
                  </label>

                  <select
                    id="homeType"
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select one
                    </option>

                    <option value="Steel Frame Home">
                      Steel Frame Home
                    </option>

                    <option value="Container Home">
                      Container Home
                    </option>

                    <option value="Blueprint Package">
                      Blueprint Package
                    </option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="timeline">
                    TIMELINE
                  </label>

                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select one
                    </option>

                    <option value="ASAP">
                      ASAP
                    </option>

                    <option value="3–6 months">
                      3–6 months
                    </option>

                    <option value="6–12 months">
                      6–12 months
                    </option>

                    <option value="12+ months">
                      12+ months
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a little about your project..."
                  rows="5"
                />
              </div>

              <button
                type="submit"
                className="waitlist-submit"
              >
                <span>JOIN THE WAITLIST</span>
                <span>↗</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}

      <section className="build-cta">
        <div className="build-cta-inner">
          <div className="section-index">
            ALDEN CONSTRUCTION
          </div>

          <h2>
            LET'S BUILD
            <br />
            <span>SOMETHING REAL.</span>
          </h2>

          <a
            href="#waitlist"
            className="build-cta-button"
          >
            START A PROJECT
            <span>↗</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
