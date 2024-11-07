"use client";
import { getSuratById } from "@/app/lib/actions";
import FileViewerReactPdf from "@/components/utils/FileViewerReactPdf";
import Link from "next/link";
import { useParams } from "next/navigation";

const UserRequestedViewerPage = async () => {
  const { suratId } = useParams<{ suratId: string }>();
  const surat = await getSuratById(suratId);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row w-full">
        <Link
          href={"/user/history"}
          className="bg-blue-500 rounded-lg px-3 py-2 text-white"
        >
          kembali
        </Link>
      </div>
      <FileViewerReactPdf file={surat?.file as string} />
    </div>
  );
};

export default UserRequestedViewerPage;
