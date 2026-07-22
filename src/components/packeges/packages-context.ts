"use client";

import { createContext, useContext } from "react";

export interface MealPackage {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  mealsPerDay: number;
  calories: number;
  price: number;
  discountPrice: number | null;
  rating: number;
  thumbnail: string;
  isVegetarian: boolean;
  isHighProtein: boolean;
  isCustomizable: boolean;
}

interface PackagesContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDuration: number | null;
  setSelectedDuration: (duration: number | null) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  maxCalories: number;
  setMaxCalories: (calories: number) => void;
  isVegetarian: boolean;
  setIsVegetarian: (val: boolean) => void;
  isHighProtein: boolean;
  setIsHighProtein: (val: boolean) => void;
  isCustomizable: boolean;
  setIsCustomizable: (val: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  comparedIds: string[];
  toggleComparison: (id: string) => void;
  processedPackages: MealPackage[];
}

export const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) throw new Error("usePackages must be executed within a valid PackagesProvider component block.");
  return context;
}
