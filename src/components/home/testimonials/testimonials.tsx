import { TESTIMONIALS } from '@/data/homepage';
import { TestimonialCard } from './testimonial-card';

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <h2 className="text-center font-sans font-semibold text-3xl text-foreground sm:text-4xl lg:text-[40px]">
          What Dhaka is saying
        </h2>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
