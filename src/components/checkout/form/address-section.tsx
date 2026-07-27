import { Input } from "@/components/ui/input";
import type { Address } from "@/types/address";
import type { FulfillmentType, CheckoutFormData } from "@/types/checkout-type";
import { Check, MapPin } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

interface Props {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  register: UseFormRegister<CheckoutFormData>;
  errors: Record<string, { message?: string } | undefined>;
  showNewAddress: boolean;
  fulfillment: FulfillmentType;
}

export function AddressSection({
  addresses,
  selectedAddressId,
  onSelect,
  register,
  errors,
  showNewAddress,
  fulfillment,
}: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/40 p-6 shadow-sm flex flex-col gap-4">
      <h2 className="font-sans text-base font-semibold text-foreground">Delivery Details</h2>

      {fulfillment === "delivery" && addresses.length > 0 && (
        <div className="flex flex-col gap-2">
          {addresses.map((addr) => (
            <button
              key={addr.id}
              type="button"
              onClick={() => onSelect(addr.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-border/80"
              }`}
            >
              <MapPin
                className={`size-4 shrink-0 ${selectedAddressId === addr.id ? "text-primary" : "text-muted-foreground"}`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs font-semibold text-foreground">
                  {addr.label}
                  {addr.isDefault && (
                    <span className="ml-2 text-[9px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground mt-0.5 truncate">
                  {addr.area}{addr.district ? `, ${addr.district}` : ""}
                </p>
              </div>
              {selectedAddressId === addr.id && <Check className="size-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}

      {showNewAddress && (
        <div className="flex flex-col gap-3">
          {fulfillment === "delivery" && addresses.length > 0 && (
            <p className="text-[10px] text-muted-foreground">Or enter a new address:</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">Receiver Name</label>
              <Input
                type="text"
                placeholder="Full name"
                {...register("receiverName", { required: fulfillment === "delivery" })}
                className={errors.receiverName ? "border-destructive/50 h-8 text-xs" : "h-8 text-xs"}
              />
              {errors.receiverName && <p className="text-[10px] text-destructive mt-0.5">{errors.receiverName.message}</p>}
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">Phone</label>
              <Input
                type="tel"
                placeholder="+880 1XXX XXXXXX"
                {...register("receiverPhone", { required: fulfillment === "delivery" })}
                className={errors.receiverPhone ? "border-destructive/50 h-8 text-xs" : "h-8 text-xs"}
              />
              {errors.receiverPhone && <p className="text-[10px] text-destructive mt-0.5">{errors.receiverPhone.message}</p>}
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">Division</label>
              <Input
                type="text"
                placeholder="e.g. Dhaka"
                {...register("division", { required: !selectedAddressId })}
                className={errors.division ? "border-destructive/50 h-8 text-xs" : "h-8 text-xs"}
              />
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">District</label>
              <Input
                type="text"
                placeholder="e.g. Dhaka"
                {...register("district", { required: !selectedAddressId })}
                className={errors.district ? "border-destructive/50 h-8 text-xs" : "h-8 text-xs"}
              />
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">Area / Thana</label>
              <Input
                type="text"
                placeholder="e.g. Gulshan"
                {...register("area", { required: !selectedAddressId })}
                className={errors.area ? "border-destructive/50 h-8 text-xs" : "h-8 text-xs"}
              />
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">Road / Street</label>
              <Input
                type="text"
                placeholder="Road / colony name"
                {...register("road")}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-medium text-foreground mb-1 block">House</label>
              <Input
                type="text"
                placeholder="House / building"
                {...register("house")}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
