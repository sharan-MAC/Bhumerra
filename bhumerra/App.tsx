
import React, { useState, useEffect, useMemo } from 'react';
import { Industry, Product, IndustryTheme, Order } from './types';
import { PRODUCTS, INDUSTRIES, INDUSTRY_THEMES } from './constants';
import { Button } from './components/Button';
import { Concierge } from './components/Concierge';
import { Customizer } from './components/Customizer';
import { Checkout } from './components/Checkout';
import { 
  ShoppingBag, 
  Menu, 
  Search, 
  Sparkles, 
  Zap, 
  Leaf,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  X,
  History,
  Briefcase,
  MapPin,
  Package,
  Calendar
} from 'lucide-react';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options: {
    texture?: string;
    embossing?: string;
    logo?: string | null;
  };
}

const App: React.FC = () => {
  const [view, setView] = useState<'onboarding' | 'showroom' | 'customizer' | 'checkout' | 'orders'>('onboarding');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showConcierge, setShowConcierge] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = useMemo((): IndustryTheme => {
    if (!selectedIndustry) return INDUSTRY_THEMES['Fashion'];
    return INDUSTRY_THEMES[selectedIndustry];
  }, [selectedIndustry]);

  const industryProducts = useMemo(() => {
    return !selectedIndustry ? PRODUCTS : PRODUCTS.filter(p => p.industries.includes(selectedIndustry));
  }, [selectedIndustry]);

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.totalPrice, 0), [cart]);

  const handleStartDesign = (industry: Industry) => {
    setSelectedIndustry(industry);
    setView('showroom');
    window.scrollTo(0, 0);
  };

  const openCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setView('customizer');
    window.scrollTo(0, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setShowCartDrawer(true);
    setView('showroom');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const startCheckout = () => {
    setShowCartDrawer(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleCompleteOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setView('showroom');
    window.scrollTo(0, 0);
  };

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-luxury-black text-soft-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none transform-gpu">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-champagne-gold/20 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-6xl w-full">
          <div className="flex items-center justify-center gap-4 mb-12 animate-slide-up opacity-60">
            <div className="w-12 h-[1px] bg-champagne-gold" />
            <h1 className="text-[10px] font-sans tracking-[0.8em] uppercase font-bold text-champagne-gold">Bhumerra</h1>
            <div className="w-12 h-[1px] bg-champagne-gold" />
          </div>
          <h2 className="text-6xl md:text-[9rem] font-serif mb-12 leading-[0.9] tracking-tighter animate-slide-up stagger-1">
            Luxury, <br />
            <span className="italic font-light text-white/40">Sustainably Crafted.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-20 leading-relaxed font-light animate-slide-up stagger-2">
            The global destination for elite sustainable packaging. Custom-engineered for brands that define excellence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 animate-slide-up stagger-3">
            {INDUSTRIES.map(industry => (
              <button 
                key={industry}
                onClick={() => handleStartDesign(industry)}
                className="group relative p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-champagne-gold hover:text-luxury-black transition-all duration-700 transform-gpu text-[10px] uppercase tracking-widest font-bold overflow-hidden"
              >
                <div className="relative z-10">{industry}</div>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-soft-white text-luxury-black transition-colors duration-700">
      {/* Cart Drawer Overlay */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCartDrawer(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-serif text-2xl tracking-tight">Active Projects</h3>
              <button onClick={() => setShowCartDrawer(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-30 italic font-serif">Your archive is empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product.image} className="w-full h-full object-cover grayscale" alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-lg">{item.product.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.quantity} Units @ ₹{item.unitPrice}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                    <div className="font-serif text-lg">₹{item.totalPrice.toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
            <div className="p-8 border-t border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Project Total</p>
                <p className="font-serif text-2xl">₹{cartTotal.toLocaleString()}</p>
              </div>
              <Button fullWidth size="lg" disabled={cart.length === 0} onClick={startCheckout} className="rounded-full shadow-xl">
                Initiate Project Protocol
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'glass-morphism py-4 shadow-2xl' : 'bg-transparent py-10'
      }`}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
             <h1 className="text-2xl font-serif tracking-[0.4em] uppercase cursor-pointer gold-text-shimmer font-bold" onClick={() => setView('onboarding')}>
               Bhumerra
             </h1>
             <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
               <button onClick={() => setView('showroom')} className="hover:opacity-100 transition-opacity">Showroom</button>
               <button onClick={() => setView('orders')} className="hover:opacity-100 transition-opacity flex items-center gap-2">
                 <History size={14} /> Project Ledger
               </button>
             </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative cursor-pointer group" onClick={() => setShowCartDrawer(true)}>
              <ShoppingBag className="w-5 h-5 group-hover:text-champagne-gold transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne-gold text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
            <Button variant="primary" size="sm" onClick={() => setView('orders')} className="hidden sm:flex rounded-full bg-luxury-black hover:bg-champagne-gold hover:text-luxury-black">Ledger</Button>
            <Menu className="w-6 h-6 lg:hidden cursor-pointer" />
          </div>
        </div>
      </nav>

      {view === 'showroom' ? (
        <main className="animate-in fade-in">
          <section className="relative h-[90vh] flex flex-col justify-end pb-32 px-8 md:px-24 overflow-hidden transform-gpu">
             <div className="absolute inset-0">
               <img src={theme.heroImage} className="w-full h-full object-cover scale-105" alt="Collection" />
               <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />
             </div>
             <div className="relative z-10 max-w-5xl animate-slide-up">
               <p className="text-champagne-gold text-xs uppercase tracking-[0.6em] mb-6 font-bold">{selectedIndustry} Collection</p>
               <h1 className="text-7xl md:text-[10rem] font-serif mb-10 leading-[0.85] tracking-tighter text-soft-white transform-gpu">
                 {theme.tagline.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 !== 0 ? 'italic font-light opacity-60' : ''}>{word} </span>
                 ))}
               </h1>
               <div className="flex flex-wrap items-center gap-8">
                  <Button size="lg" onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })} className="bg-soft-white text-luxury-black hover:bg-champagne-gold px-12 rounded-full font-bold">
                    View Archive
                  </Button>
               </div>
             </div>
          </section>

          <section id="inventory" className="py-32 px-8 md:px-24 bg-[#F2F2F2]">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                <div>
                  <h3 className="text-6xl md:text-8xl font-serif tracking-tighter mb-4">Stock Gallery.</h3>
                  <div className="w-32 h-[1px] bg-champagne-gold" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {industryProducts.map(product => (
                  <div key={product.id} className="group cursor-pointer transform-gpu" onClick={() => openCustomizer(product)}>
                    <div className="relative aspect-[4/5] bg-white rounded-[2rem] overflow-hidden mb-8 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] group-hover:-translate-y-4">
                      <img src={product.image} className="w-full h-full object-cover transition-transform duration-[1.5s] grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-90" alt={product.name} />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                        <span className="px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold bg-white/90 backdrop-blur-md text-luxury-black shadow-xl">
                          {product.tier}
                        </span>
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                    <div className="text-left px-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{product.category}</h4>
                        <p className="text-xs font-bold text-champagne-gold tracking-widest uppercase">Start ₹{product.pricingTiers[product.pricingTiers.length - 1].pricePerUnit.toFixed(2)}</p>
                      </div>
                      <h3 className="text-3xl font-serif mb-2 tracking-tight group-hover:text-champagne-gold transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                        <Leaf size={12} className="text-green-600" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Eco Score {product.ecoScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : view === 'customizer' ? (
        <Customizer 
          product={selectedProduct || PRODUCTS[0]} 
          onBack={() => setView('showroom')} 
          onAddToCart={addToCart}
        />
      ) : view === 'checkout' ? (
        <Checkout 
          cart={cart} 
          total={cartTotal} 
          onBack={() => setView('showroom')} 
          onComplete={handleCompleteOrder}
        />
      ) : (
        <div className="min-h-screen pt-40 px-8 md:px-24 pb-32 animate-in fade-in">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-4">Project Ledger.</h1>
                <div className="w-32 h-[1px] bg-champagne-gold" />
              </div>
              <Button variant="outline" onClick={() => setView('showroom')} className="rounded-full">
                Return to Showroom
              </Button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-40 border border-dashed border-gray-200 rounded-[3rem] bg-white/50">
                <Briefcase size={48} className="mx-auto text-gray-200 mb-6" />
                <p className="text-gray-400 italic font-serif text-xl">No authenticated production protocols found.</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-4">Your project history will appear here once initiated.</p>
                <Button onClick={() => setView('showroom')} className="mt-8 rounded-full bg-luxury-black text-soft-white hover:bg-champagne-gold">Explore Archive</Button>
              </div>
            ) : (
              <div className="grid gap-12">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex flex-col lg:flex-row justify-between gap-12">
                      <div className="flex-1 space-y-8">
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-champagne-gold">{order.status}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">{order.date}</span>
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-bold text-gray-300">ID: #{order.id}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-50">
                          <div>
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                              <MapPin size={14} />
                              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Logistic Destination</h4>
                            </div>
                            <div className="text-sm space-y-1 text-gray-600">
                              <p className="font-bold text-luxury-black">{order.shippingAddress.name}</p>
                              <p>{order.shippingAddress.company}</p>
                              <p>{order.shippingAddress.street}</p>
                              <p>{order.shippingAddress.city}</p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                              <Package size={14} />
                              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Project Contents</h4>
                            </div>
                            <div className="space-y-3">
                              {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">{item.product.name}</span>
                                  <span className="font-bold text-luxury-black">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-64 flex flex-col justify-between items-center lg:items-end border-t lg:border-t-0 lg:border-l border-gray-100 pt-12 lg:pt-0 lg:pl-12">
                        <div className="text-center lg:text-right">
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Authenticated Value</p>
                          <p className="text-4xl font-serif font-bold text-luxury-black">₹{order.total.toLocaleString()}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-8 rounded-full group-hover:bg-luxury-black group-hover:text-soft-white transition-all">
                          Download Manifest
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowConcierge(true)}
        className="fixed bottom-12 right-12 z-50 group transform-gpu"
      >
        <div className="relative flex items-center gap-4 bg-luxury-black text-soft-white pl-8 pr-10 py-6 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 transition-all hover:scale-105 active:scale-95 group">
          <Sparkles className="w-5 h-5 text-champagne-gold" />
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold gold-text-shimmer">Aura AI</p>
          </div>
        </div>
      </button>

      {showConcierge && <Concierge onClose={() => setShowConcierge(false)} />}
    </div>
  );
};

export default App;
