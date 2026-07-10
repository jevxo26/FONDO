"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";

const settlements = [
  {
    id: 1,
    vendor: "Sultan's Dine",
    branch: "Dhanmondi Branch",
    settlementId: "SET-89218-23",
    date: "Oct 26, 2023",
    amount: "৳ 84,200",
    status: "Settled",
  },
  {
    id: 2,
    vendor: "Kacchi Bhai",
    branch: "Banani Outlet",
    settlementId: "SET-89441-23",
    date: "Oct 27, 2023",
    amount: "৳ 120,500",
    status: "Processing",
  },
  {
    id: 3,
    vendor: "Star Kabab",
    branch: "Firmgate",
    settlementId: "SET-89112-23",
    date: "Oct 25, 2023",
    amount: "৳ 45,900",
    status: "Flagged",
  },
];

export function VendorFinancialSettlement() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Vendor Financial Settlement</h1>
        <p className="text-slate-500">Manage and authorize payouts for Mughal-partnered culinary establishments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide">Total Outstanding Balance</p>
            <h2 className="text-4xl font-bold mt-2">৳ 1,284,500</h2>
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <ArrowUpRight size={16} /> +12.4% from last month
            </p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600">Process Settlement</Button>
        </Card>

        <Card className="p-6 bg-slate-900 text-white">
          <p className="text-sm text-slate-400">LAST SETTLEMENT</p>
          <h3 className="text-xl font-bold mt-2">Oct 24, 2023</h3>
          <p className="text-sm text-slate-400 mt-1">Successfully processed to 12 vendors</p>
          <Button variant="link" className="text-amber-400 p-0 mt-4 h-auto">View Report →</Button>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Settlement Ledger</h3>
          <div className="space-x-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export CSV</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>VENDOR NAME</TableHead>
              <TableHead>SETTLEMENT ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-bold">{item.vendor}</div>
                  <div className="text-xs text-slate-500">{item.branch}</div>
                </TableCell>
                <TableCell className="text-slate-500">{item.settlementId}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-semibold">{item.amount}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Settled" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}