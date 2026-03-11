
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { CartItem } from '../App';
import { Order } from '../types';
// Fix: Added ShieldCheck to the imports from lucide-react
import { Loader2, Check, FileText, ClipboardCheck, Box, Zap, Calendar, ArrowLeft, CreditCard, MapPin, Building2, User, ShieldCheck } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onComplete: (order: Order) => void;
}

type CheckoutStep = 'summary' | 'protocol' | 'processing' | 'confirmed';

export const Checkout: React.FC<CheckoutProps> = ({ cart, total, onBack, onComplete }) => {
  const [step, setStep] = useState<CheckoutStep>('summary');
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    name: 'Siddharth V.',
    company: 'Vanguard Atelier',
    street: '12-B Highpoint Business Park',
    city: 'Bangalore, KA 560102',
    card: '•••• •••• •••• 9901'
  });

  const loadingSteps = [
    "Authorizing Secure Transaction...",
    "Securing Factory Slots...",
    "Allocating Production Lead...",
    "Encrypting Project Assets..."
  ];

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setLoadingStep(s => {
          if (s >= loadingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setStep('confirmed'), 1000);
            return s;
          }
          return s + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleFinalize = () => {
    const finalOrder: Order = {
      id: Math.floor(Math.random() * 900000 + 100000).toString(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      total,
      items: cart,
      status: 'In Production',
      shippingAddress: {
        name: formData.name,
        company: formData.company,
        street: formData.street,
        city: formData.city
      }
    };
    onComplete(finalOrder);
  };

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center text-soft-white px-8 text-center animate-in fade-in duration-700">
        <div className="relative mb-12">
          <Loader2 className="w-20 h-20 text-champagne-gold animate-spin stroke-[1px]" />
          <div className="absolute inset-0 bg-champagne-gold blur-3xl opacity-20 animate-pulse" />
        </div>
        <h2 className="text-4xl font-serif mb-4 tracking-tight italic">Processing Project Protocol</h2>
        <p className="text-champagne-gold text-[10px] uppercase tracking-[0.6em] font-bold animate-pulse">
          {loadingSteps[loadingStep]}
        </p>
      </div>
    );
  }

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-soft-white pt-40 px-8 flex flex-col items-center">
        <div className="max-w-3xl w-full animate-in slide-in-from-bottom duration-1000">
          <div className="w-20 h-20 bg-champagne-gold rounded-full flex items-center justify-center shadow-xl mb-12">
            <Check className="text-luxury-black w-10 h-10 stroke-[3px]" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter mb-8">Projects <br /><span className="italic text-champagne-gold font-light">Authenticated.</span></h1>
          <p className="text-gray-500 text-xl font-light leading-relaxed mb-16">
            Your production sequence is now active and stored in the <span className="text-luxury-black font-bold">Project Ledger</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
               <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-8">Production Cycle</h4>
               <div className="space-y-6">
                 {[
                   { icon: <ClipboardCheck size={18} />, title: 'Asset Verification', date: 'Next 12h', active: true },
                   { icon: <Box size={18} />, title: 'Fabrication', date: '7-12 Days', active: false },
                   { icon: <Zap size={18} />, title: 'Expedited Logistics', date: 'International', active: false }
                 ].map((s, i) => (
                   <div key={i} className={`flex items-center gap-6 ${s.active ? 'opacity-100' : 'opacity-20'}`}>
                     <div className="p-3 bg-gray-50 rounded-xl">{s.icon}</div>
                     <div><p className="text-[10px] font-bold uppercase">{s.title}</p><p className="text-[10px] text-gray-400">{s.date}</p></div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="p-10 bg-luxury-black text-soft-white rounded-[2.5rem] flex flex-col justify-between">
               <div>
                 <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 mb-8">Consolidated Brief</h4>
                 <div className="space-y-4 font-serif">
                   <div className="flex justify-between"><span>Batch Volume</span><span>{cart.reduce((a,b)=>a+b.quantity,0).toLocaleString()} Units</span></div>
                   <div className="flex justify-between text-2xl text-champagne-gold"><span>Final</span><span>₹{total.toLocaleString()}</span></div>
                 </div>
               </div>
               <Button onClick={handleFinalize} fullWidth className="mt-12 bg-soft-white text-luxury-black rounded-full h-16 font-bold">Ledger Integration</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white pt-40 px-8 pb-32">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-12 hover:text-luxury-black transition-all"><ArrowLeft size={14}/> Return to Atelier</button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <h1 className="text-6xl font-serif">Project Review.</h1>
            
            {step === 'summary' ? (
              <div className="space-y-8 animate-in fade-in">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-8 p-10 bg-white rounded-[2.5rem] border border-gray-100 items-center hover:shadow-xl transition-all group">
                    <div className="w-24 h-28 bg-gray-50 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform"><img src={item.product.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-champagne-gold">{item.product.tier}</span>
                      </div>
                      <h3 className="text-3xl font-serif mb-1">{item.product.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose">{item.options.texture} Finish • {item.options.embossing} • {item.quantity} Units</p>
                    </div>
                    <div className="text-3xl font-serif text-right shrink-0">₹{item.totalPrice.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 bg-white rounded-[3rem] border border-gray-100 space-y-10">
                       <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300">Logistic Destination</h4>
                       <div className="space-y-6">
                          <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                            <User size={18} className="text-champagne-gold" />
                            <input value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="bg-transparent text-sm w-full outline-none font-bold" />
                          </div>
                          <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                            <Building2 size={18} className="text-champagne-gold" />
                            <input value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} className="bg-transparent text-sm w-full outline-none" />
                          </div>
                          <div className="flex items-center gap-4">
                            <MapPin size={18} className="text-champagne-gold" />
                            <textarea value={formData.street} onChange={e=>setFormData({...formData, street: e.target.value})} className="bg-transparent text-sm w-full outline-none resize-none h-16" />
                          </div>
                       </div>
                    </div>
                    <div className="p-10 bg-white rounded-[3rem] border border-gray-100 space-y-10">
                       <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300">Financial Authorization</h4>
                       <div className="space-y-6">
                          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                             <CreditCard size={24} className="text-luxury-black" />
                             <div className="flex-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold">Standard Corporate Card</p>
                                <p className="text-sm font-serif">{formData.card}</p>
                             </div>
                             <span className="text-[8px] uppercase tracking-widest font-bold text-green-600">Active</span>
                          </div>
                          <p className="text-[10px] text-gray-400 leading-relaxed italic">
                             Wholesale transactions are subject to 48-hour protocol validation before production cycle initiation.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-luxury-black text-soft-white p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] space-y-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                 {/* Fix: Component ShieldCheck now correctly imported */}
                 <ShieldCheck size={120} />
              </div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 relative z-10">Consolidated Brief</h4>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold"><span>Consolidated Value</span><span>₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold"><span>Logistics & Handling</span><span className="text-champagne-gold italic font-light">Authenticated</span></div>
                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">Production Cap</span>
                  <span className="text-4xl font-serif text-champagne-gold">₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              {step === 'summary' ? (
                <Button onClick={() => setStep('protocol')} fullWidth size="lg" className="rounded-full bg-soft-white text-luxury-black font-bold h-20 relative z-10">
                  Authenticate Protocol
                </Button>
              ) : (
                <Button onClick={() => setStep('processing')} fullWidth size="lg" className="rounded-full bg-champagne-gold text-luxury-black font-bold h-20 relative z-10">
                  Execute Production Line
                </Button>
              )}
              
              <div className="flex items-center justify-center gap-4 opacity-30 relative z-10">
                 {/* Fix: Component ShieldCheck now correctly imported */}
                 <ShieldCheck size={14} />
                 <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Bhumerra Encryption Standard</span>
              </div>
            </div>
            
            {step === 'protocol' && (
              <button onClick={() => setStep('summary')} className="w-full text-center text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-luxury-black transition-colors">
                Modify Brief Archive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
