"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";

export interface Address {
  id: string;
  label: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.addresses.all,
    queryFn: () => api.get<Address[]>("/api/users/me/addresses"),
  });
}

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Address, "id" | "isDefault">) =>
      api.post<Address>("/api/users/me/addresses", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      api.patch<Address>(`/api/users/me/addresses/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/users/me/addresses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}

export function useSetDefaultAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`/api/users/me/addresses/${id}/default`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  });
}
