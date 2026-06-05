import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

const WEB_STUDIO_SERVICES = [
  {
    title: "Digital Transformation",
    description: "Transform your business with cutting-edge technologies to enhance processes, culture, and customer experiences.",
    features: ["Assess Current State", "Create Digital Strategic Plan", "Implement and Integrate", "Monitor and Optimize"],
    icon: "🛡"
  },
  {
    title: "e-Commerce",
    description: "Comprehensive solution for launching, optimizing, and managing online stores with advanced features.",
    features: ["Product & Inventory Management", "Order & Shipping Management", "Multi-Vendor Marketplace", "Secure Payment Gateways"],
    icon: "🛒"
  },
  {
    title: "Website Development",
    description: "Custom, scalable, and high-performing websites and applications to elevate your online presence.",
    features: ["Tailored Made To Your Needs", "Scalable Solutions", "Seamless Performance", "Enhanced Engagement"],
    icon: "✓"
  },
  {
    title: "Mobile App Development",
    description: "Custom, high-performance iOS and Android apps to engage and elevate your business.",
    features: ["Custom Development", "Seamless Integration", "Innovative Design", "Enhanced Security"],
    icon: "📱"
  },
  {
    title: "Automation & Integration",
    description: "Transform with integrated digital technologies and automation for efficiency and growth.",
    features: ["Task Automation", "Data Integration", "Process Optimization", "Cost Reduction"],
    icon: "⚙"
  },
  {
    title: "Help Desk Solution",
    description: "Enhance support with 24/7 help desk, streamlining issue resolution and improving satisfaction.",
    features: ["Ticket Management", "Multi-Channel Support", "Automated Responses", "Knowledge Base"],
    icon: "🎧"
  },
  {
    title: "Cloud Hosting",
    description: "Scalable, secure, and cost-effective cloud services for digital efficiency and reliability.",
    features: ["Web App & Website Hosting", "Scalable Resources", "Enhanced Security", "Automated Backups"],
    icon: "☁"
  },
  {
    title: "Content Marketing",
    description: "Boost engagement and drive growth with targeted, high-quality content tailored to your audience.",
    features: ["Audience Research", "Content Planning", "Content Creation", "Performance Analysis"],
    icon: "📝"
  },
  {
    title: "Quality Assurance",
    description: "Ensure software reliability and user satisfaction with comprehensive testing strategies.",
    features: ["Bug Detection", "Performance Testing", "Usability Testing", "Automated Testing"],
    icon: "🔍"
  },
  {
    title: "Load Testing",
    description: "Optimize system performance ensuring scalability, stability, and peak traffic readiness.",
    features: ["Realistic User Simulations", "Scalability Assessment", "Performance Optimization", "Detailed Reporting"],
    icon: "⚡"
  },
  {
    title: "S&G Cloud Hosting",
    description: "Unlock the Power of the Cloud for Your S&G Smart Lock Solutions with managed hosting.",
    features: ["Cloud Server Setup & Integration", "24/7 Managed Hosting", "Scalable and Secure", "Backup & Disaster Recovery"],
    icon: "🔐"
  }
];

const HERO_TITLE_WORDS = [
  { text: 'WEB', className: 'is-web', offset: 0 },
  { text: 'SERVICES', className: 'is-services', offset: 3 }
];

const PROCESS_STEPS = [
  {
    title: 'Discovery',
    description: 'We map your business goals, audience, product logic, and technical requirements before design begins.'
  },
  {
    title: 'Strategy',
    description: 'We define the experience, architecture, rollout plan, and success metrics so the build has a clear direction.'
  },
  {
    title: 'Development',
    description: 'We build the interface, backend, integrations, automations, and performance foundation with care.'
  },
  {
    title: 'Launch & Support',
    description: 'We deploy, monitor, refine, and support the system so it keeps working beyond the first release.'
  }
];

const WEB_PORTFOLIO_PROJECTS = [
  { id: 1, title: 'CDT JAMAICA', category: 'DIGITAL PLATFORM', filter: 'enterprise', href: 'https://cdtjamaica.org', image: 'https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png' },
  { id: 2, title: 'TOTALLY BAKED', category: 'E-COMMERCE', filter: 'fullstack', href: 'https://totally-baked-ja.vercel.app', image: 'https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png' },
  { id: 3, title: 'ZENITH TEAS', category: 'TEA MANAGEMENT', filter: 'fullstack', href: 'https://zenith-taupe.vercel.app', image: 'https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png' },
  { id: 4, title: 'GLOWING LANDING', category: 'LANDING PAGE', filter: 'frontend', href: 'https://glowing-landing-page.netlify.app', image: 'https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png' },
  { id: 5, title: 'BLACKBOX SYSTEM', category: 'IOT SYSTEM', filter: 'fullstack', href: 'https://blackbox-online.vercel.app', image: 'https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png' },
  { id: 6, title: 'DAVID P BLAKE', category: 'PERSONAL PORTFOLIO', filter: 'frontend', href: 'https://davidpblake.org', image: 'https://framerusercontent.com/images/placeholder.png' },
  { id: 7, title: 'ALDEN FARM', category: 'ECOSYSTEM / AGRICULTURE', filter: 'ecosystem', href: '/farm', image: 'https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png' },
  { id: 8, title: 'ALDEN BUILD', category: 'ECOSYSTEM / CONSTRUCTION', filter: 'ecosystem', href: '/build', image: 'https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png' },
  { id: 9, title: 'ALDEN SPRINGS', category: 'ECOSYSTEM / WATER', filter: 'ecosystem', href: '/springs', image: 'https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png' },
];

const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'ecosystem', label: 'Ecosystem' },
];

function PortfolioLivePreview({ project }) {
  const previewRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;

    let didLoad = false;
    const loadPreview = () => {
      if (didLoad) return;

      const rect = preview.getBoundingClientRect();
      if (rect.top < window.innerHeight + 220 && rect.bottom > -220) {
        didLoad = true;
        setShouldLoad(true);
        observer.disconnect();
        window.removeEventListener('scroll', loadPreview);
        window.removeEventListener('resize', loadPreview);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadPreview();
        }
      });
    }, {
      rootMargin: '220px 0px',
      threshold: 0.01,
    });

    observer.observe(preview);
    loadPreview();
    const interval = window.setInterval(loadPreview, 350);
    window.addEventListener('scroll', loadPreview, { passive: true });
    window.addEventListener('resize', loadPreview);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
      window.removeEventListener('scroll', loadPreview);
      window.removeEventListener('resize', loadPreview);
    };
  }, []);

  return (
    <span className="portfolio-card__media" ref={previewRef}>
      <img src={project.image} alt="" loading="lazy" />
      {shouldLoad && (
        <iframe
          src={project.href}
          title={`${project.title} live preview`}
          className={isLoaded ? 'is-loaded' : ''}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      <span className="portfolio-card__preview-badge">
        {shouldLoad ? 'Live Preview' : 'Preview Loading'}
      </span>
    </span>
  );
}

export default function WebStudioServicesPage() {
  const location = useLocation();
  const letterRefs = useRef([]);
  const heroMetaRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroLoaderRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = WEB_PORTFOLIO_PROJECTS.filter((project) => (
    activeFilter === 'all' || project.filter === activeFilter
  ));

  useEffect(() => {
    const timers = [];
    const queueTimer = (callback, delay) => {
      const timer = setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    queueTimer(() => {
      heroLoaderRef.current?.classList.add('is-visible');

      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          queueTimer(() => {
            letter.classList.add('is-visible');
            letter.style.opacity = '1';
            letter.style.filter = 'blur(0)';
            letter.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }, 180 + index * 70);

          queueTimer(() => {
            letter.style.transition = 'none';
            letter.style.opacity = '1';
            letter.style.filter = 'blur(0)';
            letter.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }, 1200 + index * 70);
        }
      });

      queueTimer(() => {
        heroMetaRef.current?.classList.add('is-visible');
      }, 760);

      queueTimer(() => {
        heroCopyRef.current?.classList.add('is-visible');
      }, 940);
    }, 250);

    if (location.pathname.includes('portfolio')) {
      queueTimer(() => {
        document.getElementById('portfolio')?.scrollIntoView({ block: 'start' });
      }, 900);
    }

    const revealElement = (element) => {
      if (element.classList.contains('is-visible') || element.classList.contains('is-queued')) return;

      element.classList.add('is-queued');
      const index = parseInt(element.dataset.revealIndex || '0');
      queueTimer(() => {
        element.classList.add('is-visible');
      }, index * 85);
    };

    const revealPassedElements = () => {
      document.querySelectorAll('.web-reveal:not(.is-visible)').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          revealElement(element);
        }
      });
    };

    // Animate page sections and cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.web-reveal').forEach(element => {
      observer.observe(element);
    });

    revealPassedElements();
    window.addEventListener('scroll', revealPassedElements, { passive: true });
    window.addEventListener('resize', revealPassedElements);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', revealPassedElements);
      window.removeEventListener('resize', revealPassedElements);
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const portfolio = document.getElementById('portfolio');
    if (!portfolio) return undefined;

    const rect = portfolio.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return undefined;

    const timers = [];
    document.querySelectorAll('#portfolio .portfolio-card.web-reveal').forEach((card, index) => {
      card.classList.add('is-queued');
      const timer = setTimeout(() => {
        card.classList.add('is-visible');
      }, index * 65);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="web-services-hero relative min-h-screen overflow-hidden">
        <div className="web-services-grid" aria-hidden="true" />
        <div className="web-services-glow is-top" aria-hidden="true" />
        <div className="web-services-glow is-bottom" aria-hidden="true" />

        <div className="web-services-hero-inner">
          <div className="web-services-loader" ref={heroLoaderRef} aria-hidden="true">
            <span />
          </div>

          <p className="web-services-kicker" ref={heroMetaRef}>
            ALDEN WEB STUDIO · DIGITAL SYSTEMS
          </p>

          <h1 className="web-services-title" aria-label="Web Services">
            {HERO_TITLE_WORDS.map((word) => (
              <span key={word.text} className={`web-services-word ${word.className}`}>
                {word.text.split('').map((letter, letterIndex) => {
                  const globalIndex = word.offset + letterIndex;

                  return (
                    <span
                      key={`${word.text}-${letterIndex}-${letter}`}
                      className="web-services-letter"
                      ref={(el) => {
                        letterRefs.current[globalIndex] = el;
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <div className="web-services-hero-copy" ref={heroCopyRef}>
            <p>
              End-to-end web strategy, design, development, automation, and cloud delivery for sharper digital experiences.
            </p>
            <a href="#portfolio">
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Services Header */}
      <section id="services" className="web-services-section web-services-intro-section">
        <div className="web-services-section-grid" aria-hidden="true" />
        <div className="web-services-section-shell web-reveal" data-reveal-index="0">
          <span className="web-services-eyebrow">Services</span>
          <h2 className="web-services-section-title">
            ALDEN Web Studio Services
          </h2>
          <p className="web-services-section-lead">
            Comprehensive digital solutions tailored for your business needs.
          </p>
          <p className="web-services-section-copy">
            From concept to deployment, we provide end-to-end digital services that transform your vision into reality. Our expertise spans web development, mobile applications, cloud infrastructure, automation, QA, and digital marketing.
          </p>
          <a
            href="#portfolio"
            className="web-services-pill-link"
          >
            View Portfolio →
          </a>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="web-services-section web-services-portfolio-section">
        <div className="web-services-section-grid" aria-hidden="true" />
        <div className="web-services-wide-shell">
          <div className="web-services-section-heading web-reveal" data-reveal-index="0">
            <span className="web-services-eyebrow">Portfolio</span>
            <h2 className="web-services-section-title">
              Web Portfolio
            </h2>
            <p className="web-services-section-copy">
              Selected websites, platforms, and ecosystem builds from the ALDEN web studio.
            </p>
          </div>

          <div className="portfolio-filter-row web-reveal" data-reveal-index="1" aria-label="Filter web portfolio projects">
            {PORTFOLIO_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`portfolio-filter-button ${activeFilter === filter.id ? 'is-active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="portfolio-card-grid">
            {filteredProjects.map((project, index) => {
              const isExternal = project.href.startsWith('http');

              return (
                <article
                  key={project.id}
                  className="portfolio-card web-reveal"
                  data-reveal-index={index + 2}
                >
                  <PortfolioLivePreview project={project} />
                  <span className="portfolio-card__body">
                    <span className="portfolio-card__meta">{project.category}</span>
                    <span className="portfolio-card__title">{project.title}</span>
                    <a
                      href={project.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="portfolio-card__link"
                    >
                      {isExternal ? 'View Live Site' : 'View Project'} →
                    </a>
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="web-services-section web-services-grid-section">
        <div className="web-services-wide-shell">
          <div className="web-services-card-grid">
            {WEB_STUDIO_SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="service-card web-reveal"
                data-reveal-index={index}
              >
                <div className="service-card__top">
                  <span className="service-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="service-card__icon">
                    <span>{service.icon}</span>
                  </div>
                </div>
                <h3 className="service-card__title">
                  {service.title}
                </h3>
                <p className="service-card__copy">
                  {service.description}
                </p>
                <div className="service-card__features">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="service-card__feature">
                      <span>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="/contact" className="service-card__link">
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="web-services-section web-services-process-section">
        <div className="web-services-wide-shell">
          <div className="web-services-section-heading web-reveal" data-reveal-index="0">
            <span className="web-services-eyebrow">Process</span>
            <h2 className="web-services-section-title">
              Our Process
            </h2>
          </div>
          
          <div className="process-track">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title} className="process-card web-reveal" data-reveal-index={index + 1}>
                <span className="process-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="web-services-section web-services-cta-section">
        <div className="web-services-cta web-reveal" data-reveal-index="0">
          <span className="web-services-eyebrow">Start</span>
          <h2 className="web-services-section-title">
            Ready to Transform Your Business?
          </h2>
          <p className="web-services-section-copy">
            Let's discuss how our services can help you achieve your digital goals
          </p>
          <div className="web-services-actions">
            <a href="/contact" className="web-services-solid-link">
              Start Your Project
            </a>
            <a href="#portfolio" className="web-services-pill-link">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <FooterSection />

      <style>{`
        .web-services-hero {
          background:
            radial-gradient(circle at 50% 18%, rgba(204, 187, 135, 0.16), transparent 34rem),
            radial-gradient(circle at 80% 85%, rgba(255, 255, 255, 0.08), transparent 28rem),
            #050505;
        }

        .web-services-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(231, 229, 223, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231, 229, 223, 0.06) 1px, transparent 1px);
          background-size: clamp(2.5rem, 7vw, 6rem) clamp(2.5rem, 7vw, 6rem);
          mask-image: radial-gradient(circle at center, black, transparent 72%);
          opacity: 0.55;
        }

        .web-services-glow {
          position: absolute;
          width: clamp(14rem, 36vw, 34rem);
          aspect-ratio: 1;
          border: 1px solid rgba(204, 187, 135, 0.16);
          border-radius: 999px;
          filter: blur(1px);
          opacity: 0.42;
          animation: webServicesFloat 8s ease-in-out infinite alternate;
        }

        .web-services-glow.is-top {
          top: 12%;
          left: 8%;
        }

        .web-services-glow.is-bottom {
          right: 6%;
          bottom: 8%;
          animation-delay: -3s;
        }

        .web-services-hero-inner {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(7rem, 13vh, 9rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 8vh, 5rem);
          text-align: center;
        }

        .web-services-loader {
          position: relative;
          width: min(18rem, 64vw);
          height: 2px;
          margin-bottom: clamp(1.75rem, 4vh, 3rem);
          overflow: hidden;
          background: rgba(231, 229, 223, 0.12);
          opacity: 0;
          transform: scaleX(0.7);
          transition: opacity 0.45s ease, transform 0.7s cubic-bezier(0.77, 0.02, 0.38, 1);
        }

        .web-services-loader.is-visible {
          opacity: 1;
          transform: scaleX(1);
        }

        .web-services-loader span {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, #ccbb87, transparent);
          transform: translateX(-100%);
          animation: webServicesLoad 1.5s cubic-bezier(0.77, 0.02, 0.38, 1) 0.2s forwards;
        }

        .web-services-kicker,
        .web-services-hero-copy {
          opacity: 0;
          filter: blur(10px);
          transform: translateY(18px);
          transition:
            opacity 0.75s ease,
            filter 0.75s ease,
            transform 0.75s cubic-bezier(0.77, 0.02, 0.38, 1);
        }

        .web-services-kicker.is-visible,
        .web-services-hero-copy.is-visible {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }

        .web-services-kicker {
          margin: 0 0 clamp(1.25rem, 3vw, 2rem);
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.75rem, 1.4vw, 0.95rem);
          letter-spacing: clamp(0.14em, 0.8vw, 0.36em);
          color: #ccbb87;
          text-transform: uppercase;
        }

        .web-services-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.45rem, 1.25vw, 1rem);
          margin: 0;
          width: min(100%, 94rem);
        }

        .web-services-word {
          display: flex;
          justify-content: center;
          gap: clamp(0.04em, 0.8vw, 0.14em);
          width: 100%;
        }

        .web-services-letter {
          display: inline-block;
          font-family: 'Koulen', cursive;
          line-height: 0.74;
          color: #e7e5df;
          opacity: 0;
          filter: blur(14px);
          transform: translate3d(0, -3.5rem, 0) scale(0.82);
          text-shadow:
            0 0 2.4rem rgba(204, 187, 135, 0.18),
            0 0 5rem rgba(255, 255, 255, 0.06);
          transition:
            opacity 0.88s ease,
            filter 0.88s ease,
            transform 0.88s cubic-bezier(0.77, 0.02, 0.38, 1);
        }

        .web-services-letter.is-visible {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0) scale(1);
        }

        .web-services-word.is-web .web-services-letter {
          font-size: clamp(5.25rem, 14vw, 13rem);
        }

        .web-services-word.is-services .web-services-letter {
          font-size: clamp(3.65rem, 10vw, 10.5rem);
        }

        .web-services-hero-copy {
          width: min(100%, 44rem);
          margin-top: clamp(1.65rem, 4vw, 2.8rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.35rem;
        }

        .web-services-hero-copy p {
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          line-height: 1.75;
          color: rgba(231, 229, 223, 0.76);
        }

        .web-services-hero-copy a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          padding: 0.85rem 1.35rem;
          border: 1px solid rgba(204, 187, 135, 0.78);
          border-radius: 999px;
          color: #ccbb87;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .web-services-hero-copy a:hover {
          background: #ccbb87;
          color: #050505;
          transform: translateY(-2px);
        }

        .web-reveal {
          opacity: 0;
          filter: blur(14px);
          transform: translate3d(0, 2.25rem, 0) scale(0.985);
          transition:
            opacity 0.85s ease,
            filter 0.85s ease,
            transform 0.85s cubic-bezier(0.77, 0.02, 0.38, 1);
        }

        .web-reveal.is-visible {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0) scale(1);
        }

        .web-services-section {
          position: relative;
          overflow: hidden;
          padding: clamp(5.5rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem);
          background:
            radial-gradient(circle at 15% 10%, rgba(204, 187, 135, 0.1), transparent 28rem),
            #050505;
        }

        .web-services-intro-section {
          padding-top: clamp(5rem, 10vw, 7rem);
        }

        .web-services-grid-section {
          padding-top: clamp(2.5rem, 6vw, 4rem);
        }

        .web-services-process-section {
          background:
            radial-gradient(circle at 85% 20%, rgba(204, 187, 135, 0.11), transparent 30rem),
            #050505;
        }

        .web-services-portfolio-section {
          background:
            radial-gradient(circle at 20% 10%, rgba(204, 187, 135, 0.11), transparent 32rem),
            radial-gradient(circle at 86% 82%, rgba(255, 255, 255, 0.06), transparent 24rem),
            #050505;
        }

        .web-services-section-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(231, 229, 223, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231, 229, 223, 0.045) 1px, transparent 1px);
          background-size: clamp(2.8rem, 8vw, 6.5rem) clamp(2.8rem, 8vw, 6.5rem);
          opacity: 0.6;
          mask-image: radial-gradient(circle at center, black, transparent 70%);
          pointer-events: none;
        }

        .web-services-section-shell,
        .web-services-wide-shell,
        .web-services-cta {
          position: relative;
          z-index: 1;
          margin: 0 auto;
        }

        .web-services-section-shell {
          width: min(100%, 54rem);
          padding: clamp(2rem, 5vw, 4rem);
          border: 1px solid rgba(231, 229, 223, 0.1);
          border-radius: clamp(1.5rem, 4vw, 2.4rem);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025));
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.28);
          text-align: center;
        }

        .web-services-wide-shell {
          width: min(100%, 82rem);
        }

        .web-services-section-heading {
          max-width: 42rem;
          margin: 0 auto clamp(2.5rem, 6vw, 4rem);
          text-align: center;
        }

        .web-services-eyebrow {
          display: inline-block;
          margin-bottom: 1rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.36em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .web-services-section-title {
          margin: 0;
          font-family: 'Koulen', cursive;
          font-size: clamp(2.75rem, 7vw, 6.5rem);
          line-height: 0.92;
          color: #e7e5df;
          text-transform: uppercase;
          text-wrap: balance;
        }

        .web-services-section-lead,
        .web-services-section-copy {
          margin: 0 auto;
          font-family: 'Roboto Mono', monospace;
          line-height: 1.8;
        }

        .web-services-section-lead {
          max-width: 42rem;
          margin-top: 1.25rem;
          color: #ccbb87;
          font-size: clamp(1rem, 2.3vw, 1.35rem);
        }

        .web-services-section-copy {
          max-width: 46rem;
          margin-top: 1.25rem;
          color: rgba(231, 229, 223, 0.66);
          font-size: clamp(0.92rem, 1.45vw, 1.05rem);
        }

        .web-services-pill-link,
        .web-services-solid-link,
        .service-card__link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          border-radius: 999px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .web-services-pill-link {
          margin-top: 2rem;
          padding: 0.85rem 1.45rem;
          border: 1px solid rgba(204, 187, 135, 0.72);
          color: #ccbb87;
        }

        .web-services-solid-link,
        .service-card__link {
          padding: 0.9rem 1.45rem;
          border: 1px solid #ccbb87;
          background: #ccbb87;
          color: #050505;
        }

        .web-services-pill-link:hover,
        .web-services-solid-link:hover,
        .service-card__link:hover {
          transform: translateY(-2px);
        }

        .web-services-pill-link:hover {
          background: #ccbb87;
          color: #050505;
        }

        .web-services-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .portfolio-filter-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 0 auto clamp(2rem, 4vw, 3rem);
        }

        .portfolio-filter-button {
          min-height: 2.65rem;
          padding: 0.65rem 1rem;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.045);
          color: rgba(231, 229, 223, 0.66);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .portfolio-filter-button:hover,
        .portfolio-filter-button.is-active {
          border-color: rgba(204, 187, 135, 0.72);
          background: rgba(204, 187, 135, 0.12);
          color: #ccbb87;
          transform: translateY(-1px);
        }

        .portfolio-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .portfolio-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          overflow: hidden;
          border: 1px solid rgba(231, 229, 223, 0.1);
          border-radius: 1.65rem;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.02)),
            radial-gradient(circle at 20% 0%, rgba(204, 187, 135, 0.12), transparent 16rem);
          box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.24);
        }

        .portfolio-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(115deg, rgba(255, 255, 255, 0.14), transparent 38%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .portfolio-card:hover {
          border-color: rgba(204, 187, 135, 0.38);
          transform: translateY(-0.25rem);
        }

        .portfolio-card:hover::after {
          opacity: 1;
        }

        .portfolio-card__media {
          position: relative;
          display: block;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
        }

        .portfolio-card__media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(5, 5, 5, 0.34));
        }

        .portfolio-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.9) contrast(0.95);
          transform: scale(1.01);
          transition: transform 0.45s ease, filter 0.45s ease;
        }

        .portfolio-card:hover .portfolio-card__media img {
          filter: saturate(1.05) contrast(1);
          transform: scale(1.055);
        }

        .portfolio-card__media iframe {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          border: 0;
          background: #050505;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.82);
          transform-origin: top left;
          width: 122%;
          height: 122%;
          transition: opacity 0.45s ease, filter 0.45s ease;
        }

        .portfolio-card__media iframe.is-loaded {
          opacity: 0.92;
        }

        .portfolio-card:hover .portfolio-card__media iframe.is-loaded {
          opacity: 1;
          filter: saturate(1.05) contrast(1.02);
        }

        .portfolio-card__preview-badge {
          position: absolute;
          z-index: 2;
          top: 0.85rem;
          left: 0.85rem;
          padding: 0.45rem 0.65rem;
          border: 1px solid rgba(204, 187, 135, 0.34);
          border-radius: 999px;
          background: rgba(5, 5, 5, 0.68);
          color: #ccbb87;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
        }

        .portfolio-card__body {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          padding: clamp(1.25rem, 2vw, 1.65rem);
        }

        .portfolio-card__meta {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: rgba(204, 187, 135, 0.72);
          text-transform: uppercase;
        }

        .portfolio-card__title {
          font-family: 'Koulen', cursive;
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          line-height: 0.95;
          color: #e7e5df;
          text-transform: uppercase;
        }

        .portfolio-card__link {
          margin-top: 0.35rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.76rem;
          letter-spacing: 0.12em;
          color: #ccbb87;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .portfolio-card__link:hover {
          color: #f7d986;
          transform: translateX(0.18rem);
        }

        .service-card {
          position: relative;
          min-height: 100%;
          padding: clamp(1.4rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(231, 229, 223, 0.1);
          border-radius: 1.65rem;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.02)),
            radial-gradient(circle at 15% 0%, rgba(204, 187, 135, 0.12), transparent 14rem);
          box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.22);
          overflow: hidden;
        }

        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(115deg, rgba(255, 255, 255, 0.12), transparent 36%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .service-card:hover {
          border-color: rgba(204, 187, 135, 0.35);
          transform: translateY(-0.25rem);
        }

        .service-card:hover::after {
          opacity: 1;
        }

        .service-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.6rem;
        }

        .service-card__number {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          color: rgba(204, 187, 135, 0.78);
        }

        .service-card__icon {
          width: 3.35rem;
          height: 3.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(204, 187, 135, 0.12);
          border: 1px solid rgba(204, 187, 135, 0.22);
          font-size: 1.6rem;
        }

        .service-card__title {
          margin: 0 0 0.8rem;
          font-family: 'Koulen', cursive;
          font-size: clamp(1.65rem, 2.7vw, 2.25rem);
          line-height: 0.95;
          color: #e7e5df;
          text-transform: uppercase;
        }

        .service-card__copy {
          margin: 0 0 1.45rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.7;
          color: rgba(231, 229, 223, 0.62);
        }

        .service-card__features {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin: auto 0 1.6rem;
        }

        .service-card__feature {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          line-height: 1.55;
          color: rgba(231, 229, 223, 0.66);
        }

        .service-card__feature span:first-child {
          color: #ccbb87;
        }

        .service-card__link {
          width: 100%;
        }

        .process-track {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .process-card {
          position: relative;
          padding: clamp(1.5rem, 3vw, 2rem);
          border: 1px solid rgba(231, 229, 223, 0.1);
          border-radius: 1.5rem;
          background: rgba(255, 255, 255, 0.045);
        }

        .process-card::before {
          content: '';
          position: absolute;
          top: 2.15rem;
          left: calc(100% - 0.5rem);
          width: 1rem;
          height: 1px;
          background: rgba(204, 187, 135, 0.35);
        }

        .process-card:last-child::before {
          display: none;
        }

        .process-card__number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          margin-bottom: 1.25rem;
          border-radius: 999px;
          background: #ccbb87;
          color: #050505;
          font-family: 'Koulen', cursive;
          font-size: 1.35rem;
        }

        .process-card h3 {
          margin: 0 0 0.8rem;
          font-family: 'Koulen', cursive;
          font-size: 1.6rem;
          line-height: 1;
          color: #e7e5df;
          text-transform: uppercase;
        }

        .process-card p {
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.86rem;
          line-height: 1.7;
          color: rgba(231, 229, 223, 0.62);
        }

        .web-services-cta {
          width: min(100%, 58rem);
          padding: clamp(2rem, 5vw, 4rem);
          border: 1px solid rgba(204, 187, 135, 0.2);
          border-radius: clamp(1.5rem, 4vw, 2.5rem);
          background:
            radial-gradient(circle at 50% 0%, rgba(204, 187, 135, 0.16), transparent 25rem),
            linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025));
          text-align: center;
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.28);
        }

        .web-services-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        @keyframes webServicesLoad {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes webServicesFloat {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(1.25rem, -1rem, 0) scale(1.08);
          }
        }

        @media (max-width: 767px) {
          .web-services-section {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 4.25rem;
            padding-bottom: 4.25rem;
          }

          .web-services-hero-inner {
            align-items: stretch;
            padding-top: 6.5rem;
            padding-bottom: 3.5rem;
          }

          .web-services-title,
          .web-services-word {
            width: 100%;
          }

          .web-services-word {
            gap: 0.035em;
          }

          .web-services-word.is-web .web-services-letter {
            font-size: clamp(5.1rem, 25vw, 7.4rem);
          }

          .web-services-word.is-services .web-services-letter {
            font-size: clamp(2.55rem, 12.7vw, 4rem);
          }

          .web-services-kicker {
            max-width: 18rem;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
          }

          .web-services-hero-copy {
            margin-left: auto;
            margin-right: auto;
          }

          .web-services-section-shell,
          .web-services-cta {
            padding: 1.35rem;
          }

          .web-services-section-title {
            font-size: clamp(2.65rem, 15vw, 4.25rem);
          }

          .web-services-card-grid,
          .portfolio-card-grid,
          .process-track {
            grid-template-columns: 1fr;
          }

          .portfolio-filter-row {
            justify-content: flex-start;
          }

          .portfolio-filter-button {
            flex: 1 1 calc(50% - 0.75rem);
          }

          .service-card {
            border-radius: 1.25rem;
            padding: 1.15rem;
          }

          .service-card__top {
            margin-bottom: 1rem;
          }

          .service-card__icon {
            width: 2.9rem;
            height: 2.9rem;
            font-size: 1.35rem;
          }

          .service-card__copy {
            margin-bottom: 1rem;
          }

          .service-card__features {
            gap: 0.48rem;
            margin-bottom: 1.15rem;
          }

          .service-card__feature {
            font-size: 0.74rem;
          }

          .process-card::before {
            top: auto;
            left: 2.95rem;
            bottom: -1rem;
            width: 1px;
            height: 1rem;
          }

          .web-services-actions,
          .web-services-pill-link,
          .web-services-solid-link {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
