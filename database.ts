
import { Product, User, CompanyInfo } from './types';

const API_URL = 'http://localhost:5000/api';

export class Database {
  static async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async saveProducts(products: Product[]) {
    try {
      await fetch(`${API_URL}/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products)
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getCategories(): Promise<Record<string, string[]>> {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  static async saveCategories(categories: Record<string, string[]>) {
    try {
      await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories)
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async saveUsers(users: User[]) {
    try {
      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users)
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getStoreName(): Promise<string> {
    try {
      const res = await fetch(`${API_URL}/info`);
      if (!res.ok) throw new Error('Failed to fetch info');
      const data = await res.json();
      return data.settings.storeName;
    } catch (e) {
      console.error(e);
      return "AR SURGICAL HUB";
    }
  }

  static async saveStoreName(name: string) {
    try {
      await fetch(`${API_URL}/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { storeName: name } })
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getLogoUrl(): Promise<string | null> {
    try {
      const res = await fetch(`${API_URL}/info`);
      if (!res.ok) throw new Error('Failed to fetch info');
      const data = await res.json();
      return data.settings.logoUrl;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async saveLogoUrl(url: string | null) {
    try {
      await fetch(`${API_URL}/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { logoUrl: url } })
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getBannerText(): Promise<string> {
    try {
      const res = await fetch(`${API_URL}/info`);
      if (!res.ok) throw new Error('Failed to fetch info');
      const data = await res.json();
      return data.settings.bannerText;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  static async saveBannerText(text: string) {
    try {
      await fetch(`${API_URL}/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { bannerText: text } })
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getCompanyInfo(): Promise<CompanyInfo> {
    try {
      const res = await fetch(`${API_URL}/info`);
      if (!res.ok) throw new Error('Failed to fetch info');
      const data = await res.json();
      return data.companyInfo;
    } catch (e) {
      console.error(e);
      return {
        address: "123 Healthcare Plaza, Colombo 07, Sri Lanka",
        phone: "+94 11 234 5678",
        email: "contact@arsurgical.lk",
        regNo: "PV-123456",
        description: "AR Surgical Hub",
        workingHours: "Mon - Sat: 8:00 AM - 6:00 PM"
      };
    }
  }

  static async saveCompanyInfo(info: CompanyInfo) {
    try {
      await fetch(`${API_URL}/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyInfo: info })
      });
    } catch (e) {
      console.error(e);
    }
  }
}
