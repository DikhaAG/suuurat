"use client";
import { deleteSuratById } from "@/app/lib/actions";
import { Dispatch, SetStateAction } from "react";

const RequestedDeleteButton = ({
  suratId,
  setIsModalOpen,
}: {
  suratId: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <form
      action={() => {
        deleteSuratById(suratId).then((res) => res && setIsModalOpen(false));
      }}
    >
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md disabled:opacity-50 disabled:cursor-progress bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
      >
        Batalkan
      </button>
    </form>
  );
};
export default RequestedDeleteButton;
