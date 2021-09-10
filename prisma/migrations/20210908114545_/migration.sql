/*
  Warnings:

  - A unique constraint covering the columns `[user_ID]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_user_ID_unique" ON "Conversation"("user_ID");
