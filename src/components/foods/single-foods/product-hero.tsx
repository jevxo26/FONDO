"use client";

import { useAddToCart } from "@/hooks/use-cart";
import { useFavorites, useRemoveFavorite, useToggleFavorite } from "@/hooks/use-favorites";
import type { Food } from "@/types/food";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductActions } from "./product-actions";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0 } },
};

export function ProductHero({ food }: { food: Food }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const addToCart = useAddToCart();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorited = favorites.some((f) => f.id === food.id);
  const isFavPending = toggleFavorite.isPending || removeFavorite.isPending;
  const currentPrice = Number(food.variants[0]?.discountPrice ?? food.variants[0]?.price ?? 0);

  const handleAddToCart = () => {
    addToCart.mutate({ foodId: food.id, quantity, unitPrice: currentPrice });
  };

  const handleBuyNow = () => {
    addToCart.mutate(
      { foodId: food.id, quantity, unitPrice: currentPrice },
      { onSuccess: () => router.push("/checkout") },
    );
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
          <ProductGallery coverImage={food.coverImage} name={food.name} />
          <ProductInfo
            food={food}
            isFavorited={isFavorited}
            isFavPending={isFavPending}
            onToggleFav={handleToggleFav}
          >
            <ProductActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isAddToCartPending={addToCart.isPending}
            />
          </ProductInfo>
        </motion.div>
      </div>
    </section>
  );
}
