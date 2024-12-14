"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { popValidationStage } from "@/app/lib/actions/validationStageActions";

export default function DataValidationStageRemove() {
  const { toast } = useToast();

  async function onSubmit() {
    try {
      await popValidationStage();
      toast({
        title: `Berhasil menghapus`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Gagal menghapus!",
        description: "Ada masalah pada server, coba lagi",
      });
    }
  }

  return (
    <Button variant="outline" type="submit" onClick={onSubmit}>
      <Plus />
      Hapus
    </Button>
  );
}
