import React from 'react';

interface Category {
  id: string;
  name: string;
  subCategories?: Category[];
}

interface CategoriesProps {
  cat: Category;
  activeCategory: string;
  setActiveCategory: (name: string) => void;
  setActiveSubCategory: (name: string) => void;
  setCurrentPage: (page: number) => void;
  activeSubCategory: string;
}
const categories = ({cat, activeCategory, setActiveCategory, setActiveSubCategory, setCurrentPage, activeSubCategory}: CategoriesProps) => {
  return (
    <div>
       <div key={cat.id} className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setActiveSubCategory("All");
                      setCurrentPage(1);
                    }} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeCategory === cat.name ? "bg-[#CEA359]/10 text-[#CEA359] font-bold" : "text-[#16100C]/70 hover:bg-[#16100C]/5"
                      }`}
                  >
                    {cat.name}
                  </button>
                  {activeCategory === cat.name && cat.subCategories && cat.subCategories.length > 0 && (
                    <div className="pl-4 flex flex-col border-l border-[#16100C]/5 ml-3 gap-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      {cat.subCategories.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveSubCategory(sub.name);
                            setCurrentPage(1);
                          }}
                          className={`text-[10px] py-1 text-left transition-colors ${activeSubCategory === sub.name
                            ? "text-[#CEA359] font-bold"
                            : "text-[#16100C]/50 hover:text-[#CEA359]"
                            }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
    </div>
  );
};

export default categories;