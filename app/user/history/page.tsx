import { getConfirmedSuratByAuthorName } from "@/app/lib/actions/surat/suratReadActions";
import { auth } from "@/auth";
import { DataTable } from "@/components/data-table";
import {
  UserHistoryTableColumns,
  UserHistoryTableColumnHeader,
} from "@/components/user/history/columns";

export const metadata = {
  title: "Surat - Riwayat",
};
const UserHistoryPage = async () => {
  const session = await auth();
  const surat = await getConfirmedSuratByAuthorName(session!.user!.name!);

  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <div className="text-4xl font-semibold mb-10">Riwayat Surat</div>
        <div className="h-full">
          <DataTable
            data={surat}
            columnHeader={UserHistoryTableColumnHeader}
            columns={UserHistoryTableColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
