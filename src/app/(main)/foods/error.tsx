"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/api-error";

export default function FoodsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Something went wrong
        </h2>
        <p className="font-sans text-sm text-muted-foreground mb-6">
          {handleApiError(error)}
        </p>
        <Button onClick={reset} variant="default" className="rounded-xl">
          Try again
        </Button>
      </div>
    </div>
  );
}
