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
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodSubCategory, SubCategoryPayload } from "@/types/admin-food";
import { useCreateSubCategory, useUpdateSubCategory } from "@/store/api/slices/admin-food-api";

interface SubCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId?: string;
  subCategory?: AdminFoodSubCategory | null;
}

export function SubCategoryDialog({
  open,
  onOpenChange,
  categoryId,
  subCategory,
}: SubCategoryDialogProps) {
  const { mutateAsync: create, isPending: creating } = useCreateSubCategory();
  const { mutateAsync: update, isPending: updating } = useUpdateSubCategory();
  const isEdit = !!subCategory;

  const [name, setName] = useState(subCategory?.name ?? "");
  const [slug, setSlug] = useState(subCategory?.slug ?? "");
  const [description, setDescription] = useState(subCategory?.description ?? "");
  const [sortOrder, setSortOrder] = useState(String(subCategory?.sortOrder ?? 0));

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
    if (!name.trim() || !slug.trim() || !categoryId) return;

    const payload: SubCategoryPayload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description || undefined,
      sortOrder: Number(sortOrder) || 0,
    };

    try {
      if (isEdit && subCategory) {
        await update({ id: subCategory.id, body: payload });
        toast.success("Sub-category updated");
      } else {
        await create({ categoryId, body: payload });
        toast.success("Sub-category created");
      }
      onOpenChange(false);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to save sub-category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Sub-Category" : "Add Sub-Category"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this sub-category." : "Add a sub-category under the selected category."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <FormField label="Name" required>
            <input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Chicken Biryani" className={inputStyles} />
          </FormField>
          <FormField label="Slug" required>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="chicken-biryani" className={inputStyles} />
          </FormField>
          <FormField label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Short description..." className={inputStyles} />
          </FormField>
          <FormField label="Sort Order">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputStyles} />
          </FormField>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={creating || updating || !name.trim() || !slug.trim()}>
            {creating || updating ? <Loader2 className="mr-1 size-4 animate-spin" /> : null}
            {isEdit ? "Save Changes" : "Create Sub-Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
