import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const PHOTO_STUDIO_SERVICES = [
  {
    title: "Portrait",
    description: "Professional headshots and personal portraits that capture your unique personality and professional image.",
    features: [
      "Corporate Headshots",
      "Professional Portraits",
      "Personal Branding",
      "Executive Portraits"
    ],
    icon: "👤"
  },
  {
    title: "Event",
    description: "Comprehensive event coverage capturing moments and emotions from weddings to corporate functions.",
    features: [
      "Weddings & Ceremonies",
      "Corporate Events",
      "Birthday Parties",
      "Concerts & Performances"
    ],
    icon: "✓"
  },
  {
    title: "Landscape",
    description: "Stunning natural landscapes and scenic environments showcasing the beauty of Jamaica and beyond.",
    features: [
      "Mountain & Nature",
      "Coastal & Ocean",
      "Urban & Architecture",
      "Sunset & Golden Hour"
    ],
    icon: "🏔"
  },
  {
    title: "Product",
    description: "High-quality product photography that showcases your products in the best light and context.",
    features: [
      "E-commerce Products",
      "Food & Beverage",
      "Fashion & Apparel",
      "Lifestyle Products"
    ],
    icon: "📦"
  },
  {
    title: "Real Estate",
    description: "Professional property photography that helps sell spaces by highlighting their best features.",
    features: [
      "Interior Photography",
      "Exterior Shots",
      "Aerial & Drone",
      "Virtual Tours"
    ],
    icon: "🏠"
  },
  {
    title: "Food",
    description: "Appetizing food photography that makes dishes look irresistible and professional.",
    features: [
      "Restaurant Menus",
      "Recipe Photography",
      "Food Styling",
      "Packaging Shots"
    ],
    icon: "🍽"
  },
  {
    title: "Creative Projects",
    description: "Artistic and conceptual photography projects that push creative boundaries.",
    features: [
      "Conceptual Projects",
      "Art Direction",
      "Creative Retouching",
      "Experimental Projects"
    ],
    icon: "🎨"
  },
  {
    title: "Photo Editing",
    description: "Professional photo editing and retouching services to enhance and perfect your images.",
    features: [
      "Color Correction",
      "Retouching & Restoration",
      "Background Removal",
      "Professional Printing"
    ],
    icon: "🎭"
  },
  {
    title: "Photo Sessions",
    description: "Personalized photo sessions tailored to your specific needs and vision.",
    features: [
      "Individual Sessions",
      "Family & Group",
      "Couples & Engagement",
      "Custom Themes"
    ],
    icon: "📅"
  }
];

export default function PhotoStudioServicesPage() {
  const letterRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateX(0px) translateY(0px) scale(1)';
          }, 800 + index * 100);
        }
      });
    }, 500);

    // Animate service cards on scroll
    // @ts-ignore - TypeScript error in JSX file with Element type
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // @ts-ignore
          const card = entry.target;
          // @ts-ignore
          const index = parseInt(card.dataset.serviceIndex || '0');
          setTimeout(() => {
            // @ts-ignore
            card.style.opacity = '1';
            // @ts-ignore
            card.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-10 z-[2] flex flex-col justify-start items-start gap-5 p-10 w-full max-w-full">
          <div className="flex gap-3 justify-start flex-wrap">
            <span ref={el => letterRefs.current[0] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>P</span>
            <span ref={el => letterRefs.current[1] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>H</span>
            <span ref={el => letterRefs.current[2] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>O</span>
            <span ref={el => letterRefs.current[3] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>T</span>
            <span ref={el => letterRefs.current[4] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>O</span>
          </div>
          <div className="flex gap-3 justify-start flex-wrap">
            <span ref={el => letterRefs.current[5] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>S</span>
            <span ref={el => letterRefs.current[6] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>E</span>
            <span ref={el => letterRefs.current[7] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>R</span>
            <span ref={el => letterRefs.current[8] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>V</span>
            <span ref={el => letterRefs.current[9] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>I</span>
            <span ref={el => letterRefs.current[10] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>C</span>
            <span ref={el => letterRefs.current[11] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>E</span>
            <span ref={el => letterRefs.current[12] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(100px, 15vw, 200px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)',
              maxWidth: '100%'
            }}>S</span>
          </div>
        </div>
      </section>

      {/* Services Header */}
      <section className="py-32 px-10 text-center bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '30px', color: 'hsl(var(--foreground))' }}>
            ALDEN Photo Studio Services
          </h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: '#ccbb87', marginBottom: '20px' }}>
            Professional photography services tailored for your vision
          </p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))' }}>
            From portraits to landscapes, events to creative projects, we capture moments that tell your story. Our photography combines technical excellence with artistic vision to create images that are both beautiful and meaningful.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', marginBottom: '60px', color: 'hsl(var(--foreground))' }}>
            Photography Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {PHOTO_STUDIO_SERVICES.map((service, index) => (
              <div 
                key={service.title}
                className="service-card bg-white/5 border border-white/10 rounded-2xl p-10 text-center transition-all duration-600 hover:bg-white/8 hover:-translate-y-1"
                data-service-index={index}
                style={{ opacity: 0, transform: 'translateY(30px)' }}
              >
                <div className="w-16 h-16 bg-[#ccbb87] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">{service.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '24px', marginBottom: '16px', color: 'hsl(var(--foreground))' }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '16px', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))', marginBottom: '24px' }}>
                  {service.description}
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <span style={{ color: '#ccbb87', fontSize: '16px', fontWeight: 'bold' }}>✓</span>
                      <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-10 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px', color: 'hsl(var(--foreground))' }}>
            Ready to Capture Your Moments?
          </h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '18px', marginBottom: '40px', color: 'hsl(var(--muted-foreground))' }}>
            Let's create beautiful memories together
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <a href="/contact" className="py-4 px-8 bg-[#ccbb87] text-black font-body text-sm tracking-wider uppercase rounded-lg hover:bg-[#ccbb87]/90 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Book Photoshoot
            </a>
            <a href="/studios/photo-studio/portfolio" className="py-4 px-8 bg-transparent border border-white/50 text-white font-body text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
