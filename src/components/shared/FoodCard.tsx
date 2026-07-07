import Image from "next/image";
import { Heart, Star, Clock, ShoppingBag, ArrowUpRight } from "lucide-react";
import AddToCartButton from "./Button/AddToCartButton";
import Link from "next/link";

export default function FoodCard({ food }: { food: any }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-[32px] bg-white p-4 shadow-[var(--shadow-card)] border border-border/40 dark:bg-card">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                    src={food.thumbnail}
                    alt={food.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm transition-colors hover:text-destructive">
                    <Heart className="size-4" />
                </button>


                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-4
                    transition-all duration-30 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-[#16100C]/90 backdrop-blur-md px-4 py-2.5 text-white shadow-lg border border-white/10">
                        <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary">
                            <ShoppingBag className="size-4 text-foreground" />
                        </div>              <span className="font-sans text-xs font-medium">2 items &middot; ৳520</span>
                        <span className="ml-1 flex size-4 rotate-45 items-center justify-center rounded-full bg-white/20 text-[10px]"></span>
                        <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-white/20">
                            <Link href={`/foods/${food.id}`} className="flex items-center justify-center">
                                <ArrowUpRight className="size-5 text-white" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col flex-1 pt-5 pb-1 px-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sans text-lg font-semibold leading-snug text-secondary-foreground line-clamp-1">
                        {food.title}
                    </h3>
                    <span className="font-sans text-lg font-bold text-secondary-foreground whitespace-nowrap">
                        ৳{food.price}
                    </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">4.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        <span>35 min</span>
                    </div>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                    {food.description}
                </p>
                <AddToCartButton />
            </div>
        </div>
    );
}