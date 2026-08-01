import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

export const getUserPermissions = catchServiceAsync(async (userId: string): Promise<string[]> => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId, status: "active" },
    include: {
      role: {
        include: {
          rolePermissions: { include: { permission: true } },
        },
      },
    },
  });

  const slugs = new Set<string>();
  for (const userRole of userRoles) {
    if (userRole.role.status !== "active") continue;
    for (const rp of userRole.role.rolePermissions) {
      slugs.add(rp.permission.slug);
    }
  }
  return [...slugs];
});

const rolePermissionSelect = {
  rolePermissions: {
    include: { permission: { select: { id: true, module: true, name: true, slug: true } } },
  },
  _count: { select: { userRoles: true } },
} as const;

export const listRoles = catchServiceAsync(async () => {
  return prisma.rbacRole.findMany({
    where: { status: "active" },
    orderBy: { createdAt: "asc" },
    select: {
      ...rolePermissionSelect,
      id: true,
      name: true,
      slug: true,
      description: true,
      isDefault: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
});

export const getRoleById = catchServiceAsync(async (id: string) => {
  const role = await prisma.rbacRole.findUnique({
    where: { id },
    select: {
      ...rolePermissionSelect,
      id: true,
      name: true,
      slug: true,
      description: true,
      isDefault: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!role) throw new AppError(404, "Role not found");
  return role;
});

interface RoleInput {
  name?: string;
  slug?: string;
  description?: string | null;
  status?: string;
}

export const createRole = catchServiceAsync(async (data: RoleInput) => {
  const slug = (data.slug ?? "").toUpperCase().replace(/\s+/g, "_");
  const existing = await prisma.rbacRole.findUnique({ where: { slug } });
  if (existing) throw new AppError(400, `Role "${slug}" already exists`);

  return prisma.rbacRole.create({
    data: {
      name: data.name!,
      slug,
      description: data.description ?? null,
      status: data.status ?? "active",
    },
  });
});

export const updateRole = catchServiceAsync(async (id: string, data: RoleInput) => {
  const role = await prisma.rbacRole.findUnique({ where: { id } });
  if (!role) throw new AppError(404, "Role not found");
  if (role.isDefault) throw new AppError(400, "Default roles cannot be modified");

  return prisma.rbacRole.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.slug !== undefined ? { slug: data.slug.toUpperCase().replace(/\s+/g, "_") } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    },
  });
});

export const deleteRole = catchServiceAsync(async (id: string) => {
  const role = await prisma.rbacRole.findUnique({
    where: { id },
    include: { _count: { select: { userRoles: true } } },
  });
  if (!role) throw new AppError(404, "Role not found");
  if (role.isDefault) throw new AppError(400, "Default roles cannot be deleted");
  if (role._count.userRoles > 0) {
    throw new AppError(400, `Role is assigned to ${role._count.userRoles} user(s); unassign first`);
  }

  await prisma.$transaction([
    prisma.rolePermission.deleteMany({ where: { roleId: id } }),
    prisma.rbacRole.delete({ where: { id } }),
  ]);
  return { message: "Role deleted" };
});

export const assignPermissionsToRole = catchServiceAsync(
  async (roleId: string, permissionSlugs: string[]) => {
    const role = await prisma.rbacRole.findUnique({ where: { id: roleId } });
    if (!role) throw new AppError(404, "Role not found");
    if (role.isDefault) throw new AppError(400, "Default role permissions are system-managed");

    const permissions = await prisma.permission.findMany({
      where: { slug: { in: permissionSlugs } },
      select: { id: true, slug: true },
    });
    if (permissions.length !== permissionSlugs.length) {
      const found = new Set(permissions.map((p) => p.slug));
      const missing = permissionSlugs.filter((slug) => !found.has(slug));
      throw new AppError(400, `Unknown permission(s): ${missing.join(", ")}`);
    }

    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId } }),
      prisma.rolePermission.createMany({
        data: permissions.map((p) => ({ roleId, permissionId: p.id })),
      }),
    ]);

    return prisma.rbacRole.findUnique({
      where: { id: roleId },
      select: {
        ...rolePermissionSelect,
        id: true,
        name: true,
        slug: true,
        description: true,
        isDefault: true,
        status: true,
      },
    });
  },
);

export const listPermissions = catchServiceAsync(async () => {
  const permissions = await prisma.permission.findMany({
    orderBy: [{ module: "asc" }, { slug: "asc" }],
  });

  const grouped: Record<string, typeof permissions> = {};
  for (const permission of permissions) {
    if (!grouped[permission.module]) grouped[permission.module] = [];
    grouped[permission.module].push(permission);
  }
  return grouped;
});

export const getUserRoles = catchServiceAsync(async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) throw new AppError(404, "User not found");

  return prisma.userRole.findMany({
    where: { userId },
    orderBy: { assignedAt: "desc" },
    include: {
      role: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          status: true,
        },
      },
    },
  });
});

export const assignRoleToUser = catchServiceAsync(
  async (userId: string, roleId: string, assignedBy?: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) throw new AppError(404, "User not found");

    const role = await prisma.rbacRole.findUnique({
      where: { id: roleId },
      include: { _count: { select: { userRoles: true } } },
    });
    if (!role) throw new AppError(404, "Role not found");
    if (role.status !== "active") throw new AppError(400, "Role is not active");

    const existing = await prisma.userRole.findFirst({
      where: { userId, roleId, status: "active" },
    });
    if (existing) throw new AppError(400, "Role is already assigned to this user");

    return prisma.userRole.create({
      data: { userId, roleId, assignedBy, status: "active" },
    });
  },
);

export const removeRoleFromUser = catchServiceAsync(async (userId: string, roleId: string) => {
  const userRole = await prisma.userRole.findFirst({
    where: { userId, roleId, status: "active" },
  });
  if (!userRole) throw new AppError(404, "Active role assignment not found");

  await prisma.userRole.update({
    where: { id: userRole.id },
    data: { status: "inactive" },
  });
  return { message: "Role unassigned" };
});
