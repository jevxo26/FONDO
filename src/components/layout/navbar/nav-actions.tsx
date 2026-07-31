"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_DASHBOARD } from "@/data/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/store/api/slices/cart-api";
import { useFavorites } from "@/hooks/use-favorites";
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  VENDOR: "Vendor",
  VENDOR_STAFF: "Vendor Staff",
  KITCHEN_STAFF: "Kitchen Staff",
  RIDER: "Rider",
  CUSTOMER: "Customer",
  SUPPORT_AGENT: "Support Agent",
};

export function NavActions() {
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();
  const { data: cart } = useCart();
  const { data: favorites } = useFavorites();

  const cartCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const favoritesCount = favorites?.length ?? 0;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to log out");
    }
  };

  const dashboardHref = user ? ROLE_DASHBOARD[user.role] : null;
  const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "U";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const roleLabel = user ? roleLabels[user.role] ?? user.role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/wishlist"
        className="relative flex size-10 items-center justify-center rounded-full bg-destructive/20 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-destructive/30 active:scale-[0.95]"
      >
        <Heart className="size-4 text-foreground" />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground leading-none">
            {favoritesCount > 9 ? "9+" : favoritesCount}
          </span>
        )}
      </Link>
      <Link
        href="/cart"
        className="relative hidden size-10 items-center justify-center rounded-full bg-secondary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary active:scale-[0.95] lg:flex"
      >
        <ShoppingCart className="size-4 text-foreground" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground leading-none">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </Link>

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden lg:block outline-none">
            <div className="flex cursor-pointer items-center gap-3 rounded-xl bg-foreground px-3 py-1.5 pr-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/90 active:scale-[0.98]">
              <Avatar className="size-7 ring-2 ring-primary/40 ring-offset-1 ring-offset-foreground shadow-[0_0_12px_rgba(206,163,89,0.2)]">
                <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar} alt="" className="size-full rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid text-left leading-tight">
                <span className="max-w-[90px] truncate text-sm font-semibold text-secondary">
                  {user.firstName}
                </span>
                <span className="max-w-[90px] truncate text-[9px] uppercase tracking-wider text-primary/80">
                  {roleLabel}
                </span>
              </div>
              <ChevronDown className="size-3 shrink-0 text-secondary/70" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-1.5">
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-primary/[0.03] to-primary/[0.01] p-3 mb-1">
              <Avatar className="size-9 ring-2 ring-primary/30 ring-offset-1 ring-offset-card shadow-[0_0_16px_rgba(206,163,89,0.15)]">
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 leading-tight">
                <span className="truncate text-sm font-semibold text-foreground">{fullName}</span>
                <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
                <span className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-wider text-primary">
                  {roleLabel}
                </span>
              </div>
            </div>

            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-0.5" />

              {[
                {
                  icon: LayoutDashboard,
                  label: "Dashboard",
                  desc: "View your panel",
                  href: dashboardHref,
                  show: !!dashboardHref,
                },
                { icon: ShoppingBag, label: "My Orders", desc: "Track your orders", href: "/orders", show: true },
                { icon: Heart, label: "Wishlist", desc: "Saved items", href: "/wishlist", show: true },
                { icon: User, label: "Profile", desc: "Manage your account", href: "/profile", show: true },
                { icon: Settings, label: "Settings", desc: "Preferences", href: "/profile?tab=settings", show: true },
              ].map((item) => {
                if (!item.show) return null;
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.label}
                    className="flex items-center gap-3 py-2.5 cursor-pointer"
                    onClick={() => item.href && router.push(item.href)}
                  >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

            <DropdownMenuItem
              className="flex items-center gap-3 py-2.5 text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/8">
                <LogOut className="size-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">Logout</p>
                <p className="text-[11px] text-muted-foreground">Sign out of your account</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/login"
          className="hidden rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-secondary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/90 active:scale-[0.98] lg:block"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
