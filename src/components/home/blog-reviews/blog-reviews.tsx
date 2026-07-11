import { SectionReveal } from '@/components/common/section-reveal';
import { BlogReviewCard } from "./blog-review-card";
import { BLOG_POSTS } from "@/data/homepage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function BlogReviews() {
  return (
    <section>
      <div className="wrapper">
        <SectionReveal distance={20}>
          <h2 className="text-center font-sans text-2xl font-bold leading-[130%] text-foreground sm:text-3xl lg:text-[32px]">
            Our BlogsReview
          </h2>

          <InfiniteSlider gap={24} speed={50} className="mt-6">
            {BLOG_POSTS.map((post) => (
              <BlogReviewCard key={post.id} post={post} />
            ))}
          </InfiniteSlider>
        </SectionReveal>
      </div>
    </section>
  );
}
