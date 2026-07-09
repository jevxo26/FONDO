import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORY_CARDS } from "@/data/homepage";

interface CategoryCardProps {
  category: (typeof CATEGORY_CARDS)[number];
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/foods?category=${category.id}`}
      className={cn(
        "group relative flex h-28 flex-col items-start justify-end overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:scale-[1.02] sm:h-32 lg:h-36",
        className
      )}
    >
      <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="(max-width: 768px) 50vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <span className="relative z-10 p-3 text-sm font-medium text-white">
        {category.label}
      </span>
    </Link>
  );
}
