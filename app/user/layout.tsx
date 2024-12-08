import SidebarLayoutProvider from "@/components/sidebar/SidebarLayoutProvider";

const UserLayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
};

export default UserLayoutPage;
