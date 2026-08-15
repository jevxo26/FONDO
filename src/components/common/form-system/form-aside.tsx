import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormAsideProps {
  children: ReactNode;
  className?: string;
}

export function FormAside({ children, className }: FormAsideProps) {
  return (
    <div className={cn("space-y-6 self-start lg:sticky lg:top-6", className)}>
      {children}
    </div>
  );
}
