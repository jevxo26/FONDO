"use client";

import { useState } from "react";
import { store } from "@/store/store";
import { foodsApi } from "@/store/api/slices/foods-api";
import { VendorFoodTableSection } from "@/components/dashboard/vendor/foods/food-table";
import type { VendorFood } from "@/types/vendor";

export function ClientWrapper({ initialData }: { initialData: VendorFood[] }) {
  const [seeded] = useState(() => {
    store.dispatch(foodsApi.util.upsertQueryData("getVendorFoods", undefined, initialData));
    return true;
  });
  void seeded;
  return <VendorFoodTableSection />;
}
