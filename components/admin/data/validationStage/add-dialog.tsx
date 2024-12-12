"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createValidationStage } from "@/app/lib/actions/validationStageActions";

export default function DataValidationStageAdd() {
  const { toast } = useToast();

  async function onSubmit() {
    try {
      const res = await createValidationStage();
      toast({
        title: `Berhasil menambahkan tahap ${res.title}`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Gagal menghapus admin!",
        description: "Ada masalah pada server, coba lagi",
      });
    }
  }

  return (
    <Button variant="outline" type="submit" onClick={onSubmit}>
      <Plus />
      Tambah
    </Button>
  );
}
