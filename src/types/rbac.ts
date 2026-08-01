import type { User } from "@/types/auth";

export interface Permission {
  id: string;
  module: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type PermissionsByModule = Record<string, Permission[]>;

export interface RbacRole {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isDefault: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  rolePermissions: { permission: Permission }[];
  _count?: { userRoles: number };
}

export interface UserRoleAssignment {
  id: string;
  userId: string;
  roleId: string;
  assignedBy: string | null;
  assignedAt: string;
  status: string;
  role: Pick<RbacRole, "id" | "name" | "slug" | "description" | "status">;
}

export type UserWithRoles = User & { roles: RbacRole[] };
