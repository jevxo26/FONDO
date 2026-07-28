"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bankNames, bankAccountTypes } from "@/data/vendor-bank-accounts";

interface BankAccountFieldsProps {
  formData: {
    bankName: string;
    accountType: string;
    branchName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function BankAccountFields({ formData, onFieldChange }: BankAccountFieldsProps) {
  const isMobileBanking = formData.accountType === "MOBILE_BANKING";

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Bank / Provider</Label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("bankName", value);
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
                onFieldChange("accountType", value);
                if (value === "MOBILE_BANKING") {
                  onFieldChange("branchName", "");
                  onFieldChange("routingNumber", "");
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
            onChange={(e) => onFieldChange("branchName", e.target.value)}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label>Account Name</Label>
        <Input
          placeholder="e.g., FONDO Kitchen"
          value={formData.accountName}
          onChange={(e) => onFieldChange("accountName", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Account Number</Label>
          <Input
            placeholder={isMobileBanking ? "e.g., 01712345678" : "e.g., 1234567890"}
            value={formData.accountNumber}
            onChange={(e) => onFieldChange("accountNumber", e.target.value)}
          />
        </div>
        {!isMobileBanking && (
          <div className="space-y-2">
            <Label>Routing Number</Label>
            <Input
              placeholder="e.g., 010123456"
              value={formData.routingNumber}
              onChange={(e) => onFieldChange("routingNumber", e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
}
