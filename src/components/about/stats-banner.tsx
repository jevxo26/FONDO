import React from "react";

export default function StatsBanner() {
  const stats = [
    { value: "50,000+", label: "Meals Delivered" },
    { value: "15,000+", label: "Happy Customers" },
    { value: "120+", label: "Kitchen Partners" },
    { value: "4.9", label: "Google Rating" },
  ];

  return (
    <section className="bg-[#8A5E1B] text-[#FAF5EB] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <span className="font-fraunces text-2xl md:text-4xl font-normal block text-[#FAF5EB]">
              {stat.value}
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#FAF5EB]/70 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}