import SidebarLayout from "@/components/sidebar/SidebarLayout";

const UserLayoutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default UserLayoutPage;
