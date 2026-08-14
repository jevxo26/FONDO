-- AddForeignKey
ALTER TABLE "package_reviews" ADD CONSTRAINT "package_reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
