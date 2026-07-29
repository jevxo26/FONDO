"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Phone, Mail, Info } from "lucide-react";

interface StaffBasicFieldsProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function StaffBasicFields({ formData, onFieldChange }: StaffBasicFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Label>Full Name</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-3 text-muted-foreground/50" />
              </TooltipTrigger>
              <TooltipContent>Staff member&apos;s full legal name</TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              placeholder="e.g., Ahmed Khan"
              value={formData.fullName}
              onChange={(e) => onFieldChange("fullName", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Label>Phone</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-3 text-muted-foreground/50" />
              </TooltipTrigger>
              <TooltipContent>Valid Bangladeshi phone number</TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              placeholder="e.g., +8801712345678"
              value={formData.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Label>Email</Label>
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="email"
            placeholder="e.g., ahmed@fondo.com"
            value={formData.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
