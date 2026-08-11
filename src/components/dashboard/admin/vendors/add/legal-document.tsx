"use client";

import Image from "next/image";
import { FileText, ShieldCheck, Clock, ChevronRight, FileCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LegalDocuments {
    tradeLicenseImage: string;
    nidOwnerFront: string;
    nidOwnerBack: string;
    foodSafetyCertPdf: string;
    partnershipDeedPdf: string;
}

export const mockLegalDocuments: LegalDocuments = {
    tradeLicenseImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    nidOwnerFront: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    nidOwnerBack: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    foodSafetyCertPdf: "/sample-food-safety.pdf",
    partnershipDeedPdf: "/sample-vendor-deed.pdf",
};

export function LegalDocumentsCard({ isVerified, onOpenModal }: { isVerified: boolean; onOpenModal: () => void }) {
    return (
        <div
            onClick={onOpenModal}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/40 active:scale-[0.98]"
        >
            <div className={`absolute left-0 top-0 h-full w-1.5 ${isVerified ? "bg-emerald-500" : "bg-gradient-to-b from-primary to-primary/40"}`} />
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="flex items-start justify-between pl-2">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
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
                    Legal Documents
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">Trade License, NIDs, Food Safety License, & Deeds.</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pl-2">
                <span>Inspect Section</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function LegalModalContent({
    data,
    businessName,
    onOpenPdf,
}: {
    data: LegalDocuments;
    businessName: string;
    onOpenPdf: (title: string, url: string) => void;
}) {
    const handleGeneratePdf = async (title: string, samplePath: string) => {
        try {
            const PDFDocument = (await import("pdfkit/js/pdfkit.standalone")).default;
            const doc = new PDFDocument({ margin: 50 });
            const chunks: Uint8Array[] = [];

            doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
            doc.on("end", () => {
                const blob = new Blob(chunks, { type: "application/pdf" });
                onOpenPdf(title, URL.createObjectURL(blob));
            });

            doc.fontSize(20).text("FONDO - VENDOR LEGAL CERTIFICATION", { align: "center" });
            doc.moveDown();
            doc.fontSize(14).text(`Document: ${title}`, { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(10).text(`Business Entity: ${businessName}`);
            doc.text(`Timestamp: ${new Date().toLocaleString()}`);
            doc.text(`Source Reference: ${samplePath}`);
            doc.moveDown();
            doc.text("Status: Cleared FONDO Compliance Audit.");
            doc.end();
        } catch {
            onOpenPdf(title, samplePath);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileCheck className="size-4 text-primary" /> Trade License & Owner NID
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <ImageCard label="Trade License Document" src={data.tradeLicenseImage} />
                    <ImageCard label="Owner NID Front" src={data.nidOwnerFront} />
                    <ImageCard label="Owner NID Back" src={data.nidOwnerBack} />
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

            <div>
                <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="size-4 text-primary" /> Compliance PDFs
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <PdfCard
                        title="Food Safety & Hygiene Certificate"
                        onInspect={() => handleGeneratePdf("Food Safety Certificate", data.foodSafetyCertPdf)}
                    />
                    <PdfCard
                        title="Vendor Merchant Partnership Agreement"
                        onInspect={() => handleGeneratePdf("Merchant Agreement", data.partnershipDeedPdf)}
                    />
                </div>
            </div>
        </div>
    );
}

function ImageCard({ label, src }: { label: string; src: string }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-secondary/50 p-3 ring-1 ring-border/50">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-background">
                <Image src={src} alt={label} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
        </div>
    );
}

function PdfCard({ title, onInspect }: { title: string; onInspect: () => void }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-secondary/50 p-4 ring-1 ring-border/50">
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                </div>
                <div>
                    <p className="text-xs font-bold text-foreground">{title}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">PDF Document</p>
                </div>
            </div>
            <Button size="sm" variant="outline" onClick={onInspect} className="rounded-full text-xs cursor-pointer">
                <Eye className="mr-1 size-3.5" /> View
            </Button>
        </div>
    );
}