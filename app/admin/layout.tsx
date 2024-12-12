import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions/userActions";
import { redirect } from "next/navigation";
import SidebarLayoutProvider from "@/components/sidebar/SidebarLayoutProvider";

const AdminLayoutPage = async ({
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
  } else if (user.role === "VALIDATOR") {
    return redirect("/validator");
  }
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
};

export default AdminLayoutPage;
