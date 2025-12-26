
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User as UserIcon, ChevronDown, Menu, X, FileText, LogOut, Settings, ShieldAlert, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onAuthClick: (type: 'login' | 'register') => void;
  onLogout: () => void;
  cartCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  onCompanyClick: () => void;
  storeName: string;
  logoUrl: string | null;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onAuthClick, 
  onLogout, 
  cartCount, 
  onCartClick, 
  onAdminClick,
  onCompanyClick,
  storeName,
  logoUrl
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-[36px] z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-oswald font-bold text-gray-800 tracking-tight leading-none uppercase">{storeName}</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold mt-1">Excellence in Precision</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.label} 
                  className="relative group py-4"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={item.href} 
                    className={`text-sm font-bold transition-colors hover:text-blue-600 flex items-center gap-1.5 ${item.label === 'Our Products' ? 'bg-blue-50 text-blue-700 px-4 py-2 rounded-full' : 'text-gray-600'}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} />}
                  </a>

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => (
                        <a 
                          key={child.label}
                          href={child.href} 
                          className="flex items-center justify-between px-5 py-4 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all border-b last:border-0"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onCompanyClick}
                className="hidden sm:flex p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Company Profile"
              >
                <FileText size={22} strokeWidth={1.5} />
              </button>
              
              <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full transition-colors border ${user.role === 'Admin' ? 'bg-red-50 border-red-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${user.role === 'Admin' ? 'bg-red-600' : 'bg-blue-600'}`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:flex flex-col items-start mr-2">
                      <span className="text-[11px] font-bold text-gray-800 leading-none">{user.name}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${user.role === 'Admin' ? 'text-red-600' : 'text-blue-600'}`}>
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white shadow-2xl border rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b bg-gray-50/50">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all">
                          <UserIcon size={18} /> Profile Dashboard
                        </button>
                        {user.role === 'Admin' && (
                          <button 
                            onClick={() => { onAdminClick(); setUserDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <ShieldAlert size={18} /> Manage Store
                          </button>
                        )}
                        <button 
                          onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <LogOut size={18} /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button 
                    onClick={() => onAuthClick('login')}
                    className="text-sm font-bold text-gray-600 hover:text-blue-600 px-4 py-2.5 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => onAuthClick('register')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Register
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-600 hover:text-blue-600 relative transition-colors">
                  <Heart size={22} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={onCartClick}
                  className="p-2 text-gray-600 hover:text-blue-600 relative transition-colors group"
                >
                  <ShoppingCart size={22} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold animate-in zoom-in duration-300">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Matches Screenshot) */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header area of drawer */}
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-oswald font-bold text-gray-800 uppercase leading-none">{storeName}</span>
                <span className="text-[8px] text-gray-500 tracking-[0.2em] uppercase font-bold">Excellence in Precision</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={onCompanyClick} className="p-2 text-gray-600">
                <FileText size={22} />
              </button>
              
              {user ? (
                <div className="flex items-center gap-2 bg-gray-50 border rounded-full px-3 py-1">
                   <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none">{user.name}</span>
                    <span className="text-[8px] text-red-600 font-bold uppercase tracking-widest">{user.role}</span>
                  </div>
                  <ChevronDown size={12} className="text-gray-400" />
                </div>
              ) : (
                 <button onClick={() => { onAuthClick('login'); setMobileMenuOpen(false); }} className="text-xs font-bold text-gray-600">Login</button>
              )}

              <button className="p-2 text-gray-600"><Heart size={20} /></button>
              <button className="p-2 text-gray-600"><ShoppingCart size={20} /></button>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-600">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Company Details Strip */}
          <button 
            onClick={() => { onCompanyClick(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-6 py-4 border-b group"
          >
            <FileText size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">Company Details</span>
          </button>

          {/* Navigation Links List */}
          <div className="flex-grow overflow-y-auto pt-4">
            <div className="px-4">
              <div className="border border-blue-100 rounded-lg p-2">
                {NAV_ITEMS.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-6 text-xl font-oswald font-bold text-gray-800 uppercase tracking-widest border-b border-gray-50 last:border-0 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="p-6 bg-white border-t mt-auto">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { onAuthClick('login'); setMobileMenuOpen(false); }}
                className="w-full py-5 bg-gray-50 text-gray-700 font-bold rounded-xl text-sm transition-all active:scale-95"
              >
                Login
              </button>
              <button 
                onClick={() => { onAuthClick('register'); setMobileMenuOpen(false); }}
                className="w-full py-5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-95"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
