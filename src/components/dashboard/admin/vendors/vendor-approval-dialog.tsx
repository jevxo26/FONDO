"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  FileText,
  MapPin,
  Tag,
  User,
  Clock,
  X,
} from "lucide-react";
import { documents, getStatusVariant, getInitials } from "@/data/vendors";
import type { ApprovalVendor as Vendor } from "@/data/vendors";

interface VendorApprovalDialogProps {
  vendor: Vendor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

export function VendorApprovalDialog({
  vendor,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: VendorApprovalDialogProps) {
  const [note, setNote] = useState("");

  if (!vendor) return null;

  const isDisabled = vendor.status === "Rejected" || vendor.status === "Approved";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Vendor Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                {getInitials(vendor.name)}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{vendor.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  <span>{vendor.type}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <MapPin className="h-3 w-3" />
                  <span>{vendor.location}</span>
                </div>
              </div>
            </div>
            <Badge variant={getStatusVariant(vendor.status)} className="text-sm px-4 py-1.5">
              {vendor.status}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Application Date", value: "2024-01-15" },
              { label: "Documents", value: `${documents.length} files` },
              { label: "Review Status", value: "In Progress" },
            ].map((item) => (
              <div key={item.label} className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Submitted Documents
              </h5>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-3 w-3" /> Download All
              </Button>
            </div>
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div key={index} className="border rounded-lg p-3 flex justify-between items-center hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} &bull; {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Administrator Note
            </h5>
            <textarea
              className="w-full border rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Add a private note for other administrators..."
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1 gap-2" onClick={onReject} disabled={isDisabled}>
              <X className="h-4 w-4" /> Reject Application
            </Button>
            <Button className="flex-1 bg-black text-white hover:bg-gray-800 gap-2" onClick={onApprove} disabled={isDisabled}>
              <Clock className="h-4 w-4" /> Approve Vendor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
