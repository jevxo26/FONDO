"use client";

import { useAuth } from "@/hooks/use-auth";
import { useChangePassword, useUpdateProfile } from "@/hooks/use-profile";
import { handleApiError } from "@/lib/api-error";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import { Edit3, User, Mail, Phone, UserCircle, Calendar, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PersonalInfoForm() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      await updateProfile.mutateAsync({
        firstName: form.get("firstName") as string,
        lastName: form.get("lastName") as string,
        phone: form.get("phone") as string,
        gender: form.get("gender") as string,
        dateOfBirth: form.get("dateOfBirth") as string,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-normal text-foreground">Personal Information</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">
          Manage your name, basic identity details, and active avatar settings.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-border/40">
        <div className="size-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full relative overflow-hidden group border-2 border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(206,163,89,0.15)]">
          <User className="size-8 text-primary/60" />
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
            <Edit3 className="size-5 text-background" />
          </div>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <button
                type="button"
                disabled
                className="px-4 py-2 border border-border/60 text-xs font-bold rounded-xl text-muted-foreground cursor-not-allowed bg-muted/50"
              >
                Upload New Image
              </button>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
          <p className="text-[10px] text-muted-foreground/50 mt-1.5">
            JPG, PNG strictly allowed up to 2MB.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="First Name" htmlFor="firstName">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={user?.firstName ?? ""}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </FormField>
        <FormField label="Last Name" htmlFor="lastName">
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={user?.lastName ?? ""}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </FormField>
        <FormField label="Email Address" htmlFor="email">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="email"
              type="email"
              defaultValue={user?.email ?? ""}
              disabled
              className="pl-9 h-9 text-xs opacity-60 cursor-not-allowed"
            />
          </div>
        </FormField>
        <FormField label="Phone Number" htmlFor="phone">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="phone"
              type="text"
              name="phone"
              defaultValue={user?.phone ?? ""}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </FormField>
        <FormField label="Gender" htmlFor="gender">
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <select
              id="gender"
              name="gender"
              defaultValue={user?.gender ?? "Male"}
              className="w-full h-9 pl-9 text-xs bg-background border border-input rounded-md focus:border-ring focus:ring-1 focus:ring-ring/50 outline-none transition-colors"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </FormField>
        <FormField label="Date of Birth" htmlFor="dateOfBirth">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              defaultValue={user?.dateOfBirth ?? ""}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </FormField>
        <div className="md:col-span-2 pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Edit3 className="size-3" /> Changes are saved to your account
              </div>
            </TooltipTrigger>
            <TooltipContent>Your profile is updated in real-time</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}

export function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword.mutateAsync({ currentPassword, newPassword, confirmPassword });
      toast.success("Password updated");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-normal text-foreground">Change Password</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">
          Update your password regularly to stay secure.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        <FormField label="Current Password" htmlFor="currentPassword">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              required
              placeholder="••••••••"
              className="pl-9 pr-9 h-9 text-xs"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCurrent ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </FormField>
        <FormField label="New Password" htmlFor="newPassword">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              name="newPassword"
              required
              placeholder="••••••••"
              className="pl-9 pr-9 h-9 text-xs"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showNew ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </FormField>
        <FormField label="Confirm New Password" htmlFor="confirmPassword">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="••••••••"
              className="pl-9 pr-9 h-9 text-xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </FormField>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={changePassword.isPending}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {changePassword.isPending ? "Updating..." : "Update Password"}
          </button>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Lock className="size-3" /> Use at least 8 characters
              </div>
            </TooltipTrigger>
            <TooltipContent>Password must contain letters and numbers</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}
