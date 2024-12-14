
// import { deleteSuratById } from "@/app/lib/actions";
// import { redirect } from "next/navigation";
// import { useState } from "react";

// interface RequestedTableBatalInterface {
//   suratId: string;
// }
// const RequestedTableBatal = ({ suratId }: RequestedTableBatalInterface) => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const deleteSurat = async () => {
//     const res = await deleteSuratById(suratId);
//     if (res || res === undefined) {
//       redirect("/user/requested");
//     }
//   };
//   return (
//     <div className="flex flex-row gap-5">
//       <button
//         onClick={() => setIsModalOpen(!isModalOpen)}
//         className="bg-red-500 px-3 py-2 text-white rounded-md"
//       >
//         batal
//       </button>
//       <div
//         className={`${isModalOpen ? "flex" : "hidden"} relative z-10`}
//         aria-labelledby="modal-title"
//         role="dialog"
//         aria-modal="true"
//       >
//         <div
//           className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//           aria-hidden="true"
//         ></div>

//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//               <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                     <h3
//                       className="text-base font-semibold text-gray-900 my-2"
//                       id="modal-title"
//                     >
//                       Apakah anda yakin?
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                 <button
//                   onClick={deleteSurat}
//                   type="button"
//                   className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
//                 >
//                   Batalkan
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(!isModalOpen)}
//                   type="button"
//                   className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
//                 >
//                   Tutup
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestedTableBatal;

import { Dispatch, SetStateAction } from "react";
import RequestedDeleteButton from "./RequestedDeleteButton";

interface RequestedTableBatalInterface {
  suratId: string;
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
const RequestedTableBatal = ({ suratId, isModalOpen, setIsModalOpen }: RequestedTableBatalInterface) => {
  return (
    <div className="flex flex-row gap-5">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-red-500 px-3 py-2 text-white rounded-md"
      >
        batal
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
                      Apakah anda yakin?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <RequestedDeleteButton suratId={suratId} setIsModalOpen={setIsModalOpen} />
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedTableBatal;