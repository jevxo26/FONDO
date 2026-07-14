import React from "react";
import Image from "next/image";

interface CoreLayoutWrapperProps {
  currentStep: number;
  children: React.ReactNode;
}

export function CoreLayoutWrapper({ currentStep, children }: CoreLayoutWrapperProps) {
  const isIdentityFlow = currentStep <= 2;

  return (
    <div className="w-full max-w-6xl bg-[#FDFBF7] rounded-[32px] overflow-hidden border border-[#E6DFD5] shadow-[0_8px_30px_rgb(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-2 min-h-[780px]">
      {/* Left Media Branding Panel */}
      <div className="relative hidden lg:flex flex-col justify-end p-12 bg-[#0F0A06]">
        <Image
          src={isIdentityFlow ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Food Flow Heritage Scene"
          fill
          priority
          className="object-cover opacity-55 object-center"
        />
        <div className="relative z-10 text-white flex flex-col gap-4 max-w-md">
          {isIdentityFlow ? (
            <>
              <div className="self-start px-3 py-1 bg-primary rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-white">
                JOIN THE FLOW
              </div>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#FDFBF7]">
                A heritage of flavor awaits your presence.
              </h2>
              <p className="font-sans text-xs text-[#E6DFD5]/80 leading-relaxed">
                Create an account to unlock exclusive chef&apos;s specials, track your orders in real-time, and join our culinary community.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-5xl font-normal leading-none tracking-tight text-[#E8A34A]">
                Food Flow
              </h2>
              <p className="font-sans text-base text-[#FDFBF7]/90 font-light leading-relaxed">
                The final touch to your artisanal journey.
              </p>
              <div className="w-16 h-[1px] bg-[#FDFBF7]/30 mt-2" />
            </>
          )}
        </div>
      </div>

      {/* Right Interactive Form Area */}
      <div className="p-8 sm:p-14 flex flex-col justify-center bg-white relative">
        <div className="max-w-md w-full mx-auto">{children}</div>
      </div>
    </div>
  );
}