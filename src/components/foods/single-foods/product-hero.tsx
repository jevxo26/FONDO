"use client";

import { useAddAddon, useAddToCart } from "@/store/api/slices/cart-api";
import { useFavorites, useRemoveFavorite, useToggleFavorite } from "@/hooks/use-favorites";
import type { AddonItem, Food, Variant } from "@/types/food";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductActions } from "./product-actions";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductAddons } from "./product-addons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0 } },
};

export function ProductHero({ food }: { food: Food }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    () => food.variants?.[0] ?? ({} as Variant),
  );
  const [addonSelection, setAddonSelection] = useState<Record<string, AddonItem[]>>(() => {
    const init: Record<string, AddonItem[]> = {};
    food.addons?.forEach((addon) => {
      if (addon.isRequired && addon.items[0]) init[addon.id] = [addon.items[0]];
    });
    return init;
  });
  const router = useRouter();
  const addToCart = useAddToCart();
  const addAddon = useAddAddon();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorited = favorites.some((f) => f.id === food.id);
  const isFavPending = toggleFavorite.isPending || removeFavorite.isPending;

  const unitPrice = Number(
    selectedVariant.discountPrice ?? selectedVariant.price ?? food.variants[0]?.price ?? 0,
  );
  const addonsTotal = Object.values(addonSelection)
    .flat()
    .reduce((sum, item) => sum + Number(item.price), 0);
  const subtotal = unitPrice * quantity + addonsTotal;

  const images = Array.from(
    new Set([food.coverImage, ...(food.images?.map((g) => g.image) ?? [])].filter(Boolean)),
  ) as string[];

  const whatsappMessage = encodeURIComponent(
    `Hi FONDO! I'd like to order ${quantity} x ${food.name} (${
      selectedVariant.name ?? ""
    }) for ৳${subtotal}.`,
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  const handleAddToCart = async (): Promise<boolean> => {
    if (addToCart.isPending) return false;
    try {
      const cart = await addToCart.mutateAsync({
        foodId: food.id,
        quantity,
        unitPrice,
      });
      const item = cart.items.find((i) => i.foodId === food.id);
      const selectedAddons = Object.values(addonSelection).flat();
      if (item && selectedAddons.length > 0) {
        for (const ai of selectedAddons) {
          await addAddon.mutateAsync({
            itemId: item.id,
            addonItemId: ai.id,
            quantity: 1,
            price: Number(ai.price),
          });
        }
      }
      return true;
    } catch {
      // toast handled inside addToCart
      return false;
    }
  };

  const handleBuyNow = async () => {
    const ok = await handleAddToCart();
    if (ok) router.push("/checkout");
  };

  const handleToggleFav = () => {
    (isFavorited ? removeFavorite : toggleFavorite).mutate(food);
  };

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="wrapper">
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ProductGallery images={images} name={food.name} />
          <ProductInfo
            food={food}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            isFavorited={isFavorited}
            isFavPending={isFavPending}
            onToggleFav={handleToggleFav}
          >
            <ProductAddons
              addons={food.addons ?? []}
              selected={addonSelection}
              onChange={(addonId, items) =>
                setAddonSelection((prev) => ({ ...prev, [addonId]: items }))
              }
            />
            <ProductActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isAddToCartPending={addToCart.isPending || addAddon.isPending}
              subtotal={subtotal}
              whatsappUrl={whatsappUrl}
            />
          </ProductInfo>
        </motion.div>
      </div>
    </section>
  );
}
