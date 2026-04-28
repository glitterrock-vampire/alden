import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BuildNav from '@/components/ventures/build/BuildNav.jsx';
import BuildFooter from '@/components/ventures/build/BuildFooter.jsx';

const heroImg = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/50c3d2b40_generated_95198927.png';

const offerings = [
  { num: '01', name: 'STEEL FRAME HOMES', desc: 'Engineered for Jamaica\'s climate. Modular, durable, and faster to build than traditional construction.' },
  { num: '02', name: 'CONTAINER HOMES', desc: 'Repurposed shipping containers transformed into modern, cost-effective living spaces.' },
  { num: '03', name: 'BLUEPRINT PACKAGES', desc: 'Pre-designed architectural plans you can own, modify, and build on your land.' },
  { num: '04', name: 'CUSTOM BUILDS', desc: 'Full design-to-build service for custom residential and commercial projects.' },
];

function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end pb-20">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImg}')`, y, scale: 1.1 }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0e0e0e 50%, rgba(14,14,14,0.2) 100%)' }} />

      <motion.div style={{ opacity }} className="relative z-10 w-full px-8 md:px-16">
        <p style={{ color: 'rgba(160,130,80,0.7)', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Construction & Development — Coming 2026
        </p>
        <h1
          style={{
            fontSize: 'clamp(4rem,18vw,14rem)',
            fontFamily: '"Arial Black", sans-serif',
            fontWeight: 900,
            color: '#f0ede8',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          ALDEN<br />BUILD
        </h1>
        <p style={{ color: 'rgba(160,130,80,0.6)', fontFamily: 'monospace', fontSize: '13px', marginTop: '1.5rem', letterSpacing: '0.2em' }}>
          Affordable homes for Jamaica.
        </p>
      </motion.div>
    </section>
  );
}

export default function AldenBuild() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ background: '#0e0e0e', color: '#f0ede8', minHeight: '100vh' }}
    >
      <BuildNav />
      <HeroParallax />

      {/* Blueprint line marquee */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: '#1e1e1e' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#a08050' }}>
              ALDEN BUILD · STEEL FRAMES · CONTAINER HOMES · BLUEPRINTS · COMING 2026 ·
            </span>
          ))}
        </motion.div>
      </div>

      {/* Offerings */}
      <section id="offerings" style={{ padding: '6rem 2rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: '2rem', height: '1px', background: '#a08050' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#a08050' }}>What We Build</span>
        </div>

        {offerings.map((o, i) => (
          <motion.div
            key={o.name}
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: '3rem 1fr 1fr',
              gap: '2rem',
              padding: '2rem 0',
              borderTop: '1px solid #1e1e1e',
              alignItems: 'start',
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a08050', letterSpacing: '0.3em', paddingTop: '4px' }}>{o.num}</span>
            <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', textTransform: 'uppercase', color: '#f0ede8', letterSpacing: '-0.02em' }}>
              {o.name}
            </h3>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(240,237,232,0.45)', lineHeight: 1.7 }}>{o.desc}</p>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid #1e1e1e' }} />
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" style={{ textAlign: 'center', padding: '5rem 2rem 8rem', borderTop: '1px solid #1e1e1e' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', color: '#a08050', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Coming 2026 — Express Interest
          </p>
          <h2 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 'clamp(3rem,12vw,9rem)', textTransform: 'uppercase', color: '#f0ede8', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
            BUILD YOUR<br />FUTURE.
          </h2>
          <a
            href="mailto:build@alden.design"
            style={{
              display: 'inline-block', marginTop: '3rem', padding: '1rem 2.5rem',
              border: '1px solid rgba(160,128,80,0.4)', fontFamily: 'monospace', fontSize: '11px',
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f0ede8', textDecoration: 'none',
            }}
          >
            build@alden.design →
          </a>
        </motion.div>
      </section>

      <BuildFooter />
    </motion.div>
  );
}
