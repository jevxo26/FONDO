"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfile, useChangePassword } from "@/hooks/use-profile";
import { User, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";

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
        <h3 className="font-fraunces text-xl font-normal text-foreground">Personal Information</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Manage your name, basic identity details, and active avatar settings.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-border">
        <div className="size-20 bg-muted rounded-full relative overflow-hidden group border border-border flex items-center justify-center text-muted-foreground">
          <User className="size-8" />
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Edit3 className="size-4 text-background" />
          </div>
        </div>
        <div>
          <button type="button" disabled className="px-3 py-1.5 border border-border text-[11px] font-bold rounded-xl text-muted-foreground cursor-not-allowed">Upload New Image</button>
          <p className="text-[10px] text-muted-foreground/50 mt-1.5">JPG, PNG strictly allowed up to 2MB.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">First Name</label>
          <input type="text" name="firstName" defaultValue={user?.firstName ?? ""} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Last Name</label>
          <input type="text" name="lastName" defaultValue={user?.lastName ?? ""} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Email Address</label>
          <input type="email" defaultValue={user?.email ?? ""} disabled className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground cursor-not-allowed" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Phone Number</label>
          <input type="text" name="phone" defaultValue={user?.phone ?? ""} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Gender</label>
          <select name="gender" defaultValue={user?.gender ?? "Male"} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Date of Birth</label>
          <input type="date" name="dateOfBirth" defaultValue={user?.dateOfBirth ?? ""} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="md:col-span-2 pt-2">
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ChangePasswordForm() {
  const changePassword = useChangePassword();

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
        <h3 className="font-fraunces text-xl font-normal text-foreground">Change Password</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Update your password regularly to stay secure.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Current Password</label>
          <input type="password" name="currentPassword" required placeholder="••••••••" className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">New Password</label>
          <input type="password" name="newPassword" required placeholder="••••••••" className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Confirm New Password</label>
          <input type="password" name="confirmPassword" required placeholder="••••••••" className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <button
          type="submit"
          disabled={changePassword.isPending}
          className="px-5 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
        >
          {changePassword.isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
