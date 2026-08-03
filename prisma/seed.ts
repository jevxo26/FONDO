import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // No seed data required. Roles and module permissions are defined statically
  // in server/config/rolePermissions.ts. Per-user grants/revokes are managed
  // through the admin UI at runtime.
  console.log("Seed completed. Module permissions live in server/config/rolePermissions.ts.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
