"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField } from "@/components/common/form-field";
import { Switch } from "@/components/ui/switch";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodCategory, CategoryPayload } from "@/types/admin-food";
import { useCreateCategory, useUpdateCategory } from "@/store/api/slices/admin-food-api";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: AdminFoodCategory | null;
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
  const { mutateAsync: create, isPending: creating } = useCreateCategory();
  const { mutateAsync: update, isPending: updating } = useUpdateCategory();
  const isEdit = !!category;

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [icon, setIcon] = useState(category?.icon ?? "");
  const [sortOrder, setSortOrder] = useState(String(category?.sortOrder ?? 0));
  const [status, setStatus] = useState<"active" | "inactive">(category?.status ?? "active");
  const [popular, setPopular] = useState(category?.popular ?? false);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    );
  };

  const submit = async () => {
    if (creating || updating) return;
    if (!name.trim() || !slug.trim()) return;

    const payload: CategoryPayload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description || undefined,
      icon: icon || undefined,
      sortOrder: Number(sortOrder) || 0,
      popular,
      status,
    };

    try {
      if (isEdit && category) {
        await update({ id: category.id, body: payload });
        toast.success("Category updated");
      } else {
        await create(payload);
        toast.success("Category created");
      }
      onOpenChange(false);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to save category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this category." : "Create a new food category."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <FormField label="Name" required>
            <input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Biryani" className={inputStyles} />
          </FormField>
          <FormField label="Slug" required>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="biryani" className={inputStyles} />
          </FormField>
          <FormField label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Short description..." className={inputStyles} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon (emoji)">
              <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🍛" className={inputStyles} />
            </FormField>
            <FormField label="Sort Order">
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputStyles} />
            </FormField>
          </div>
          <FormField label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value as "active" | "inactive")} className={inputStyles}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </FormField>
          <label className="flex cursor-pointer items-center justify-between rounded-md border border-border/70 bg-card px-3 py-2.5">
            <span className="text-sm font-medium">Popular (homepage & search)</span>
            <Switch checked={popular} onCheckedChange={setPopular} />
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={creating || updating || !name.trim() || !slug.trim()}>
            {creating || updating ? <Loader2 className="mr-1 size-4 animate-spin" /> : null}
            {isEdit ? "Save Changes" : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
