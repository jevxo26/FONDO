"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { Resolver } from "react-hook-form";
import { initialValues, KitchenFormValues, kitchenSchema } from "@/lib/schema/kitchen-schema";
import { KitchenHeaderBar } from "@/components/dashboard/vendor/kitchens/kitchen-header-bar";
import { KitchenFormSection } from "@/components/dashboard/vendor/kitchens/kitchen-form-section";
import { KitchenSummarySidebar } from "@/components/dashboard/vendor/kitchens/kitchen-summary-sidebar";
import { KitchenCardPreview } from "@/components/dashboard/vendor/kitchens/kitchen-card-preview";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { useGetVendorBranchesQuery } from "@/store/api/slices/vendor-api";
import { useCreateVendorKitchenMutation } from "@/store/api/slices/vendor-api";

export default function AddKitchenPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);

  const { data: vendor } = useMyVendor();
  const vendorCode = vendor?.vendorCode;

  const { data: branches, isLoading: branchesLoading } = useGetVendorBranchesQuery(
    vendorCode || "",
    {
      skip: !vendorCode,
    },
  );

  const [createKitchen, { isLoading: isSubmitting }] = useCreateVendorKitchenMutation();

  const branchOptions = (branches ?? []).map((b) => ({
    value: b.id,
    label: b.branchName,
  }));

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<KitchenFormValues>({
    resolver: yupResolver(kitchenSchema) as Resolver<KitchenFormValues>,
    defaultValues: initialValues,
  });

  const nameWatched = useWatch({ control, name: "name" });
  const branchWatched = useWatch({ control, name: "branch" });
  const statusWatched = useWatch({ control, name: "status" });
  const capacityWatched = useWatch({ control, name: "capacity" });
  const currentLoadWatched = useWatch({ control, name: "currentLoad" });
  const preparationTimeWatched = useWatch({ control, name: "preparationTime" });
  const headChefWatched = useWatch({ control, name: "headChef" });
  const staffCountWatched = useWatch({ control, name: "staffCount" });

  const capacityPercentage =
    capacityWatched && currentLoadWatched
      ? Math.round((currentLoadWatched / capacityWatched) * 100)
      : 0;

  const selectedBranch = branchOptions.find((b) => b.value === branchWatched);

  const onSubmit = async (data: KitchenFormValues) => {
    try {
      const toastId = toast.loading("Creating kitchen...");

      await createKitchen({
        branchId: data.branch,
        data: {
          name: data.name,
          status: data.status,
        },
      }).unwrap();

      toast.success("Kitchen created successfully!", { id: toastId });
      reset(initialValues);
      router.push("/dashboard/vendor/kitchens");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create kitchen.";
      toast.error(message);
      console.error(error);
    }
  };

  if (branchesLoading) {
    return (
      <div className="py-6 lg:py-8 bg-background">
        <div className="wrapper max-w-6xl mx-auto px-4">
          <div className="mt-12 flex justify-center">
            <div className="text-sm text-muted-foreground">Loading branches...</div>
          </div>
        </div>
      </div>
    );
  }

  if (branchOptions.length === 0) {
    return (
      <div className="py-6 lg:py-8 bg-background">
        <div className="wrapper max-w-6xl mx-auto px-4">
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              No branches found. Please create a branch first.
            </p>
            <button
              onClick={() => router.push("/dashboard/vendor/branches")}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Go to Branches
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
        <KitchenHeaderBar
          onReset={() => reset(initialValues)}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isSubmitting={isSubmitting}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form
            id="kitchen-form"
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 space-y-6"
          >
            <KitchenFormSection
              register={register}
              errors={errors}
              setValue={setValue}
              control={control}
              branches={branchOptions}
            />
          </form>

          <div className="space-y-6">
            <KitchenSummarySidebar
              name={nameWatched || "Kitchen Name"}
              branch={selectedBranch?.label || "Not selected"}
              status={statusWatched || "Not set"}
              capacity={capacityWatched || 0}
              currentLoad={currentLoadWatched || 0}
              capacityPercentage={capacityPercentage}
              headChef={headChefWatched || "Not assigned"}
              staffCount={staffCountWatched || 0}
              preparationTime={preparationTimeWatched || 0}
            />
          </div>
        </div>

        {showPreview && (
          <KitchenCardPreview
            name={nameWatched || "Kitchen Name"}
            branch={selectedBranch?.label || "Branch"}
            status={statusWatched || "DRAFT"}
            capacity={capacityWatched || 0}
            currentLoad={currentLoadWatched || 0}
            capacityPercentage={capacityPercentage}
            headChef={headChefWatched || "Not assigned"}
            staffCount={staffCountWatched || 0}
            preparationTime={preparationTimeWatched || 0}
          />
        )}
      </div>
    </section>
  );
}
