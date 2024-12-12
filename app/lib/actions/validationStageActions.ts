"use server";
import { prisma } from "@/app/lib/prisma";

export const countAllValidationStage = async () => {
  const res = await prisma.validationStage.count();
  return res;
};

export const getAllValidationStage = async () => {
  const res = await prisma.validationStage.findMany({
    include: {
      validator: true,
      surat: true,
    },
  });
  return res;
};

export const getValidationStageByValidatorId = async (validatorId: string) => {
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

export const getValidationStageByTitle = async (
  validationStageTitle: number,
) => {
  const res = await prisma.validationStage.findUnique({
    where: {
      title: validationStageTitle,
    },
    include: {
      validator: true,
      surat: true,
    },
  });
  return res;
};

export const deleteValidationStageById = async (id: string) => {
  try {
    await prisma.validationStage.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
