"use client";

import React from "react";
import {
  Wallet,
  Clock,
  Award,
  Fuel,
  GraduationCap,
  Smartphone,
  ShieldCheck,
  PhoneCall,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function PartnerPrivileges() {
  const cards = [
    {
      icon: Wallet,
      title: "Weekly Earnings",
      desc: "Automated direct transfers every Tuesday morning without fail."
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      desc: "Freedom to set your schedule. Balance work with personal life."
    },
    {
      icon: Award,
      title: "Loyalty Bonus",
      desc: "Exclusive performance-based incentives for long-standing partners."
    },
    {
      icon: Fuel,
      title: "Fuel Rewards",
      desc: "Discounted fuel rates at partner stations across the urban network."
    },
    {
      icon: GraduationCap,
      title: "Skill Training",
      desc: "Comprehensive workshops on professional conduct and road safety."
    },
    {
      icon: Smartphone,
      title: "Elite Partner App",
      desc: "Industry-leading tech to optimize routes and track earnings."
    },
    {
      icon: ShieldCheck,
      title: "Full Coverage",
      desc: "Comprehensive accident and health insurance for peace of mind."
    },
    {
      icon: PhoneCall,
      title: "Live Concierge",
      desc: "Dedicated 24/7 human support for assistance on the road."
    }
  ];

  return (
    <section
      id="benefits"
      className="py-16 md:py-24 border-b border-[#E0D5C4] bg-[#FAF5EB]"
    >
      <div className="wrapper space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-[#16100C]">
              Partner Privileges
            </h2>
            <p className="text-xs md:text-sm text-[#635C57] font-light max-w-xl">
              We provide more than just an app, we offer a supportive ecosystem
              for our delivery partners to thrive.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="size-8 rounded-full border border-[#E0D5C4] bg-[#FCF9F3] flex items-center justify-center text-[#16100C] hover:bg-[#F0E8DC]">
              <ChevronLeft className="size-4" />
            </button>
            <button className="size-8 rounded-full border border-[#E0D5C4] bg-[#FCF9F3] flex items-center justify-center text-[#16100C] hover:bg-[#F0E8DC]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FCF9F3] border border-[#E0D5C4] space-y-3 hover:border-[#8C4E03] transition-colors"
            >
              <div className="size-10 rounded-xl bg-[#F0E8DC] text-[#8C4E03] flex items-center justify-center">
                <card.icon className="size-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#16100C]">
                {card.title}
              </h3>
              <p className="text-xs text-[#635C57] font-light leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}