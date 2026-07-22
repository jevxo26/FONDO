"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Address } from "@/types/address";

export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.addresses.all,
    queryFn: async () => {
      const res = await api.get<{ items: Address[] }>("/users/me/addresses");
      return res.items;
    },
  });
}

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post<Address>("/users/me/addresses", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      api.patch<Address>(`/users/me/addresses/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/users/me/addresses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useSetDefaultAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/users/me/addresses/${id}/default`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useSelectAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => api.post("/cart/checkout/select-address", { addressId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
