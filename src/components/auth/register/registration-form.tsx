"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Phone, Loader2 } from "lucide-react";
import { FormInput } from "../forms-input";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

interface RegistrationFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }) => void;
  loading?: boolean;
}

export function RegistrationForm({ onSubmit, loading }: RegistrationFormProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn w-full max-w-md mx-auto">
      <div>
        <h1 className="font-serif text-2xl text-[#1B0E08] mb-1">Create Account</h1>
        <p className="text-xs text-[#1B0E08]/50">
          Please fill in your credentials to register into our community platform.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FormInput
              label="First Name"
              placeholder="First"
              {...register("firstName")}
            />
            {errors.firstName?.message && (
              <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
                {String(errors.firstName.message)}
              </span>
            )}
          </div>
          <div>
            <FormInput
              label="Last Name"
              placeholder="Last"
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
                {String(errors.lastName.message)}
              </span>
            )}
          </div>
        </div>

        <div>
          <FormInput
            label="Email"
            type="email"
            placeholder="name@domain.com"
            icon={<Mail className="size-4" />}
            {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
              {String(errors.email.message)}
            </span>
          )}
        </div>

        <div>
          <FormInput
            label="Phone"
            type="tel"
            placeholder="+8801234567890"
            icon={<Phone className="size-4" />}
            {...register("phone")}
          />
          {errors.phone?.message && (
            <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
              {String(errors.phone.message)}
            </span>
          )}
        </div>

        <div>
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
            {...register("password")}
          />
          {errors.password && (
            <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <FormInput
            label="Confirm Password"
            type={showConfirmPass ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="size-4" />}
            rightAction={
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-[#1B0E08]/40 hover:text-[#1B0E08] transition-colors"
              >
                {showConfirmPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-[11px] text-red-600 font-sans mt-1 ml-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#9C6B26] text-white rounded-xl text-xs font-bold mt-2 hover:bg-[#855B20] disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wider shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Creating Account..." : "Register Account"}
        </button>

        <p className="text-center font-sans text-[11px] text-[#1B0E08]/50 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-[#9C6B26] font-bold hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
