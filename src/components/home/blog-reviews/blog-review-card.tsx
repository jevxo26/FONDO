import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogReviewCardProps {
  post: {
    id: number;
    title: string;
    image: string;
  };
  className?: string;
}

export function BlogReviewCard({ post, className }: BlogReviewCardProps) {
  return (
    <Link href="/blog">
      <div
        className={cn(
          "group relative aspect-[312/228] w-[80vw] shrink-0 overflow-hidden rounded-4xl border-[3px] border-primary bg-card shadow-[var(--shadow-card)] sm:aspect-auto sm:h-[228px] sm:w-[312px] snap-start",
          className,
        )}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 80vw, 312px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
