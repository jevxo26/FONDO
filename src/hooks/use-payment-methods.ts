"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  logo?: string;
  isDefault: boolean;
}

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const res = await api.get<{ items: PaymentMethod[] }>("/payment-methods");
      return res.items;
    },
    staleTime: 300_000,
  });
}
