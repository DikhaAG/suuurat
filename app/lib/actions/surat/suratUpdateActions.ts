"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSuratHistory } from "@/app/lib/actions/suratHistoryActions";
import { countAllValidationStage } from "@/app/lib/actions/validationStageActions";
import { getValidationStageByTitle } from "@/app/lib/actions/validationStageActions";

export const validateSurat = async (
  suratId: string,
  note: string,
  validationStageTitle: number,
  validatorId: string,
) => {
  try {
    const validationStageCount = await countAllValidationStage();

    if (validationStageCount > validationStageTitle) {
      const nextStage = await getValidationStageByTitle(
        validationStageTitle + 1,
      );

      try {
        await prisma.surat.update({
          where: {
            id: suratId,
          },
          data: {
            validationStageId: nextStage!.id,
          },
        });

        await createSuratHistory(suratId, validatorId, "VALIDATE");

        if (note !== "") {
          try {
            await prisma.suratNote.create({
              data: {
                suratId,
                message: note,
                authorId: validatorId,
              },
            });
          } catch (error) {
            return JSON.stringify({
              status: false,
              message: "gagal membuat catatan surat",
              error,
            });
          }
        }
      } catch (error) {
        return JSON.stringify({
          message: "gagal memvalidasi surat",
          error,
        });
      }
    } else {
      try {
        await prisma.surat.update({
          where: {
            id: suratId,
          },
          data: {
            validationStatus: true,
          },
        });

        await createSuratHistory(suratId, validatorId, "VALIDATE");

        if (note !== "") {
          try {
            await prisma.suratNote.create({
              data: {
                suratId,
                message: note,
                authorId: validatorId,
              },
            });
          } catch (error) {
            return JSON.stringify({
              status: false,
              message: "gagal membuat catatan surat",
              error,
            });
          }
        }
      } catch (error) {
        return JSON.stringify({
          message: "gagal memvalidasi surat",
          error,
        });
      }
    }

    revalidatePath("/validator");
    redirect("/validator/history");
  } catch (error) {
    return JSON.stringify({
      status: false,
      error,
    });
  }
};
