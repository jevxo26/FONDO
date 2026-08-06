"use client";

import { useLoginHistory } from "@/store/api/slices/security-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History } from "lucide-react";

export function LoginHistoryTable() {
  const { data: entries, isLoading } = useLoginHistory();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-12 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Empty className="rounded-3xl border-dashed py-12">
        <EmptyMedia variant="icon">
          <History className="size-4" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No login history</EmptyTitle>
          <EmptyDescription>
            Sign-in activity will appear here for security.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/40 bg-card shadow-[var(--shadow-card)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium text-foreground">
                {[entry.browser, entry.platform].filter(Boolean).join(" · ") || "—"}
              </TableCell>
              <TableCell className="font-mono text-xs">{entry.ipAddress || "—"}</TableCell>
              <TableCell className="text-muted-foreground">
                {[entry.city, entry.country].filter(Boolean).join(", ") || "—"}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {entry.loggedInAt
                  ? new Date(entry.loggedInAt).toLocaleString("en-BD", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
