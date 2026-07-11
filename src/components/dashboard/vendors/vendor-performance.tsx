"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, FileText, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const topVendors = [
  { name: "The Mughal Court", score: "98.4/100", trend: "+ 4.2%" },
  { name: "Saffron Spices", score: "95.1/100", trend: "+ 1.8%" },
  { name: "Copper Pot Grill", score: "92.8/100", trend: "- 0.5%" },
];

export function VendorPerformance() {
  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Performance Oversight</p>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-1">Vendor Performance Analytics</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-200">Last 30 Days</Button>
          <Button className="">Export Report</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Avg. Vendor Rating", value: "4.8", icon: Star, trend: "+0.2", positive: true },
          { title: "Total Orders", value: "12.4k", icon: FileText, trend: "+12%", positive: true },
          { title: "On-Time Delivery", value: "96.2%", icon: Clock, trend: "-1.4%", positive: false },
          { title: "Quality Alerts", value: "08", icon: AlertTriangle, trend: "Active", positive: false },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <stat.icon className="text-amber-500" size={20} />
              <span className={`text-xs font-semibold flex items-center ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend} {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <h2 className="text-3xl font-bold mt-4">{stat.value}</h2>
            <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-8 border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Rating Trends vs Order Volume</h3>
            <div className="flex gap-6 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400" /> RATING</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-900" /> ORDERS</span>
            </div>
          </div>
          {/* Chart Placeholder Area */}
          <div className="h-64 flex items-end gap-3">
            {[45, 70, 55, 90, 65, 85, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group">
                <div className="absolute bottom-0 w-full bg-slate-900 rounded-t-lg group-hover:bg-amber-500 transition-colors" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-8 border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Top Performing Vendors</h3>
          <div className="space-y-6">
            {topVendors.map((vendor, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-xl font-bold text-sm group-hover:bg-amber-100">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{vendor.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Score: {vendor.score}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold ${vendor.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {vendor.trend}
                </span>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-8 text-xs text-slate-500 hover:text-slate-900 uppercase tracking-widest">
            View Full Leaderboard →
          </Button>
        </Card>
      </div>
    </div>
  );
}