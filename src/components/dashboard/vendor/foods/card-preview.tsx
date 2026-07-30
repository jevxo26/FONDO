"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Clock, Tag, Utensils, Star, Heart, ThumbsUp } from "lucide-react";

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
    <Card className="overflow-hidden border-border shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 bg-muted relative">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-48 md:h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-food.jpg";
              }}
            />
          ) : (
            <div className="w-full h-48 md:h-full bg-muted flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          {featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {popular && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
              <Heart className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {!available && (
            <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">Unavailable</Badge>
          )}
          {!visible && (
            <Badge className="absolute bottom-2 right-2 bg-gray-500 text-white">Hidden</Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">
              by {vendorName} • {categoryName}
            </p>
            <p className="text-xs text-muted-foreground">
              {foodType}
              {nutrition?.servingSize && ` • ${nutrition.servingSize}`}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  ৳{discountPrice!.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{price.toFixed(2)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  -{discountPercent}%
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">৳{price.toFixed(2)}</span>
            )}
          </div>

          {/* Nutrition */}
          {nutrition && (
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {nutrition.calories && (
                <span className="flex items-center gap-1">
                  <Apple className="w-3 h-3" />
                  {nutrition.calories} kcal
                </span>
              )}
              {nutrition.protein && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">P:</span> {nutrition.protein}g
                </span>
              )}
              {nutrition.fat && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">F:</span> {nutrition.fat}g
                </span>
              )}
              {nutrition.carbohydrate && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">C:</span> {nutrition.carbohydrate}g
                </span>
              )}
              {nutrition.fiber && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Fib:</span> {nutrition.fiber}g
                </span>
              )}
            </div>
          )}

          {/* Labels */}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {labels.map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {recommended && (
              <Badge className="bg-green-500 text-white text-xs">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            )}
            {available && <Badge className="bg-green-500 text-white text-xs">Available</Badge>}
            {visible && <Badge className="bg-blue-500 text-white text-xs">Visible</Badge>}
          </div>
        </div>
      </div>
    </Card>
  );
}
