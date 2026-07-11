import { TESTIMONIALS } from "@/data/homepage";
import { TestimonialCard } from "./testimonial-card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <h2 className="text-center font-sans font-semibold text-3xl text-foreground sm:text-4xl lg:text-[40px]">
          What Dhaka is saying
        </h2>

        <InfiniteSlider gap={20} speed={50} className="mt-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
