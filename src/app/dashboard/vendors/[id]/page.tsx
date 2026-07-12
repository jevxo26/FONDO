"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, ShieldCheck } from "lucide-react";

export default function VendorDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-3xl">Vendor Details</h1>
          <p className="text-sm text-muted-foreground md:text-base">Detailed profile for vendor ID: {id}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline">Edit Info</Button>
          <Button>View Kitchens</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group relative col-span-3 rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Store className="size-5" />
              </div>
              <h2 className="text-lg font-semibold">Business Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Business Name</p>
                <p className="font-medium">FONDO Partner Kitchen</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Owner Name</p>
                <p className="font-medium">Saima Akter</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">saima@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+880 1712-345678</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="text-lg font-semibold">Current Status</h2>
            </div>
            <Badge className="w-full justify-center py-1 mb-4">ACTIVE</Badge>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Online</span>
                <span className="text-sm font-bold text-success">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Verified</span>
                <span className="text-sm font-bold text-foreground">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
