"use server";
import { suratSchema, signInSchema } from "@/app/lib/zod";
import { put, del } from "@vercel/blob";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const getUserByName = async (name: string | null | undefined) => {
  if (name) {
    const res = await prisma.user.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
        surats: true,
        validationStage: true,
        suratNotes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res;
  }
  return null;
};

export const countAllValidationStage = async () => {
  const res = await prisma.validationStage.count();
  return res;
};

export const getValidationStageById = async (validatorId: string) => {
  const res = await prisma.validationStage.findUnique({
    where: {
      validatorId,
    },
    include: {
      validator: true,
      surat: true,
    },
  });
  return res;
};

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

export const getAllSurat = async () => {
  const res = await prisma.surat.findMany({
    include: { author: true, validationStage: true, notes: true },
  });
  return res;
};

export const getSuratById = async (id: string) => {
  const res = await prisma.surat.findUnique({
    where: {
      id,
    },
    include: { author: true, validationStage: true, notes: true },
  });
  return res;
};

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

export const countAllConfirmedSurat = async () => {
  const res = await prisma.surat.count({
    where: {
      validationStatus: true,
    },
  });
  return res;
};

export const countAllRequestedSurat = async () => {
  const res = await prisma.surat.count({
    where: {
      validationStatus: false,
    },
  });
  return res;
};

export const countAllValidationSurat = async (validationStageId: string) => {
  const res = await prisma.surat.count({
    where: {
      AND: [{ validationStatus: false }, { validationStageId }],
    },
  });
  return res;
};

export const getAllConfirmedSurat = async () =>
  // select: Prisma.SuratSelect<DefaultArgs>,
  {
    const res = await prisma.surat.findMany({
      where: {
        validationStatus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { author: true, validationStage: true, notes: true },
    });
    return res;
  };

export const getAllRequestedSurat = async () => {
  const res = await prisma.surat.findMany({
    where: {
      validationStatus: false,
    },
    include: { author: true, validationStage: true, notes: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res;
};

export const getAllValidationSurat = async (validationStageId: string) => {
  const res = await prisma.surat.findMany({
    where: { AND: [{ validationStatus: false }, { validationStageId }] },
    include: { author: true, validationStage: true, notes: true },
  });

  return res;
};

export const getConfirmedSuratByAuthorId = async (
  authorId: string | null | undefined,
) => {
  if (authorId) {
    const res = await prisma.surat.findMany({
      where: {
        AND: [
          {
            authorId,
          },
          { validationStatus: true },
        ],
      },
      include: { author: true, validationStage: true, notes: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  }
};

export const getRequestedSuratByAuthorId = async (
  authorId: string | null | undefined,
) => {
  if (authorId) {
    const res = await prisma.surat.findMany({
      where: {
        AND: [
          {
            authorId,
          },
          { validationStatus: false },
        ],
      },
      include: { author: true, validationStage: true, notes: true },

      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  }
};

export const validateSuratById = async (
  suratId: string,
  note: string,
  validatorId: string,
) => {
  try {
    const validationStage = await getValidationStageById(validatorId);
    const validationStageCount = await countAllValidationStage();

    if (validationStage) {
      if (validationStageCount > validationStage?.title) {
        try {
          await prisma.surat.update({
            where: {
              id: suratId,
            },
            data: {
              validationStageId: validationStage.id + 1,
            },
          });

          await createSuratNote(suratId, validatorId, note);
        } catch (error) {
          return {
            message: "gagal memvalidasi surat",
            error,
          };
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

          await createSuratNote(suratId, validatorId, note);
        } catch (error) {
          return {
            message: "gagal memvalidasi surat",
            error,
          };
        }
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

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

  try {
    await prisma.surat.create({
      data: {
        subject,
        authorId,
        receiver,
        file: url,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "gagal mengirim surat",
    };
  }

  revalidatePath("/user");
  redirect("/user/requested");
};

export const signInCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = signInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, password } = validatedFields.data;

  try {
    await signIn("credentials", { name, password, redirectTo: "/user" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Nama atau password salah!",
          };
        default:
          return {
            message: "Pengguna tidak ditemukan!",
          };
      }
    }
    throw error;
  }
};
