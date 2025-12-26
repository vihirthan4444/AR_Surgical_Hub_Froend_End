
import React from 'react';
import { X, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white shadow-2xl rounded-[40px] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md md:bg-gray-100 md:hover:bg-gray-200 rounded-full transition-all text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 bg-gray-100 relative group overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-8 left-8 bg-red-600 text-white px-5 py-2 text-sm font-black rounded-2xl shadow-xl uppercase tracking-widest">
              Save {product.discount}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-white flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full mb-4 inline-block">
              {product.category} • {product.subcategory}
            </span>
            <h2 className="text-3xl md:text-4xl font-oswald font-bold text-gray-900 uppercase tracking-tight leading-tight mt-2">
              {product.name}
            </h2>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-4xl font-bold text-gray-900">LKR {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through font-medium">LKR {product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-gray-500 leading-relaxed mb-10 text-lg">
            High-precision surgical instrument manufactured with medical-grade stainless steel. This {product.subcategory} tool is designed for maximum durability and precision in critical medical environments. Standard sterilization procedures apply.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Certified Tool</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl text-blue-600">
                <Truck size={20} />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Islandwide Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl text-blue-600">
                <RefreshCw size={20} />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Exchange Policy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-2xl text-blue-600">
                <Heart size={20} />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Wishlist</span>
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-grow flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[24px] transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
            >
              <ShoppingCart size={22} className="group-hover:-translate-y-1 transition-transform" />
              <span className="uppercase tracking-[0.2em] text-sm">Add to Cart</span>
            </button>
            
            <a 
              href={`https://wa.me/94777777777?text=Hello, I have an inquiry about ${product.name} (LKR ${product.price})`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black py-6 px-10 rounded-[24px] transition-all shadow-xl shadow-green-500/20 active:scale-95 group"
            >
              <MessageCircle size={22} />
              <span className="uppercase tracking-[0.2em] text-sm">Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
