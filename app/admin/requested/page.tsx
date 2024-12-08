import RequestedTableAdmin from "@/components/admin/requested/RequestedTableAdmin";
import Link from "next/link";

export const metadata = {
  title: "Admin - Riwayat",
};
const AdminRequestedPage = () => {
  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <Link
          href="/admin"
          className="w-fit text-white font-bold px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 rounded-lg "
        >
          {"<"}
        </Link>
        <div className="text-4xl font-semibold mb-10">Menunggu Verifikasi</div>
        <div className="h-full">
          <RequestedTableAdmin />
        </div>
      </div>
    </div>
  );
};

export default AdminRequestedPage;
