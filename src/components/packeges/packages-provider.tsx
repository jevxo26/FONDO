"use client";

import { useState } from "react";
import { PackagesContext } from "./packages-context";

export function PackagesProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(12000);
  const [maxCalories, setMaxCalories] = useState(3000);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHighProtein, setIsHighProtein] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  const toggleComparison = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };
  return (
    <PackagesContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDuration,
        setSelectedDuration,
        maxPrice,
        setMaxPrice,
        maxCalories,
        setMaxCalories,
        isVegetarian,
        setIsVegetarian,
        isHighProtein,
        setIsHighProtein,
        isCustomizable,
        setIsCustomizable,
        sortBy,
        setSortBy,
        comparedIds,
        toggleComparison,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}
