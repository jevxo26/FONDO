"use client";

import { useEffect } from "react";
import { Heart, Menu, ShoppingCart, Truck, ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toggleMobileMenu } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/store/store";
import { fetchMe } from "@/store/slices/authSlice";
import { getToken } from "@/lib/token";
import { useAuth } from "@/hooks/useAuth";

const ROLE_DASHBOARD: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SUPER_ADMIN: "/dashboard/admin",
  VENDOR: "/dashboard/vendor",
  VENDOR_STAFF: "/dashboard/vendor",
  KITCHEN_STAFF: "/dashboard/kitchen",
  RIDER: "/dashboard/rider",
  SUPPORT_AGENT: "/dashboard/admin",
};

export function NavActions() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (token && !isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [dispatch, isAuthenticated]);

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

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/wishlist"
        className="flex size-9 items-center justify-center rounded-full bg-destructive/20 transition-colors hover:bg-destructive/30"
      >
        <Heart className="size-4 text-foreground" />
      </Link>
      <Link
        href="/cart"
        className="flex size-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary"
      >
        <ShoppingCart className="size-4 text-foreground" />
      </Link>
      <Link
        href="/track-order"
        className="hidden items-center gap-2 rounded-[8px] bg-foreground px-4 py-2 text-[16px] font-bold text-secondary transition-colors hover:bg-foreground/90 lg:flex"
      >
        <Truck className="size-5 text-secondary" />
        Track Order
      </Link>

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="hidden cursor-pointer items-center gap-2 rounded-[8px] bg-foreground px-3 py-2 text-[14px] font-medium text-secondary transition-colors hover:bg-foreground/90 lg:flex">
              <span className="flex size-6 items-center justify-center rounded-full bg-secondary/30 text-xs font-bold text-secondary">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="size-6 rounded-full object-cover" />
                ) : (
                  user.firstName[0]?.toUpperCase()
                )}
              </span>
              <span className="max-w-[100px] truncate">{user.firstName}</span>
              <ChevronDown className="size-3 shrink-0" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {dashboardHref && (
              <DropdownMenuItem onClick={() => router.push(dashboardHref)}>
                <LayoutDashboard className="size-4" />
                Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => router.push("/customer/profile")}>
              <User className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/login"
          className="hidden rounded-[8px] bg-foreground px-4 py-2 text-[14px] font-medium text-secondary transition-colors hover:bg-foreground/90 lg:block"
        >
          Sign In
        </Link>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(toggleMobileMenu())}
        className="rounded-full hover:bg-black/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
    </div>
  );
}
