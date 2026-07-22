import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import type { Address } from "@/types/address";
import { Check, Loader2, MapPin } from "lucide-react";

interface Props {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  register: any;
  errors: any;
  showNewAddress: boolean;
}

export function AddressSection({ addresses, selectedAddressId, onSelect, register, errors, showNewAddress }: Props) {
  return (
    <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
      <h2 className="font-sans text-base font-semibold text-foreground">Delivery Address</h2>

      {addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-medium">Saved addresses</p>
          {addresses.map((addr) => (
            <button
              key={addr.id}
              type="button"
              onClick={() => onSelect(addr.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-border/80"
              }`}
            >
              <MapPin className={`size-4 ${selectedAddressId === addr.id ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className="font-sans text-xs font-semibold text-foreground">
                  {addr.label}
                  {addr.isDefault && (
                    <span className="ml-2 text-[9px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground mt-0.5">
                  {addr.road || addr.area}, {addr.district} {addr.postalCode ?? ""}
                </p>
              </div>
              {selectedAddressId === addr.id && <Check className="size-4 text-primary" />}
            </button>
          ))}
          <div className="border-t border-border/40 pt-3 mt-1">
            <p className="text-[10px] text-muted-foreground mb-2">Or enter a new address:</p>
          </div>
        </div>
      )}

      {showNewAddress && (
        <>
          <FormField label="Street Address" error={errors.streetAddress}>
            <Input
              type="text"
              placeholder="House number, road number, area line..."
              {...register("streetAddress", { required: !selectedAddressId })}
              className={errors.streetAddress ? "border-rose-400 focus:ring-rose-400" : ""}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="City" error={errors.city}>
              <Input
                type="text"
                placeholder="e.g. Dhaka"
                {...register("city", { required: !selectedAddressId })}
                className={errors.city ? "border-rose-400 focus:ring-rose-400" : ""}
              />
            </FormField>
            <FormField label="ZIP / Postal Code" error={errors.zipCode}>
              <Input
                type="text"
                placeholder="1213"
                {...register("zipCode", { required: !selectedAddressId })}
                className={errors.zipCode ? "border-rose-400 focus:ring-rose-400" : ""}
              />
            </FormField>
          </div>
        </>
      )}
    </div>
  );
}
