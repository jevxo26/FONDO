// Location: src/features/packages/context/packages-context.tsx
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

// Mock Data Contract matching page fields
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

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

// Sample dataset populated from layout state
const MOCK_PACKAGES: MealPackage[] = [
  {
    id: "pkg-1",
    name: "Lean Lifecycle Fasting",
    category: "Weight Loss",
    description: "Calorie-restrictive keto profiles combined with micro-dense organic greens to maximize steady fat loss.",
    duration: 7,
    mealsPerDay: 2,
    calories: 1200,
    price: 3500,
    discountPrice: 2900,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    isVegetarian: false,
    isHighProtein: true,
    isCustomizable: true,
  },
  {
    id: "pkg-2",
    name: "Hypertrophy Fuel Engine",
    category: "Weight Gain",
    description: "Complex slow-burning clean carbs stacked with dense clean protein foundations optimized for athletic building blocks.",
    duration: 30,
    mealsPerDay: 4,
    calories: 2800,
    price: 11500,
    discountPrice: null,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60",
    isVegetarian: false,
    isHighProtein: true,
    isCustomizable: false,
  },
  {
    id: "pkg-3",
    name: "Zen Harvest Botanical",
    category: "Regular",
    description: "Plant-derived wholesome macro structures sourcing strictly local grains and fresh field produce compositions.",
    duration: 15,
    mealsPerDay: 3,
    calories: 1600,
    price: 6000,
    discountPrice: 5400,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    isVegetarian: true,
    isHighProtein: false,
    isCustomizable: true,
  }
];

export function PackagesProvider({ children }: { children: React.ReactNode }) {
  // Input queries
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  
  // Slider values
  const [maxPrice, setMaxPrice] = useState(12000);
  const [maxCalories, setMaxCalories] = useState(3000);
  
  // Feature flags
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHighProtein, setIsHighProtein] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);
  
  // Sorter state
  const [sortBy, setSortBy] = useState("popular");
  
  // Comparison deck arrays
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // Toggle dynamic comparison cards (Max Limit: 3)
  const toggleComparison = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev; // Limit matrix space
      return [...prev, id];
    });
  };

  // Memoized filter and sort matrix processing pipeline
  const processedPackages = useMemo(() => {
    return MOCK_PACKAGES.filter((pkg) => {
      const activePrice = pkg.discountPrice ?? pkg.price;
      
      if (searchQuery && !pkg.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== "All" && pkg.category !== selectedCategory) return false;
      if (selectedDuration !== null && pkg.duration !== selectedDuration) return false;
      if (activePrice > maxPrice) return false;
      if (pkg.calories > maxCalories) return false;
      if (isVegetarian && !pkg.isVegetarian) return false;
      if (isHighProtein && !pkg.isHighProtein) return false;
      if (isCustomizable && !pkg.isCustomizable) return false;
      
      return true;
    }).sort((a, b) => {
      const aPrice = a.discountPrice ?? a.price;
      const bPrice = b.discountPrice ?? b.price;

      if (sortBy === "price-asc") return aPrice - bPrice;
      if (sortBy === "price-desc") return bPrice - aPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // Fallback to initial ordering context
    });
  }, [searchQuery, selectedCategory, selectedDuration, maxPrice, maxCalories, isVegetarian, isHighProtein, isCustomizable, sortBy]);

  return (
    <PackagesContext.Provider
      value={{
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        selectedDuration, setSelectedDuration,
        maxPrice, setMaxPrice,
        maxCalories, setMaxCalories,
        isVegetarian, setIsVegetarian,
        isHighProtein, setIsHighProtein,
        isCustomizable, setIsCustomizable,
        sortBy, setSortBy,
        comparedIds, toggleComparison,
        processedPackages,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) throw new Error("usePackages must be executed within a valid PackagesProvider component block.");
  return context;
}