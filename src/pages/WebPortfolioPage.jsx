import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const projects = [
  { id:1, title:"CDT JAMAICA", category:"DIGITAL PLATFORM", filter:"enterprise", href:"https://cdtjamaica.org", image:"https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png", imageW:1628, imageH:1119, liveUrl:"https://cdtjamaica.org" },
  { id:2, title:"TOTALLY BAKED", category:"E-COMMERCE", filter:"fullstack", href:"https://totally-baked-ja.vercel.app", image:"https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png", imageW:2718, imageH:1810, liveUrl:"https://totally-baked-ja.vercel.app" },
  { id:3, title:"ZENITH TEAS", category:"TEA MANAGEMENT", filter:"fullstack", href:"https://zenith-taupe.vercel.app", image:"https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png", imageW:1628, imageH:1119, liveUrl:"https://zenith-taupe.vercel.app" },
  { id:4, title:"GLOWING LANDING", category:"LANDING PAGE", filter:"frontend", href:"https://glowing-landing-page.netlify.app", image:"https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png", imageW:1628, imageH:1119, liveUrl:"https://glowing-landing-page.netlify.app" },
  { id:5, title:"BLACKBOX SYSTEM", category:"IOT SYSTEM", filter:"fullstack", href:"https://blackbox-online.vercel.app", image:"https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png", imageW:1628, imageH:1119, liveUrl:"https://blackbox-online.vercel.app" },
  { id:6, title:"DAVID P BLAKE", category:"PERSONAL PORTFOLIO", filter:"frontend", href:"https://davidpblake.org", image:"https://framerusercontent.com/images/placeholder.png", imageW:1628, imageH:1119, liveUrl:"https://davidpblake.org" },
  { id:7, title:"ALDEN FARM", category:"ECOSYSTEM / AGRICULTURE", filter:"ecosystem", href:"/farm", image:"https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png", imageW:1628, imageH:1119, liveUrl:"/farm" },
  { id:8, title:"ALDEN BUILD", category:"ECOSYSTEM / CONSTRUCTION", filter:"ecosystem", href:"/build", image:"https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png", imageW:1628, imageH:1119, liveUrl:"/build" },
  { id:9, title:"ALDEN SPRINGS", category:"ECOSYSTEM / WATER", filter:"ecosystem", href:"/springs", image:"https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png", imageW:1628, imageH:1119, liveUrl:"/springs" },
];

const filters = [
  { id: 'all', label: 'ALL' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'fullstack', label: 'FULLSTACK' },
  { id: 'enterprise', label: 'ENTERPRISE' },
  { id: 'mobile', label: 'MOBILE APPS' },
  { id: 'ecosystem', label: 'ECOSYSTEM' },
];

export default function WebPortfolioPage() {
  const letterRefs = useRef([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      const heroLetters = document.querySelectorAll('.hero-letter');
      heroLetters.forEach((letter, index) => {
        setTimeout(() => {
          // @ts-ignore
          letter.style.opacity = '1';
          // @ts-ignore
          letter.style.transform = 'translateX(0px) translateY(0px) scale(1)';
        }, 800 + index * 100);
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <div className="absolute bottom-0 left-10 z-[2] flex flex-col justify-start items-start gap-5 p-10 w-full max-w-full">
          <div className="flex gap-3 justify-start">
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '0.8s'
            }}>W</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '0.9s'
            }}>E</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.0s'
            }}>B</span>
          </div>
          <div className="flex gap-3 justify-start">
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.1s'
            }}>P</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.2s'
            }}>O</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.3s'
            }}>R</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.4s'
            }}>T</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.5s'
            }}>F</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.6s'
            }}>O</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.7s'
            }}>L</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.8s'
            }}>I</span>
            <span className="hero-letter" style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-50px)',
              animation: 'hero-letter-in 0.9s cubic-bezier(0.77,0.02,0.38,1) forwards',
              animationDelay: '1.9s'
            }}>O</span>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative z-5 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                  activeFilter === filter.id
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                style={{ fontFamily: 'Roboto Mono, monospace' }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {projects
              .filter(project => activeFilter === 'all' || project.filter === activeFilter)
              .map((project) => (
              <div key={project.id} className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <div className="relative w-full h-60 bg-[#1a1a1a]">
                  {project.liveUrl ? (
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-full h-full border-none pointer-events-none"
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    ></iframe>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1.25rem', fontWeight: 500, color: '#FFD700', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    {project.title}
                  </h3>
                  <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'rgba(255, 215, 0, 0.7)', letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>
                    {project.category}
                  </span>
                  {project.liveUrl?.startsWith('http') ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '0.75rem',
                        color: '#FFD700',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '2rem',
                        transition: 'all 0.3s ease'
                      }}
                      className="hover:bg-yellow-500/10 hover:border-yellow-500 hover:gap-3"
                    >
                      View Live Site →
                    </a>
                  ) : (
                    <a
                      href={project.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '0.75rem',
                        color: '#FFD700',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '2rem',
                        transition: 'all 0.3s ease'
                      }}
                      className="hover:bg-yellow-500/10 hover:border-yellow-500 hover:gap-3"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes hero-letter-in { 
          to { 
            opacity: 1;
            transform: translateY(0); 
          } 
        }
      `}</style>
    </div>
  );
}
