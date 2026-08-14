"use client";

import { Badge } from "@/components/ui/badge";
import { Apple, Flame, Heart, Star, ThumbsUp, Utensils } from "lucide-react";

interface CardPreviewProps {
  thumbnail?: string;
  name: string;
  vendorName: string;
  categoryName: string;
  foodType: string;
  price: number;
  discountPrice?: number;
  nutrition?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbohydrate?: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    servingSize?: string;
  };
  labels?: string[];
  tags?: string[];
  available?: boolean;
  visible?: boolean;
  featured?: boolean;
  popular?: boolean;
  recommended?: boolean;
}

export function CardPreview({
  thumbnail,
  name,
  vendorName,
  categoryName,
  foodType,
  price,
  discountPrice,
  nutrition,
  labels = [],
  tags = [],
  available = true,
  visible = true,
  featured = false,
  popular = false,
  recommended = false,
}: CardPreviewProps) {
  const hasDiscount = discountPrice && discountPrice > 0 && discountPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice!) / price) * 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-4 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -bottom-6 -right-6 size-36 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-3 size-[7px] rotate-45 border border-primary/30" />

      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={name}
              className="aspect-[4/3] w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted">
              <Utensils className="size-8 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
            {featured && (
              <Badge className="gap-1 bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(168,90,56,0.35)]">
                <Star className="size-3" />
                Featured
              </Badge>
            )}
            {popular && (
              <Badge className="gap-1 bg-warning/90 text-white shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
                <Heart className="size-3" />
                Popular
              </Badge>
            )}
          </div>
          <div className="absolute bottom-2.5 right-2.5 flex flex-wrap justify-end gap-1.5">
            {!available && <Badge variant="destructive">Unavailable</Badge>}
            {!visible && <Badge className="bg-muted-foreground text-background">Hidden</Badge>}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-bold leading-tight text-foreground">
              {name || "Food Name"}
            </h3>
            {hasDiscount && (
              <Badge variant="destructive" className="shrink-0">
                -{discountPercent}%
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            by {vendorName} · {categoryName}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {foodType}
            {nutrition?.servingSize ? ` · ${nutrition.servingSize}` : ""}
          </p>
        </div>

        <div className="mt-3 h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />

        <div className="mt-3 flex items-center gap-2">
          <span className="font-heading text-[24px] font-bold tracking-tight text-foreground">
            ৳{(hasDiscount ? discountPrice! : price).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">৳{price.toFixed(2)}</span>
          )}
        </div>

        {nutrition && (nutrition.calories || nutrition.protein) && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {nutrition.calories ? (
              <span className="flex items-center gap-1">
                <Flame className="size-3.5 text-primary" />
                {nutrition.calories} kcal
              </span>
            ) : null}
            {nutrition.protein ? (
              <span className="flex items-center gap-1">
                <Apple className="size-3.5" />
                {nutrition.protein}g protein
              </span>
            ) : null}
            {nutrition.carbohydrate ? (
              <span className="flex items-center gap-1">
                <span className="font-medium">Carbs</span> {nutrition.carbohydrate}g
              </span>
            ) : null}
          </div>
        )}

        {labels.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {labels.map((label) => (
              <Badge key={label} variant="secondary">
                {label}
              </Badge>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {recommended && (
          <div className="mt-3">
            <Badge className="gap-1 bg-success/10 text-success ring-1 ring-success/20">
              <ThumbsUp className="size-3" />
              Recommended
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
