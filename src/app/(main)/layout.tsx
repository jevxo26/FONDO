import { Footer } from "@/components/layout/footer/footer";
import { MobileNav } from "@/components/layout/navbar/mobile-nav";
import { Navbar } from "@/components/layout/navbar/navbar";

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
      <Footer />
    </>
  );
}
