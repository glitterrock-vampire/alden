import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import StickyScrollShowcase from '@/components/home/StickyScrollShowcase';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import EcosystemSection from '@/components/home/EcosystemSection';
import AboutSection from '@/components/home/AboutSection';
import FooterSection from '@/components/home/FooterSection';
import Redirect from '@/components/Redirect';

// Page imports
import StudiosPage from '@/pages/StudiosPage';
import EcosystemPage from '@/pages/EcosystemPage';
import WhoWeArePage from '@/pages/WhoWeArePage';
import PhotographyPortfolioPage from '@/pages/PhotographyPortfolioPage';
import WebPortfolioPage from '@/pages/WebPortfolioPage';
import PhotoStudioServicesPage from '@/pages/PhotoStudioServicesPage';
import WebStudioServicesPage from '@/pages/WebStudioServicesPage';
import CorePage from '@/pages/CorePage';

const heroImage = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/dca4e077b_generated_26799b91.png';

const studios = [
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/eaa46c217_generated_ddb849ba.png',
    title: 'Web Studio',
    subtitle: 'Comprehensive digital solutions including web development, mobile apps, and cloud services.',
    tags: 'Custom Development · E-Commerce · Automation · Cloud Hosting',
    href: '/studio',
    domain: 'alden-studio.com',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/a179600a5_generated_a31c9d6a.png',
    title: 'Photo Studio',
    subtitle: 'Professional photography services capturing moments and creating visual stories.',
    tags: 'Portraits · Events · Landscapes · Creative Projects',
    href: '/studio',
    domain: 'alden-studio.com',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/9633f1d94_generated_82c4a200.png',
    title: 'Digital Strategy',
    subtitle: 'Strategic approach to digital transformation and business growth.',
    tags: 'Research · Planning · Implementation · Optimization',
    href: '/studio',
    domain: 'alden-studio.com',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/bc9876621_generated_c9f73a67.png',
    title: "ALDEN'S FARM",
    subtitle: 'Fresh from farm to Kingston. Partnering with Agrotonomy for sustainable local produce.',
    tags: 'Whole Foods · Chicken · Eggs · Supplies',
    href: '/farm',
    domain: 'alden-farm.com',
  },
  {
    image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/50c3d2b40_generated_95198927.png',
    title: "ALDEN'S CONSTRUCTION",
    subtitle: 'Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages.',
    tags: 'Affordable Homes · Steel Frames · Coming 2026',
    href: '/build',
    domain: 'alden-build.com',
  },
];

function Home() {
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
      <FooterSection />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        {/* Venture redirects to local development */}
        <Route path="/build" element={<Redirect to="https://alden-build.vercel.app" />} />
        <Route path="/farm" element={<Redirect to="https://alden-farm.vercel.app" />} />
        <Route path="/springs" element={<Redirect to="https://alden-springs.vercel.app" />} />
        <Route path="/studios/photo-studio/services" element={<Redirect to="https://alden-studio.vercel.app" />} />
        {/* Hub pages */}
        <Route path="/about/who-we-are" element={<WhoWeArePage />} />
        <Route path="/about" element={<WhoWeArePage />} />
        <Route path="/portfolio/photography" element={<PhotographyPortfolioPage />} />
        <Route path="/portfolio/web" element={<WebPortfolioPage />} />
        <Route path="/studios/web-studio/services" element={<WebStudioServicesPage />} />
        <Route path="/core" element={<CorePage />} />
      </Routes>
    </Router>
  );
}