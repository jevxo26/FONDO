import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA } from "@/data/homepage";

export function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="wrapper flex flex-col items-center gap-6 text-center">
        <h2 className="font-fraunces text-3xl text-primary-foreground sm:text-4xl lg:text-[40px]">
          {CTA.heading}
        </h2>
        <p className="max-w-md text-sm text-primary-foreground/80 lg:text-base">
          {CTA.subheading}
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
            render={<Link href={CTA.primaryButton.href} />}
          >
            {CTA.primaryButton.label}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-background/40 bg-transparent text-background hover:bg-background/10"
            render={<Link href={CTA.secondaryButton.href} />}
          >
            {CTA.secondaryButton.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
