import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { DashboardHeader } from "@/components/dashboard/header/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <DashboardHeader />
      <main className="ml-64 min-h-screen pt-16">
        <div className="mx-auto max-w-[1400px] px-8 py-8">{children}</div>
      </main>
    </>
  );
}
