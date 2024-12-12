"use client";
import { getSuratById } from "@/app/lib/actions/surat/suratReadActions";
import { Surat } from "@prisma/client";
import FileViewerReactPdf from "@/components/utils/FileViewerReactPdf";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const AdminHistoryViewerPage = () => {
  const { suratId } = useParams<{ suratId: string }>();
  const [surat, setSurat] = useState<Surat | null>();
  useEffect(() => {
    getSuratById(suratId).then((res) => setSurat(res));
  }, [suratId]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row w-full">
        <Button asChild variant={"ghost"} className="w-fit">
          <Link href="/admin/requested">
            <ChevronLeft />
            Kembali
          </Link>
        </Button>
      </div>
      <FileViewerReactPdf file={surat?.file as string} />
    </div>
  );
};

export default AdminHistoryViewerPage;
