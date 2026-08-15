import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
import type {
  CustomerWallet,
  CustomerWalletTransaction,
  TopupPayload,
  WalletTopupResponse,
  WithdrawPayload,
  WalletWithdraw,
} from "@/types/wallet";

export interface AdminWithdrawListItem extends WalletWithdraw {
  wallet: {
    walletNumber: string;
    customerId: string;
    customer: { firstName: string; lastName: string; phone: string };
  };
}

export const walletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<CustomerWallet, void>({
      query: () => "/wallet",
      providesTags: ["Wallet"],
    }),

    getWalletTransactions: builder.query<CustomerWalletTransaction[], void>({
      query: () => "/wallet/transactions",
      providesTags: ["Wallet"],
    }),

    topupWallet: builder.mutation<WalletTopupResponse, TopupPayload>({
      query: (body) => ({ url: "/wallet/topup", method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    requestWithdraw: builder.mutation<WalletWithdraw, WithdrawPayload>({
      query: (body) => ({ url: "/wallet/withdraw", method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    // Admin endpoints
    listWithdrawals: builder.query<AdminWithdrawListItem[], string | undefined>({
      query: (status) => ({
        url: "/wallet/withdrawals",
        params: status ? { status } : undefined,
      }),
      providesTags: ["Wallet"],
    }),

    approveWithdraw: builder.mutation<void, string>({
      query: (id) => ({ url: `/wallet/withdraw/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["Wallet"],
    }),

    rejectWithdraw: builder.mutation<void, string>({
      query: (id) => ({ url: `/wallet/withdraw/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["Wallet"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetWalletQuery,
  useGetWalletTransactionsQuery,
  useTopupWalletMutation,
  useRequestWithdrawMutation,
  useListWithdrawalsQuery,
  useApproveWithdrawMutation,
  useRejectWithdrawMutation,
} = walletApi;

export const useWallet = () => {
  const { data, isLoading, error } = useGetWalletQuery();
  return { data, isLoading, error };
};

export const useWalletTransactions = () => {
  const { data, isLoading, error } = useGetWalletTransactionsQuery();
  return { data: data ?? [], isLoading, error };
};

export function useTopupWallet() {
  const [trigger, { isLoading }] = useTopupWalletMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRequestWithdraw() {
  const [trigger, { isLoading }] = useRequestWithdrawMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useApproveWithdraw() {
  const [trigger, { isLoading }] = useApproveWithdrawMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRejectWithdraw() {
  const [trigger, { isLoading }] = useRejectWithdrawMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export const useAdminWithdrawals = (status?: string) => {
  const { data, isLoading, error, refetch } = useListWithdrawalsQuery(status);
  return { data: data ?? [], isLoading, error, refetch };
};
