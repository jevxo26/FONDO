import { SectionHeader } from "@/components/common/section-header";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "@/data/homepage";

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SectionHeader
          title="What Our Customers Say"
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
