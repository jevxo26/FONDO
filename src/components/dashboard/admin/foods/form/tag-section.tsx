"use client";

import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import type { AdminFoodTag } from "@/types/admin-food";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Tags, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface TagSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
  tags?: AdminFoodTag[];
  tagIds?: string[];
  onToggleTag: (tagId: string) => void;
}

const labelColors = [
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#64748b",
];

export function TagSection({
  register,
  control,
  tags,
  tagIds = [],
  onToggleTag,
}: TagSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "labels" });
  const dietFields = useFieldArray({ control, name: "diets" });

  const count = (tagIds?.length ?? 0) + fields.length + dietFields.fields.length;

  return (
    <FormSection
      icon={Tags}
      title="Tags, Labels & Diets"
      description="Highlight and classify this food."
      count={count}
    >
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Tags</p>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = tagIds.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onToggleTag(tag.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
                      : "border-border bg-muted text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No tags available yet.</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Labels</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ label: "", color: labelColors[0] })}
            >
              <Plus className="mr-1 size-3.5" />
              Add Label
            </Button>
          </div>

          {fields.length === 0 && <p className="text-xs text-muted-foreground">No custom labels.</p>}

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  type="color"
                  {...register(`labels.${index}.color`)}
                  className="size-8 shrink-0 cursor-pointer rounded-md border border-border bg-transparent"
                />
                <Input
                  {...register(`labels.${index}.label`)}
                  placeholder="e.g. Chef's Special"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-destructive hover:text-destructive/80"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Diets</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dietFields.append({ dietType: "" })}
            >
              <Plus className="mr-1 size-3.5" />
              Add Diet
            </Button>
          </div>

          {dietFields.fields.length === 0 && <p className="text-xs text-muted-foreground">No diets flagged.</p>}

          <div className="space-y-2">
            {dietFields.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`diets.${index}.dietType`)}
                  placeholder="e.g. Keto, Halal, Vegan"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-destructive hover:text-destructive/80"
                  onClick={() => dietFields.remove(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormSection>
  );
}
