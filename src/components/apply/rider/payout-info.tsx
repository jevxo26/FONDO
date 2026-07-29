import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Wallet, UploadCloud } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";
interface Props {
  register: UseFormRegister<RiderFormData>;
  errors: FieldErrors<RiderFormData>;
}

export function PayoutDocInfo({ register, errors }: Props) {
  return (
    <div className="space-y-12">
      {/* Payout Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            04
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="size-5 text-primary" /> Payout & Wallet Setup
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Payout Method" error={errors.payoutMethod} required>
            <select
              {...register("payoutMethod")}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="bkash">bKash Personal / Merchant</option>
              <option value="nagad">Nagad Wallet</option>
              <option value="rocket">Rocket</option>
              <option value="bank">Direct Bank Transfer</option>
            </select>
          </FormField>

          <FormField label="Mobile Wallet Number" error={errors.mobileWalletNumber} required>
            <input
              {...register("mobileWalletNumber")}
              type="tel"
              placeholder="017XXXXXXXX"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>

          <FormField label="Bank Name (Optional)" error={errors.bankName}>
            <input
              {...register("bankName")}
              type="text"
              placeholder="e.g. Dutch-Bangla Bank"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>

          <FormField label="Bank Account No. (Optional)" error={errors.bankAccountNumber}>
            <input
              {...register("bankAccountNumber")}
              type="text"
              placeholder="Account Number"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
        </div>
      </div>

      {/* Document Upload Placeholder */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            05
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <UploadCloud className="size-5 text-primary" /> ID & License Uploads
          </h3>
        </div>
        <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-2 bg-background/50">
          <UploadCloud className="size-8 text-primary mx-auto" />
          <p className="text-xs font-bold text-foreground">
            Upload NID (Front & Back), Passport Photo, and Driving License
          </p>
          <p className="text-[10px] text-muted-foreground">Formats: PNG, JPG, PDF up to 5MB each</p>
        </div>
      </div>
    </div>
  );
}
