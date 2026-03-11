
export type Industry = 
  | 'Wedding'
  | 'Fashion'
  | 'Hospitality'
  | 'Fine Dining'
  | 'Sweet & Festive'
  | 'Corporate'
  | 'Wellness'
  | 'Sports'
  | 'Event Planners'
  | 'Premium Retail'
  | 'E-commerce';

export interface IndustryTheme {
  primary: string;
  accent: string;
  bg: string;
  heroImage: string;
  tagline: string;
  storyTitle: string;
  storyDescription: string;
}

export interface PricingTier {
  minQuantity: number;
  pricePerUnit: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Bag' | 'Box' | 'Material' | 'Bundle' | 'Accessory';
  tier: 'Eco' | 'Signature';
  description: string;
  basePrice: number;
  pricingTiers: PricingTier[];
  image: string;
  materials: string[];
  finishes: string[];
  textures?: string[];
  embossing?: string[];
  isLimitedEdition?: boolean;
  isComingSoon?: boolean;
  designerName?: string;
  ecoScore: number;
  industries: Industry[];
  impactMetrics: {
    co2Saved: string;
    plasticPrevented: string;
    waterSaved: string;
  };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: any[];
  status: 'In Production' | 'Dispatched' | 'Delivered';
  shippingAddress: {
    name: string;
    company: string;
    street: string;
    city: string;
  };
}
