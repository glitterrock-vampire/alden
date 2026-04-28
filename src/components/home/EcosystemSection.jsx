import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    num: '01',
    name: "ALDEN'S FARM",
    desc: 'Fresh from farm to Kingston. Partnering with Agrotonomy for sustainable local produce.',
    tags: ['Whole Foods', 'Chicken', 'Eggs', 'Supplies'],
    status: 'Active',
    domain: 'http://localhost:5176',
  },
  {
    num: '02',
    name: "ALDEN'S CONSTRUCTION",
    desc: 'Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages.',
    tags: ['Affordable Homes', 'Steel Frames', 'Blueprints'],
    status: 'Coming 2026',
    domain: 'http://localhost:5175',
  },
  {
    num: '03',
    name: "ALDEN'S SPRINGS",
    desc: 'Water tracking & irrigation systems for sustainable farming and residential use.',
    tags: ['Smart Irrigation', 'Water Harvesting', 'Agri-Tech'],
    status: 'Coming 2027',
    domain: 'http://localhost:5177',
  },
];

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative bg-card py-24 md:py-36 border-b border-border">
      {/* Header */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-6 h-px bg-accent" />
          <span className="text-accent text-[10px] tracking-[0.4em] font-body uppercase">The Ecosystem</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-primary leading-none tracking-tight uppercase"
          >
            ALDEN<br />ECOSYSTEM
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm font-body leading-relaxed max-w-xs"
          >
            A constellation of ventures — each solving real problems across technology, agriculture, construction, and sustainability.
          </motion.p>
        </div>
      </div>

      {/* Product rows — Studio Daboo editorial list style */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {products.map((product, i) => (
          <a
            key={product.name}
            href={product.domain}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true, margin: '-60px' }}
              className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-t border-border hover:bg-background/40 transition-colors duration-300 px-2 -mx-2 cursor-pointer"
            >
            {/* Number */}
            <div className="col-span-2 md:col-span-1 flex items-start pt-1">
              <span className="text-muted-foreground/40 text-[11px] tracking-[0.3em] font-body">{product.num}</span>
            </div>

            {/* Name */}
            <div className="col-span-10 md:col-span-4 flex items-center">
              <h3 className="font-heading font-black text-xl md:text-2xl text-primary tracking-tight group-hover:text-accent transition-colors duration-300 uppercase">
                {product.name}
              </h3>
            </div>

            {/* Description */}
            <div className="col-span-12 md:col-span-4 md:flex md:items-center pl-8 md:pl-0">
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{product.desc}</p>
            </div>

            {/* Status + tags */}
            <div className="col-span-12 md:col-span-3 flex flex-col md:items-end justify-center gap-2 pl-8 md:pl-0">
              <span className={`text-[10px] tracking-[0.3em] font-body uppercase ${product.status === 'Active' ? 'text-accent' : 'text-muted-foreground/50'}`}>
                {product.status}
              </span>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-[9px] tracking-wider font-body text-muted-foreground/40 border border-border px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </motion.div>
          </a>
        ))}
        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}