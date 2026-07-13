"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { DataTablePagination } from "@/components/common/table";
import { Search, X, Bike, MapPin, Star, Users, Phone } from "lucide-react";

const riders = [
  { id: 1, name: "Rider Kamal", phone: "+880 1712-345678", zone: "Gulshan", vehicle: "Motorcycle", status: "Online", deliveries: 124, rating: 4.8 },
  { id: 2, name: "Rider Faruk", phone: "+880 1812-345678", zone: "Banani", vehicle: "Scooter", status: "Online", deliveries: 98, rating: 4.6 },
  { id: 3, name: "Rider Hasan", phone: "+880 1912-345678", zone: "Dhanmondi", vehicle: "Motorcycle", status: "Offline", deliveries: 156, rating: 4.9 },
  { id: 4, name: "Rider Shafiq", phone: "+880 1612-345678", zone: "Uttara", vehicle: "Bicycle", status: "Online", deliveries: 67, rating: 4.5 },
  { id: 5, name: "Rider Jamil", phone: "+880 1512-345678", zone: "Mohakhali", vehicle: "Motorcycle", status: "Busy", deliveries: 201, rating: 4.7 },
  { id: 6, name: "Rider Rashed", phone: "+880 1312-345678", zone: "Baridhara", vehicle: "Scooter", status: "Online", deliveries: 89, rating: 4.4 },
  { id: 7, name: "Rider Siraj", phone: "+880 1412-345678", zone: "Mirpur", vehicle: "Motorcycle", status: "Offline", deliveries: 112, rating: 4.3 },
  { id: 8, name: "Rider Kabir", phone: "+880 1212-345678", zone: "Tejgaon", vehicle: "Bicycle", status: "Busy", deliveries: 45, rating: 4.2 },
];

const PAGE_SIZE = 5;
const zones = ["Gulshan", "Banani", "Dhanmondi", "Uttara", "Mohakhali", "Baridhara", "Mirpur", "Tejgaon"];
const statuses = ["Online", "Offline", "Busy"];

export function RidersAll() {
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = riders.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    const matchZone = zoneFilter === "all" || r.zone === zoneFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchZone && matchStatus;
  });

  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const current = filtered.slice(start, end);

  const variantMap: Record<string, "default" | "secondary" | "outline"> = {
    Online: "default", Busy: "secondary", Offline: "outline",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Riders" value={riders.length.toString()} icon={Bike} accent="right" />
        <StatCard label="Online Now" value={riders.filter(r => r.status === "Online").length.toString()} variant="success" icon={Users} accent="right" />
        <StatCard label="Busy" value={riders.filter(r => r.status === "Busy").length.toString()} variant="warning" icon={MapPin} accent="right" />
        <StatCard label="Avg Rating" value={(riders.reduce((s, r) => s + r.rating, 0) / riders.length).toFixed(1)} variant="default" icon={Star} accent="right" />
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex flex-wrap items-center gap-4 p-6 pb-0">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search rider name or phone..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>{["all", ...statuses].map(s => <SelectItem key={s} value={s}>{s === "all" ? "All" : s}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={(v) => { setZoneFilter(v ?? "all"); setPage(0); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Zone" /></SelectTrigger>
              <SelectContent>{["all", ...zones].map(z => <SelectItem key={z} value={z}>{z === "all" ? "All Zones" : z}</SelectItem>)}</SelectContent>
            </Select>
            {(search || statusFilter !== "all" || zoneFilter !== "all") && (
              <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setZoneFilter("all"); setPage(0); }} className="gap-2"><X className="h-4 w-4" /> Clear</Button>
            )}
          </div>

          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  {["RIDER", "PHONE", "ZONE", "VEHICLE", "STATUS", "DELIVERIES", "RATING"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map((r) => (
                  <tr key={r.id} className="border-t border-border/50 hover:bg-primary/5 transition-all duration-300">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {r.name.split(" ")[1]?.[0] || r.name[0]}
                        </div>
                        <span className="text-sm font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="size-3" /> {r.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.zone}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.vehicle}</td>
                    <td className="px-4 py-3"><Badge variant={variantMap[r.status]}>{r.status}</Badge></td>
                    <td className="px-4 py-3 text-sm font-semibold">{r.deliveries}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="size-3.5 text-amber-500 fill-amber-500" />
                        {r.rating}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground">No riders found</div>}
          </div>
          {filtered.length > 0 && (
            <div className="px-6 pb-6"><DataTablePagination currentPage={page} totalPages={pages} start={start} end={end} totalItems={total} onPageChange={setPage} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
