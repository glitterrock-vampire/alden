import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StudioNav from '@/components/ventures/studio/StudioNav.jsx';
import StudioFooter from '@/components/ventures/studio/StudioFooter.jsx';

const heroImg = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/a179600a5_generated_a31c9d6a.png';

const services = [
  { num: '01', name: 'Portrait Sessions', desc: 'Intimate, directed portraiture for professionals, creatives, and individuals.' },
  { num: '02', name: 'Event Coverage', desc: 'Corporate events, launches, weddings. Every frame considered.' },
  { num: '03', name: 'Landscape & Nature', desc: 'Jamaica\'s landscapes through an editorial lens. Prints available.' },
  { num: '04', name: 'Creative Projects', desc: 'Collaborative conceptual work for brands, campaigns, and editorial.' },
];

const photoProjects = [
  { id:1, title:"JAMAICA LANDSCAPES", category:"NATURE PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:2, title:"PORTRAIT SESSIONS", category:"PORTRAIT PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png", imageW:2718, imageH:1810, comingSoon:true },
  { id:3, title:"URBAN EXPLORATION", category:"STREET PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:4, title:"WEDDING STORIES", category:"EVENT PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:5, title:"PRODUCT PHOTOGRAPHY", category:"COMMERCIAL", href:"https://example.com", image:"https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png", imageW:1628, imageH:1119, comingSoon:true },
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
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080808 40%, rgba(0,0,0,0.3) 100%)' }} />

      <motion.div style={{ opacity }} className="relative z-10 w-full px-8 md:px-16">
        <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Photography & Visual Arts — Kingston, JA
        </p>
        <div>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              letterSpacing: '0.4em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            Photo
          </p>
          <h1
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)', letterSpacing: '-0.02em', fontFamily: '"Arial Black", sans-serif' }}
          >
            ALDEN
          </h1>
          <p
            className="font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 12rem)',
              letterSpacing: '-0.04em',
              fontFamily: '"Arial Black", sans-serif',
              color: '#fff',
              marginTop: '-0.5rem'
            }}
          >
            STUDIO
          </p>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.2em', marginTop: '1.5rem' }}>
          Light, shadow, story.
        </p>
      </motion.div>
    </section>
  );
}

export default function AldenStudio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ background: '#080808', color: '#f0f0f0', minHeight: '100vh' }}
    >
      <StudioNav />
      <HeroParallax />

      {/* Services — editorial list */}
      <section id="services" style={{ padding: '6rem 2rem 6rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: '2rem', height: '1px', background: 'white' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Services</span>
        </div>

        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: '3rem 1fr 1fr',
              gap: '1.5rem',
              padding: '2rem 0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em' }}>{s.num}</span>
            <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 'clamp(1.2rem,3vw,2rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#f0f0f0' }}>
              {s.name}
            </h3>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{ padding: '6rem 2rem 8rem', maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: '2rem', height: '1px', background: 'white' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Portfolio</span>
        </div>

        <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', minWidth: 'max-content' }}>
            {photoProjects.map((p) => (
              <div
                key={p.id}
                style={{
                  width: '560px',
                  height: '350px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={`${p.image}?scale-down-to=1024&width=${p.imageW}&height=${p.imageH}`}
                  width={p.imageW} height={p.imageH}
                  loading={p.id <= 3 ? "eager" : "lazy"}
                  alt={`${p.title} project`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: p.comingSoon ? 'brightness(0.35) grayscale(0.6)' : 'none',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: 0,
                  right: 0,
                  padding: '0 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: '21px',
                  pointerEvents: 'none',
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#4caf50' }}>{p.title}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#4caf50' }}>{p.category}</span>
                </div>
                {p.comingSoon && (
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: '#4caf50',
                    border: '1px solid rgba(76,175,80,0.35)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    background: 'rgba(231,229,223,0.75)',
                    backdropFilter: 'blur(4px)',
                  }}>
                    COMING SOON
                  </div>
                )}
              </div>
            ))}
            <div style={{ width: '560px', height: '350px', visibility: 'hidden' }} />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" style={{ textAlign: 'center', padding: '6rem 2rem 8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Book a Session
          </p>
          <h2 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 'clamp(3rem,12vw,10rem)', textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#f0f0f0', lineHeight: 0.9 }}>
            LET'S<br />SHOOT.
          </h2>
          <a
            href="mailto:studio@alden.design"
            style={{
              display: 'inline-block',
              marginTop: '3rem',
              padding: '1rem 2.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f0f0f0',
              textDecoration: 'none',
              transition: 'border-color 0.3s',
            }}
          >
            studio@alden.design →
          </a>
        </motion.div>
      </section>

      <StudioFooter />
    </motion.div>
  );
}
