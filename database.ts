
import { Product, User, CompanyInfo } from './types';
import { PRODUCTS, CATEGORIES_MAP } from './constants';

const DB_KEYS = {
  PRODUCTS: 'ar_surgical_products',
  CATEGORIES: 'ar_surgical_categories',
  USERS: 'ar_surgical_users',
  STORE_NAME: 'ar_surgical_store_name',
  LOGO_URL: 'ar_surgical_logo_url',
  BANNER_TEXT: 'ar_surgical_banner_text',
  COMPANY_INFO: 'ar_surgical_company_info',
};

export class Database {
  static getProducts(): Product[] {
    const data = localStorage.getItem(DB_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : PRODUCTS;
  }

  static saveProducts(products: Product[]) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
  }

  static getCategories(): Record<string, string[]> {
    const data = localStorage.getItem(DB_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : CATEGORIES_MAP;
  }

  static saveCategories(categories: Record<string, string[]>) {
    localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  static getUsers(): User[] {
    const data = localStorage.getItem(DB_KEYS.USERS);
    return data ? JSON.parse(data) : [
      { name: 'Dr. Sameera Perera', email: 'sameera@hospital.lk', role: 'Medical Professional' },
      { name: 'Anura de Silva', email: 'anura@email.com', role: 'Customer' },
      { name: 'Administrator', email: 'admin@arsurgical.com', role: 'Admin' }
    ];
  }

  static saveUsers(users: User[]) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  }

  static getStoreName(): string {
    return localStorage.getItem(DB_KEYS.STORE_NAME) || "AR SURGICAL HUB";
  }

  static saveStoreName(name: string) {
    localStorage.setItem(DB_KEYS.STORE_NAME, name);
  }

  static getLogoUrl(): string | null {
    return localStorage.getItem(DB_KEYS.LOGO_URL);
  }

  static saveLogoUrl(url: string | null) {
    if (url) localStorage.setItem(DB_KEYS.LOGO_URL, url);
    else localStorage.removeItem(DB_KEYS.LOGO_URL);
  }

  static getBannerText(): string {
    return localStorage.getItem(DB_KEYS.BANNER_TEXT) || "🎉 Free Health Check Sundays at AR Surgical Hub! Check your Sugar, BP, Weight, Height, BMI & Pulse — absolutely FREE every Sunday from 9:00 AM to 2:00 PM";
  }

  static saveBannerText(text: string) {
    localStorage.setItem(DB_KEYS.BANNER_TEXT, text);
  }

  static getCompanyInfo(): CompanyInfo {
    const data = localStorage.getItem(DB_KEYS.COMPANY_INFO);
    return data ? JSON.parse(data) : {
      address: "123 Healthcare Plaza, Colombo 07, Sri Lanka",
      phone: "+94 11 234 5678",
      email: "contact@arsurgical.lk",
      regNo: "PV-123456",
      description: "AR Surgical Hub is a leading provider of high-precision surgical instruments and medical equipment in Sri Lanka.",
      workingHours: "Mon - Sat: 8:00 AM - 6:00 PM"
    };
  }

  static saveCompanyInfo(info: CompanyInfo) {
    localStorage.setItem(DB_KEYS.COMPANY_INFO, JSON.stringify(info));
  }
}
