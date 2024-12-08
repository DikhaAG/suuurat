import { Surat } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface RequestedModalAdminInterface {
  surat: Surat;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
const RequestedModalAdmin = ({
  surat,
  isModalOpen,
  setIsModalOpen,
}: RequestedModalAdminInterface) => {
  return (
    <div
      className={`${isModalOpen ? "flex" : "hidden"} relative z-10`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900 my-2"
                    id="modal-title"
                  >
                    Verifikasi Surat
                  </h3>
                  <div className="flex flex-col gap-5 my-5">
                    <div className="grid grid-cols-2">
                      <div className="text-start">Subjek</div>
                      <div className="text-start">{surat.subject}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-start">Pembuat</div>
                      <div className="text-start">{surat.authorId}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-start">Penerima</div>
                      <div className="text-start">{surat.receiver}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-start">Tanggal dibuat</div>
                      <div className="text-start">
                        {surat.createdAt.toString().slice(0, 25)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
              >
                Verifikasi
              </button>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedModalAdmin;
