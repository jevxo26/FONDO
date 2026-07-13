import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FormInput } from "../forms-input";

export function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-6 animate-fadeIn w-full max-w-md mx-auto">
      <div>
        <h1 className="font-serif text-2xl text-[#1B0E08] mb-1">Welcome Back</h1>
        <p className="text-xs text-[#1B0E08]/50">
          Please enter your credentials to log into your account.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Identity Input Field */}
        <FormInput
          label="Phone or Email"
          type="text"
          placeholder="name@domain.com or +880123..."
          icon={<Mail className="size-4" />}
          {...register("identity", { required: true })}
        />

        {/* Secure Password Input Field */}
        <div className="flex flex-col gap-1">
          <FormInput
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="size-4" />}
            rightAction={
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-[#1B0E08]/40 hover:text-[#1B0E08] transition-colors"
              >
                {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
            {...register("password", { required: true })}
          />
          <div className="text-right mt-1">
            <span className="text-[11px] text-[#9C6B26] font-semibold font-sans hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full h-11 bg-[#1B0E08] text-white rounded-xl text-xs font-bold mt-2 hover:bg-[#1B0E08]/90 transition-colors tracking-wider shadow-sm"
        >
          Sign In
        </button>

        {/* Navigation Redirect Link */}
        <p className="text-center font-sans text-[11px] text-[#1B0E08]/50 mt-2">
          Don&apos;t have an account?{" "}
          <span className="text-[#9C6B26] font-bold hover:underline cursor-pointer">
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}