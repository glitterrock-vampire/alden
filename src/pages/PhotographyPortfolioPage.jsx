import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const HERO_LETTERS = [
  { letter: "P", size: 2 },
  { letter: "H", size: 2 },
  { letter: "O", size: 2 },
  { letter: "T", size: 2 },
  { letter: "O", size: 2 },
  { letter: "P", size: 3 },
  { letter: "O", size: 3 },
  { letter: "R", size: 3 },
  { letter: "T", size: 3 },
  { letter: "F", size: 3 },
  { letter: "O", size: 3 },
  { letter: "L", size: 3 },
  { letter: "I", size: 3 },
  { letter: "O", size: 3 }
];

const photoProjects = [
  { id:1, title:"JAMAICA LANDSCAPES", category:"NATURE PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:2, title:"PORTRAIT SESSIONS", category:"PORTRAIT PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png", imageW:2718, imageH:1810, comingSoon:true },
  { id:3, title:"URBAN EXPLORATION", category:"STREET PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:4, title:"WEDDING STORIES", category:"EVENT PHOTOGRAPHY", href:"https://example.com", image:"https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png", imageW:1628, imageH:1119, comingSoon:true },
  { id:5, title:"PRODUCT PHOTOGRAPHY", category:"COMMERCIAL", href:"https://example.com", image:"https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png", imageW:1628, imageH:1119, comingSoon:true },
];

export default function PhotographyPortfolioPage() {
  const letterRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) scale(1)';
          }, 800 + index * 100);
        }
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] flex flex-col justify-center items-center gap-5 p-10 w-full max-w-full">
          <div className="flex gap-3 justify-center flex-wrap">
            {HERO_LETTERS.map((item, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: item.size === 2 ? 'clamp(80px, 12vw, 200px)' : 'clamp(100px, 15vw, 280px)',
                  lineHeight: '0.7',
                  color: 'white',
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(-230px)',
                  transition: 'opacity 0.9s cubic-bezier(0.77,0.02,0.38,1), transform 0.9s cubic-bezier(0.77,0.02,0.38,1)',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                {item.letter}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative z-2 pt-32 px-6 md:px-10">
        <div className="max-w-full mx-auto overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {photoProjects.map((p) => (
              <div
                key={p.id}
                className={`relative cursor-pointer transition-transform duration-500 ${p.comingSoon ? 'cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                style={{
                  width: '560px',
                  height: '350px',
                  flex: 'none',
                  background: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <div className="absolute inset-0">
                  <img
                    src={`${p.image}?scale-down-to=1024&width=${p.imageW}&height=${p.imageH}`}
                    width={p.imageW} height={p.imageH}
                    loading={p.id <= 3 ? "eager" : "lazy"}
                    alt={`${p.title} project`}
                    className="w-full h-full object-cover"
                    style={{ filter: p.comingSoon ? 'brightness(0.35) grayscale(0.6)' : 'none' }}
                  />
                </div>
                <div className="absolute bottom-[-40px] left-0 right-0 px-6 flex justify-between items-center min-h-[21px] pointer-events-none">
                  <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', color: '#4caf50' }}>{p.title}</span>
                  <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', color: '#4caf50' }}>{p.category}</span>
                </div>
                {p.comingSoon && (
                  <div className="absolute bottom-4 right-4 z-6" style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: '#4caf50',
                    border: '1px solid rgba(76,175,80,0.35)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    background: 'rgba(231,229,223,0.75)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    COMING SOON
                  </div>
                )}
              </div>
            ))}
            <div style={{ width: '560px', height: '350px', flex: 'none', visibility: 'hidden' }} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
