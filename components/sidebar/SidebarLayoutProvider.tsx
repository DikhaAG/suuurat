import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeToggle } from "../utils/theme-toggle";

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
      <main className="w-full flex flex-col">
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <SidebarTrigger />
            <ThemeToggle />
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};
export default SidebarLayoutProvider;
