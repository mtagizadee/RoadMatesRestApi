-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
