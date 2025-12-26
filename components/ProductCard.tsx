
import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white border rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border-gray-100 hover:border-blue-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-[10px] font-black rounded-full shadow-lg z-10 uppercase tracking-widest">
            {product.discount}
          </div>
        )}

        {/* Action Buttons Overlay - Matching Screenshot */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-10 opacity-100">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-gray-400 hover:text-red-500 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-110"
          >
            <Heart size={18} fill="none" strokeWidth={2} />
          </button>
          <a 
            href={`https://wa.me/94777777777?text=Hi, I am interested in ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); }}
            className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-green-500 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-110"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-.694 2.54 2.6-.681a5.733 5.733 0 002.837.747h.001c3.182 0 5.77-2.587 5.771-5.766 0-3.18-2.589-5.713-5.772-5.713zm3.374 8.213c-.147.416-.716.757-1.189.807-.321.034-.739.053-2.174-.54-1.836-.758-3.018-2.624-3.11-2.747-.093-.123-.743-.988-.743-1.885 0-.897.471-1.336.638-1.522.167-.187.365-.233.487-.233.121 0 .243.001.35.006.114.005.266-.043.415.319.148.361.511 1.246.554 1.339.043.093.072.201.01.325-.062.123-.093.201-.185.308-.093.108-.195.241-.277.323-.093.093-.191.194-.081.384.111.189.493.812 1.059 1.314.73.648 1.343.85 1.534.943.19.093.303.077.414-.051.111-.129.479-.557.608-.747.129-.19.259-.159.438-.093.179.066 1.137.537 1.334.635.197.098.328.147.377.231.049.084.049.489-.101.905z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="p-8 flex-grow cursor-pointer" onClick={() => onViewDetails(product)}>
        <h3 className="text-xl font-oswald font-bold text-gray-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-[10px] font-black text-blue-500 mb-6 uppercase tracking-[0.2em]">{product.category}</p>
        
        <div className="flex items-end gap-3 mb-8">
          <span className="text-3xl font-bold text-gray-900">LKR {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-base text-gray-300 line-through pb-1 font-bold">LKR {product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[20px] transition-all shadow-xl shadow-blue-600/10 active:scale-95 group/btn"
        >
          <ShoppingCart size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-[10px]">Add to Cart</span>
        </button>
      </div>

      <div className="px-8 py-5 border-t flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-2 text-gray-400">
          <Eye size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{product.views} Views</span>
        </div>
        <button 
          onClick={() => onViewDetails(product)}
          className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-[0.3em] transition-all hover:translate-x-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
