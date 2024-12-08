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
        isAdmin: true,
        password: true,
        surat: true,
        createdAt: true,
      },
    });
    return res;
  }
  return null;
};

export const getAllSurat = async () => {
  const res = await prisma.surat.findMany({
    select: {
      id: true,
      subject: true,
      author: true,
      receiver: true,
      file: true,
      status: true,
      noted: true,
      createdAt: true,
    },
  });
  return res;
};

export const getSuratById = async (id: string) => {
  const res = await prisma.surat.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      subject: true,
      author: true,
      receiver: true,
      file: true,
      status: true,
      noted: true,
      createdAt: true,
    },
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
      status: true,
    },
  });
  return res;
};

export const countAllRequestedSurat = async () => {
  const res = await prisma.surat.count({
    where: {
      status: false,
    },
  });
  return res;
};

export const getAllConfirmedSurat = async () =>
  // select: Prisma.SuratSelect<DefaultArgs>,
  {
    const res = await prisma.surat.findMany({
      where: {
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        subject: true,
        author: {
          select: {
            name: true,
          },
        },
        receiver: true,
        createdAt: true,
      },
    });
    return res;
  };

export const getAllRequestedSurat = async () => {
  const res = await prisma.surat.findMany({
    where: {
      status: false,
    },
    select: {
      id: true,
      subject: true,
      author: true,
      receiver: true,
      file: true,
      status: true,
      noted: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
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
          { status: true },
        ],
      },
      select: {
        id: true,
        subject: true,
        author: true,
        receiver: true,
        file: true,
        status: true,
        noted: true,
        createdAt: true,
      },
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
          { status: false },
        ],
      },
      select: {
        id: true,
        subject: true,
        author: true,
        receiver: true,
        file: true,
        status: true,
        noted: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  }
};

export const confirmSuratById = async (id: string, note: string) => {
  try {
    await prisma.surat.update({
      where: {
        id,
      },
      data: {
        status: true,
        noted: note,
      },
    });
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
