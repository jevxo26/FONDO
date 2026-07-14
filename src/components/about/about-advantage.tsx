import React from "react";
import { Utensils, Target, Shield, Heart, Award, Calendar, Truck, Sliders } from "lucide-react";

export default function FoodoAdvantage() {
  const advantages = [
    { title: "Fresh Daily Cooking", desc: "Every meal is prepared fresh day of delivery using fresh local market ingredients.", icon: <Utensils /> },
    { title: "Perfect Macro Ratios", desc: "Precision portion controls that match specialized fitness and diet standards.", icon: <Target /> },
    { title: "Nutrition Advisor", desc: "Expert nutrition advice to align protein intake for your specific training goals.", icon: <Heart /> },
    { title: "Premium Meal Plans", desc: "Varied menus designed by experienced fine-dining kitchen master chefs.", icon: <Award /> },
    { title: "Flexible Subscription", desc: "Pause, skip, or modify active plan intervals without hidden fee penalties.", icon: <Calendar /> },
    { title: "Daily Delivery", desc: "Tightly coordinated morning drops direct to home or corporate spaces.", icon: <Truck /> },
    { title: "Easy Customization", desc: "Your ingredients or allergen settings can be modified easily inside your client profile.", icon: <Sliders /> },
    { title: "Safe Online Payments", desc: "Fully secure transactions via encrypted local and international gateways.", icon: <Shield /> },
  ];

  return (
    <section className="py-20 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-fraunces text-3xl md:text-4xl font-normal text-[#16100C]">The Foodo Advantage</h2>
          <div className="w-16 h-0.5 bg-[#CEA359] mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-white border border-[#16100C]/10 rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#CEA359]/30 transition-all">
              <div className="text-[#CEA359] size-8 flex items-center shrink-0">
                {React.cloneElement(adv.icon, { className: "size-5" })}
              </div>
              <h4 className="font-sans text-xs font-bold text-[#16100C] leading-none">{adv.title}</h4>
              <p className="font-sans text-[10px] text-[#16100C]/65 leading-relaxed font-light">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}