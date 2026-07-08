import { BlogReviewCard } from "./blog-review-card";
import { BLOG_POSTS } from "@/data/homepage";

export function BlogReviews() {
  return (
    <section className="py-12">
      <div className="wrapper">
        <h2 className="text-center font-sans text-[32px] font-bold leading-[130%] text-foreground">
          Our BlogsReview
        </h2>
        <div className="mt-6 flex gap-6 overflow-x-auto pb-4">
          {BLOG_POSTS.map((post) => (
            <BlogReviewCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
