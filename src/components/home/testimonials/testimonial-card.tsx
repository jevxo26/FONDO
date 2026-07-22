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
        "flex w-[80vw] shrink-0 flex-col gap-5 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] hover:scale-[1.02] active:scale-[0.98] sm:w-[380px] snap-start relative",
        className,
      )}
    >
      {/* Decorative quote mark */}
      <svg
        className="pointer-events-none absolute -top-3 left-4 size-16 text-primary/10"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M30 50C20 50 10 40 10 30C10 20 20 10 30 10C40 10 50 20 50 30V50C50 70 30 90 10 90L5 80C20 80 30 70 30 50Z" />
        <path d="M80 50C70 50 60 40 60 30C60 20 70 10 80 10C90 10 100 20 100 30V50C100 70 80 90 60 90L55 80C70 80 80 70 80 50Z" />
      </svg>

      {/* Stars */}
      <div className="relative z-10 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted",
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="relative z-10 flex-1 text-sm leading-relaxed text-foreground">
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
          <span className="text-sm font-medium text-foreground">{testimonial.name}</span>
          <span className="text-xs text-muted-foreground">{testimonial.location}</span>
        </div>
      </div>
    </div>
  );
}
