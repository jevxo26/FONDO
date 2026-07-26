'use client'
import { useState } from "react";
import { FormAvailabilityAndShift, WeeklyAvailability } from "./rider-availity-form";
import { FormUploadDocuments, UploadedDoc } from "./rider-upload-form";
import { FormPersonalInfo } from "./rider-personal-form";
import { FormAddress } from "./rider-form-address";
import { FormEmergencyAndDriving } from "./rider-immergency-form";
import { FormVehicleDetails } from "./rider-vehicle-form";
import { FormPaymentAndTerms } from "./payment-tems";

const INITIAL_AVAILABILITY: WeeklyAvailability[] = [
  { day: "Monday", enabled: true, startTime: "08:00", endTime: "17:00" },
  { day: "Tuesday", enabled: true, startTime: "08:00", endTime: "17:00" },
  { day: "Wednesday", enabled: true, startTime: "08:00", endTime: "17:00" },
  { day: "Thursday", enabled: true, startTime: "08:00", endTime: "17:00" },
  { day: "Friday", enabled: true, startTime: "08:00", endTime: "17:00" },
  { day: "Saturday", enabled: false, startTime: "09:00", endTime: "18:00" },
  { day: "Sunday", enabled: false, startTime: "09:00", endTime: "18:00" },
];

const INITIAL_DOCS: UploadedDoc[] = [
  { id: "nidFront", label: "National ID (Front Side)", completed: false },
  { id: "nidBack", label: "National ID (Back Side)", completed: false },
  { id: "license", label: "Driving License", completed: false },
  { id: "vehicleReg", label: "Vehicle Registration", completed: false },
  { id: "insurance", label: "Insurance Paper", completed: false },
  { id: "profilePic", label: "Profile Picture", completed: false },
];

export function ApplicationFormContainer({ onStepChange }: { onStepChange: (s: number) => void }) {
  const [selectedShift, setSelectedShift] = useState<string[]>(["Morning", "Evening"]);
  const [availability, setAvailability] = useState<WeeklyAvailability[]>(INITIAL_AVAILABILITY);
  const [docs, setDocs] = useState<UploadedDoc[]>(INITIAL_DOCS);
  const [paymentMethod, setPaymentMethod] = useState<string>("Bkash");
  const [agreedTerms, setAgreedTerms] = useState({ terms: false, correctInfo: false, validDocs: false });

  const toggleShift = (shift: string) => {
    setSelectedShift((prev) => (prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]));
  };

  return (
    <section id="apply-form" className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-label text-primary">Partner Registration</span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">Rider Application Form</h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">Please complete all 10 sections carefully. All fields marked with (*) are mandatory.</p>
          </div>
          <div className="bg-card border border-border rounded-4xl p-6 sm:p-10 lg:p-12 shadow-[var(--shadow-elevated)] space-y-8">
            <FormPersonalInfo onFocus={() => onStepChange(1)} />
            <FormAddress onFocus={() => onStepChange(2)} />
            <FormEmergencyAndDriving onFocusStep={onStepChange} />
            <FormVehicleDetails onFocus={() => onStepChange(5)} />
            <FormAvailabilityAndShift availability={availability} setAvailability={setAvailability} selectedShift={selectedShift} toggleShift={toggleShift} onFocusStep={onStepChange} />
            <FormUploadDocuments docs={docs} setDocs={setDocs} onFocus={() => onStepChange(8)} />
            <FormPaymentAndTerms paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} agreedTerms={agreedTerms} setAgreedTerms={setAgreedTerms} onFocusStep={onStepChange} />
          </div>
        </div>
      </div>
    </section>
  );
}