import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MODULES = [
  "users",
  "foods",
  "orders",
  "vendors",
  "coupons",
  "riders",
  "packages",
  "reports",
  "settings",
  "roles",
] as const;

const ACTIONS = ["view", "create", "update", "delete"] as const;

const MODULE_LABELS: Record<(typeof MODULES)[number], string> = {
  users: "Users",
  foods: "Foods",
  orders: "Orders",
  vendors: "Vendors",
  coupons: "Coupons",
  riders: "Riders",
  packages: "Packages",
  reports: "Reports",
  settings: "Settings",
  roles: "Roles",
};

const allPermissions = (): string[] =>
  MODULES.flatMap((module) => ACTIONS.map((action) => `${module}:${action}`));

interface RoleSeed {
  slug: string;
  name: string;
  description: string;
  isDefault?: boolean;
  permissions: string[];
}

const roleSeeds: RoleSeed[] = [
  {
    slug: "SUPER_ADMIN",
    name: "Super Admin",
    description: "Full platform access including role and permission management.",
    permissions: allPermissions(),
  },
  {
    slug: "ADMIN",
    name: "Admin",
    description: "Manage all platform modules except role and permission management.",
    permissions: allPermissions().filter((slug) => !slug.startsWith("roles")),
  },
  {
    slug: "VENDOR",
    name: "Vendor",
    description: "Manage own foods, orders, and reports.",
    permissions: [
      "foods:view",
      "foods:create",
      "foods:update",
      "orders:view",
      "orders:update",
      "vendors:view",
      "vendors:update",
      "reports:view",
    ],
  },
  {
    slug: "VENDOR_STAFF",
    name: "Vendor Staff",
    description: "Manage vendor foods and orders within assigned scope.",
    permissions: ["foods:view", "foods:update", "orders:view", "orders:update"],
  },
  {
    slug: "KITCHEN_STAFF",
    name: "Kitchen Staff",
    description: "View and update kitchen order preparation status.",
    permissions: ["orders:view", "orders:update"],
  },
  {
    slug: "RIDER",
    name: "Rider",
    description: "View and update assigned delivery orders.",
    permissions: ["orders:view", "orders:update", "riders:view", "reports:view"],
  },
  {
    slug: "CUSTOMER",
    name: "Customer",
    description: "Default role for registered customers.",
    isDefault: true,
    permissions: [],
  },
  {
    slug: "SUPPORT_AGENT",
    name: "Support Agent",
    description: "View and assist customers with their orders.",
    permissions: ["users:view", "orders:view", "orders:update", "coupons:view"],
  },
];

async function seedPermissions() {
  for (const mod of MODULES) {
    for (const action of ACTIONS) {
      const slug = `${mod}:${action}`;
      await prisma.permission.upsert({
        where: { slug },
        update: {
          module: mod,
          name: `${MODULE_LABELS[mod]} ${action[0].toUpperCase()}${action.slice(1)}`,
        },
        create: {
          module: mod,
          slug,
          name: `${MODULE_LABELS[mod]} ${action[0].toUpperCase()}${action.slice(1)}`,
          description: `Can ${action} ${MODULE_LABELS[mod].toLowerCase()}`,
        },
      });
    }
  }
}

async function seedRolePermissions() {
  for (const seed of roleSeeds) {
    const role = await prisma.rbacRole.upsert({
      where: { slug: seed.slug },
      update: {
        name: seed.name,
        description: seed.description,
        status: "active",
      },
      create: {
        slug: seed.slug,
        name: seed.name,
        description: seed.description,
        isDefault: seed.isDefault ?? false,
        status: "active",
      },
    });

    const permissions = await prisma.permission.findMany({
      where: { slug: { in: seed.permissions } },
      select: { id: true },
    });
    const desiredIds = new Set(permissions.map((p) => p.id));

    const existing = await prisma.rolePermission.findMany({
      where: { roleId: role.id },
      select: { permissionId: true },
    });
    const existingIds = new Set(existing.map((rp) => rp.permissionId));

    const sameSet =
      desiredIds.size === existingIds.size && [...desiredIds].every((id) => existingIds.has(id));

    if (!sameSet) {
      await prisma.$transaction([
        prisma.rolePermission.deleteMany({ where: { roleId: role.id } }),
        prisma.rolePermission.createMany({
          data: permissions.map((p) => ({ roleId: role.id, permissionId: p.id })),
        }),
      ]);
    }
  }
}

async function seedSuperAdminAssignments() {
  const superAdmins = await prisma.user.findMany({
    where: { role: "SUPER_ADMIN" },
    select: { id: true },
  });
  if (superAdmins.length === 0) return;

  const superAdminRole = await prisma.rbacRole.findUnique({
    where: { slug: "SUPER_ADMIN" },
  });
  if (!superAdminRole) return;

  for (const admin of superAdmins) {
    const existing = await prisma.userRole.findFirst({
      where: { userId: admin.id, roleId: superAdminRole.id, status: "active" },
    });
    if (!existing) {
      await prisma.userRole.create({
        data: { userId: admin.id, roleId: superAdminRole.id, status: "active" },
      });
    }
  }
}

async function main() {
  await seedPermissions();
  await seedRolePermissions();
  await seedSuperAdminAssignments();
  console.log("RBAC seed completed successfully.");
}

main()
  .catch((err) => {
    console.error("RBAC seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
