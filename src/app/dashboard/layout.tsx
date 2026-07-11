import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/layout/sidebar/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/layout/header/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-svh overflow-y-auto">
        <DashboardHeader />
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
