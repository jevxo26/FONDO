import { Bell, HelpCircle, Search, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers, orders, or transactions..."
            className="rounded-full bg-muted pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden items-center gap-4 border-r border-border pr-6 md:flex">
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="size-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-foreground">Ahmed Rizvi</p>
            <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
              System Administrator
            </p>
          </div>
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
