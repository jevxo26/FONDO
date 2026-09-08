import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/form-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Address } from "@/types/address";
import type { FulfillmentType, CheckoutFormData } from "@/types/checkout-type";
import { Check, MapPin, User, Phone, Globe, Building2, MapPinned, Home, HelpCircle } from "lucide-react";
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
    <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-foreground" />
        <h2 className="font-sans text-sm font-semibold text-foreground">Delivery Details</h2>
      </div>

      {fulfillment === "delivery" && addresses.length > 0 && (
        <div className="flex flex-col gap-2">
          {addresses.map((addr) => (
            <Button
              key={addr.id}
              variant="outline"
              type="button"
              onClick={() => onSelect(addr.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-border/80"
              }`}
            >
              <div className={`flex size-8 items-center justify-center rounded-lg ${
                selectedAddressId === addr.id ? "bg-primary/10" : "bg-muted"
              }`}>
                <MapPin
                  className={`size-4 ${selectedAddressId === addr.id ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
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
                  {addr.area}
                  {addr.district ? `, ${addr.district}` : ""}
                </p>
              </div>
              {selectedAddressId === addr.id && <Check className="size-4 text-primary shrink-0" />}
            </Button>
          ))}
        </div>
      )}

      {showNewAddress && (
        <div className="flex flex-col gap-4">
          {fulfillment === "delivery" && addresses.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Or enter new address</span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Receiver Name" htmlFor="receiverName" error={errors.receiverName} required={fulfillment === "delivery"}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="receiverName" type="text" placeholder="Full name" className="pl-9 h-9 text-xs" {...register("receiverName", { required: fulfillment === "delivery" })} />
              </div>
            </FormField>
            <FormField label="Phone" htmlFor="receiverPhone" error={errors.receiverPhone} required={fulfillment === "delivery"}>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="receiverPhone" type="tel" placeholder="+880 1XXX XXXXXX" className="pl-9 h-9 text-xs" {...register("receiverPhone", { required: fulfillment === "delivery" })} />
              </div>
            </FormField>
            <FormField label="Division" htmlFor="division" error={errors.division} required={!selectedAddressId}>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="division" type="text" placeholder="e.g. Dhaka" className="pl-9 h-9 text-xs" {...register("division", { required: !selectedAddressId })} />
              </div>
            </FormField>
            <FormField label="District" htmlFor="district" error={errors.district} required={!selectedAddressId}>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="district" type="text" placeholder="e.g. Dhaka" className="pl-9 h-9 text-xs" {...register("district", { required: !selectedAddressId })} />
              </div>
            </FormField>
            <FormField label="Area / Thana" htmlFor="area" error={errors.area} required={!selectedAddressId}>
              <div className="relative">
                <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="area" type="text" placeholder="e.g. Gulshan" className="pl-9 h-9 text-xs" {...register("area", { required: !selectedAddressId })} />
              </div>
            </FormField>
            <FormField label="Road / Street" htmlFor="road">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="road" type="text" placeholder="Road / colony name" className="pl-9 h-9 text-xs" {...register("road")} />
              </div>
            </FormField>
            <FormField label="House" htmlFor="house">
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
                <Input id="house" type="text" placeholder="House / building" className="pl-9 h-9 text-xs" {...register("house")} />
              </div>
            </FormField>
            <div className="flex items-end">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <HelpCircle className="size-3" /> Fields marked with * are required
                  </div>
                </TooltipTrigger>
                <TooltipContent>Required for delivery address</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
