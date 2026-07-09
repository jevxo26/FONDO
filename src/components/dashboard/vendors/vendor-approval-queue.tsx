"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { VendorsTable } from "@/components/dashboard/vendors/vendors-table";

const pendingVendors = [
  { id: 1, name: "Zaman Heritage", type: "Mughlai", location: "Banani, Dhaka", status: "Pending" },
  { id: 2, name: "Kacchi Bhai Express", type: "Biryani", location: "Dhanmondi", status: "Documents Pending" },
];

export function VendorApprovalQueue() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Vendor Approval Queue</h2>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="p-0 overflow-hidden">
           <VendorsTable vendors={pendingVendors as any} />
          </Card>
        </div>

        <Card className="md:col-span-2 p-6">
          <h3 className="text-xl font-bold mb-4">Application Details</h3>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 h-32" /> 
          <h4 className="font-bold text-lg">Zaman Heritage</h4>
          <p className="text-sm text-muted-foreground mb-6">Banani Road 11, Dhaka</p>
          
          <div className="space-y-4">
            <h5 className="font-semibold">Submitted Documents</h5>
            <div className="border rounded-lg p-3 flex justify-between items-center">
              <span>Trade_License_2024.pdf</span>
              <Eye size={18} className="cursor-pointer" />
            </div>
            
            <textarea 
              className="w-full border rounded-lg p-3 text-sm mt-4" 
              placeholder="Add a private note for other administrators..."
              rows={4}
            />
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">Reject Application</Button>
              <Button className="flex-1 bg-black text-white hover:bg-gray-800">Approve Vendor</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}