"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function VendorDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Details</h1>
          <p className="text-muted-foreground">Detailed profile for vendor ID: {id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Info</Button>
          <Button>View Kitchens</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Info Card */}
        <Card className="col-span-3 p-6">
          <h2 className="text-lg font-semibold mb-4">Business Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Business Name</p>
              <p className="font-medium">FONDO Partner Kitchen</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-medium">Saima Akter</p>
            </div>
          </div>
        </Card>

        {/* Status Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Current Status</h2>
          <Badge className="w-full justify-center py-1">ACTIVE</Badge>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Online</span>
              <span className="text-sm font-bold">Yes</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
