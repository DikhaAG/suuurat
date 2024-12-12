/*
  Warnings:

  - You are about to drop the column `noted` on the `Surat` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Surat` table. All the data in the column will be lost.
  - Made the column `validationStageId` on table `Surat` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SuratHistoryAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'VALIDATE');

-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_validationStageId_fkey";

-- AlterTable
ALTER TABLE "Surat" DROP COLUMN "noted",
DROP COLUMN "status",
ALTER COLUMN "validationStageId" SET NOT NULL;

-- CreateTable
CREATE TABLE "SuratHistory" (
    "id" TEXT NOT NULL,
    "action" "SuratHistoryAction" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SuratHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_validationStageId_fkey" FOREIGN KEY ("validationStageId") REFERENCES "ValidationStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratHistory" ADD CONSTRAINT "SuratHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
