import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import { WEB_PORTFOLIO_PROJECTS } from '@/pages/web-studio/webStudioData';
import './WhoWeArePage.css';

function DigitalClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = [time.getHours(), time.getMinutes(), time.getSeconds()]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');

  return (
    <div className="about-digital-clock" aria-live="polite" aria-label="Current local time">
      <span className="about-digital-clock__label">Local time</span>
      <span className="about-digital-clock__value">{formattedTime}</span>
    </div>
  );
}

export default function WhoWeArePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/about/careers' && location.hash !== '#careers') return;

    requestAnimationFrame(() => {
      document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="about-page min-h-screen bg-background">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero__inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="about-hero__copy"
          >
            <p className="about-eyebrow">Independent studio · Kingston, Jamaica</p>
            <h1>ALDEN</h1>
            <p className="about-hero__statement">
              Creative technology for a world that keeps moving.
            </p>
            <p className="about-hero__description">
              We bring strategy, design, and engineering together to build useful digital experiences and ventures with purpose.
            </p>
            <DigitalClock />
            <a className="about-hero__link" href="#site-work">Explore our work <span aria-hidden="true">↓</span></a>
          </motion.div>

          <div className="about-hero__stats" aria-label="ALDEN at a glance">
            {[
              { num: '5+', label: 'Years active' },
              { num: '50+', label: 'Projects delivered' },
              { num: '4', label: 'Venture studios' },
            ].map((stat) => (
              <div className="about-hero__stat" key={stat.label}>
                <span>{stat.num}</span>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="site-work" className="about-work">
        <div className="about-work__heading">
          <div>
            <p className="about-eyebrow">Selected work</p>
            <h2>Built to be explored.</h2>
          </div>
          <p>Digital platforms and experiences made by ALDEN and our studio teams.</p>
        </div>

        <div className="about-mosaic">
          <article className="about-mosaic__studio">
            <div className="about-mosaic__studio-label">
              <span>Featured studio</span>
              <span>01 / Web</span>
            </div>
            <iframe
              src="/studios/web-studio/services"
              title="Live preview of the ALDEN Web Studio website"
              loading="lazy"
              tabIndex={-1}
            />
            <a href="/studios/web-studio/services" aria-label="Open the ALDEN Web Studio website">
              <span>ALDEN Web Studio</span>
              <span>Explore the studio <span aria-hidden="true">↗</span></span>
            </a>
          </article>

          {WEB_PORTFOLIO_PROJECTS.slice(0, 5).map((project, index) => {
            const external = project.href.startsWith('http');

            return (
              <a
                className={`about-mosaic__project about-mosaic__project--${index + 1}`}
                href={project.href}
                key={project.id}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <img src={project.image} alt={`${project.title} website preview`} loading="lazy" />
                <span className="about-mosaic__project-copy">
                  <small>{project.category}</small>
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Studio Overview Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '2.5rem', color: 'hsl(var(--foreground))' }}>The Studio Behind the Work</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)', color: 'hsl(var(--muted-foreground))', marginBottom: '2rem', lineHeight: '1.6' }}>
            ALDEN is a multidisciplinary studio where technology meets creativity, design meets functionality, and innovation meets purpose.
          </p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            We are a team of passionate creators, developers, designers, and photographers working at the intersection of digital innovation and visual storytelling. Our approach combines technical expertise with artistic vision to create experiences that are both beautiful and functional.
          </p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Based in Jamaica but working globally, we bring diverse perspectives and technical excellence to every project we undertake.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Our Team</h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-5xl text-background" style={{ fontFamily: 'Koulen, cursive' }}>A</span>
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>Andre Walters</h3>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Founder & Creative Director</p>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                Leading vision and creative direction across all studio projects, bringing together technology, design, and photography expertise.
              </p>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6', marginTop: '1rem', opacity: 0.7 }}>
                <em>ALDEN</em> — from <strong>Andre Delano</strong> — Old English for <em>"old friend"</em> or <em>"wise protector"</em>
              </p>
              <a href="/core" className="inline-block mt-4 text-xs text-accent hover:text-foreground transition-colors" style={{ fontFamily: 'Roboto Mono, monospace', letterSpacing: '0.1em' }}>
                At Our Core →
              </a>
            </div>
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-5xl text-white/60" style={{ fontFamily: 'Koulen, cursive' }}>+</span>
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>You?</h3>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Join Our Team</p>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                We're always looking for talented individuals who share our passion for creating exceptional digital experiences.
              </p>
              <a href="/about/careers" className="inline-block py-3 px-6 bg-white/10 border border-white/20 text-white text-xs tracking-wider uppercase rounded-lg hover:bg-white/20 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                Learn About Joining
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8 md:gap-10">
            {[
              { title: "Innovation", desc: "Pushing boundaries and exploring new possibilities in digital experiences and visual storytelling." },
              { title: "Precision", desc: "Every pixel, every line of code, every photograph crafted with attention to detail." },
              { title: "Collaboration", desc: "Working closely with clients to bring their vision to life through partnership." },
              { title: "Excellence", desc: "Committed to delivering exceptional quality in everything we create." }
            ].map((value) => (
              <div 
                key={value.title}
                className="text-center p-8 md:p-10 bg-white/[0.03] border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'hsl(var(--accent))' }}>{value.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                At ALDEN, we foster a culture of creativity, continuous learning, and mutual respect. We believe that great work comes from happy, motivated people who are passionate about their craft.
              </p>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                Our studio environment encourages experimentation, embraces failure as part of the creative process, and celebrates both individual contributions and collective success.
              </p>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                We're committed to work-life balance, professional development, and creating an inclusive space where diverse perspectives are valued and celebrated.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { title: "Remote-First", desc: "Flexible work environment with global collaboration" },
                { title: "Continuous Learning", desc: "Regular skill development and knowledge sharing" },
                { title: "Creative Freedom", desc: "Space to experiment and innovate" }
              ].map((highlight) => (
                <div key={highlight.title} className="p-6 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.08]">
                  <h4 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.125rem', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>{highlight.title}</h4>
                  <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="scroll-mt-20 py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Careers</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '4rem', textAlign: 'center', maxWidth: '2xl', margin: '0 auto 4rem' }}>
            Join a team that values creativity, innovation, and growth. We're looking for passionate individuals who want to make an impact.
          </p>

          {/* Open Positions */}
          <div className="space-y-6 mb-12">
            <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>Open Positions</h3>
            
            {[
              { title: "Frontend Developer", type: "Full-Time", location: "Remote", desc: "Build modern web experiences using React, TypeScript, and cutting-edge technologies." },
              { title: "Photographer", type: "Contract", location: "Kingston, JA", desc: "Capture compelling visual stories for brands, events, and editorial projects." },
              { title: "UI/UX Designer", type: "Full-Time", location: "Remote", desc: "Design intuitive and beautiful interfaces that users love to interact with." },
              { title: "Marketing Coordinator", type: "Part-Time", location: "Remote", desc: "Help shape our brand narrative and connect with our audience across channels." }
            ].map((position) => (
              <div key={position.title} className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <h4 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', color: 'hsl(var(--foreground))' }}>{position.title}</h4>
                  <div className="flex gap-4">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--accent))', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{position.type}</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{position.location}</span>
                  </div>
                </div>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '4', lineHeight: '1.6' }}>{position.desc}</p>
                <a
                  href="mailto:careers@alden.design"
                  className="inline-block mt-4 px-6 py-3 border border-accent text-accent font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-background transition-all"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mt-16">
            <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '3rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Flexible Schedule",
                "Remote Work Options",
                "Professional Development",
                "Health & Wellness Support",
                "Creative Projects",
                "Collaborative Environment"
              ].map((benefit) => (
                <div key={benefit} className="text-center p-6 bg-white/[0.03] border border-white/10 rounded-xl">
                  <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Ready to Work With Us?</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>Let's create something extraordinary together</p>
          <a href="/contact" className="inline-block py-4 px-8 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all min-w-[200px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
            Get In Touch
          </a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
