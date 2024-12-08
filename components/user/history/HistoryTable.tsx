"use client";
import { getConfirmedSuratByAuthorId } from "@/app/lib/actions";
import NoResultFound from "../../utils/NoResultFound";
import { useEffect, useState } from "react";
import LoadingResult from "@/components/utils/LoadingResult";
import HistoryTableForm from "./HistoryTableForm";
import { SuratModel, UserModel } from "@/app/lib/models";

interface HistoryTableInterface {
  user: UserModel | null;
}
const HistoryTable = ({ user }: HistoryTableInterface) => {
  const [surat, setSurat] = useState<Array<SuratModel> | undefined>();
  const getSurat = async () => {
    const res = await getConfirmedSuratByAuthorId(user?.id);
    setSurat(res);
  };
  useEffect(() => {
    getSurat();
  }, [surat]);
  return (
    <div className="h-full">
      {surat === undefined ? (
        <LoadingResult />
      ) : surat.length > 0 ? (
        <>
          <div className="">
            <div className="relative overflow-x-auto sm:overflow-x-visible shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-blue-500">
                <thead className="text-xs uppercase bg-blue-500 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Subjek
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
                  {surat.map((s) => (
                    <HistoryTableForm key={s.id} surat={s} />
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

export default HistoryTable;
