import { getAllConfirmedSurat } from "@/app/lib/actions";
import {
  AdminHistoryColumns,
  AdminHistoryColumnHeader,
} from "@/components/admin/history/columns";
import { DataTable } from "@/components/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Admin - Riwayat",
};
const AdminHistoryPage = async () => {
  const data = await getAllConfirmedSurat();
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
            columns={AdminHistoryColumns}
            columnHeader={AdminHistoryColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default AdminHistoryPage;
