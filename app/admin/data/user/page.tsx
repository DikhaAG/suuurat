import { getAllRequestedSurat } from "@/app/lib/actions";
import {
  AdminRequestedColumns,
  AdminRequestedColumnHeader,
} from "@/components/admin/requested/columns";
import { DataTable } from "@/components/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Admin - Data User",
};
const DataUserPage = async () => {
  const data = await getAllRequestedSurat();
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>

        <div className="text-4xl font-semibold mb-10">Data User</div>
        <div className="container">
          <DataTable
            columns={AdminRequestedColumns}
            columnHeader={AdminRequestedColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default DataUserPage;
