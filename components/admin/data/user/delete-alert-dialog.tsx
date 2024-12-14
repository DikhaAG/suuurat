import { MouseEvent } from "react";
import { User } from "@prisma/client";
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
import { deleteUserById } from "@/app/lib/actions/userActions";
import { useToast } from "@/hooks/use-toast";

export default function DataUserDeleteAlertDialog({
  userData,
}: {
  userData: User;
}) {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    setPending(true);
    try {
      await deleteUserById(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setPending(false);
      toast({
        title: "Gagal menghapus admin!",
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
            Apakah anda yakin mengapus {userData.name} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ini akan mengapus akun secara permanen dan menghapus data dari
            server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={(e) => onSubmit(e, userData.id)}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
