"use client";

import { ReactNode } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubModelManagerProps<T> {
  title: string;
  description?: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  onDelete: (item: T) => void;
  deletePending?: boolean;
  addForm: ReactNode;
}

export function SubModelManager<T>({
  title,
  description,
  items,
  renderItem,
  onDelete,
  deletePending,
  addForm,
}: SubModelManagerProps<T>) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="border-b border-border pb-3">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>

      <div className="mt-4 space-y-2">
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground">No items yet.</p>
        )}
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
          >
            <div className="min-w-0">{renderItem(item)}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-destructive hover:text-destructive/80"
              onClick={() => onDelete(item)}
              disabled={deletePending}
            >
              {deletePending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">{addForm}</div>
    </div>
  );
}
