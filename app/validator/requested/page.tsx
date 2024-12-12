import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions/userActions";
import { getValidationStageByValidatorId } from "@/app/lib/actions/validationStageActions";
import { getAllValidationSuratByStageId } from "@/app/lib/actions/surat/suratReadActions";

import {
  ValidatorRequestedTableColumns,
  ValidatorRequestedTableColumnHeader,
} from "@/components/validator/requested/columns";
import { DataTable } from "@/components/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Validator - Menunggu Validasi",
};
const ValidatorRequestedPage = async () => {
  const session = await auth();
  const validator = await getUserByName(session?.user?.name);
  const validationStage = await getValidationStageByValidatorId(validator!.id);
  const data = await getAllValidationSuratByStageId(validationStage!.id);
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>

        <div className="text-4xl font-semibold mb-10">Surat Masuk</div>
        <div className="container">
          <DataTable
            columns={ValidatorRequestedTableColumns}
            columnHeader={ValidatorRequestedTableColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default ValidatorRequestedPage;
