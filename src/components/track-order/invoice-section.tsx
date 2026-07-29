"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Receipt } from "lucide-react";
import { useInvoice } from "@/store/api/slices/orders-api";

interface InvoiceSectionProps {
  orderId: string;
}

export default function InvoiceSection({ orderId }: InvoiceSectionProps) {
  const [open, setOpen] = useState(false);
  const { data: invoice, isLoading } = useInvoice(orderId);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="size-4 text-muted-foreground" />
          <h3 className="font-heading text-sm font-semibold text-foreground">Invoice</h3>
        </div>
        {open ? (
          <ChevronUp className="size-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="mt-4 pt-4 border-t border-border">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : invoice ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice #</span>
                <span className="font-medium">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {new Date(invoice.invoiceDate).toLocaleDateString("en-BD")}
                </span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{Number(invoice.subtotal).toLocaleString()}</span>
              </div>
              {Number(invoice.discount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">
                    -৳{Number(invoice.discount).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>৳{Number(invoice.deliveryCharge).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span>৳{Number(invoice.vat).toLocaleString()}</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total</span>
                <span>৳{Number(invoice.grandTotal).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">Invoice not available</p>
          )}
        </div>
      )}
    </div>
  );
}
