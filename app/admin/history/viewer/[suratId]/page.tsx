"use client";
import { getSuratById } from "@/app/lib/actions";
import { SuratModel } from "@/app/lib/models";
import FileViewerReactPdf from "@/components/utils/FileViewerReactPdf";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// const AdminHistoryViewerPage = async () => {
//   const { suratId } = useParams<{ suratId: string }>();
//   const surat = await getSuratById(suratId);
//   return (
//     <div className="flex flex-col gap-3">
//       <div className="flex flex-row w-full">
//         <Link
//           href={"/admin/history"}
//           className="bg-blue-500 rounded-lg px-3 py-2 text-white"
//         >
//           kembali
//         </Link>
//       </div>
//       <FileViewerReactPdf file={surat?.file as string} />
//     </div>
//   );
// };

// export default AdminHistoryViewerPage;

const AdminHistoryViewerPage = () => {
  const { suratId } = useParams<{ suratId: string }>();
  const [surat, setSurat] = useState<SuratModel | null>();
  useEffect(() => {
    getSuratById(suratId).then((res) => setSurat(res));
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row w-full">
        <Link href="/admin/history">
          <Button variant={"ghost"} className="w-fit">
            <ChevronLeft />
            Kembali
          </Button>
        </Link>
      </div>
      <FileViewerReactPdf file={surat?.file as string} />
    </div>
  );
};

export default AdminHistoryViewerPage;
