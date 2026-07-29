/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCurrencies } from "@/data/package-registration-data";

interface PricingStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function PricingStep({ data, onChange }: PricingStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Pricing</h3>
      <p className="text-sm text-muted-foreground">Set the pricing details for your package</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Price <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            value={data.price || ""}
            onChange={(e) => onChange("price", parseFloat(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label>Discount Price</Label>
          <Input
            type="number"
            value={data.discountPrice || ""}
            onChange={(e) =>
              onChange("discountPrice", e.target.value ? parseFloat(e.target.value) : undefined)
            }
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>
            Currency <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.currency || "BDT"}
            onValueChange={(value: string | null) => {
              if (value) onChange("currency", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {mockCurrencies.map((cur) => (
                <SelectItem key={cur.value} value={cur.value}>
                  {cur.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>VAT (%)</Label>
          <Input
            type="number"
            value={data.vat || 0}
            onChange={(e) => onChange("vat", parseFloat(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label>Delivery Charge</Label>
          <Input
            type="number"
            value={data.deliveryCharge || 0}
            onChange={(e) => onChange("deliveryCharge", parseFloat(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}
