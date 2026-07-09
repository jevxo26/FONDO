'use client'
import { useState } from "react";
import Categories from "./categories";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";


const CategoriesMenu = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      {/* Category Selection tab */}
      <Categories/>
      {/* Food Cards Section */}
      <FoodGrid/>
      {/* Pagination Controls */}
      <div className="wrapper">
        <Pagination/>
      </div>
    </div>
  );
};

export default CategoriesMenu;