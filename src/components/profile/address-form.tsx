import { Plus } from "lucide-react";

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
      className="border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-card"
    >
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Label
        </label>
        <select
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        >
          <option value="">Select label</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Receiver Name *
        </label>
        <input
          type="text"
          placeholder="Full name"
          value={receiverName}
          onChange={(e) => onReceiverNameChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Receiver Phone *
        </label>
        <input
          type="tel"
          placeholder="+880 1XXX XXXXXX"
          value={receiverPhone}
          onChange={(e) => onReceiverPhoneChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Division *
        </label>
        <input
          type="text"
          placeholder="e.g. Dhaka"
          value={division}
          onChange={(e) => onDivisionChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          District *
        </label>
        <input
          type="text"
          placeholder="e.g. Dhaka"
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Area / Thana *
        </label>
        <input
          type="text"
          placeholder="e.g. Gulshan"
          value={area}
          onChange={(e) => onAreaChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Road / Street
        </label>
        <input
          type="text"
          placeholder="Road number, colony"
          value={road}
          onChange={(e) => onRoadChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          House
        </label>
        <input
          type="text"
          placeholder="House / building"
          value={house}
          onChange={(e) => onHouseChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
          Postal Code
        </label>
        <input
          type="text"
          placeholder="e.g. 1212"
          value={postalCode}
          onChange={(e) => onPostalCodeChange(e.target.value)}
          className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground"
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold font-sans uppercase rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Plus className="size-3.5" /> Add Address
        </button>
      </div>
    </form>
  );
}
