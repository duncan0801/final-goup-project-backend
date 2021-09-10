/*
  Warnings:

  - A unique constraint covering the columns `[user_ID]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_ID]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment.user_ID_unique" ON "Appointment"("user_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Message.user_ID_unique" ON "Message"("user_ID");
