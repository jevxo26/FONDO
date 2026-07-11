"use client";

import { StatCard } from "@/components/dashboard/common/stat-card";
import { Star, FileText, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const topVendors = [
  { name: "The Mughal Court", score: "98.4/100", trend: "+ 4.2%" },
  { name: "Saffron Spices", score: "95.1/100", trend: "+ 1.8%" },
  { name: "Copper Pot Grill", score: "92.8/100", trend: "- 0.5%" },
];

export function VendorPerformance() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-fraunces text-[32px] font-bold tracking-tight text-foreground">Vendor Performance Analytics</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Last 30 Days</Button>
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. Vendor Rating" value="4.8" icon={Star} trend="up" trendValue="+0.2" variant="default" />
        <StatCard label="Total Orders" value="12.4k" icon={FileText} trend="up" trendValue="+12%" variant="success" />
        <StatCard label="On-Time Delivery" value="96.2%" icon={Clock} trend="down" trendValue="-1.4%" variant="warning" />
        <StatCard label="Quality Alerts" value="08" icon={AlertTriangle} trend="down" trendValue="Active" variant="danger" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="group relative col-span-2 rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
          <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-fraunces text-lg font-semibold">Rating Trends vs Order Volume</h3>
              <div className="flex gap-6 text-[11px] font-bold text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary" />
                  RATING
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-foreground" />
                  ORDERS
                </span>
              </div>
            </div>
            <div className="flex h-64 items-end gap-3">
              {[45, 70, 55, 90, 65, 85, 75].map((h, i) => (
                <div key={i} className="group/chart relative flex-1 rounded-t-lg bg-muted/50">
                  <div
                    className="absolute bottom-0 w-full rounded-t-lg bg-foreground transition-all duration-300 group-hover/chart:bg-primary"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
          <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10">
            <h3 className="font-fraunces text-lg font-semibold mb-6">Top Performing Vendors</h3>
            <div className="space-y-5">
              {topVendors.map((vendor, i) => (
                <div key={i} className="flex items-center justify-between group/vendor">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted font-bold text-sm transition-colors duration-300 group-hover/vendor:bg-primary/10 group-hover/vendor:text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{vendor.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Score: {vendor.score}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${vendor.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {vendor.trend}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground hover:text-primary uppercase tracking-widest">
              View Full Leaderboard →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
