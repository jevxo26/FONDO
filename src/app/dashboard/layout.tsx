import { PageFooter } from "@/components/dashboard/layout/footer/page-footer";
import { DashboardHeader } from "@/components/dashboard/layout/header/header";
import { AppSidebar } from "@/components/dashboard/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-[radial-gradient(ellipse_at_top_right,rgba(206,163,89,0.06)_0%,transparent_65%)]">
      <AppSidebar />
      <SidebarInset
        suppressHydrationWarning
        className="relative self-start max-h-svh overflow-y-auto bg-transparent"
      >
        <DashboardHeader />
        <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1400px)_minmax(0,1fr)] xl:grid-rows-1">
          <div className="pointer-events-none relative hidden h-full bg-gradient-to-r from-primary/[0.04] to-transparent xl:block" />
          <div className="relative min-w-0 px-4 pt-6 md:px-8 md:pt-10 pb-20">
            <div className="pointer-events-none absolute -top-24 right-0 size-48 rounded-full bg-primary/[0.04] blur-3xl md:size-96" />
            <div className="pointer-events-none absolute -bottom-32 left-0 size-36 rounded-full bg-primary/[0.03] blur-3xl md:size-72" />
            {children}
            <PageFooter />
          </div>
          <div className="pointer-events-none relative hidden h-full bg-gradient-to-l from-primary/[0.04] to-transparent xl:block" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
