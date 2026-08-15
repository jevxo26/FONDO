"use client";

import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";
import { BlogReviewCard } from "./blog-review-card";
import { BLOG_POSTS } from "@/data/homepage";

const categories = ["Heritage", "Recipes", "Stories", "Culture"];

export function BlogReviews() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <section className="relative py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal distance={20}>
          <SectionHeader title="Our Blog & Reviews" align="center" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <BlogReviewCard
              post={featured}
              category={categories[0]}
              featured
              className="sm:col-span-2 lg:row-span-2"
            />
            {rest.map((post, i) => (
              <BlogReviewCard
                key={post.id}
                post={post}
                category={categories[(i + 1) % categories.length]}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
