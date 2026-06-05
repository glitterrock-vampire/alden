import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

const photoProjects = [
  { 
    id: 1, 
    title: "JAMAICA LANDSCAPES", 
    category: "NATURE PHOTOGRAPHY", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  },
  { 
    id: 2, 
    title: "PORTRAIT SESSIONS", 
    category: "PORTRAIT PHOTOGRAPHY", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  },
  { 
    id: 3, 
    title: "URBAN EXPLORATION", 
    category: "STREET PHOTOGRAPHY", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  },
  { 
    id: 4, 
    title: "WEDDING STORIES", 
    category: "EVENT PHOTOGRAPHY", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1519741497674-611481e3d46e?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  },
  { 
    id: 5, 
    title: "PRODUCT PHOTOGRAPHY", 
    category: "COMMERCIAL", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  },
  { 
    id: 6, 
    title: "ARCHITECTURAL DETAILS", 
    category: "ARCHITECTURE", 
    href: "https://example.com", 
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop", 
    imageW: 800, 
    imageH: 600, 
    comingSoon: false 
  }
];

export default function PhotographyPortfolioPage() {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element instanceof HTMLElement) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-black text-white">
        <div className="max-w-4xl text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Photography
            <br />
            <span className="text-gray-400">Portfolio</span>
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            A curated collection of visual stories captured through the lens, showcasing moments of beauty, emotion, and artistic expression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#portfolio"
              className="px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              View Work
            </a>
            <a 
              href="/services"
              className="px-8 py-4 border border-white text-white font-medium rounded-none hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-black"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Featured Work
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Explore our diverse portfolio spanning landscapes, portraits, events, and commercial photography projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className="group overflow-hidden"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <a 
                  href={project.comingSoon ? "#" : project.href}
                  className="block relative overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 
                          className="text-2xl font-bold text-white mb-2"
                          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                        >
                          {project.title}
                        </h3>
                        <p 
                          className="text-sm text-gray-300"
                          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                        >
                          {project.category}
                        </p>
                      </div>
                    </div>

                    {/* Coming Soon Badge */}
                    {project.comingSoon && (
                      <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-medium">
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="py-4 border-b border-gray-200 group-hover:border-black transition-colors">
                    <h3 
                      className="text-lg font-semibold text-black mb-1"
                      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-sm text-gray-500"
                      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      {project.category}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-black"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            About the Work
          </h2>
          <p 
            className="text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Each photograph in this portfolio represents a unique story, a frozen moment in time that speaks to the beauty and complexity of the world around us. From the natural landscapes of Jamaica to intimate human connections, our work aims to capture the essence of every subject with authenticity and artistic vision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <h3 
                className="text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                100+
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Projects Completed
              </p>
            </div>
            <div className="text-center">
              <h3 
                className="text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                50+
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Happy Clients
              </p>
            </div>
            <div className="text-center">
              <h3 
                className="text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                5+
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Let's Create
            <br />
            Something Beautiful
          </h2>
          <p 
            className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Have a project in mind? Let's collaborate to bring your vision to life through the art of photography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:photo@alden.com"
              className="px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Start a Project
            </a>
            <a 
              href="/services"
              className="px-8 py-4 border border-white text-white font-medium rounded-none hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
