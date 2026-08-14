"use client";

import { useState } from "react";
import {
  useAddresses,
  useCreateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/store/api/slices/addresses-api";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";

export interface AddressFormState {
  label: string;
  receiverName: string;
  receiverPhone: string;
  division: string;
  district: string;
  area: string;
  road: string;
  house: string;
  postalCode: string;
}

export const EMPTY_ADDRESS_FORM: AddressFormState = {
  label: "",
  receiverName: "",
  receiverPhone: "",
  division: "",
  district: "",
  area: "",
  road: "",
  house: "",
  postalCode: "",
};

export function useAddressesPage() {
  const { data: addresses = [], isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefault = useSetDefaultAddress();

  const [form, setForm] = useState<AddressFormState>(EMPTY_ADDRESS_FORM);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const setField = (key: keyof AddressFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => setForm(EMPTY_ADDRESS_FORM);

  const handleAdd = async () => {
    if (
      !form.label ||
      !form.receiverName ||
      !form.receiverPhone ||
      !form.division ||
      !form.district ||
      !form.area
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    try {
      await createAddress.mutateAsync({
        label: form.label,
        receiverName: form.receiverName,
        receiverPhone: form.receiverPhone,
        division: form.division,
        district: form.district,
        area: form.area,
        road: form.road || undefined,
        house: form.house || undefined,
        postalCode: form.postalCode || undefined,
      });
      toast.success("Address added");
      resetForm();
      return true;
    } catch (error) {
      toast.error(handleApiError(error));
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress.mutateAsync(id);
      toast.success("Address removed");
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setPendingDelete(null);
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

  return {
    addresses,
    isLoading,
    form,
    setField,
    resetForm,
    handleAdd,
    handleDelete,
    handleSetDefault,
    isAdding: createAddress.isPending,
    isDeleting: deleteAddress.isPending,
    pendingDelete,
    setPendingDelete,
  };
}
