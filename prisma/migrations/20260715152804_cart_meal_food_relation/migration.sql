-- AddForeignKey
ALTER TABLE "cart_meal_foods" ADD CONSTRAINT "cart_meal_foods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
