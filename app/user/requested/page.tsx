import { getRequestedSuratByAuthorName } from "@/app/lib/actions/surat/suratReadActions";
import { auth } from "@/auth";
import { DataTable } from "@/components/data-table";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  UserHistoryTableColumns,
  UserHistoryTableColumnHeader,
} from "@/components/user/history/columns";

export const metadata = {
  title: "Surat - Menunggu validasi",
};
const UserRequestedPage = async () => {
  const session = await auth();
  const surat = await getRequestedSuratByAuthorName(session!.user!.name!);

  return (
    <div className="flex flex-col gap-3">
      <Button asChild variant={"ghost"} className="w-fit">
        <Link href="/user">
          <ChevronLeft />
          Kembali
        </Link>
      </Button>

      <div className="text-4xl font-semibold mb-10">Menunggu Validasi</div>
      <div className="container">
        <DataTable
          columns={UserHistoryTableColumns}
          columnHeader={UserHistoryTableColumnHeader}
          data={surat}
        />
      </div>
    </div>
  );
};

export default UserRequestedPage;
