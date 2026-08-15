"use client";

import React, { createContext, useContext, useState } from "react";

export type FoodTypeFilter = "All" | "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD";
export type SpiceFilter = "All" | "MILD" | "MEDIUM" | "HOT";
export type PriceFilter = "All" | "under-300" | "300-600" | "600-plus";

type FoodsContextType = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeSubCategory: string;
  setActiveSubCategory: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  foodType: FoodTypeFilter;
  setFoodType: (type: FoodTypeFilter) => void;
  spiceLevel: SpiceFilter;
  setSpiceLevel: (spice: SpiceFilter) => void;
  dietType: string;
  setDietType: (diet: string) => void;
  priceRange: PriceFilter;
  setPriceRange: (range: PriceFilter) => void;
  resetFilters: () => void;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [foodType, setFoodType] = useState<FoodTypeFilter>("All");
  const [spiceLevel, setSpiceLevel] = useState<SpiceFilter>("All");
  const [dietType, setDietType] = useState("All");
  const [priceRange, setPriceRange] = useState<PriceFilter>("All");

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setSearchQuery("");
    setFoodType("All");
    setSpiceLevel("All");
    setDietType("All");
    setPriceRange("All");
    setCurrentPage(1);
  };

  return (
    <FoodsContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        foodType,
        setFoodType,
        spiceLevel,
        setSpiceLevel,
        dietType,
        setDietType,
        priceRange,
        setPriceRange,
        resetFilters,
      }}
    >
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  if (!context) throw new Error("useFoods must be used within a FoodsProvider");
  return context;
}
