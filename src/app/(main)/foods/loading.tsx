export default function FoodsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden pt-24 pb-12 border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 size-[400px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-[350px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="mx-auto size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="size-5 rotate-45 bg-primary/40 animate-pulse" />
          </div>
          <div className="mx-auto h-12 w-96 max-w-[80%] rounded-lg bg-muted/50 animate-pulse" />
          <div className="mx-auto h-4 w-64 max-w-[60%] rounded bg-muted/30 animate-pulse" />
          <div className="mx-auto max-w-2xl pt-2">
            <div className="h-12 w-full rounded-2xl bg-muted/30 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-3xl border border-border/40 bg-card overflow-hidden">
              <div className="aspect-4/3 bg-muted/30 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted/30 animate-pulse" />
                <div className="h-3 w-full rounded bg-muted/20 animate-pulse" />
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-10 rounded-xl bg-muted/20 animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="border-t border-border/40 p-4">
                <div className="h-5 w-24 rounded bg-muted/30 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
