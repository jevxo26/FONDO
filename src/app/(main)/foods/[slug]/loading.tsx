export default function FoodDetailsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section skeleton */}
      <section className="py-8 lg:py-12 bg-background">
        <div className="wrapper">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Gallery skeleton */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[32px] bg-muted/40 animate-pulse" />
              <div className="mt-4 flex gap-3 overflow-hidden">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="aspect-4/3 w-24 shrink-0 rounded-2xl bg-muted/30 animate-pulse" />
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded-full bg-muted/40 animate-pulse" />
                <div className="size-9 rounded-full bg-muted/30 animate-pulse" />
              </div>
              <div className="mt-3 h-9 w-3/4 rounded-lg bg-muted/40 animate-pulse" />
              <div className="mt-3 flex items-center gap-3">
                <div className="h-4 w-40 rounded bg-muted/30 animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted/30 animate-pulse" />
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <div className="h-8 w-28 rounded bg-muted/40 animate-pulse" />
                <div className="h-5 w-16 rounded bg-muted/30 animate-pulse" />
              </div>
              <div className="mt-4 flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-7 w-24 rounded-full bg-muted/30 animate-pulse" />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-muted/30 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-muted/30 animate-pulse" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 w-20 rounded bg-muted/30 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-muted/40 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-10 w-40 rounded-xl bg-muted/30 animate-pulse" />
                <div className="h-10 flex-1 rounded-xl bg-muted/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs skeleton */}
      <section className="py-4 sm:py-6 bg-background">
        <div className="wrapper px-3 sm:px-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-11 rounded-xl bg-muted/30 animate-pulse" />
            ))}
          </div>
          <div className="mt-4 sm:mt-6 space-y-3 rounded-2xl sm:rounded-3xl border border-border/40 bg-card p-4 sm:p-6">
            <div className="h-5 w-40 rounded bg-muted/30 animate-pulse" />
            <div className="h-4 w-full rounded bg-muted/30 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted/30 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-muted/30 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Related foods skeleton */}
      <section className="py-12 bg-background">
        <div className="wrapper">
          <div className="mb-8 flex items-center justify-between">
            <div className="h-8 w-52 rounded-lg bg-muted/40 animate-pulse" />
            <div className="h-9 w-32 rounded-xl bg-muted/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-4xl border border-border/40 bg-card">
                <div className="aspect-4/3 w-full bg-muted/30 animate-pulse" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-muted/30 animate-pulse" />
                  <div className="h-3 w-full rounded bg-muted/20 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted/20 animate-pulse" />
                </div>
                <div className="border-t border-border/40 p-4">
                  <div className="h-10 w-full rounded-full bg-muted/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
