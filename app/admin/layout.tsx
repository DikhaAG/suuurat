import SidebarLayout from "@/components/sidebar/SidebarLayout";

const AdminLayoutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default AdminLayoutPage;
