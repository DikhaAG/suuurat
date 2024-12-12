-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_authorId_fkey";

-- AlterTable
ALTER TABLE "ValidationStage" ALTER COLUMN "validatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
