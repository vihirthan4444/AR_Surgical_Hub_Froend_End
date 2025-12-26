
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  views: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  role: 'Customer' | 'Medical Professional' | 'Admin';
}

export interface CompanyInfo {
  address: string;
  phone: string;
  email: string;
  regNo: string;
  description: string;
  workingHours: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low' | 'Popularity';

export interface FilterState {
  categories: string[];
  subcategories: string[];
  minPrice: number;
  maxPrice: number;
}
