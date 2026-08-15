import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type { Order } from "@/types/order";

export interface MyVendor {
  id: string;
  vendorCode: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  logo: string | null;
  status: string;
  isActive: boolean;
  isOnline: boolean;
}

export interface VendorOrderListItem {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalAmount: number;
  placedAt: string;
  notes: string | null;
  customer: { id: string; firstName: string; lastName: string };
  items: Array<{
    id: string;
    foodId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    food: { id: string; name: string; thumbnail: string | null };
  }>;
}

export const vendorOrdersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyVendor: builder.query<MyVendor, void>({
      query: () => "/vendor/my-profile",
      providesTags: ["VendorOrder"],
    }),

    getVendorOrders: builder.query<VendorOrderListItem[], string>({
      query: (vendorId) => `/vendors/${vendorId}/orders`,
      providesTags: ["VendorOrder"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetMyVendorQuery, useGetVendorOrdersQuery } = vendorOrdersApi;

export const useMyVendor = () => {
  const { data, isLoading, error } = useGetMyVendorQuery();
  return { data, isLoading, error };
};

export const useVendorOrders = (vendorId: string) => {
  const { data, isLoading, error, refetch } = useGetVendorOrdersQuery(vendorId, {
    skip: !vendorId,
  });
  return { data: data ?? [], isLoading, error, refetch };
};
