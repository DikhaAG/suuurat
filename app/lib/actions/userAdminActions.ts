"use server";
import { prisma } from "@/app/lib/prisma";

export const createUserAdmin = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  try {
    await prisma.user.create({
      data: {
        name,
        password,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteUserAdminById = async (id: string) => {
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

export const getAllAdmin = async (exeptionName: string) => {
  const res = await prisma.user.findMany({
    where: {
      role: "ADMIN",
      NOT: {
        name: exeptionName,
      },
    },
  });

  return res;
};
