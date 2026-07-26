import React from 'react';
import { usePackages } from "./packages-context";
import type { MealPackage } from "./packages-context";
import { Check, Clock, Flame, Star, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PackageCardProps {
    pkg: MealPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
    const { toggleComparison, comparedIds } = usePackages()
    const hasDiscount = pkg.discountPrice !== null;
    const isCompared = comparedIds.includes(pkg.id);
    return (
    <article key={pkg.id} className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="relative">
            <Image width={500} height={500} src={pkg.thumbnail} alt={pkg.name} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute top-3 left-3 px-2 py-1 bg-card/90 text-[9px] font-bold uppercase rounded-lg shadow-sm">{pkg.category}</span>
        </div>

        <div className="p-4 flex flex-col grow gap-3">
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading text-base font-medium text-foreground line-clamp-1">{pkg.name}</h3>
                <div className="flex items-center gap-0.5 text-[10px] bg-secondary px-1.5 py-0.5 rounded border border-border font-bold">
                    <Star className="size-3 text-warning fill-warning" /> {pkg.rating}
                </div>
            </div>

            <p className="text-[11px] text-muted-foreground line-clamp-2 h-8 leading-relaxed">{pkg.description}</p>

            <div className="grid grid-cols-3 gap-1 bg-secondary p-2 border border-border/40 rounded-xl text-center text-[10px] font-bold">
                <div><Clock className="size-3 mx-auto text-primary mb-0.5" />{pkg.duration} Days</div>
                <div><Utensils className="size-3 mx-auto text-primary mb-0.5" />{pkg.mealsPerDay}/Day</div>
                <div><Flame className="size-3 mx-auto text-primary mb-0.5" />{pkg.calories} kcal</div>
            </div>

            <div className="flex items-end justify-between pt-2 mt-auto">
                <div className="flex flex-col">
                    {hasDiscount && <span className="text-[9px] line-through opacity-50">৳{pkg.price}</span>}
                    <span className="text-xs font-black text-foreground">৳{pkg.discountPrice ?? pkg.price}</span>
                </div>
                <div className="flex gap-1.5">
                    <button onClick={() => toggleComparison(pkg.id)} className={`p-1.5 border rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${isCompared ? "bg-primary/10 border-primary text-primary" : "border-border hover:bg-muted"}`}>
                        <Check className={`size-3 ${isCompared ? "block" : "hidden"}`} /> Compare
                    </button>
                    {/* <button className="h-7 px-3 bg-primary text-primary-foreground font-bold text-[10px] rounded-lg shadow-sm hover:opacity-90">Details</button> */}
                                        <Link href={`/packages/${pkg.id}`} className="p-1.5 border  bg-primary text-primary-foreground font-bold text-[10px] rounded-lg shadow-sm hover:opacity-90">Details</Link>

                </div>
            </div>
        </div>
    </article>
    )
};

export default PackageCard;