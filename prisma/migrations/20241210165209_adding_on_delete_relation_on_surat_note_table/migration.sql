-- DropForeignKey
ALTER TABLE "SuratNote" DROP CONSTRAINT "SuratNote_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SuratNote" DROP CONSTRAINT "SuratNote_suratId_fkey";

-- AddForeignKey
ALTER TABLE "SuratNote" ADD CONSTRAINT "SuratNote_suratId_fkey" FOREIGN KEY ("suratId") REFERENCES "Surat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratNote" ADD CONSTRAINT "SuratNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
