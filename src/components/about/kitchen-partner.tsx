import React from "react";

export default function KitchenPartners() {
  const regions = [
    {
      name: "Dhaka",
      status: "Available",
      color: "text-success bg-success/10 border-success/20",
    },
    {
      name: "Chattogram",
      status: "Available",
      color: "text-success bg-success/10 border-success/20",
    },
    {
      name: "Cumilla",
      status: "Available",
      color: "text-success bg-success/10 border-success/20",
    },
    {
      name: "Sylhet & Barisal",
      status: "Coming Soon",
      color: "text-warning bg-warning/10 border-warning/20",
    },
  ];

  return (
    <section className="py-20 bg-background border-b border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Partners info */}
        <div className="lg:col-span-6 space-y-6">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Our Ecosystem
          </span>
          <h2 className="font-heading text-3xl font-normal text-foreground">
            Certified Kitchen Partners
          </h2>
          <p className="font-sans text-xs text-foreground/75 leading-relaxed font-light">
            Our strict selection criteria only targets kitchen systems that demonstrate structural
            hygiene policies. Every single worker holds health cards to guarantee food safety levels
            before connecting to the Food Flow platform.
          </p>
          <div className="border border-foreground/10 rounded-2xl p-5 bg-background italic font-heading text-xs text-foreground/80 leading-relaxed font-light">
            &ldquo;We inspect critical food pathways, ensuring high standards from chopping board
            sanitizer ratios to absolute container eco compliance.&rdquo;
          </div>
        </div>

        {/* Right Column - Locations list */}
        <div className="lg:col-span-6 space-y-6 lg:pl-6">
          <h2 className="font-heading text-2xl font-normal text-foreground">Growing Presence</h2>
          <div className="space-y-3">
            {regions.map((reg, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-card border border-foreground/5 rounded-xl shadow-sm"
              >
                <span className="font-sans text-xs font-bold text-foreground">{reg.name}</span>
                <span
                  className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${reg.color}`}
                >
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
