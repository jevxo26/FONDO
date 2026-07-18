"use client";

import React, { createContext, useContext, useState } from "react";

type FoodsContextType = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeSubCategory: string;
  setActiveSubCategory: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  foodTypeFilter: string;
  setFoodTypeFilter: (type: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <FoodsContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory,
        searchQuery, setSearchQuery,
        foodTypeFilter, setFoodTypeFilter,
        sortBy, setSortBy,
        currentPage, setCurrentPage
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