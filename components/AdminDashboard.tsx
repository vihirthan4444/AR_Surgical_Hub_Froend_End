
import React, { useState } from 'react';
import { 
  BarChart3, Package, Users, ShoppingCart as OrdersIcon, Plus, Settings as SettingsIcon, 
  Search, MoreVertical, LayoutDashboard, Trash2, Edit2, X, ArrowLeft, ChevronRight, 
  LogOut, Layers, ShieldCheck, Globe, Menu, Smartphone, ChevronDown, ImageIcon, 
  MapPin, PhoneCall, Mail, FileText, Database as DbIcon
} from 'lucide-react';
import { Product, User, CompanyInfo } from '../types';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categoriesMap: Record<string, string[]>;
  setCategoriesMap: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  bannerText: string;
  setBannerText: React.Dispatch<React.SetStateAction<string>>;
  storeName: string;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
  logoUrl: string | null;
  setLogoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  onExit: () => void;
}

type AdminTab = 'Dashboard' | 'Products' | 'Categories' | 'Users' | 'Settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, setProducts, categoriesMap, setCategoriesMap,
  users, setUsers, bannerText, setBannerText,
  storeName, setStoreName, logoUrl, setLogoUrl,
  companyInfo, setCompanyInfo, onExit 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [newSubCatName, setNewSubCatName] = useState<Record<string, string>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const stats = [
    { label: 'Inventory Value', value: `LKR ${products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}`, icon: BarChart3, color: 'bg-blue-600' },
    { label: 'Total Orders', value: '1,284', icon: OrdersIcon, color: 'bg-indigo-600' },
    { label: 'Active Customers', value: users.length.toString(), icon: Users, color: 'bg-purple-600' },
    { label: 'Catalog Size', value: products.length.toString(), icon: Package, color: 'bg-amber-600' },
  ];

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      subcategory: formData.get('subcategory') as string,
      price: parseFloat(formData.get('price') as string),
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1579154235602-3c2cfa99595a?auto=format&fit=crop&q=80&w=600',
      views: editingProduct?.views || 0,
      discount: formData.get('discount') as string || undefined,
    };
    if (editingProduct) setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
    else setProducts(prev => [newProduct, ...prev]);
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleAddCategory = () => {
    if (newCatName && !categoriesMap[newCatName]) {
      setCategoriesMap(prev => ({ ...prev, [newCatName]: [] }));
      setNewCatName('');
    }
  };

  const handleAddSubcategory = (cat: string) => {
    const sub = newSubCatName[cat];
    if (sub && !categoriesMap[cat].includes(sub)) {
      setCategoriesMap(prev => ({ ...prev, [cat]: [...prev[cat], sub] }));
      setNewSubCatName(prev => ({ ...prev, [cat]: '' }));
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-8 border-b border-gray-800/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-2xl overflow-hidden ring-4 ring-red-600/20">
            {logoUrl ? <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" /> : <ShieldCheck size={24} />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-oswald font-bold text-white uppercase tracking-widest leading-none">ADMIN PANEL</span>
            <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> DB ONLINE
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
        {[
          { id: 'Dashboard', icon: LayoutDashboard },
          { id: 'Products', icon: Package },
          { id: 'Categories', icon: Layers },
          { id: 'Users', icon: Users },
          { id: 'Settings', icon: SettingsIcon },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id as AdminTab); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ${
              activeTab === item.id ? 'bg-red-600 text-white shadow-2xl shadow-red-600/30' : 'text-gray-500 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            {item.id}
            {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-800/50">
        <button onClick={onExit} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black text-gray-500 hover:bg-gray-800 hover:text-white transition-all uppercase tracking-widest">
          <ArrowLeft size={18} /> Exit Portal
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen font-sans">
      <aside className="hidden lg:block w-80 bg-gray-900 text-gray-400 flex-shrink-0 sticky top-32 h-[calc(100vh-128px)] overflow-hidden shadow-2xl z-20"><SidebarContent /></aside>
      <main className="flex-grow relative flex flex-col min-w-0">
        <div className="p-8 md:p-14 max-w-7xl mx-auto w-full">
          <div className="mb-14 flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-oswald font-bold text-gray-900 uppercase tracking-tight mb-4">{activeTab}</h1>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Database Persistence: <span className="text-blue-600">CONNECTED</span></p>
            </div>
            {activeTab === 'Products' && (
              <button onClick={() => { setEditingProduct(null); setIsAddingProduct(true); }} className="bg-red-600 text-white px-8 py-5 rounded-[24px] text-xs font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 hover:bg-red-700 active:scale-95 transition-all flex items-center gap-3">
                <Plus size={20} /> Add Item
              </button>
            )}
          </div>

          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50">
                  <div className={`${stat.color} w-16 h-16 rounded-3xl text-white shadow-xl flex items-center justify-center mb-8`}>
                    <stat.icon size={28} />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-oswald font-bold text-gray-900">{stat.value}</h3>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Categories' && (
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 flex gap-6">
                <input 
                  type="text" 
                  value={newCatName} 
                  onChange={(e) => setNewCatName(e.target.value)} 
                  placeholder="New Category Name..." 
                  className="flex-grow px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-red-600/10" 
                />
                <button onClick={handleAddCategory} className="bg-red-600 text-white px-10 rounded-[24px] font-black uppercase tracking-widest text-xs">Create Category</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(categoriesMap).map(([cat, subs]) => (
                  <div key={cat} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-oswald font-bold uppercase tracking-tight">{cat}</h3>
                      <button onClick={() => { if(confirm('Delete?')) { const next = {...categoriesMap}; delete next[cat]; setCategoriesMap(next); } }} className="text-gray-300 hover:text-red-600"><Trash2 size={20} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {subs.map(s => (
                        <span key={s} className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          {s} <button onClick={() => setCategoriesMap(prev => ({...prev, [cat]: prev[cat].filter(x => x !== s)}))}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        placeholder="Add Subtype..." 
                        value={newSubCatName[cat] || ''} 
                        onChange={(e) => setNewSubCatName(prev => ({...prev, [cat]: e.target.value}))} 
                        className="flex-grow bg-gray-50 px-6 py-4 rounded-[20px] outline-none text-xs font-bold" 
                      />
                      <button onClick={() => handleAddSubcategory(cat)} className="bg-gray-900 text-white px-6 rounded-[20px]"><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Products' && (
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-50 overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b">
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                      <th className="px-10 py-6">Image & Name</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6">Database Price</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/20">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <img src={p.image} className="w-20 h-20 rounded-3xl object-cover border shadow-xl" alt="" />
                            <span className="font-bold text-gray-900 text-lg uppercase">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.category}</td>
                        <td className="px-10 py-8 font-black text-gray-900">LKR {p.price.toLocaleString()}</td>
                        <td className="px-10 py-8 text-right space-x-2">
                          <button onClick={() => { setEditingProduct(p); setIsAddingProduct(true); }} className="p-4 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-2xl"><Edit2 size={18} /></button>
                          <button onClick={() => { if(confirm('Delete Product?')) setProducts(prev => prev.filter(x => x.id !== p.id)); }} className="p-4 bg-gray-50 text-gray-400 hover:text-red-600 rounded-2xl"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Users' && (
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-50 overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                      <th className="px-10 py-6">User Profile</th>
                      <th className="px-10 py-6">Role</th>
                      <th className="px-10 py-6 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(u => (
                      <tr key={u.email}>
                        <td className="px-10 py-8">
                          <div className="font-bold text-gray-900 uppercase">{u.name}</div>
                          <div className="text-xs text-gray-400">{u.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${u.role === 'Admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          {u.role !== 'Admin' && (
                            <button onClick={() => setUsers(prev => prev.filter(x => x.email !== u.email))} className="p-4 text-gray-300 hover:text-red-600"><Trash2 size={18} /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
               <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-50">
                  <h3 className="text-2xl font-oswald font-bold uppercase mb-10 flex items-center gap-4"><Globe className="text-blue-600" /> Branding</h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Name</label>
                      <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-black uppercase tracking-widest outline-none border-2 border-transparent focus:border-blue-600/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logo (Image URL)</label>
                      <input type="text" value={logoUrl || ''} onChange={(e) => setLogoUrl(e.target.value || null)} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-blue-600/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Marquee Alert</label>
                      <textarea value={bannerText} onChange={(e) => setBannerText(e.target.value)} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-blue-600/10 min-h-[120px]" />
                    </div>
                  </div>
               </div>

               <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-50">
                  <h3 className="text-2xl font-oswald font-bold uppercase mb-10 flex items-center gap-4"><FileText className="text-red-600" /> Corporate Data</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Address</label>
                      <input value={companyInfo.address} onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-red-600/10" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</label>
                         <input value={companyInfo.phone} onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-red-600/10" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                         <input value={companyInfo.email} onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-red-600/10" />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registration Number</label>
                      <input value={companyInfo.regNo} onChange={(e) => setCompanyInfo({...companyInfo, regNo: e.target.value})} className="w-full px-8 py-5 bg-gray-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-red-600/10" />
                    </div>
                    <div className="pt-6">
                      <div className="p-6 bg-blue-600 text-white rounded-[32px] shadow-xl flex items-center gap-4">
                        <DbIcon size={24} />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Database Sync</p>
                          <p className="text-sm font-bold">Encrypted Local Storage</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {isAddingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsAddingProduct(false)} />
            <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[60px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[90vh]">
              <div className="p-10 bg-gray-900 text-white flex items-center justify-between">
                <h2 className="text-3xl font-oswald font-bold uppercase tracking-widest">{editingProduct ? 'Edit Record' : 'Add Record'}</h2>
                <button onClick={() => setIsAddingProduct(false)} className="p-4 hover:bg-white/10 rounded-full"><X size={32} /></button>
              </div>
              <form onSubmit={handleProductSubmit} className="p-10 md:p-14 space-y-10 overflow-y-auto custom-scrollbar flex-grow bg-white">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Scientific Name</label>
                  <input required name="name" defaultValue={editingProduct?.name} className="w-full px-10 py-6 bg-gray-50 rounded-[32px] font-black text-gray-900 outline-none uppercase tracking-widest border-2 border-transparent focus:border-red-600/10" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Category</label>
                    <select required name="category" defaultValue={editingProduct?.category} className="w-full px-10 py-6 bg-gray-50 rounded-[32px] font-black text-gray-900 outline-none uppercase tracking-widest">
                      {Object.keys(categoriesMap).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Price (LKR)</label>
                    <input required name="price" type="number" defaultValue={editingProduct?.price} className="w-full px-10 py-6 bg-gray-50 rounded-[32px] font-black text-gray-900 outline-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Image URL</label>
                  <input name="image" defaultValue={editingProduct?.image} className="w-full px-10 py-6 bg-gray-50 rounded-[32px] font-bold text-gray-900 outline-none" />
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-black py-8 rounded-[40px] text-xs uppercase tracking-[0.5em] shadow-2xl active:scale-95 transition-all mt-6">Update Master Database</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
