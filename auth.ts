import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./app/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { name, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: { name },
        });

        if (!user || !user.password) {
          throw new Error("Pengguna tidak ditemukan!");
        }

        if (password !== user.password) return null;

        return user;
      },
    }),
  ],
//   callbacks: {
//     async authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const ProtectedRoutes = ["/user", "/admin"];
//       console.log(auth?.user);

//       if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
//         return Response.redirect(new URL("/", nextUrl));
//       }
//       if (isLoggedIn) {
//         if (
//           (auth.user?.name !== "admin" && nextUrl.pathname.startsWith("/")) ||
//           nextUrl.pathname.startsWith("/admin")
//         ) {
//           return Response.redirect(new URL("/user", nextUrl));
//         }
//       }
//       //   if (isLoggedIn && nextUrl.pathname.startsWith("/")) {
//       //     return Response.redirect(new URL("/user", nextUrl));
//       //   }

//       return true;
//     },
//   },
});
