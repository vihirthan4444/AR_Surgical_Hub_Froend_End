
import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        
        {/* Header */}
        <div className="p-8 bg-gray-900 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-oswald font-bold uppercase tracking-tight">Your Cart</h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {items.length} Items Selected
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={48} className="text-gray-200" />
              </div>
              <div>
                <h3 className="text-xl font-oswald font-bold text-gray-800 uppercase">Cart is Empty</h3>
                <p className="text-sm text-gray-500 mt-2">Looks like you haven't added any surgical tools yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="bg-blue-600 text-white font-black py-4 px-8 rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-tight truncate pr-4">{item.name}</h4>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">{item.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-500 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="text-xs font-black text-gray-700 w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-500"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                      <span className="text-sm font-black text-gray-900">LKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-gray-100 bg-gray-50/50 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-600">Calculated at next step</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Estimated Total</span>
                <span className="text-2xl font-oswald font-bold text-blue-600">LKR {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group active:scale-95">
              <span className="uppercase tracking-[0.2em] text-sm">Proceed to Checkout</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-[0.1em]">
              Secure payment processing powered by AR Medical
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
