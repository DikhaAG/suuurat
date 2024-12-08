import SidebarLayoutProvider from "@/components/sidebar/SidebarLayoutProvider";

const AdminLayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
};

export default AdminLayoutPage;
