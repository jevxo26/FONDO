"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSubmit: (data: { identity: string; password: string }) => void;
  loading?: boolean;
}

const springTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

export function LoginForm({ onSubmit: _onSubmit, loading }: LoginFormProps) {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.15 }}
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
    >
      <div>
        <h1 className="font-heading text-2xl text-foreground mb-1">Welcome Back</h1>
        <p className="text-xs text-muted-foreground">
          Please enter your credentials to log into your account.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <FormField label="Phone or Email" htmlFor="identity" error={errors.identity}>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="identity"
              type="text"
              placeholder="name@domain.com or +880123..."
              className="pl-10 text-xs"
              {...register("identity", { required: true })}
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
              {...register("password", { required: true })}
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

        <div className="text-right -mt-2">
          <Link
            href="/forgot-password"
            className="text-[11px] text-primary font-semibold font-sans hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full h-11 bg-foreground text-background rounded-xl text-xs font-bold mt-2 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] tracking-wider shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Signing In..." : "Sign In"}
        </motion.button>

        <p className="text-center font-sans text-[11px] text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline cursor-pointer">
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
