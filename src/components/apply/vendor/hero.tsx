import React from "react";
import { Sparkles, Check, ArrowRight, Store, Star } from "lucide-react";
import { ShoppingBag, LayoutDashboard, Megaphone, Truck, BarChart3, ShieldCheck, FileCheck,TrendingUp, Utensils, ChefHat, Package } from "lucide-react";
import Image from "next/image";

const HERO_HIGHLIGHTS = ["More Orders", "Fast Weekly Payments", "Marketing Support", "Delivery Network"];

export const MARQUEE_LOGOS = ["Green Gourmet", "Keto Kingdom", "Urban Salad Co.", "NutriBowl Kitchen", "The Protein Lab", "Fresh Bites", "Pure Organic", "Chef's Garden"];

export const WHY_SELL_ITEMS = [
  { title: "Receive More Orders", desc: "Tap directly into thousands of health-conscious subscribers and active meal buyers.", icon: ShoppingBag },
  { title: "Easy Dashboard", desc: "Manage live orders, menu stock, pricing, and operating hours from a single portal.", icon: LayoutDashboard },
  { title: "Marketing Campaigns", desc: "Participate in curated healthy eating campaigns and featured merchant placements.", icon: Megaphone },
  { title: "Delivery Support", desc: "Utilize Fondo's dedicated temperature-controlled delivery fleet or use your own.", icon: Truck },
  { title: "Business Analytics", desc: "Track sales trends, top-selling dishes, repeat customer rates, and financial reports.", icon: BarChart3 },
  { title: "Secure Payments", desc: "Get direct automated payouts every single week directly into your bank or mobile wallet.", icon: ShieldCheck },
];

export const STEPS = [
  { step: "01", title: "Apply Online", desc: "Complete the application form with your kitchen details.", icon: FileCheck },
  { step: "02", title: "Verification", desc: "Our team verifies kitchen setup and safety compliance.", icon: ShieldCheck },
  { step: "03", title: "Setup Store", desc: "Upload your healthy menu, pricing, and business hours.", icon: Store },
  { step: "04", title: "Start Selling", desc: "Receive live orders and grow your daily revenue.", icon: TrendingUp },
];

export const VENDOR_TYPES = [
  { title: "Restaurant", desc: "Dine-in or takeaway places scaling online healthy meal deliveries.", badge: "Est. Outlets", icon: Utensils },
  { title: "Cloud Kitchen", desc: "Delivery-optimized virtual kitchens for high volume.", badge: "Virtual Brands", icon: Store },
  { title: "Home Chef", desc: "Artisanal culinary artists offering homemade nutritious dishes.", badge: "Micro-Chefs", icon: ChefHat },
  { title: "Meal Prep Co.", desc: "Specialized fitness and macro-focused meal preppers.", badge: "Subscriptions", icon: Package },
];

export const CUISINE_OPTIONS = ["Healthy Meals", "Weight Loss", "Weight Gain", "Keto", "Vegan", "High Protein", "Breakfast", "Lunch", "Dinner", "Traditional", "International"];

export const VENDOR_BENEFITS_LIST = [
  "Dedicated Merchant Success Manager", "Real-time Order Tracking & Dispatch",
  "Automated Stock & Menu Pause", "Customer Feedback & Ratings Engine",
  "Custom Promotional Coupon Creator", "Weekly Transparent Financial Statements",
  "In-app Targeted Banner Exposure", "Multi-branch Centralized Management",
];

export const TESTIMONIALS = [
  { name: "Green Gourmet Co.", type: "Restaurant Outlet", revenue: "৳2.4L Monthly Rev", review: "Fondo brought us an entirely new demographic of fitness enthusiasts.", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300" },
  { name: "NutriPrep Kitchen", type: "Cloud Kitchen", revenue: "৳3.8L Monthly Rev", review: "Managing recurring weekly meal plans used to be chaotic. Fondo simplified it.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300" },
  { name: "Ayesha's Artisanal Oven", type: "Home Chef", revenue: "৳1.2L Monthly Rev", review: "Logistics was my biggest bottleneck. Fondo handles all deliveries smoothly.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" },
];

export const FAQ_ITEMS = [
  { q: "Who can join Fondo as a merchant partner?", a: "Any registered restaurant, cloud kitchen, food safety certified home chef, or meal prep business can apply." },
  { q: "How long does the vendor approval process take?", a: "Verification completes within 24 to 48 business hours after document submission." },
  { q: "What is the payout schedule for vendors?", a: "Payouts are automatically transferred every Friday directly into your bank or mobile wallet." },
  { q: "What commission structure does Fondo charge?", a: "Fondo operates on a performance-based tiered commission model depending on your order volume." },
];
export function VendorHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-[var(--space-section)] border-b border-border">
      <div className="wrapper px-[var(--space-container)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary border border-border text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Fondo Merchant Network
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1.08]">
              Grow Your Food Business with <span className="text-primary italic">Fondo</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl">
              Join thousands of successful restaurants, cloud kitchens, and home chefs reaching health-conscious customers every day.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {HERO_HIGHLIGHTS.map((chip, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3.5 py-2.5 bg-card border border-border rounded-xl text-xs font-semibold text-foreground shadow-[var(--shadow-card)]">
                  <Check className="size-4 text-primary shrink-0" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#vendor-apply" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-[var(--shadow-elevated)] flex items-center gap-2">
                Become a Vendor <ArrowRight className="size-4" />
              </a>
              <a href="#why-fondo" className="px-8 py-4 bg-secondary text-foreground border border-border rounded-2xl font-bold text-sm hover:bg-muted transition-colors">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl bg-secondary border border-border overflow-hidden shadow-[var(--shadow-elevated)] p-6 flex flex-col justify-between">
              <Image width={500} height={500} src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" alt="Kitchen Prep" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="relative z-10 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center gap-3 w-max">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <Store className="size-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Active Merchants</div>
                  <div className="text-base font-bold text-foreground">500+ Vendors</div>
                </div>
              </div>
              <div className="relative z-10 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center justify-between self-end w-full max-w-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Monthly Volume</div>
                  <div className="text-xl font-bold text-foreground">100,000+ Orders</div>
                </div>
                <div className="flex items-center gap-1 text-primary font-bold text-xs bg-primary/10 px-2.5 py-1 rounded-full">
                  <Star className="size-3.5 fill-primary" /> 4.9★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}