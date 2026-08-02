// /app/(public)/privacy/page.tsx
import { notFound } from "next/navigation";
import { mockPages } from "@/data/mock-pages";

export default function PrivacyPage() {
  const page = mockPages.find((p) => p.slug === "privacy" && p.isPublished === true);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="space-y-8">
        <header>
          <h1 className="font-fraunces text-4xl font-bold tracking-tight">{page.title}</h1>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </div>
  );
}
