"use client";

import React, { createContext, useContext, useState } from "react";

type FoodsContextType = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  foodTypeFilter: string;
  setFoodTypeFilter: (type: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");

  return (
    <FoodsContext.Provider 
      value={{ 
        activeCategory, setActiveCategory, 
        searchQuery, setSearchQuery, 
        foodTypeFilter, setFoodTypeFilter,
        sortBy, setSortBy 
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