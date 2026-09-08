"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inputStyles } from "@/lib/schema/food-schema";
import { SubModelManager } from "@/components/dashboard/admin/foods/edit/sub-model-manager";
import type {
  AdminFoodDiscount,
  AdminFoodPrice,
  AdminFoodSchedule,
  AdminFoodVariant,
} from "@/types/admin-food";
import {
  useCreateDiscount,
  useCreatePrice,
  useCreateSchedule,
  useCreateVariant,
  useDeleteDiscount,
  useDeletePrice,
  useDeleteSchedule,
  useDeleteVariant,
} from "@/store/api/slices/admin-food-api";

const toNum = (v: string) => {
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

// ─── Variants ────────────────────────────────────────────────
export function VariantsEditor({ foodId, items }: { foodId: string; items: AdminFoodVariant[] }) {
  const { mutateAsync: create, isPending: creating } = useCreateVariant();
  const { mutateAsync: remove, isPending: deleting } = useDeleteVariant();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!name.trim() || toNum(price) === undefined) return;
    try {
      await create({ foodId, body: { name: name.trim(), price: toNum(price)! } });
      toast.success("Variant added");
      setName("");
      setPrice("");
    } catch {
      toast.error("Failed to add variant");
    }
  };

  return (
    <SubModelManager<AdminFoodVariant>
      title="Variants"
      description="Sizes / options for this food."
      items={items}
      renderItem={(v) => (
        <div className="text-sm">
          <span className="font-semibold text-foreground">{v.name}</span>
          <span className="ml-2 text-muted-foreground">
            {v.discountPrice ? `${v.discountPrice} BDT` : `${v.price} BDT`}
          </span>
        </div>
      )}
      onDelete={(v) => remove(v.id).catch(() => toast.error("Failed to delete variant"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Regular"
            className={inputStyles}
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className={inputStyles}
          />
          <Button type="button" size="sm" onClick={submit} disabled={creating}>
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      }
    />
  );
}

// ─── Prices ──────────────────────────────────────────────────
export function PricesEditor({ foodId, items }: { foodId: string; items: AdminFoodPrice[] }) {
  const { mutateAsync: create, isPending: creating } = useCreatePrice();
  const { mutateAsync: remove, isPending: deleting } = useDeletePrice();
  const [basePrice, setBasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (toNum(basePrice) === undefined) return;
    try {
      await create({
        foodId,
        body: { basePrice: toNum(basePrice)!, salePrice: toNum(salePrice) },
      });
      toast.success("Price added");
      setBasePrice("");
      setSalePrice("");
    } catch {
      toast.error("Failed to add price");
    }
  };

  return (
    <SubModelManager<AdminFoodPrice>
      title="Prices"
      description="Base and sale price points."
      items={items}
      renderItem={(p) => (
        <div className="text-sm">
          <span className="font-semibold text-foreground">{p.basePrice} BDT</span>
          {p.salePrice && <span className="ml-2 text-muted-foreground">Sale: {p.salePrice}</span>}
        </div>
      )}
      onDelete={(p) => remove(p.id).catch(() => toast.error("Failed to delete price"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="Base price"
            type="number"
            className={inputStyles}
          />
          <input
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="Sale price"
            type="number"
            className={inputStyles}
          />
          <Button type="button" size="sm" onClick={submit} disabled={creating}>
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      }
    />
  );
}

// ─── Discounts ───────────────────────────────────────────────
export function DiscountsEditor({
  foodId,
  items,
}: {
  foodId: string;
  items: AdminFoodDiscount[];
}) {
  const { mutateAsync: create, isPending: creating } = useCreateDiscount();
  const { mutateAsync: remove, isPending: deleting } = useDeleteDiscount();
  const [type, setType] = useState<"PERCENTAGE" | "FLAT">("PERCENTAGE");
  const [value, setValue] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (toNum(value) === undefined) return;
    try {
      await create({ foodId, body: { discountType: type, discountValue: toNum(value)! } });
      toast.success("Discount added");
      setValue("");
    } catch {
      toast.error("Failed to add discount");
    }
  };

  return (
    <SubModelManager<AdminFoodDiscount>
      title="Discounts"
      description="Active discount offers."
      items={items}
      renderItem={(d) => (
        <div className="text-sm">
          <span className="font-semibold text-foreground">
            {d.discountType === "PERCENTAGE" ? `${d.discountValue}% off` : `${d.discountValue} BDT off`}
          </span>
        </div>
      )}
      onDelete={(d) => remove(d.id).catch(() => toast.error("Failed to delete discount"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <select value={type} onChange={(e) => setType(e.target.value as "PERCENTAGE" | "FLAT")} className={inputStyles}>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
          </select>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            type="number"
            className={inputStyles}
          />
          <Button type="button" size="sm" onClick={submit} disabled={creating}>
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      }
    />
  );
}

// ─── Schedules ───────────────────────────────────────────────
export function SchedulesEditor({
  foodId,
  items,
}: {
  foodId: string;
  items: AdminFoodSchedule[];
}) {
  const { mutateAsync: create, isPending: creating } = useCreateSchedule();
  const { mutateAsync: remove, isPending: deleting } = useDeleteSchedule();
  const [mealType, setMealType] = useState("LUNCH");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!startTime || !endTime) return;
    try {
      await create({
        foodId,
        body: { mealType: mealType as "LUNCH", startTime, endTime },
      });
      toast.success("Schedule added");
      setStartTime("");
      setEndTime("");
    } catch {
      toast.error("Failed to add schedule");
    }
  };

  return (
    <SubModelManager<AdminFoodSchedule>
      title="Schedules"
      description="Meal availability windows."
      items={items}
      renderItem={(s) => (
        <div className="text-sm">
          <span className="font-semibold text-foreground">{s.mealType}</span>
          <span className="ml-2 text-muted-foreground">
            {s.startTime} – {s.endTime}
          </span>
        </div>
      )}
      onDelete={(s) => remove(s.id).catch(() => toast.error("Failed to delete schedule"))}
      deletePending={deleting}
      addForm={
        <div className="flex flex-wrap gap-2">
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} className={inputStyles}>
            {["BREAKFAST", "LUNCH", "DINNER", "SNACKS"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputStyles} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputStyles} />
          <Button type="button" size="sm" onClick={submit} disabled={creating}>
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      }
    />
  );
}
