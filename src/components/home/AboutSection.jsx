import React from 'react';
import { motion } from 'framer-motion';

const services = [
  'Software Development',
  'UI / Visual Design',
  'User Experience Design',
  'Enterprise Design Thinking',
  'Research / Strategy',
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-background py-24 md:py-36 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-6 h-px bg-accent" />
          <span className="text-accent text-[10px] tracking-[0.4em] font-body uppercase">About</span>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24">
          {/* Left — big statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.92] tracking-tight uppercase mb-8">
              A [MULTI-<br />DISCIPLINARY]<br />PERSPECTIVE
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-body leading-relaxed mb-4">
              Informed by technology, design, and innovation. A strategic approach led by clarity, precision, and intent.
            </p>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              I partner with companies and entrepreneurs to transform visions into captivating experiences — all designed with users at the helm.
            </p>
          </motion.div>

          {/* Right — services list */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase mb-8"
            >
              Expertise & Services
            </motion.p>

            <div>
              {services.map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="group flex items-center justify-between py-5 border-b border-border hover:pl-4 transition-all duration-300 cursor-default"
                >
                  <span className="font-heading font-bold text-sm md:text-base text-primary tracking-wide uppercase">
                    {service}
                  </span>
                  <span className="text-muted-foreground/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    →
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote — Studio Daboo marquee-style large text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="overflow-hidden border-t border-border pt-12"
        >
          <p
            className="font-heading font-black text-[clamp(3rem,12vw,10rem)] text-muted-foreground/70 leading-none tracking-tight uppercase whitespace-nowrap"
          >
            QUIETLY POWERFUL DIGITAL EXPERIENCES
          </p>
        </motion.div>
      </div>

      {/* Japanese watermark */}
      <div className="absolute top-24 right-10 text-muted-foreground/5 font-jp text-[160px] leading-none select-none pointer-events-none">
        技術
      </div>
    </section>
  );
}