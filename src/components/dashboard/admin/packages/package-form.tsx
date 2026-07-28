/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/dashboard/admin/packages/package-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { BasicInfoSection } from "./package-form-sections/basic-info-section";
import { PricingSection } from "./package-form-sections/pricing-section";
import { ConfigurationSection } from "./package-form-sections/configuration-section";
import { RulesSection } from "./package-form-sections/rules-section";
import { NutritionSection } from "./package-form-sections/nutrition-section";
import { BenefitsSection } from "./package-form-sections/benefits-section";
import { MediaSection } from "./package-form-sections/media-section";
import { toast } from "sonner";

interface PackageFormProps {
  initialData?: any;
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
];

export function PackageForm({ initialData, isEdit = false }: PackageFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<any>({
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
    ...initialData,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
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

      // Simulate API call
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
            <BasicInfoSection data={formData} onChange={updateField} />
          </Card>
        );
      case 2:
        return (
          <Card className="p-6">
            <PricingSection data={formData} onChange={updateField} />
          </Card>
        );
      case 3:
        return (
          <Card className="p-6">
            <ConfigurationSection data={formData} onChange={updateField} />
          </Card>
        );
      case 4:
        return (
          <Card className="p-6">
            <RulesSection data={formData} onChange={updateField} />
          </Card>
        );
      case 5:
        return (
          <Card className="p-6">
            <NutritionSection data={formData} onChange={updateField} />
          </Card>
        );
      case 6:
        return (
          <Card className="p-6">
            <BenefitsSection data={formData} onChange={updateField} />
          </Card>
        );
      case 7:
        return (
          <Card className="p-6">
            <MediaSection data={formData} onChange={updateField} />
          </Card>
        );
      default:
        return null;
    }
  };

  // Step progress indicator
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              type="button"
              onClick={() => goToStep(step.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentStep === step.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(206,163,89,0.3)]"
                  : currentStep > step.id
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
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
                className={`w-12 h-px mx-2 ${currentStep > step.id ? "bg-success" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step Progress Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
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
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/dashboard/admin/packages")}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>

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
