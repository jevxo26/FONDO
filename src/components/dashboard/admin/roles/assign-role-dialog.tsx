"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignRoleToUser, useListRolesQuery } from "@/store/api/slices/rbac-api";

export function AssignRoleDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState<string | null>(null);
  const { data: roles = [] } = useListRolesQuery();
  const { mutate, isPending } = useAssignRoleToUser();

  const roleItems = roles.map((role) => ({ label: role.name, value: role.id }));

  const handleSubmit = () => {
    if (!userId.trim() || !roleId) {
      toast.error("User ID and role are required");
      return;
    }
    mutate(
      { userId: userId.trim(), roleId },
      {
        onSuccess: () => {
          toast.success("Role assigned");
          setUserId("");
          setRoleId(null);
          onOpenChange(false);
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : "Assignment failed"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Role to User</DialogTitle>
          <DialogDescription>Grant a role to a user by entering their user ID.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assign-user">User ID</Label>
            <Input
              id="assign-user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="UUID of the user"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select items={roleItems} value={roleId} onValueChange={setRoleId}>
              <SelectTrigger className="w-full">
                <SelectValue>Select a role</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name} · {role.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <UserPlus className="size-4" />
            )}
            Assign Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
