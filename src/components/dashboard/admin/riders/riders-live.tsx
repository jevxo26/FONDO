"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Bike, Navigation, Clock, MapPin, Phone, RefreshCw } from "lucide-react";
import { useState } from "react";

const liveRiders = [
  { id: 1, name: "Rider Kamal", phone: "+880 1712-345678", zone: "Gulshan", status: "Delivering", location: "Road 7, Gulshan-1", speed: "32 km/h", eta: "8 min", lastUpdate: "30s ago" },
  { id: 2, name: "Rider Faruk", phone: "+880 1812-345678", zone: "Banani", status: "Available", location: "CCNA, Banani-11", speed: "—", eta: "—", lastUpdate: "1m ago" },
  { id: 3, name: "Rider Shafiq", phone: "+880 1612-345678", zone: "Uttara", status: "Delivering", location: "Road 4, Sector 7", speed: "28 km/h", eta: "12 min", lastUpdate: "45s ago" },
  { id: 4, name: "Rider Rashed", phone: "+880 1312-345678", zone: "Baridhara", status: "En Route", location: "Road 2, Baridhara", speed: "35 km/h", eta: "5 min", lastUpdate: "22s ago" },
  { id: 5, name: "Rider Kabir", phone: "+880 1212-345678", zone: "Tejgaon", status: "Available", location: "Tejgaon Link Road", speed: "—", eta: "—", lastUpdate: "2m ago" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Delivering: "default", "En Route": "secondary", Available: "outline",
};

export function RidersLive() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 flex-1">
          <StatCard label="Active Riders" value={liveRiders.filter(r => r.status !== "Available").length.toString()} icon={Bike} accent="right" />
          <StatCard label="Available" value={liveRiders.filter(r => r.status === "Available").length.toString()} variant="success" icon={Navigation} accent="right" />
          <StatCard label="Delivering" value={liveRiders.filter(r => r.status === "Delivering").length.toString()} variant="warning" icon={Clock} accent="right" />
          <StatCard label="En Route" value={liveRiders.filter(r => r.status === "En Route").length.toString()} variant="default" icon={MapPin} accent="right" />
        </div>
        <Button variant="outline" size="icon" className="ml-4 shrink-0" onClick={handleRefresh}>
          <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-fraunces text-lg font-semibold text-foreground">Live Rider Feed</h3>
              <span className="text-xs text-muted-foreground">Auto-refreshes every 30s</span>
            </div>

            <div className="space-y-3">
              {liveRiders.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-2xl border border-border/40 bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {r.name.split(" ")[1]?.[0] || r.name[0]}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card ${r.status === "Available" ? "bg-emerald-500" : r.status === "Delivering" ? "bg-amber-500" : "bg-blue-500"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{r.name}</span>
                        <Badge variant={statusVariant[r.status]} className="text-[10px] px-2 py-0">{r.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Navigation className="size-3" /> {r.location}</span>
                        {r.speed !== "—" && <span>{r.speed}</span>}
                        {r.eta !== "—" && <span>ETA: {r.eta}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-muted-foreground">{r.lastUpdate}</span>
                    <Button variant="ghost" size="icon" className="size-8 rounded-full">
                      <Phone className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
