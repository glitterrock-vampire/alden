import { useEffect, useRef } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { ExternalLink } from 'lucide-react';

const FARM_PRODUCTS = [
  {
    name: "Free-Range Eggs",
    description: "Fresh eggs from pasture-raised chickens",
    price: "$8/dozen",
    category: "eggs",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/eggs"
  },
  {
    name: "Pasture-Raised Chicken",
    description: "Premium quality chicken meat",
    price: "$15/lb",
    category: "meat",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/chicken"
  },
  {
    name: "Tower Garden Kit",
    description: "Complete vertical farming system",
    price: "$129",
    category: "supplies",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/tower-garden"
  },
  {
    name: "Weekly Produce Box",
    description: "Seasonal vegetables and fruits",
    price: "$25/box",
    category: "produce",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/produce-box"
  },
  {
    name: "Farm Supplies Bundle",
    description: "Essential farming tools and seeds",
    price: "$45",
    category: "supplies",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/supplies"
  },
  {
    name: "Organic Compost",
    description: "Nutrient-rich compost for gardens",
    price: "$12/bag",
    category: "supplies",
    inStock: true,
    affiliateLink: "https://agrotonomy.com/compost"
  }
];

const DELIVERY_ZONES = [
  { area: "Kingston & St. Andrew", fee: "Free", days: "Tuesday & Friday" },
  { area: "St. Catherine", fee: "$5", days: "Wednesday & Saturday" },
  { area: "Portmore", fee: "$3", days: "Tuesday & Friday" },
  { area: "Other Areas", fee: "Contact for pricing", days: "Custom schedule" }
];

export default function FarmPage() {
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

  const heroLetters = ['F', 'A', 'R', 'M'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-green-600/70 z-[1]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] flex flex-col justify-center items-center gap-5 p-10 w-full">
          <div className="flex gap-3 justify-center">
            {heroLetters.map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                style={{
                  fontFamily: 'Koulen, cursive',
                  fontSize: 'clamp(120px, 20vw, 670px)',
                  lineHeight: '0.7',
                  color: '#1b5e20',
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

      {/* Farm Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3.75rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>ALDEN FARM</h2>
          <p className="text-[11px] tracking-[0.3em] text-green-500 uppercase mb-5">Whole Foods · Chicken · Eggs · Supplies</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Fresh from farm to Kingston. Partnering with Agrotonomy for sustainable local produce and farm supplies. Supporting local agriculture and bringing quality products to your table.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {FARM_PRODUCTS.map((product, index) => (
              <div
                key={product.name}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-green-500/10 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(76,175,80,0.2)]"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                <div className="text-xs tracking-wider uppercase text-green-300/80 mb-4" style={{ fontFamily: 'Roboto Mono, monospace' }}>{product.category}</div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{product.name}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>{product.description}</p>
                <div className="text-3xl text-green-400 mb-4" style={{ fontFamily: 'Koulen, cursive' }}>{product.price}</div>
                <div className="mb-6">
                  <span className="text-sm text-green-400" style={{ fontFamily: 'Roboto Mono, monospace' }}>In Stock</span>
                </div>
                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                >
                  Shop Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Delivery & Pickup</h2>
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-10">
            {DELIVERY_ZONES.map((zone, index) => (
              <div 
                key={zone.area}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>{zone.area}</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Delivery Fee:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: '#4ade80', fontWeight: '600' }}>{zone.fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Delivery Days:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: '#4ade80', fontWeight: '600' }}>{zone.days}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center p-8 bg-white/[0.02] border border-white/10 rounded-xl">
            <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
              <strong className="text-foreground">Affiliate Partnership:</strong> Orders are fulfilled through our partner Agrotonomy. Your purchase supports local Jamaican farmers and sustainable agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Our Partnership with Agrotonomy</h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="text-base text-muted-foreground leading-relaxed space-y-5" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              <p>ALDEN FARM partners with Agrotonomy to bring you the freshest local produce and farm supplies. Together, we support sustainable agriculture and provide Kingston residents with access to quality, farm-fresh products.</p>
              <p>Through this partnership, we ensure that every product meets the highest standards of quality and freshness, while supporting local farmers and promoting food security in Jamaica.</p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { icon: 'F', title: 'Fresh Products', desc: 'Daily harvest and delivery' },
                { icon: 'L', title: 'Local Support', desc: 'Supporting Jamaican farmers' },
                { icon: 'S', title: 'Sustainable', desc: 'Eco-friendly farming practices' }
              ].map((benefit) => (
                <div key={benefit.title} className="flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-4xl text-green-500/80" style={{ fontFamily: 'Koulen, cursive' }}>{benefit.icon}</span>
                  <div>
                    <h4 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.125rem', marginBottom: '0.25rem', color: 'hsl(var(--foreground))' }}>{benefit.title}</h4>
                    <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Ready to Order Fresh Produce?</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>Support local farmers and enjoy farm-fresh quality</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#products" className="py-4 px-8 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Shop Products
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
