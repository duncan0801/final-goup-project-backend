-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "user_ID" INTEGER NOT NULL,
    "counsellor_ID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD FOREIGN KEY ("user_ID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD FOREIGN KEY ("counsellor_ID") REFERENCES "Counsellor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
