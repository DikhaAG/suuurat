import { getAllValidator } from "@/app/lib/actions/userValidatorActions";
import { getSystemSettingByName } from "@/app/lib/actions/systemActions";
import {
  DataValidatorColumns,
  DataValidatorColumnHeader,
} from "@/components/admin/data/validator/columns";
import { DataTable } from "@/components/admin/data/validator/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import DataValidatorAdd from "@/components/admin/data/validator/add-dialog";

export const metadata = {
  title: "Admin - Data Validator",
};
const DataValidatorPage = async () => {
  const data = await getAllValidator();
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

        <div className="text-4xl font-semibold mb-10">Data Validator</div>
        <div className="container">
          {!validationStageFixed?.status && <DataValidatorAdd />}
          <DataTable
            columns={DataValidatorColumns}
            columnHeader={DataValidatorColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default DataValidatorPage;
