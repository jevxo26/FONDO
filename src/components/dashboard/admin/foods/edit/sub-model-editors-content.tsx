"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { inputStyles } from "@/lib/schema/food-schema";
import { SubModelManager } from "@/components/dashboard/admin/foods/edit/sub-model-manager";
import type {
  AdminFoodAddon,
  AdminFoodAllergen,
  AdminFoodIngredient,
  AdminFoodLabel,
  AdminFoodTag,
} from "@/types/admin-food";
import {
  useAddFoodTags,
  useCreateAddon,
  useCreateAddonItem,
  useCreateAllergen,
  useCreateFoodImage,
  useCreateIngredient,
  useCreateLabel,
  useDeleteAddon,
  useDeleteAddonItem,
  useDeleteAllergen,
  useDeleteFoodImage,
  useDeleteIngredient,
  useDeleteLabel,
  useRemoveFoodTag,
} from "@/store/api/slices/admin-food-api";

const toNum = (v: string) => {
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

// ─── Addons (with inline item management) ────────────────────
export function AddonsEditor({ foodId, items }: { foodId: string; items: AdminFoodAddon[] }) {
  const { mutateAsync: create, isPending: creating } = useCreateAddon();
  const { mutateAsync: remove, isPending: deleting } = useDeleteAddon();
  const { mutateAsync: createItem, isPending: itemCreating } = useCreateAddonItem();
  const { mutateAsync: removeItem } = useDeleteAddonItem();
  const [name, setName] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [itemInputs, setItemInputs] = useState<Record<string, string>>({});
  const [itemPrices, setItemPrices] = useState<Record<string, string>>({});

  const addItem = async (addonId: string) => {
    const itemName = (itemInputs[addonId] ?? "").trim();
    if (!itemName) return;
    try {
      await createItem({ addonId, body: { name: itemName, price: toNum(itemPrices[addonId] ?? "") ?? 0 } });
      toast.success("Item added");
      setItemInputs((s) => ({ ...s, [addonId]: "" }));
      setItemPrices((s) => ({ ...s, [addonId]: "" }));
    } catch {
      toast.error("Failed to add item");
    }
  };

  const submit = async () => {
    if (creating || deleting || itemCreating) return;
    if (!name.trim()) return;
    try {
      await create({ foodId, body: { name: name.trim(), isRequired } });
      toast.success("Addon group added");
      setName("");
      setIsRequired(false);
    } catch {
      toast.error("Failed to add addon group");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="border-b border-border pb-3">
        <h2 className="text-base font-bold text-foreground">Addons</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Optional or required add-on groups.</p>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="text-xs text-muted-foreground">No addons yet.</p>}
        {items.map((addon) => (
          <div key={addon.id} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold text-foreground">{addon.name}</span>
                <span className="ml-2 text-muted-foreground">
                  {addon.isRequired ? "Required" : "Optional"}
                  {addon.maxSelection ? ` · max ${addon.maxSelection}` : ""}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive/80"
                onClick={() => remove(addon.id).catch(() => toast.error("Failed to delete addon"))}
                disabled={deleting}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="mt-2 space-y-1">
              {addon.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {item.name} · {item.price} BDT
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-destructive/80 hover:text-destructive"
                    onClick={() =>
                      removeItem(item.id).catch(() => toast.error("Failed to delete item"))
                    }
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                value={itemInputs[addon.id] ?? ""}
                onChange={(e) => setItemInputs((s) => ({ ...s, [addon.id]: e.target.value }))}
                placeholder="Item name"
                className={inputStyles}
              />
              <input
                value={itemPrices[addon.id] ?? ""}
                onChange={(e) => setItemPrices((s) => ({ ...s, [addon.id]: e.target.value }))}
                placeholder="Price"
                type="number"
                className={inputStyles}
              />
              <Button type="button" size="sm" variant="outline" onClick={() => addItem(addon.id)} disabled={itemCreating}>
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Group name e.g. Extra Protein"
            className={inputStyles}
          />
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
            <Switch checked={isRequired} onCheckedChange={setIsRequired} />
            Required
          </label>
          <Button type="button" size="sm" onClick={submit} disabled={creating}>
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Ingredients ─────────────────────────────────────────────
export function IngredientsEditor({
  foodId,
  items,
}: {
  foodId: string;
  items: AdminFoodIngredient[];
}) {
  const { mutateAsync: create, isPending: creating } = useCreateIngredient();
  const { mutateAsync: remove, isPending: deleting } = useDeleteIngredient();
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!ingredientName.trim()) return;
    try {
      await create({ foodId, body: { ingredientName: ingredientName.trim(), quantity: quantity || undefined } });
      toast.success("Ingredient added");
      setIngredientName("");
      setQuantity("");
    } catch {
      toast.error("Failed to add ingredient");
    }
  };

  return (
    <SubModelManager<AdminFoodIngredient>
      title="Ingredients"
      description="Key ingredients shown to customers."
      items={items}
      renderItem={(i) => (
        <div className="text-sm">
          <span className="font-semibold text-foreground">{i.ingredientName}</span>
          {i.quantity && <span className="ml-2 text-muted-foreground">{i.quantity}</span>}
          {i.isOptional && <span className="ml-2 text-xs text-muted-foreground">optional</span>}
        </div>
      )}
      onDelete={(i) => remove(i.id).catch(() => toast.error("Failed to delete ingredient"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            placeholder="Ingredient"
            className={inputStyles}
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty (e.g. 200g)"
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

// ─── Allergens ───────────────────────────────────────────────
export function AllergensEditor({
  foodId,
  items,
}: {
  foodId: string;
  items: AdminFoodAllergen[];
}) {
  const { mutateAsync: create, isPending: creating } = useCreateAllergen();
  const { mutateAsync: remove, isPending: deleting } = useDeleteAllergen();
  const [allergen, setAllergen] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!allergen.trim()) return;
    try {
      await create({ foodId, body: { allergen: allergen.trim() } });
      toast.success("Allergen added");
      setAllergen("");
    } catch {
      toast.error("Failed to add allergen");
    }
  };

  return (
    <SubModelManager<AdminFoodAllergen>
      title="Allergens"
      description="Allergen warnings for this food."
      items={items}
      renderItem={(a) => <span className="text-sm font-medium text-foreground">{a.allergen}</span>}
      onDelete={(a) => remove(a.id).catch(() => toast.error("Failed to delete allergen"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={allergen}
            onChange={(e) => setAllergen(e.target.value)}
            placeholder="e.g. Nuts, Dairy"
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

// ─── Labels ──────────────────────────────────────────────────
export function LabelsEditor({ foodId, items }: { foodId: string; items: AdminFoodLabel[] }) {
  const { mutateAsync: create, isPending: creating } = useCreateLabel();
  const { mutateAsync: remove, isPending: deleting } = useDeleteLabel();
  const [label, setLabel] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!label.trim()) return;
    try {
      await create({ foodId, body: { label: label.trim() } });
      toast.success("Label added");
      setLabel("");
    } catch {
      toast.error("Failed to add label");
    }
  };

  return (
    <SubModelManager<AdminFoodLabel>
      title="Labels"
      description="Custom badges like 'Chef's Special'."
      items={items}
      renderItem={(l) => (
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-3 rounded-full"
            style={{ backgroundColor: l.color ?? "var(--muted-foreground)" }}
          />
          <span className="text-sm font-medium text-foreground">{l.label}</span>
        </div>
      )}
      onDelete={(l) => remove(l.id).catch(() => toast.error("Failed to delete label"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label text"
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

// ─── Tags ────────────────────────────────────────────────────
export function TagsEditor({ foodId, items }: { foodId: string; items: AdminFoodTag[] }) {
  const { mutateAsync: add, isPending: adding } = useAddFoodTags();
  const { mutateAsync: remove, isPending: deleting } = useRemoveFoodTag();
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (adding || deleting || pending) return;
    if (tagIds.length === 0) return;
    setPending(true);
    try {
      await add({ foodId, tagIds });
      toast.success("Tags added");
      setTagIds([]);
    } catch {
      toast.error("Failed to add tags");
    } finally {
      setPending(false);
    }
  };

  return (
    <SubModelManager<AdminFoodTag>
      title="Tags"
      description="Searchable tags for this food."
      items={items}
      renderItem={(t) => <span className="text-sm font-medium text-foreground">{t.name}</span>}
      onDelete={(t) => remove({ foodId, tagId: t.id }).catch(() => toast.error("Failed to remove tag"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={tagIds.join(",")}
            onChange={(e) =>
              setTagIds(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
            }
            placeholder="Comma-separated tag names"
            className={inputStyles}
          />
          <Button type="button" size="sm" onClick={submit} disabled={adding || pending}>
            {adding || pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </Button>
        </div>
      }
    />
  );
}

// ─── Gallery Images ──────────────────────────────────────────
export function GalleryEditor({ foodId, items }: { foodId: string; items: { id: string; image: string }[] }) {
  const { mutateAsync: create, isPending: creating } = useCreateFoodImage();
  const { mutateAsync: remove, isPending: deleting } = useDeleteFoodImage();
  const [image, setImage] = useState("");

  const submit = async () => {
    if (creating || deleting) return;
    if (!image.trim()) return;
    try {
      await create({ foodId, image: image.trim() });
      toast.success("Image added");
      setImage("");
    } catch {
      toast.error("Failed to add image");
    }
  };

  return (
    <SubModelManager<{ id: string; image: string }>
      title="Gallery Images"
      description="Additional showcase images."
      items={items}
      renderItem={(i) => (
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i.image} alt="" className="size-10 rounded-md object-cover" />
          <span className="max-w-[220px] truncate text-xs text-muted-foreground">{i.image}</span>
        </div>
      )}
      onDelete={(i) => remove(i.id).catch(() => toast.error("Failed to delete image"))}
      deletePending={deleting}
      addForm={
        <div className="flex gap-2">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
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
