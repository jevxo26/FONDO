import { VEHICLE_OPTIONS } from "./riderdata";

export function VehicleTypesSection() {
  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Flexible Transport</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">Choose Your Delivery Mode</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLE_OPTIONS.map((v, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="font-heading text-xl font-bold text-foreground">{v.type}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{v.desc}</p>
              </div>
              <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-[10px] font-bold uppercase tracking-wider border border-border w-max">
                {v.req}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}