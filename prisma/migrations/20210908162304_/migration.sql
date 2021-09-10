/*
  Warnings:

  - A unique constraint covering the columns `[date,time]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment.date_time_unique" ON "Appointment"("date", "time");
