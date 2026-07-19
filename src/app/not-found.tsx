import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="font-sans text-lg text-muted-foreground mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
