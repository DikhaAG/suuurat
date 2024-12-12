import { prisma } from "@/app/lib/prisma";

export const getSystemSettingByName = async (settingName: string) => {
  const res = await prisma.systemSetting.findFirst({
    where: {
      name: settingName,
    },
  });

  return res;
};

export const fixValidationStage = async () => {
  const setting = await prisma.systemSetting.findFirst({
    where: {
      name: "validationStageFixed",
    },
  });
  const res = await prisma.systemSetting.update({
    where: {
      id: setting!.id!,
    },
    data: {
      status: true,
    },
  });

  return res;
};
