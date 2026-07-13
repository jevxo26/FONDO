'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { FormInput } from "../forms-input";

export function RegistrationForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      contactInfo: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Registration Submitted Payload:", data);
  };

  const passwordValue = watch("password");

  return (
    <div className="flex flex-col gap-6 animate-fadeIn w-full max-w-md mx-auto">
      <div>
        <h1 className="font-serif text-2xl text-[#1B0E08] mb-1">Create Account</h1>
        <p className="text-xs text-[#1B0E08]/50">Please fill in your credentials to register into our community platform.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Row Container for Names */}
        <div className="grid grid-cols-2 gap-3">
          <FormInput 
            label="First Name" 
            placeholder="First" 
            {...register("firstName", { required: true })} 
          />
          <FormInput 
            label="Last Name" 
            placeholder="Last" 
            {...register("lastName", { required: true })} 
          />
        </div>

        {/* Contact Field (Email or Phone Number) */}
        <FormInput 
          label="Phone or Email" 
          type="text" 
          placeholder="e.g., +880123... or name@domain.com" 
          icon={<Mail className="size-4" />} 
          {...register("contactInfo", { required: true })} 
        />

        {/* Password Construction */}
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
          {...register("password", { required: true, minLength: 8 })} 
        />

        {/* Confirm Password Verification */}
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
          {...register("confirmPassword", { 
            required: true,
            validate: (value) => value === passwordValue || "Passwords do not match"
          })} 
        />
        {errors.confirmPassword && (
          <span className="text-[11px] text-red-600 font-sans mt-[-8px] ml-1">
            {errors.confirmPassword.message}
          </span>
        )}

        {/* Form Action Dispatch Node */}
        <button 
          type="submit" 
          className="w-full h-11 bg-[#9C6B26] text-white rounded-xl text-xs font-bold mt-2 hover:bg-[#855B20] transition-colors tracking-wider shadow-sm"
        >
          Register Account
        </button>
      </form>
    </div>
  );
}