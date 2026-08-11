"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    User,
    FileText,
    Bike,
    CreditCard,
    PhoneCall,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowLeft,
    Eye,
    FileCheck,
    ShieldCheck,
    ChevronRight,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/common/page-header";
import Swal from "sweetalert2";

export interface RiderApplicationData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        alternatePhone: string;
        dateOfBirth: string;
        gender: string;
        address: string;
        city: string;
        postalCode: string;
        profilePhoto: string;
    };
    documents: {
        nidFront: string;
        nidBack: string;
        drivingLicenseFront: string;
        drivingLicenseBack: string;
        policeClearancePdf: string;
        contractAgreementPdf: string;
    };
    vehicleInfo: {
        vehicleType: string;
        brandModel: string;
        registrationNumber: string;
        registrationTaxTokenPdf: string;
        vehiclePhoto: string;
    };
    bankingInfo: {
        bankName: string;
        accountHolder: string;
        accountNumber: string;
        branchName: string;
        routingNumber: string;
    };
    emergencyContact: {
        contactName: string;
        relationship: string;
        phone: string;
        address: string;
    };
}

const initialRiderData: RiderApplicationData = {
    personalInfo: {
        fullName: "Rahim Uddin",
        email: "rahim.uddin@fondo.com",
        phone: "+880 1712-345678",
        alternatePhone: "+880 1812-987654",
        dateOfBirth: "1996-08-15",
        gender: "Male",
        address: "House 45, Road 12, Block B, Mirpur 10",
        city: "Dhaka",
        postalCode: "1216",
        profilePhoto:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    },
    documents: {
        nidFront:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        nidBack:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        drivingLicenseFront:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
        drivingLicenseBack:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
        policeClearancePdf: "/sample-police-clearance.pdf",
        contractAgreementPdf: "/sample-rider-contract.pdf",
    },
    vehicleInfo: {
        vehicleType: "Motorcycle (150cc)",
        brandModel: "Yamaha FZ-S V3",
        registrationNumber: "DHAKA-METRO-LA-12-3456",
        registrationTaxTokenPdf: "/sample-vehicle-tax-token.pdf",
        vehiclePhoto:
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600",
    },
    bankingInfo: {
        bankName: "Dutch-Bangla Bank PLC",
        accountHolder: "Rahim Uddin",
        accountNumber: "154.120.987654",
        branchName: "Mirpur Branch",
        routingNumber: "090262431",
    },
    emergencyContact: {
        contactName: "Sultana Begum",
        relationship: "Spouse",
        phone: "+880 1912-112233",
        address: "House 45, Road 12, Block B, Mirpur 10, Dhaka",
    },
};

type ActiveModalCategory =
    | "personal"
    | "documents"
    | "vehicle"
    | "banking"
    | "emergency"
    | null;

export default function AdminAddRiderPage() {
    const [riderData] = useState<RiderApplicationData>(initialRiderData);
    const [activeCategory, setActiveCategory] = useState<ActiveModalCategory>(null);
    const [pdfPreview, setPdfPreview] = useState<{ title: string; url: string } | null>(null);

    const [verifiedSections, setVerifiedSections] = useState<Record<string, boolean>>({
        personal: true,
        documents: false,
        vehicle: false,
        banking: true,
        emergency: true,
    });

    const toggleSectionVerification = (sectionKey: string) => {
        setVerifiedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
    };

    // Client-Side PDF Generator without external blob-stream
    const handleViewPdfKitDocument = async (title: string, samplePath: string) => {
        try {
            const PDFDocument = (await import("pdfkit/js/pdfkit.standalone")).default;
            const doc = new PDFDocument({ margin: 50 });
            const chunks: Uint8Array[] = [];

            doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
            doc.on("end", () => {
                const blob = new Blob(chunks, { type: "application/pdf" });
                const blobUrl = URL.createObjectURL(blob);
                setPdfPreview({ title, url: blobUrl });
            });

            doc.fontSize(20).text("FONDO - RIDER VERIFICATION DOCUMENT", { align: "center" });
            doc.moveDown();
            doc.fontSize(14).text(`Document Title: ${title}`, { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(10).text(`Rider Name: ${riderData.personalInfo.fullName}`);
            doc.text(`Timestamp: ${new Date().toLocaleString()}`);
            doc.text(`Source Reference: ${samplePath}`);
            doc.moveDown();
            doc.text("Verification Result: PassedFONDO Operations Review.");
            doc.end();
        } catch (err) {
            console.error("PDF generation fallback:", err);
            setPdfPreview({ title, url: samplePath });
        }
    };

    const handleApproveRider = () => {
        Swal.fire({
            title: "Approve Rider Application?",
            text: `Confirm onboarding ${riderData.personalInfo.fullName} into the active FONDO fleet?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "var(--primary)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Approve & Onboard",
            cancelButtonText: "Cancel",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Rider Approved!",
                    text: `${riderData.personalInfo.fullName} is now active.`,
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
            text: "Provide rejection reason for the applicant:",
            input: "textarea",
            inputPlaceholder: "Type notes (e.g., Unclear driving license scan)...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--destructive)",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Reject",
            customClass: { popup: "rounded-3xl font-sans" },
        }).then((result) => {
            if (result.isConfirmed) {
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
            {/* Header */}
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
                            className="rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
                        >
                            <XCircle className="mr-1.5 size-4" />
                            Reject Application
                        </Button>
                        <Button
                            onClick={handleApproveRider}
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer font-medium"
                        >
                            <CheckCircle2 className="mr-1.5 size-4" />
                            Approve & Onboard
                        </Button>
                    </div>
                }
            />

            {/* FONDO Premium Profile Overview Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border">
                {/* Ambient Depth Orbs */}
                <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
                <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />

                {/* Diamond Corner Accent */}
                <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative size-20 overflow-hidden rounded-2xl ring-2 ring-primary/20 shadow-sm">
                            <Image
                                src={riderData.personalInfo.profilePhoto}
                                alt={riderData.personalInfo.fullName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                                    {riderData.personalInfo.fullName}
                                </h2>
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20">
                                    <Clock className="size-3" /> PENDING REVIEW
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Phone: <span className="font-medium text-foreground">{riderData.personalInfo.phone}</span> • Email: <span className="font-medium text-foreground">{riderData.personalInfo.email}</span>
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-card/80 p-4 ring-1 ring-border/80 min-w-[160px]">
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary to-primary/60" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification Score</p>
                        <p className="font-heading text-[28px] font-bold leading-tight tracking-tight text-primary">
                            {Object.values(verifiedSections).filter(Boolean).length} / {Object.keys(verifiedSections).length} <span className="text-xs font-normal text-muted-foreground">Verified</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* INTERACTIVE FONDO CARDS GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FONDOSectionCard
                    title="Personal Information"
                    description="Full identity details, primary address, and phone numbers."
                    icon={User}
                    isVerified={verifiedSections.personal}
                    onClick={() => setActiveCategory("personal")}
                />

                <FONDOSectionCard
                    title="Submitted Documents"
                    description="NID front/back, Driving license, and clearance certificate PDFs."
                    icon={FileText}
                    isVerified={verifiedSections.documents}
                    onClick={() => setActiveCategory("documents")}
                />

                <FONDOSectionCard
                    title="Vehicle & Registration"
                    description="Model details, vehicle photo, and tax token PDF."
                    icon={Bike}
                    isVerified={verifiedSections.vehicle}
                    onClick={() => setActiveCategory("vehicle")}
                />

                <FONDOSectionCard
                    title="Banking & Payout"
                    description="Bank title, account details, and routing codes."
                    icon={CreditCard}
                    isVerified={verifiedSections.banking}
                    onClick={() => setActiveCategory("banking")}
                />

                <FONDOSectionCard
                    title="Emergency Contact"
                    description="Primary kin details, address, and mobile number."
                    icon={PhoneCall}
                    isVerified={verifiedSections.emergency}
                    onClick={() => setActiveCategory("emergency")}
                />
            </div>

            {/* HIGHER Z-INDEX MODAL (z-[100] TO OVERLAY HEADER & SIDEBAR) */}
            {activeCategory && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)] ring-1 ring-border md:p-8">

                        {/* Diamond Corner */}
                        <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/40" />

                        <div className="flex items-center justify-between border-b border-border/60 pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Sparkles className="size-4" />
                                </div>
                                <h3 className="font-heading text-xl font-bold capitalize text-foreground">
                                    {activeCategory} Verification
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveCategory(null)}
                                className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                            >
                                <XCircle className="size-6" />
                            </button>
                        </div>

                        <div className="mt-6 space-y-6">
                            {/* Personal Modal */}
                            {activeCategory === "personal" && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <DetailBlock label="Full Name" value={riderData.personalInfo.fullName} />
                                    <DetailBlock label="Email" value={riderData.personalInfo.email} />
                                    <DetailBlock label="Primary Phone" value={riderData.personalInfo.phone} />
                                    <DetailBlock label="Alternate Phone" value={riderData.personalInfo.alternatePhone} />
                                    <DetailBlock label="Date of Birth" value={riderData.personalInfo.dateOfBirth} />
                                    <DetailBlock label="Gender" value={riderData.personalInfo.gender} />
                                    <DetailBlock label="Address" value={riderData.personalInfo.address} />
                                    <DetailBlock label="City / Postal Code" value={`${riderData.personalInfo.city} - ${riderData.personalInfo.postalCode}`} />
                                </div>
                            )}

                            {/* Documents Modal */}
                            {activeCategory === "documents" && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                            <FileCheck className="size-4 text-primary" /> National ID Card (NID)
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <ImagePreviewCard label="NID Front Side" src={riderData.documents.nidFront} />
                                            <ImagePreviewCard label="NID Back Side" src={riderData.documents.nidBack} />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

                                    <div>
                                        <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                            <FileCheck className="size-4 text-primary" /> Driving License
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <ImagePreviewCard label="License Front" src={riderData.documents.drivingLicenseFront} />
                                            <ImagePreviewCard label="License Back" src={riderData.documents.drivingLicenseBack} />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

                                    <div>
                                        <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                            <FileText className="size-4 text-primary" /> PDF Documents
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <PdfDocCard
                                                title="Police Clearance Certificate"
                                                onInspect={() =>
                                                    handleViewPdfKitDocument("Police Clearance Certificate", riderData.documents.policeClearancePdf)
                                                }
                                            />
                                            <PdfDocCard
                                                title="Contract Agreement Document"
                                                onInspect={() =>
                                                    handleViewPdfKitDocument("Rider Contract Agreement", riderData.documents.contractAgreementPdf)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Vehicle Modal */}
                            {activeCategory === "vehicle" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <DetailBlock label="Vehicle Type" value={riderData.vehicleInfo.vehicleType} />
                                        <DetailBlock label="Brand & Model" value={riderData.vehicleInfo.brandModel} />
                                        <DetailBlock label="Registration Number" value={riderData.vehicleInfo.registrationNumber} />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <ImagePreviewCard label="Vehicle Photo" src={riderData.vehicleInfo.vehiclePhoto} />
                                        <PdfDocCard
                                            title="Tax Token PDF"
                                            onInspect={() =>
                                                handleViewPdfKitDocument("Registration Tax Token", riderData.vehicleInfo.registrationTaxTokenPdf)
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Banking Modal */}
                            {activeCategory === "banking" && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <DetailBlock label="Bank Name" value={riderData.bankingInfo.bankName} />
                                    <DetailBlock label="Account Holder" value={riderData.bankingInfo.accountHolder} />
                                    <DetailBlock label="Account Number" value={riderData.bankingInfo.accountNumber} />
                                    <DetailBlock label="Branch Name" value={riderData.bankingInfo.branchName} />
                                    <DetailBlock label="Routing Number" value={riderData.bankingInfo.routingNumber} />
                                </div>
                            )}

                            {/* Emergency Modal */}
                            {activeCategory === "emergency" && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <DetailBlock label="Contact Name" value={riderData.emergencyContact.contactName} />
                                    <DetailBlock label="Relationship" value={riderData.emergencyContact.relationship} />
                                    <DetailBlock label="Phone" value={riderData.emergencyContact.phone} />
                                    <DetailBlock label="Address" value={riderData.emergencyContact.address} />
                                </div>
                            )}
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

            {/* PDF VIEWER MODAL WITH z-[110] STACKING */}
            {pdfPreview && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
                    <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)] ring-1 ring-border">
                        <div className="flex items-center justify-between border-b border-border/60 pb-3">
                            <div className="flex items-center gap-2">
                                <FileText className="size-5 text-primary" />
                                <h3 className="font-heading text-lg font-bold text-foreground">{pdfPreview.title}</h3>
                            </div>
                            <button
                                onClick={() => setPdfPreview(null)}
                                className="rounded-full p-2 text-muted-foreground hover:bg-muted cursor-pointer"
                            >
                                <XCircle className="size-6" />
                            </button>
                        </div>
                        <div className="mt-4 flex-1 overflow-hidden rounded-2xl bg-muted/60">
                            <iframe src={pdfPreview.url} className="size-full border-none" title={pdfPreview.title} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// FONDO Reusable UI Components
function FONDOSectionCard({
    title,
    description,
    icon: Icon,
    isVerified,
    onClick,
}: {
    title: string;
    description: string;
    icon: any;
    isVerified: boolean;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:ring-primary/40 active:scale-[0.98]"
        >
            {/* Accent Bar */}
            <div className={`absolute left-0 top-0 h-full w-1.5 ${isVerified ? "bg-emerald-500" : "bg-gradient-to-b from-primary to-primary/40"}`} />

            {/* Diamond Corner */}
            <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />

            <div className="flex items-start justify-between pl-2">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
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
                    {title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pl-2">
                <span>Inspect Section</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
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

function ImagePreviewCard({ label, src }: { label: string; src: string }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-secondary/50 p-3 ring-1 ring-border/50">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
            <div className="relative h-44 w-full overflow-hidden rounded-xl bg-background">
                <Image src={src} alt={label} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
        </div>
    );
}

function PdfDocCard({ title, onInspect }: { title: string; onInspect: () => void }) {
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