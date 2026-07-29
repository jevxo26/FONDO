"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { toast } from "sonner";
import type { PackageFormData } from "@/lib/schema/package-schema";

// ✅ Import from package-registration folder (newly created)
import { BasicInfoStep } from "./package-registration/basic-info-step";
import { PricingStep } from "./package-registration/pricing-step";
import { ConfigurationStep } from "./package-registration/configuration-step";
import { RulesStep } from "./package-registration/rules-step";
import { NutritionStep } from "./package-registration/nutrition-step";
import { BenefitsStep } from "./package-registration/benefits-step";
import { MediaStep } from "./package-registration/media-step";

// ReviewStep - inline component

const ReviewStep = ({ data }: { data: PackageFormData }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Review Package</h3>
      <p className="text-sm text-muted-foreground">
        Review all the package details before submitting
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Name</p>
          <p className="font-medium">{data.name || "Not set"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Category</p>
          <p className="font-medium">{data.category || "Not set"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Package Type</p>
          <p className="font-medium">{data.packageType || "Not set"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="font-fraunces text-xl font-bold text-primary">৳{data.price || 0}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="font-medium">{data.durationDays || 0} Days</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Meals</p>
          <p className="font-medium">{data.totalMeals || 0}</p>
        </div>
        <div className="col-span-2 space-y-1">
          <p className="text-xs text-muted-foreground">Description</p>
          <p className="text-sm">{data.description || "No description"}</p>
        </div>
        <div className="col-span-2 space-y-1">
          <p className="text-xs text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-1">
            {(data.tags || []).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-muted rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PackageRegistrationFormProps {
  initialData?: Partial<PackageFormData>;
  isEdit?: boolean;
}

const STEPS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Pricing" },
  { id: 3, label: "Configuration" },
  { id: 4, label: "Rules" },
  { id: 5, label: "Nutrition" },
  { id: 6, label: "Benefits" },
  { id: 7, label: "Media" },
  { id: 8, label: "Review" },
];

const INITIAL_FORM_DATA: PackageFormData = {
  name: "",
  slug: "",
  packageCode: "",
  description: "",
  category: "",
  tags: [],
  status: "DRAFT",
  price: 0,
  discountPrice: "",
  currency: "BDT",
  vat: 0,
  deliveryCharge: 0,
  packageType: "",
  durationDays: "",
  totalMeals: "",
  isCustomizable: true,
  thumbnail: "",
  coverImage: "",
  gallery: [],
  benefits: [],
  nutrition: {
    dailyCalories: "",
    dailyProtein: "",
    dailyCarbohydrate: "",
    dailyFat: "",
    dailyFiber: "",
    dailySugar: "",
    dailySodium: "",
  },
  rules: {
    minimumOrderDays: "",
    maximumOrderDays: "",
    minimumMealsPerDay: "",
    maximumMealsPerDay: "",
    advancePaymentRequired: false,
    allowPause: false,
    allowResume: false,
    allowSkipMeal: false,
    allowCancellation: false,
    deliveryDays: [],
    deliveryTimeStart: "",
    deliveryTimeEnd: "",
    mealCutoffTime: "",
  },
};

export function PackageRegistrationForm({
  initialData,
  isEdit = false,
}: PackageRegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<PackageFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  });

  const updateField = (field: string, value: unknown) => {
    setFormData((prev: PackageFormData) => ({ ...prev, [field]: value as never }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.name ||
        !formData.price ||
        !formData.packageType ||
        !formData.durationDays ||
        !formData.totalMeals
      ) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Package data:", formData);
      toast.success(isEdit ? "Package updated successfully!" : "Package created successfully!");
      router.push("/dashboard/admin/packages");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      if (currentStep === 1 && (!formData.name || !formData.category)) {
        toast.error("Please fill in all required fields in Basic Info");
        return;
      }
      if (currentStep === 2 && (!formData.price || !formData.currency)) {
        toast.error("Please fill in all required fields in Pricing");
        return;
      }
      if (
        currentStep === 3 &&
        (!formData.packageType || !formData.durationDays || !formData.totalMeals)
      ) {
        toast.error("Please fill in all required fields in Configuration");
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-6">
            <BasicInfoStep data={formData} onChange={updateField} />
          </Card>
        );
      case 2:
        return (
          <Card className="p-6">
            <PricingStep data={formData} onChange={updateField} />
          </Card>
        );
      case 3:
        return (
          <Card className="p-6">
            <ConfigurationStep data={formData} onChange={updateField} />
          </Card>
        );
      case 4:
        return (
          <Card className="p-6">
            <RulesStep data={formData} onChange={updateField} />
          </Card>
        );
      case 5:
        return (
          <Card className="p-6">
            <NutritionStep data={formData} onChange={updateField} />
          </Card>
        );
      case 6:
        return (
          <Card className="p-6">
            <BenefitsStep data={formData} onChange={updateField} />
          </Card>
        );
      case 7:
        return (
          <Card className="p-6">
            <MediaStep data={formData} onChange={updateField} />
          </Card>
        );
      case 8:
        return (
          <Card className="p-6">
            <ReviewStep data={formData} />
          </Card>
        );
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => goToStep(step.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                currentStep === step.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(206,163,89,0.3)]"
                  : currentStep > step.id
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  currentStep === step.id
                    ? "bg-white/20 text-primary-foreground"
                    : currentStep > step.id
                      ? "bg-success/20 text-success"
                      : "bg-background text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? "✓" : step.id}
              </span>
              {step.label}
            </button>
            {index < STEPS.length - 1 && (
              <div
                className={`w-8 h-px mx-1 ${currentStep > step.id ? "bg-success" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-fraunces text-2xl font-bold">
          {isEdit ? "Edit Package" : "Register New Package"}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/admin/packages")}
            size="sm"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const draftData = { ...formData, status: "DRAFT" };
              console.log("Saved as draft:", draftData);
              toast.success("Package saved as draft");
            }}
            size="sm"
          >
            Save Draft
          </Button>
        </div>
      </div>

      {renderStepIndicator()}
      {renderStep()}

      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {currentStep < STEPS.length ? (
            <Button type="button" onClick={nextStep} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : isEdit ? "Update Package" : "Create Package"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
