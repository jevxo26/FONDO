-- AlterTable
ALTER TABLE "users" ADD COLUMN "vendorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_vendorId_key" ON "users"("vendorId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
