import { getRequestedSuratByAuthorName } from "@/app/lib/actions/surat/suratReadActions";
import { auth } from "@/auth";
import { DataTable } from "@/components/data-table";
import {
  UserRequestedTableColumns,
  UserRequestedTableColumnHeader,
} from "@/components/user/requested/columns";

export const metadata = {
  title: "Surat - Menunggu Validasi",
};
const UserRequestedPage = async () => {
  const session = await auth();
  const surat = await getRequestedSuratByAuthorName(session!.user!.name!);

  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <div className="text-4xl font-semibold mb-10">Menunggu Persetujuan</div>
        <div className="h-full">
          <DataTable
            data={surat}
            columns={UserRequestedTableColumns}
            columnHeader={UserRequestedTableColumnHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRequestedPage;
