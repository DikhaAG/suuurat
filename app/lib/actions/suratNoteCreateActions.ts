"use server";

import { prisma } from "@/app/lib/prisma";

export const createSuratNote = async (
  suratId: string,
  authorId: string,
  message: string,
) => {
  try {
    await prisma.suratNote.create({
      data: {
        message,
        suratId,
        authorId,
      },
    });
  } catch (error) {
    return {
      message: "gagal membuat catatan surat!",
      error: error,
    };
  }
  return true;
};
