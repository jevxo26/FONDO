interface StatusMetricsProps {
  activeCount: number;
  suspendedCount: number;
  totalCustomers: number;
}

export function StatusMetrics({
  activeCount,
  suspendedCount,
  totalCustomers,
}: StatusMetricsProps) {
  const activePercent = Math.round((activeCount / totalCustomers) * 100);

  return (
    <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
      <h4 className="mb-6 font-semibold text-foreground">Customer Status</h4>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Active</span>
            <span className="font-bold text-foreground">
              {activeCount} Users
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${activePercent}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Suspended</span>
            <span className="font-bold text-foreground">
              {suspendedCount} Users
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-muted-foreground"
              style={{ width: `${100 - activePercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
