import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SIGNATURE_DISH } from '@/data/homepage';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function SignatureDish() {
  return (
    <section className="bg-foreground py-16">
      <div className="wrapper">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
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

            <h2 className="font-fraunces text-3xl text-white sm:text-4xl lg:text-[48px]">
              {SIGNATURE_DISH.heading}
            </h2>

            <p className="text-sm leading-relaxed text-white/60 lg:text-base">
              {SIGNATURE_DISH.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {SIGNATURE_DISH.infoCards.map((card) => (
                <Card key={card.title} className="border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                  <p className="text-xs text-white/50">{card.text}</p>
                </Card>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="gap-2 h-auto py-3 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingBag className="size-4" />
                {SIGNATURE_DISH.primaryButton.label}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 h-auto py-3 px-4 rounded-full bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                {SIGNATURE_DISH.secondaryButton.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
