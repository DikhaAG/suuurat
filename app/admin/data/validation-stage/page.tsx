import { getAllValidationStage } from "@/app/lib/actions/validationStageActions";
import {
  DataValidationStageColumns,
  DataValidationStageColumnHeader,
} from "@/components/admin/data/validationStage/columns";
import { DataTable } from "@/components/data-table";
import DataValidationStageAdd from "@/components/admin/data/validationStage/add-dialog";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import DataValidationStageFixedDialog from "@/components/admin/data/validationStage/fixed-dialog";
import { Separator } from "@/components/ui/separator";
import { getSystemSettingByName } from "@/app/lib/actions/systemActions";

export const metadata = {
  title: "Admin - Tahap Validasi",
};
const DataValidationStagePage = async () => {
  const data = await getAllValidationStage();
  const validationStageFixed = await getSystemSettingByName(
    "validationStageFixed",
  );
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>

        <div className="text-4xl font-semibold mb-10">Tahap Validasi</div>
        <div className="container">
          <div className="container flex flex-col w-fit">
            {!validationStageFixed?.status && (
              <>
                <DataValidationStageFixedDialog />
                <Separator className="my-2" />
                <DataValidationStageAdd />
              </>
            )}
          </div>
          <DataTable
            columns={DataValidationStageColumns}
            columnHeader={DataValidationStageColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default DataValidationStagePage;
