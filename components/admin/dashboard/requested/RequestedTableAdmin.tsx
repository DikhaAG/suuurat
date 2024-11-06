"use client";
import {
    getAllRequestedSurat,
} from "@/app/lib/actions";
import NoResultFound from "@/components/utils/NoResultFound";
import { useEffect, useState } from "react";
import LoadingResult from "@/components/utils/LoadingResult";
import RequestedTableFormAdmin from "./RequestedTableFormAdmin";
import { SuratModel } from "@/app/lib/models";

const RequestedTableAdmin = () => {
  const [requestedSurat, setRequestedSurat] = useState<Array<SuratModel> | undefined>();
  const getSurat = async () => {
    const res = await getAllRequestedSurat();
    setRequestedSurat(res);
  };
  useEffect(() => {
    getSurat();
  }, []);
  return (
    <div className="h-full">
      {requestedSurat === undefined ? (
        <LoadingResult />
      ) : requestedSurat.length > 0 ? (
        <>
          <div className="">
            <div className="relative overflow-x-auto sm:overflow-x-visible shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-blue-500 rounded-lg">
                <thead className="text-xs uppercase bg-blue-500 text-white rounded-lg">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Subjek
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pembuat
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Penerima
                    </th>
                    <th scope="col" className="px-6 py-3">
                      File
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dibuat
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {requestedSurat.map((s) => (
                    <RequestedTableFormAdmin key={s.id} surat={s} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoResultFound />
        </>
      )}
    </div>
  );
};

export default RequestedTableAdmin;
