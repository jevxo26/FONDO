"use client";

import React from "react";

export function PathToExcellence() {
  const steps = [
    {
      num: "1",
      title: "Submit Application",
      desc: "Complete our detailed digital form with your professional background and credentials."
    },
    {
      num: "2",
      title: "Verification",
      desc: "Our compliance team reviews your documents and performs standard safety background checks."
    },
    {
      num: "3",
      title: "Start Delivering",
      desc: "Collect your premium Fondo gear, access the partner app, and start accepting deliveries."
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 border-b border-[#E0D5C4] bg-[#FCF9F3]"
    >
      <div className="wrapper space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-[#16100C]">
            Path to Excellence
          </h2>
          <p className="text-xs md:text-sm text-[#635C57] font-light">
            Our streamlined onboarding process ensures you&apos;re on the road and
            earning in no time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center space-y-4 px-4">
              <div className="size-14 mx-auto rounded-full border border-[#E0D5C4] bg-[#FAF5EB] flex items-center justify-center font-heading text-xl font-bold text-[#16100C] shadow-sm">
                {step.num}
              </div>
              <h3 className="font-heading text-lg font-bold text-[#16100C]">
                {step.title}
              </h3>
              <p className="text-xs text-[#635C57] font-light leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}