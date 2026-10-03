import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import { CONTACT_EMAIL } from '@/lib/contact';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Studios', href: '/studios' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'About', href: '/about/who-we-are' },
];

export default function FooterSection() {
  return (
    <footer id="contact" className="relative bg-card border-t border-border">
      {/* Big CTA */}
      <div className="px-6 md:px-10 py-20 md:py-36 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="text-accent text-[10px] tracking-[0.4em] font-body uppercase block mb-6">
            — Say Hello
          </span>
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-9xl text-primary leading-none tracking-tight uppercase">
            LET'S<br />WORK<br />TOGETHER.
          </h2>

          <motion.a
            href={`mailto:${CONTACT_EMAIL}`}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-10 md:mt-12 inline-flex items-center gap-4 text-[11px] tracking-[0.3em] text-primary font-body uppercase border border-border px-6 md:px-8 py-4 hover:border-accent/60 hover:text-accent transition-colors duration-300"
          >
            {CONTACT_EMAIL}
            <span className="text-base">→</span>
          </motion.a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 md:pt-16 border-t border-border">
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
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-200 uppercase tracking-wider"
                >
                  {item.label}
                </Link>
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
          >
            <SpotifyNowPlaying />
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <span className="font-heading font-black text-sm tracking-[0.3em] text-primary">ALDEN</span>
        <span className="text-muted-foreground text-[10px] tracking-wider font-body">
          © {new Date().getFullYear()} Alden Design — All rights reserved
        </span>
        <span className="text-muted-foreground/40 text-[9px] font-jp">「很高興見到你」</span>
      </div>
    </footer>
  );
}
