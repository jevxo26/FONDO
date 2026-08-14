"use client";

import Image from "next/image";
import { Store, ShieldCheck, Clock, ChevronRight } from "lucide-react";

export interface StoreDetails {
    storeFrontPhoto: string;
    kitchenBannerPhoto: string;
    operatingHours: string;
    prepTimeMinutes: string;
    cuisineTypes: string;
    estimatedDailyOrders: string;
}

export const mockStoreDetails: StoreDetails = {
    storeFrontPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    kitchenBannerPhoto: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600",
    operatingHours: "10:00 AM - 11:30 PM (Mon-Sun)",
    prepTimeMinutes: "25 - 35 mins",
    cuisineTypes: "Traditional Bengali, Mughlai, Fusion",
    estimatedDailyOrders: "120 - 180 Orders",
};

export function StoreDetailsCard({ isVerified, onOpenModal }: { isVerified: boolean; onOpenModal: () => void }) {
    return (
        <div
            onClick={onOpenModal}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/40 active:scale-[0.98]"
        >
            <div className={`absolute left-0 top-0 h-full w-1.5 ${isVerified ? "bg-emerald-500" : "bg-gradient-to-b from-primary to-primary/40"}`} />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="flex items-start justify-between pl-2">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Store className="size-5" />
                </div>
                {isVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
                        <ShieldCheck className="size-3.5" /> VERIFIED
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20">
                        <Clock className="size-3.5" /> UNCHECKED
                    </span>
                )}
            </div>

            <div className="mt-5 pl-2">
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Store Front & Operations
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">Kitchen photos, prep times, hours, and cuisine style.</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pl-2">
                <span>Inspect Section</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function StoreModalContent({ data }: { data: StoreDetails }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-secondary/50 p-3.5 ring-1 ring-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Operating Hours</p>
                    <p className="mt-0.5 font-medium text-foreground text-sm">{data.operatingHours}</p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-3.5 ring-1 ring-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg. Prep Time</p>
                    <p className="mt-0.5 font-medium text-foreground text-sm">{data.prepTimeMinutes}</p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-3.5 ring-1 ring-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cuisine Specialties</p>
                    <p className="mt-0.5 font-medium text-foreground text-sm">{data.cuisineTypes}</p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-3.5 ring-1 ring-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Volume</p>
                    <p className="mt-0.5 font-medium text-foreground text-sm">{data.estimatedDailyOrders}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-secondary/50 p-3 ring-1 ring-border/50">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Store Exterior</p>
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-background">
                        <Image src={data.storeFrontPhoto} alt="Store Front" fill className="object-cover" />
                    </div>
                </div>
                <div className="overflow-hidden rounded-2xl bg-secondary/50 p-3 ring-1 ring-border/50">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Kitchen & Assembly Area</p>
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-background">
                        <Image src={data.kitchenBannerPhoto} alt="Kitchen Area" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}