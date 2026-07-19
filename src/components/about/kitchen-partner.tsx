import React from "react";

export default function KitchenPartners() {
  const regions = [
    { name: "Dhaka", status: "Available", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { name: "Chattogram", status: "Available", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { name: "Cumilla", status: "Available", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { name: "Sylhet & Barisal", status: "Coming Soon", color: "text-amber-700 bg-amber-50 border-amber-100" },
  ];

  return (
    <section className="py-20 bg-[#FAF5EB] border-b border-[#16100C]/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - Partners info */}
        <div className="lg:col-span-6 space-y-6">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#CEA359]">Our Ecosystem</span>
          <h2 className="font-heading text-3xl font-normal text-[#16100C]">Certified Kitchen Partners</h2>
          <p className="font-sans text-xs text-[#16100C]/75 leading-relaxed font-light">
            Our strict selection criteria only targets kitchen systems that demonstrate structural hygiene policies. Every single worker holds health cards to guarantee food safety levels before connecting to the Food Flow platform.
          </p>
          <div className="border border-[#16100C]/10 rounded-2xl p-5 bg-[#FAF5EB] italic font-heading text-xs text-[#16100C]/80 leading-relaxed font-light">
            &ldquo;We inspect critical food pathways, ensuring high standards from chopping board sanitizer ratios to absolute container eco compliance.&rdquo;
          </div>
        </div>

        {/* Right Column - Locations list */}
        <div className="lg:col-span-6 space-y-6 lg:pl-6">
          <h2 className="font-heading text-2xl font-normal text-[#16100C]">Growing Presence</h2>
          <div className="space-y-3">
            {regions.map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white border border-[#16100C]/5 rounded-xl shadow-sm">
                <span className="font-sans text-xs font-bold text-[#16100C]">{reg.name}</span>
                <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${reg.color}`}>
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