"use client";

import { Compass, Eye } from "lucide-react";

export default function AboutMissionVision() {
  return (
    <section className="bg-[#18110C] py-20 md:py-28">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* MISSION CARD */}
          <div className="flex flex-col gap-6 bg-white/[0.03] border border-white/[0.08] rounded-[32px] p-10 md:p-12 transition-colors hover:bg-white/[0.05]">
            <div className="size-16 rounded-2xl bg-[#EEA25D]/10 flex items-center justify-center border border-[#EEA25D]/20">
              <Compass className="size-8 text-[#EEA25D] stroke-[1.5]" />
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#EEA25D]">
                Our Mission
              </span>
              <h3 className="font-fraunces text-3xl md:text-4xl font-normal text-white tracking-tight">
                Preserving the Past
              </h3>
              <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed mt-2">
                To honor the time-tested techniques of Mughlai culinary arts by meticulously 
                preparing every dish with authentic, hand-selected ingredients, unwavering 
                patience, and a profound respect for our rich cultural heritage. We cook 
                the slow, honest way.
              </p>
            </div>
          </div>

          {/* VISION CARD */}
          <div className="flex flex-col gap-6 bg-white/[0.03] border border-white/[0.08] rounded-[32px] p-10 md:p-12 transition-colors hover:bg-white/[0.05]">
            <div className="size-16 rounded-2xl bg-[#EEA25D]/10 flex items-center justify-center border border-[#EEA25D]/20">
              <Eye className="size-8 text-[#EEA25D] stroke-[1.5]" />
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#EEA25D]">
                Our Vision
              </span>
              <h3 className="font-fraunces text-3xl md:text-4xl font-normal text-white tracking-tight">
                Elevating the Future
              </h3>
              <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed mt-2">
                To become the premier destination for luxury heritage dining in Dhaka, 
                setting a new, uncompromising standard for how traditional slow-fire cuisine 
                is experienced, celebrated, and shared by modern epicureans across the globe.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}