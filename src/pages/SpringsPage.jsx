import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

export default function SpringsPage() {
  const letterRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for joining our early access list! We\'ll keep you updated on our progress.');
    setFormData({ name: '', email: '', phone: '', interest: '' });
  };

  const heroLetters = ['S', 'P', 'R', 'I', 'N', 'G', 'S'];

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
                  fontSize: 'clamp(60px, 15vw, 400px)',
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

      {/* Coming Soon Content */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-black/80 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="text-sm tracking-[0.2em] text-accent uppercase px-6 py-3 border border-accent rounded-full inline-block opacity-80" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              COMING 2027
            </span>
          </div>
          
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))', letterSpacing: '0.05em' }}>ALDEN SPRINGS</h2>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-8">Smart Irrigation · Water Harvesting · Conservation</p>
          
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', color: 'hsl(var(--muted-foreground))', marginBottom: '4rem', lineHeight: '1.6', maxWidth: '32rem', margin: '0 auto 4rem' }}>
            Water tricking & irrigation systems for sustainable farming and residential use. 
            Innovative water management solutions designed for Jamaica's unique climate and needs.
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-20">
            {[
              { icon: 'S', title: 'Smart Systems', desc: 'Automated irrigation and water monitoring' },
              { icon: 'H', title: 'Harvesting', desc: 'Rainwater collection and storage solutions' },
              { icon: 'C', title: 'Conservation', desc: 'Efficient water usage and recycling systems' }
            ].map((feature) => (
              <div 
                key={feature.title}
                className="p-10 bg-white/[0.03] border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div className="text-5xl text-accent/80 mb-5" style={{ fontFamily: 'Koulen, cursive' }}>{feature.icon}</div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{feature.title}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Early Access Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-16">
            <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.875rem', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Join Early Access</h3>
            <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem', maxWidth: '32rem', margin: '0 auto 2.5rem' }}>
              Be the first to know when we launch. Get exclusive access to early bird pricing and priority installation.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input 
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                />
                <input 
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input 
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                />
                <select 
                  required
                  value={formData.interest}
                  onChange={e => setFormData({...formData, interest: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                >
                  <option value="">Select Interest</option>
                  <option value="residential">Residential</option>
                  <option value="farm">Farm/Agricultural</option>
                  <option value="commercial">Commercial</option>
                  <option value="all">All Solutions</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-4 px-6 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
              >
                Join Early Access
              </button>
            </form>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>Development Timeline</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {[
                { year: '2025', desc: 'Research & Development' },
                { year: '2026', desc: 'Testing & Pilot Programs' },
                { year: '2027', desc: 'Full Launch' }
              ].map((item) => (
                <div key={item.year} className="text-center p-6 bg-white/[0.03] border border-white/10 rounded-xl min-w-[150px]">
                  <div className="text-2xl text-accent mb-2" style={{ fontFamily: 'Koulen, cursive' }}>{item.year}</div>
                  <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Roboto Mono, monospace' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '3rem', color: 'hsl(var(--foreground))' }}>About ALDEN SPRINGS</h2>
          <div className="space-y-6 mb-12">
            <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
              ALDEN SPRINGS is the latest venture in the ALDEN ecosystem, focusing on sustainable water management solutions for Jamaica. 
              Our mission is to address water scarcity challenges through innovative technology and smart irrigation systems.
            </p>
            <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
              We're developing comprehensive water solutions that combine traditional wisdom with modern technology, 
              ensuring efficient water usage for both residential and agricultural applications.
            </p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-xl">
            <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--accent))' }}>Our Vision</h3>
            <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))' }}>
              Creating a water-secure Jamaica through innovative conservation, harvesting, and smart management systems.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Get in Touch</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>Have questions about our water solutions? Want to partner with us?</p>
          
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Email:</span>
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))' }}>water@alden.one</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Phone:</span>
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))' }}>+1 (876) XXX-XXXX</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Location:</span>
              <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))' }}>Kingston, Jamaica</span>
            </div>
          </div>
          
          <a href="/contact" className="inline-block py-4 px-8 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all min-w-[200px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
