"use client";

import { useState } from "react";
import { User, Edit, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { RiderProfileInfo } from "@/components/dashboard/rider/rider-profile-info";
import { EditRiderProfileModal } from "@/components/dashboard/rider/rider-edit-modal";
import { useGetMyRiderProfileQuery } from "@/store/api/slices/rider-api";


export default function RiderProfilePage() {
  const { data: rider, isLoading, isError } = useGetMyRiderProfileQuery();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !rider) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load rider profile. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and update your rider profile."
        icon={User}
        actions={
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            <Edit className="size-4" />
            Edit Profile
          </button>
        }
      />

      <RiderProfileInfo rider={rider} />

      <EditRiderProfileModal
        rider={rider}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}