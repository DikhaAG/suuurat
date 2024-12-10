/*
  Warnings:

  - You are about to drop the column `messate` on the `SuratNote` table. All the data in the column will be lost.
  - Added the required column `message` to the `SuratNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuratNote" DROP COLUMN "messate",
ADD COLUMN     "message" TEXT NOT NULL;
