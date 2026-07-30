"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// API থেকে আসা ক্যাটাগরির টাইপ
export interface PackageCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: string;
}

// API থেকে আসা খাবারের টাইপ
export interface ApiFood {
  id: string;
  name: string;
  calories?: number | null;
  protein?: number | null;
  foodType: "VEG" | "NON_VEG" | "SEAFOOD" | string;
}

// API থেকে আসা প্যাকেজের টাইপ (রিয়েল ডাটা স্ট্রাকচার)
export interface ApiPackage {
  id: string;
  packageCode?: string;
  name: string;
  slug?: string;
  description: string;
  thumbnail: string;
  coverImage?: string;
  packageType?: string;
  durationDays: number;
  totalMeals: number;
  price: string | number;
  discountPrice?: string | number | null;
  currency?: string;
  isCustomizable: boolean;
  status?: string;
  packageCategoryId: string;
  packageCategory?: PackageCategory | null;
  rating?: number | null;
  days?: Array<{
    id: string;
    dayNumber: number;
    meals?: Array<{
      id: string;
      mealType: string;
      foods?: Array<{
        food?: ApiFood;
      }>;
    }>;
  }>;
}

interface PackagesContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (categoryId: string) => void;
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
  resetFilters: () => void;
  rawPackages: ApiPackage[];
  setRawPackages: (packages: ApiPackage[]) => void;
  categories: PackageCategory[];
  setCategories: (categories: PackageCategory[]) => void;
  processedPackages: ApiPackage[];
}

export const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

export function PackagesProvider({
  children,
  initialPackages = [],
  initialCategories = [],
}: {
  children: ReactNode;
  initialPackages?: ApiPackage[];
  initialCategories?: PackageCategory[];
}) {
  // এপিআই ডাটা স্টেট
  const [rawPackages, setRawPackages] = useState<ApiPackage[]>(initialPackages);
  const [categories, setCategories] = useState<PackageCategory[]>(initialCategories);

  // ফিল্টার স্টেটসমূহ
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [maxCalories, setMaxCalories] = useState(3500);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHighProtein, setIsHighProtein] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // কস্পেয়ার / তুলনা টগল লজিক (সর্বোচ্চ ৩টি)
  const toggleComparison = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  // সকল ফিল্টার একসাথে রিসেট করার ফাংশন
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId("all");
    setSelectedDuration(null);
    setMaxPrice(15000);
    setMaxCalories(3500);
    setIsVegetarian(false);
    setIsHighProtein(false);
    setIsCustomizable(false);
    setSortBy("popular");
  };

  // ফিল্টারিং ও সর্টিং লজিক প্রসেস করা
  const processedPackages = useMemo(() => {
    return rawPackages
      .filter((pkg) => {
        // ১. নাম ও বিবরণ দিয়ে সার্চ ফিল্টার
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = pkg.name?.toLowerCase().includes(query);
          const matchesDesc = pkg.description?.toLowerCase().includes(query);
          if (!matchesName && !matchesDesc) return false;
        }

        // ২. ক্যাটাগরি আইডি (packageCategoryId) দিয়ে ফিল্টার
        if (selectedCategoryId !== "all" && pkg.packageCategoryId !== selectedCategoryId) {
          return false;
        }

        // ৩. দিন/ডিউরেশন ফিল্টার
        if (selectedDuration !== null && pkg.durationDays !== selectedDuration) {
          return false;
        }

        // ৪. দাম পার্সিং ও ফিল্টার
        const activePrice = Number(pkg.discountPrice ?? pkg.price ?? 0);
        if (activePrice > maxPrice) {
          return false;
        }

        // ৫. নেস্টেড অবজেক্ট থেকে ক্যালোরি, প্রোটিন ও ভেজিটেরিয়ান চেক করা
        let totalCalories = 0;
        let totalProtein = 0;
        let allVeg = true;

        pkg.days?.forEach((day) => {
          day.meals?.forEach((meal) => {
            meal.foods?.forEach((foodItem) => {
              const food = foodItem.food;
              if (food) {
                totalCalories += food.calories || 0;
                totalProtein += food.protein || 0;
                if (food.foodType !== "VEG") allVeg = false;
              }
            });
          });
        });

        // দৈনিক গড় ক্যালোরি
        const avgDailyCalories = pkg.durationDays > 0 ? Math.round(totalCalories / pkg.durationDays) : totalCalories;
        if (avgDailyCalories > maxCalories) {
          return false;
        }

        // ৬. নিরামিষ ফিল্টার
        if (isVegetarian && !allVeg) {
          return false;
        }

        // ৭. হাই প্রোটিন ফিল্টার (দৈনিক ২০ গ্রাম+)
        const avgDailyProtein = pkg.durationDays > 0 ? totalProtein / pkg.durationDays : totalProtein;
        if (isHighProtein && avgDailyProtein < 20) {
          return false;
        }

        // ৮. কাস্টমাইজ্যাবল ফিল্টার
        if (isCustomizable && !pkg.isCustomizable) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.discountPrice ?? a.price ?? 0);
        const priceB = Number(b.discountPrice ?? b.price ?? 0);

        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [
    rawPackages,
    searchQuery,
    selectedCategoryId,
    selectedDuration,
    maxPrice,
    maxCalories,
    isVegetarian,
    isHighProtein,
    isCustomizable,
    sortBy,
  ]);

  return (
    <PackagesContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
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
        resetFilters,
        rawPackages,
        setRawPackages,
        categories,
        setCategories,
        processedPackages,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

// কাস্টম হুক
export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) {
    throw new Error(
      "usePackages must be executed within a valid PackagesProvider component block."
    );
  }
  return context;
}