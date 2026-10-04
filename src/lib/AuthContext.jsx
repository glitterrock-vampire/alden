import React from 'react';
import Navbar from '../components/home/Navbar.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import StickyScrollShowcase from '../components/home/StickyScrollShowcase.jsx';
import MarqueeStrip from '../components/home/MarqueeStrip.jsx';
import EcosystemSection from '../components/home/EcosystemSection.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import Footer from '../components/home/Footer.jsx';

const heroImage = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/dca4e077b_generated_26799b91.png';

const studios = [
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/eaa46c217_generated_ddb849ba.png',
    title: 'Web Studio',
    subtitle: 'Comprehensive digital solutions including web development, mobile apps, and cloud services.',
    tags: 'Custom Development · E-Commerce · Automation · Cloud Hosting',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/a179600a5_generated_a31c9d6a.png',
    title: 'Photo Studio',
    subtitle: 'Professional photography services capturing moments and creating visual stories.',
    tags: 'Portraits · Events · Landscapes · Creative Projects',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/9633f1d94_generated_82c4a200.png',
    title: 'Digital Strategy',
    subtitle: 'Strategic approach to digital transformation and business growth.',
    tags: 'Research · Planning · Implementation · Optimization',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/bc9876621_generated_c9f73a67.png',
    title: 'Alden Farm',
    subtitle: 'Fresh from farm to Kingston. Partnering with Agrotonomy for sustainable local produce.',
    tags: 'Whole Foods · Chicken · Eggs · Supplies',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/50c3d2b40_generated_95198927.png',
    title: 'Alden Build',
    subtitle: 'Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages.',
    tags: 'Affordable Homes · Steel Frames · Coming 2026',
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection heroImage={heroImage} />
      
      {/* Studios showcase - Studio Daboo scroll reveal animations */}
      <MarqueeStrip text="[SCROLL DOWN] 請下去 [DOWN] [NICE TO MEET YOU]「很高興見到你」· STUDIOS · PRODUCTS ·" />
      <StickyScrollShowcase studios={studios} />

      <MarqueeStrip />
      <EcosystemSection />
      <AboutSection />
      <Footer />
    </div>
  );
}