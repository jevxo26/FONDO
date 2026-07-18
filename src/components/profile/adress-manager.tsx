import React, { useState } from "react";
import { Trash2, Plus, Laptop, LogOut } from "lucide-react";

// Addresses Manager Component
export function AddressManager() {
  const [addresses, setAddresses] = useState([
    { id: "1", title: "Home", address: "House 42, Road 11, Banani, Dhaka" },
    { id: "2", title: "Office", address: "Level 8, Tower B, Kawran Bazar, Dhaka" }
  ]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !text) return;
    setAddresses([...addresses, { id: Date.now().toString(), title, address: text }]);
    setTitle("");
    setText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Shipping & Logistics Nodes</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Manage multiple addresses for faster routing and checkout execution.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className="border border-[#16100C]/10 p-4 rounded-xl bg-[#FAF5EB]/30 flex flex-col justify-between group">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#CEA359] bg-[#CEA359]/10 px-2 py-0.5 rounded-md inline-block mb-2">{addr.title}</span>
              <p className="font-sans text-xs text-[#16100C] font-light leading-relaxed">{addr.address}</p>
            </div>
            <div className="flex justify-end mt-4 pt-2 border-t border-[#16100C]/5">
              <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleAdd} className="border border-[#16100C]/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-white">
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-wider font-bold text-[#16100C]/50">Card Label</label>
          <input type="text" placeholder="e.g. Gym" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-[#16100C]" />
        </div>
        <div className="space-y-1 md:col-span-2 flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-[9px] uppercase tracking-wider font-bold text-[#16100C]/50">Detailed Address</label>
            <input type="text" placeholder="Full Area Info" value={text} onChange={e => setText(e.target.value)} className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-[#16100C]" />
          </div>
          <button type="submit" className="px-4 py-2 bg-[#16100C] text-white text-xs font-bold font-sans uppercase rounded-xl h-[38px]">Inject</button>
        </div>
      </form>
    </div>
  );
}

// Login History Table (Read-Only)
export function LoginHistoryTable() {
  const history = [
    { id: "1", browser: "Chrome on Windows", ip: "103.230.104.12", location: "Dhaka, BD", time: "2026-07-18 14:32" },
    { id: "2", browser: "Safari on iPhone", ip: "103.230.105.45", location: "Chittagong, BD", time: "2026-07-15 09:12" }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Security Logs</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Audit log detailing recent system logins. Read-only structural table.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#16100C]/10">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF5EB] border-b border-[#16100C]/10 text-[9px] uppercase tracking-wider font-bold text-[#16100C]/60">
              <th className="p-3">Platform Browser</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Geo Location</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#16100C]/5 font-light text-[#16100C]">
            {history.map(log => (
              <tr key={log.id} className="hover:bg-[#FAF5EB]/30 transition-colors">
                <td className="p-3 font-medium">{log.browser}</td>
                <td className="p-3 font-mono text-[11px]">{log.ip}</td>
                <td className="p-3">{log.location}</td>
                <td className="p-3 text-[#16100C]/60">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Active Devices Registry
export function DeviceRegistry() {
  const [devices, setDevices] = useState([
    { id: "1", name: "Windows PC - Chrome", current: true },
    { id: "2", name: "iPhone 15 Pro - Safari", current: false }
  ]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Device Registry</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Review sessions running on active devices and revoke access if suspicious activity occurs.</p>
      </div>
      <div className="space-y-3">
        {devices.map(dev => (
          <div key={dev.id} className="flex items-center justify-between p-4 border border-[#16100C]/10 rounded-xl bg-[#FAF5EB]/20">
            <div className="flex items-center gap-3">
              <Laptop className="size-5 text-[#CEA359]" />
              <div>
                <h4 className="font-sans text-xs font-bold text-[#16100C]">{dev.name}</h4>
                {dev.current && <span className="text-[8px] bg-green-100 text-green-700 font-bold tracking-wider uppercase px-1.5 py-0.5 rounded mt-0.5 inline-block">Active Node Session</span>}
              </div>
            </div>
            {!dev.current && (
              <button onClick={() => setDevices(devices.filter(d => d.id !== dev.id))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <LogOut className="size-3" /> Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}