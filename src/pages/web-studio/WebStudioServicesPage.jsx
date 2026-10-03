import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import {
  HERO_TITLE_WORDS,
  WEB_STUDIO_SERVICES,
  PROCESS_STEPS,
  WEB_PORTFOLIO_PROJECTS,
  PORTFOLIO_FILTERS,
} from './webStudioData';
import './WebStudioServicesPage.css';

const REVEAL_STAGGER_MS = 85;
const padNumber = (number) => String(number).padStart(2, '0');
const isExternalLink = (href) => href.startsWith('http');
const CLIENT_PROJECTS = WEB_PORTFOLIO_PROJECTS.filter((project) => project.filter !== 'ecosystem');
const ALDEN_BUILD_PROJECTS = WEB_PORTFOLIO_PROJECTS.filter((project) => project.filter === 'ecosystem');

/**
 * @typedef {{ titleRef: React.RefObject<HTMLDivElement | null>; kickerRef: React.RefObject<HTMLParagraphElement | null>; copyRef: React.RefObject<HTMLDivElement | null>; }} HeroIntroRefs
 */

/**
 * @param {{ titleRef: React.RefObject<HTMLDivElement | null>; kickerRef: React.RefObject<HTMLParagraphElement | null>; copyRef: React.RefObject<HTMLDivElement | null>; }} props
 */
function useHeroIntro({ titleRef, kickerRef, copyRef }) {
  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll('.web-services-letter') ?? [];
    letters.forEach((letter) => letter.classList.add('is-visible'));
    kickerRef.current?.classList.add('is-visible');
    copyRef.current?.classList.add('is-visible');
  }, [titleRef, kickerRef, copyRef]);
}

/**
 * @param {React.RefObject<HTMLElement | null>} rootRef
 * @param {string | number | undefined} dependency
 */
function useScrollReveal(rootRef, dependency) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    /** @type {ReturnType<typeof setTimeout>[]} */
    const timers = [];
    /**
     * @param {Element} element
     */
    const reveal = (element) => {
      if (element.classList.contains('is-queued')) return;
      element.classList.add('is-queued');
      const delay = Number(element.dataset.revealIndex || 0) * REVEAL_STAGGER_MS;
      timers.push(setTimeout(() => element.classList.add('is-visible'), delay));
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        if (isIntersecting || boundingClientRect.top < 0) {
          reveal(target);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    root.querySelectorAll('.web-reveal:not(.is-visible)').forEach((element) => observer.observe(element));

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
      root.querySelectorAll('.web-reveal.is-queued:not(.is-visible)').forEach((element) => {
        element.classList.remove('is-queued');
      });
    };
  }, [rootRef, dependency]);
}

/**
 * @param {{ project: { id: number; title: string; category: string; href: string; image: string; filter?: string }; }} props
 */
function PortfolioPreview({ project }) {
  /**
   * @param {Event & { currentTarget: HTMLImageElement }} event
   */
  const handleError = (event) => {
    event.currentTarget.hidden = true;
    event.currentTarget.parentElement?.classList.add('has-failed-preview');
  };

  return (
    <span className="portfolio-card__media">
      <span className="portfolio-card__fallback" aria-hidden="true">
        <strong>{project.title}</strong>
        <small>{project.category}</small>
      </span>
      <img src={project.image} alt={`${project.title} project preview`} loading="lazy" onError={handleError} />
      <iframe
        src={project.href}
        title={`${project.title} live website preview`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className="portfolio-card__preview-badge">LIVE PREVIEW / {padNumber(project.id)}</span>
    </span>
  );
}

/**
 * @param {{ project: { id: number; title: string; category: string; href: string; image: string; filter?: string }; revealIndex: number; }} props
 */
function PortfolioCard({ project, revealIndex }) {
  const external = isExternalLink(project.href);
  const CardLink = external ? 'a' : Link;
  const destinationProps = external
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: project.href };

  return (
    <CardLink
      {...destinationProps}
      className="portfolio-card portfolio-card--live web-reveal"
      data-reveal-index={revealIndex}
      aria-label={`${external ? 'Open' : 'View'} ${project.title}${external ? ' in a new tab' : ''}`}
    >
      <PortfolioPreview project={project} />
      <span className="portfolio-card__body">
        <span className="portfolio-card__meta">{project.category}</span>
        <span className="portfolio-card__title">{project.title}</span>
        <span className="portfolio-card__link">
          {external ? 'Open Site' : 'View Project'} <span aria-hidden="true">→</span>
        </span>
      </span>
    </CardLink>
  );
}

/**
 * @param {{ eyebrow: string; title: string; copy?: string }} props
 */
function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="web-services-editorial-heading web-reveal" data-reveal-index="0">
      <span className="web-services-eyebrow">{eyebrow}</span>
      <h2 className="web-services-section-title">{title}</h2>
      {copy && <p className="web-services-section-copy">{copy}</p>}
    </div>
  );
}

export default function WebStudioServicesPage() {
  const { hash } = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const kickerRef = useRef(null);
  const copyRef = useRef(null);
  const filteredProjects = CLIENT_PROJECTS.filter(
    (project) => activeFilter === 'all' || project.filter === activeFilter
  );

  useHeroIntro({ titleRef, kickerRef, copyRef });
  useScrollReveal(pageRef, activeFilter);

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <div ref={pageRef} className="web-studio-page min-h-screen">
      <Navbar />
      <section className="web-services-hero relative overflow-hidden">
        <div className="web-services-hero-inner">
          <p className="web-services-kicker" ref={kickerRef}>
            Digital products &amp; platforms · Kingston, JA
          </p>
          <h1 className="web-services-title" aria-label="Alden's Web Studio" ref={titleRef}>
            {HERO_TITLE_WORDS.map(({ text, className }) => (
              <span key={text} className={`web-services-word ${className}`}>
                {[...text].map((letter, index) => (
                  <span key={`${letter}-${index}`} className="web-services-letter">
                    {letter === ' ' ? '\u00a0' : letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="web-services-hero-copy" ref={copyRef}>
            <p>Digital experiences built to move ambitious businesses forward.</p>
            <a href="#portfolio">Explore selected work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="web-services-section web-services-portfolio-section">
        <div className="web-services-wide-shell">
          <SectionHeading eyebrow="Client Work" title="Built for real life." copy="Websites, platforms, and digital tools made to solve real problems." />
          <div className="portfolio-filter-row web-reveal" data-reveal-index="1" aria-label="Filter web portfolio projects">
            {PORTFOLIO_FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveFilter(id)}
                className={`portfolio-filter-button ${activeFilter === id ? 'is-active' : ''}`}
                aria-pressed={activeFilter === id}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="portfolio-card-grid" aria-label="Selected web projects">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} revealIndex={index + 2} />
            ))}
          </div>
        </div>
      </section>

      <section id="alden-builds" className="web-services-section web-services-builds-section">
        <div className="web-services-wide-shell">
          <SectionHeading eyebrow="ALDEN Ventures" title="ALDEN Builds" copy="Our own ventures are designed and developed from the ground up." />
          <div className="portfolio-card-grid" aria-label="ALDEN venture projects">
            {ALDEN_BUILD_PROJECTS.map((project, index) => (
              <PortfolioCard key={project.id} project={project} revealIndex={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="web-services-section web-services-grid-section">
        <div className="web-services-wide-shell">
          <SectionHeading eyebrow="What We Do" title="Web services" copy="From first strategy to the systems that keep your business moving." />
          <div className="web-service-grid">
            {WEB_STUDIO_SERVICES.map((service, index) => (
              <article key={service.title} className="web-service-card web-reveal" data-reveal-index={index + 1}>
                <span className="web-service-card__number">{padNumber(index + 1)}</span>
                <h3 className="web-service-card__title">{service.title}</h3>
                <p className="web-service-card__description">{service.description}</p>
                <div className="web-service-card__features">
                  {service.features.map((feature) => (
                    <span key={feature}><span aria-hidden="true">+</span>{feature}</span>
                  ))}
                </div>
                <a className="web-service-card__link" href="/contact">Discuss this service <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="web-services-section web-services-process-section">
        <div className="web-services-wide-shell">
          <SectionHeading eyebrow="Process" title="Our Process" />
          <div className="process-track">
            {PROCESS_STEPS.map((step, index) => (
              <article key={step.title} className="process-card web-reveal" data-reveal-index={index + 1}>
                <span className="process-card__number">{padNumber(index + 1)}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="web-services-section web-services-cta-section">
        <div className="web-services-cta web-reveal" data-reveal-index="0">
          <span className="web-services-eyebrow">Start a Project</span>
          <h2 className="web-services-section-title">Let's build something that works.</h2>
          <p className="web-services-section-copy">Tell us what you are trying to make better. We will help you find the right next step.</p>
          <div className="web-services-actions">
            <a href="/contact" className="web-services-solid-link">Start Your Project</a>
            <a href="#portfolio" className="web-services-pill-link">View Our Work</a>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}