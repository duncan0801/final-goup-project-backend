/*
  Warnings:

  - You are about to drop the column `yearsExpirience` on the `Counsellor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Counsellor" DROP COLUMN "yearsExpirience",
ADD COLUMN     "yearsExperience" INTEGER;
