import { Trash2, Star } from "lucide-react";
import type { Address } from "@/types/address";

interface Props {
  address: Address;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({ address, onSetDefault, onDelete }: Props) {
  return (
    <div className="border border-border p-4 rounded-xl bg-card flex flex-col justify-between group">
      <div>
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-block mb-2">
          {address.isDefault && <Star className="size-3 fill-primary" />}
          {address.label}
        </span>
        <p className="font-sans text-xs text-foreground/80 leading-relaxed">
          {address.road || address.area}, {address.district} {address.postalCode ?? ""}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-border">
        {!address.isDefault && (
          <button onClick={() => onSetDefault(address.id)}
            className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
            Set default
          </button>
        )}
        <button onClick={() => onDelete(address.id)}
          className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-auto">
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
