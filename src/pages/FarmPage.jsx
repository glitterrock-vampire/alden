import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { ExternalLink, ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

const FARM_PRODUCTS = [
  // PRODUCE - Fresh from our farm
  {
    name: "Free-Range Eggs",
    description: "Fresh eggs from pasture-raised chickens",
    price: "$8/dozen",
    category: "produce",
    inStock: true,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/eggs"
  },
  {
    name: "Pasture-Raised Chicken",
    description: "Premium quality chicken meat",
    price: "$15/lb",
    category: "produce",
    inStock: true,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/chicken"
  },
  {
    name: "Weekly Produce Box",
    description: "Seasonal vegetables and fruits",
    price: "$25/box",
    category: "produce",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/produce-box"
  },
  {
    name: "Fresh Herbs Bundle",
    description: "Basil, thyme, cilantro, scallions",
    price: "$12/bundle",
    category: "produce",
    inStock: true,
    image: "https://images.unsplash.com/photo-1509722747041-616f39c5c5e4?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/herbs"
  },
  {
    name: "Organic Honey",
    description: "Raw local honey from our hives",
    price: "$18/jar",
    category: "produce",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/honey"
  },
  // START YOUR FARM - Equipment & Supplies
  {
    name: "Tower Garden Kit",
    description: "Complete vertical farming system",
    price: "$129",
    category: "equipment",
    inStock: true,
    image: "https://images.unsplash.com/photo-1530836369250-ef8f732797e0?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/tower-garden"
  },
  {
    name: "Seed Starter Kit",
    description: "20 heirloom vegetable seed varieties",
    price: "$35",
    category: "seeds",
    inStock: true,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/seeds"
  },
  {
    name: "Chicken Coop Starter",
    description: "DIY coop kit for 6-8 hens",
    price: "$199",
    category: "equipment",
    inStock: true,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5c3c3a?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/coop"
  },
  {
    name: "Organic Compost",
    description: "Nutrient-rich compost for gardens",
    price: "$12/bag",
    category: "supplies",
    inStock: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/compost"
  },
  {
    name: "Garden Tool Set",
    description: "Essential hand tools and gloves",
    price: "$55",
    category: "tools",
    inStock: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/tools"
  },
  {
    name: "Irrigation System",
    description: "Drip irrigation for 100 sq ft",
    price: "$89",
    category: "equipment",
    inStock: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/irrigation"
  },
  {
    name: "Soil Test Kit",
    description: "Professional pH & nutrient testing",
    price: "$25",
    category: "supplies",
    inStock: true,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/soil-test"
  },
  {
    name: "Compost Bin",
    description: "80-gallon tumbling composter",
    price: "$75",
    category: "equipment",
    inStock: true,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5c3c3a?w=400&h=300&fit=crop",
    affiliateLink: "https://agrotonomy.com/compost-bin"
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Products' },
  { id: 'produce', label: 'Fresh Produce' },
  { id: 'equipment', label: 'Farm Equipment' },
  { id: 'seeds', label: 'Seeds' },
  { id: 'tools', label: 'Tools' },
  { id: 'supplies', label: 'Supplies' }
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const addToCart = (product) => {
    const quantity = quantities[product.name] || 1;
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === product.name 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    setIsCartOpen(true);
  };

  const updateQuantity = (productName, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities({ ...quantities, [productName]: newQuantity });
  };

  const updateCartQuantity = (productName, newQuantity) => {
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.name !== productName));
    } else {
      setCart(cart.map(item => 
        item.name === productName 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (productName) => {
    setCart(cart.filter(item => item.name !== productName));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          const card = /** @type {HTMLElement} */ (entry.target);
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

      {/* Shop Section */}
      <section id="products" className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Farm Shop</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', textAlign: 'center', marginBottom: '2rem' }}>
            Fresh produce from our farm · Supplies to start your own
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                  activeCategory === filter.id
                    ? 'bg-green-500 text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                style={{ fontFamily: 'Roboto Mono, monospace' }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {FARM_PRODUCTS
              .filter(product => activeCategory === 'all' || product.category === activeCategory)
              .map((product, index) => (
              <div
                key={product.name}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-green-500/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(76,175,80,0.3)]"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-900/20 to-black/40">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-20">🌱</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-green-300 text-[10px] tracking-wider uppercase rounded-full border border-green-500/30" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 backdrop-blur-sm text-[10px] tracking-wider uppercase rounded-full border ${
                      product.inStock
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`} style={{ fontFamily: 'Roboto Mono, monospace' }}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>{product.name}</h3>
                  <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', lineHeight: '1.5' }}>{product.description}</p>
                  
                  {/* Price & Quantity Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl text-green-400" style={{ fontFamily: 'Koulen, cursive' }}>{product.price}</div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10">
                      <button
                        onClick={() => updateQuantity(product.name, (quantities[product.name] || 1) - 1)}
                        className="px-3 py-1 text-green-400 hover:bg-white/10 transition-colors rounded-l-lg"
                        disabled={(quantities[product.name] || 1) <= 1}
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-mono text-white min-w-[2rem] text-center">
                        {quantities[product.name] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.name, (quantities[product.name] || 1) + 1)}
                        className="px-3 py-1 text-green-400 hover:bg-white/10 transition-colors rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full py-3 px-4 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                    style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
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

      {/* Cart Button - Fixed Position */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-24 right-6 z-50 bg-white text-black p-3 rounded-full shadow-lg hover:bg-green-400 transition-all flex items-center gap-2"
        style={{ fontFamily: 'Roboto Mono, monospace' }}
      >
        <ShoppingCart className="w-5 h-5" />
        {cartItemCount > 0 && (
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Koulen, cursive' }}>
                Your Cart ({cartItemCount})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.name}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-4"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl">🌱</span>
                        )}
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate" style={{ fontFamily: 'Koulen, cursive' }}>
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                          {item.price}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.name, item.quantity - 1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 bg-white/10 rounded font-mono text-sm min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.name, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span style={{ fontFamily: 'Roboto Mono, monospace' }}>Total</span>
                  <span className="font-bold text-green-400" style={{ fontFamily: 'Koulen, cursive' }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button 
                  className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-green-400 transition-all uppercase tracking-wider"
                  style={{ fontFamily: 'Roboto Mono, monospace' }}
                  onClick={() => alert('Checkout coming soon with CMS integration!')}
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-muted-foreground" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  CMS integration coming soon for inventory management
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
