/*
  Warnings:

  - You are about to drop the `CounsellorOnLanguage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CounsellorOnLanguage" DROP CONSTRAINT "CounsellorOnLanguage_counsellor_ID_fkey";

-- DropForeignKey
ALTER TABLE "CounsellorOnLanguage" DROP CONSTRAINT "CounsellorOnLanguage_language_ID_fkey";

-- DropTable
DROP TABLE "CounsellorOnLanguage";

-- CreateTable
CREATE TABLE "_CounsellorToLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CounsellorToLanguage_AB_unique" ON "_CounsellorToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_CounsellorToLanguage_B_index" ON "_CounsellorToLanguage"("B");

-- AddForeignKey
ALTER TABLE "_CounsellorToLanguage" ADD FOREIGN KEY ("A") REFERENCES "Counsellor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CounsellorToLanguage" ADD FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
