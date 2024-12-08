import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarContentAdmin from "./SidebarContentAdmin";
import SidebarContentUser from "./SidebarContentUser";
import SidebarHeaderContent from "./SidebarHeaderContent";
import SidebarContentValidator from "./SidebarContentValidator";
import { UserModel } from "@/app/lib/models";
import SidebarFooterContent from "./SidebarFooterContent";

export function AppSidebar({ userData }: { userData: UserModel | null }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        {userData?.role === "ADMIN" ? (
          <SidebarContentAdmin />
        ) : userData?.role === "VALIDATOR" ? (
          <SidebarContentValidator validatorData={userData} />
        ) : (
          <SidebarContentUser />
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent userData={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
