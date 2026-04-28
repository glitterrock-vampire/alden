import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeStrip({ text = "TECHNOLOGY · INNOVATION · DESIGN · FARM · BUILD · FLOW · KINGSTON, JA ·" }) {
  return (
    <div className="bg-background py-4 overflow-hidden border-y border-border">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-[10px] tracking-[0.5em] text-muted-foreground/50 font-body mx-6 uppercase">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}