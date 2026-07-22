import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";
import { BlogReviewCard } from "./blog-review-card";
import { BLOG_POSTS } from "@/data/homepage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function BlogReviews() {
  return (
    <section className="py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal distance={20}>
          <SectionHeader
            title="Our Blog & Reviews"
            align="center"
          />

          <InfiniteSlider gap={24} speed={50} className="mt-8">
            {BLOG_POSTS.map((post) => (
              <BlogReviewCard key={post.id} post={post} />
            ))}
          </InfiniteSlider>
        </SectionReveal>
      </div>
    </section>
  );
}
