import { validateSuratById } from "@/app/lib/actions";
import { Dispatch, SetStateAction } from "react";

const RequestedConfirmButton = ({
  suratId,
  note,
  setIsModalOpen,
}: {
  suratId: string;
  note: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => {
        validateSuratById(suratId, note).then(
          (res) => res && setIsModalOpen(false),
        );
      }}
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
    >
      Verifikasi
    </button>
  );
};

export default RequestedConfirmButton;
