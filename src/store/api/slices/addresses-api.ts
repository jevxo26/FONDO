import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Address } from "@/types/address";

export const addressesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => "/users/me/addresses",
      providesTags: ["Address"],
    }),

    createAddress: builder.mutation<Address, Record<string, unknown>>({
      query: (body) => ({ url: "/users/me/addresses", method: "POST", body }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation<Address, { id: string; data: Partial<Address> }>({
      query: ({ id, data }) => ({ url: `/users/me/addresses/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/me/addresses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Address"],
    }),

    setDefaultAddress: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/me/addresses/${id}/default`, method: "PATCH" }),
      invalidatesTags: ["Address"],
    }),

    selectAddress: builder.mutation<void, string>({
      query: (addressId) => ({
        url: "/cart/checkout/select-address",
        method: "POST",
        body: { addressId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useSelectAddressMutation,
} = addressesApi;

export const useAddresses = () => {
  const { data, isLoading, error } = useGetAddressesQuery(undefined);
  return { data, isLoading, error };
};

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
