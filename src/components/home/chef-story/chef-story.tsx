import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CHEF_STORY } from "@/data/homepage";

export function ChefStory() {
  return (
    <section className="bg-secondary py-16">
      <div className="wrapper">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src={CHEF_STORY.image}
                alt={CHEF_STORY.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 -z-10 size-32 rounded-2xl bg-primary/20 lg:-right-8 lg:-top-8 lg:size-40" />
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <Badge variant="secondary" className="w-fit bg-background text-foreground">
              Meet Our Chef
            </Badge>
            <h2 className="font-fraunces text-3xl text-foreground sm:text-4xl lg:text-[40px]">
              {CHEF_STORY.name}
            </h2>
            <p className="text-sm font-medium text-primary">{CHEF_STORY.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
              {CHEF_STORY.bio}
            </p>

            <Separator />

            <div className="flex gap-6">
              {CHEF_STORY.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="link" className="w-fit gap-1 p-0 text-foreground">
              Read Full Story
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
