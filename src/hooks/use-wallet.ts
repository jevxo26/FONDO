"use client";

import { toast } from "sonner";
import { useWallet, useWalletTransactions, useTopupWallet, useRequestWithdraw } from "@/store/api/slices/wallet-api";
import { handleApiError } from "@/lib/api-error";
import type { TopupPayload, WithdrawPayload } from "@/types/wallet";

export function useWalletPage() {
  const { data: wallet, isLoading, error } = useWallet();
  const { data: transactions, isLoading: txnsLoading } = useWalletTransactions();
  const topup = useTopupWallet();
  const withdraw = useRequestWithdraw();

  const handleTopup = (payload: TopupPayload) => {
    if (topup.isPending) return;
    topup.mutate(payload, {
      onSuccess: (data) => {
        if (data.gatewayUrl) {
          toast.success("Redirecting to payment gateway...");
          window.location.href = data.gatewayUrl;
        }
      },
      onError: (err) => toast.error(handleApiError(err)),
    });
  };

  const handleWithdraw = (payload: WithdrawPayload) => {
    if (withdraw.isPending) return;
    withdraw.mutate(payload, {
      onSuccess: () => toast.success("Withdrawal request submitted"),
      onError: (err) => toast.error(handleApiError(err)),
    });
  };

  return {
    wallet,
    transactions,
    isLoading: isLoading || txnsLoading,
    error,
    handleTopup,
    handleWithdraw,
    topupPending: topup.isPending,
    withdrawPending: withdraw.isPending,
  };
}
