"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UploadCloud, FileText, CheckCircle2, IdCard, CreditCard } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";

interface Props {
    register: UseFormRegister<RiderFormData>;
    errors: FieldErrors<RiderFormData>;
    setValue?: UseFormSetValue<RiderFormData>;
    watch?: UseFormWatch<RiderFormData>;
}

interface DocumentFieldConfig {
    id: keyof RiderFormData;
    label: string;
}

export function DocumentUploadInfo({ register, errors, setValue }: Props) {
    const [fileNames, setFileNames] = useState<Record<string, string>>({});

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof RiderFormData
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileNames((prev) => ({ ...prev, [fieldName]: file.name }));
            if (setValue) {
                setValue(fieldName, file as unknown as string, { shouldValidate: true });
            }
        }
    };

    const renderUploadBox = (id: keyof RiderFormData, label: string) => {
        const fileName = fileNames[id];
        const error = errors[id];

        return (
            <FormField label={label} error={error} required>
                <div className="relative border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl p-4 text-center bg-background/50 flex flex-col items-center justify-center min-h-[120px] cursor-pointer group">
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        onChange={(e) => handleFileChange(e, id)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {fileName ? (
                        <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm">
                            <CheckCircle2 className="size-5 shrink-0" />
                            <span className="truncate max-w-45">{fileName}</span>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <UploadCloud className="size-6 text-muted-foreground group-hover:text-primary transition-colors mx-auto" />
                            <p className="text-xs font-semibold text-foreground">
                                Click or drag to upload
                            </p>
                            <p className="text-[10px] text-muted-foreground">PNG, JPG or PDF (max 5MB)</p>
                        </div>
                    )}
                </div>
            </FormField>
        );
    };

    return (
        <div className="space-y-8">
            {/* Step Header */}
            <div className="flex items-center gap-3 border-b border-border pb-3">
                <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
                    06
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                    <UploadCloud className="size-5 text-foreground" /> ID & License Uploads
                </h3>
            </div>

            {/* 1. National ID Card (NID) Section */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                    <IdCard className="size-4 text-primary" /> National ID Card (NID)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderUploadBox("nidFront" as keyof RiderFormData, "NID Front Side")}
                    {renderUploadBox("nidBack" as keyof RiderFormData, "NID Back Side")}
                </div>
            </div>

            {/* 2. Driving License Section */}
            <div className="space-y-4 pt-2">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                    <CreditCard className="size-4 text-primary" /> Driving License
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderUploadBox("licenseFront" as keyof RiderFormData, "License Front")}
                    {renderUploadBox("licenseBack" as keyof RiderFormData, "License Back")}
                </div>
            </div>
        </div>
    );
}