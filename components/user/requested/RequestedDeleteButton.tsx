import { deleteSuratById } from "@/app/lib/actions";
import { redirect, useRouter } from "next/navigation";

const RequestedDeleteButton = ({ suratId }: { suratId: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        deleteSuratById(suratId).then(
          (res) => res && router.push("/admin/requested")
        );
      }}
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
    >
      Batalkan
    </button>
  );
};
export default RequestedDeleteButton;
