import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
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
import PhotoStudioServicesPage from '@/pages/PhotoStudioServicesPage';
import WebStudioServicesPage from '@/pages/WebStudioServicesPage';
import CorePage from '@/pages/CorePage';
import FarmPage from '@/pages/FarmPage';
import BuildPage from '@/pages/BuildPage';
import SpringsPage from '@/pages/SpringsPage';

// Check if running on production (Vercel)
const isProduction = typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname === 'alden.com');

const heroImage = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/dca4e077b_generated_26799b91.png';

function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection heroImage={heroImage} />
      
      {/* Ecosystem */}
      <MarqueeStrip text="TECHNOLOGY · INNOVATION · DESIGN · FARM · BUILD · FLOW · KINGSTON, JA ·" />
      <EcosystemSection />
      
      {/* About */}
      <AboutSection />
      
      {/* Footer */}
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
        {/* Venture pages - local in dev, redirect in production */}
        <Route path="/build" element={<BuildPage />} />
        <Route path="/farm" element={<FarmPage />} />
        <Route path="/spring" element={<SpringsPage />} />
        <Route path="/springs" element={<SpringsPage />} />
        <Route path="/studios/photo-studio/services" element={<PhotoStudioServicesPage />} />
        {/* Hub pages */}
        <Route path="/about/who-we-are" element={<WhoWeArePage />} />
        <Route path="/about/careers" element={<WhoWeArePage />} />
        <Route path="/about" element={<WhoWeArePage />} />
        <Route path="/portfolio/photography" element={<PhotographyPortfolioPage />} />
        <Route path="/portfolio/web" element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/services" element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/portfolio" element={<WebStudioServicesPage />} />
        <Route path="/core" element={<CorePage />} />
      </Routes>
    </Router>
  );
}
