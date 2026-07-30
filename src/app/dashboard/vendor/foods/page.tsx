// src/app/dashboard/vendor/foods/page.tsx
"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Utensils, PlusCircle, AlertCircle, Package, Loader2 } from "lucide-react";
import { useGetVendorFoodsQuery } from "@/store/api/slices/vendor-food-api";
import type { VendorFood } from "@/types/vendor";
import { VendorFoodTableSection } from "@/components/dashboard/vendor/foods/food-table";

// Mock Data - API fail হলে ব্যবহার হবে
const MOCK_FOODS: VendorFood[] = [
  {
    id: "1",
    foodId: "food_001",
    name: "Grilled Chicken",
    category: "Main Course",
    subCategory: "Chicken",
    sku: "GC-001",
    kitchen: "Main Kitchen",
    branch: "Dhanmondi",
    price: 450,
    costPrice: 300,
    stock: 50,
    minStock: 10,
    maxStock: 100,
    stockStatus: "IN_STOCK",
    status: "ACTIVE",
    preparationTime: 20,
    isFeatured: true,
    isPopular: true,
    image: "/images/food1.jpg",
    vendorFoodCode: "VFC-001",
    priority: 1,
    isPrimary: true,
    totalOrders: 150,
    rating: 4.5,
  },
  {
    id: "2",
    foodId: "food_002",
    name: "Beef Burger",
    category: "Main Course",
    subCategory: "Beef",
    sku: "BB-002",
    kitchen: "Main Kitchen",
    branch: "Banani",
    price: 350,
    costPrice: 200,
    stock: 30,
    minStock: 5,
    maxStock: 50,
    stockStatus: "LOW_STOCK",
    status: "ACTIVE",
    preparationTime: 15,
    isFeatured: false,
    isPopular: true,
    image: "/images/food2.jpg",
    vendorFoodCode: "VFC-002",
    priority: 2,
    isPrimary: false,
    totalOrders: 100,
    rating: 4.2,
  },
  {
    id: "3",
    foodId: "food_003",
    name: "Vegetable Pizza",
    category: "Main Course",
    subCategory: "Pizza",
    sku: "VP-003",
    kitchen: "Pizza Kitchen",
    branch: "Gulshan",
    price: 550,
    costPrice: 350,
    stock: 0,
    minStock: 5,
    maxStock: 30,
    stockStatus: "OUT_OF_STOCK",
    status: "INACTIVE",
    preparationTime: 25,
    isFeatured: false,
    isPopular: false,
    image: "/images/food3.jpg",
    vendorFoodCode: "VFC-003",
    priority: 3,
    isPrimary: false,
    totalOrders: 50,
    rating: 3.8,
  },
  {
    id: "4",
    foodId: "food_004",
    name: "Chicken Biryani",
    category: "Main Course",
    subCategory: "Biryani",
    sku: "CB-004",
    kitchen: "Biryani Kitchen",
    branch: "Mirpur",
    price: 280,
    costPrice: 180,
    stock: 45,
    minStock: 8,
    maxStock: 60,
    stockStatus: "IN_STOCK",
    status: "ACTIVE",
    preparationTime: 30,
    isFeatured: true,
    isPopular: true,
    image: "/images/food4.jpg",
    vendorFoodCode: "VFC-004",
    priority: 1,
    isPrimary: true,
    totalOrders: 200,
    rating: 4.8,
  },
  {
    id: "5",
    foodId: "food_005",
    name: "Margherita Pizza",
    category: "Main Course",
    subCategory: "Pizza",
    sku: "MP-005",
    kitchen: "Pizza Kitchen",
    branch: "Gulshan",
    price: 450,
    costPrice: 280,
    stock: 15,
    minStock: 5,
    maxStock: 40,
    stockStatus: "LOW_STOCK",
    status: "ACTIVE",
    preparationTime: 20,
    isFeatured: false,
    isPopular: false,
    image: "/images/food5.jpg",
    vendorFoodCode: "VFC-005",
    priority: 2,
    isPrimary: false,
    totalOrders: 80,
    rating: 4.0,
  },
];

export default function VendorFoodsPage() {
  const { data, isLoading, isError } = useGetVendorFoodsQuery();

  // API fail হলে mock data ব্যবহার করব
  const foods = data?.items?.length ? data.items : MOCK_FOODS;
  const totalItems = foods.length;
  const activeItems = foods.filter((f) => f.status === "ACTIVE").length;
  const outOfStock = foods.filter((f) => f.stockStatus === "OUT_OF_STOCK").length;
  const lowStock = foods.filter((f) => f.stockStatus === "LOW_STOCK").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Foods"
        description="Manage your food catalog and menu items."
        icon={Utensils}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Items"
          value={totalItems.toString()}
          icon={Utensils}
          accent="right"
        />
        <StatCard
          label="Active"
          value={activeItems.toString()}
          variant="success"
          icon={PlusCircle}
          accent="right"
        />
        <StatCard
          label="Low Stock"
          value={lowStock.toString()}
          variant="warning"
          icon={AlertCircle}
          accent="right"
        />
        <StatCard
          label="Out of Stock"
          value={outOfStock.toString()}
          variant="danger"
          icon={Package}
          accent="right"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-xl font-semibold tracking-tight">Food Items List</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {foods.filter((f) => f.status === "ACTIVE").length} Active
          </p>
        </div>
        <VendorFoodTableSection initialFoods={foods} />
      </div>
    </div>
  );
}
