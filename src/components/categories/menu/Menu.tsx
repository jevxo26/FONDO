'use client'
import { useState } from "react";
import { Categories } from "./categories";
import { FoodGrid } from "./food-grid";

const CategoriesMenu = () => {
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
        </div>
    );
};

export default CategoriesMenu;