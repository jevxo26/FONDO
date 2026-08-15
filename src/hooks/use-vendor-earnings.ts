"use client";

import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import {
  useVendorWallet,
  useVendorWalletTransactions,
  useVendorSettlements,
} from "@/store/api/slices/vendor-settlement-api";

export function useVendorEarningsPage() {
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const vendorId = vendor?.id ?? "";

  const { data: wallet, isLoading: walletLoading } = useVendorWallet(vendorId);
  const { data: transactions, isLoading: txnsLoading } = useVendorWalletTransactions(vendorId);
  const { data: settlements, isLoading: settleLoading } = useVendorSettlements(vendorId);

  const today = new Date().toDateString();
  const todayEarnings = (settlements ?? [])
    .filter((s) => new Date(s.paymentDate ?? s.createdAt).toDateString() === today)
    .reduce((acc, s) => acc + Number(s.netAmount), 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekEarnings = (settlements ?? [])
    .filter((s) => new Date(s.paymentDate ?? s.createdAt) >= weekAgo)
    .reduce((acc, s) => acc + Number(s.netAmount), 0);

  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const monthEarnings = (settlements ?? [])
    .filter((s) => new Date(s.paymentDate ?? s.createdAt) >= monthAgo)
    .reduce((acc, s) => acc + Number(s.netAmount), 0);

  const pendingSettlements = (settlements ?? [])
    .filter((s) => s.paymentStatus === "pending" || s.paymentStatus === "processing")
    .reduce((acc, s) => acc + Number(s.netAmount), 0);

  const balance = Number(wallet?.balance ?? 0);

  return {
    vendor,
    wallet,
    settlements: settlements ?? [],
    transactions: transactions ?? [],
    todayEarnings,
    weekEarnings,
    monthEarnings,
    pendingSettlements,
    balance,
    isLoading: vendorLoading || walletLoading || txnsLoading || settleLoading,
  };
}
