"use client";

import { FileText, XCircle } from "lucide-react";

interface PdfViewerModalProps {
    pdfPreview: { title: string; url: string } | null;
    onClose: () => void;
}

export function PdfViewerModal({ pdfPreview, onClose }: PdfViewerModalProps) {
    if (!pdfPreview) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
            <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-3xl bg-card p-6 shadow-[var(--shadow-elevated)] ring-1 ring-border">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        <h3 className="font-heading text-lg font-bold text-foreground">{pdfPreview.title}</h3>
                    </div>
                    <button
                        onClick={onClose}
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
    );
}