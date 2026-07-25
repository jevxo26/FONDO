// src/components/dashboard/vendor/settings/documents-section.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { vendorDocuments, getDocumentStatusBadge } from "@/data/vendor-settings";
import { format } from "date-fns";

export function DocumentsSection() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-warning" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-semibold text-sm">Business Documents</h4>
          <p className="text-xs text-muted-foreground">Upload and manage your business verification documents</p>
        </div>
        <Button size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-[10px] uppercase tracking-wider">Document Type</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">Number</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">File</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">Expiry</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorDocuments.map((doc) => {
              const badge = getDocumentStatusBadge(doc.verificationStatus);
              const isExpired = new Date(doc.expiryDate) < new Date();
              return (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{doc.documentType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{doc.documentNumber}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm">{doc.fileName}</span>
                      <span className="text-xs text-muted-foreground">{doc.fileSize}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm">{format(new Date(doc.expiryDate), "MMM d, yyyy")}</span>
                      {isExpired && (
                        <Badge variant="outline" className="text-destructive ring-destructive/20 text-[10px]">
                          Expired
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.verificationStatus)}
                      <Badge variant="outline" className={`ring-1 ${badge.className}`}>
                        {badge.label}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}