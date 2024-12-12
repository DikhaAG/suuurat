-- DropForeignKey
ALTER TABLE "ValidationStage" DROP CONSTRAINT "ValidationStage_validatorId_fkey";

-- AddForeignKey
ALTER TABLE "ValidationStage" ADD CONSTRAINT "ValidationStage_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
