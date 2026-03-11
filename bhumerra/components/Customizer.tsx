
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Leaf, Upload, ShieldCheck, ArrowLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../App';

export const Customizer: React.FC<{ 
  product: Product, 
  onBack: () => void, 
  onAddToCart: (item: CartItem) => void 
}> = ({ product, onBack, onAddToCart }) => {
  const [selectedTexture, setSelectedTexture] = useState(product.textures?.[0] || '');
  const [selectedEmbossing, setSelectedEmbossing] = useState(product.embossing?.[0] || '');
  const [quantity, setQuantity] = useState(product.pricingTiers[0].minQuantity);
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const pricing = useMemo(() => {
    const sortedTiers = [...product.pricingTiers].sort((a, b) => b.minQuantity - a.minQuantity);
    const tier = sortedTiers.find(t => quantity >= t.minQuantity) || product.pricingTiers[0];
    let unitPrice = tier.pricePerUnit;
    if (selectedTexture) unitPrice += 5.0;
    if (selectedEmbossing) unitPrice += 8.0;

    return {
      unitPrice,
      total: unitPrice * quantity,
      tierName: tier.label
    };
  }, [quantity, product.pricingTiers, selectedTexture, selectedEmbossing]);

  const handleAdd = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      product,
      quantity,
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.total,
      options: {
        texture: selectedTexture,
        embossing: selectedEmbossing,
        logo
      }
    });
  };

  return (
    <div className="min-h-screen bg-soft-white pt-32 pb-24 px-8 md:px-24 animate-in fade-in transform-gpu relative">
      <div className="max-w-[1400px] mx-auto">
        <button 
          onClick={onBack} 
          className="text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-luxury-black flex items-center gap-3 mb-16 font-bold transition-all"
        >
          <ArrowLeft size={14} /> Back to Archive
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="relative aspect-square rounded-[3rem] bg-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center p-16 transform-gpu group">
              <img 
                src={product.image} 
                className="w-full h-full object-contain transition-transform duration-[2s] group-hover:scale-105"
                alt=""
              />
              {logo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu animate-in zoom-in">
                  <img src={logo} className="w-48 h-48 object-contain opacity-60 grayscale mix-blend-multiply rotate-[-2deg]" alt="" />
                </div>
              )}
              <div className="absolute bottom-8 right-8">
                 <div className="bg-luxury-black/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-soft-white flex items-center gap-6">
                   <div className="text-center">
                     <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Eco Score</p>
                     <p className="text-2xl font-serif text-champagne-gold">{product.ecoScore}</p>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10" />
                   <div className="text-center">
                     <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Tier</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest">{product.tier}</p>
                   </div>
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(product.impactMetrics).map(([key, value]) => (
                <div key={key} className="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm">
                  <p className="text-[8px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-serif text-xl">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <p className="text-champagne-gold text-[10px] uppercase tracking-[0.6em] mb-4 font-bold">{product.category} atelier</p>
              <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-none">{product.name}</h1>
              <p className="text-gray-500 text-lg leading-relaxed font-light">{product.description}</p>
            </div>

            <div className="space-y-10">
              {product.textures && (
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Material Texture</h4>
                  <div className="flex gap-3 flex-wrap">
                    {product.textures.map(texture => (
                      <button 
                        key={texture} 
                        onClick={() => setSelectedTexture(texture)} 
                        className={`px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold border transition-all ${selectedTexture === texture ? 'bg-luxury-black text-soft-white' : 'bg-white text-gray-400 border-gray-100'}`}
                      >
                        {texture}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Brand Identification</h4>
                <label className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl cursor-pointer hover:border-champagne-gold transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <Upload size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Upload Identity</p>
                      <p className="text-[10px] text-gray-400">SVG, PNG or AI Vector</p>
                    </div>
                  </div>
                  <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                </label>
              </div>

              <div className="bg-luxury-black p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden transform-gpu border border-white/5">
                <div className="relative z-10 space-y-10 text-soft-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">Precision Unit Quote</p>
                      <p className="text-5xl font-serif">₹{pricing.unitPrice.toFixed(2)}</p>
                    </div>
                    <div className="bg-champagne-gold/10 text-champagne-gold px-6 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold">{pricing.tierName}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                      <span>Batch Quantity</span>
                      <span className="text-soft-white">{quantity.toLocaleString()} UNITS</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setQuantity(q => Math.max(product.pricingTiers[0].minQuantity, q - 10))} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-champagne-gold hover:text-luxury-black transition-all"><Minus size={20} /></button>
                      <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(product.pricingTiers[0].minQuantity, Number(e.target.value)))}
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-2xl font-serif text-soft-white text-center"
                      />
                      <button onClick={() => setQuantity(q => q + 10)} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-champagne-gold hover:text-luxury-black transition-all"><Plus size={20} /></button>
                    </div>
                  </div>
                  <Button onClick={handleAdd} size="lg" fullWidth className="h-20 rounded-[2rem] bg-soft-white text-luxury-black hover:bg-champagne-gold font-bold">
                    Add to Project Batch <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <div className="flex items-center justify-center gap-4 opacity-30 mt-4">
                    <ShieldCheck size={14} />
                    <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Secure Wholesale Protocol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
