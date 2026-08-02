"use client";

import { createContext, useContext } from "react";

export interface MealPackage {
  id: string;
  packageCode: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  packageType: string;
  durationDays: number;
  totalMeals: number;
  price: string;
  discountPrice: string | null;
  currency: string;
  isCustomizable: boolean;
  rating: number | null;
  packageCategoryId: string;
  packageCategory: {
    id: string;
    name: string;
    slug: string;
  } | null;
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
}

export const PackagesContext = createContext<
  PackagesContextType | undefined
>(undefined);

// কাস্টম হুক
export function usePackages() {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error(
      "usePackages must be used inside PackagesProvider"
    );
  }

  return context;
}
