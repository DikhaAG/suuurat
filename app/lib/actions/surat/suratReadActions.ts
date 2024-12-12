import { prisma } from "@/app/lib/prisma";

export const getAllSurat = async () => {
  const res = await prisma.surat.findMany({
    include: { author: true, validationStage: true, notes: true },
  });
  return res;
};

export const getSuratById = async (suratId: string) => {
  const res = await prisma.surat.findUnique({
    where: {
      id: suratId,
    },
    include: { author: true, validationStage: true, notes: true },
  });
  return res;
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
      include: {
        author: true,
        validationStage: { include: { validator: true, surat: true } },
        notes: { include: { author: true, surat: true } },
      },
    });
    return res;
  };

export const getAllRequestedSurat = async () => {
  const res = await prisma.surat.findMany({
    where: {
      validationStatus: false,
    },
    include: {
      author: true,
      validationStage: {
        include: {
          validator: true,
          surat: true,
        },
      },
      notes: { include: { author: true, surat: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res;
};

export const getAllValidationSuratByStageId = async (
  validationStageId: string,
) => {
  const res = await prisma.surat.findMany({
    where: { AND: [{ validationStatus: false }, { validationStageId }] },
    include: {
      author: true,
      validationStage: { include: { validator: true, surat: true } },
      notes: { include: { author: true, surat: true } },
    },
  });

  return res;
};

export const getAllValidationSuratByStageTitle = async (
  validationStageTitle: number,
) => {
  const res = await prisma.surat.findMany({
    where: {
      AND: [
        { validationStatus: false },
        { validationStage: { title: validationStageTitle } },
      ],
    },
    include: {
      author: true,
      validationStage: { include: { validator: true, surat: true } },
      notes: { include: { author: true, surat: true } },
    },
  });

  return res;
};

export const getConfirmedSuratByAuthorName = async (authorName: string) => {
  const res = await prisma.surat.findMany({
    where: {
      author: {
        name: authorName,
      },
    },
    include: {
      author: true,
      validationStage: { include: { validator: true, surat: true } },
      notes: { include: { author: true, surat: true } },
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
          { validationStatus: true },
        ],
      },
      include: {
        author: true,
        validationStage: { include: { validator: true, surat: true } },
        notes: { include: { author: true, surat: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  }
};

export const getRequestedSuratByAuthorName = async (authorName: string) => {
  const res = await prisma.surat.findMany({
    where: {
      AND: [
        {
          author: {
            name: authorName,
          },
        },
        { validationStatus: false },
      ],
    },
    include: {
      author: true,
      validationStage: { include: { validator: true, surat: true } },
      notes: { include: { author: true, surat: true } },
    },
  });

  return res;
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
      include: {
        author: true,
        validationStage: { include: { validator: true, surat: true } },
        notes: { include: { author: true, surat: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  }
};
