import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

import './CorePage.css';

const CORE_SERVICES = [
  {
    title: 'STRATEGY',
    description: 'Crafting comprehensive design strategies that align with business objectives and user needs. From research to implementation, ensuring every design decision serves a purpose.',
    features: ['UX Research', 'Product Planning', 'User Testing', 'Roadmapping']
  },
  {
    title: 'DESIGN',
    description: 'Creating intuitive, beautiful interfaces that balance aesthetics with functionality. Every pixel, every interaction is thoughtfully designed to enhance the user experience.',
    features: ['UI/UX Design', 'Interaction Design', 'Design Systems', 'Prototyping']
  },
  {
    title: 'DEVELOPMENT',
    description: 'Bringing designs to life with clean, efficient code. Specializing in modern web technologies and frameworks to create performant, scalable solutions.',
    features: ['Frontend Development', 'React/Vue/Astro', 'Performance Optimization', 'Full-Stack']
  },
  {
    title: 'LEADERSHIP',
    description: 'Guiding teams and projects to success. From mentoring junior designers to leading cross-functional initiatives, helping organizations achieve their design goals.',
    features: ['Team Leadership', 'Design Systems', 'Mentorship', 'Technical Consulting']
  }
];

const padNumber = (number) => String(number).padStart(2, '0');

export default function CorePage() {
  return (
    <div className="core-page">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="core-hero">
          <div className="core-container">
            <p className="core-kicker">
              Digital products &amp; platforms
            </p>

            <h1 className="core-title">
              ANDRE
              <br />
              <span>WALTERS</span>
            </h1>

            <div className="core-hero-copy">
              <p>
                Software Developer & Electronics Engineer
              </p>

              <div className="core-hero-actions">
                <a href="#services">
                  Explore expertise
                  <span aria-hidden="true">
                    ↓
                  </span>
                </a>
                <a
                  href="#contact"
                  className="core-solid-link core-solid-link--primary"
                >
                  Get in touch
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>

            <div className="core-hero-meta">
              <span>ALDEN / CORE</span>
              <span>JAMAICA</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="core-section core-services-section"
        >
          <div className="core-container">
            <div className="core-section-header">
              <span className="core-eyebrow">
                Expertise
              </span>
              <h2 className="core-section-title">
                What I do
              </h2>
              <p className="core-section-copy">
                From strategy to development, bringing
                digital systems to life.
              </p>
            </div>

            <div className="core-service-grid">
              {CORE_SERVICES.map(
                (service, index) => (
                  <article
                    key={service.title}
                    className="core-service-card"
                  >
                    <span className="core-service-card__number">
                      {padNumber(index + 1)}
                    </span>

                    <h3 className="core-service-card__title">
                      {service.title}
                    </h3>

                    <p className="core-service-card__description">
                      {service.description}
                    </p>

                    <div className="core-service-card__features">
                      {service.features.map(
                        (feature) => (
                          <span key={feature}>
                            <span aria-hidden="true">
                              +
                            </span>
                            {feature}
                          </span>
                        )
                      )}
                    </div>

                    <a
                      className="core-service-card__link"
                      href="#contact"
                    >
                      Discuss this service
                      <span aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* Statement Section */}
        <section className="core-statement">
          <div className="core-container">
            <span className="core-statement__eyebrow">
              The Approach
            </span>

            <h2 className="core-statement__title">
              Engineering meets
              <span>creative perspective.</span>
            </h2>

            <div className="core-statement__footer">
              <p>
                I blend technical discipline with a creative
                approach to design systems that are intuitive,
                resilient, and purposeful.
              </p>

              <span className="core-statement__mark">
                ALDEN / CORE
              </span>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="core-section core-experience-section">
          <div className="core-container">
            <div className="core-section-header">
              <span className="core-eyebrow">
                Background
              </span>
              <h2 className="core-section-title">
                Experience
              </h2>
              <p className="core-section-copy">
                Professional journey in technology and engineering.
              </p>
            </div>

            <div className="core-experience-grid">
              <div className="core-experience-item">
                <span className="core-experience-item__year">
                  2021–2024
                </span>
                <h3 className="core-experience-item__role">
                  Software Developer
                </h3>
                <p className="core-experience-item__company">
                  Jamaica Public Service Company
                </p>
                <p className="core-experience-item__description">
                  Contributed to enterprise platforms including the MyJPS Mobile App and internal customer experience platforms.
                </p>
              </div>

              <div className="core-experience-item">
                <span className="core-experience-item__year">
                  Present
                </span>
                <h3 className="core-experience-item__role">
                  Pursuing Master's
                </h3>
                <p className="core-experience-item__company">
                  Computer-Based Management Information Systems
                </p>
                <p className="core-experience-item__description">
                  The University of the West Indies, Mona
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="core-section core-cta-section">
          <div className="core-container">
            <div className="core-cta">
              <span className="core-eyebrow">
                Let's Connect
              </span>

              <h2 className="core-section-title">
                Start a conversation
              </h2>

              <div className="core-cta-footer">
                <p className="core-section-copy">
                  Tell me what you're trying to build.
                  I'll help you find the right path forward.
                </p>

                <div className="core-actions">
                  <a
                    href="mailto:aldenwebstudios@gmail.com"
                    className="core-solid-link"
                  >
                    Get in touch
                    <span aria-hidden="true">
                      ↗
                    </span>
                  </a>

                  <a
                    href="#services"
                    className="core-pill-link"
                  >
                    View Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer showContactCta={false} />
    </div>
  );
}
