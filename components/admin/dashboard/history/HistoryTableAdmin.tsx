"use client";
import { getAllConfirmedSurat } from "@/app/lib/actions";
import NoResultFound from "@/components/utils/NoResultFound";
import { useEffect, useState } from "react";
import LoadingResult from "@/components/utils/LoadingResult";
import HistoryTableFormAdmin from "./HistoryTableFormAdmin";
import { SuratModel } from "@/app/lib/models";

const HistoryTableAdmin = () => {
  const [confirmedSurat, setConfirmedSurat] = useState<
    Array<SuratModel> | undefined
  >();
  const getSurat = async () => {
    const res = await getAllConfirmedSurat();
    setConfirmedSurat(res);
  };
  useEffect(() => {
    getSurat();
  }, []);
  return (
    <div className="h-full">
      {confirmedSurat === undefined ? (
        <LoadingResult />
      ) : confirmedSurat.length > 0 ? (
        <>
          <div className="">
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-blue-500">
                <thead className="text-xs uppercase bg-blue-500 text-white">
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
                  {confirmedSurat.map((s) => (
                    <HistoryTableFormAdmin key={s.id} surat={s} />
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

export default HistoryTableAdmin;
