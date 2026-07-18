import React from "react";
import { Trash2 } from "lucide-react";

export function OrderHistory() {
  const orders = [
    { id: "#ORD-9843", date: "2026-07-10", total: "৳1,450", status: "Delivered" },
    { id: "#ORD-9721", date: "2026-06-28", total: "৳820", status: "Delivered" }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Culinary Order Records</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Verify recent acquisitions, billing statements, and transactional metrics.</p>
      </div>
      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="p-4 border border-[#16100C]/10 rounded-xl bg-white flex flex-col md:flex-row justify-between md:items-center gap-3">
            <div className="space-y-1">
              <h4 className="font-sans text-xs font-bold text-[#16100C]">{order.id}</h4>
              <p className="font-sans text-[10px] text-[#16100C]/50">Dispatched: {order.date}</p>
            </div>
            <div className="flex items-center gap-6 justify-between md:justify-end">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#16100C]/40 block">Gross Price</span>
                <span className="font-fraunces text-sm font-bold text-[#16100C]">{order.total}</span>
              </div>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[9px] font-bold uppercase tracking-wider rounded-md">{order.status}</span>
              <button type="button" className="px-3 py-1.5 border border-[#16100C]/10 text-[10px] font-bold uppercase tracking-wider rounded-lg text-[#16100C]">Invoice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WalletBalance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Financial Repository</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Maintain store credits, gift vouchers, and process rapid checkout transactions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#16100C] text-white p-5 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
          <span className="text-[9px] text-white/50 uppercase tracking-widest block">Available Assets</span>
          <h2 className="font-fraunces text-2xl font-bold">৳2,450.00</h2>
          <button type="button" className="w-full py-2 bg-[#CEA359] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl">Recharge Wallet</button>
        </div>
        <div className="md:col-span-2 border border-[#16100C]/10 rounded-2xl p-4 space-y-3">
          <h4 className="font-fraunces text-xs font-bold text-[#16100C]">Rapid Injections</h4>
          <div className="flex gap-2 pt-1">
            {["+ ৳500", "+ ৳1,000", "+ ৳2,000"].map(amt => (
              <button key={amt} type="button" className="px-3 py-1.5 bg-[#FAF5EB] border border-[#16100C]/10 text-[#16100C] rounded-lg text-[10px] font-bold">{amt}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subscriptions & Favorites can be placed similarly as self-contained forms...