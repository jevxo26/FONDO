import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Landmark, Truck, ArrowRight } from "lucide-react";
import { VendorFormData } from "@/lib/schema/vendor-schema";
import { FormField } from "@/components/common/form-field";

interface Props {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
  isSubmitting: boolean;
}

export function BankDeliveryTerms({ register, errors, isSubmitting }: Props) {
  return (
    <div className="space-y-12">
      {/* Financials */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            07
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Landmark className="size-5 text-primary" /> Bank & Financial Details
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Bank Name" error={errors.bankName} required>
            <input
              {...register("bankName")}
              type="text"
              placeholder="e.g. City Bank Ltd."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Account Title" error={errors.accountName} required>
            <input
              {...register("accountName")}
              type="text"
              placeholder="Company Name"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Account Number" error={errors.accountNumber} required>
            <input
              {...register("accountNumber")}
              type="text"
              placeholder="0123456789"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Routing Number" error={errors.routingNumber} required>
            <input
              {...register("routingNumber")}
              type="text"
              placeholder="9-digit routing code"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Mobile Wallet Provider" error={errors.mobileBankingProvider} required>
            <select
              {...register("mobileBankingProvider")}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="bkash">bKash Merchant</option>
              <option value="nagad">Nagad Merchant</option>
              <option value="rocket">Rocket</option>
            </select>
          </FormField>
          <FormField label="Mobile Banking Account" error={errors.mobileBankingNumber} required>
            <input
              {...register("mobileBankingNumber")}
              type="tel"
              placeholder="017XXXXXXXX"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormField>
        </div>
      </div>

      {/* Delivery & Terms */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
            08
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Truck className="size-5 text-primary" /> Options & Terms
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background cursor-pointer">
            <input
              {...register("useFondoDelivery")}
              type="checkbox"
              className="size-4 accent-primary"
            />
            <span className="text-xs font-bold text-foreground">Use Fondo Delivery Fleet</span>
          </label>
          <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background cursor-pointer">
            <input
              {...register("selfDelivery")}
              type="checkbox"
              className="size-4 accent-primary"
            />
            <span className="text-xs font-bold text-foreground">Self-Delivery Staff</span>
          </label>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <FormField label="" error={errors.termsAccepted}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register("termsAccepted")}
                type="checkbox"
                className="size-4 accent-primary mt-0.5"
              />
              <span className="text-xs text-muted-foreground font-light">
                I agree to the{" "}
                <strong className="text-foreground">Fondo Merchant Partner Agreement</strong>.
              </span>
            </label>
          </FormField>
          <FormField label="" error={errors.authenticDocsAccepted}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register("authenticDocsAccepted")}
                type="checkbox"
                className="size-4 accent-primary mt-0.5"
              />
              <span className="text-xs text-muted-foreground font-light">
                I confirm that all submitted documents are authentic and legal.
              </span>
            </label>
          </FormField>
          <FormField label="" error={errors.policiesAccepted}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register("policiesAccepted")}
                type="checkbox"
                className="size-4 accent-primary mt-0.5"
              />
              <span className="text-xs text-muted-foreground font-light">
                I accept Fondo hygiene standards and payout schedules.
              </span>
            </label>
          </FormField>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[var(--shadow-elevated)] disabled:opacity-50"
        >
          {isSubmitting ? "Submitting Application..." : "Apply as Vendor"}{" "}
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
