import { SuratModel } from "@/app/lib/models";
import Link from "next/link";

interface HistoryTableFormAdminInterface {
  surat: SuratModel;
}
const HistoryTableFormAdmin = ({ surat }: HistoryTableFormAdminInterface) => {
  return (
    <tr
      key={surat.id}
      className="odd:bg-white even:bg-gray-50  border-b border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {surat.subject}
      </th>
      <td className="px-6 py-4">{surat.receiver}</td>
      <td className="px-6 py-4">
        <Link
          href={`/admin/history/viewer/${surat.id}`}
          className="text-blue-500 px-2 py-1 rounded-lg"
        >
          tampilkan
        </Link>
      </td>
      <td className="px-6 py-4">{surat.createdAt.toString().slice(0, 25)}</td>
    </tr>
  );
};

export default HistoryTableFormAdmin;
