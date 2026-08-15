"use client";

import {
  ShoppingBag,
  Truck,
  Wallet,
  Heart,
  MapPin,
  UserCog,
  ShieldCheck,
  Bell,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/common/section-reveal";
import { SectionHeader } from "@/components/common/section-header";

interface Tile {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const TILES: Tile[] = [
  {
    label: "Order History",
    description: "Review and track past orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    label: "Track Order",
    description: "Follow your delivery live",
    href: "/track-order",
    icon: Truck,
  },
  {
    label: "My Wallet",
    description: "Balance, top-up & transactions",
    href: "/wallet",
    icon: Wallet,
  },
  {
    label: "Wishlist",
    description: "Foods you've saved for later",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Delivery Addresses",
    description: "Manage your saved addresses",
    href: "/addresses",
    icon: MapPin,
  },
  {
    label: "Profile Settings",
    description: "Personal info, avatar & preferences",
    href: "/settings",
    icon: UserCog,
  },
  {
    label: "Security",
    description: "Password, devices & login activity",
    href: "/security",
    icon: ShieldCheck,
  },
  {
    label: "Notifications",
    description: "Alerts & notification preferences",
    href: "/notifications",
    icon: Bell,
  },
];

export function AccountTiles() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Your Account"
        description="Everything you need, one tap away"
      />
      <SectionReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger>
        {TILES.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-5 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-card-title font-semibold text-foreground">
                  {label}
                </h3>
                <p className="mt-1 text-small text-muted-foreground">{description}</p>
              </div>
              <span className="flex items-center gap-1 text-badge font-bold uppercase tracking-wider text-primary">
                Open
                <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </SectionReveal>
    </section>
  );
}
