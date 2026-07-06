import { Headphones, Utensils } from "lucide-react";
import Link from "next/link";
import { SidebarMenu } from "./sidebar-menu";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-border bg-background px-4 py-8 shadow-sm">
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <Utensils className="size-5 text-white" />
          </div>
          <div>
            <h1 className="font-fraunces text-xl font-bold text-foreground">
              FONDO
            </h1>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <SidebarMenu />

      <div className="mt-auto border-t border-border pt-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95">
          <Headphones className="size-[18px]" />
          Support Dashboard
        </button>
      </div>
    </aside>
  );
}
