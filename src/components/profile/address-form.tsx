import { Input } from "@/components/ui/input";
import { Plus, MapPin, User, Phone, Globe, Building2, MapPinned, Home, Mail } from "lucide-react";

interface Props {
  label: string;
  receiverName: string;
  receiverPhone: string;
  division: string;
  district: string;
  area: string;
  road: string;
  house: string;
  postalCode: string;
  isPending: boolean;
  onLabelChange: (val: string) => void;
  onReceiverNameChange: (val: string) => void;
  onReceiverPhoneChange: (val: string) => void;
  onDivisionChange: (val: string) => void;
  onDistrictChange: (val: string) => void;
  onAreaChange: (val: string) => void;
  onRoadChange: (val: string) => void;
  onHouseChange: (val: string) => void;
  onPostalCodeChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressForm({
  label,
  receiverName,
  receiverPhone,
  division,
  district,
  area,
  road,
  house,
  postalCode,
  isPending,
  onLabelChange,
  onReceiverNameChange,
  onReceiverPhoneChange,
  onDivisionChange,
  onDistrictChange,
  onAreaChange,
  onRoadChange,
  onHouseChange,
  onPostalCodeChange,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border/40 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-card shadow-sm"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Label
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <select
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            className="w-full h-9 pl-9 text-xs bg-background border border-input rounded-md focus:border-ring focus:ring-1 focus:ring-ring/50 outline-none transition-colors"
          >
            <option value="">Select label</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Receiver Name <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="Full name"
            value={receiverName}
            onChange={(e) => onReceiverNameChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Receiver Phone <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="tel"
            placeholder="+880 1XXX XXXXXX"
            value={receiverPhone}
            onChange={(e) => onReceiverPhoneChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Division <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="e.g. Dhaka"
            value={division}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          District <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="e.g. Dhaka"
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Area / Thana <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="e.g. Gulshan"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Road / Street
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="Road number, colony"
            value={road}
            onChange={(e) => onRoadChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          House
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="House / building"
            value={house}
            onChange={(e) => onHouseChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
          Postal Code
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="text"
            placeholder="e.g. 1212"
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="md:col-span-2 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold font-sans uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
        >
          <Plus className="size-3.5" /> Add Address
        </button>
      </div>
    </form>
  );
}
