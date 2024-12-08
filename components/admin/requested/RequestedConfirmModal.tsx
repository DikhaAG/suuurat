"use client";
import { SuratModel } from "@/app/lib/models";
import { Dispatch, SetStateAction, useState } from "react";
import RequestedConfirmButton from "./RequestedConfirmButton";

interface RequestedConfirmButtonInterface {
  surat: SuratModel;
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
const RequestedConfirmModal = ({ surat, isModalOpen, setIsModalOpen }: RequestedConfirmButtonInterface) => {
  const [checkBoxNote, setCheckBoxNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  return (
    <div className="flex flex-row gap-5">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-green-500 px-3 py-2 text-white rounded-md"
      >
        verifikasi
      </button>
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
                    <div className="flex flex-col gap-5 my-8">
                      <div className="grid grid-cols-2">
                        <div className="text-start">Subjek</div>
                        <div className="text-start">{surat.subject}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-start">Pembuat</div>
                        <div className="text-start">{surat.author.name}</div>
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
                    <div className="flex flex-col gap-3">
                      <div className="text-start">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checkBoxNote}
                            onChange={() => {
                              setCheckBoxNote(!checkBoxNote);
                              setNote("");
                            }}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ms-3 text-sm font-medium">
                            Tambah catatan {note}
                          </span>
                        </label>
                      </div>
                      <div className={`${checkBoxNote ? "visible" : "hidden"}`}>
                        <input
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          type={"text"}
                          name={"note"}
                          id={"note"}
                          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <RequestedConfirmButton setIsModalOpen={setIsModalOpen} suratId={surat.id} note={note} />
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedConfirmModal;
