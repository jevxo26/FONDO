"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, CheckCircle2, XCircle, Clock, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import Swal from "sweetalert2";
import { mockPersonalInfo, PersonalInfoCard, PersonalInfoModalContent } from "@/components/dashboard/admin/riders/add/personal-info";
import { DocumentsCard, DocumentsModalContent, mockRiderDocuments } from "@/components/dashboard/admin/riders/add/documents-info";
import { mockVehicleInfo, VehicleInfoCard, VehicleModalContent } from "@/components/dashboard/admin/riders/add/vehicle-info";
import { BankingInfoCard, BankingModalContent, mockBankingInfo } from "@/components/dashboard/admin/riders/add/banking-info";
import { EmergencyContactCard, EmergencyModalContent, mockEmergencyContact } from "@/components/dashboard/admin/riders/add/e-contact";
import { PdfViewerModal } from "@/components/dashboard/admin/riders/add/pdf-modal";


type ActiveCategory = "personal" | "documents" | "vehicle" | "banking" | "emergency" | null;
type RiderStatus = "Pending Review" | "Approved" | "Rejected";

export default function AdminAddRiderPage() {
    const [riderStatus, setRiderStatus] = useState<RiderStatus>("Pending Review");
    const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);
    const [pdfPreview, setPdfPreview] = useState<{ title: string; url: string } | null>(null);

    const [verifiedSections, setVerifiedSections] = useState<Record<string, boolean>>({
        personal: true,
        documents: false,
        vehicle: false,
        banking: true,
        emergency: true,
    });

    const toggleSectionVerification = (key: string) => {
        setVerifiedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleApproveRider = () => {
        Swal.fire({
            title: "Approve Rider Application?",
            text: `Confirm onboarding ${mockPersonalInfo.fullName} into the active fleet?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "var(--primary)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Approve & Onboard",
            cancelButtonText: "Cancel",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
                setRiderStatus("Approved");
                Swal.fire({
                    title: "Rider Approved!",
                    text: `${mockPersonalInfo.fullName} is now active.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: "rounded-3xl font-sans" },
                });
            }
        });
    };

    const handleRejectRider = () => {
        Swal.fire({
            title: "Reject Application",
            text: "Provide rejection reason:",
            input: "textarea",
            inputPlaceholder: "Type notes...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--destructive)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Reject",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
                setRiderStatus("Rejected");
                Swal.fire({
                    title: "Application Rejected",
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
                title="Review & Add Rider"
                description="Verify submitted heritage records, legal IDs, and onboard active fleet delivery partners."
                icon={Bike}
                actions={
                    <div className="flex items-center gap-2.5">
                        <Link href="/dashboard/admin/riders">
                            <Button variant="outline" className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
                                <ArrowLeft className="mr-1.5 size-4" />
                                Back to Fleet
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleRejectRider}
                            disabled={riderStatus === "Rejected"}
                            className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
                        >
                            <XCircle className="mr-1.5 size-4" />
                            Reject
                        </Button>
                        <Button
                            onClick={handleApproveRider}
                            disabled={riderStatus === "Approved"}
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer font-medium"
                        >
                            <CheckCircle2 className="mr-1.5 size-4" />
                            {riderStatus === "Approved" ? "Rider Approved" : "Approve & Onboard"}
                        </Button>
                    </div>
                }
            />

            {/* Profile Overview Bar */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border">
                <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative size-20 overflow-hidden rounded-2xl ring-2 ring-primary/20 shadow-sm">
                            <Image src={mockPersonalInfo.profilePhoto} alt={mockPersonalInfo.fullName} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">{mockPersonalInfo.fullName}</h2>
                                {riderStatus === "Approved" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
                                        <CheckCircle2 className="size-3" /> APPROVED
                                    </span>
                                )}
                                {riderStatus === "Pending Review" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20">
                                        <Clock className="size-3" /> PENDING REVIEW
                                    </span>
                                )}
                                {riderStatus === "Rejected" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-[11px] font-semibold text-destructive ring-1 ring-destructive/20">
                                        <XCircle className="size-3" /> REJECTED
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Phone: <span className="font-medium text-foreground">{mockPersonalInfo.phone}</span> • Email: <span className="font-medium text-foreground">{mockPersonalInfo.email}</span>
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-card/80 p-4 ring-1 ring-border/80 min-w-[160px]">
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary to-primary/60" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification Score</p>
                        <p className="font-heading text-[28px] font-bold leading-tight tracking-tight text-primary">
                            {Object.values(verifiedSections).filter(Boolean).length} / {Object.keys(verifiedSections).length} <span className="text-xs font-normal text-muted-foreground">Checked</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid of Modular Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <PersonalInfoCard isVerified={verifiedSections.personal} onOpenModal={() => setActiveCategory("personal")} />
                <DocumentsCard isVerified={verifiedSections.documents} onOpenModal={() => setActiveCategory("documents")} />
                <VehicleInfoCard isVerified={verifiedSections.vehicle} onOpenModal={() => setActiveCategory("vehicle")} />
                <BankingInfoCard isVerified={verifiedSections.banking} onOpenModal={() => setActiveCategory("banking")} />
                <EmergencyContactCard isVerified={verifiedSections.emergency} onOpenModal={() => setActiveCategory("emergency")} />
            </div>

            {/* Modal Wrapper at z-[100] */}
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
                            {activeCategory === "personal" && <PersonalInfoModalContent data={mockPersonalInfo} />}
                            {activeCategory === "documents" && (
                                <DocumentsModalContent
                                    data={mockRiderDocuments}
                                    riderName={mockPersonalInfo.fullName}
                                    onOpenPdf={(title, url) => setPdfPreview({ title, url })}
                                />
                            )}
                            {activeCategory === "vehicle" && (
                                <VehicleModalContent
                                    data={mockVehicleInfo}
                                    riderName={mockPersonalInfo.fullName}
                                    onOpenPdf={(title, url) => setPdfPreview({ title, url })}
                                />
                            )}
                            {activeCategory === "banking" && <BankingModalContent data={mockBankingInfo} />}
                            {activeCategory === "emergency" && <EmergencyModalContent data={mockEmergencyContact} />}
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

            {/* PDF Modal Viewer */}
            <PdfViewerModal pdfPreview={pdfPreview} onClose={() => setPdfPreview(null)} />
        </div>
    );
}