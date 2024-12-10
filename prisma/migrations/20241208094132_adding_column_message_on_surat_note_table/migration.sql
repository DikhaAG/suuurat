/*
  Warnings:

  - Added the required column `messate` to the `SuratNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuratNote" ADD COLUMN     "messate" TEXT NOT NULL;
