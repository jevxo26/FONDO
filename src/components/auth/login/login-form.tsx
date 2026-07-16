"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FormInput } from "../forms-input";

interface LoginFormProps {
  onSubmit: (data: { identity: string; password: string }) => void;
  loading?: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-6 animate-fadeIn w-full max-w-md mx-auto">
      <div>
        <h1 className="font-serif text-2xl text-[#1B0E08] mb-1">Welcome Back</h1>
        <p className="text-xs text-[#1B0E08]/50">
          Please enter your credentials to log into your account.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormInput
          label="Phone or Email"
          type="text"
          placeholder="name@domain.com or +880123..."
          icon={<Mail className="size-4" />}
          {...register("identity", { required: true })}
        />
        {errors.identity?.message && (
          <span className="text-[11px] text-red-600 font-sans mt-[-8px] ml-1">
            {String(errors.identity.message)}
          </span>
        )}

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
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#9C6B26] font-semibold font-sans hover:underline cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>
          {errors.password?.message && (
            <span className="text-[11px] text-red-600 font-sans mt-[-8px] ml-1">
              {String(errors.password.message)}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#1B0E08] text-white rounded-xl text-xs font-bold mt-2 hover:bg-[#1B0E08]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wider shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center font-sans text-[11px] text-[#1B0E08]/50 mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#9C6B26] font-bold hover:underline cursor-pointer">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
