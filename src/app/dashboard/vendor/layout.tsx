"use client";

import { PageFooter } from "@/components/dashboard/layout/footer/page-footer";
import { DashboardHeader } from "@/components/dashboard/layout/header/header";
import { DashboardSidebar } from "@/components/dashboard/layout/sidebar/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { sidebarItems, sectionConfig } from "@/data/vendor-dashboard";
import { Store } from "lucide-react";

export default function VendorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-[radial-gradient(ellipse_at_top_right,rgba(206,163,89,0.06)_0%,transparent_65%)]">
      <DashboardSidebar
        items={sidebarItems}
        sections={sectionConfig}
        basePath="/dashboard/vendor"
        panelLabel="Vendor Panel"
        logoIcon={Store}
        showOverview={false}
        userName="Fresh Meals"
        userRole="Vendor"
        userInitials="VN"
      />
      <SidebarInset
        suppressHydrationWarning
        className="relative self-start max-h-svh overflow-y-auto"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(206,163,89,0.35) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}
      >
        <DashboardHeader />
        <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1600px)_minmax(0,1fr)] xl:grid-rows-1">
          <div className="pointer-events-none relative hidden h-full bg-gradient-to-r from-primary/[0.04] to-transparent xl:block">
            <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(45deg,transparent,transparent_32px,rgba(206,163,89,0.12)_32px,rgba(206,163,89,0.12)_33px)]" />
          </div>
          <div className="relative min-w-0 overflow-hidden bg-transparent px-4 py-6 md:px-8 md:py-10">
            <div className="pointer-events-none absolute top-16 left-8 size-4 rotate-45 border border-primary/20 bg-primary/10" />
            <div className="pointer-events-none absolute top-12 left-[52px] size-2.5 rotate-45 border border-primary/15 bg-primary/8" />
            <div className="pointer-events-none absolute top-[66px] left-[72px] size-1.5 rotate-45 border border-primary/25 bg-primary/15" />
            {children}
            <PageFooter />
          </div>
          <div className="pointer-events-none relative hidden h-full bg-gradient-to-l from-primary/[0.04] to-transparent xl:block">
            <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(135deg,transparent,transparent_32px,rgba(206,163,89,0.12)_32px,rgba(206,163,89,0.12)_33px)]" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
