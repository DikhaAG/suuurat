/*
  Warnings:

  - Added the required column `updatedAt` to the `SuratNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ValidationStage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuratNote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ValidationStage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "systemSettings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "systemSettings_pkey" PRIMARY KEY ("id")
);
