import { Navbar } from "@/components/layout/navbar/navbar";
import { MobileNav } from "@/components/layout/navbar/mobile-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main className="flex-1">{children}</main>
    </>
  );
}
