import Image from "next/image";
import React from "react";

export default function SocialGrid() {
  const images = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400",
  ];

  return (
    <section className="py-[var(--space-section)] bg-background">
      <div className="wrapper space-y-6">
        <div className="text-center">
          <h2 className="font-fraunces text-xl md:text-3xl font-normal text-foreground">Food Flow in the Wild</h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">Real snapshots shared by our culinary collective tags</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] group">
              <Image width={600} height={600} src={src} alt="Subscriber lunch plating profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}