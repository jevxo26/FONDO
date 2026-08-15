/*
  Warnings:

  - You are about to drop the `conversation_participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conversations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_deletes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_reactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_reads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referrals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rider_notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `support_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `support_replies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `support_tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversation_participants" DROP CONSTRAINT "conversation_participants_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "message_attachments" DROP CONSTRAINT "message_attachments_messageId_fkey";

-- DropForeignKey
ALTER TABLE "message_deletes" DROP CONSTRAINT "message_deletes_messageId_fkey";

-- DropForeignKey
ALTER TABLE "message_reactions" DROP CONSTRAINT "message_reactions_messageId_fkey";

-- DropForeignKey
ALTER TABLE "message_reads" DROP CONSTRAINT "message_reads_messageId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "referrals" DROP CONSTRAINT "referrals_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "rider_notifications" DROP CONSTRAINT "rider_notifications_riderId_fkey";

-- DropForeignKey
ALTER TABLE "support_replies" DROP CONSTRAINT "support_replies_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "support_replies" DROP CONSTRAINT "support_replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "support_tickets" DROP CONSTRAINT "support_tickets_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "support_tickets" DROP CONSTRAINT "support_tickets_customerId_fkey";

-- DropForeignKey
ALTER TABLE "vendor_notifications" DROP CONSTRAINT "vendor_notifications_vendorId_fkey";

-- DropTable
DROP TABLE "conversation_participants";

-- DropTable
DROP TABLE "conversations";

-- DropTable
DROP TABLE "message_attachments";

-- DropTable
DROP TABLE "message_deletes";

-- DropTable
DROP TABLE "message_reactions";

-- DropTable
DROP TABLE "message_reads";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "referrals";

-- DropTable
DROP TABLE "rider_notifications";

-- DropTable
DROP TABLE "support_categories";

-- DropTable
DROP TABLE "support_replies";

-- DropTable
DROP TABLE "support_tickets";

-- DropTable
DROP TABLE "vendor_notifications";

-- DropEnum
DROP TYPE "ConversationType";

-- DropEnum
DROP TYPE "MessageType";

-- DropEnum
DROP TYPE "TicketPriority";

-- DropEnum
DROP TYPE "TicketStatus";

-- CreateIndex
CREATE INDEX "packages_status_deletedAt_idx" ON "packages"("status", "deletedAt");
