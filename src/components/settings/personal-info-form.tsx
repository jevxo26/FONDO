"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateProfile } from "@/store/api/slices/profile-api";
import { useUploadImage } from "@/store/api/slices/image-upload-api";
import { handleApiError } from "@/lib/api-error";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PersonalInfoForm() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const uploadImage = useUploadImage();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadImage.mutateAsync(file);
      setAvatar(result.data.url);
      await updateProfile.mutateAsync({ avatar: result.data.url });
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        firstName,
        lastName,
        phone,
        gender: gender || undefined,
        dateOfBirth: dateOfBirth || undefined,
        avatar: avatar || undefined,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <label className="group relative cursor-pointer">
          <Avatar className="size-20 ring-2 ring-primary/30 ring-offset-2 ring-offset-card">
            {avatar ? <AvatarImage src={avatar} alt={user?.firstName ?? ""} /> : null}
            <AvatarFallback className="bg-primary/10 font-heading text-xl font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-card)] ring-2 ring-card transition-transform group-hover:scale-110">
            <Camera className="size-4" />
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleAvatar}
            disabled={uploadImage.isLoading}
          />
        </label>
        <div className="text-center sm:text-left">
          <p className="font-sans text-sm font-semibold text-foreground">Profile Picture</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            JPG, PNG or WebP up to 5MB. Click the camera to upload.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="First Name" htmlFor="firstName" required>
          <Input
            id="firstName"
            size="sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormField>
        <FormField label="Last Name" htmlFor="lastName" required>
          <Input
            id="lastName"
            size="sm"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormField>
        <FormField label="Email Address" htmlFor="email">
          <Input id="email" size="sm" value={user?.email ?? ""} disabled />
        </FormField>
        <FormField label="Phone Number" htmlFor="phone" required>
          <Input
            id="phone"
            size="sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
        <FormField label="Gender" htmlFor="gender">
          <Select value={gender || undefined} onValueChange={(v) => setGender(v ?? "")}>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Date of Birth" htmlFor="dateOfBirth">
          <Input
            id="dateOfBirth"
            size="sm"
            type="date"
            value={dateOfBirth ?? ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-5">
        <Button type="submit" className="gap-2 rounded-xl" disabled={updateProfile.isPending}>
          {updateProfile.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
