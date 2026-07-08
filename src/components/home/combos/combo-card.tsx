import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PriceTag } from "@/components/common/price-tag";

interface ComboCardProps {
  combo: {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: string;
    images: string[];
  };
  className?: string;
}

export function ComboCard({ combo, className }: ComboCardProps) {
  return (
    <Card className={cn("overflow-visible", className)}>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="relative flex h-40 items-end justify-center">
          {combo.images.map((image, i) => (
            <div
              key={image}
              className={cn(
                "relative overflow-hidden rounded-2xl",
                i === 0 ? "size-32 z-10" : "absolute left-1/2 top-4 size-28 -translate-x-1/2 opacity-80"
              )}
            >
              <Image
                src={image}
                alt={`${combo.title} item ${i + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-fraunces text-lg text-foreground">
            {combo.title}
          </h3>
          <p className="text-sm text-muted-foreground">{combo.description}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <PriceTag
          price={combo.price}
          originalPrice={combo.originalPrice}
          size="md"
        />
        <Badge
          variant="destructive"
          className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
        >
          {combo.discount}
        </Badge>
      </CardFooter>
    </Card>
  );
}
