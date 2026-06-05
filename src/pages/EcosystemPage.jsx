import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import { Sprout, HardHat, Droplets, ArrowRight } from 'lucide-react';

const ECOSYSTEM_VENTURES = [
  {
    title: "ALDEN FARM",
    description: "Sustainable agriculture and organic farming practices, bringing fresh, locally-grown produce to our community.",
    icon: Sprout,
    href: "/farm",
    status: "active",
    features: ["Organic Farming", "Local Produce", "Sustainable Practices", "Community Supported"]
  },
  {
    title: "ALDEN BUILD", 
    description: "Construction and development services focused on quality craftsmanship and sustainable building solutions.",
    icon: HardHat,
    href: "/build",
    status: "active",
    features: ["Residential Construction", "Commercial Development", "Renovation Services", "Sustainable Building"]
  },
  {
    title: "ALDEN SPRINGS",
    description: "Natural spring water bottling and distribution, providing pure, refreshing water from sustainable sources.",
    icon: Droplets,
    href: "/springs",
    status: "coming-soon",
    features: ["Natural Spring Water", "Sustainable Sourcing", "Premium Quality", "Coming Soon"]
  }
];

const CORE_VALUES = [
  { title: "Sustainability", description: "Every venture is built with environmental responsibility at its core, ensuring long-term ecological balance." },
  { title: "Quality", description: "We maintain the highest standards across all our ventures, from farm-fresh produce to premium construction." },
  { title: "Community", description: "Our ecosystem serves and strengthens local communities while creating sustainable economic opportunities." },
  { title: "Innovation", description: "We embrace modern techniques and technologies to improve efficiency while maintaining traditional values." }
];

export default function EcosystemPage() {
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
          }, 800 + index * 100);
        }
      });
    }, 500);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /** @type {HTMLElement} */
          const card = entry.target;
          const index = parseInt(card.dataset.index || '0');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 200);
          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const heroLetters = ['E', 'C', 'O', 'S', 'Y', 'S', 'T', 'E', 'M'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-10 z-[2] flex flex-col justify-start items-start gap-5 p-10">
          <div className="flex gap-3 flex-wrap">
            {heroLetters.map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(80px, 15vw, 240px)',
                  lineHeight: '0.7',
                  color: 'white',
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(-230px)',
                  transition: 'opacity 0.9s cubic-bezier(0.77,0.02,0.38,1), transform 0.9s cubic-bezier(0.77,0.02,0.38,1)'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3.75rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>ALDEN Ecosystem</h2>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Sustainable Ventures for a Better Future</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Our ecosystem represents a commitment to sustainable growth across multiple sectors, from agriculture and construction to natural resources. Each venture is built on principles of environmental responsibility, quality, and community impact.
          </p>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {ECOSYSTEM_VENTURES.map((venture, index) => (
              <div
                key={venture.title}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 relative transition-all duration-[800ms] hover:bg-white/[0.08] hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:border-accent/50"
                style={{
                  opacity: 0,
                  transform: 'translateY(50px)'
                }}
              >
                <div className="absolute top-5 right-5">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border ${
                    venture.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {venture.status === 'active' ? 'ACTIVE' : 'COMING SOON'}
                  </span>
                </div>
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                  <venture.icon className="w-8 h-8 text-background" />
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{venture.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem', lineHeight: '1.6' }}>{venture.description}</p>
                <div className="flex flex-col gap-3 mb-8">
                  {venture.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <span className="text-accent text-sm font-bold">✓</span>
                      <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href={venture.href} 
                  className="inline-flex items-center gap-2 text-accent hover:text-white transition-all duration-300 hover:gap-3"
                  style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem' }}
                >
                  {venture.status === 'active' ? 'Explore Venture' : 'Learn More'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8 md:gap-10">
            {CORE_VALUES.map((value) => (
              <div 
                key={value.title}
                className="text-center p-8 md:p-10 bg-white/[0.03] border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>{value.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Making a Difference</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '4rem' }}>Our ecosystem impact extends beyond business metrics</p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="text-5xl text-accent mb-3" style={{ fontFamily: 'Koulen, cursive' }}>100%</div>
              <div className="text-xs tracking-wider text-muted-foreground uppercase" style={{ fontFamily: 'Roboto Mono, monospace' }}>Sustainable Practices</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-accent mb-3" style={{ fontFamily: 'Koulen, cursive' }}>3</div>
              <div className="text-xs tracking-wider text-muted-foreground uppercase" style={{ fontFamily: 'Roboto Mono, monospace' }}>Active Ventures</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-accent mb-3" style={{ fontFamily: 'Koulen, cursive' }}>∞</div>
              <div className="text-xs tracking-wider text-muted-foreground uppercase" style={{ fontFamily: 'Roboto Mono, monospace' }}>Growth Potential</div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
