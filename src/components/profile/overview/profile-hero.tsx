"use client";

import { useAuth } from "@/hooks/use-auth";
import { useLoyaltyTier } from "@/hooks/use-loyalty-tier";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  tier: ReturnType<typeof useLoyaltyTier>;
}

export function ProfileHero({ tier }: Props) {
  const { user } = useAuth();
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";
  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-BD", { month: "long", year: "numeric" })
    : null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.05] via-card to-primary/[0.02] p-6 shadow-[var(--shadow-card)] md:p-8">
      <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-5 top-5 z-10 size-[7px] rotate-45 border border-primary/30" />
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${tier.stripeClass}`} />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 ring-2 ring-primary/30 ring-offset-2 ring-offset-card md:size-20">
            {user?.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
            <AvatarFallback className="bg-primary/10 font-heading text-xl font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="flex items-center gap-1.5 text-label text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> Welcome back
            </p>
            <h1 className="mt-0.5 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-[32px]">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className={tier.badgeClass}>
                <Crown className="size-3" />
                {tier.name} Member
              </Badge>
              {joined && (
                <span className="flex items-center gap-1 text-small text-muted-foreground">
                  <MapPin className="size-3 text-muted-foreground/60" />
                  Member since {joined}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="accent" className="rounded-xl" render={<Link href="/foods" />}>
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
}
