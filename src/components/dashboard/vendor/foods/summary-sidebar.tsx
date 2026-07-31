"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Tag, Clock, Utensils, DollarSign, Package, Apple } from "lucide-react";

interface SummarySidebarProps {
  vendorName: string;
  categoryName: string;
  foodType: string;
  status: string;
  basePrice: number;
  discountPrice: number;
  variantCount: number;
  ingredientCount: number;
  calories: number;
  preparationTime: number;
}

export function SummarySidebar({
  vendorName,
  categoryName,
  foodType,
  status,
  basePrice,
  discountPrice,
  variantCount,
  ingredientCount,
  calories,
  preparationTime,
}: SummarySidebarProps) {
  const statusColors = {
    ACTIVE: "text-green-600 bg-green-50",
    INACTIVE: "text-red-600 bg-red-50",
    DRAFT: "text-yellow-600 bg-yellow-50",
    ARCHIVED: "text-gray-600 bg-gray-50",
  };

  const statusColor =
    statusColors[status as keyof typeof statusColors] || "text-gray-600 bg-gray-50";

  return (
    <div className="sticky top-24">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vendor</span>
              <span className="font-medium text-foreground">{vendorName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium text-foreground">{categoryName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Food Type</span>
              <span className="font-medium text-foreground">{foodType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                {status}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Base Price
              </span>
              <span className="font-medium text-foreground">৳{basePrice.toFixed(2)}</span>
            </div>
            {discountPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Discount Price
                </span>
                <span className="font-medium text-green-600">৳{discountPrice.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Utensils className="w-4 h-4" />
                Variants
              </span>
              <span className="font-medium text-foreground">{variantCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Ingredients
              </span>
              <span className="font-medium text-foreground">{ingredientCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Apple className="w-4 h-4" />
                Calories
              </span>
              <span className="font-medium text-foreground">{calories} kcal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Prep Time
              </span>
              <span className="font-medium text-foreground">{preparationTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
