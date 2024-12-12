import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { suratSchema } from "@/app/lib/zod";
import { createSuratHistory } from "@/app/lib/actions/suratHistoryActions";

export const kirim = async (prevState: unknown, formData: FormData) => {
  const validatedFields = suratSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { subject, authorId, receiver, file } = validatedFields.data;

  const { url } = await put(file.name, file, {
    access: "public",
    multipart: true,
  });

  const validationStageCount = await prisma.validationStage.count();
  const validationStage = await prisma.validationStage.findUnique({
    where: {
      title: 1,
    },
  });

  if (validationStageCount > 0) {
    try {
      const suratRes = await prisma.surat.create({
        data: {
          subject,
          authorId,
          receiver,
          file: url,
          validationStageId: validationStage!.id,
        },
      });
      await createSuratHistory(suratRes.id, authorId, "CREATE");
    } catch (error) {
      console.log(error);
      return {
        message: "gagal mengirim surat",
      };
    }
  }

  revalidatePath("/user");
  redirect("/user/requested");
};
