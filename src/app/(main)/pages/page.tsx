// /app/(public)/pages/page.tsx
"use client";

import Link from "next/link";
import { mockPages } from "@/data/mock-pages";
import { FileText } from "lucide-react";
import { format } from "date-fns";

export default function PagesIndexPage() {
  const publishedPages = mockPages.filter((page) => page.isPublished === true);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight">All Pages</h1>
          <p className="mt-2 text-muted-foreground">Browse our collection of informational pages</p>
        </div>

        {publishedPages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg text-muted-foreground">No pages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {publishedPages.map((page) => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-medium group-hover:text-primary transition-colors">
                      {page.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {format(new Date(page.updatedAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
