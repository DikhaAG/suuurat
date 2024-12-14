"use server";
import { prisma } from "@/app/lib/prisma";

export const createUserValidator = async ({
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
        role: "VALIDATOR",
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllValidator = async () => {
  const res = await prisma.user.findMany({
    where: {
      role: "VALIDATOR",
    },
    include: {
      validationStage: true,
    },
  });

  return res;
};

export const getAllValidatorWithException = async (
  validationStageId: string,
) => {
  const res = await prisma.user.findMany({
    where: {
      role: "VALIDATOR",
      NOT: {
        validationStage: {
          id: validationStageId,
        },
      },
    },
    include: {
      validationStage: true,
    },
  });

  return res;
};

export const insertValidator = async (
  validationStageId: string,
  validatorId: string,
) => {
  try {
    await prisma.validationStage.update({
      where: {
        id: validationStageId,
      },
      data: {
        validatorId,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteValidatorById = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        role: "VALIDATOR",
        id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
