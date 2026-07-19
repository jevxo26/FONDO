"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface Address {
  id: string;
  label?: string;
  receiverName: string;
  receiverPhone: string;
  country?: string;
  division: string;
  district: string;
  upazila?: string;
  area: string;
  road?: string;
  house?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  postalCode?: string;
  deliveryInstruction?: string;
  isDefault?: boolean;
}

export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => api.get<Address[]>("/users/me/addresses"),
  });
}

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post<Address>("/users/me/addresses", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      api.patch<Address>(`/users/me/addresses/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/users/me/addresses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

export function useSetDefaultAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/users/me/addresses/${id}/default`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }),
  });
}
