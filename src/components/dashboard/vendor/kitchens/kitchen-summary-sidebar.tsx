// src/components/dashboard/vendor/kitchens/kitchen-summary-sidebar.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ChefHat, Clock, Users, Gauge } from "lucide-react";

interface KitchenSummarySidebarProps {
  name: string;
  branch: string;
  status: string;
  capacity: number;
  currentLoad: number;
  capacityPercentage: number;
  headChef: string;
  staffCount: number;
  preparationTime: number;
}

const statusColors = {
  ACTIVE: "text-green-600 bg-green-50",
  INACTIVE: "text-red-600 bg-red-50",
  MAINTENANCE: "text-yellow-600 bg-yellow-50",
};

export function KitchenSummarySidebar({
  name,
  branch,
  status,
  capacity,
  currentLoad,
  capacityPercentage,
  headChef,
  staffCount,
  preparationTime,
}: KitchenSummarySidebarProps) {
  const statusColor =
    statusColors[status as keyof typeof statusColors] || "text-gray-600 bg-gray-50";

  return (
    <div className="sticky top-24">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Kitchen Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Kitchen Name</span>
              <span className="font-medium text-foreground">{name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Branch</span>
              <span className="font-medium text-foreground">{branch}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                {status}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                Head Chef
              </span>
              <span className="font-medium text-foreground">{headChef}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                Staff Count
              </span>
              <span className="font-medium text-foreground">{staffCount}</span>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                Capacity
              </span>
              <span className="font-medium text-foreground">{capacity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                Current Load
              </span>
              <span className="font-medium text-foreground">{currentLoad}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Capacity Used</span>
              <span
                className={`font-medium ${
                  capacityPercentage > 80
                    ? "text-red-600"
                    : capacityPercentage > 60
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                {capacityPercentage}%
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Prep Time
              </span>
              <span className="font-medium text-foreground">{preparationTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
