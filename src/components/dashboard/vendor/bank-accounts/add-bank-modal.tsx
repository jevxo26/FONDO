// src/components/dashboard/vendor/bank-accounts/add-bank-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { bankNames, bankAccountTypes } from "@/data/vendor-bank-accounts";

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

  const isMobileBanking = formData.accountType === "MOBILE_BANKING";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Add Bank Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bank / Provider</Label>
              <Select
                value={formData.bankName}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, bankName: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankNames
                    .filter((b) => b.value !== "ALL")
                    .map((bank) => (
                      <SelectItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, accountType: value });
                    if (value === "MOBILE_BANKING") {
                      setFormData((prev) => ({ ...prev, branchName: "", routingNumber: "" }));
                    }
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccountTypes
                    .filter((t) => t.value !== "ALL")
                    .map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isMobileBanking && (
            <div className="space-y-2">
              <Label>Branch Name</Label>
              <Input
                placeholder="e.g., Gulshan Branch"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Account Name</Label>
            <Input
              placeholder="e.g., FONDO Kitchen"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                placeholder={isMobileBanking ? "e.g., 01712345678" : "e.g., 1234567890"}
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              />
            </div>
            {!isMobileBanking && (
              <div className="space-y-2">
                <Label>Routing Number</Label>
                <Input
                  placeholder="e.g., 010123456"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, status: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccountTypes
                    .filter((s) => s.value !== "ALL")
                    .map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-center justify-between pt-6">
              <Label className="cursor-pointer">Set as Primary Account</Label>
              <Switch
                checked={formData.isPrimary}
                onCheckedChange={(checked) => setFormData({ ...formData, isPrimary: checked })}
              />
            </div>
          </div>

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