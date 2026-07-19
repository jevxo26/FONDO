import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/common/section-reveal";
import { Badge } from "@/components/ui/badge";
import { CHEF_STORY } from "@/data/homepage";
import { Award, BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";

const iconMap = {
  trophy: Award,
  star: Sparkles,
  book: BookOpen,
};

const variantClasses = {
  dark: "bg-foreground text-background border-foreground",
  orange: "bg-primary/15 text-foreground border-primary/40",
  light: "bg-card text-foreground border-border",
};

export function ChefStory() {
  return (
    <section>
      <div className="wrapper">
        <SectionReveal distance={20}>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16">
            {/* Image */}
            <div className="relative flex-1">
              <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-4xl">
                <Image
                  src={CHEF_STORY.image}
                  alt={CHEF_STORY.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Stats overlay card */}
                <div className="absolute bottom-6 right-6 flex flex-col rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)]">
                  <span className="font-sans text-3xl font-bold leading-none tracking-tight text-foreground">
                    {CHEF_STORY.stats.value}
                  </span>
                  <span className="mt-1 text-xs text-foreground/55">{CHEF_STORY.stats.label}</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-label text-foreground/60">
                  {CHEF_STORY.label}
                </span>
                <h2 className="font-heading text-3xl leading-tight tracking-heading text-foreground sm:text-4xl lg:text-[48px]">
                  {CHEF_STORY.name}
                </h2>
                <p className="text-base leading-relaxed text-foreground/65">{CHEF_STORY.bio}</p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 border-primary pl-5">
                <p className="font-heading text-2xl italic leading-snug tracking-tight text-foreground">
                  &ldquo;{CHEF_STORY.quote}&rdquo;
                </p>
              </blockquote>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-4">
                {CHEF_STORY.badges.map((badge) => {
                  const Icon = iconMap[badge.icon as keyof typeof iconMap];
                  const variantClass = variantClasses[badge.variant];
                  return (
                    <Badge
                      key={badge.text}
                      variant="outline"
                      className={cn(
                        "h-auto gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
                        variantClass,
                      )}
                    >
                      {Icon && <Icon className="size-3" />}
                      {badge.text}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
