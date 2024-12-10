/*
  Warnings:

  - Changed the type of `title` on the `ValidationStage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ValidationStage" DROP COLUMN "title",
ADD COLUMN     "title" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ValidationStage_title_key" ON "ValidationStage"("title");
