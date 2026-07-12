import { BookOpen, Heart, LifeBuoy, Shield } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview", icon: Heart },
  { href: "/dashboard/foods", label: "Foods", icon: BookOpen },
  { href: "/dashboard/vendors", label: "Vendors", icon: Shield },
  { href: "/dashboard/orders", label: "Orders", icon: LifeBuoy },
  { href: "/dashboard/customers", label: "Customers", icon: Shield },
  { href: "/dashboard/reports", label: "Reports", icon: BookOpen },
];

export function PageFooter() {
  return (
    <div className="group relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)] -mb-36">
      <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/3 blur-2xl" />
      <div className="pointer-events-none absolute right-4 top-4 z-10 size-[7px] rotate-45 border border-primary/30" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className="font-fraunces text-lg font-semibold tracking-tight text-foreground">
              FONDO
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Smart subscription food delivery &mdash; connecting Dhaka&rsquo;s finest kitchens to
              your doorstep with precision and care.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Dashboard
            </h5>
            <ul className="mt-3 space-y-2">
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:text-primary"
                  >
                    <link.icon className="size-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Resources
            </h5>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:text-primary"
                >
                  <BookOpen className="size-3" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:text-primary"
                >
                  <LifeBuoy className="size-3" />
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1 hover:text-primary"
                >
                  <Shield className="size-3" />
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} FONDO. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
            Crafted with care in Dhaka
            <Heart className="size-3 text-primary" />
          </p>
        </div>
      </div>
    </div>
  );
}
