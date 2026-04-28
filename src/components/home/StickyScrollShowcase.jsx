import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Studio Daboo style: alternating editorial two-column layout
// Each slide: full-width section with large image + text side-by-side
function StudioSlide({ image, title, subtitle, tags, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const isEven = index % 2 === 0;

  // Domain mapping for ventures (local development)
  const domainMap = {
    'Alden Farm': 'http://localhost:5176',
    'Alden Build': 'http://localhost:5175',
    'Photo Studio': 'http://localhost:5178',
    'Web Studio': '/portfolio/web',
  };
  const exploreLink = domainMap[title] || '/studios';

  // Image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  // Clip reveal
  const clip = useTransform(scrollYProgress, [0.05, 0.35], [100, 0]);
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0%)`);

  // Text entrance
  const textY = useTransform(scrollYProgress, [0.15, 0.45], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <div ref={ref} className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden border-b border-border">

      {/* Image side */}
      <motion.div
        style={{ clipPath }}
        className={`relative w-full md:w-1/2 h-[55vw] md:h-auto min-h-[400px] overflow-hidden order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: imageY, scale: 1.15 }}
        />
        {/* Number watermark */}
        <div className="absolute top-6 left-6 text-white/20 text-[11px] tracking-[0.4em] font-body z-10">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </motion.div>

      {/* Text side — editorial Studio Daboo style */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className={`relative w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-24 order-2 ${isEven ? 'md:order-2' : 'md:order-1'} bg-background`}
      >
        {/* Small overline label */}
        <p className="text-accent text-[10px] tracking-[0.4em] font-body uppercase mb-6">
          — Alden Photo Studios
        </p>

        {/* Big title */}
        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.92] tracking-tight uppercase mb-6">
          {title}
        </h2>

        {/* Thin separator */}
        <div className="w-12 h-px bg-accent mb-6" />

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm md:text-base font-body leading-relaxed mb-8 max-w-sm">
          {subtitle}
        </p>

        {/* Tags as a vertical list — Studio Daboo editorial style */}
        <div className="space-y-2">
          {tags.split(' · ').map((tag, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-px bg-border" />
              <span className="text-muted-foreground/60 text-[10px] tracking-[0.3em] font-body uppercase">
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <a
          href={exploreLink}
          target={exploreLink.startsWith('http') ? '_blank' : '_self'}
          rel={exploreLink.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <motion.button
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-10 self-start flex items-center gap-3 text-[11px] tracking-[0.3em] text-primary font-body uppercase border border-border px-6 py-3 hover:border-accent/60 hover:text-accent transition-colors duration-300"
          >
            Explore
            <span className="text-base">→</span>
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
}

export default function StickyScrollShowcase({ studios }) {
  return (
    <div id="studios" className="relative">
      {studios.map((studio, i) => (
        <StudioSlide key={studio.title} {...studio} index={i} total={studios.length} />
      ))}
    </div>
  );
}