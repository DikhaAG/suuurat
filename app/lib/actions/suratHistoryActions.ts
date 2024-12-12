import { prisma } from "@/app/lib/prisma";
import { $Enums } from "@prisma/client";

export const createSuratHistory = async (
  suratId: string,
  authorId: string,
  historyAction: $Enums.SuratHistoryAction,
) => {
  const res = await prisma.suratHistory.create({
    data: {
      action: historyAction,
      userId: authorId,
      suratId: suratId,
    },
  });

  return res;
};
