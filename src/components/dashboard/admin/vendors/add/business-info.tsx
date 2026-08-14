"use client";

import { Building2, ShieldCheck, Clock, ChevronRight } from "lucide-react";

export interface BusinessInfo {
    businessName: string;
    businessCategory: string;
    tradeLicenseNo: string;
    tinNumber: string;
    vatRegistrationNo: string;
    yearEstablished: string;
    businessAddress: string;
    city: string;
    logoUrl: string;
}

export const mockBusinessInfo: BusinessInfo = {
    businessName: "Gourmet Heritage Kitchen",
    businessCategory: "Restaurant & Catering",
    tradeLicenseNo: "TRAD/DNCC/012984/2023",
    tinNumber: "7849-1029-3847",
    vatRegistrationNo: "VAT-BIN-002938471",
    yearEstablished: "2018",
    businessAddress: "House 14, Road 8, Block D, Banani",
    city: "Dhaka",
    logoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
};

export function BusinessInfoCard({ isVerified, onOpenModal }: { isVerified: boolean; onOpenModal: () => void }) {
    return (
        <div
            onClick={onOpenModal}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/40 active:scale-[0.98]"
        >
            <div className={`absolute left-0 top-0 h-full w-1.5 ${isVerified ? "bg-emerald-500" : "bg-gradient-to-b from-primary to-primary/40"}`} />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="flex items-start justify-between pl-2">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Building2 className="size-5" />
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
                    Business Profile
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">Entity registration, trade license, TIN, and address.</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pl-2">
                <span>Inspect Section</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function BusinessModalContent({ data }: { data: BusinessInfo }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailBlock label="Business Name" value={data.businessName} />
            <DetailBlock label="Category" value={data.businessCategory} />
            <DetailBlock label="Trade License No." value={data.tradeLicenseNo} />
            <DetailBlock label="TIN Number" value={data.tinNumber} />
            <DetailBlock label="VAT BIN No." value={data.vatRegistrationNo} />
            <DetailBlock label="Established Year" value={data.yearEstablished} />
            <DetailBlock label="Business Address" value={data.businessAddress} />
            <DetailBlock label="City" value={data.city} />
        </div>
    );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-secondary/50 p-3.5 ring-1 ring-border/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="mt-0.5 font-medium text-foreground text-sm">{value || "N/A"}</p>
        </div>
    );
}