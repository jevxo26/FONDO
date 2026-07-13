"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactMain() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API integration here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-background pb-16">
      <div className="wrapper">
        {/* TWO-COLUMN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Contact Information Chips (5 Columns Wide) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* WhatsApp Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary border border-border/40 shadow-sm transition-colors hover:border-primary/30">
              <div className="size-12 rounded-full border border-primary/30 flex items-center justify-center bg-card shrink-0">
                <MessageCircle className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  WhatsApp
                </span>
                <span className="font-sans text-sm font-bold text-foreground">+880 1577147480</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary border border-border/40 shadow-sm transition-colors hover:border-primary/30">
              <div className="size-12 rounded-full border border-primary/30 flex items-center justify-center bg-card shrink-0">
                <Mail className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Email
                </span>
                <span className="font-sans text-sm font-bold text-foreground">
                  ibrahimux6@gmail.com
                </span>
              </div>
            </div>

            {/* Address Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary border border-border/40 shadow-sm transition-colors hover:border-primary/30">
              <div className="size-12 rounded-full border border-primary/30 flex items-center justify-center bg-card shrink-0">
                <MapPin className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Address
                </span>
                <span className="font-sans text-sm font-bold text-foreground">
                  House 14, Road 11, Banani, Dhaka 1213
                </span>
              </div>
            </div>

            {/* Hours Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary border border-border/40 shadow-sm transition-colors hover:border-primary/30">
              <div className="size-12 rounded-full border border-primary/30 flex items-center justify-center bg-card shrink-0">
                <Clock className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Hours
                </span>
                <span className="font-sans text-sm font-bold text-foreground">
                  12:00 pm - 12:00 am, every day
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Container (7 Columns Wide) */}
          <div className="lg:col-span-7 bg-card rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-border/40">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Top Row: Name & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-sans text-xs text-muted-foreground font-medium pl-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors"
                  />
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="font-sans text-xs text-muted-foreground font-medium pl-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+880"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors"
                  />
                </div>
              </div>

              {/* Middle Row: Email Input */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-sans text-xs text-muted-foreground font-medium pl-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 w-full bg-background border border-border/50 rounded-xl px-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              {/* Bottom Row: Textarea */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-sans text-xs text-muted-foreground font-medium pl-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px] w-full bg-background border border-border/50 rounded-xl p-4 font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 transition-colors resize-y"
                />
              </div>

              {/* Submit Action Button */}
              <div className="mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-4 h-14 pl-6 pr-2 rounded-full bg-[#16100C] text-white hover:bg-[#2C241E] transition-colors group"
                >
                  <span className="font-sans text-sm font-semibold tracking-wide">
                    Send Message
                  </span>
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-[#16100C] transition-transform group-hover:scale-105">
                    <Send className="size-4 ml-0.5" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
