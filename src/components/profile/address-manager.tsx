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
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [road, setRoad] = useState("");
  const [house, setHouse] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !receiverName || !receiverPhone || !division || !district || !area) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createAddress.mutateAsync({
        label,
        receiverName,
        receiverPhone,
        division,
        district,
        area,
        road: road || undefined,
        house: house || undefined,
        postalCode: postalCode || undefined,
      });
      setLabel(""); setReceiverName(""); setReceiverPhone("");
      setDivision(""); setDistrict(""); setArea("");
      setRoad(""); setHouse(""); setPostalCode("");
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
        receiverName={receiverName}
        receiverPhone={receiverPhone}
        division={division}
        district={district}
        area={area}
        road={road}
        house={house}
        postalCode={postalCode}
        isPending={createAddress.isPending}
        onLabelChange={setLabel}
        onReceiverNameChange={setReceiverName}
        onReceiverPhoneChange={setReceiverPhone}
        onDivisionChange={setDivision}
        onDistrictChange={setDistrict}
        onAreaChange={setArea}
        onRoadChange={setRoad}
        onHouseChange={setHouse}
        onPostalCodeChange={setPostalCode}
        onSubmit={handleAdd}
      />
    </div>
  );
}
