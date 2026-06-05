import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

export default function WhoWeArePage() {
  const letterRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) scale(1)';
          }, 800 + index * 100);
        }
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/about/careers' && location.hash !== '#careers') return;

    requestAnimationFrame(() => {
      document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, location.hash]);

  const heroLetters = ['W', 'H', 'O'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 z-[2] flex flex-col justify-center items-center gap-5 p-10 pb-20">
          <div className="flex gap-3 justify-center">
            {heroLetters.map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(120px, 20vw, 670px)',
                  lineHeight: '0.7',
                  color: 'white',
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(-230px)',
                  transition: 'opacity 0.9s cubic-bezier(0.77,0.02,0.38,1), transform 0.9s cubic-bezier(0.77,0.02,0.38,1)'
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-[11px] tracking-[0.4em] text-accent uppercase mt-8"
            style={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            Creative Studio · Digital Innovation · Visual Storytelling
          </motion.p>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mt-6"
          >
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: 'Roboto Mono, monospace', color: 'rgba(255,255,255,0.8)' }}
            >
              We are a multidisciplinary collective where technology meets creativity,
              design meets functionality, and innovation meets purpose.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          >
            {[
              { num: '5+', label: 'Years Active' },
              { num: '50+', label: 'Projects Delivered' },
              { num: '4', label: 'Venture Studios' },
              { num: 'Jamaica', label: 'Rooted in Kingston' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: 'Koulen, cursive', color: 'white' }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mt-1"
                  style={{ fontFamily: 'Roboto Mono, monospace', color: 'rgba(160,130,80,0.8)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Roboto Mono, monospace', color: 'rgba(255,255,255,0.5)' }}
              >
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Studio Overview Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '2.5rem', color: 'hsl(var(--foreground))' }}>Who Are We?</h2>
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
