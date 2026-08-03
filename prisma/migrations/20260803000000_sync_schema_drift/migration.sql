-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'VENDOR', 'RIDER', 'CUSTOMER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "cart_summaries" DROP CONSTRAINT "cart_summaries_cartId_fkey";

-- DropForeignKey
ALTER TABLE "food_nutritions" DROP CONSTRAINT "food_nutritions_foodId_fkey";

-- DropForeignKey
ALTER TABLE "food_ratings" DROP CONSTRAINT "food_ratings_foodId_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_notification_settings" DROP CONSTRAINT "user_notification_settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_securities" DROP CONSTRAINT "user_securities_userId_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "totalAmount",
ADD COLUMN     "grandTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "itemCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mealCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "custom_meal_plans" ADD COLUMN     "acceptedByVendorId" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "vendorApprovalStatus" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "cholesterol" DOUBLE PRECISION,
ADD COLUMN     "fiber" DOUBLE PRECISION,
ADD COLUMN     "fiveStar" INTEGER DEFAULT 0,
ADD COLUMN     "fourStar" INTEGER DEFAULT 0,
ADD COLUMN     "oneStar" INTEGER DEFAULT 0,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "sodium" DOUBLE PRECISION,
ADD COLUMN     "sugar" DOUBLE PRECISION,
ADD COLUMN     "threeStar" INTEGER DEFAULT 0,
ADD COLUMN     "totalReview" INTEGER DEFAULT 0,
ADD COLUMN     "twoStar" INTEGER DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "FoodStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "package_categories" DROP COLUMN "icon",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "coverImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "accountLockedUntil" TIMESTAMP(3),
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "chatNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "emailNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "failedLoginCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastFailedLoginAt" TIMESTAMP(3),
ADD COLUMN     "marketingNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "orderNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "paymentNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "preferredLanguage" TEXT,
ADD COLUMN     "profession" TEXT,
ADD COLUMN     "profileCompletionPercentage" DOUBLE PRECISION,
ADD COLUMN     "promotionNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pushNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "securityAnswer" TEXT,
ADD COLUMN     "securityQuestion" TEXT,
ADD COLUMN     "smsNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "systemNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "cart_summaries";

-- DropTable
DROP TABLE "food_nutritions";

-- DropTable
DROP TABLE "food_ratings";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "rbac_roles";

-- DropTable
DROP TABLE "role_permissions";

-- DropTable
DROP TABLE "user_notification_settings";

-- DropTable
DROP TABLE "user_profiles";

-- DropTable
DROP TABLE "user_roles";

-- DropTable
DROP TABLE "user_securities";

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GRANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_userId_module_type_key" ON "user_permissions"("userId", "module", "type");

-- CreateIndex
CREATE INDEX "activity_logs_userId_idx" ON "activity_logs"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_action_idx" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "banners_status_idx" ON "banners"("status");

-- CreateIndex
CREATE INDEX "blogs_status_idx" ON "blogs"("status");

-- CreateIndex
CREATE INDEX "blogs_categoryId_idx" ON "blogs"("categoryId");

-- CreateIndex
CREATE INDEX "cart_addons_cartItemId_idx" ON "cart_addons"("cartItemId");

-- CreateIndex
CREATE INDEX "cart_items_cartId_idx" ON "cart_items"("cartId");

-- CreateIndex
CREATE INDEX "cart_items_foodId_idx" ON "cart_items"("foodId");

-- CreateIndex
CREATE INDEX "cart_items_cartId_foodId_idx" ON "cart_items"("cartId", "foodId");

-- CreateIndex
CREATE INDEX "cart_meal_foods_cartMealId_idx" ON "cart_meal_foods"("cartMealId");

-- CreateIndex
CREATE INDEX "cart_meal_foods_foodId_idx" ON "cart_meal_foods"("foodId");

-- CreateIndex
CREATE INDEX "cart_meals_cartId_idx" ON "cart_meals"("cartId");

-- CreateIndex
CREATE INDEX "carts_customerId_status_idx" ON "carts"("customerId", "status");

-- CreateIndex
CREATE INDEX "carts_status_idx" ON "carts"("status");

-- CreateIndex
CREATE INDEX "categories_status_idx" ON "categories"("status");

-- CreateIndex
CREATE INDEX "coupon_usages_couponId_idx" ON "coupon_usages"("couponId");

-- CreateIndex
CREATE INDEX "coupon_usages_customerId_idx" ON "coupon_usages"("customerId");

-- CreateIndex
CREATE INDEX "coupon_usages_orderId_idx" ON "coupon_usages"("orderId");

-- CreateIndex
CREATE INDEX "coupon_usages_couponId_customerId_idx" ON "coupon_usages"("couponId", "customerId");

-- CreateIndex
CREATE INDEX "coupons_status_idx" ON "coupons"("status");

-- CreateIndex
CREATE UNIQUE INDEX "custom_meal_plans_customerId_key" ON "custom_meal_plans"("customerId");

-- CreateIndex
CREATE INDEX "customer_wallet_transactions_walletId_idx" ON "customer_wallet_transactions"("walletId");

-- CreateIndex
CREATE INDEX "customer_wallet_transactions_transactionType_idx" ON "customer_wallet_transactions"("transactionType");

-- CreateIndex
CREATE INDEX "deliveries_riderId_idx" ON "deliveries"("riderId");

-- CreateIndex
CREATE INDEX "deliveries_vendorId_idx" ON "deliveries"("vendorId");

-- CreateIndex
CREATE INDEX "deliveries_deliveryStatus_idx" ON "deliveries"("deliveryStatus");

-- CreateIndex
CREATE INDEX "food_addon_items_addonId_idx" ON "food_addon_items"("addonId");

-- CreateIndex
CREATE INDEX "food_addon_items_status_idx" ON "food_addon_items"("status");

-- CreateIndex
CREATE INDEX "food_addons_foodId_idx" ON "food_addons"("foodId");

-- CreateIndex
CREATE INDEX "food_addons_status_idx" ON "food_addons"("status");

-- CreateIndex
CREATE INDEX "food_allergens_foodId_idx" ON "food_allergens"("foodId");

-- CreateIndex
CREATE INDEX "food_discounts_foodId_idx" ON "food_discounts"("foodId");

-- CreateIndex
CREATE INDEX "food_discounts_status_idx" ON "food_discounts"("status");

-- CreateIndex
CREATE INDEX "food_favorites_foodId_idx" ON "food_favorites"("foodId");

-- CreateIndex
CREATE INDEX "food_favorites_userId_idx" ON "food_favorites"("userId");

-- CreateIndex
CREATE INDEX "food_favorites_userId_foodId_idx" ON "food_favorites"("userId", "foodId");

-- CreateIndex
CREATE INDEX "food_ingredients_foodId_idx" ON "food_ingredients"("foodId");

-- CreateIndex
CREATE INDEX "food_prices_foodId_idx" ON "food_prices"("foodId");

-- CreateIndex
CREATE INDEX "food_reviews_foodId_idx" ON "food_reviews"("foodId");

-- CreateIndex
CREATE INDEX "food_reviews_customerId_idx" ON "food_reviews"("customerId");

-- CreateIndex
CREATE INDEX "food_reviews_foodId_status_idx" ON "food_reviews"("foodId", "status");

-- CreateIndex
CREATE INDEX "food_schedules_foodId_idx" ON "food_schedules"("foodId");

-- CreateIndex
CREATE INDEX "food_schedules_mealType_idx" ON "food_schedules"("mealType");

-- CreateIndex
CREATE INDEX "food_tag_mappings_foodId_idx" ON "food_tag_mappings"("foodId");

-- CreateIndex
CREATE INDEX "food_tag_mappings_tagId_idx" ON "food_tag_mappings"("tagId");

-- CreateIndex
CREATE INDEX "food_variants_foodId_idx" ON "food_variants"("foodId");

-- CreateIndex
CREATE INDEX "food_variants_status_idx" ON "food_variants"("status");

-- CreateIndex
CREATE INDEX "foods_categoryId_idx" ON "foods"("categoryId");

-- CreateIndex
CREATE INDEX "foods_subCategoryId_idx" ON "foods"("subCategoryId");

-- CreateIndex
CREATE INDEX "foods_status_idx" ON "foods"("status");

-- CreateIndex
CREATE INDEX "foods_isFeatured_idx" ON "foods"("isFeatured");

-- CreateIndex
CREATE INDEX "foods_isPopular_idx" ON "foods"("isPopular");

-- CreateIndex
CREATE INDEX "foods_status_deletedAt_categoryId_idx" ON "foods"("status", "deletedAt", "categoryId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_foodId_idx" ON "order_items"("foodId");

-- CreateIndex
CREATE INDEX "order_meal_foods_orderMealId_idx" ON "order_meal_foods"("orderMealId");

-- CreateIndex
CREATE INDEX "order_meal_foods_foodId_idx" ON "order_meal_foods"("foodId");

-- CreateIndex
CREATE INDEX "order_meals_orderId_idx" ON "order_meals"("orderId");

-- CreateIndex
CREATE INDEX "order_refunds_orderId_idx" ON "order_refunds"("orderId");

-- CreateIndex
CREATE INDEX "order_refunds_paymentId_idx" ON "order_refunds"("paymentId");

-- CreateIndex
CREATE INDEX "order_schedules_orderId_idx" ON "order_schedules"("orderId");

-- CreateIndex
CREATE INDEX "order_status_histories_orderId_idx" ON "order_status_histories"("orderId");

-- CreateIndex
CREATE INDEX "order_timelines_orderId_idx" ON "order_timelines"("orderId");

-- CreateIndex
CREATE INDEX "orders_customerId_idx" ON "orders"("customerId");

-- CreateIndex
CREATE INDEX "orders_vendorId_idx" ON "orders"("vendorId");

-- CreateIndex
CREATE INDEX "orders_orderStatus_idx" ON "orders"("orderStatus");

-- CreateIndex
CREATE INDEX "orders_paymentStatus_idx" ON "orders"("paymentStatus");

-- CreateIndex
CREATE INDEX "orders_deliveryStatus_idx" ON "orders"("deliveryStatus");

-- CreateIndex
CREATE INDEX "orders_placedAt_idx" ON "orders"("placedAt");

-- CreateIndex
CREATE INDEX "orders_deletedAt_idx" ON "orders"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "package_categories_name_key" ON "package_categories"("name");

-- CreateIndex
CREATE INDEX "packages_status_idx" ON "packages"("status");

-- CreateIndex
CREATE INDEX "payment_attempts_paymentId_idx" ON "payment_attempts"("paymentId");

-- CreateIndex
CREATE INDEX "payment_gateways_code_idx" ON "payment_gateways"("code");

-- CreateIndex
CREATE INDEX "payment_gateways_status_idx" ON "payment_gateways"("status");

-- CreateIndex
CREATE INDEX "payment_refunds_paymentId_idx" ON "payment_refunds"("paymentId");

-- CreateIndex
CREATE INDEX "payment_transactions_paymentId_idx" ON "payment_transactions"("paymentId");

-- CreateIndex
CREATE INDEX "payments_customerId_idx" ON "payments"("customerId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_paymentMethodId_idx" ON "payments"("paymentMethodId");

-- CreateIndex
CREATE INDEX "payments_transactionId_idx" ON "payments"("transactionId");

-- CreateIndex
CREATE INDEX "rider_wallet_transactions_walletId_idx" ON "rider_wallet_transactions"("walletId");

-- CreateIndex
CREATE INDEX "riders_vendorId_idx" ON "riders"("vendorId");

-- CreateIndex
CREATE INDEX "riders_status_idx" ON "riders"("status");

-- CreateIndex
CREATE INDEX "riders_isOnline_idx" ON "riders"("isOnline");

-- CreateIndex
CREATE INDEX "sub_categories_categoryId_idx" ON "sub_categories"("categoryId");

-- CreateIndex
CREATE INDEX "sub_categories_status_idx" ON "sub_categories"("status");

-- CreateIndex
CREATE INDEX "subscriptions_customerId_idx" ON "subscriptions"("customerId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "support_tickets_customerId_idx" ON "support_tickets"("customerId");

-- CreateIndex
CREATE INDEX "support_tickets_status_idx" ON "support_tickets"("status");

-- CreateIndex
CREATE INDEX "user_addresses_userId_idx" ON "user_addresses"("userId");

-- CreateIndex
CREATE INDEX "user_devices_userId_idx" ON "user_devices"("userId");

-- CreateIndex
CREATE INDEX "user_login_histories_userId_idx" ON "user_login_histories"("userId");

-- CreateIndex
CREATE INDEX "user_otps_userId_idx" ON "user_otps"("userId");

-- CreateIndex
CREATE INDEX "user_otps_phone_idx" ON "user_otps"("phone");

-- CreateIndex
CREATE INDEX "user_otps_otp_idx" ON "user_otps"("otp");

-- CreateIndex
CREATE INDEX "user_otps_status_idx" ON "user_otps"("status");

-- CreateIndex
CREATE INDEX "user_sessions_userId_idx" ON "user_sessions"("userId");

-- CreateIndex
CREATE INDEX "user_sessions_accessToken_idx" ON "user_sessions"("accessToken");

-- CreateIndex
CREATE INDEX "user_sessions_refreshToken_status_idx" ON "user_sessions"("refreshToken", "status");

-- CreateIndex
CREATE INDEX "user_sessions_status_idx" ON "user_sessions"("status");

-- CreateIndex
CREATE INDEX "user_tokens_userId_idx" ON "user_tokens"("userId");

-- CreateIndex
CREATE INDEX "user_tokens_type_idx" ON "user_tokens"("type");

-- CreateIndex
CREATE INDEX "user_tokens_token_idx" ON "user_tokens"("token");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_role_deletedAt_idx" ON "users"("role", "deletedAt");

-- CreateIndex
CREATE INDEX "vendor_food_assignments_vendorId_idx" ON "vendor_food_assignments"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_food_assignments_foodId_idx" ON "vendor_food_assignments"("foodId");

-- CreateIndex
CREATE INDEX "vendor_food_assignments_status_idx" ON "vendor_food_assignments"("status");

-- CreateIndex
CREATE INDEX "vendor_foods_vendorId_idx" ON "vendor_foods"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_foods_foodId_idx" ON "vendor_foods"("foodId");

-- CreateIndex
CREATE INDEX "vendor_foods_status_idx" ON "vendor_foods"("status");

-- CreateIndex
CREATE INDEX "vendor_settlement_items_settlementId_idx" ON "vendor_settlement_items"("settlementId");

-- CreateIndex
CREATE INDEX "vendor_settlements_vendorId_idx" ON "vendor_settlements"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_settlements_paymentStatus_idx" ON "vendor_settlements"("paymentStatus");

-- CreateIndex
CREATE INDEX "vendor_wallet_transactions_walletId_idx" ON "vendor_wallet_transactions"("walletId");

-- CreateIndex
CREATE INDEX "vendors_status_idx" ON "vendors"("status");

-- CreateIndex
CREATE INDEX "vendors_verificationStatus_idx" ON "vendors"("verificationStatus");

-- CreateIndex
CREATE INDEX "vendors_isActive_idx" ON "vendors"("isActive");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_meal_foods" ADD CONSTRAINT "package_meal_foods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

