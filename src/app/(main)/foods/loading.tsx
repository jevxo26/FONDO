export default function FoodsLoading() {
  return (
    <div className="min-h-[60vh] bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="font-sans text-sm text-muted-foreground">Loading menu...</p>
      </div>
    </div>
  );
}
