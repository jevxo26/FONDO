"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { useAddressesPage } from "@/hooks/use-addresses-page";
import { AccountPageHeader } from "@/components/common/account-page-header";
import { Loader2, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { SectionReveal } from "@/components/common/section-reveal";
import { AddressCard } from "@/components/addresses/address-card";
import { AddressFormDialog } from "@/components/addresses/address-form-dialog";

export default function AddressesPage() {
  const { loading } = useRequireAuth();
  const {
    addresses,
    isLoading,
    handleDelete,
    handleSetDefault,
    isDeleting,
    pendingDelete,
    setPendingDelete,
  } = useAddressesPage();

  if (loading) {
    return (
      <main className="flex-1 py-8 lg:py-12">
        <div className="wrapper flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-8 lg:py-12">
      <div className="wrapper max-w-5xl">
        <AccountPageHeader
          title="My Addresses"
          description={`${addresses.length} saved ${addresses.length === 1 ? "address" : "addresses"}`}
          action={
            <AddressFormDialog
              trigger={
                <Button className="gap-2 rounded-xl">
                  <Plus className="size-4" /> Add Address
                </Button>
              }
            />
          }
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-44 rounded-3xl" />
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <Empty className="rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] shadow-[var(--shadow-card)] py-16">
            <EmptyMedia variant="icon">
              <MapPin className="size-4" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No saved addresses</EmptyTitle>
              <EmptyDescription>
                Add a delivery address so checkout is faster next time.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <AddressFormDialog
                trigger={
                  <Button className="gap-2 rounded-xl">
                    <Plus className="size-4" /> Add Your First Address
                  </Button>
                }
              />
            </EmptyContent>
          </Empty>
        ) : (
          <SectionReveal className="grid grid-cols-1 gap-4 md:grid-cols-2" stagger>
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isPending={isDeleting && pendingDelete === address.id}
                onSetDefault={handleSetDefault}
                onDelete={() => setPendingDelete(address.id)}
                onDeleteConfirm={() => handleDelete(address.id)}
                onCancelDelete={() => setPendingDelete(null)}
              />
            ))}
          </SectionReveal>
        )}
      </div>
    </main>
  );
}
