/*
  Warnings:

  - Added the required column `suratId` to the `SuratHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuratHistory" ADD COLUMN     "suratId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SuratHistory" ADD CONSTRAINT "SuratHistory_suratId_fkey" FOREIGN KEY ("suratId") REFERENCES "Surat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
