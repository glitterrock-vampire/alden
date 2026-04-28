import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const CONSTRUCTION_SERVICES = [
  {
    name: "Steel Frame Homes",
    description: "Durable and affordable steel frame construction",
    price: "From $XXk",
    bedrooms: "1-3 BR",
    timeline: "3-4 months",
    features: ["Earthquake resistant", "Energy efficient", "Low maintenance", "Customizable designs"],
    status: "coming-soon"
  },
  {
    name: "Container Homes",
    description: "Modern container home conversions",
    price: "From $XXk",
    bedrooms: "Studio-2BR",
    timeline: "2-3 months",
    features: ["Sustainable materials", "Quick construction", "Portable design", "Modern finishes"],
    status: "coming-soon"
  },
  {
    name: "Blueprint Packages",
    description: "DIY home building plans and materials",
    price: "From $XXX",
    bedrooms: "Various",
    timeline: "DIY timeline",
    features: ["Detailed plans", "Material lists", "Construction guide", "Support consultation"],
    status: "available"
  }
];

const WAITLIST_BENEFITS = [
  "Early bird pricing discounts",
  "Priority access to first homes",
  "Exclusive design previews",
  "Regular construction updates",
  "Invitation to launch events"
];

export default function BuildPage() {
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeType: '',
    timeline: '',
    message: ''
  });

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
          const card = entry.target;
          // @ts-ignore
          const index = parseInt(card.dataset.index || '0');
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

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', phone: '', homeType: '', timeline: '', message: '' });
  };

  const heroLetters = ['B', 'U', 'I', 'L', 'D'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] flex flex-col justify-center items-center gap-5 p-10 w-full">
          <div className="flex gap-3 justify-center">
            {heroLetters.map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(100px, 20vw, 670px)',
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

      {/* Build Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-black/80 to-transparent">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3.75rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>ALDEN BUILD</h2>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Affordable Homes · Steel Frames · Coming 2026</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages designed for modern living. Building the future of Jamaican housing with sustainable, cost-effective solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Home Types</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {CONSTRUCTION_SERVICES.map((service, index) => (
              <div
                key={service.name}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                <div className="mb-5">
                  <span className={`text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border ${
                    service.status === 'coming-soon' 
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    {service.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{service.name}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>{service.description}</p>
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Price:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Bedrooms:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.bedrooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Timeline:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.timeline}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <span className="text-accent text-sm font-bold">+</span>
                      <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-6 md:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Join Our Waitlist</h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                Be the first to know when ALDEN BUILD launches. Get exclusive access to early bird pricing and priority home selection.
              </p>
              <div className="flex flex-col gap-5">
                {WAITLIST_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-2xl text-accent/80 min-w-[30px]" style={{ fontFamily: 'Koulen, cursive' }}>{index + 1}</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Phone Number</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Preferred Home Type</label>
                  <select 
                    value={formData.homeType}
                    onChange={e => setFormData({...formData, homeType: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    <option value="">Select a home type</option>
                    <option value="steel-frame">Steel Frame Home</option>
                    <option value="container">Container Home</option>
                    <option value="blueprint">Blueprint Package</option>
                    <option value="all">Interested in all options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Timeline</label>
                  <select 
                    value={formData.timeline}
                    onChange={e => setFormData({...formData, timeline: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready now</option>
                    <option value="6months">Within 6 months</option>
                    <option value="1year">Within 1 year</option>
                    <option value="2years">Within 2 years</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Additional Comments</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all resize-y" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 px-6 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Project Timeline</h2>
          <div className="flex flex-col gap-10">
            {[
              { year: '2024', title: 'Planning & Design', desc: 'Finalizing home designs, securing permits, and establishing construction partnerships.' },
              { year: '2025', title: 'Pilot Program', desc: 'Building first homes, testing construction methods, and refining processes.' },
              { year: '2026', title: 'Full Launch', desc: 'Official launch of ALDEN BUILD with full construction capabilities and home deliveries.' }
            ].map((item, index) => (
              <div key={item.year} className="flex gap-8 md:gap-10 items-start">
                <div className="text-2xl text-accent min-w-[100px] text-right" style={{ fontFamily: 'Koulen, cursive' }}>{item.year}</div>
                <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Ready to Build Your Future?</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>Join our waitlist and be part of Jamaica's affordable housing revolution</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#waitlist" className="py-4 px-8 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Join Waitlist
            </a>
            <a href="/contact" className="py-4 px-8 bg-transparent border border-white/50 text-white text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
