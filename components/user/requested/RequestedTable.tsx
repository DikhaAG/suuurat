"use client";
import NoResultFound from "../../utils/NoResultFound";
import RequestedTableForm from "./RequestedTableForm";
import LoadingResult from "@/components/utils/LoadingResult";
import { SuratModel, UserModel } from "@/app/lib/models";
import { useEffect, useState } from "react";
import { getRequestedSuratByAuthorId } from "@/app/lib/actions";

interface RequestedTableInterface {
  user: UserModel | null;
}
const RequestedTable = ({ user }: RequestedTableInterface) => {
  const [surat, setSurat] = useState<Array<SuratModel> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const getSurat = async () => {
    const res = await getRequestedSuratByAuthorId(user?.id);
    setSurat(res);
  };
  useEffect(() => {
    getSurat();
  }, [isModalOpen]);
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
                    <RequestedTableForm
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      key={s.id}
                      surat={s}
                    />
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

export default RequestedTable;
