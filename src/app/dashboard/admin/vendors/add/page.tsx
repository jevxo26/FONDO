"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Store, CheckCircle2, XCircle, Clock, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import Swal from "sweetalert2";
import { BusinessInfoCard, BusinessModalContent, mockBusinessInfo } from "@/components/dashboard/admin/vendors/add/business-info";
import { LegalDocumentsCard, LegalModalContent, mockLegalDocuments } from "@/components/dashboard/admin/vendors/add/legal-document";
import { mockStoreDetails, StoreDetailsCard, StoreModalContent } from "@/components/dashboard/admin/vendors/add/store-details";
import { BankModalContent, BankSettlementCard, mockBankSettlement } from "@/components/dashboard/admin/vendors/add/bank-settlement";
import { mockOwnerContact, OwnerContactCard, OwnerModalContent } from "@/components/dashboard/admin/vendors/add/owner-contact";
import { PdfViewerModal } from "@/components/dashboard/admin/vendors/add/vendor-modal";

type ActiveCategory = "business" | "legal" | "store" | "bank" | "owner" | null;
type VendorStatus = "Pending Verification" | "Approved" | "Rejected";

export default function AdminAddVendorPage() {
    const [vendorStatus, setVendorStatus] = useState<VendorStatus>("Pending Verification");
    const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);
    const [pdfPreview, setPdfPreview] = useState<{ title: string; url: string } | null>(null);

    const [verifiedSections, setVerifiedSections] = useState<Record<string, boolean>>({
        business: true,
        legal: false,
        store: true,
        bank: true,
        owner: false,
    });

    const toggleSectionVerification = (key: string) => {
        setVerifiedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleApproveVendor = () => {
        Swal.fire({
            title: "Approve Merchant Merchant?",
            text: `Confirm onboarding ${mockBusinessInfo.businessName} onto the active FONDO platform?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "var(--primary)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Approve & Activate",
            cancelButtonText: "Cancel",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
                setVendorStatus("Approved");
                Swal.fire({
                    title: "Merchant Onboarded!",
                    text: `${mockBusinessInfo.businessName} is now active on FONDO.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: "rounded-3xl font-sans" },
                });
            }
        });
    };

    const handleRejectVendor = () => {
        Swal.fire({
            title: "Reject Merchant Registration",
            text: "State the reason for rejecting this merchant profile:",
            input: "textarea",
            inputPlaceholder: "Reason for rejection...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--destructive)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Reject Merchant",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
                setVendorStatus("Rejected");
                Swal.fire({
                    title: "Registration Rejected",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: "rounded-3xl font-sans" },
                });
            }
        });
    };

    return (
        <div className="space-y-8 pb-16">
            <PageHeader
                title="Review & Approve Vendor"
                description="Verify commercial licenses, store premises, tax identities, and activate restaurant partners."
                icon={Store}
                actions={
                    <div className="flex items-center gap-2.5">
                        <Link href="/dashboard/admin/vendors">
                            <Button variant="outline" className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                                <ArrowLeft className="mr-1.5 size-4" />
                                Back to Vendors
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleRejectVendor}
                            disabled={vendorStatus === "Rejected"}
                            className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
                        >
                            <XCircle className="mr-1.5 size-4" />
                            Reject
                        </Button>
                        <Button
                            onClick={handleApproveVendor}
                            disabled={vendorStatus === "Approved"}
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer font-medium"
                        >
                            <CheckCircle2 className="mr-1.5 size-4" />
                            {vendorStatus === "Approved" ? "Vendor Activated" : "Approve & Onboard"}
                        </Button>
                    </div>
                }
            />

            {/* Header Banner Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border">
                <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative size-20 overflow-hidden rounded-2xl ring-2 ring-primary/20 shadow-sm">
                            <Image src={mockBusinessInfo.logoUrl} alt={mockBusinessInfo.businessName} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">{mockBusinessInfo.businessName}</h2>
                                {vendorStatus === "Approved" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
                                        <CheckCircle2 className="size-3" /> ACTIVE MERCHANT
                                    </span>
                                )}
                                {vendorStatus === "Pending Verification" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20">
                                        <Clock className="size-3" /> PENDING REVIEW
                                    </span>
                                )}
                                {vendorStatus === "Rejected" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-[11px] font-semibold text-destructive ring-1 ring-destructive/20">
                                        <XCircle className="size-3" /> REJECTED
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Category: <span className="font-medium text-foreground">{mockBusinessInfo.businessCategory}</span> • Trade Lic: <span className="font-medium text-foreground">{mockBusinessInfo.tradeLicenseNo}</span>
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-card/80 p-4 ring-1 ring-border/80 min-w-[160px]">
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary to-primary/60" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Compliance Score</p>
                        <p className="font-heading text-[28px] font-bold leading-tight tracking-tight text-primary">
                            {Object.values(verifiedSections).filter(Boolean).length} / {Object.keys(verifiedSections).length} <span className="text-xs font-normal text-muted-foreground">Checked</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid of Modular Inspection Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <BusinessInfoCard isVerified={verifiedSections.business} onOpenModal={() => setActiveCategory("business")} />
                <LegalDocumentsCard isVerified={verifiedSections.legal} onOpenModal={() => setActiveCategory("legal")} />
                <StoreDetailsCard isVerified={verifiedSections.store} onOpenModal={() => setActiveCategory("store")} />
                <BankSettlementCard isVerified={verifiedSections.bank} onOpenModal={() => setActiveCategory("bank")} />
                <OwnerContactCard isVerified={verifiedSections.owner} onOpenModal={() => setActiveCategory("owner")} />
            </div>

            {/* Inspection Modal Overlay */}
            {activeCategory && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)] ring-1 ring-border md:p-8">
                        <div className="flex items-center justify-between border-b border-border/60 pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Sparkles className="size-4" />
                                </div>
                                <h3 className="font-heading text-xl font-bold capitalize text-foreground">{activeCategory} Inspection</h3>
                            </div>
                            <button onClick={() => setActiveCategory(null)} className="rounded-full p-2 text-muted-foreground hover:bg-muted cursor-pointer">
                                <XCircle className="size-6" />
                            </button>
                        </div>

                        <div className="mt-6">
                            {activeCategory === "business" && <BusinessModalContent data={mockBusinessInfo} />}
                            {activeCategory === "legal" && (
                                <LegalModalContent
                                    data={mockLegalDocuments}
                                    businessName={mockBusinessInfo.businessName}
                                    onOpenPdf={(title, url) => setPdfPreview({ title, url })}
                                />
                            )}
                            {activeCategory === "store" && <StoreModalContent data={mockStoreDetails} />}
                            {activeCategory === "bank" && <BankModalContent data={mockBankSettlement} />}
                            {activeCategory === "owner" && <OwnerModalContent data={mockOwnerContact} />}
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
                            <Button
                                variant={verifiedSections[activeCategory] ? "outline" : "default"}
                                onClick={() => {
                                    toggleSectionVerification(activeCategory);
                                    setActiveCategory(null);
                                }}
                                className="rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                            >
                                {verifiedSections[activeCategory] ? (
                                    <>
                                        <XCircle className="mr-1.5 size-4 text-destructive" /> Mark Unverified
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-1.5 size-4 text-emerald-600" /> Mark Verified
                                    </>
                                )}
                            </Button>
                            <Button variant="secondary" onClick={() => setActiveCategory(null)} className="rounded-full cursor-pointer">
                                Close View
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Document Preview Layer */}
            <PdfViewerModal pdfPreview={pdfPreview} onClose={() => setPdfPreview(null)} />
        </div>
    );
}