import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  register: any;
  errors: any;
  fulfillment: string;
}

export function ContactInfoSection({ register, errors, fulfillment }: Props) {
  return (
    <>
      <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm flex flex-col gap-4">
        <h2 className="font-sans text-base font-semibold text-foreground">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Receiver Name" error={errors.receiverName} required={fulfillment === "delivery"}>
            <Input
              type="text"
              placeholder="Full name"
              {...register("receiverName", { required: fulfillment === "delivery" })}
              className={errors.receiverName ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
          <FormField label="Receiver Phone" error={errors.receiverPhone} required={fulfillment === "delivery"}>
            <Input
              type="tel"
              placeholder="+880 1XXX XXXXXX"
              {...register("receiverPhone", { required: fulfillment === "delivery" })}
              className={errors.receiverPhone ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm flex flex-col gap-2">
        <h2 className="font-sans text-base font-semibold text-foreground">Order Notes</h2>
        <Textarea
          rows={4}
          placeholder="Add special instructions for cooking preferences, allergies, or drop-off guidelines..."
          {...register("notes")}
          className="bg-background/60"
        />
      </div>
    </>
  );
}
