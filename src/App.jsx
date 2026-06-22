import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import EcosystemSection from '@/components/home/EcosystemSection';
import AboutSection from '@/components/home/AboutSection';
import FooterSection from '@/components/home/FooterSection';

// Static pages — bundled normally
import StudiosPage from '@/pages/StudiosPage';
import EcosystemPage from '@/pages/EcosystemPage';
import WhoWeArePage from '@/pages/WhoWeArePage';
import PhotographyPortfolioPage from '@/pages/PhotographyPortfolioPage';
import PhotoStudioServicesPage from '@/pages/PhotoStudioServicesPage';
import WebStudioServicesPage from '@/pages/WebStudioServicesPage';
import CorePage from '@/pages/CorePage';
import SpringsPage from '@/pages/SpringsPage';

// 3D pages — lazy loaded so Three.js/R3F never blocks initial render
const FarmPage  = lazy(() => import('@/pages/FarmPage'));
const BuildPage = lazy(() => import('@/pages/BuildPage'));

const heroImage = 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/dca4e077b_generated_26799b91.png';

// Simple fallback while 3D chunks load
function Page3DFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080604',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: '0.72rem',
      letterSpacing: '0.22em',
      color: 'rgba(204,187,135,0.6)',
      textTransform: 'uppercase',
    }}>
      Loading…
    </div>
  );
}

function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection heroImage={heroImage} />
      <MarqueeStrip text="TECHNOLOGY · INNOVATION · DESIGN · FARM · BUILD · FLOW · KINGSTON, JA ·" />
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

        {/* 3D pages — lazy + suspense */}
        <Route path="/farm"  element={<Suspense fallback={<Page3DFallback />}><FarmPage /></Suspense>} />
        <Route path="/build" element={<Suspense fallback={<Page3DFallback />}><BuildPage /></Suspense>} />

        <Route path="/spring"  element={<SpringsPage />} />
        <Route path="/springs" element={<SpringsPage />} />
        <Route path="/studios/photo-studio/services"  element={<PhotoStudioServicesPage />} />
        <Route path="/about/who-we-are" element={<WhoWeArePage />} />
        <Route path="/about/careers"    element={<WhoWeArePage />} />
        <Route path="/about"            element={<WhoWeArePage />} />
        <Route path="/portfolio/photography"          element={<PhotographyPortfolioPage />} />
        <Route path="/portfolio/web"                  element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/services"    element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/portfolio"   element={<WebStudioServicesPage />} />
        <Route path="/core" element={<CorePage />} />
      </Routes>
    </Router>
  );
}
