-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Counsellor" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "yearsExpirience" INTEGER;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "counsellor_ID" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounsellorOnLanguage" (
    "id" SERIAL NOT NULL,
    "language_ID" INTEGER NOT NULL,
    "counsellor_ID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CounsellorOnLanguage" ADD FOREIGN KEY ("counsellor_ID") REFERENCES "Counsellor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounsellorOnLanguage" ADD FOREIGN KEY ("language_ID") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
