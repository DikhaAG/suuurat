"use server";

import { prisma } from "@/app/lib/prisma";
import { del } from "@vercel/blob";
import { getSuratById } from "@/app/lib/actions/surat/suratReadActions";

export const deleteSuratById = async (id: string) => {
  const surat = await getSuratById(id);
  if (surat) {
    await del(surat.file);
    try {
      await prisma.surat.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
