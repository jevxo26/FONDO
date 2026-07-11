import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    avatar: string;
    location: string;
    rating: number;
    text: string;
  };
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex w-[80vw] shrink-0 flex-col gap-5 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] sm:w-[380px] snap-start",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < testimonial.rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm leading-relaxed text-foreground">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {testimonial.location}
          </span>
        </div>
      </div>
    </div>
  );
}
