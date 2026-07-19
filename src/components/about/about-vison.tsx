import React from "react";
import { Flag, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-12 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card */}
        <div className="bg-white border border-[#16100C]/10 rounded-3xl p-8 space-y-4 shadow-sm">
          <div className="text-[#CEA359] bg-[#CEA359]/10 size-10 rounded-full flex items-center justify-center">
            <Flag className="size-5" />
          </div>
          <h3 className="font-heading text-xl font-normal text-[#16100C]">Our Mission</h3>
          <p className="font-sans text-xs text-[#16100C]/70 leading-relaxed font-light">
            To make healthy eating accessible, affordable, and delicious for everyone, showing that premium nutrition is never a luxury, but a daily standard.
          </p>
        </div>
        {/* Vision Card */}
        <div className="bg-white border border-[#16100C]/10 rounded-3xl p-8 space-y-4 shadow-sm">
          <div className="text-[#CEA359] bg-[#CEA359]/10 size-10 rounded-full flex items-center justify-center">
            <Eye className="size-5" />
          </div>
          <h3 className="font-heading text-xl font-normal text-[#16100C]">Our Vision</h3>
          <p className="font-sans text-xs text-[#16100C]/70 leading-relaxed font-light">
            To become Bangladesh&apos;s most trusted personalized food subscription platform, nurturing a healthier nation one plate at a time.
          </p>
        </div>
      </div>
    </section>
  );
}