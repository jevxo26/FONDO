import { SidebarProvider } from '@/components/dashboard/layout/sidebar-context';
import { Sidebar } from '@/components/dashboard/layout/sidebar/sidebar';
import { DashboardHeader } from '@/components/dashboard/layout/header/header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <DashboardHeader />
      <main className="min-h-screen pt-16 lg:ml-64">
        <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
