import React from "react";

export default function NutrientDashboard() {
  const macros = [
    { label: "Daily Energy", value: "1,500", unit: "kcal" },
    { label: "Target Protein", value: "110", unit: "grams" },
    { label: "Carbohydrates", value: "95", unit: "grams" },
    { label: "Healthy Fats", value: "55", unit: "grams" },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {macros.map((macro, idx) => (
        <div key={idx} className="bg-white border border-[#d7c3b2]/20 rounded-2xl p-4 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#524437]/70 block mb-1">
            {macro.label}
          </span>
          <div className="font-serif text-2xl font-medium text-[#1e1b17]">{macro.value}</div>
          <span className="text-[10px] font-sans text-[#524437]/60 lowercase">{macro.unit}</span>
        </div>
      ))}
    </section>
  );
}