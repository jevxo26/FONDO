"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "../customers/orders/pagination"; // টিমমেটের Pagination ব্যবহার করো

// ভেন্ডর টাইপ (তোমার ডাটা অনুযায়ী)
interface Vendor {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  kitchen: string;
  joined: string;
}

const PAGE_SIZE = 10;

export function VendorsTable({ vendors }: { vendors: Vendor[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(vendors.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageVendors = vendors.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kitchen</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageVendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium text-foreground">
                {vendor.name}
              </TableCell>
              <TableCell>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  vendor.status === "ACTIVE" 
                    ? "text-success bg-success/10" 
                    : vendor.status === "PENDING" 
                    ? "text-primary bg-primary/10" 
                    : "text-destructive bg-destructive/10"
                }`}>
                  {vendor.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">{vendor.kitchen}</TableCell>
              <TableCell className="text-muted-foreground">{vendor.joined}</TableCell>
              <TableCell>
                <button className="text-sm font-bold text-primary hover:underline">
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}