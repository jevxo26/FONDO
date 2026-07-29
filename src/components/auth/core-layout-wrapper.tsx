import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CoreLayoutWrapperProps {
  currentStep: number;
  children: React.ReactNode;
}

export function CoreLayoutWrapper({ currentStep, children }: CoreLayoutWrapperProps) {
  const isIdentityFlow = currentStep <= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl bg-background rounded-4xl overflow-hidden border border-border/60 shadow-[var(--shadow-elevated)] grid grid-cols-1 lg:grid-cols-2 min-h-[780px] relative"
    >
      <div className="pointer-events-none absolute -top-40 -right-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Left Media Branding Panel */}
      <div className="relative hidden lg:flex flex-col justify-end p-12 bg-foreground overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(206,163,89,0.15)_0%,transparent_70%)]" />
        <Image
          src={
            isIdentityFlow
              ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Food Flow Heritage Scene"
          fill
          priority
          className="object-cover opacity-50 object-center"
        />
        <div className="relative z-10 text-background flex flex-col gap-4 max-w-md">
          {isIdentityFlow ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="self-start px-3 py-1 bg-primary rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-primary-foreground"
              >
                JOIN THE FLOW
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-heading text-4xl font-normal leading-tight tracking-tight text-background"
              >
                A heritage of flavor awaits your presence.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-sans text-xs text-background/80 leading-relaxed"
              >
                Create an account to unlock exclusive chef&apos;s specials, track your orders in
                real-time, and join our culinary community.
              </motion.p>
            </>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-heading text-5xl font-normal leading-none tracking-tight text-primary"
              >
                Food Flow
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-sans text-base text-background/90 font-light leading-relaxed"
              >
                The final touch to your artisanal journey.
              </motion.p>
              <div className="w-16 h-px bg-gradient-to-r from-primary/60 to-transparent mt-2" />
            </>
          )}
        </div>
      </div>

      {/* Right Interactive Form Area */}
      <div className="p-8 sm:p-14 flex flex-col justify-center bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] relative">
        <div className="pointer-events-none absolute -top-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="max-w-md w-full mx-auto relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
