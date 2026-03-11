
import { Product, Industry, IndustryTheme } from './types';

export const INDUSTRIES: Industry[] = [
  'Wedding', 
  'Fashion', 
  'Hospitality', 
  'Fine Dining', 
  'Sweet & Festive', 
  'Corporate', 
  'Wellness', 
  'Sports', 
  'Event Planners', 
  'Premium Retail', 
  'E-commerce'
];

export const INDUSTRY_THEMES: Record<Industry, IndustryTheme> = {
  'Wedding': {
    primary: '#1a1a1a',
    accent: '#C5A059',
    bg: '#FCF9F5',
    heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Eternal Elegance',
    storyTitle: 'The Art of the Invitation',
    storyDescription: 'For a day that lasts forever, every tactile detail must resonate with timeless grace.'
  },
  'Fashion': {
    primary: '#000000',
    accent: '#FFFFFF',
    bg: '#F2F2F2',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Haute Couture Utility',
    storyTitle: 'Runway-Ready Presentation',
    storyDescription: 'Minimalist structures meet maximalist impact.'
  },
  'Hospitality': {
    primary: '#2C3E50',
    accent: '#BDC3C7',
    bg: '#F8F9F9',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600',
    tagline: 'The Guest Experience',
    storyTitle: 'Checking into Luxury',
    storyDescription: 'Elevating the stay through thoughtful touchpoints.'
  },
  'Fine Dining': {
    primary: '#2D0909',
    accent: '#D4AF37',
    bg: '#FDFCFB',
    heroImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Culinary Craftsmanship',
    storyTitle: 'A Taste for Detail',
    storyDescription: 'Engineered to preserve both flavor and prestige.'
  },
  'Sweet & Festive': {
    primary: '#4A1C40',
    accent: '#FFD700',
    bg: '#FFF5F8',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Joy in Every Fold',
    storyTitle: 'Celebrations Redefined',
    storyDescription: 'Vibrant, sustainable splendor for the ultimate gift reveal.'
  },
  'Corporate': {
    primary: '#1F2937',
    accent: '#6B7280',
    bg: '#F9FAFB',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Executive Presence',
    storyTitle: 'The Business of Impression',
    storyDescription: 'Sleek systems for high-stakes gifting and events.'
  },
  'Wellness': {
    primary: '#2D4B41',
    accent: '#A8B7B0',
    bg: '#F5F7F6',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Pure Connection',
    storyTitle: 'Conscious Luxury',
    storyDescription: 'Packaging that breathes with stone-textured papers.'
  },
  'Sports': {
    primary: '#0F172A',
    accent: '#38BDF8',
    bg: '#F8FAFC',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Dynamic Endurance',
    storyTitle: 'Performance Packaging',
    storyDescription: 'High-durability mailers for active lifestyles.'
  },
  'Event Planners': {
    primary: '#1a1a1a',
    accent: '#E5E7EB',
    bg: '#FFFFFF',
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600',
    tagline: 'The Grand Occasion',
    storyTitle: 'Memorable Milestones',
    storyDescription: 'Bespoke bundles designed to scale with elegance.'
  },
  'Premium Retail': {
    primary: '#1a1a1a',
    accent: '#D1D5DB',
    bg: '#FAFAFA',
    heroImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80&w=1600',
    tagline: 'Retail Reimagined',
    storyTitle: 'Street-Side Sophistication',
    storyDescription: 'Boutique bags that act as a walking billboard.'
  },
  'E-commerce': {
    primary: '#111827',
    accent: '#10B981',
    bg: '#F9FAFB',
    heroImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=1600',
    tagline: 'The Digital Handshake',
    storyTitle: 'Seamless Unboxing',
    storyDescription: 'Tamper-evident luxury for the digital-first era.'
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Silk Rigid Box',
    category: 'Box',
    tier: 'Signature',
    description: 'A magnetic closure rigid box crafted from GRS certified recycled paper.',
    basePrice: 85.00,
    pricingTiers: [
      { minQuantity: 10, pricePerUnit: 85.00, label: 'Batch Starter' },
      { minQuantity: 100, pricePerUnit: 62.00, label: 'Standard Wholesale' },
      { minQuantity: 500, pricePerUnit: 48.00, label: 'Enterprise Value' }
    ],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    materials: ['Recycled Greyboard', 'Silk Paper'],
    finishes: ['Gold Foil', 'Debossing'],
    textures: ['Matte Silk', 'Linen Grain'],
    embossing: ['Blind Emboss', 'Gold Stamp'],
    ecoScore: 92,
    industries: ['Wedding', 'Fashion', 'Sweet & Festive', 'Corporate'],
    impactMetrics: { co2Saved: '2.4kg', plasticPrevented: '1.2kg', waterSaved: '15L' }
  },
  {
    id: 'p101',
    name: 'Velvet Flocked Keepsake',
    category: 'Box',
    tier: 'Signature',
    description: 'Ultra-luxurious box featuring recycled velvet flocking.',
    basePrice: 125.00,
    pricingTiers: [
      { minQuantity: 10, pricePerUnit: 125.00, label: 'Elite Sample' },
      { minQuantity: 100, pricePerUnit: 98.00, label: 'Boutique Batch' },
      { minQuantity: 500, pricePerUnit: 72.00, label: 'Global Signature' }
    ],
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800',
    materials: ['Recycled Velvet', 'Sustainable Greyboard'],
    finishes: ['Silver Foil', 'Custom Lining'],
    textures: ['Velvet Soft-Touch', 'Deep Suede'],
    embossing: ['Intaglio', 'Silver Foil Stamp'],
    isLimitedEdition: true,
    designerName: 'Aura Atelier',
    ecoScore: 88,
    industries: ['Wedding', 'Fashion', 'Hospitality'],
    impactMetrics: { co2Saved: '1.9kg', plasticPrevented: '0.8kg', waterSaved: '12L' }
  },
  {
    id: 'p2',
    name: 'Luxe Kraft Boutique Bag',
    category: 'Bag',
    tier: 'Eco',
    description: 'Heavy-duty 300gsm FSC kraft paper with hand-tied cotton handles.',
    basePrice: 16.00,
    pricingTiers: [
      { minQuantity: 50, pricePerUnit: 16.00, label: 'Trial Bundle' },
      { minQuantity: 250, pricePerUnit: 9.50, label: 'Retail Scale' },
      { minQuantity: 1000, pricePerUnit: 6.20, label: 'Global Bulk' }
    ],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    materials: ['FSC Kraft Paper', 'Organic Cotton'],
    finishes: ['Soy Ink Printing'],
    ecoScore: 98,
    industries: ['Fashion', 'Premium Retail', 'E-commerce', 'Wellness'],
    impactMetrics: { co2Saved: '0.8kg', plasticPrevented: '0.5kg', waterSaved: '4L' }
  },
  {
    id: 'p102',
    name: 'Artisan Pearl Tote',
    category: 'Bag',
    tier: 'Signature',
    description: 'Pearlescent eco-paper bag with an iridescent finish.',
    basePrice: 42.00,
    pricingTiers: [
      { minQuantity: 50, pricePerUnit: 42.00, label: 'Luxe Batch' },
      { minQuantity: 250, pricePerUnit: 32.00, label: 'Signature Retail' },
      { minQuantity: 1000, pricePerUnit: 24.00, label: 'Global Prestige' }
    ],
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800',
    materials: ['Pearlized Eco-Paper', 'Silk Handles'],
    finishes: ['Holographic Foil', 'Spot UV'],
    textures: ['Pebbled Pearl', 'Satin Smooth'],
    designerName: 'S. Kapoor x PackAura',
    ecoScore: 91,
    industries: ['Fashion', 'Premium Retail', 'Event Planners'],
    impactMetrics: { co2Saved: '0.5kg', plasticPrevented: '0.2kg', waterSaved: '6L' }
  },
  {
    id: 'p103',
    name: 'Marble Motif Rigid Box',
    category: 'Box',
    tier: 'Signature',
    description: 'Artist collaboration featuring digital marble textures on stone paper.',
    basePrice: 155.00,
    isComingSoon: true,
    pricingTiers: [
      { minQuantity: 20, pricePerUnit: 155.00, label: 'Drop Priority' }
    ],
    image: 'https://images.unsplash.com/photo-1605266819164-72337bd4b228?auto=format&fit=crop&q=80&w=800',
    materials: ['Stone Paper', 'Magnetic Inlays'],
    finishes: ['Rose Gold Foil'],
    textures: ['Raw Marble', 'Polished Stone'],
    ecoScore: 95,
    industries: ['Hospitality', 'Fine Dining', 'Wellness'],
    impactMetrics: { co2Saved: '2.5kg', plasticPrevented: '1.5kg', waterSaved: '30L' }
  },
  {
    id: 'p3',
    name: 'Mineral Textured Soap Box',
    category: 'Box',
    tier: 'Eco',
    description: 'Tuck-top box made from stone paper, waterproof and luxuriously weighted.',
    basePrice: 12.00,
    pricingTiers: [
      { minQuantity: 100, pricePerUnit: 12.00, label: 'Essential' },
      { minQuantity: 500, pricePerUnit: 7.50, label: 'Wholesale' },
      { minQuantity: 2000, pricePerUnit: 4.80, label: 'Industrial' }
    ],
    image: 'https://images.unsplash.com/photo-1605266819164-72337bd4b228?auto=format&fit=crop&q=80&w=800',
    materials: ['Stone Paper'],
    finishes: ['Blind Embossing'],
    ecoScore: 100,
    industries: ['Wellness', 'Hospitality'],
    impactMetrics: { co2Saved: '1.2kg', plasticPrevented: '0.9kg', waterSaved: '22L' }
  },
  {
    id: 'p4',
    name: 'Boutique Paper Carry Bag',
    category: 'Bag',
    tier: 'Eco',
    description: 'Elegant white eco-paper bag with grosgrain ribbon handles.',
    basePrice: 15.00,
    pricingTiers: [
      { minQuantity: 100, pricePerUnit: 15.00, label: 'Small Batch' },
      { minQuantity: 500, pricePerUnit: 9.20, label: 'Retail Standard' },
      { minQuantity: 2500, pricePerUnit: 5.80, label: 'Bulk Saver' }
    ],
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    materials: ['Recycled White Paper', 'Ribbon'],
    finishes: ['Matte Lamination'],
    ecoScore: 94,
    industries: ['Premium Retail', 'Event Planners', 'Wedding'],
    impactMetrics: { co2Saved: '0.6kg', plasticPrevented: '0.4kg', waterSaved: '3L' }
  },
  {
    id: 'p5',
    name: 'Premium Festive Gift Box',
    category: 'Box',
    tier: 'Signature',
    description: 'Handcrafted box with traditional motifs and gold foil.',
    basePrice: 110.00,
    pricingTiers: [
      { minQuantity: 25, pricePerUnit: 110.00, label: 'Festive Mini' },
      { minQuantity: 200, pricePerUnit: 82.00, label: 'Corporate Gifting' },
      { minQuantity: 1000, pricePerUnit: 64.00, label: 'Grand Celebration' }
    ],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    materials: ['Handmade Paper', 'Rigid Board'],
    finishes: ['Foil Stamping', 'UV Varnish'],
    textures: ['Hand-Hammered Paper', 'Natural Jute'],
    ecoScore: 88,
    industries: ['Sweet & Festive', 'Wedding', 'Corporate'],
    impactMetrics: { co2Saved: '1.1kg', plasticPrevented: '0.7kg', waterSaved: '8L' }
  },
  {
    id: 'p6',
    name: 'Eco Corrugated Mailer',
    category: 'Box',
    tier: 'Eco',
    description: 'Secure, lightweight, and branded mailer for direct-to-consumer delivery.',
    basePrice: 9.00,
    pricingTiers: [
      { minQuantity: 200, pricePerUnit: 9.00, label: 'D2C Starter' },
      { minQuantity: 1000, pricePerUnit: 5.80, label: 'D2C Pro' },
      { minQuantity: 5000, pricePerUnit: 3.40, label: 'E-com Titan' }
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    materials: ['Corrugated Cardboard'],
    finishes: ['Flexo Printing'],
    ecoScore: 99,
    industries: ['E-commerce', 'Sports', 'Wellness'],
    impactMetrics: { co2Saved: '3.5kg', plasticPrevented: '2.8kg', waterSaved: '1L' }
  },
  {
    id: 'p7',
    name: 'Luxe Drawer Box',
    category: 'Box',
    tier: 'Signature',
    description: 'Slide-to-open rigid box with a satisfying smooth friction fit.',
    basePrice: 98.00,
    pricingTiers: [
      { minQuantity: 50, pricePerUnit: 98.00, label: 'Premium Entry' },
      { minQuantity: 250, pricePerUnit: 74.00, label: 'Luxury Scale' },
      { minQuantity: 1000, pricePerUnit: 52.00, label: 'Global Signature' }
    ],
    image: 'https://images.unsplash.com/photo-1605266819164-72337bd4b228?auto=format&fit=crop&q=80&w=800',
    materials: ['Coated Board', 'Art Paper'],
    finishes: ['Soft Touch', 'Debossing'],
    textures: ['Brushed Canvas', 'Frosted Matte'],
    ecoScore: 90,
    industries: ['Fashion', 'Wellness', 'Corporate'],
    impactMetrics: { co2Saved: '1.8kg', plasticPrevented: '1.1kg', waterSaved: '10L' }
  },
  {
    id: 'p8',
    name: 'Bio-compostable Pouch',
    category: 'Bag',
    tier: 'Eco',
    description: 'High-barrier film made from plant-based materials.',
    basePrice: 6.50,
    pricingTiers: [
      { minQuantity: 500, pricePerUnit: 6.50, label: 'Eco Batch' },
      { minQuantity: 5000, pricePerUnit: 3.20, label: 'Green Cycle' },
      { minQuantity: 25000, pricePerUnit: 1.65, label: 'Planet Hero' }
    ],
    image: 'https://images.unsplash.com/photo-1526170315873-3a98618bb386?auto=format&fit=crop&q=80&w=800',
    materials: ['Cornstarch PLA'],
    finishes: ['Natural Matte'],
    ecoScore: 100,
    industries: ['Wellness', 'Sports', 'E-commerce'],
    impactMetrics: { co2Saved: '4.2kg', plasticPrevented: '5.0kg', waterSaved: '0L' }
  }
];

export const SYSTEM_INSTRUCTION = `You are "Aura", the elite AI Concierge for Bhumerra. 
Bhumerra is India's leading destination for luxury sustainable packaging at factory-direct wholesale prices.`;
