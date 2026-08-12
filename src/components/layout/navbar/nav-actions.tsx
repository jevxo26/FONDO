"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDashboardPath } from "@/data/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useAppSelector } from "@/store/store";
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
  RIDER: "Rider",
  CUSTOMER: "Customer",
};

export function NavActions() {
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();
  const permissions = useAppSelector((s) => s.auth.permissions);
  const { data: cart } = useCart(!isAuthenticated);
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

  const dashboardHref = user ? getDashboardPath(user.role, permissions) : null;
  const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "U";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const roleLabel = user ? roleLabels[user.role] ?? user.role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/wishlist"
        className={cn("nav-icon-pill", "text-foreground")}
      >
        <Heart className="nav-icon" />
        {favoritesCount > 0 && (
          <motion.span
            key={`fav-badge-${favoritesCount}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-2 -right-1 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-primary px-[5px] text-[11px] font-bold text-primary-foreground leading-none ring-2 ring-background"
          >
            {favoritesCount > 9 ? "9+" : favoritesCount}
          </motion.span>
        )}
      </Link>
      <Link
        href="/cart"
        className={cn("nav-icon-pill", "text-foreground")}
      >
        <motion.span
          key={`cart-icon-${cartCount}`}
          animate={cartCount > 0 ? { scale: [1, 1.35, 0.9, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <ShoppingCart className="nav-icon" />
        </motion.span>
        {cartCount > 0 && (
          <motion.span
            key={`cart-badge-${cartCount}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-2 -right-1 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-primary px-[5px] text-[11px] font-bold text-primary-foreground leading-none ring-2 ring-background"
          >
            {cartCount > 9 ? "9+" : cartCount}
          </motion.span>
        )}
      </Link>

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden lg:block outline-none">
            <div className="flex cursor-pointer items-center gap-3 rounded-xl bg-foreground px-3 py-1.5 pr-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/90 active:scale-[0.98]">
              <Avatar className="size-7 ring-2 ring-primary/40 ring-offset-1 ring-offset-foreground shadow-[0_0_12px_rgba(168,90,56,0.2)]">
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
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.01] p-3 mb-1">
              <Avatar className="size-9 ring-2 ring-primary/30 ring-offset-1 ring-offset-card shadow-[0_0_16px_rgba(168,90,56,0.15)]">
                <AvatarFallback className="bg-secondary text-xs font-bold text-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 leading-tight">
                <span className="truncate text-sm font-semibold text-foreground">{fullName}</span>
                <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
                <span className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
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
                { icon: Settings, label: "Settings", desc: "Preferences", href: "/settings", show: true },
              ].map((item) => {
                if (!item.show) return null;
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.label}
                    className="flex items-center gap-3 py-2.5 cursor-pointer"
                    onClick={() => item.href && router.push(item.href)}
                  >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent" />

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
