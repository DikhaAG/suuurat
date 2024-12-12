"use client";
import { getSuratById } from "@/app/lib/actions/surat/suratReadActions";
import { Surat } from "@prisma/client";
import FileViewerReactPdf from "@/components/utils/FileViewerReactPdf";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const ValidatorRequestedViewerPage = () => {
  const { suratId } = useParams<{ suratId: string }>();
  const [surat, setSurat] = useState<Surat | null>();
  useEffect(() => {
    getSuratById(suratId).then((res) => setSurat(res));
  }, [suratId]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row w-full">
        <Link href="/validator/requested">
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

export default ValidatorRequestedViewerPage;
