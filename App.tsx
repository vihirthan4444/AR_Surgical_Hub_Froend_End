
import React, { useState, useMemo, useEffect } from 'react';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import FloatingChat from './components/FloatingChat';
import FilterSidebar from './components/FilterSidebar';
import AuthModals from './components/AuthModals';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import CompanyModal from './components/CompanyModal';
import ProductDetailModal from './components/ProductDetailModal';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Database } from './database';
import { SortOption, FilterState, User, Product, CartItem, CompanyInfo } from './types';

const App: React.FC = () => {
  // Database States
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string[]>>({});
  const [usersList, setUsersList] = useState<User[]>([]);
  const [storeName, setStoreName] = useState("AR SURGICAL HUB");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bannerText, setBannerText] = useState("");
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    address: "", phone: "", email: "", regNo: "", description: "", workingHours: ""
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'store' | 'admin'>('store');

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    minPrice: 0,
    maxPrice: 1000000
  });

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          fetchedProducts,
          fetchedCategories,
          fetchedUsers,
          fetchedStoreName,
          fetchedLogoUrl,
          fetchedBannerText,
          fetchedCompanyInfo
        ] = await Promise.all([
          Database.getProducts(),
          Database.getCategories(),
          Database.getUsers(),
          Database.getStoreName(),
          Database.getLogoUrl(),
          Database.getBannerText(),
          Database.getCompanyInfo()
        ]);

        setProducts(fetchedProducts);
        setCategoriesMap(fetchedCategories);
        setUsersList(fetchedUsers);
        setStoreName(fetchedStoreName);
        setLogoUrl(fetchedLogoUrl);
        setBannerText(fetchedBannerText);
        setCompanyInfo(fetchedCompanyInfo);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to load initial data", error);
      }
    };
    loadData();
  }, []);

  // Sync with Database Service when states change (only after initial load)
  useEffect(() => { if (isDataLoaded) Database.saveProducts(products); }, [products, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveCategories(categoriesMap); }, [categoriesMap, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveUsers(usersList); }, [usersList, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveStoreName(storeName); }, [storeName, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveLogoUrl(logoUrl); }, [logoUrl, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveBannerText(bannerText); }, [bannerText, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Database.saveCompanyInfo(companyInfo); }, [companyInfo, isDataLoaded]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
      const matchesSubcategory = filters.subcategories.length === 0 || filters.subcategories.includes(p.subcategory);
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    });

    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'Popularity') result.sort((a, b) => b.views - a.views);

    return result;
  }, [searchTerm, sortBy, filters, products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">
      <TopBanner text={bannerText} />
      <Header
        user={user}
        onAuthClick={setAuthModal}
        onLogout={() => { setUser(null); setView('store'); }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => setView('admin')}
        onCompanyClick={() => setIsCompanyModalOpen(true)}
        storeName={storeName}
        logoUrl={logoUrl}
      />

      {view === 'admin' && user?.role === 'Admin' ? (
        <AdminDashboard
          products={products} setProducts={setProducts}
          categoriesMap={categoriesMap} setCategoriesMap={setCategoriesMap}
          users={usersList} setUsers={setUsersList}
          bannerText={bannerText} setBannerText={setBannerText}
          storeName={storeName} setStoreName={setStoreName}
          logoUrl={logoUrl} setLogoUrl={setLogoUrl}
          companyInfo={companyInfo} setCompanyInfo={setCompanyInfo}
          onExit={() => setView('store')}
        />
      ) : (
        <main className="flex-grow flex flex-col">
          <section className="bg-white py-16 border-b">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-5xl lg:text-6xl font-oswald font-bold text-gray-900 mb-6 tracking-tight uppercase">
                {searchTerm ? `SEARCH: ${searchTerm}` : 'OUR PRODUCTS'}
              </h1>
              <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
                Sourcing high-precision instruments for modern surgical procedures.
              </p>
            </div>
          </section>

          <div className="flex flex-grow container mx-auto px-4 lg:px-8 py-10 gap-10">
            <FilterSidebar
              filters={filters} setFilters={setFilters}
              isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}
              categoriesMap={categoriesMap}
            />

            <div className="flex-grow space-y-8">
              <div className="bg-white rounded-[24px] border border-gray-100 p-4 shadow-xl shadow-gray-200/40 flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 ring-blue-500/5 outline-none transition-all text-gray-900 font-bold"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-xs font-black text-gray-700 outline-none uppercase tracking-widest"
                  >
                    <option>Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                  </select>
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden p-4 bg-blue-600 text-white rounded-2xl"
                  >
                    <SlidersHorizontal size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="bg-gray-900 text-gray-500 py-20 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em]">© 2024 {storeName}. All rights reserved.</p>
        </div>
      </footer>

      <AuthModals
        type={authModal} onClose={() => setAuthModal(null)}
        onSuccess={(u) => { setUser(u); setAuthModal(null); }}
        onSwitchType={(t) => setAuthModal(t)}
        storeName={storeName} logoUrl={logoUrl}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} />
      <CompanyModal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} companyInfo={companyInfo} storeName={storeName} logoUrl={logoUrl} />
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}
      <FloatingChat />
    </div>
  );
};

export default App;
