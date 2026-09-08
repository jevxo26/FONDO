import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { RiderFormData } from "@/lib/schema/rider-schema";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";

interface Props {
  register: UseFormRegister<RiderFormData>;
  errors: FieldErrors<RiderFormData>;
  isSubmitting: boolean;
}

export function RiderTermsSubmit({ register, errors, isSubmitting }: Props) {
  return (
    <div className="space-y-6 pt-4 border-t border-border">
      <div className="space-y-3">
        <FormField label="" error={errors.termsAccepted}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("termsAccepted")}
              type="checkbox"
              className="size-4 accent-primary mt-0.5"
            />
            <span className="text-xs text-muted-foreground font-light">
              I accept the{" "}
              <strong className="text-foreground">Fondo Rider Partner Terms & Conditions</strong>.
            </span>
          </label>
        </FormField>
        <FormField label="" error={errors.safetyCodeAccepted}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("safetyCodeAccepted")}
              type="checkbox"
              className="size-4 accent-primary mt-0.5"
            />
            <span className="text-xs text-muted-foreground font-light">
              I agree to follow the{" "}
              <strong className="text-foreground">Fondo Road Safety Code of Conduct</strong>.
            </span>
          </label>
        </FormField>
        <FormField label="" error={errors.backgroundCheckAccepted}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("backgroundCheckAccepted")}
              type="checkbox"
              className="size-4 accent-primary mt-0.5"
            />
            <span className="text-xs text-muted-foreground font-light">
              I consent to NID background verification by Fondo Safety Team.
            </span>
          </label>
        </FormField>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="default"
        size="lg"
        className="w-full"
      >
        {isSubmitting ? "Submitting Application..." : "Submit Rider Application"}{" "}
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
