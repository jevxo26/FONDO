import React from "react";


export const FormInput = React.forwardRef<
  HTMLInputElement,
  { label: string; icon?: React.ReactNode; rightAction?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, icon, rightAction, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full font-sans text-xs">
    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1B0E08]/70">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1B0E08]/40">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        {...props}
        className={`h-10 w-full bg-[#FDFBF7] border border-[#E6DFD5] rounded-xl text-xs focus:ring-1 focus:ring-[#9C6B26] focus:border-[#9C6B26] focus:outline-none transition-all ${
          icon ? "pl-10" : "px-3.5"
        } ${rightAction ? "pr-10" : ""}`}
      />
      {rightAction && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {rightAction}
        </div>
      )}
    </div>
  </div>
));

FormInput.displayName = "FormInput";