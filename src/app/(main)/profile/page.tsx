"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { useOrders } from "@/store/api/slices/orders-api";
import { useWallet } from "@/store/api/slices/wallet-api";
import { useFavorites } from "@/store/api/slices/favorites-api";
import { useLoyaltyTier } from "@/hooks/use-loyalty-tier";
import { Loader2 } from "lucide-react";
import { ProfileHero } from "@/components/profile/overview/profile-hero";
import { ProfileStats } from "@/components/profile/overview/profile-stats";
import { AccountTiles } from "@/components/profile/overview/account-tiles";
import { RecentOrders } from "@/components/profile/overview/recent-orders";
import { SubscriptionTeaser } from "@/components/profile/overview/subscription-teaser";

export default function ProfilePage() {
  const { loading } = useRequireAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: favorites, isLoading: favoritesLoading } = useFavorites();
  const tier = useLoyaltyTier(orders);

  if (loading) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper space-y-10">
        <ProfileHero tier={tier} />
        <ProfileStats
          orders={orders}
          wallet={wallet}
          favorites={favorites}
          loading={ordersLoading || walletLoading || favoritesLoading}
        />
        <AccountTiles />
        <RecentOrders orders={orders} isLoading={ordersLoading} />
        <SubscriptionTeaser />
      </div>
    </main>
  );
}
