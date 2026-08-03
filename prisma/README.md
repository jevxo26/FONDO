# Prisma Schema — Model Index

Full schema in `schema.prisma` (~2,900 lines). Organized by module with section comments.

## Enums (line 14–140)

| Enum | Values |
|------|--------|
| Role | SUPER_ADMIN, ADMIN, VENDOR, RIDER, CUSTOMER |
| Gender | MALE, FEMALE, OTHER |
| UserStatus | ACTIVE, INACTIVE, SUSPENDED |
| VendorStatus | PENDING, APPROVED, SUSPENDED, REJECTED |
| VerificationStatus | UNVERIFIED, UNDER_REVIEW, VERIFIED |
| CommissionType | PERCENTAGE, FLAT |
| FoodType | VEG, NON_VEG, VEGAN, SEAFOOD |
| MealType | BREAKFAST, LUNCH, DINNER, SNACKS |
| DiscountType | PERCENTAGE, FLAT |
| OrderStatus | PENDING → CONFIRMED → PREPARING → ... → DELIVERED → CANCELLED |
| PaymentStatus | PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED |
| DeliveryStatus | PENDING, ASSIGNED, ACCEPTED, PICKED_UP, ON_THE_WAY, DELIVERED, FAILED, CANCELLED |
| SubscriptionStatus | PENDING, ACTIVE, PAUSED, FROZEN, COMPLETED, EXPIRED, CANCELLED |
| ProofType | PHOTO, SIGNATURE, OTP |
| StockStatus | IN_STOCK, LOW_STOCK, OUT_OF_STOCK |

## Module 1: Authentication (line 170–397)

| Model | Line | Key Relations |
|-------|------|-------------|
| User | 170 | → UserProfile, UserAddress[], UserDevice[], UserSession[], UserOTP[], UserToken[], UserLoginHistory[], UserSecurity, UserNotificationSetting, UserRole[], FoodFavorite[], FoodReview[], Cart, Order[], Payment[], CustomerWallet, Subscription[] |
| UserProfile | 218 | → User |
| UserAddress | 236 | → User |
| UserDevice | 266 | → User |
| UserSession | 287 | → User |
| UserOTP | 306 | → User |
| UserToken | 325 | → User |
| UserLoginHistory | 340 | → User |
| UserSecurity | 360 | → User |
| UserNotificationSetting | 379 | → User |

## Module 2: Role & Permission (line 399–461)

| Model | Line | Key Relations |
|-------|------|-------------|
| RbacRole | 403 | → RolePermission[], UserRole[] |
| Permission | 419 | → RolePermission[] |
| RolePermission | 433 | → RbacRole, Permission |
| UserRole | 445 | → User, RbacRole |

## Module 3: Vendor (line 462–948)

| Model | Line | Key Relations |
|-------|------|-------------|
| Vendor | 466 | → User, VendorProfile, VendorBranch[], VendorKitchen[], VendorDocument[], VendorBankAccount[], VendorOperatingHour[], VendorServiceArea[], VendorWallet, VendorRating, VendorSettings, VendorFood[], VendorFoodAssignment[], Package[], Rider[], Delivery[], Route[], Order[] |
| VendorProfile | 525 | → Vendor |
| VendorBranch | 546 | → Vendor, VendorKitchen[] |
| VendorKitchen | 575 | → Vendor, VendorBranch |
| VendorDocument | 614 | → Vendor |
| VendorBankAccount | 633 | → Vendor |
| VendorOperatingHour | 668 | → Vendor |
| VendorHoliday | 683 | → Vendor |
| VendorServiceArea | 697 | → Vendor |
| VendorZone | 715 | → Vendor |
| VendorSubscription | 730 | → Vendor |
| VendorCommission | 747 | → Vendor |
| VendorSettlement | 764 | → Vendor, VendorSettlementItem[], VendorSettlementTransaction[] |
| VendorSettlementItem | 791 | → VendorSettlement |
| VendorSettlementTransaction | 806 | → VendorSettlement |
| VendorWallet | 822 | → Vendor, VendorWalletTransaction[] |
| VendorWalletTransaction | 838 | → VendorWallet |
| VendorRating | 854 | → Vendor |
| VendorReview | 871 | → Vendor |
| VendorSettings | 900 | → Vendor |
| VendorActivityLog | 919 | → Vendor |

## Module 4: Food Catalog (line 950–1359)

| Model | Line | Key Relations |
|-------|------|-------------|
| Category | 954 | → SubCategory[], Food[] |
| SubCategory | 973 | → Category, Food[] |
| Food | 993 | → Category, SubCategory, FoodVariant[], FoodAddon[], FoodIngredient[], FoodNutrition, FoodAllergen[], FoodSchedule[], FoodPrice[], FoodDiscount[], FoodTagMapping[], FoodReview[], FoodRating, FoodFavorite[], FoodDiet[], FoodImage[], VendorFoodAssignment[], VendorFood[] |
| FoodVariant | 1062 | → Food |
| FoodAddon | 1080 | → Food, FoodAddonItem[] |
| FoodAddonItem | 1096 | → FoodAddon |
| FoodIngredient | 1111 | → Food |
| FoodNutrition | 1126 | → Food |
| FoodAllergen | 1146 | → Food |
| FoodPreparation | 1159 | → Food |
| FoodAvailability | 1174 | → Food |
| FoodSchedule | 1189 | → Food |
| FoodPrice | 1204 | → Food |
| FoodDiscount | 1221 | → Food |
| FoodTag | 1237 | → FoodTagMapping[] |
| FoodTagMapping | 1249 | → Food, FoodTag |
| FoodLabel | 1261 | → Food |
| FoodReview | 1274 | → Food, User |
| FoodRating | 1291 | → Food |
| FoodFavorite | 1308 | → User, Food |
| FoodVisibility | 1320 | → Food |
| FoodDiet | 1335 | → Food |
| FoodImage | 1347 | → Food |

## Module 5: Hidden Vendor Mapping (line 1360–1648)

| Model | Line | Key Relations |
|-------|------|-------------|
| VendorFood | 1364 | → Vendor, Food, VendorFoodStatusHistory[], VendorFoodAssignment[] |
| VendorFoodStatusHistory | 1557 | → VendorFood |
| VendorFoodAssignment | 1571 | → Food, Vendor |

## Module 6: Meal Plan & Package (line 1650–2022)

| Model | Line | Key Relations |
|-------|------|-------------|
| Package | 1654 | → Vendor, PackageDay[], PackagePrice[], PackageRule, PackageBenefit[], PackageNutrition, PackageSchedule[], PackageReview[], PackageRating, PackageCustomization, PackageAvailability, CustomMealPlan[], PackageCategory |
| PackageCategory | 1694 | → Package[] |
| PackageDay | 1709 | → Package, PackageMeal[] |
| PackageMeal | 1725 | → PackageDay, PackageMealFood[] |
| PackageMealFood | 1741 | → PackageMeal |
| PackagePrice | 1756 | → Package |
| PackageRule | 1775 | → Package |
| PackageBenefit | 1796 | → Package |
| PackageNutrition | 1811 | → Package |
| PackageSchedule | 1829 | → Package |
| PackageImage | 1845 | → Package |
| PackageTag | 1858 | → Package |
| PackageReview | 1870 | → Package |
| PackageRating | 1886 | → Package |
| PackageCustomization | 1903 | → Package |
| PackageAvailability | 1921 | → Package |
| CustomMealPlan | 1936 | → User, Package?, CustomMealDay[] |
| CustomMealDay | 1953 | → CustomMealPlan, CustomMeal[] |
| CustomMeal | 1966 | → CustomMealDay, CustomMealFood[] |
| CustomMealFood | 1980 | → CustomMeal |
| MealPreference | 1994 | → User |
| DietaryRestriction | 2010 | → User |

## Module 7: Cart & Order (line 2023–2299)

| Model | Line | Key Relations |
|-------|------|-------------|
| Cart | 2027 | → User, CartItem[], CartMeal[] |
| CartItem | 2050 | → Cart, Food |
| CartMeal | 2068 | → Cart, CartMealFood[] |
| CartMealFood | 2083 | → CartMeal |
| Order | 2097 | → User, Vendor?, OrderItem[], OrderMeal[], OrderStatusHistory[], OrderInvoice, OrderCancellation?, OrderRefund[], OrderFeedback?, Payment?, Delivery?, Subscription[] |
| OrderItem | 2143 | → Order, Food |
| OrderMeal | 2162 | → Order, OrderMealFood[] |
| OrderMealFood | 2179 | → OrderMeal |
| OrderSchedule | 2194 | → Order |
| OrderStatusHistory | 2209 | → Order |
| OrderTimeline | 2223 | → Order |
| OrderInvoice | 2236 | → Order |
| OrderCancellation | 2255 | → Order |
| OrderRefund | 2270 | → Order |
| OrderFeedback | 2286 | → Order |

## Module 8: Payment, Wallet & Settlement

| Model | Key Relations |
|-------|-------------|
| Payment | → User, Order, PaymentTransaction[], PaymentAttempt[], PaymentRefund[], PaymentAdjustment[] |
| PaymentMethod | — |
| PaymentGateway | — |
| PaymentTransaction | → Payment |
| PaymentAttempt | → Payment |
| PaymentRefund | → Payment |
| PaymentAdjustment | → Payment |
| CustomerWallet | → User, CustomerWalletTransaction[] |
| CustomerWalletTransaction | → CustomerWallet |

## Module 9: Rider, Delivery & Tracking (line 2516–3009)

| Model | Line | Key Relations |
|-------|------|-------------|
| Rider | 2520 | → Vendor?, RiderProfile?, RiderDocument[], RiderVehicle?, RiderAvailability[], RiderShift[], RiderAttendance[], RiderLocation[], RiderPerformance?, RiderRating[], RiderWallet?, Delivery[], TrackingSession[] |
| RiderProfile | 2563 | → Rider |
| RiderDocument | 2581 | → Rider |
| RiderVehicle | 2599 | → Rider |
| RiderAvailability | 2618 | → Rider |
| RiderShift | 2633 | → Rider |
| RiderAttendance | 2648 | → Rider |
| RiderLocation | 2663 | → Rider |
| RiderPerformance | 2680 | → Rider |
| RiderRating | 2697 | → Rider |
| RiderWallet | 2712 | → Rider, RiderWalletTransaction[] |
| RiderWalletTransaction | 2728 | → RiderWallet |
| Delivery | 2759 | → Order, Rider?, Vendor?, DeliveryItem[], DeliverySchedule[], DeliveryStatusHistory[], DeliveryProof?, DeliveryAttempt[], TrackingSession[] |
| DeliveryItem | 2789 | → Delivery |
| DeliverySchedule | 2804 | → Delivery |
| DeliveryStatusHistory | 2820 | → Delivery |
| DeliveryProof | 2834 | → Delivery |
| DeliveryAttempt | 2849 | → Delivery |
| TrackingSession | 2863 | → Delivery, Rider?, TrackingLocation[], TrackingEvent[], TrackingETA? |
| TrackingLocation | 2883 | → TrackingSession |
| TrackingEvent | 2898 | → TrackingSession |
| TrackingETA | 2912 | → TrackingSession |
| Route | 2926 | → Vendor?, Rider?, RouteStop[], RouteOptimization?, RouteTracking?, RouteHistory[] |
| RouteStop | 2947 | → Route |
| RouteOptimization | 2965 | → Route |
| RouteTracking | 2981 | → Route |
| RouteHistory | 2996 | → Route |

## Module 10: Notifications (line 2714–2775)

| Model | Line | Key Relations |
|-------|------|-------------|
| Notification | 2726 | → User |

## Module 11: CMS, Analytics & Settings (line 3198–3317)

| Model | Line | Key Relations |
|-------|------|-------------|
| Banner | 3202 | — |
| Slider | 3219 | — |
| Blog | 3234 | → BlogCategory? |
| BlogCategory | 3252 | → Blog[] |
| StaticPage | 3266 | — |
| SystemSetting | 3280 | — |
| FeatureFlag | 3291 | — |
| ActivityLog | 3302 | → User? |

## Module 12: Subscription (line 3318–3343)

| Model | Line | Key Relations |
|-------|------|-------------|
| Subscription | 3322 | → User, Order? |

## Module 13: Coupon (line 2910–2935)

| Model | Line | Key Relations |
|-------|------|-------------|
| Coupon | 2916 | → CouponUsage[] |
| CouponUsage | 2933 | → Coupon |

## Module 14: Inventory & Supply Chain (line 3400–3500)

| Model | Line | Key Relations |
|-------|------|-------------|
| Inventory | 3404 | → Vendor, InventoryTransaction[], WasteLog[] |
| InventoryTransaction | 3424 | → Inventory |
| Supplier | 3440 | → Vendor, Purchase[] |
| Purchase | 3458 | → Supplier, Vendor, PurchaseItem[] |
| PurchaseItem | 3479 | → Purchase |
| WasteLog | 3494 | → Inventory |

## How to Add a New Model

1. Find the right module section in `schema.prisma`
2. Add model definition following existing patterns
3. Use `String @id @default(uuid())` for IDs
4. Add `createdAt` and `updatedAt` timestamps
5. Add `deletedAt DateTime?` if soft-delete needed
6. Add `@@map("table_name")` for snake_case table names
7. Run `npx prisma migrate dev --name your_migration_name`
8. Run `npx prisma generate`
