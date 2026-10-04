import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
// import Footer from '@/components/home/Footer';
import { CONTACT_EMAIL } from '@/lib/contact';

import './WhoWeArePage.css';

const disciplines = [
  {
    number: '01',
    title: 'Software',
    description:
      'Web applications, digital products, and technical systems built around real-world needs.',
    tags: ['Web Apps', 'APIs', 'Systems'],
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Interfaces and digital experiences where visual clarity, usability, and character work together.',
    tags: ['UI/UX', 'Interaction', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Visual',
    description:
      'Photography and visual direction shaped by the same attention to detail we bring to technology.',
    tags: ['Photography', 'Art Direction', 'Visuals'],
  },
];

const principles = [
  {
    number: '01',
    title: 'Precision',
    description:
      'Details matter. From pixels to architecture, we care about how things are made.',
  },
  {
    number: '02',
    title: 'Utility',
    description:
      'Good work should do something. We build with a purpose, not simply for appearance.',
  },
  {
    number: '03',
    title: 'Character',
    description:
      'Technology does not have to feel sterile. We make space for personality and visual identity.',
  },
  {
    number: '04',
    title: 'Curiosity',
    description:
      'We stay interested in new tools, new ideas, and better ways to solve problems.',
  },
];

const positions = [
  {
    title: 'Frontend Developer',
    type: 'Full-Time',
    location: 'Remote',
    description:
      'Build polished web experiences with React, TypeScript, and modern frontend technologies.',
  },
  {
    title: 'Photographer',
    type: 'Contract',
    location: 'Kingston, Jamaica',
    description:
      'Create compelling visual work for brands, people, events, and editorial projects.',
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-Time',
    location: 'Remote',
    description:
      'Design digital products and interfaces that balance usability, clarity, and visual character.',
  },
];

export default function WhoWeArePage() {
  const location = useLocation();
  const isCareersPage = location.pathname === '/about/careers';

  useEffect(() => {
    if (
      location.pathname !== '/about/careers' &&
      location.hash !== '#careers'
    ) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById('careers')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="about-page">
      <Navbar />

      {/* HERO */}
      <header className="about-hero">
        <div className="about-container">
          <motion.div
            className="about-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <p className="about-eyebrow">
              Independent studio · Based in the Caribbean
            </p>

            <h1 className="about-hero__title">ALDEN</h1>

            <div className="about-hero__bottom">
              <p className="about-hero__statement">
                Creative technology
                <br />
                for a world that
                <br />
                keeps moving.
              </p>

              <div className="about-hero__meta">
                <p>Strategy / Design / Engineering</p>

                <a
                  className="about-arrow-link"
                  href={isCareersPage ? '#careers' : '#studio'}
                >
                  {isCareersPage ? 'View careers' : 'Explore the studio'}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="about-hero__line" />
        </div>
      </header>

      {/* STUDIO */}
      <section id="studio" className="about-section about-studio">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-number">01</span>
            <span className="about-section-label">The studio</span>
          </div>

          <div className="about-studio__grid">
            <h2>
              Technology
              <br />
              with a human
              <br />
              point of view.
            </h2>

            <div className="about-studio__copy">
              <p className="about-lead">
                ALDEN is an independent creative technology studio building
                digital experiences, software, and visual work.
              </p>

              <p>
                We bring strategy, design, and engineering into the same
                conversation. The result is work that is technically sound,
                visually considered, and built to be useful.
              </p>

              <p>
                Based in Jamaica and open to the world, ALDEN works across
                software, digital design, and photography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="about-section about-disciplines">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-number">02</span>
            <span className="about-section-label">What we do</span>
          </div>

          <div className="about-discipline-list">
            {disciplines.map((discipline) => (
              <article
                className="about-discipline"
                key={discipline.number}
              >
                <span className="about-discipline__number">
                  {discipline.number}
                </span>

                <h3>{discipline.title}</h3>

                <div className="about-discipline__details">
                  <p>{discipline.description}</p>

                  <div className="about-tags">
                    {discipline.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <span className="about-discipline__arrow">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="about-section about-founder">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-number">03</span>
            <span className="about-section-label">The founder</span>
          </div>

          <div className="about-founder__grid">
            <div>
              <p className="about-founder__eyebrow">
                Andre Walters
              </p>

              <h2>
                Founder
                <br />
                & Creative
                <br />
                Director
              </h2>
            </div>

            <div className="about-founder__copy">
              <p className="about-lead">
                ALDEN started with a simple idea: technology and creativity
                should not have to live in separate worlds.
              </p>

              <p>
                Andre brings a background in software engineering, electronics,
                interface design, and photography to the studio. That
                combination shapes how ALDEN approaches both technical and
                creative work.
              </p>

              <p>
                The studio remains intentionally independent and founder-led,
                allowing projects to stay close to the people building them.
              </p>

              <a href="/core" className="about-text-link">
                At our core <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="about-section about-principles">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-number">04</span>
            <span className="about-section-label">Principles</span>
          </div>

          <div className="about-principles__list">
            {principles.map((principle) => (
              <div
                className="about-principle"
                key={principle.number}
              >
                <span>{principle.number}</span>

                <h3>{principle.title}</h3>

                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section
        id="careers"
        className={`about-section about-careers ${
          isCareersPage ? 'is-careers-page' : ''
        }`}
      >
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-number">05</span>
            <span className="about-section-label">Careers</span>
          </div>

          <div className="about-careers__intro">
            <h2>
              Build with
              <br />
              us.
            </h2>

            <div>
              <p className="about-lead">
                ALDEN is growing selectively.
              </p>

              <p>
                We are interested in people who care about their craft,
                understand the value of details, and enjoy working across
                disciplines.
              </p>
            </div>
          </div>

          <div className="about-careers__list">
            {positions.map((position) => (
              <article
                className="about-position"
                key={position.title}
              >
                <div className="about-position__main">
                  <span className="about-position__type">
                    {position.type}
                  </span>

                  <h3>{position.title}</h3>

                  <p>{position.description}</p>
                </div>

                <div className="about-position__side">
                  <span>{position.location}</span>

                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      `Career Application — ${position.title}`
                    )}`}
                  >
                    Apply <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="about-cta">
        <div className="about-container">
          <p className="about-eyebrow">
            Have a project in mind?
          </p>

          <h2>
            Let's make
            <br />
            something useful.
          </h2>

          <a href="/contact" className="about-cta__link">
            Start a conversation
            <span>↗</span>
          </a>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}