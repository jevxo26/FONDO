/*
  Warnings:

  - You are about to drop the `food_galleries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_earnings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_availabilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_costs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_packagings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_performances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_preparation_times` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_qualities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_recipe_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_recipes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_food_zones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_payment_infos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "food_galleries" DROP CONSTRAINT "food_galleries_foodId_fkey";

-- DropForeignKey
ALTER TABLE "payment_histories" DROP CONSTRAINT "payment_histories_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "payment_invoices" DROP CONSTRAINT "payment_invoices_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "payment_logs" DROP CONSTRAINT "payment_logs_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_earnings" DROP CONSTRAINT "vendor_earnings_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_availabilities" DROP CONSTRAINT "vendor_food_availabilities_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_costs" DROP CONSTRAINT "vendor_food_costs_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_images" DROP CONSTRAINT "vendor_food_images_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_inventories" DROP CONSTRAINT "vendor_food_inventories_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_packagings" DROP CONSTRAINT "vendor_food_packagings_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_performances" DROP CONSTRAINT "vendor_food_performances_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_preparation_times" DROP CONSTRAINT "vendor_food_preparation_times_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_prices" DROP CONSTRAINT "vendor_food_prices_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_qualities" DROP CONSTRAINT "vendor_food_qualities_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_recipe_items" DROP CONSTRAINT "vendor_food_recipe_items_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_recipes" DROP CONSTRAINT "vendor_food_recipes_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_schedules" DROP CONSTRAINT "vendor_food_schedules_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_stocks" DROP CONSTRAINT "vendor_food_stocks_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_food_zones" DROP CONSTRAINT "vendor_food_zones_vendorFoodId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_payment_infos" DROP CONSTRAINT "vendor_payment_infos_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_staff" DROP CONSTRAINT "vendor_staff_branchId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_staff" DROP CONSTRAINT "vendor_staff_vendorId_fkey";

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "vendorId" TEXT;

-- DropTable
DROP TABLE "food_galleries";

-- DropTable
DROP TABLE "payment_histories";

-- DropTable
DROP TABLE "payment_invoices";

-- DropTable
DROP TABLE "payment_logs";

-- DropTable
DROP TABLE "vendor_earnings";

-- DropTable
DROP TABLE "vendor_food_availabilities";

-- DropTable
DROP TABLE "vendor_food_costs";

-- DropTable
DROP TABLE "vendor_food_images";

-- DropTable
DROP TABLE "vendor_food_inventories";

-- DropTable
DROP TABLE "vendor_food_packagings";

-- DropTable
DROP TABLE "vendor_food_performances";

-- DropTable
DROP TABLE "vendor_food_preparation_times";

-- DropTable
DROP TABLE "vendor_food_prices";

-- DropTable
DROP TABLE "vendor_food_qualities";

-- DropTable
DROP TABLE "vendor_food_recipe_items";

-- DropTable
DROP TABLE "vendor_food_recipes";

-- DropTable
DROP TABLE "vendor_food_schedules";

-- DropTable
DROP TABLE "vendor_food_stocks";

-- DropTable
DROP TABLE "vendor_food_zones";

-- DropTable
DROP TABLE "vendor_payment_infos";

-- DropTable
DROP TABLE "vendor_staff";

-- CreateIndex
CREATE INDEX "packages_vendorId_idx" ON "packages"("vendorId");

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
