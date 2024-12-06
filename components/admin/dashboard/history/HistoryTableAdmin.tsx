"use client";
import Link from "next/link";

import { getAllConfirmedSurat } from "@/app/lib/actions";
import NoResultFound from "@/components/utils/NoResultFound";
import { useEffect, useState } from "react";
import LoadingResult from "@/components/utils/LoadingResult";
import { ConfirmedSuratModel } from "@/app/lib/models";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HistoryTableAdmin = () => {
  const [confirmedSurat, setConfirmedSurat] = useState<
    Array<ConfirmedSuratModel> | undefined
  >();
  const getSurat = async () => {
    const res = await getAllConfirmedSurat();
    setConfirmedSurat(res);
  };
  useEffect(() => {
    getSurat();
  }, []);
  return (
    <>
      {confirmedSurat === undefined ? (
        <LoadingResult />
      ) : confirmedSurat.length > 0 ? (
        <Table>
          <TableCaption>List surat yang terkonfirmasi</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Subjek</TableHead>
              <TableHead>Pembuat</TableHead>
              <TableHead>Penerima</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="text-right">File</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {confirmedSurat.map((surat) => (
              <TableRow key={surat.id}>
                <TableCell className="font-medium">{surat.subject}</TableCell>
                <TableCell>{surat.author.name}</TableCell>
                <TableCell>{surat.receiver}</TableCell>

                <TableCell>{surat.createdAt.toString().slice(0, 25)}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/history/viewer/${surat.id}`}
                    className="text-blue-500"
                  >
                    tampilkan
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoResultFound />
      )}
      ;
    </>
  );
};

export default HistoryTableAdmin;
