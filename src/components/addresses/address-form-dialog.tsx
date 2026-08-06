"use client";

import { useState, type ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin } from "lucide-react";
import { useAddressesPage } from "@/hooks/use-addresses-page";

interface Props {
  trigger: ReactElement;
}

export function AddressFormDialog({ trigger }: Props) {
  const { form, setField, handleAdd, isAdding } = useAddressesPage();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await handleAdd();
    if (ok) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-lg font-semibold">
            <MapPin className="size-4 text-primary" /> Add Delivery Address
          </DialogTitle>
          <DialogDescription>
            Save this address so checkout is faster next time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Label" htmlFor="label" required>
            <Select
              value={form.label}
              onValueChange={(v) => setField("label", v ?? "")}
            >
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Home">Home</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Receiver Name" htmlFor="receiverName" required>
            <Input
              id="receiverName"
              size="sm"
              placeholder="Full name"
              value={form.receiverName}
              onChange={(e) => setField("receiverName", e.target.value)}
            />
          </FormField>

          <FormField label="Receiver Phone" htmlFor="receiverPhone" required>
            <Input
              id="receiverPhone"
              size="sm"
              type="tel"
              placeholder="+880 1XXX XXXXXX"
              value={form.receiverPhone}
              onChange={(e) => setField("receiverPhone", e.target.value)}
            />
          </FormField>

          <FormField label="Division" htmlFor="division" required>
            <Input
              id="division"
              size="sm"
              placeholder="e.g. Dhaka"
              value={form.division}
              onChange={(e) => setField("division", e.target.value)}
            />
          </FormField>

          <FormField label="District" htmlFor="district" required>
            <Input
              id="district"
              size="sm"
              placeholder="e.g. Dhaka"
              value={form.district}
              onChange={(e) => setField("district", e.target.value)}
            />
          </FormField>

          <FormField label="Area / Thana" htmlFor="area" required>
            <Input
              id="area"
              size="sm"
              placeholder="e.g. Gulshan"
              value={form.area}
              onChange={(e) => setField("area", e.target.value)}
            />
          </FormField>

          <FormField label="Road / Street" htmlFor="road">
            <Input
              id="road"
              size="sm"
              placeholder="Road number"
              value={form.road}
              onChange={(e) => setField("road", e.target.value)}
            />
          </FormField>

          <FormField label="House" htmlFor="house">
            <Input
              id="house"
              size="sm"
              placeholder="House / building"
              value={form.house}
              onChange={(e) => setField("house", e.target.value)}
            />
          </FormField>

          <FormField label="Postal Code" htmlFor="postalCode" className="sm:col-span-2">
            <Input
              id="postalCode"
              size="sm"
              placeholder="e.g. 1212"
              value={form.postalCode}
              onChange={(e) => setField("postalCode", e.target.value)}
            />
          </FormField>

          <DialogFooter className="sm:col-span-2">
            <Button type="submit" className="gap-2 rounded-xl" disabled={isAdding}>
              {isAdding ? <Loader2 className="size-4 animate-spin" /> : <MapPin className="size-4" />}
              Save Address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
