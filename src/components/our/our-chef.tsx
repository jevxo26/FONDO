import Image from "next/image";
import { Award, Star, BookOpen } from "lucide-react";

export default function StoryChef() {
  return (
    <section className="bg-background py-16">
      <div className="wrapper">
        {/* ASYMMETRIC TWO-COLUMN SPLIT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* LEFT COLUMN: Chef Portrait Image Card Container (5 Cols wide) */}
          <div className="md:col-span-5 relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-[var(--shadow-card)] border border-border/20 bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Executive Chef Abul Bashar holding a traditional kitchen wooden spoon paddle"
              fill
              sizes="(max-w-768px) 100vw, 42vw"
              priority
              className="object-cover object-center"
            />

            {/* Absolute Positioned Experience Float Badge */}
            <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-4 text-left shadow-md max-w-[120px] border border-white/40">
              <span className="block font-sans text-xl font-extrabold text-[#16100C] leading-none mb-0.5">
                28+
              </span>
              <span className="block font-sans text-[10px] font-medium text-muted-foreground leading-tight uppercase tracking-wider">
                years of the pass
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Biographical Context & Accolades (7 Cols wide) */}
          <div className="md:col-span-7 flex flex-col gap-5">
            {/* Header Identity Info */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold">
                Meet Our Chef
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                Chef Abul Bashar
              </h2>
            </div>

            {/* Biography Body Text */}
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Trained in the old kitchens of Puran Dhaka and refined under three-star chefs in
              Lucknow, Chef Bashar has spent nearly three decades perfecting a single,
              uncompromising idea: Mughlai food cooked the slow, honest way.
            </p>

            {/* Signature Accent Left-Bordered Blockquote */}
            <blockquote className="border-l-2 border-primary/60 pl-4 py-1 my-2">
              <p className="font-fraunces text-base md:text-lg italic text-foreground tracking-wide leading-relaxed">
                &ldquo;A great kacchi cannot be hurried — it has to be sealed, trusted, and waited
                on.&rdquo;
              </p>
            </blockquote>

            {/* Horizontal Metatag Accolade Pill Chips Row */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {/* Chip 1: Solid Highlight */}
              <div className="inline-flex items-center gap-1.5 bg-[#16100C] text-white px-3 h-8 rounded-full font-sans text-[11px] font-semibold shadow-sm">
                <Award className="size-3.5 text-primary" />
                <span>3x Best Chef · Dhaka</span>
              </div>

              {/* Chip 2: Border Pastel Soft Accent */}
              <div className="inline-flex items-center gap-1.5 bg-card border border-primary/30 text-foreground px-3 h-8 rounded-full font-sans text-[11px] font-medium shadow-sm">
                <Star className="size-3.5 text-primary fill-primary" />
                <span>Featured in Vogue India</span>
              </div>

              {/* Chip 3: Border Muted Pastel Soft Accent */}
              <div className="inline-flex items-center gap-1.5 bg-card border border-border text-muted-foreground px-3 h-8 rounded-full font-sans text-[11px] font-medium">
                <BookOpen className="size-3.5 text-muted-foreground" />
                <span>Author: &apos;Slow Mughlai&apos;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
