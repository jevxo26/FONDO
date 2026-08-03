"use client";

import { useAppSelector } from "@/store/store";

export function useHasPermission(slug: string): boolean {
  const permissions = useAppSelector((state) => state.auth.permissions);
  return permissions.includes("*") || permissions.includes(slug);
}

export function useHasAnyPermission(slugs: string[]): boolean {
  const permissions = useAppSelector((state) => state.auth.permissions);
  return permissions.includes("*") || slugs.some((slug) => permissions.includes(slug));
}
