
import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
  categoriesMap: Record<string, string[]>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, isOpen, onClose, categoriesMap }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(Object.keys(categoriesMap));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleCategoryChange = (cat: string) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(cat);
      if (isSelected) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== cat),
          subcategories: prev.subcategories.filter(sc => !categoriesMap[cat].includes(sc))
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, cat]
        };
      }
    });
  };

  const handleSubcategoryChange = (sub: string, parentCat: string) => {
    setFilters(prev => {
      const isSelected = prev.subcategories.includes(sub);
      let newSubs = isSelected 
        ? prev.subcategories.filter(s => s !== sub)
        : [...prev.subcategories, sub];
      
      let newCats = prev.categories;
      if (!isSelected && !prev.categories.includes(parentCat)) {
        newCats = [...prev.categories, parentCat];
      }

      return { ...prev, subcategories: newSubs, categories: newCats };
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      minPrice: 0,
      maxPrice: 500000
    });
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-[60] w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0 lg:block lg:z-0 lg:shadow-none
    `}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b flex items-center justify-between lg:hidden">
          <h2 className="text-xl font-oswald font-bold uppercase">Filter Options</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Categories</h3>
              <button 
                onClick={clearFilters}
                className="text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:underline"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(categoriesMap).map(([cat, subs]) => (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center group">
                    <button 
                      onClick={() => toggleCategory(cat)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {expandedCategories.includes(cat) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    <label className="flex items-center gap-3 flex-grow cursor-pointer py-1">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                          checked={filters.categories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                        />
                        <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${filters.categories.includes(cat) ? 'text-blue-600' : 'text-gray-700'}`}>
                        {cat}
                      </span>
                    </label>
                  </div>

                  {expandedCategories.includes(cat) && (
                    <div className="ml-8 space-y-2 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                      {subs.map(sub => (
                        <label key={sub} className="flex items-center gap-3 cursor-pointer group/sub">
                          <div className="relative flex items-center">
                            <input 
                              type="checkbox" 
                              className="peer appearance-none w-3.5 h-3.5 border-2 border-gray-200 rounded-sm checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
                              checked={filters.subcategories.includes(sub)}
                              onChange={() => handleSubcategoryChange(sub, cat)}
                            />
                            <Check size={8} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
                          </div>
                          <span className={`text-xs font-medium transition-colors ${filters.subcategories.includes(sub) ? 'text-blue-500' : 'text-gray-500 group-hover/sub:text-gray-700'}`}>
                            {sub}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Price Range (LKR)</h3>
            <div className="space-y-4 px-1">
              <input 
                type="range" 
                min="0" 
                max="500000" 
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({...prev, maxPrice: parseInt(e.target.value)}))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-600">
                   0
                </div>
                <span className="text-gray-300">—</span>
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-xs font-bold text-gray-600">
                  {filters.maxPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t lg:hidden">
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
