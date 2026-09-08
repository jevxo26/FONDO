"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
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
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              {showConfirmPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
        </FormField>

        <motion.div
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <Button
            type="submit"
            variant="default"
            size="xl"
            disabled={loading}
            className="w-full tracking-wider"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Creating Account..." : "Register Account"}
          </Button>
        </motion.div>

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
