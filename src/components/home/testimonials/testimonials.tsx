import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";
import { TESTIMONIALS } from "@/data/homepage";
import { TestimonialCard } from "./testimonial-card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function Testimonials() {
  return (
    <section className="py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal distance={20}>
          <SectionHeader
            title="What Dhaka is saying"
            align="center"
          />

          <InfiniteSlider gap={20} speed={50} className="mt-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </InfiniteSlider>
        </SectionReveal>
      </div>
    </section>
  );
}
