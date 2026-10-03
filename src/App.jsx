import { Suspense, lazy, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import EcosystemSection from '@/components/home/EcosystemSection';
import AboutSection from '@/components/home/AboutSection';
import FooterSection from '@/components/home/FooterSection';

// Static pages — bundled normally
import StudiosPage from '@/pages/StudiosPage';
import WhoWeArePage from '@/pages/WhoWeArePage';
import PhotoStudioServicesPage from '@/pages/PhotoStudioServicesPage';
import WebStudioServicesPage from '@/pages/web-studio/WebStudioServicesPage';
import CorePage from '@/pages/CorePage';
import SpringsPage from '@/pages/SpringsPage';

// 3D pages — lazy loaded so Three.js/R3F never blocks initial render
const FarmPage  = lazy(() => import('@/pages/FarmPage'));
const BuildPage = lazy(() => import('@/pages/BuildPage'));

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
      <HeroSection />
      <MarqueeStrip text="TECHNOLOGY · INNOVATION · DESIGN · FARM · BUILD · FLOW · KINGSTON, JA ·" />
      <EcosystemSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/ecosystem" element={<Navigate replace to="/#ecosystem" />} />

        {/* 3D pages — lazy + suspense */}
        <Route path="/farm"  element={<Suspense fallback={<Page3DFallback />}><FarmPage /></Suspense>} />
        <Route path="/build" element={<Suspense fallback={<Page3DFallback />}><BuildPage /></Suspense>} />

        <Route path="/spring"  element={<SpringsPage />} />
        <Route path="/springs" element={<SpringsPage />} />
        <Route path="/studios/photo-studio/services"  element={<PhotoStudioServicesPage />} />
        <Route path="/about/who-we-are" element={<WhoWeArePage />} />
        <Route path="/about/careers"    element={<WhoWeArePage />} />
        <Route path="/about"            element={<WhoWeArePage />} />
        <Route path="/portfolio/photography"          element={<Navigate replace to="/studios/photo-studio/services" />} />
        <Route path="/portfolio/web"                  element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/services"    element={<WebStudioServicesPage />} />
        <Route path="/studios/web-studio/portfolio"   element={<WebStudioServicesPage />} />
        <Route path="/core" element={<CorePage />} />
      </Routes>
    </Router>
  );
}
