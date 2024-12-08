import { getAllConfirmedSurat } from "@/app/lib/actions";
import { AdminHistoryColumns } from "@/components/admin/dashboard/history/columns";
import { AdminHistoryDataTable } from "@/components/admin/dashboard/history/data-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Admin - Riwayat",
};
const AdminHistoryPage = async () => {
  const data = await getAllConfirmedSurat();
  return (
    <div className="flex flex-col justify-between text-neutral-700">
      <div className="flex flex-col gap-3">
        <Link href="/admin">
          <Button variant={"ghost"} className="w-fit">
            <ChevronLeft />
            Kembali
          </Button>
        </Link>
        <div className="text-4xl font-semibold mb-10">Riwayat Surat</div>
        <div className="container">
          <AdminHistoryDataTable columns={AdminHistoryColumns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminHistoryPage;
