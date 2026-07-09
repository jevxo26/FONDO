"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

// Dynamically import the map component with SSR disabled
const DynamicMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-secondary flex flex-col items-center justify-center text-muted-foreground animate-pulse">
      <MapPin className="size-8 mb-2 opacity-50" />
      <span className="font-sans text-sm font-medium">Loading Map...</span>
    </div>
  ),
});

export default function ContactMap() {
  return (
    <section className="bg-background pb-16">
      <div className="wrapper">
        
        {/* MAP CONTAINER BOUNDARY */}
        {/* Mobile: fixed height. Tablet/Desktop: 21/9 panoramic aspect ratio */}
        <div className="relative w-full h-[350px] md:h-auto md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-[var(--shadow-card)] border border-border/40 z-0 bg-secondary">
          
          {/* Render the dynamically imported Leaflet Map */}
          <DynamicMap />

        </div>
        
      </div>
    </section>
  );
}