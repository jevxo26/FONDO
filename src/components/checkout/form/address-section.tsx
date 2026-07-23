import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import type { Address } from "@/types/address";
import type { FulfillmentType } from "@/types/checkout-type";
import { Check, MapPin } from "lucide-react";

interface Props {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  register: any;
  errors: any;
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
      <h2 className="font-sans text-base font-semibold text-foreground">Delivery Address</h2>

      {fulfillment === "delivery" && addresses.length > 0 && (
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
                  {addr.road || addr.house
                    ? `${addr.house ? addr.house + ", " : ""}${addr.road ? addr.road + ", " : ""}`
                    : ""}
                  {addr.area}
                  {addr.district ? `, ${addr.district}` : ""}
                  {addr.postalCode ? ` - ${addr.postalCode}` : ""}
                </p>
              </div>
              {selectedAddressId === addr.id && <Check className="size-4 text-primary shrink-0" />}
            </button>
          ))}
          <div className="border-t border-border/40 pt-3 mt-1">
            <p className="text-[10px] text-muted-foreground mb-2">Or enter a new address:</p>
          </div>
        </div>
      )}

      {showNewAddress && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Division" error={errors.division}>
            <Input
              type="text"
              placeholder="e.g. Dhaka"
              {...register("division", { required: !selectedAddressId })}
              className={errors.division ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
          <FormField label="District" error={errors.district}>
            <Input
              type="text"
              placeholder="e.g. Dhaka"
              {...register("district", { required: !selectedAddressId })}
              className={errors.district ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
          <FormField label="Area / Thana" error={errors.area}>
            <Input
              type="text"
              placeholder="e.g. Gulshan"
              {...register("area", { required: !selectedAddressId })}
              className={errors.area ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
          <FormField label="Road / Street" error={errors.road}>
            <Input
              type="text"
              placeholder="Road number, colony name"
              {...register("road")}
              className={errors.road ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
          <FormField label="House" error={errors.house}>
            <Input type="text" placeholder="House / building number" {...register("house")} />
          </FormField>
          <FormField label="Apartment" error={errors.apartment}>
            <Input type="text" placeholder="Flat / suite number" {...register("apartment")} />
          </FormField>
          <FormField label="Postal Code" error={errors.postalCode}>
            <Input
              type="text"
              placeholder="e.g. 1212"
              {...register("postalCode")}
              className={errors.postalCode ? "border-destructive/50 focus:ring-destructive/50" : ""}
            />
          </FormField>
        </div>
      )}
    </div>
  );
}
