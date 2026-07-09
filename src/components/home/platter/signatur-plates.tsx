"use client";

import Image from "next/image";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignaturePlates() {
  return (
    // Outer section wrapper using the deep espresso background color
    <section className="bg-primary-foreground py-16 md:py-24">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Featured Image */}
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
            <Image
              // Replace with your actual asset path
              src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop"
              alt="Steaming bowl of signature chicken biryani in a traditional clay pot"
              fill
              sizes="(max-w-1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* RIGHT COLUMN: Typography & Actions */}
          <div className="flex flex-col gap-10">
            
            {/* 1. Header Text Stack */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#EEA25D]">
                Today on the pass
              </span>
              <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-tight">
                Tonight&apos;s signature plates.
              </h2>
              <p className="font-sans text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mt-2">
                Chef Razzak hand-picks three dishes each evening based on the
                morning&apos;s market. Limited portions, prepared in single batches,
                finished with saffron pulled from his own garden.
              </p>
            </div>

            {/* 2. Information Cards 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-colors hover:bg-white/[0.05]">
                <h4 className="font-sans text-sm font-semibold text-white">
                  Chef&apos;s story
                </h4>
                <p className="font-sans text-xs text-slate-400">
                  Trained in Old Dhaka, refined in Lucknow.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-colors hover:bg-white/[0.05]">
                <h4 className="font-sans text-sm font-semibold text-white">
                  Ingredients
                </h4>
                <p className="font-sans text-xs text-slate-400">
                  Aged basmati · saffron · kewra · ghee.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-colors hover:bg-white/[0.05]">
                <h4 className="font-sans text-sm font-semibold text-white">
                  Heritage
                </h4>
                <p className="font-sans text-xs text-slate-400">
                  A 120-year-old Mughlai recipe, preserved.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-colors hover:bg-white/[0.05]">
                <h4 className="font-sans text-sm font-semibold text-white">
                  Pairs with
                </h4>
                <p className="font-sans text-xs text-slate-400">
                  Borhani, salad, and our house firni.
                </p>
              </div>

            </div>

            {/* 3. Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {/* Primary Solid Button */}
              <button className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#EEA25D] hover:bg-[#F2B67D] transition-colors text-[#18110C] font-sans text-sm font-bold shadow-lg shadow-black/20">
                <ShoppingBag className="size-4 stroke-[2.5]" />
                Order signature
              </button>

              {/* Secondary Outline Button */}
              <Link 
                href="/menu"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-sans text-sm font-semibold"
              >
                Explore the menu
                <ArrowRight className="size-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}