/*
  Warnings:

  - Added the required column `conversation_ID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_counsellor_ID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_ID_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversation_ID" INTEGER NOT NULL,
ALTER COLUMN "user_ID" DROP NOT NULL,
ALTER COLUMN "counsellor_ID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("user_ID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("counsellor_ID") REFERENCES "Counsellor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("conversation_ID") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
