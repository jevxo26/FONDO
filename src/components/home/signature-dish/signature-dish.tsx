import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/common/price-tag";
import { SIGNATURE_DISH } from "@/data/homepage";

export function SignatureDish() {
  return (
    <section className="bg-secondary py-16">
      <div className="wrapper">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <Badge variant="secondary" className="w-fit bg-background text-foreground">
              Signature Dish
            </Badge>
            <h2 className="font-fraunces text-3xl text-foreground sm:text-4xl lg:text-[40px]">
              {SIGNATURE_DISH.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
              {SIGNATURE_DISH.description}
            </p>

            <Separator />

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">
                Ingredients
              </span>
              <div className="flex flex-wrap gap-2">
                {SIGNATURE_DISH.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="border-border bg-background text-foreground"
                  >
                    <Check className="mr-1 size-3 text-primary" />
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PriceTag price={SIGNATURE_DISH.price} size="lg" />
              <Button size="lg" className="gap-2">
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl lg:aspect-[4/3]">
              <Image
                src={SIGNATURE_DISH.image}
                alt={SIGNATURE_DISH.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 -z-10 size-32 rounded-2xl bg-primary/20 lg:-left-8 lg:-bottom-8 lg:size-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
