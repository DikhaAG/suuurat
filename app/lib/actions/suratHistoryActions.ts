"use server";

import { prisma } from "@/app/lib/prisma";
import { $Enums } from "@prisma/client";

export const createSuratHistory = async (
  suratId: string,
  userId: string,
  historyAction: $Enums.SuratHistoryAction,
) => {
  const res = await prisma.suratHistory.create({
    data: {
      action: historyAction,
      userId: userId,
      suratId: suratId,
    },
  });

  return res;
};
