"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BankAccountFields } from "./bank-account-fields";
import { BankSettingsFields } from "./bank-settings-fields";

interface AddBankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  isPrimary: boolean;
  status: string;
}

export function AddBankModal({ open, onOpenChange }: AddBankModalProps) {
  const [formData, setFormData] = useState<FormData>({
    bankName: "",
    branchName: "",
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",
    isPrimary: false,
    status: "ACTIVE",
  });

  const handleFieldChange = (field: string, val: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Add Bank Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BankAccountFields formData={formData} onFieldChange={handleFieldChange} />
          <BankSettingsFields formData={formData} onFieldChange={handleFieldChange} />
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
