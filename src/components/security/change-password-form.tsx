"use client";

import { useState } from "react";
import { useChangePassword } from "@/store/api/slices/profile-api";
import { handleApiError } from "@/lib/api-error";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState<Record<string, boolean>>({});

  const toggleShow = (field: string) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changePassword.mutateAsync({ currentPassword, newPassword, confirmPassword });
      toast.success("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const passwordFields = [
    { id: "currentPassword", value: currentPassword, onChange: setCurrentPassword },
    { id: "newPassword", value: newPassword, onChange: setNewPassword },
    { id: "confirmPassword", value: confirmPassword, onChange: setConfirmPassword },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {passwordFields.map(({ id, value, onChange }) => (
        <FormField key={id} label={id === "currentPassword" ? "Current Password" : id === "newPassword" ? "New Password" : "Confirm New Password"} htmlFor={id} required>
          <div className="relative">
            <Input
              id={id}
              size="sm"
              type={show[id] ? "text" : "password"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="••••••••"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => toggleShow(id)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={show[id] ? "Hide password" : "Show password"}
            >
              {show[id] ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </Button>
          </div>
        </FormField>
      ))}
      <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-5">
        <p className="mr-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3 text-muted-foreground/60" /> Use at least 8 characters
        </p>
        <Button type="submit" className="gap-2 rounded-xl" disabled={changePassword.isPending}>
          {changePassword.isPending ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          Update Password
        </Button>
      </div>
    </form>
  );
}
