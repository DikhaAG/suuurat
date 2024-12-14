import { getAllAdmin } from "@/app/lib/actions/userAdminActions";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { DataTable } from "@/components/admin/data/admin/data-table";
import {
  DataAdminColumnHeader,
  DataAdminColumns,
} from "@/components/admin/data/admin/columns";
import DataAdminAdd from "@/components/admin/data/admin/add-dialog";
import { auth } from "@/auth";

export const metadata = {
  title: "Admin - Data Admin",
};
const DataAdminPage = async () => {
  const session = await auth();
  const data = await getAllAdmin(session!.user!.name!);
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>

        <div className="text-4xl font-semibold mb-10">Data Admin</div>
        <div className="container">
          <DataAdminAdd />
          <DataTable
            columns={DataAdminColumns}
            columnHeader={DataAdminColumnHeader}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default DataAdminPage;
