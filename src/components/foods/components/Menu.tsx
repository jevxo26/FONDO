"use client";
import Categories from "./categories";
import FoodGrid from "./food-grid";
import Pagination from "./pagination";
import { FOOD_ITEMS } from "@/data/foodsdata";

const CategoriesMenu = () => {
  return (
    <div>
      {/* Category Selection tab */}
      <Categories />
      {/* Food Cards Section */}
      <FoodGrid foods={FOOD_ITEMS} />
      {/* Pagination Controls */}
      <div className="wrapper">
        <Pagination currentPage={1} totalPages={1} />
      </div>
    </div>
  );
};

export default CategoriesMenu;
