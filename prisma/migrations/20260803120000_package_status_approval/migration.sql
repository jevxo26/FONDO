-- PackageStatus enum + approval lifecycle columns (vendor submit -> PENDING -> admin approve)
-- Mirrors Food approval flow.

-- 1. Create enum type
CREATE TYPE "PackageStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- 2. Backfill: cast existing string status to enum
--    'active' -> APPROVED (published), 'inactive' -> REJECTED, else -> PENDING
ALTER TABLE "packages" ALTER COLUMN "status" DROP DEFAULT;
UPDATE "packages" SET "status" = CASE
    WHEN "status" = 'active' THEN 'APPROVED'
    WHEN "status" = 'inactive' THEN 'REJECTED'
    ELSE 'PENDING'
END;
ALTER TABLE "packages" ALTER COLUMN "status" TYPE "PackageStatus" USING "status"::"PackageStatus";
ALTER TABLE "packages" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- 3. Approval metadata columns
ALTER TABLE "packages" ADD COLUMN "approvedBy" TEXT;
ALTER TABLE "packages" ADD COLUMN "approvedAt" TIMESTAMP(3);
ALTER TABLE "packages" ADD COLUMN "rejectionReason" TEXT;

-- 4. FK to users (approver)
ALTER TABLE "packages" ADD CONSTRAINT "packages_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
