import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const SidebarLayoutProvider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const userData = await getUserByName(session?.user?.name);

  return (
    <SidebarProvider>
      <AppSidebar userData={userData} />
      <main className="w-full">
        <div className="p-6">
          <SidebarTrigger />
          <div className="mt-4">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};
export default SidebarLayoutProvider;
