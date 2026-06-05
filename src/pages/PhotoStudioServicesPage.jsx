import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';

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
    icon: "👤",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    ]
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
    icon: "✓",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481e3d46e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop"
    ]
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
    icon: "🏔",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed316?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop"
    ]
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
    icon: "📦",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Architecture",
    description: "Architectural photography that highlights design details, spatial relationships, and building aesthetics.",
    features: [
      "Interior Design",
      "Exterior Shots",
      "Real Estate",
      "Construction Progress"
    ],
    icon: "🏛",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop"
    ]
  },
  {
    title: "Commercial",
    description: "Commercial photography for advertising, marketing campaigns, and brand storytelling.",
    features: [
      "Brand Campaigns",
      "Advertising",
      "Social Media Content",
      "Print Media"
    ],
    icon: "💼",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop"
    ]
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
    icon: "🎨",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop"
    ]
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
    icon: "🎭",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop"
    ]
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
    icon: "📅",
    images: [
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
    ]
  }
];

export default function PhotoStudioServicesPage() {
  const serviceRefs = useRef([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-12 pt-20 md:pt-0 bg-black text-white">
        <div className="max-w-4xl text-center">
          <div className="mb-8 md:mb-12">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              ALDEN
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-400 mb-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Technology
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-400 mb-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Innovation
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-400" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Design
            </div>
          </div>
          <p 
            className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Professional photography services that capture moments, tell stories, and create lasting impressions through the art of visual storytelling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a 
              href="/portfolio"
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-medium rounded-none hover:bg-gray-100 transition-colors text-sm md:text-base"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              View Portfolio
            </a>
            <a 
              href="#services"
              className="px-6 md:px-8 py-3 md:py-4 border border-white text-white font-medium rounded-none hover:bg-white hover:text-black transition-colors text-sm md:text-base"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-black"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              What We Do
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              From intimate portraits to grand architectural projects, we bring your vision to life with professional photography services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PHOTO_STUDIO_SERVICES.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => (serviceRefs.current[index] = el)}
                className="group"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div 
                  className="border-b border-gray-200 pb-8 group-hover:border-black transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedService(service);
                    setIsModalOpen(true);
                  }}
                >
                  {/* Icon */}
                  <div className="text-4xl mb-6">{service.icon}</div>
                  
                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold mb-4 text-black"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-gray-600 mb-6 leading-relaxed"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="text-sm text-gray-500 flex items-center"
                        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        <span className="w-1 h-1 bg-black rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-12 text-black"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Our Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-4">01</div>
              <h3 
                className="text-xl font-semibold mb-3 text-black"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Consultation
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                We discuss your vision, goals, and requirements to understand exactly what you need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-4">02</div>
              <h3 
                className="text-xl font-semibold mb-3 text-black"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Creation
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Our team captures stunning images that bring your vision to life with artistic excellence.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-4">03</div>
              <h3 
                className="text-xl font-semibold mb-3 text-black"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Delivery
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Professional editing and delivery of high-quality images ready for your use.
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
            Let's Create Something
            <br />
            Beautiful Together
          </h2>
          <p 
            className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Ready to bring your vision to life? Get in touch to discuss your photography project and let us help you tell your story through stunning images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:photo@alden.com"
              className="px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Get in Touch
            </a>
            <a 
              href="/portfolio"
              className="px-8 py-4 border border-white text-white font-medium rounded-none hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Mosaic Modal */}
      {isModalOpen && selectedService && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <div 
            className="min-h-screen px-4 py-12 md:py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  {selectedService.title}
                </h2>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  className="text-white text-4xl hover:text-gray-300 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Mosaic Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                {selectedService.images.map((image, index) => {
                  const isLarge = index === 0;
                  const isWide = index === 1;
                  const isTall = index === 2;
                  
                  return (
                    <div 
                      key={index}
                      className={`relative overflow-hidden bg-gray-800 ${
                        isLarge ? 'col-span-2 row-span-2' : ''
                      } ${
                        isWide ? 'col-span-2' : ''
                      } ${
                        isTall ? 'row-span-2' : ''
                      }`}
                      style={{ aspectRatio: isLarge || isTall ? '1' : '1' }}
                    >
                      <img
                        src={image}
                        alt={`${selectedService.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => console.error('Image failed to load:', image, e)}
                        onLoad={() => console.log('Image loaded successfully:', image)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div className="mt-12 text-center">
                <p 
                  className="text-gray-300 max-w-2xl mx-auto"
                  style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  {selectedService.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}
