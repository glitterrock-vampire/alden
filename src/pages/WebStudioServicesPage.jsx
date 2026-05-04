import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const WEB_STUDIO_SERVICES = [
  {
    title: "Digital Transformation",
    description: "Transform your business with cutting-edge technologies to enhance processes, culture, and customer experiences.",
    features: ["Assess Current State", "Create Digital Strategic Plan", "Implement and Integrate", "Monitor and Optimize"],
    icon: "🛡"
  },
  {
    title: "e-Commerce",
    description: "Comprehensive solution for launching, optimizing, and managing online stores with advanced features.",
    features: ["Product & Inventory Management", "Order & Shipping Management", "Multi-Vendor Marketplace", "Secure Payment Gateways"],
    icon: "🛒"
  },
  {
    title: "Website Development",
    description: "Custom, scalable, and high-performing websites and applications to elevate your online presence.",
    features: ["Tailored Made To Your Needs", "Scalable Solutions", "Seamless Performance", "Enhanced Engagement"],
    icon: "✓"
  },
  {
    title: "Mobile App Development",
    description: "Custom, high-performance iOS and Android apps to engage and elevate your business.",
    features: ["Custom Development", "Seamless Integration", "Innovative Design", "Enhanced Security"],
    icon: "📱"
  },
  {
    title: "Automation & Integration",
    description: "Transform with integrated digital technologies and automation for efficiency and growth.",
    features: ["Task Automation", "Data Integration", "Process Optimization", "Cost Reduction"],
    icon: "⚙"
  },
  {
    title: "Help Desk Solution",
    description: "Enhance support with 24/7 help desk, streamlining issue resolution and improving satisfaction.",
    features: ["Ticket Management", "Multi-Channel Support", "Automated Responses", "Knowledge Base"],
    icon: "🎧"
  },
  {
    title: "Cloud Hosting",
    description: "Scalable, secure, and cost-effective cloud services for digital efficiency and reliability.",
    features: ["Web App & Website Hosting", "Scalable Resources", "Enhanced Security", "Automated Backups"],
    icon: "☁"
  },
  {
    title: "Content Marketing",
    description: "Boost engagement and drive growth with targeted, high-quality content tailored to your audience.",
    features: ["Audience Research", "Content Planning", "Content Creation", "Performance Analysis"],
    icon: "📝"
  },
  {
    title: "Quality Assurance",
    description: "Ensure software reliability and user satisfaction with comprehensive testing strategies.",
    features: ["Bug Detection", "Performance Testing", "Usability Testing", "Automated Testing"],
    icon: "🔍"
  },
  {
    title: "Load Testing",
    description: "Optimize system performance ensuring scalability, stability, and peak traffic readiness.",
    features: ["Realistic User Simulations", "Scalability Assessment", "Performance Optimization", "Detailed Reporting"],
    icon: "⚡"
  },
  {
    title: "S&G Cloud Hosting",
    description: "Unlock the Power of the Cloud for Your S&G Smart Lock Solutions with managed hosting.",
    features: ["Cloud Server Setup & Integration", "24/7 Managed Hosting", "Scalable and Secure", "Backup & Disaster Recovery"],
    icon: "🔐"
  }
];

export default function WebStudioServicesPage() {
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
          <div className="flex gap-3 justify-start">
            <span ref={el => letterRefs.current[0] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>W</span>
            <span ref={el => letterRefs.current[1] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>E</span>
            <span ref={el => letterRefs.current[2] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(80px, 12vw, 150px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>B</span>
          </div>
          <div className="flex gap-3 justify-start">
            <span ref={el => letterRefs.current[3] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>S</span>
            <span ref={el => letterRefs.current[4] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>E</span>
            <span ref={el => letterRefs.current[5] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>R</span>
            <span ref={el => letterRefs.current[6] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>V</span>
            <span ref={el => letterRefs.current[7] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>I</span>
            <span ref={el => letterRefs.current[8] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>C</span>
            <span ref={el => letterRefs.current[9] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>E</span>
            <span ref={el => letterRefs.current[10] = el} style={{
              fontFamily: 'Koulen, cursive',
              fontSize: 'clamp(120px, 18vw, 250px)',
              lineHeight: '0.7',
              color: '#e7e5df',
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(-230px)',
              transition: 'all 0.9s cubic-bezier(0.77,0.02,0.38,1)'
            }}>S</span>
          </div>
        </div>
      </section>

      {/* Services Header */}
      <section className="py-32 px-10 text-center bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '30px', color: 'hsl(var(--foreground))' }}>
            ALDEN Web Studio Services
          </h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: '#ccbb87', marginBottom: '20px' }}>
            Comprehensive digital solutions tailored for your business needs
          </p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))', marginBottom: '40px' }}>
            From concept to deployment, we provide end-to-end digital services that transform your vision into reality. Our expertise spans across web development, mobile applications, cloud infrastructure, and digital marketing.
          </p>
          <a
            href="/studios/web-studio/portfolio"
            className="inline-flex items-center gap-3 py-4 px-8 bg-transparent border border-[#ccbb87] text-[#ccbb87] font-body text-sm tracking-wider uppercase rounded-lg hover:bg-[#ccbb87] hover:text-black transition-all min-w-[180px]"
            style={{ fontFamily: 'Roboto Mono, monospace' }}
          >
            View Portfolio →
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {WEB_STUDIO_SERVICES.map((service, index) => (
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
                <a href="/contact" className="w-full text-center py-3 px-6 bg-[#ccbb87] text-black rounded-lg hover:bg-[#ccbb87]/90 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', marginBottom: '60px', color: 'hsl(var(--foreground))' }}>
            Our Process
          </h2>
          
          <div className="grid md:grid-cols-4 gap-10">
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#ccbb87] rounded-full flex items-center justify-center mx-auto mb-5" style={{ fontFamily: 'Koulen, cursive', fontSize: '24px', color: '#000' }}>
                1
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '20px', marginBottom: '16px', color: 'hsl(var(--foreground))' }}>
                Discovery
              </h3>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))' }}>
                We start by understanding your business goals, target audience, and technical requirements.
              </p>
            </div>
            
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#ccbb87] rounded-full flex items-center justify-center mx-auto mb-5" style={{ fontFamily: 'Koulen, cursive', fontSize: '24px', color: '#000' }}>
                2
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '20px', marginBottom: '16px', color: 'hsl(var(--foreground))' }}>
                Strategy
              </h3>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))' }}>
                Develop a comprehensive roadmap outlining the technical approach and project timeline.
              </p>
            </div>
            
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#ccbb87] rounded-full flex items-center justify-center mx-auto mb-5" style={{ fontFamily: 'Koulen, cursive', fontSize: '24px', color: '#000' }}>
                3
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '20px', marginBottom: '16px', color: 'hsl(var(--foreground))' }}>
                Development
              </h3>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))' }}>
                Build your solution using cutting-edge technologies and best practices.
              </p>
            </div>
            
            <div className="text-center p-10 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#ccbb87] rounded-full flex items-center justify-center mx-auto mb-5" style={{ fontFamily: 'Koulen, cursive', fontSize: '24px', color: '#000' }}>
                4
              </div>
              <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '20px', marginBottom: '16px', color: 'hsl(var(--foreground))' }}>
                Launch & Support
              </h3>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '14px', lineHeight: '1.6', color: 'hsl(var(--muted-foreground))' }}>
                Deploy your solution and provide ongoing support and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-10 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px', color: 'hsl(var(--foreground))' }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '18px', marginBottom: '40px', color: 'hsl(var(--muted-foreground))' }}>
            Let's discuss how our services can help you achieve your digital goals
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <a href="/contact" className="py-4 px-8 bg-[#ccbb87] text-black font-body text-sm tracking-wider uppercase rounded-lg hover:bg-[#ccbb87]/90 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Start Your Project
            </a>
            <a href="/studios/web-studio/portfolio" className="py-4 px-8 bg-transparent border border-white/50 text-white font-body text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
