import SidebarLayout from "@/components/sidebar/SidebarLayout";

const UserLayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default UserLayoutPage;
