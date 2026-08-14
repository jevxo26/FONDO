"use client";

import { UserCheck, ShieldCheck, Clock, ChevronRight } from "lucide-react";

export interface OwnerContact {
    ownerName: string;
    designation: string;
    primaryPhone: string;
    emailAddress: string;
    nidNumber: string;
    emergencyContact: string;
}

export const mockOwnerContact: OwnerContact = {
    ownerName: "Tariqul Islam Chowdhury",
    designation: "Managing Director",
    primaryPhone: "+880 1711-902834",
    emailAddress: "tariqul@gourmetkitchen.bd",
    nidNumber: "19882619203948123",
    emergencyContact: "+880 1819-223344 (General Manager)",
};

export function OwnerContactCard({ isVerified, onOpenModal }: { isVerified: boolean; onOpenModal: () => void }) {
    return (
        <div
            onClick={onOpenModal}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/40 active:scale-[0.98]"
        >
            <div className={`absolute left-0 top-0 h-full w-1.5 ${isVerified ? "bg-emerald-500" : "bg-gradient-to-b from-primary to-primary/40"}`} />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="flex items-start justify-between pl-2">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <UserCheck className="size-5" />
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
                    Owner & Representative
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">Contact details, director identity, and phone numbers.</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pl-2">
                <span>Inspect Section</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function OwnerModalContent({ data }: { data: OwnerContact }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailBlock label="Owner Name" value={data.ownerName} />
            <DetailBlock label="Designation" value={data.designation} />
            <DetailBlock label="Primary Phone" value={data.primaryPhone} />
            <DetailBlock label="Email Address" value={data.emailAddress} />
            <DetailBlock label="National ID (NID)" value={data.nidNumber} />
            <DetailBlock label="Emergency / Manager Phone" value={data.emergencyContact} />
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