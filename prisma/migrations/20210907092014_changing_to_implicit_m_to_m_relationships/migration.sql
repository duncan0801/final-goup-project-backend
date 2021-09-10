/*
  Warnings:

  - You are about to drop the `CounsellorOnService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CounsellorOnService" DROP CONSTRAINT "CounsellorOnService_counsellor_ID_fkey";

-- DropForeignKey
ALTER TABLE "CounsellorOnService" DROP CONSTRAINT "CounsellorOnService_service_ID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_counsellor_ID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_ID_fkey";

-- DropTable
DROP TABLE "CounsellorOnService";

-- CreateTable
CREATE TABLE "_CounsellorToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CounsellorToService_AB_unique" ON "_CounsellorToService"("A", "B");

-- CreateIndex
CREATE INDEX "_CounsellorToService_B_index" ON "_CounsellorToService"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("user_ID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("counsellor_ID") REFERENCES "Counsellor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CounsellorToService" ADD FOREIGN KEY ("A") REFERENCES "Counsellor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CounsellorToService" ADD FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
