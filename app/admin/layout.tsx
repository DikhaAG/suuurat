import SidebarLayout from "@/components/sidebar/SidebarLayout";

const AdminLayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default AdminLayoutPage;
