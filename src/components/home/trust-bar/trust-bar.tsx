import { Separator } from '@/components/ui/separator';
import { TRUST_STATS } from '@/data/homepage';

export function TrustBar() {
  return (
    <section className="border-y border-border bg-background">
      <div className="wrapper">
        <div className="flex items-center justify-center gap-6 py-4 lg:gap-0 lg:justify-between">
          {TRUST_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
                  <stat.icon className={`size-5 ${stat.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <Separator orientation="vertical" className="hidden h-8 lg:block " />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
