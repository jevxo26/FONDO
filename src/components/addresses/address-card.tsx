"use client";

import { Trash2, Star, Loader2, Home, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Address } from "@/types/address";

interface Props {
  address: Address;
  isPending: boolean;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteConfirm: () => void;
  onCancelDelete: () => void;
}

export function AddressCard({
  address,
  isPending,
  onSetDefault,
  onDelete,
  onDeleteConfirm,
  onCancelDelete,
}: Props) {
  const LabelIcon = address.label === "Office" ? Building2 : Home;
  const addressLine = [address.house, address.road, address.area, address.district]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <LabelIcon className="size-3" />
            {address.label || "Address"}
          </span>
          {address.isDefault && (
            <span className="inline-flex items-center gap-1 text-badge font-bold uppercase tracking-wider text-success">
              <Star className="size-3 fill-success" /> Default
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground/80">{addressLine}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {address.receiverName} · {address.receiverPhone}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
          {!address.isDefault ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 rounded-lg text-primary hover:bg-primary/10"
              onClick={() => onSetDefault(address.id)}
            >
              <Star className="size-3" /> Set Default
            </Button>
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3 text-muted-foreground/60" /> Primary address
            </span>
          )}

          <AlertDialog onOpenChange={(open) => !open && onCancelDelete()}>
            <AlertDialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 rounded-lg text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(address.id)}
                >
                  {isPending ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                  Remove
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove this address?</AlertDialogTitle>
                <AlertDialogDescription>
                  {address.label || "This address"} · {addressLine}. This action can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteConfirm} className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
