/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Surat` table. All the data in the column will be lost.
  - Added the required column `receiver` to the `Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_receiverId_fkey";

-- AlterTable
ALTER TABLE "Surat" DROP COLUMN "receiverId",
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;
