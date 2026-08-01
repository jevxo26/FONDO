"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldPlus, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateRole } from "@/store/api/slices/rbac-api";

export function CreateRoleDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateRole();

  const handleSubmit = () => {
    if (!name.trim() || !slug.trim()) {
      toast.error("Role name and slug are required");
      return;
    }
    mutate(
      { name: name.trim(), slug: slug.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Role created");
          setName("");
          setSlug("");
          setDescription("");
          onOpenChange(false);
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : "Create failed"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
          <DialogDescription>Add a new role to the platform access matrix.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Regional Manager"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-slug">Slug</Label>
            <Input
              id="role-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toUpperCase().replace(/\s+/g, "_"))}
              placeholder="e.g. REGIONAL_MANAGER"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-description">Description</Label>
            <Textarea
              id="role-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What can this role do?"
              rows={3}
            />
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
              <ShieldPlus className="size-4" />
            )}
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
