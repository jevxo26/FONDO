import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export interface WeeklyAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface Props {
  availability: WeeklyAvailability[];
  setAvailability: React.Dispatch<React.SetStateAction<WeeklyAvailability[]>>;
  selectedShift: string[];
  toggleShift: (shift: string) => void;
  onFocusStep: (step: number) => void;
}

export function FormAvailabilityAndShift({ availability, setAvailability, selectedShift, toggleShift, onFocusStep }: Props) {
  const toggleDay = (idx: number) => {
    const updated = [...availability];
    updated[idx].enabled = !updated[idx].enabled;
    setAvailability(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section 06: Availability */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(6)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">06</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Weekly Schedule Selector</h3>
          </div>
          <CalendarIcon className="size-5 text-primary" />
        </div>
        <div className="space-y-3">
          {availability.map((item, idx) => (
            <div key={item.day} className={`flex flex-wrap items-center justify-between p-3 rounded-2xl border transition-colors gap-4 ${item.enabled ? "bg-card border-primary/40" : "bg-card/50 border-border opacity-60"}`}>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => toggleDay(idx)} className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${item.enabled ? "bg-primary" : "bg-secondary"}`}>
                  <span className={`size-3 rounded-full bg-white absolute top-1 transition-transform ${item.enabled ? "right-1" : "left-1"}`} />
                </button>
                <span className="text-xs font-bold text-foreground w-20">{item.day}</span>
              </div>
              {item.enabled ? (
                <div className="flex items-center gap-2 text-xs">
                  <input type="time" value={item.startTime} onChange={(e) => { const u = [...availability]; u[idx].startTime = e.target.value; setAvailability(u); }} className="bg-background border border-border rounded-lg px-2 py-1 text-foreground" />
                  <span className="text-muted-foreground">to</span>
                  <input type="time" value={item.endTime} onChange={(e) => { const u = [...availability]; u[idx].endTime = e.target.value; setAvailability(u); }} className="bg-background border border-border rounded-lg px-2 py-1 text-foreground" />
                </div>
              ) : (<span className="text-xs text-muted-foreground italic">Unavailable</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* Section 07: Shifts */}
      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 space-y-6" onFocus={() => onFocusStep(7)}>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">07</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Preferred Shift</h3>
          </div>
          <Clock className="size-5 text-primary" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "Morning", time: "8 AM - 12 PM" },
            { id: "Afternoon", time: "12 PM - 4 PM" },
            { id: "Evening", time: "4 PM - 8 PM" },
            { id: "Night", time: "8 PM - 12 AM" },
          ].map((shift) => (
            <button type="button" key={shift.id} onClick={() => toggleShift(shift.id)} className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${selectedShift.includes(shift.id) ? "bg-primary text-primary-foreground border-primary font-bold shadow-[var(--shadow-badge)]" : "bg-card text-foreground border-border hover:bg-secondary"}`}>
              <div className="text-xs font-bold">{shift.id}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{shift.time}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}