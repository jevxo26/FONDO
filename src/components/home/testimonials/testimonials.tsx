import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "@/data/homepage";

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <h2 className="text-center font-fraunces text-3xl text-foreground sm:text-4xl lg:text-[40px]">
          What Dhaka is saying
        </h2>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
