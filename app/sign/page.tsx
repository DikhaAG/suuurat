import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surat - Sign in",
};

export default async function SignPage() {
  const session = await auth();
  if (session?.user) {
    const user = await getUserByName(session?.user?.name);
    if (!user) {
      return redirect("/");
    } else if (user.role === "USER") {
      return redirect("/user");
    } else if (user.role === "VALIDATOR") {
      return redirect("/validator");
    } else if (user.role === "ADMIN") {
      return redirect("/admin");
    }
  }

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <div className="fixed bottom-0 right-0 m-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
}
