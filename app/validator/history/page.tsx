import { auth } from "@/auth";

import { getUserByName } from "@/app/lib/actions/userActions";
import {
  getAllConfirmedSurat,
  getAllValidationSuratByStageTitle,
} from "@/app/lib/actions/surat/suratReadActions";
import {
  getValidationStageByValidatorId,
  countAllValidationStage,
} from "@/app/lib/actions/validationStageActions";

import {
  ValidatorHistoryTableColumns,
  ValidatorHistoryTableColumnHeader,
} from "@/components/validator/history/columns";
import { DataTable } from "@/components/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Admin - Riwayat",
};
const ValidatorHistoryPage = async () => {
  const session = await auth();
  const validator = await getUserByName(session?.user?.name);
  const validationStage = await getValidationStageByValidatorId(validator!.id);
  const validationStageCount = await countAllValidationStage();
  let data;
  if (validationStageCount > validator!.validationStage!.title) {
    data = await getAllValidationSuratByStageTitle(validationStage!.title + 1);
  } else {
    data = await getAllConfirmedSurat();
  }
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>

        <div className="text-4xl font-semibold mb-10">Riwayat Surat</div>
        <div className="container">
          <DataTable
            columns={ValidatorHistoryTableColumns}
            columnHeader={ValidatorHistoryTableColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default ValidatorHistoryPage;
