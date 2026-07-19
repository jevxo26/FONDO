"use client";

export default function ContactHero() {
  return (
    <section className="bg-background pt-12 pb-10">
      <div className="wrapper">
        {/* HERO HEADER TYPOGRAPHY CONTAINER */}
        <div className="flex flex-col gap-2 max-w-2xl">
          {/* Eyebrow Label */}
          <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Get In Touch
          </span>

          {/* Main Serif Headline Statement */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-foreground tracking-tight leading-[1.08]">
            We&apos;d love to hear from you.
          </h1>

          {/* Detailed Paragraph Expectations */}
          <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed mt-2">
            Place an order by phone, book a private dining room, or send us your feedback. The
            Kitchen answers within an hour.
          </p>
        </div>
      </div>
    </section>
  );
}
