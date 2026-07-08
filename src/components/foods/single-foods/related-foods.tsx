import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, Clock, Plus, Heart } from "lucide-react";

const RELATED_ITEMS = [
  { id: 1, title: "Royal Mutton Kacchi", price: 520, image: "/images/menu/kacchi.jpg" },
  { id: 2, title: "Heritage Beef Kacchi", price: 520, image: "/images/menu/beef.jpg" },
  { id: 3, title: "Chef's Chicken Tehari", price: 520, image: "/images/menu/tehari.jpg" },
  { id: 4, title: "Old Dhaka Mutton Tehari", price: 520, image: "/images/menu/old-mutton.jpg" },
];

export function RelatedFoods() {
  return (
    <section className="py-12 bg-background">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-fraunces text-2xl font-normal tracking-tight text-secondary-foreground sm:text-3xl">
            Related Foods
          </h2>
          <Link 
            href="/menu" 
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 font-sans text-xs font-medium text-foreground transition-all hover:bg-muted dark:bg-card"
          >
            View full menu <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_ITEMS.map((item) => (
            <div key={item.id} className="group flex flex-col overflow-hidden rounded-[28px] bg-white p-3 shadow-[var(--shadow-card)] dark:bg-card border border-border/40">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-0.5 font-sans text-[10px] font-medium text-foreground shadow-sm">
                  Best Seller
                </span>
                <button className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm transition-colors hover:text-destructive">
                  <Heart className="size-3.5" />
                </button>
              </div>

              <div className="flex flex-col flex-1 pt-3 pb-1 px-1">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-sans text-sm font-semibold text-secondary-foreground line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="font-sans text-sm font-bold text-secondary-foreground">৳{item.price}</span>
                </div>

                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-0.5">
                    <Star className="size-3 fill-primary text-primary" />
                    <span className="font-semibold text-foreground">4.9</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Clock className="size-3" />
                    <span>35 min</span>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-between rounded-full bg-[#16100C] py-2 pl-4 pr-2 text-white transition-colors hover:bg-[#2C241E] dark:bg-foreground dark:text-background">
                  <span className="font-sans text-xs font-semibold">Add to cart</span>
                  <div className="flex size-5 items-center justify-center rounded-full bg-primary text-[#1B0E08]">
                    <Plus className="size-3 stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}