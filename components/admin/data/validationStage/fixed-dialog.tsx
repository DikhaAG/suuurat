"use client";
import { MouseEvent } from "react";
import { fixValidationStage } from "@/app/lib/actions/systemActions";
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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function DataValidationStageFixedDialog() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setPending(true);
    try {
      await fixValidationStage();
      window.location.reload();
    } catch (error) {
      console.log(error);
      setPending(false);
      toast({
        title: "Gagal menghapus tahap validasi!",
        description: "Ada masalah pada server, coba lagi",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          <Trash2 />
          Fix Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin untuk fix tahap validasi?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ini akan membuat anda tidak dapat lagi mengubah data pada tahapan
            validasi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={(e) => onSubmit(e)}>
            Fix
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
