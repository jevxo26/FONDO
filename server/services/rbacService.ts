import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";
import { MODULE_LABELS, ROLE_PERMISSIONS, TOGGLEABLE_MODULES } from "../config/rolePermissions";
import type { Role } from "@prisma/client";

export const getUserPermissions = catchServiceAsync(async (userId: string): Promise<string[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (!user) return [];

  const base = ROLE_PERMISSIONS[user.role as Role] ?? [];
  if (base.includes("*")) return ["*"];

  const overrides = await prisma.userPermission.findMany({
    where: { userId },
    select: { module: true, type: true },
  });

  const enabled = new Set(base);
  for (const override of overrides) {
    if (override.type === "GRANT") enabled.add(override.module);
    if (override.type === "REVOKE") enabled.delete(override.module);
  }
  return [...enabled];
});

export const listPermissionModules = catchServiceAsync(async (userId?: string) => {
  let role: Role | null = null;
  let grantedModules: Set<string> | null = null;
  let revokedModules = new Set<string>();

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (user) role = user.role as Role;
    const overrides = await prisma.userPermission.findMany({
      where: { userId },
      select: { module: true, type: true },
    });
    grantedModules = new Set(
      overrides.filter((o) => o.type === "GRANT").map((o) => o.module),
    );
    revokedModules = new Set(
      overrides.filter((o) => o.type === "REVOKE").map((o) => o.module),
    );
  }

  const baseModules = role ? ROLE_PERMISSIONS[role] ?? [] : [];
  const toggleableModules = role ? TOGGLEABLE_MODULES[role] ?? [] : [];

  return Object.entries(MODULE_LABELS).map(([module, label]) => {
    let granted: boolean | null = null;
    if (grantedModules) {
      granted = grantedModules.has(module) ? true : revokedModules.has(module) ? false : null;
    }
    return {
      module,
      label,
      base: baseModules.includes(module),
      toggleable: toggleableModules.includes(module),
      granted,
    };
  });
});

export const toggleUserModule = catchServiceAsync(
  async (userId: string, module: string, enabled: boolean) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (!user) throw new AppError(404, "User not found");

    const role = user.role as Role;
    const toggleable = TOGGLEABLE_MODULES[role] ?? [];
    if (!toggleable.includes(module)) {
      throw new AppError(400, `Module "${module}" cannot be toggled for ${role} users`);
    }

    const isBase = ROLE_PERMISSIONS[role]?.includes(module) ?? false;
    const type = enabled === isBase ? null : enabled ? "GRANT" : "REVOKE";

    if (!type) {
      await prisma.userPermission.deleteMany({ where: { userId, module } });
    } else {
      await prisma.userPermission.upsert({
        where: { userId_module_type: { userId, module, type } },
        update: {},
        create: { userId, module, type },
      });
    }

    const permissions = await getUserPermissions(userId);
    return { permissions };
  },
);
