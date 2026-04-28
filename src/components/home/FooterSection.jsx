import React from 'react';
import { motion } from 'framer-motion';

const navItems = ['Home', 'Studios', 'Ecosystem', 'About'];

export default function FooterSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-card border-t border-border">
      {/* Big CTA */}
      <div className="px-6 md:px-10 py-24 md:py-36 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-accent text-[10px] tracking-[0.4em] font-body uppercase block mb-6">
            — Say Hello
          </span>
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-9xl text-primary leading-none tracking-tight uppercase">
            LET'S<br />WORK<br />TOGETHER.
          </h2>

          <motion.a
            href="mailto:hello@alden.design"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-12 inline-flex items-center gap-4 text-[11px] tracking-[0.3em] text-primary font-body uppercase border border-border px-8 py-4 hover:border-accent/60 hover:text-accent transition-colors duration-300"
          >
            hello@alden.design
            <span className="text-base">→</span>
          </motion.a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase block mb-4">Location</span>
            <p className="text-primary text-sm font-body">Kingston, Jamaica</p>
            <p className="text-muted-foreground text-sm font-body mt-1 leading-relaxed">
              Building the future,<br />one innovation at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase block mb-4">Navigate</span>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="block text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-200 uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase block mb-4">Connect</span>
            <div className="space-y-2">
              {['Instagram', 'LinkedIn', 'GitHub'].map((s) => (
                <p key={s} className="text-muted-foreground text-sm font-body hover:text-accent cursor-pointer transition-colors duration-200">
                  {s}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-end gap-2"
          >
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase">[CURRENTLY ON REPEAT]</span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <span className="text-primary text-sm font-body">LC - Mean It In The Morning</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-heading font-black text-sm tracking-[0.3em] text-primary">ALDEN</span>
        <span className="text-muted-foreground text-[10px] tracking-wider font-body">
          © {new Date().getFullYear()} Alden Design — All rights reserved
        </span>
        <span className="text-muted-foreground/40 text-[9px] font-jp">「很高興見到你」</span>
      </div>
    </footer>
  );
}