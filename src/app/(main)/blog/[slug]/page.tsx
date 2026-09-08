// /app/(public)/blog/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { mockBlogs } from "@/data/mock-blogs";
import { mockBlogCategories } from "@/data/mock-blog-categories";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = mockBlogs.find((b) => b.slug === params.slug && b.status === "PUBLISHED");

  if (!blog) {
    notFound();
  }

  const category = mockBlogCategories.find((c) => c.id === blog.categoryId);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="mt-8 space-y-8">
        {/* Header */}
        <header className="space-y-4">
          {blog.thumbnail && (
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full max-h-[400px] object-cover"
              />
            </div>
          )}
          <h1 className="font-heading text-4xl font-bold tracking-tight">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
            </span>
            {category && (
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {category.name}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <div className="border-t border-border pt-8">
          <h3 className="font-heading text-lg font-semibold">Share this article</h3>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`,
                )
              }
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                )
              }
            >
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // toast success
              }}
            >
              Copy Link
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
