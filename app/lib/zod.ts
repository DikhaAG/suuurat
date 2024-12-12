"use server";
import { z } from "zod";

export const suratSchema = z.object({
  subject: z.string().min(1, { message: "Subjek harus diisi!" }),
  authorId: z.string().min(1),
  receiver: z.string().min(1, { message: "Nama penerima harus diisi!" }),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File belum diinput",
    })
    .refine(
      (file) => file.size < 10000000 && ["application/pdf"].includes(file.type),
      {
        message: "File harus berupa PDF",
      },
    ),
  noted: z.string().default(""),
  status: z.boolean().default(false),
});

export const signInSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi!" }),
  password: z.string().min(1, { message: "Password harus diisi!" }),
});
