import { useState } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

const CONSTRUCTION_SERVICES = [
  {
    name: 'Steel Frame Homes',
    description: 'Durable and affordable steel frame construction',
    price: 'From $XXk',
    bedrooms: '1-3 BR',
    timeline: '3-4 months',
    features: ['Earthquake resistant', 'Energy efficient', 'Low maintenance', 'Customizable designs'],
    status: 'coming-soon',
  },
  {
    name: 'Container Homes',
    description: 'Modern container home conversions',
    price: 'From $XXk',
    bedrooms: 'Studio-2BR',
    timeline: '2-3 months',
    features: ['Sustainable materials', 'Quick construction', 'Portable design', 'Modern finishes'],
    status: 'coming-soon',
  },
  {
    name: 'Blueprint Packages',
    description: 'DIY home building plans and materials',
    price: 'From $XXX',
    bedrooms: 'Various',
    timeline: 'DIY timeline',
    features: ['Detailed plans', 'Material lists', 'Construction guide', 'Support consultation'],
    status: 'available',
  },
];

const WAITLIST_BENEFITS = [
  "Early bird pricing discounts",
  "Priority access to first homes",
  "Exclusive design previews",
  "Regular construction updates",
  "Invitation to launch events"
];



export default function BuildPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeType: '',
    timeline: '',
    message: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', phone: '', homeType: '', timeline: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="build-hero relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="build-hero-grid" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="build-hero-content">
          <div className="build-hero-copy">
            <span className="build-hero-kicker">ALDEN'S CONSTRUCTION · MODULAR HOMES</span>
            <h1 className="build-hero-title">BUILD</h1>
            <p>
              Affordable steel-frame homes, container conversions, and blueprint packages designed for Jamaica.
            </p>
            <a href="#home-types">Explore Home Types</a>
          </div>
        </div>
      </section>

      {/* Build Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-black/80 to-transparent">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3.75rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>ALDEN'S CONSTRUCTION</h2>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Affordable Homes · Steel Frames · Coming 2026</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages designed for modern living. Building the future of Jamaican housing with sustainable, cost-effective solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="home-types" className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Home Types</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {CONSTRUCTION_SERVICES.map((service, index) => (
              <div
                key={service.name}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
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
                Be the first to know when ALDEN'S CONSTRUCTION launches. Get exclusive access to early bird pricing and priority home selection.
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
              { year: '2026', title: 'Full Launch', desc: "Official launch of ALDEN'S CONSTRUCTION with full construction capabilities and home deliveries." }
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

      <FooterSection />

      <style>{`
        .build-hero {
          background:
            radial-gradient(circle at 70% 20%, rgba(204, 187, 135, 0.16), transparent 34rem),
            radial-gradient(circle at 15% 82%, rgba(255, 255, 255, 0.08), transparent 28rem),
            #050505;
        }

        .build-hero-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(231, 229, 223, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231, 229, 223, 0.055) 1px, transparent 1px);
          background-size: clamp(2.5rem, 7vw, 5.5rem) clamp(2.5rem, 7vw, 5.5rem);
          mask-image: radial-gradient(circle at center, black, transparent 75%);
        }

        .build-hero-content {
          position: relative;
          z-index: 2;
          width: min(100%, 92rem);
          min-height: 100svh;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(24rem, 1.1fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
          padding: clamp(7rem, 12vh, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem);
        }

        .build-hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .build-hero-kicker {
          margin-bottom: 1.25rem;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.72rem, 1.1vw, 0.88rem);
          letter-spacing: 0.28em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .build-hero-title {
          display: flex;
          gap: clamp(0.08em, 0.8vw, 0.14em);
          margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
        }

        .build-hero-title span {
          display: inline-block;
          font-family: 'Koulen', cursive;
          font-size: clamp(5.5rem, 13vw, 13rem);
          line-height: 0.72;
          color: #e7e5df;
          text-shadow: 0 0 3rem rgba(204, 187, 135, 0.16);
        }

        .build-hero-copy p {
          max-width: 40rem;
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.95rem, 1.4vw, 1.08rem);
          line-height: 1.8;
          color: rgba(231, 229, 223, 0.72);
        }

        .build-hero-copy a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          margin-top: 2rem;
          padding: 0.9rem 1.35rem;
          border: 1px solid rgba(204, 187, 135, 0.78);
          border-radius: 999px;
          color: #ccbb87;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .build-hero-copy a:hover {
          background: #ccbb87;
          color: #050505;
          transform: translateY(-2px);
        }

        .build-hero-animation {
          position: relative;
          min-height: clamp(24rem, 58vh, 38rem);
          overflow: hidden;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: clamp(1.4rem, 3vw, 2rem);
          background:
            radial-gradient(circle at 70% 18%, rgba(247, 217, 134, 0.16), transparent 17rem),
            linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.018));
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.28);
          isolation: isolate;
        }

        .build-hero-blueprint {
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(204, 187, 135, 0.12);
          border-radius: 1.25rem;
          background-image:
            linear-gradient(rgba(204, 187, 135, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 187, 135, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, rgba(204, 187, 135, 0.14) 49%, rgba(204, 187, 135, 0.14) 51%, transparent 52%);
          background-size: 1.35rem 1.35rem, 1.35rem 1.35rem, 9rem 9rem;
          opacity: 0.68;
          mask-image: linear-gradient(to bottom, black 20%, transparent 92%);
        }

        .build-hero-crane {
          position: absolute;
          top: 17%;
          left: 14%;
          width: 68%;
          height: 2px;
          background: rgba(204, 187, 135, 0.7);
          transform-origin: left center;
          animation: buildCraneSweep 5.2s ease-in-out infinite;
        }

        .build-hero-crane::before {
          content: '';
          position: absolute;
          left: 0;
          top: -1.6rem;
          width: 2px;
          height: clamp(12rem, 32vh, 20rem);
          background: linear-gradient(to bottom, rgba(204, 187, 135, 0.7), transparent);
        }

        .build-hero-crane span {
          position: absolute;
          right: 16%;
          top: 0;
          width: 2px;
          height: clamp(4rem, 12vh, 7rem);
          background: rgba(247, 217, 134, 0.76);
          animation: buildHookDrop 2.8s ease-in-out infinite;
        }

        .build-hero-crane span::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -0.85rem;
          width: 1.2rem;
          height: 1.2rem;
          border-right: 2px solid rgba(247, 217, 134, 0.86);
          border-bottom: 2px solid rgba(247, 217, 134, 0.86);
          transform: translateX(-50%) rotate(45deg);
        }

        .build-hero-skyline {
          position: absolute;
          left: clamp(1.5rem, 4vw, 3rem);
          right: clamp(1.5rem, 4vw, 3rem);
          bottom: clamp(5.5rem, 14vh, 7.5rem);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: end;
          gap: clamp(0.55rem, 1.5vw, 1rem);
          height: 54%;
        }

        .build-hero-skyline span {
          position: relative;
          display: block;
          min-height: 4.5rem;
          height: var(--tower-height);
          border: 1px solid rgba(231, 229, 223, 0.16);
          border-bottom-color: rgba(247, 217, 134, 0.58);
          border-radius: 0.55rem 0.55rem 0.08rem 0.08rem;
          background:
            linear-gradient(180deg, rgba(247, 217, 134, 0.22), rgba(204, 187, 135, 0.08)),
            repeating-linear-gradient(to bottom, rgba(231, 229, 223, 0.16) 0 1px, transparent 1px 0.9rem);
          transform: scaleY(0);
          transform-origin: bottom;
          animation: buildTowerRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, buildTowerPulse 4.8s ease-in-out infinite;
          animation-delay: var(--tower-delay), calc(var(--tower-delay) + 1.1s);
        }

        .build-hero-skyline span::before {
          content: '';
          position: absolute;
          inset: 0.55rem;
          border: 1px dashed rgba(247, 217, 134, 0.22);
        }

        .build-hero-skyline i {
          position: absolute;
          left: 50%;
          bottom: -1.6rem;
          transform: translateX(-50%);
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.48rem, 0.8vw, 0.58rem);
          font-style: normal;
          letter-spacing: 0.12em;
          color: rgba(231, 229, 223, 0.54);
          white-space: nowrap;
        }

        .build-hero-foundation {
          position: absolute;
          left: clamp(1.25rem, 4vw, 2.75rem);
          right: clamp(1.25rem, 4vw, 2.75rem);
          bottom: clamp(4rem, 10vh, 5.8rem);
          height: 0.35rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
        }

        .build-hero-foundation::after {
          content: '';
          display: block;
          width: 44%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #ccbb87, #f7d986, #ccbb87);
          animation: buildFoundationScan 2.6s ease-in-out infinite;
        }

        .build-hero-animation-copy {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 999px;
          background: rgba(5, 5, 5, 0.48);
          backdrop-filter: blur(14px);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: rgba(231, 229, 223, 0.68);
          text-transform: uppercase;
        }

        .build-hero-animation-copy strong {
          font-weight: 400;
          color: #ccbb87;
        }


        @keyframes buildTowerRise {
          0% {
            opacity: 0;
            transform: scaleY(0) translateY(1rem);
          }

          100% {
            opacity: 1;
            transform: scaleY(1) translateY(0);
          }
        }

        @keyframes buildTowerPulse {
          0%, 100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.18);
          }
        }

        @keyframes buildCraneSweep {
          0%, 100% {
            transform: rotate(-2deg);
          }

          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes buildHookDrop {
          0%, 100% {
            height: clamp(4rem, 12vh, 7rem);
          }

          50% {
            height: clamp(6rem, 17vh, 10rem);
          }
        }

        @keyframes buildFoundationScan {
          0% {
            transform: translateX(-110%);
          }

          100% {
            transform: translateX(260%);
          }
        }

        @media (max-width: 960px) {
          .build-hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .build-hero-copy {
            align-items: center;
            text-align: center;
          }

          .build-hero-title {
            justify-content: center;
          }

          .build-hero-animation {
            width: min(100%, 42rem);
            margin: 0 auto;
          }

        }

        @media (max-width: 640px) {
          .build-hero-content {
            padding-top: 6.5rem;
            padding-bottom: 2rem;
            gap: 1.25rem;
          }

          .build-hero-title span {
            font-size: clamp(3.75rem, 18vw, 5.4rem);
          }

          .build-hero-copy p {
            font-size: 0.86rem;
            line-height: 1.65;
          }

          .build-hero-copy a {
            margin-top: 1.15rem;
          }

          .build-hero-animation {
            min-height: 24rem;
          }

          .build-hero-animation-copy {
            flex-direction: column;
            align-items: flex-start;
            border-radius: 1rem;
            font-size: 0.62rem;
          }

        }
      `}</style>
    </div>
  );
}
