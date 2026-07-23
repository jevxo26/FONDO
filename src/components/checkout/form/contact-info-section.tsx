import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  register: any;
  errors: any;
}

export function ContactInfoSection({ register, errors }: Props) {
  return (
    <>
      <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm flex flex-col gap-4">
        <h2 className="font-sans text-base font-semibold text-foreground">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Receiver Name" error={errors.receiverName} required>
            <Input
              type="text"
              placeholder="Full name"
              {...register("receiverName", { required: true })}
              className={errors.receiverName ? "border-rose-400 focus:ring-rose-400" : ""}
            />
          </FormField>
          <FormField label="Receiver Phone" error={errors.receiverPhone} required>
            <Input
              type="tel"
              placeholder="+880 1XXX XXXXXX"
              {...register("receiverPhone", { required: true })}
              className={errors.receiverPhone ? "border-rose-400 focus:ring-rose-400" : ""}
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
