import { TRUST_FEATURES } from "@/data/homepage";

export function TrustBar() {
  return (
    <section className="border-y border-border/70 bg-white/40">
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4">
          {TRUST_FEATURES.map((feature, i) => (
            <div key={`${feature.label}-${i}`} className="flex items-center gap-3">
              <feature.icon className="size-4 text-primary" />
              <span className="text-sm text-foreground/80">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
