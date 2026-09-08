// /app/(public)/blog/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockBlogs } from "@/data/mock-blogs";
import { mockBlogCategories } from "@/data/mock-blog-categories";
import { format } from "date-fns";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredBlogs = useMemo(() => {
    const publishedBlogs = mockBlogs.filter((blog) => blog.status === "PUBLISHED");

    return publishedBlogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || blog.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = mockBlogCategories.filter((cat) => cat.status === "ACTIVE");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Stories, tips, and insights from our community
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "ALL" ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5 text-sm"
              onClick={() => setSelectedCategory("ALL")}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-1.5 text-sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-muted-foreground">No articles found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => {
              const category = mockBlogCategories.find((c) => c.id === blog.categoryId);
              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
                >
                  {blog.thumbnail && (
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={400}
                        height={192}
                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="mt-4 space-y-2">
                    {category && (
                      <Badge variant="secondary" className="text-xs">
                        {category.name}
                      </Badge>
                    )}
                    <h2 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      By {blog.author} · {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
