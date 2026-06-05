import { useRef, useEffect } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

const CORE_LETTERS = ['C', 'O', 'R', 'E'];

const offerings = [
  {
    id: 'strategy',
    title: 'STRATEGY',
    description: 'Crafting comprehensive design strategies that align with business objectives and user needs. From research to implementation, I ensure every design decision serves a purpose.',
    related: ['UX Research', 'Product Planning']
  },
  {
    id: 'design',
    title: 'DESIGN',
    description: 'Creating intuitive, beautiful interfaces that balance aesthetics with functionality. Every pixel, every interaction is thoughtfully designed to enhance the user experience.',
    related: ['UI/UX Design', 'Interaction Design']
  },
  {
    id: 'development',
    title: 'DEVELOPMENT',
    description: 'Bringing designs to life with clean, efficient code. I specialize in modern web technologies and frameworks to create performant, scalable solutions.',
    related: ['Frontend Development', 'React/Vue/Astro', 'Performance Optimization']
  },
  {
    id: 'leadership',
    title: 'LEADERSHIP',
    description: 'Guiding teams and projects to success. From mentoring junior designers to leading cross-functional initiatives, I help organizations achieve their design goals.',
    related: ['Team Leadership', 'Design Systems', 'Mentorship']
  }
];

export default function CorePage() {
  const letterRefs = useRef([]);

  useEffect(() => {
    // Hero letter animation
    setTimeout(() => {
      letterRefs.current.forEach((letter, index) => {
        setTimeout(() => {
          if (letter) {
            // @ts-ignore
            letter.style.opacity = '1';
            // @ts-ignore
            letter.style.transform = 'translateY(0px)';
          }
        }, index * 150);
      });
    }, 400);

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // @ts-ignore
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{
      backgroundImage: 'url(/images/5BC0F55F-2624-4CB5-8C13-D1B70DD77DB3.PNG)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center top'
    }}>
      <div className="fixed inset-0 bg-black/50 pointer-events-none z-0" />
      
      <Navbar />
      
      <main className="relative z-1">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="hero-letter-wrap absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-3">
            {CORE_LETTERS.map((letter, index) => (
              <span
                key={letter}
                ref={el => letterRefs.current[index] = el}
                className="hero-letter"
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(96px, 15vw, 560px)',
                  lineHeight: '0.82',
                  color: '#e7e5df',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(-200px)',
                  transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="about-section px-6 md:px-8 py-24" style={{ color: '#e7e5df' }}>
          <div className="about-content max-w-6xl mx-auto">
            {/* Name / Title */}
            <div className="about-description text-center pb-16">
              <p className="about-lead" style={{
                fontFamily: 'Koulen, cursive',
                fontSize: 'clamp(64px, 10vw, 130px)',
                lineHeight: '0.9',
                color: '#e7e5df',
                marginBottom: '16px',
                textShadow: '0 2px 30px rgba(0,0,0,1)'
              }}>
                Andre Walters
              </p>
              <p className="about-subline" style={{
                fontFamily: 'Roboto Mono, monospace',
                fontSize: 'clamp(14px, 1.8vw, 22px)',
                color: '#ccbb87',
                textShadow: '0 0 20px rgba(0,0,0,0.9)',
                marginBottom: '24px'
              }}>
                Software Developer & Electronics Engineer
              </p>
            </div>

            {/* Profile */}
            <div className="bio-row grid md:grid-cols-[180px_1fr] gap-12 pt-12 border-t border-white/10" data-animate>
              <div className="bio-label">
                <h2 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '20px',
                  color: '#ccbb87',
                  letterSpacing: '0.06em',
                  lineHeight: '1.3'
                }}>Profile</h2>
              </div>
              <div className="bio-text">
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Andre Walters is a software developer and electronics engineer based in Jamaica.
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  His work spans full-stack development, digital product design, and hardware-software integrations, with experience building scalable systems using React, Angular, Node.js, and modern cloud architectures.
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Andre previously contributed to enterprise platforms at Jamaica Public Service Company, helping evolve systems including the MyJPS Mobile App and internal customer experience platforms.
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  He holds a Bachelor of Science in Electronics Engineering from The University of the West Indies, Mona, and is currently pursuing a Master's in Computer-Based Management Information Systems.
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  His approach blends engineering discipline with a creative perspective to design systems that are intuitive, resilient, and purposeful.
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  When he's not coding, he's probably off-grid exploring waterfalls or soaking in the natural rhythm of Jamaica's rivers and beaches.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="bio-row grid md:grid-cols-[180px_1fr] gap-12 pt-12 border-t border-white/10" data-animate>
              <div className="bio-label">
                <h2 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '20px',
                  color: '#ccbb87',
                  letterSpacing: '0.06em',
                  lineHeight: '1.3'
                }}>Experience</h2>
              </div>
              <div className="bio-text">
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Software Developer</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  <strong style={{ color: '#ccbb87', fontWeight: 400 }}>Jamaica Public Service Company</strong> — Previous Role
                </p>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Contributed to enterprise platforms at JPS, helping evolve systems including the MyJPS Mobile App and internal customer experience platforms between 2021–2024.
                </p>
                <ul style={{ margin: '8px 0 12px', paddingLeft: '18px' }}>
                  <li style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#e7e5df',
                    marginBottom: '4px',
                    textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                  }}>Full-stack development using React, Angular, and Node.js</li>
                  <li style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#e7e5df',
                    marginBottom: '4px',
                    textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                  }}>Modern cloud architectures and scalable system design</li>
                  <li style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#e7e5df',
                    marginBottom: '4px',
                    textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                  }}>Digital product design and user experience optimization</li>
                  <li style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#e7e5df',
                    marginBottom: '4px',
                    textShadow: '0 1px 10px rgba(0,0,0,0.7)'
                  }}>Hardware-software integrations and IoT solutions</li>
                </ul>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Senior Frontend Developer</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Led development of complex web applications with a focus on performance, accessibility, and user experience.
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Technical Consultant</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Provided strategic guidance on technology implementation and digital transformation initiatives.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bio-row grid md:grid-cols-[180px_1fr] gap-12 pt-12 border-t border-white/10" data-animate>
              <div className="bio-label">
                <h2 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '20px',
                  color: '#ccbb87',
                  letterSpacing: '0.06em',
                  lineHeight: '1.3'
                }}>Education</h2>
              </div>
              <div className="bio-text">
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Master's in Computer-Based Management Information Systems</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  <strong style={{ color: '#ccbb87', fontWeight: 400 }}>Currently Pursuing</strong>
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Bachelor of Science in Electronics Engineering</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  <strong style={{ color: '#ccbb87', fontWeight: 400 }}>The University of the West Indies, Mona</strong>
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bio-row grid md:grid-cols-[180px_1fr] gap-12 pt-12 border-t border-white/10" data-animate>
              <div className="bio-label">
                <h2 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '20px',
                  color: '#ccbb87',
                  letterSpacing: '0.06em',
                  lineHeight: '1.3'
                }}>Achievements</h2>
              </div>
              <div className="bio-text">
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Technical Excellence</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Helped evolve and modernize critical features in the MyJPS Mobile App and Harmony Customer Experience Platform, recognized for blending a sharp creative eye with technical resilience.
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Design Innovation</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Bridges engineering discipline with a creative perspective to deliver intuitive, user-centered digital experiences.
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Community Impact</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Contributions to open-source projects and tech community initiatives across the Caribbean region.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="bio-row grid md:grid-cols-[180px_1fr] gap-12 pt-12 border-t border-white/10 border-b" data-animate>
              <div className="bio-label">
                <h2 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '20px',
                  color: '#ccbb87',
                  letterSpacing: '0.06em',
                  lineHeight: '1.3'
                }}>Interests</h2>
              </div>
              <div className="bio-text">
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Emerging Technologies</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Passionate about hardware-software integrations and IoT solutions that bridge the physical and digital worlds.
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Digital Art & Design</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  marginBottom: '12px',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Creative expression through digital mediums and interactive installations, applying engineering discipline to creative challenges.
                </p>
                <h3 style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: '22px',
                  color: '#e7e5df',
                  margin: '22px 0 6px',
                  textShadow: '0 1px 15px rgba(0,0,0,0.8)'
                }}>Community Building</h3>
                <p style={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#e7e5df',
                  textShadow: '0 1px 12px rgba(0,0,0,0.75)'
                }}>
                  Fostering tech communities and knowledge sharing in the Caribbean region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="expertise px-6 md:px-8 py-20" style={{ color: '#e7e5df' }}>
          <div className="expertise-container max-w-6xl mx-auto">
            <div className="expertise-header text-center mb-14">
              <h2 className="expertise-title" style={{
                fontFamily: 'Koulen, cursive',
                fontSize: 'clamp(44px, 6vw, 76px)',
                lineHeight: '0.9',
                textShadow: '0 0 20px rgba(0,0,0,0.8)'
              }}>
                EXPERTISE
              </h2>
            </div>
            <div className="expertise-grid grid md:grid-cols-2 lg:grid-cols-4 gap-7">
              {offerings.map((offering, index) => (
                <div 
                  key={offering.id} 
                  className="card p-8 bg-black/50 border border-white/13 rounded-md backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#ccbb87]" 
                  data-animate
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="card-number" style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '11px',
                    color: '#ccbb87',
                    letterSpacing: '0.1em',
                    marginBottom: '10px',
                    opacity: 0.75
                  }}>
                    0{index + 1}
                  </div>
                  <h3 className="card-title" style={{
                    fontFamily: 'Koulen, cursive',
                    fontSize: '28px',
                    color: '#e7e5df',
                    margin: 0,
                    lineHeight: 1
                  }}>
                    {offering.title}
                  </h3>
                  <div className="card-divider w-full h-px bg-white/10 my-3" />
                  <p className="card-subtitle" style={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '13px',
                    color: '#e7e5df',
                    opacity: 0.68,
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {offering.description}
                  </p>
                  <div className="card-related mt-4 pt-3 border-t border-white/7">
                    <h4 className="related-title" style={{
                      fontFamily: 'Koulen, cursive',
                      fontSize: '11px',
                      color: '#ccbb87',
                      letterSpacing: '0.1em',
                      margin: '0 0 7px'
                    }}>
                      Related
                    </h4>
                    <div className="related-tags flex flex-wrap gap-1">
                      {offering.related.map(tag => (
                        <span key={tag} className="tag bg-[rgba(204,187,135,0.1)] text-[#e7e5df] px-2 py-0.5 rounded text-xs opacity-82">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14" data-animate>
              <a
                href="https://andre-codes.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-accent text-accent font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-background transition-all"
              >
                View Portfolio →
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />

      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        [data-animate].visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 809px) {
          .bio-row {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 36px 0;
          }
          .expertise-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
