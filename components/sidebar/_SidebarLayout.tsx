import { auth } from "@/auth";
import SidebarOnDesktop from "./SidebarOnDesktop";
import SidebarOnMobile from "./SidebarOnMobile";
import { getUserByName } from "@/app/lib/actions";

const SidebarLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const userData = await getUserByName(session?.user?.name);

  return (
    <SidebarOnDesktop user={userData}>
      <SidebarOnMobile user={userData}>{children}</SidebarOnMobile>
    </SidebarOnDesktop>
  );
};
export default SidebarLayout;
