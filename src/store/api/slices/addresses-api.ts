import { api } from "../base-api";
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
  overrideExisting: false,
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useSelectAddressMutation,
} = addressesApi;
