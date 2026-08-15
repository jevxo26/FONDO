"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UploadCloud, IdCard, CreditCard, X, FileText } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";

interface Props {
    register: UseFormRegister<RiderFormData>;
    errors: FieldErrors<RiderFormData>;
    setValue: UseFormSetValue<RiderFormData>;
    watch: UseFormWatch<RiderFormData>;
}

export function DocumentUploadInfo({ errors, setValue, watch }: Props) {
    const formValues = watch();

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof RiderFormData
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file as unknown as string, { shouldValidate: true, shouldDirty: true });
        }
    };

    const handleRemoveFile = (fieldName: keyof RiderFormData) => {
        setValue(fieldName, "" as unknown as string, { shouldValidate: true, shouldDirty: true });
    };

    const renderUploadBox = (id: keyof RiderFormData, label: string) => {
        const rawValue = formValues[id];
        const file = rawValue instanceof File ? rawValue : null;
        const isImage = file?.type.startsWith("image/");
        const previewUrl = file ? URL.createObjectURL(file) : null;
        const error = errors[id];

        return (
            <FormField label={label} error={error} required>
                <div className="relative border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl p-4 text-center bg-background/50 flex flex-col items-center justify-center min-h-[140px] group overflow-hidden">
                    {previewUrl ? (
                        <div className="relative w-full h-full min-h-[120px] flex flex-col items-center justify-center gap-2">
                            {isImage ? (
                                <img
                                    src={previewUrl}
                                    alt={label}
                                    className="w-full h-24 object-cover rounded-xl border border-border"
                                />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-xl w-full justify-center">
                                    <FileText className="size-6 text-primary" />
                                    <span className="text-xs text-foreground font-medium truncate max-w-[150px]">
                                        {file?.name}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between w-full px-1">
                                {isImage && (
                                    <span className="text-xs text-foreground font-medium truncate max-w-[140px]">
                                        {file?.name}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(id)}
                                    className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer z-20 ml-auto"
                                >
                                    <X className="size-4" /> Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, application/pdf"
                                onChange={(e) => handleFileChange(e, id)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="space-y-1 pointer-events-none">
                                <UploadCloud className="size-6 text-muted-foreground group-hover:text-primary transition-colors mx-auto" />
                                <p className="text-xs font-semibold text-foreground">Click or drag to upload</p>
                                <p className="text-[10px] text-muted-foreground">PNG, JPG or PDF (max 5MB)</p>
                            </div>
                        </>
                    )}
                </div>
            </FormField>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border pb-3">
                <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
                    06
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                    <UploadCloud className="size-5 text-foreground" /> ID & License Uploads
                </h3>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                    <IdCard className="size-4 text-primary" /> National ID Card (NID)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderUploadBox("nidFront", "NID Front Side")}
                    {renderUploadBox("nidBack", "NID Back Side")}
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                    <CreditCard className="size-4 text-primary" /> Driving License
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderUploadBox("licenseFront", "License Front")}
                    {renderUploadBox("licenseBack", "License Back")}
                </div>
            </div>
        </div>
    );
}