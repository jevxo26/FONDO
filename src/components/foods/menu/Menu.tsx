'use client'
import { useState } from "react";
import { Categories } from "./categories";
import { FoodGrid } from "./food-grid";
import { Pagination } from "./pagination";

const CategoriesMenu = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    return (
        <div>
            {/* Category Selection tab */}
            <Categories
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            {/* Food Cards Grid Section */}
            <FoodGrid activeCategory={activeCategory} />
            {/* Pagination Controls */}
      <div className="wrapper">
        <Pagination
          currentPage={currentPage} 
          totalPages={4} 
          onPageChange={setCurrentPage} 
        />
      </div>
        </div>
    );
};

export default CategoriesMenu;