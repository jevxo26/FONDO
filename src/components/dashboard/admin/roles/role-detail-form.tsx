"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RbacRole } from "@/types/rbac";
import { useUpdateRole } from "@/store/api/slices/rbac-api";

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export function RoleDetailForm({ role }: { role: RbacRole }) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description ?? "");
  const [status, setStatus] = useState<string>(role.status);
  const { mutate, isPending } = useUpdateRole();
  const readOnly = role.isDefault;

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Role name is required");
      return;
    }
    mutate(
      {
        id: role.id,
        name: name.trim(),
        description: description.trim() || null,
        status,
      },
      {
        onSuccess: () => toast.success("Role updated"),
        onError: (err) => toast.error(err instanceof Error ? err.message : "Update failed"),
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="detail-name">Role Name</Label>
          <Input
            id="detail-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={readOnly}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          {readOnly ? (
            <Input value={status} disabled />
          ) : (
            <Select
              items={statusItems}
              value={status}
              onValueChange={(v) => setStatus(v ?? "active")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="detail-description">Description</Label>
        <Textarea
          id="detail-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={readOnly}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isPending || readOnly}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Changes
        </Button>
        {readOnly && (
          <p className="text-xs text-muted-foreground">
            System-managed role — name, description, and status cannot be edited.
          </p>
        )}
      </div>
    </div>
  );
}
