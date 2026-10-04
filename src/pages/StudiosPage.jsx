import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { Code2, Camera } from 'lucide-react';

const STUDIOS = [
  {
    title: "Web Studio",
    description: "Custom web development, e-commerce solutions, and digital transformation services to elevate your online presence.",
    icon: Code2,
    href: "/studios/web-studio/services",
    features: ["Website Development", "E-Commerce Solutions", "Mobile Apps", "Cloud Hosting"]
  },
  {
    title: "Photo Studio", 
    description: "Professional photography services covering portraits, events, commercial, and artistic visual storytelling.",
    icon: Camera,
    href: "/studios/photo-studio/services",
    features: ["Portrait Photography", "Event Coverage", "Commercial Photography", "Photo Editing"]
  }
];

export default function StudiosPage() {
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Hero letter animations
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

    // Card scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = /** @type {HTMLElement} */ (entry.target);
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

  const heroLetters = ['S', 'T', 'U', 'D', 'I', 'O', 'S'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-10 z-[2] flex flex-col justify-start items-start gap-5 p-10">
          <div className="flex gap-3 justify-start">
            {heroLetters.map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(120px, 25vw, 320px)',
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

      {/* Studios Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(1rem, 2vw, 1.5rem)', letterSpacing: '0.3em', color: 'hsl(var(--accent))', marginBottom: '0.25rem' }}>PHOTO</p>
            <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1', color: 'hsl(var(--foreground))' }}>ALDEN</h2>
            <p style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', letterSpacing: '0.05em', color: 'hsl(var(--foreground))', marginTop: '-0.25rem' }}>STUDIO</p>
          </div>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Creative Excellence Across Multiple Disciplines</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Our Studios bring together expertise in web development, photography, and digital services to deliver comprehensive solutions for your creative and technical needs.
          </p>
        </div>
      </section>

      {/* Studios Grid */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {STUDIOS.map((studio, index) => (
              <div
                key={studio.title}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 transition-all duration-[800ms] hover:bg-white/[0.08] hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:border-accent/50"
                style={{
                  opacity: 0,
                  transform: 'translateY(50px)'
                }}
              >
                <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-8">
                  <studio.icon className="w-10 h-10 text-background" />
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.875rem', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>{studio.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2rem', lineHeight: '1.6' }}>{studio.description}</p>
                <div className="flex flex-col gap-4 mb-10">
                  {studio.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-4">
                      <span className="text-accent text-lg font-bold">✓</span>
                      <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href={studio.href} 
                  className="inline-flex items-center gap-3 text-accent hover:text-white transition-all duration-300 hover:gap-4"
                  style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem' }}
                >
                  Explore {studio.title}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '5rem', color: 'hsl(var(--foreground))' }}>How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: 1, title: "Consultation", desc: "We start by understanding your vision, goals, and requirements to ensure we deliver exactly what you need." },
              { num: 2, title: "Strategy", desc: "Our team develops a comprehensive approach tailored to your specific needs and objectives." },
              { num: 3, title: "Creation", desc: "We bring your vision to life with our expertise in design, development, and creative services." },
              { num: 4, title: "Delivery", desc: "We deliver exceptional results and provide ongoing support to ensure your success." }
            ].map((step) => (
              <div 
                key={step.num}
                className="text-center p-8 md:p-12 bg-white/[0.03] border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6" style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', color: 'hsl(var(--background))' }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
