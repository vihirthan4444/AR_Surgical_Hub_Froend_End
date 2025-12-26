
import { Product, NavItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'METZENBAUM SCISSORS 18CM',
    category: 'Scissors',
    subcategory: 'Metzenbaum',
    price: 129.99,
    originalPrice: 150.00,
    discount: '-13%',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    views: 124,
  },
  {
    id: '2',
    name: 'ADSON FORCEPS 1X2 TEETH',
    category: 'Forceps',
    subcategory: 'Adson',
    price: 75.50,
    image: 'https://images.unsplash.com/photo-1579154235602-3c2cfa99595a?auto=format&fit=crop&q=80&w=600',
    views: 230,
  },
  {
    id: '3',
    name: 'YANKAUER SUCTION TUBE',
    category: 'Suction Tubes',
    subcategory: 'Standard',
    price: 45.00,
    originalPrice: 55.00,
    discount: '-18%',
    image: 'https://images.unsplash.com/photo-1581594658553-3591113c013a?auto=format&fit=crop&q=80&w=600',
    views: 89,
  },
  {
    id: '4',
    name: 'MAYO HEGAR NEEDLE HOLDER',
    category: 'Needle Holders',
    subcategory: 'Mayo-Hegar',
    price: 95.25,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446f21?auto=format&fit=crop&q=80&w=600',
    views: 312,
  },
  {
    id: '5',
    name: 'SCALPEL HANDLE #3',
    category: 'Handles',
    subcategory: 'Scalpel Handles',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    views: 542,
  },
  {
    id: '6',
    name: 'OPERATING SCISSORS STR S/B',
    category: 'Scissors',
    subcategory: 'Operating',
    price: 34.50,
    originalPrice: 40.00,
    discount: '-14%',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600',
    views: 110,
  },
  {
    id: '7',
    name: 'KELLY FORCEPS CURVED 14CM',
    category: 'Forceps',
    subcategory: 'Kelly',
    price: 58.00,
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f43aa2b?auto=format&fit=crop&q=80&w=600',
    views: 156,
  },
  {
    id: '8',
    name: 'IRIS SCISSORS STR 11.5CM',
    category: 'Scissors',
    subcategory: 'Iris',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
    views: 92,
  }
];

export const CATEGORIES_MAP: Record<string, string[]> = {
  'Scissors': ['Metzenbaum', 'Mayo', 'Iris', 'Operating', 'Lister Bandage'],
  'Forceps': ['Adson', 'Kelly', 'Mosquito', 'Iris', 'Tissue'],
  'Needle Holders': ['Mayo-Hegar', 'Castroviejo', 'Mathieu'],
  'Suction Tubes': ['Yankauer', 'Frazier', 'Poole'],
  'Handles': ['Scalpel Handles', 'Blade Removers']
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#' },
  { 
    label: 'OUR PRODUCTS', 
    href: '#',
    children: [
      { label: 'Surgical Instruments', href: '#' },
      { label: 'General Equipment', href: '#' },
      { label: 'Specialized Instruments', href: '#' },
    ]
  },
  { label: 'ABOUT US', href: '#' },
  { label: 'OUR SERVICES', href: '#' },
  { label: 'CONTACT US', href: '#' },
  { label: 'AR CAREERS', href: '#' },
];
