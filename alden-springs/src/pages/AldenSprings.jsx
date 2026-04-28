import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpringsNav from '@/components/ventures/springs/SpringsNav.jsx';
import SpringsFooter from '@/components/ventures/springs/SpringsFooter.jsx';

const heroImg = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=80';

const pillars = [
  { num: '01', title: 'PURITY', desc: 'Sourced from natural highland springs. Zero additives. Tested and certified.' },
  { num: '02', title: 'SUSTAINABILITY', desc: 'Smart irrigation systems that conserve and protect water resources.' },
  { num: '03', title: 'DISTRIBUTION', desc: 'Direct-to-farm and direct-to-home delivery across Jamaica.' },
  { num: '04', title: 'TECHNOLOGY', desc: 'IoT-powered water monitoring and precision irrigation for agri-use.' },
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
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #04111e 50%, rgba(4,17,30,0.15) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(4,17,30,0.4)' }} />

      <motion.div style={{ opacity }} className="relative z-10 w-full px-8 md:px-16">
        <p style={{ color: 'rgba(100,180,220,0.6)', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Water Solutions — Coming 2027
        </p>
        <h1
          style={{
            fontSize: 'clamp(4rem,18vw,14rem)',
            fontFamily: '"Arial Black", sans-serif',
            fontWeight: 900,
            color: '#e0f4ff',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          ALDEN<br />SPRINGS
        </h1>
        <p style={{ color: 'rgba(100,180,220,0.5)', fontFamily: 'monospace', fontSize: '13px', marginTop: '1.5rem', letterSpacing: '0.2em' }}>
          Pure water. Smart irrigation. Sustainable futures.
        </p>
      </motion.div>
    </section>
  );
}

export default function AldenSprings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ background: '#04111e', color: '#e0f4ff', minHeight: '100vh' }}
    >
      <SpringsNav />
      <HeroParallax />

      {/* Marquee */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: '#0a2540' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#2a6a8a' }}>
              ALDEN SPRINGS · PURE WATER · SMART IRRIGATION · COMING 2027 ·
            </span>
          ))}
        </motion.div>
      </div>

      {/* Pillars */}
      <section id="pillars" style={{ padding: '6rem 2rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: '2rem', height: '1px', background: '#4aaccc' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4aaccc' }}>Our Pillars</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', background: '#0a2540' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              style={{ padding: '2.5rem', background: '#04111e' }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4aaccc', letterSpacing: '0.3em', display: 'block', marginBottom: '1rem' }}>{p.num}</span>
              <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', color: '#e0f4ff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(100,180,220,0.5)', lineHeight: 1.7 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Early Access CTA */}
      <section id="waitlist" style={{ textAlign: 'center', padding: '5rem 2rem 8rem', borderTop: '1px solid #0a2540' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', color: 'rgba(100,180,220,0.4)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Coming 2027 — Secure Early Access
          </p>
          <h2 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 'clamp(3rem,12vw,9rem)', textTransform: 'uppercase', color: '#e0f4ff', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
            JOIN THE<br />WAITLIST.
          </h2>
          <a
            href="mailto:springs@alden.design"
            style={{
              display: 'inline-block', marginTop: '3rem', padding: '1rem 2.5rem',
              border: '1px solid rgba(74,172,204,0.3)', fontFamily: 'monospace', fontSize: '11px',
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e0f4ff', textDecoration: 'none',
            }}
          >
            springs@alden.design →
          </a>
        </motion.div>
      </section>

      <SpringsFooter />
    </motion.div>
  );
}
