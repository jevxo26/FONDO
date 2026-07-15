import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import { QueryProvider } from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FONDO - Smart Subscription Food Delivery",
  description: "Healthy, scheduled, and customizable meal delivery services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        <TooltipProvider delay={0}>
          <ReduxProvider>
            <QueryProvider>{children}</QueryProvider>
          </ReduxProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
