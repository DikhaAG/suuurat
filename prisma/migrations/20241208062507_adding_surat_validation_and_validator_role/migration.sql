-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'VALIDATOR');

-- AlterTable
ALTER TABLE "Surat" ADD COLUMN     "validationStageId" TEXT,
ADD COLUMN     "validationStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "ValidationStage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,

    CONSTRAINT "ValidationStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratNote" (
    "id" SERIAL NOT NULL,
    "suratId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "SuratNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationStage_title_key" ON "ValidationStage"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ValidationStage_validatorId_key" ON "ValidationStage"("validatorId");

-- AddForeignKey
ALTER TABLE "ValidationStage" ADD CONSTRAINT "ValidationStage_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_validationStageId_fkey" FOREIGN KEY ("validationStageId") REFERENCES "ValidationStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratNote" ADD CONSTRAINT "SuratNote_suratId_fkey" FOREIGN KEY ("suratId") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratNote" ADD CONSTRAINT "SuratNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
