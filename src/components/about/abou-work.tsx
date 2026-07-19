import React from "react";

export default function HowItWorks() {
  const steps = [
    { num: "1", title: "Choose Package", desc: "Select daily meal box counts or customized plan options." },
    { num: "2", title: "Select Duration", desc: "Pick weekly, monthly, or customized commercial terms." },
    { num: "3", title: "Kitchen-Prep", desc: "Our chefs prepare dishes under strict hygiene controls." },
    { num: "4", title: "Enjoy Healthy Food", desc: "On-time doorstep drops inside protected temperature seals." },
  ];

  return (
    <section className="py-16 bg-[#F3ECE0] border-t border-b border-[#16100C]/5 text-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-[#16100C]">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-3 relative">
              <div className="size-10 bg-[#CEA359] text-white font-sans font-bold text-sm flex items-center justify-center rounded-full mx-auto shadow-sm">
                {step.num}
              </div>
              <h4 className="font-heading text-sm font-medium text-[#16100C]">{step.title}</h4>
              <p className="font-sans text-xs text-[#16100C]/70 max-w-xs mx-auto leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}