import React from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Utensils, UploadCloud } from "lucide-react";
import { VendorFormData } from "@/lib/schema/vendor-schema";
import { FormField } from "@/components/common/form-field";
import { CUISINE_OPTIONS } from "./hero";

interface Props {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
  selectedCuisines: string[];
  setValue: UseFormSetValue<VendorFormData>;
}

export function CuisineDocInfo({ register, errors, selectedCuisines, setValue }: Props) {
  const toggleCuisine = (item: string) => {
    const updated = selectedCuisines.includes(item)
      ? selectedCuisines.filter((c) => c !== item)
      : [...selectedCuisines, item];
    setValue("cuisines", updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-12">
      {/* Cuisine Categories */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Utensils className="size-5 text-primary" /> Cuisine Categories
          </h3>
        </div>
        <FormField label="Select Health & Meal Categories" error={errors.cuisines} required>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {CUISINE_OPTIONS.map((item) => {
              const isSelected = selectedCuisines.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleCuisine(item)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`}
                >
                  {item} {isSelected && "✓"}
                </button>
              );
            })}
          </div>
        </FormField>
      </div>

      {/* Documents */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            06
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <UploadCloud className="size-5 text-primary" /> Business Documents
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Trade License No." error={errors.tradeLicenseNumber} required>
            <input
              {...register("tradeLicenseNumber")}
              type="text"
              placeholder="License Registration No."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="TIN Certificate No." error={errors.tinNumber} required>
            <input
              {...register("tinNumber")}
              type="text"
              placeholder="Tax Identification No."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Food Safety License" error={errors.foodLicenseNumber} required>
            <input
              {...register("foodLicenseNumber")}
              type="text"
              placeholder="BSTI / Food Safety Registration"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="VAT Registration (Optional)" error={errors.vatNumber}>
            <input
              {...register("vatNumber")}
              type="text"
              placeholder="BIN / VAT No."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
        </div>
        <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-2 bg-background/50">
          <UploadCloud className="size-8 text-primary mx-auto" />
          <p className="text-xs font-bold text-foreground">
            Drag & drop document scans (Trade License, NID, Photos)
          </p>
          <p className="text-[10px] text-muted-foreground">PDF, PNG, JPG up to 10MB each</p>
        </div>
      </div>
    </div>
  );
}
