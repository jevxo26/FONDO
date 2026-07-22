"use client";

import { useState } from "react";
import { useAddresses, useCreateAddress, useDeleteAddress, useSetDefaultAddress } from "@/hooks/use-addresses";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { AddressCard } from "./address-card";
import { AddressForm } from "./address-form";

export function AddressManager() {
  const { data: addresses = [], isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefault = useSetDefaultAddress();

  const [label, setLabel] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !streetAddress || !city) return;
    try {
      await createAddress.mutateAsync({ label, streetAddress, city, zipCode });
      setLabel(""); setStreetAddress(""); setCity(""); setZipCode("");
      toast.success("Address added");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress.mutateAsync(id);
      toast.success("Address removed");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefault.mutateAsync(id);
      toast.success("Default address updated");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-normal text-foreground">My Addresses</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Manage multiple addresses for faster checkout.</p>
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading addresses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <AddressCard key={addr.id} address={addr} onSetDefault={handleSetDefault} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddressForm
        label={label}
        streetAddress={streetAddress}
        city={city}
        zipCode={zipCode}
        isPending={createAddress.isPending}
        onLabelChange={setLabel}
        onStreetChange={setStreetAddress}
        onCityChange={setCity}
        onZipChange={setZipCode}
        onSubmit={handleAdd}
      />
    </div>
  );
}
