import { prisma } from "@/app/lib/prisma";

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
