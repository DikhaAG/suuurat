import SidebarLayoutProvider from "@/components/sidebar/SidebarLayoutProvider";

const ValidatorLayoutPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
};

export default ValidatorLayoutPage;
