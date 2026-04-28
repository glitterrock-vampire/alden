import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FarmNav from '@/components/ventures/farm/FarmNav.jsx';
import FarmFooter from '@/components/ventures/farm/FarmFooter.jsx';

const heroImg = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/bc9876621_generated_c9f73a67.png';

const products = [
  { name: 'Free-Range Eggs', desc: 'Fresh daily from our hens — no additives, no compromises.', tag: 'Poultry' },
  { name: 'Whole Chicken', desc: 'Raised naturally on open pasture, harvested to order.', tag: 'Poultry' },
  { name: 'Fresh Produce', desc: 'Seasonal greens and vegetables grown without pesticides.', tag: 'Produce' },
  { name: 'Farm Supplies', desc: 'Partnered with Agrotonomy for quality agricultural inputs.', tag: 'Supplies' },
];

function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end pb-20">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImg}')`, y, scale: 1.1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0d]/95 via-[#0d1a0d]/30 to-transparent" />

      <motion.div style={{ opacity }} className="relative z-10 w-full px-8 md:px-16">
        <p className="text-[#6b8f4e]/70 text-[10px] tracking-[0.5em] font-mono uppercase mb-4">
          Kingston, Jamaica — Est. 2024
        </p>
        <h1
          className="font-black text-[#e8dfc8] uppercase leading-none"
          style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', letterSpacing: '-0.03em', fontFamily: 'Georgia, serif' }}
        >
          ALDEN<br />FARM
        </h1>
        <p className="text-[#a09070]/70 text-sm font-mono tracking-wider mt-6 max-w-md">
          Sustainable farming. Fresh to your table. Rooted in Kingston.
        </p>
      </motion.div>
    </section>
  );
}

export default function AldenFarm() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ background: '#0d1a0d', color: '#e8dfc8', minHeight: '100vh' }}
    >
      <FarmNav />
      <HeroParallax />

      {/* Marquee */}
      <div className="overflow-hidden border-y py-4" style={{ borderColor: '#2a3d1a' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#6b8f4e' }}>
              ALDEN FARM · FRESH DAILY · KINGSTON, JA · SUSTAINABLE ·
            </span>
          ))}
        </motion.div>
      </div>

      {/* Products */}
      <section id="products" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-8" style={{ background: '#6b8f4e' }} />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#6b8f4e' }}>What We Offer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a3d1a' }}>
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="p-10 group cursor-default transition-colors duration-300"
              style={{ background: '#0d1a0d' }}
              onMouseEnter={e => e.currentTarget.style.background = '#152210'}
              onMouseLeave={e => e.currentTarget.style.background = '#0d1a0d'}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block" style={{ color: '#6b8f4e' }}>{p.tag}</span>
              <h3 className="font-black text-2xl md:text-3xl uppercase mb-3" style={{ fontFamily: 'Georgia, serif', color: '#e8dfc8' }}>
                {p.name}
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: '#a09070' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About block */}
      <section id="about" className="px-8 md:px-16 py-24 border-t" style={{ borderColor: '#2a3d1a' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-black text-4xl md:text-6xl uppercase leading-none mb-8" style={{ fontFamily: 'Georgia, serif', color: '#e8dfc8' }}>
              GROWN<br />HERE.<br />FRESH<br />DAILY.
            </h2>
            <div className="h-px w-12 mb-8" style={{ background: '#6b8f4e' }} />
            <p className="font-mono text-sm leading-relaxed" style={{ color: '#a09070' }}>
              Partnering with Agrotonomy, Alden Farm brings you real food with real roots. No middle men. No compromises. Direct from land to kitchen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden aspect-[4/5]"
          >
            <img src={heroImg} alt="Farm" className="w-full h-full object-cover" style={{ filter: 'saturate(0.8)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0d1a0d/60, transparent)' }} />
          </motion.div>
        </div>
      </section>

      <FarmFooter />
    </motion.div>
  );
}
