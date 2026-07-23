// src/types/vendor.ts
export interface VendorFood {
  id: string;
  foodId: string;
  name: string;
  category: string;
  subCategory: string;
  sku: string;
  kitchen: string;
  branch: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  maxStock: number;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  status: "ACTIVE" | "INACTIVE";
  preparationTime: number;
  isFeatured: boolean;
  isPopular: boolean;
  image: string;
  vendorFoodCode: string;
  priority: number;
  isPrimary: boolean;
  totalOrders: number;
  rating: number;
}

export interface FilterConfig {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export interface RowAction<TData> {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (data: TData) => void;
}