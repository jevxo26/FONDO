"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/table";
import { foodColumns } from "./food-columns";
import { adminFoods, type AdminFoodItem } from "@/data/foods";
import { EditFoodModal } from "./edit-food-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FoodTableSection() {
  const [editingFood, setEditingFood] = useState<AdminFoodItem | null>(null);
  const [deletingFood, setDeletingFood] = useState<AdminFoodItem | null>(null);

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6">
        <DataTable
          data={adminFoods}
          columns={foodColumns}
          rowActions={[
            {
              label: "View",
              onClick: (food) => console.log("View", food),
            },
            {
              label: "Edit",
              onClick: (food) => setEditingFood(food),
            },
            {
              label: "Delete",
              variant: "destructive",
              onClick: (food) => setDeletingFood(food),
            },
          ]}
        />
      </div>

      {editingFood && (
        <EditFoodModal
          food={editingFood}
          open={!!editingFood}
          onOpenChange={(open) => {
            if (!open) setEditingFood(null);
          }}
        />
      )}

      <Dialog
        open={!!deletingFood}
        onOpenChange={(open) => {
          if (!open) setDeletingFood(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Food Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deletingFood?.name}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeletingFood(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Delete", deletingFood);
                setDeletingFood(null);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}