"use client";

import { useState } from "react";
import { Trash2, Plus, Star } from "lucide-react";
import { useAddresses, useCreateAddress, useDeleteAddress, useSetDefaultAddress } from "@/hooks/use-addresses";
import { handleApiError } from "@/lib/api-error";
import { toast } from "sonner";

export function AddressManager() {
  const { data: addresses = [], isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefault = useSetDefaultAddress();

  const [label, setLabel] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !streetAddress || !city) return;
    try {
      await createAddress.mutateAsync({ label, streetAddress, city, zipCode });
      setLabel("");
      setStreetAddress("");
      setCity("");
      setZipCode("");
      toast.success("Address added");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress.mutateAsync(id);
      toast.success("Address removed");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefault.mutateAsync(id);
      toast.success("Default address updated");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-foreground">My Addresses</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Manage multiple addresses for faster checkout.</p>
      </div>

      {isLoading ? (
        <p className="text-xs text-muted-foreground">Loading addresses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(addr => (
            <div key={addr.id} className="border border-border p-4 rounded-xl bg-card flex flex-col justify-between group">
              <div>
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-block mb-2">
                  {addr.isDefault && <Star className="size-3 fill-primary" />}
                  {addr.label}
                </span>
                <p className="font-sans text-xs text-foreground/80 leading-relaxed">{addr.road || addr.area}, {addr.district} {addr.postalCode ?? ""}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-border">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                  >
                    Set default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors ml-auto"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 items-end bg-card">
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">Label</label>
          <input type="text" placeholder="e.g. Home, Office" value={label} onChange={e => setLabel(e.target.value)} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">City</label>
          <input type="text" placeholder="e.g. Dhaka" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">Street Address</label>
          <input type="text" placeholder="House, road, area" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">ZIP Code</label>
          <input type="text" placeholder="1213" value={zipCode} onChange={e => setZipCode(e.target.value)} className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ring text-foreground" />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={createAddress.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold font-sans uppercase rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Plus className="size-3.5" /> Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export function LoginHistoryTable() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-foreground">Security Logs</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Recent system logins. Read-only audit.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-muted border-b border-border text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
              <th className="p-3">Platform</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Location</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground/80">
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="p-3 font-medium">Chrome on Windows</td>
              <td className="p-3 font-mono text-[11px]">103.230.104.12</td>
              <td className="p-3">Dhaka, BD</td>
              <td className="p-3 text-muted-foreground">2026-07-18 14:32</td>
            </tr>
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="p-3 font-medium">Safari on iPhone</td>
              <td className="p-3 font-mono text-[11px]">103.230.105.45</td>
              <td className="p-3">Chittagong, BD</td>
              <td className="p-3 text-muted-foreground">2026-07-15 09:12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DeviceRegistry() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-foreground">Active Devices</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Review active sessions and revoke access if suspicious.</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-card">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">PC</span>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-foreground">Windows PC - Chrome</h4>
              <span className="text-[8px] bg-success/10 text-success font-bold tracking-wider uppercase px-1.5 py-0.5 rounded mt-0.5 inline-block">Current Session</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-card">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground">IP</span>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-foreground">iPhone 15 Pro - Safari</h4>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-colors">
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}
