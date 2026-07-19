import { SectionReveal } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SIGNATURE_DISH } from "@/data/homepage";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SignatureDish() {
  return (
    <section className="bg-foreground py-12 lg:py-20">
      <div className="wrapper">
        <SectionReveal variant="blurReveal" distance={20}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="flex-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
                <Image
                  src={SIGNATURE_DISH.image}
                  alt={SIGNATURE_DISH.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {SIGNATURE_DISH.label}
              </span>

              <h2 className="font-heading text-3xl text-background sm:text-4xl lg:text-[48px]">
                {SIGNATURE_DISH.heading}
              </h2>

              <p className="text-sm leading-relaxed text-background/60 lg:text-base">
                {SIGNATURE_DISH.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SIGNATURE_DISH.infoCards.map((card) => (
                  <Card key={card.title} className="border-background/10 bg-background/5 p-4">
                    <h4 className="text-sm font-semibold text-background">{card.title}</h4>
                    <p className="text-xs text-background/50">{card.text}</p>
                  </Card>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  className="h-auto gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-3 text-primary-foreground hover:bg-primary/90"
                  nativeButton={false}
                  render={<Link href="/foods" />}
                >
                  <ShoppingBag className="size-4 shrink-0" />
                  {SIGNATURE_DISH.primaryButton.label}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-auto gap-2 whitespace-nowrap rounded-full bg-transparent px-4 py-3 text-background hover:bg-background/10 hover:text-background"
                  nativeButton={false}
                  render={<Link href="/foods" />}
                >
                  {SIGNATURE_DISH.secondaryButton.label}
                  <ArrowRight className="size-4 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
