import { MouseEvent } from "react";
import { SuratModel } from "@/app/lib/models";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteSuratById } from "@/app/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function AdminHistoryDeleteAlertDialog({
  surat,
}: {
  surat: SuratModel;
}) {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setPending(true);
    try {
      await deleteSuratById(surat.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setPending(false);
      toast({
        title: "Gagal menghapus surat!",
        description: "Ada masalah pada server, coba lagi",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer text-red-500 focus:text-red-600 "
        >
          <Trash2 />
          Hapus
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin mengapus &quot;{surat.subject}&quot; ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ini akan mengapus akun secara permanen dan menghapus data dari
            server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={(e) => onSubmit(e)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
