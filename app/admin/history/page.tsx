import HistoryTableAdmin from "@/components/admin/dashboard/history/HistoryTableAdmin";
import Link from "next/link";

export const metadata = {
  title: "Admin - Riwayat",
};
const AdminHistoryPage = async () => {
  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <Link
          href="/admin"
          className="w-fit text-white font-bold px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 rounded-lg "
        >
          {"<"}
        </Link>
        <div className="text-4xl font-semibold mb-10">Riwayat Surat</div>
        <div className="h-full">
          <HistoryTableAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminHistoryPage;
