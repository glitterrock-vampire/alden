import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    num: '03',
    name: "ALDEN'S FARM",
    label: "Alden Farm",
    desc: 'Fresh from farm to Kingston. Partnering with Agrotonomy for sustainable local produce.',
    tags: ['Whole Foods', 'Chicken', 'Eggs', 'Supplies'],
    status: 'Active',
    domain: '/farm',
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/bc9876621_generated_c9f73a67.png',
  },
  {
    num: '04',
    name: "ALDEN'S CONSTRUCTION",
    label: "Alden Build",
    desc: 'Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages.',
    tags: ['Affordable Homes', 'Steel Frames', 'Blueprints'],
    status: 'Inactive',
    domain: '/build',
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/50c3d2b40_generated_95198927.png',
  },
  {
    num: '05',
    name: "ALDEN'S SPRINGS",
    label: "Alden Springs",
    desc: 'Water tracking & irrigation systems for sustainable farming and residential use.',
    tags: ['Smart Irrigation', 'Water Harvesting', 'Agri-Tech'],
    status: 'Inactive',
    domain: '/springs',
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/9633f1d94_generated_82c4a200.png',
  },
  {
    num: '01',
    name: "ALDEN WEB STUDIO",
    label: "Alden Web Studio",
    desc: 'Custom web development, e-commerce solutions, and cloud infrastructure for modern businesses.',
    tags: ['Development', 'E-Commerce', 'Cloud'],
    status: 'Active',
    domain: '/portfolio/web',
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/eaa46c217_generated_ddb849ba.png',
  },
  {
    num: '02',
    name: "ALDEN PHOTO STUDIO",
    label: "Alden Photo Studio",
    desc: 'Professional photography services capturing moments and creating visual stories.',
    tags: ['Portraits', 'Events', 'Landscapes'],
    status: 'Active',
    domain: '/studios/photo-studio/services',
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/a179600a5_generated_a31c9d6a.png',
  },
];

const ecosystemValues = [
  {
    title: 'Sustainability',
    description: 'Build for long-term environmental balance, not short-term gain.',
  },
  {
    title: 'Quality',
    description: 'Hold every venture to a thoughtful, consistent standard.',
  },
  {
    title: 'Community',
    description: 'Create useful opportunities that strengthen the places we serve.',
  },
  {
    title: 'Innovation',
    description: 'Use new ideas and tools while staying grounded in real needs.',
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

      {/* Product Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...products].sort((a, b) => a.num.localeCompare(b.num)).map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-500"
            >
              <Link to={product.domain} className="block h-full">
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/55" />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border px-3 py-1 rounded-full">
                  <span className="text-[10px] tracking-[0.3em] font-body text-muted-foreground">
                    {product.num}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[9px] tracking-[0.2em] font-body uppercase px-3 py-1 rounded-full border ${
                    product.status === 'Active' 
                      ? 'bg-accent/10 border-accent/30 text-accent' 
                      : 'bg-muted/50 border-border text-muted-foreground'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Label */}
                <p className="text-[10px] tracking-[0.4em] font-body text-accent uppercase mb-3">
                  — {product.label}
                </p>

                {/* Title */}
                <h3 className="font-heading font-black text-xl md:text-2xl text-primary tracking-tight uppercase mb-3 group-hover:text-accent transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Separator */}
                <div className="w-8 h-px bg-accent mb-4 group-hover:w-12 transition-all duration-300" />

                {/* Description */}
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">
                  {product.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] tracking-wider font-body text-muted-foreground border border-border/60 px-2 py-1 rounded-sm group-hover:border-accent/30 group-hover:text-accent/80 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Explore Link */}
                <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-body uppercase text-accent group-hover:gap-3 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 md:mt-28">
        <div className="border-t border-border pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-accent text-[10px] tracking-[0.4em] font-body uppercase mb-4">
                What connects the work
              </p>
              <h3 className="font-heading font-black text-3xl md:text-5xl text-primary uppercase leading-none">
                Built around what lasts
              </h3>
            </div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-sm">
              Across every sector, ALDEN is committed to responsible growth, dependable work, and lasting community impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-border/70">
            {ecosystemValues.map((value, index) => (
              <div
                key={value.title}
                className={`py-6 md:py-7 ${index > 0 ? 'sm:border-l sm:border-border/70 sm:pl-6 lg:pl-7' : ''} ${index % 2 === 0 ? 'sm:pr-6 lg:pr-7' : ''} border-b border-border/70 lg:border-b-0`}
              >
                <h4 className="font-heading text-lg text-primary uppercase mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-xs font-body leading-relaxed max-w-xs">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}