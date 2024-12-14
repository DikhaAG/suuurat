"use server";

import { prisma } from "@/app/lib/prisma";

export const createUser = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  console.log(name);

  try {
    await prisma.user.create({
      data: {
        name,
        password,
        role: "USER",
      },
    });

    return JSON.stringify({
      status: true,
      message: "Ok",
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      status: false,
      message: error,
    });
  }
};

export const getAllUser = async () => {
  const res = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  return res;
};

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

export const deleteUserById = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        role: "ADMIN",
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
