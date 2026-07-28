import { WHY_RIDE_ITEMS } from "./riderdata";

export function WhyRideSection() {
  return (
    <section
      id="why-ride"
      className="py-[var(--space-section)] bg-background border-b border-border"
    >
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Rider Perks
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
            Why Ride with Fondo?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_RIDE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all group"
            >
              <div className="size-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <item.icon className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
