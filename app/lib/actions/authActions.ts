"use server";
import { signInSchema } from "@/app/lib/zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
            message: "Username atau password salah!",
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
