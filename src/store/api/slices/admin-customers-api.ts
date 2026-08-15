import { api } from "../base-api";
import type {
  AdminCustomer,
  AdminCustomerDetail,
  AdminCustomerOrder,
  AdminSubscription,
  AdminPayment,
  WalletResponse,
} from "@/types/admin";

export const adminCustomersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomers: builder.query<AdminCustomer[], void>({
      query: () => "/admin/customers",
      providesTags: ["AdminCustomer"],
    }),

    getAdminCustomer: builder.query<AdminCustomerDetail, string>({
      query: (id) => `/admin/customers/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminCustomer" as const, id }],
    }),

    getAdminCustomerOrders: builder.query<AdminCustomerOrder[], string>({
      query: (customerId) => `/admin/customers/${customerId}/orders`,
      providesTags: (result, error, id) => [{ type: "AdminCustomer" as const, id }],
    }),

    getAdminCustomerSubscriptions: builder.query<AdminSubscription[], string>({
      query: (customerId) => `/admin/customers/${customerId}/subscriptions`,
      providesTags: (result, error, id) => [{ type: "AdminCustomer" as const, id }],
    }),

    getAdminCustomerWallet: builder.query<WalletResponse, string>({
      query: (customerId) => `/admin/customers/${customerId}/wallet`,
      providesTags: (result, error, id) => [{ type: "AdminCustomer" as const, id }],
    }),

    getAdminCustomerPayments: builder.query<AdminPayment[], string>({
      query: (customerId) => `/admin/customers/${customerId}/payments`,
      providesTags: (result, error, id) => [{ type: "AdminCustomer" as const, id }],
    }),

    getAllAdminOrders: builder.query<
      { items: unknown[]; total: number; page: number; limit: number; totalPages: number },
      void
    >({
      query: () => "/admin/orders",
      providesTags: ["Order"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdminCustomersQuery,
  useGetAdminCustomerQuery,
  useGetAdminCustomerOrdersQuery,
  useGetAdminCustomerSubscriptionsQuery,
  useGetAdminCustomerWalletQuery,
  useGetAdminCustomerPaymentsQuery,
  useGetAllAdminOrdersQuery,
} = adminCustomersApi;

export const useAdminCustomers = () => {
  const { data, isLoading, error } = useGetAdminCustomersQuery();
  return { data, isLoading, error };
};

export const useAdminCustomer = (id: string) => {
  const { data, isLoading, error } = useGetAdminCustomerQuery(id, { skip: !id });
  return { data, isLoading, error };
};

export const useAdminCustomerOrders = (customerId: string) => {
  const { data, isLoading, error } = useGetAdminCustomerOrdersQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
};

export const useAdminCustomerSubscriptions = (customerId: string) => {
  const { data, isLoading, error } = useGetAdminCustomerSubscriptionsQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
};

export const useAdminCustomerWallet = (customerId: string) => {
  const { data, isLoading, error } = useGetAdminCustomerWalletQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
};

export const useAdminCustomerPayments = (customerId: string) => {
  const { data, isLoading, error } = useGetAdminCustomerPaymentsQuery(customerId, { skip: !customerId });
  return { data, isLoading, error };
};
