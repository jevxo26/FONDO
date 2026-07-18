import React from "react";
import { User, Edit3 } from "lucide-react";

export function PersonalInfoForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Personal Information</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Manage your name, basic identity details, and active avatar settings.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-[#16100C]/5">
        <div className="size-20 bg-[#16100C]/5 rounded-full relative overflow-hidden group border border-[#16100C]/10 flex items-center justify-center text-[#16100C]/40">
          <User className="size-8" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Edit3 className="size-4 text-white" />
          </div>
        </div>
        <div>
          <button type="button" className="px-3 py-1.5 border border-[#16100C]/10 text-[11px] font-bold rounded-xl hover:bg-[#16100C]/5 transition-colors text-[#16100C]">Upload New Image</button>
          <p className="text-[10px] text-[#16100C]/40 mt-1.5">JPG, PNG parameters strictly allowed up to 2MB.</p>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">First Name</label>
          <input type="text" defaultValue="Zahid" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Last Name</label>
          <input type="text" defaultValue="Hasan" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Email Address</label>
          <input type="email" defaultValue="zahid@example.com" disabled className="w-full bg-[#16100C]/5 border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs text-[#16100C]/50 cursor-not-allowed" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Phone Number</label>
          <input type="text" defaultValue="+880 1712-345678" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Gender Matrix</label>
          <select defaultValue="Male" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other Tier</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Date of Birth</label>
          <input type="date" defaultValue="1998-05-14" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="md:col-span-2 pt-2">
          <button type="button" className="px-5 py-2.5 bg-[#CEA359] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#b08443] transition-colors shadow-sm">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export function ChangePasswordForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-fraunces text-xl font-normal text-[#16100C]">Authentication Metrics</h3>
        <p className="font-sans text-[11px] text-[#16100C]/50 mt-1">Update your system password parameters regularly to stay secure.</p>
      </div>
      <form className="max-w-md space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Current Security Key</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">New Security Key</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#16100C]/60">Confirm New Key</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#FAF5EB] border border-[#16100C]/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#CEA359] text-[#16100C]" />
        </div>
        <button type="button" className="px-5 py-2.5 bg-[#CEA359] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#b08443] transition-colors">Update Password</button>
      </form>
    </div>
  );
}