-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "tagid" TEXT NOT NULL DEFAULT '0';

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_tagid_fkey" FOREIGN KEY ("tagid") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
