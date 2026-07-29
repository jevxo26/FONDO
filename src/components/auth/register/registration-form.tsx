"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { motion } from "framer-motion";

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

const springTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

export function RegistrationForm({ onSubmit, loading }: RegistrationFormProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.15 }}
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
    >
      <div>
        <h1 className="font-heading text-2xl text-foreground mb-1">Create Account</h1>
        <p className="text-xs text-muted-foreground">
          Please fill in your credentials to register into our community platform.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First Name" htmlFor="firstName" error={errors.firstName}>
            <Input id="firstName" placeholder="First" className="text-xs" {...register("firstName")} />
          </FormField>
          <FormField label="Last Name" htmlFor="lastName" error={errors.lastName}>
            <Input id="lastName" placeholder="Last" className="text-xs" {...register("lastName")} />
          </FormField>
        </div>

        <FormField label="Email" htmlFor="email" error={errors.email}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="name@domain.com"
              className="pl-10 text-xs"
              {...register("email")}
            />
          </div>
        </FormField>

        <FormField label="Phone" htmlFor="phone" error={errors.phone}>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="phone"
              type="tel"
              placeholder="+8801234567890"
              className="pl-10 text-xs"
              {...register("phone")}
            />
          </div>
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 text-xs"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>

        <FormField label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="confirmPassword"
              type={showConfirmPass ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 text-xs"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-xs font-bold mt-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] tracking-wider shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Creating Account..." : "Register Account"}
        </motion.button>

        <p className="text-center font-sans text-[11px] text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
