// src/components/dashboard/vendor/kitchens/kitchen-card-preview.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ChefHat, Clock, Users, Gauge } from "lucide-react";

interface KitchenCardPreviewProps {
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

const statusBadgeColors = {
  ACTIVE: "bg-green-500 text-white",
  INACTIVE: "bg-red-500 text-white",
  MAINTENANCE: "bg-yellow-500 text-white",
};

export function KitchenCardPreview({
  name,
  branch,
  status,
  capacity,
  currentLoad,
  capacityPercentage,
  headChef,
  staffCount,
  preparationTime,
}: KitchenCardPreviewProps) {
  const statusColor =
    statusBadgeColors[status as keyof typeof statusBadgeColors] || "bg-gray-500 text-white";

  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Image/Icon Section */}
        <div className="md:w-1/3 bg-primary/5 flex items-center justify-center p-8">
          <div className="text-center">
            <Building2 className="w-24 h-24 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Kitchen</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{branch}</p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Badge className={statusColor}>{status}</Badge>
            <Badge variant="outline" className="text-xs">
              {capacityPercentage}% Capacity
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Head Chef:</span>
              <span className="font-medium text-foreground">{headChef}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <ChefHat className="w-4 h-4" />
              <span>Staff:</span>
              <span className="font-medium text-foreground">{staffCount}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Gauge className="w-4 h-4" />
              <span>Capacity:</span>
              <span className="font-medium text-foreground">{capacity}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Gauge className="w-4 h-4" />
              <span>Load:</span>
              <span className="font-medium text-foreground">{currentLoad}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground col-span-2">
              <Clock className="w-4 h-4" />
              <span>Prep Time:</span>
              <span className="font-medium text-foreground">{preparationTime} min</span>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mt-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  capacityPercentage > 80
                    ? "bg-red-500"
                    : capacityPercentage > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {capacityPercentage}% capacity used
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
