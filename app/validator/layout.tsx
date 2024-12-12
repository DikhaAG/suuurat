import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions/userActions";
import { redirect } from "next/navigation";
import SidebarLayoutProvider from "@/components/sidebar/SidebarLayoutProvider";

const ValidatorLayoutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const user = await getUserByName(session?.user?.name);
  if (!user) {
    return redirect("/");
  } else if (user.role === "USER") {
    return redirect("/user");
  } else if (user.role === "ADMIN") {
    return redirect("/admin");
  }
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
};

export default ValidatorLayoutPage;
