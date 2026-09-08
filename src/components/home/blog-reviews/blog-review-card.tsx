import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock } from "lucide-react";

interface BlogReviewCardProps {
  post: { id: number; title: string; image: string };
  category?: string;
  featured?: boolean;
  className?: string;
}

export function BlogReviewCard({
  post,
  category = "Article",
  featured = false,
  className,
}: BlogReviewCardProps) {
  return (
    <Link
      href="/blog"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] flex-1 sm:aspect-auto sm:min-h-[320px]" : "aspect-[16/9]",
        )}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay/70 via-overlay/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-block rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
            {category}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/90 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 backdrop-blur-sm">
          <ArrowUpRight className="size-4 text-foreground" />
        </div>
      </div>

      <div className={cn("flex flex-col gap-2", featured ? "p-6" : "p-4")}>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Clock className="size-3" />
          <span>5 min read</span>
        </div>
        <h3
          className={cn(
            "font-heading font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary-foreground transition-colors duration-300",
            featured ? "text-2xl" : "text-base",
          )}
        >
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
