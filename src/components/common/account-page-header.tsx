import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AccountPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AccountPageHeader({ title, description, action }: AccountPageHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="size-3.5" /> Back to Profile
      </Link>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-normal text-secondary-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="font-sans text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
