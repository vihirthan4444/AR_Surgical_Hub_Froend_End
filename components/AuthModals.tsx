
import React, { useEffect, useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, ArrowRight, UserCircle } from 'lucide-react';
import { User } from '../types';

interface AuthModalsProps {
  type: 'login' | 'register' | null;
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSwitchType: (type: 'login' | 'register') => void;
  storeName: string;
  logoUrl: string | null;
}

const AuthModals: React.FC<AuthModalsProps> = ({ type, onClose, onSuccess, onSwitchType, storeName, logoUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
      setError(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [type]);

  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Check for Admin Credentials
      if (type === 'login' && formData.email === 'admin' && formData.password === 'admin123') {
        onSuccess({
          name: 'Administrator',
          email: 'admin@arsurgical.com',
          role: 'Admin'
        });
        onClose();
        return;
      }

      // Default Login/Register logic
      onSuccess({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: 'Customer'
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        
        {/* Header - Fixed */}
        <div className="p-8 bg-blue-600 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
            aria-label="Close drawer"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-blue-600">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-oswald font-bold uppercase tracking-tight">
                {type === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">
                {type === 'login' ? `${storeName} Portal` : `${storeName} Registration`}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                {error}
              </div>
            )}

            {type === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-[0.15em] ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    required
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase tracking-[0.15em] ml-1">
                {type === 'login' ? 'Username or Email' : 'Email Address'}
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="text"
                  placeholder={type === 'login' ? 'admin or email' : 'name@email.com'}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            {type === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-[0.15em] ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="tel"
                    placeholder="+94 77 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-black text-gray-700 uppercase tracking-[0.15em]">Password</label>
                {type === 'login' && (
                  <button type="button" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-wider">Forgot?</button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 shadow-inner"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group disabled:bg-blue-300 active:scale-95"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-sm">{type === 'login' ? 'Sign In Now' : 'Complete Setup'}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="bg-gray-50 p-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 font-black uppercase tracking-[0.1em]">
            {type === 'login' ? "Need an account?" : "Existing member?"}
            <button 
              type="button"
              className="ml-2 text-blue-600 hover:text-blue-700 transition-colors border-b-2 border-blue-600/20 hover:border-blue-600 pb-0.5"
              onClick={() => onSwitchType(type === 'login' ? 'register' : 'login')}
            >
              {type === 'login' ? 'Register Account' : 'Back to Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModals;
