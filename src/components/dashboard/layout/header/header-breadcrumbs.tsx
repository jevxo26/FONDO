"use client";

import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeaderBreadcrumbsProps {
  pathname: string;
}

function humanize(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}

export function HeaderBreadcrumbs({ pathname }: HeaderBreadcrumbsProps) {
  const segments = pathname
    .replace("/dashboard", "")
    .split("/")
    .filter(Boolean);

  const currentPage = segments.length > 0 ? humanize(segments[segments.length - 1]) : "Overview";

  return (
    <>
      <span className="text-sm font-semibold text-foreground md:hidden">{currentPage}</span>
      <nav className="hidden items-center gap-1.5 text-sm md:flex">
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
        >
          Dashboard
        </Link>
        {segments.map((seg, i) => {
          const href = "/dashboard/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <Fragment key={seg}>
              <ChevronRight className="size-3.5 text-muted-foreground/40" />
              {isLast ? (
                <span className="font-medium capitalize text-foreground">{humanize(seg)}</span>
              ) : (
                <Link
                  href={href}
                  className="capitalize text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
                >
                  {humanize(seg)}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>
    </>
  );
}
