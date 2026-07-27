"use client";

import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useSelectAddressMutation,
} from "@/store/api/slices/addresses-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useAddresses() {
  const { data, isLoading, error } = useGetAddressesQuery(undefined);
  return { data, isLoading, error };
}

export function useCreateAddress() {
  const [trigger, { isLoading }] = useCreateAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useUpdateAddress() {
  const [trigger, { isLoading }] = useUpdateAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useDeleteAddress() {
  const [trigger, { isLoading }] = useDeleteAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useSetDefaultAddress() {
  const [trigger, { isLoading }] = useSetDefaultAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useSelectAddress() {
  const [trigger, { isLoading }] = useSelectAddressMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
